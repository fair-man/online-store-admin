import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs/operators';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { each, findIndex, filter, forEach, cloneDeep, sortBy } from 'lodash';

import { ProductsService } from '../../products.service';
import {
    CategoryProduct, Characteristic, GroupCategoryProduct, GroupCharacteristics,
    GroupSubCategoryProduct, Product
} from '../../../../models/products';
import {
    CreateEditGroupsProductsComponent
} from '../modals/create-edit-groups-products/create-edit-groups-products.component';
import {
    CreateEditGroupsSubcategoriesProductsComponent
} from '../modals/create-edit-groups-subcategories-products/create-edit-groups-subcategories-products.component';
import {
    CreateEditCategoriesProductsComponent
} from '../modals/create-edit-categories-products/create-edit-categories-products.component';
import { PRODUCTS_PATHS } from '../../products';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkCharacteristicsValidator } from './create-edit-products-widget.validators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../../../../classes/http';
import { FileCustom } from '../../../../models/file';

@Component({
    selector: 'app-create-edit-products-widget',
    templateUrl: './create-edit-products-widget.component.html',
    styleUrls: ['./create-edit-products-widget.component.scss']
})
export class CreateEditProductsWidgetComponent implements OnInit, AfterViewInit {
    public productCreateEditForm: FormGroup;
    public groupsCategoriesProducts: GroupCategoryProduct[];
    public groupCategoryProduct: GroupCategoryProduct;
    public groupsSubCategoriesProducts: GroupSubCategoryProduct[];
    public groupSubCategoryProduct: GroupSubCategoryProduct;
    public categoriesProducts: CategoryProduct[];
    public categoryProduct: CategoryProduct;
    public groupsCharacteristics: GroupCharacteristics[];
    public productsPath = PRODUCTS_PATHS;
    public productId: number;
    public productDataDefault: any;

    private filesList: File[] = [];

    @ViewChild('productDragBlock', {static: false}) productDragBlockElement: ElementRef;

    constructor(private productsService: ProductsService,
                private fb: FormBuilder,
                public modalService: NgbModal,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initForm();
        this.initData();
    }

    ngAfterViewInit() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.productDragBlockElement.nativeElement.addEventListener(eventName, preventDefaults, false);
        });
        function preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            this.productDragBlockElement.nativeElement.addEventListener(eventName, this.toggleHighlight.bind(this, true), false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            this.productDragBlockElement.nativeElement.addEventListener(eventName, this.toggleHighlight.bind(this, false), false);

            if (eventName === 'drop') {
                this.productDragBlockElement.nativeElement.addEventListener(eventName, this.onAddFiles.bind(this), false);
            }
        });
    }

    private toggleHighlight(isHighlight) {
        if (isHighlight) {
            this.productDragBlockElement.nativeElement.classList.add('product__photo-drag-block--highlight');
        } else {
            this.productDragBlockElement.nativeElement.classList.remove('product__photo-drag-block--highlight');
        }
    }

    public onAddFiles(event) {
        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

        forEach(files, (file) => {
            const fileSearch = this.getSelectedItem('name', file.name, this.filesList);

            if ((!fileSearch) || (fileSearch && fileSearch.type !== file.type)) {
                this.addPreviewFile(file);
                this.filesList.push(file);
            }
        });
    }

    public onRemoveFile(file) {
        const fileSearchIndex = findIndex(this.filesList, (f) => f.name === file.name);

        if (fileSearchIndex > -1) {
            this.filesList.splice(fileSearchIndex, 1);
        }
    }

    public onMakeTitle(file: FileCustom) {
        forEach(this.filesList, (f: FileCustom) => {
            f.isFileTitle = f.name === file.name;
        });
    }

    private addPreviewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            file.previewSrc = reader.result;
        };
    }

    private initForm(): void {
        this.productCreateEditForm = this.fb.group({
            category_product_id: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            vendor_code: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            count: new FormControl('', Validators.required),
            products_groups_description_options: this.fb.array([])
        });
    }

    private initData(): void {
        if (this.route.snapshot.params['id']) {
            this.productId = this.route.snapshot.params['id'];
            this.getProductData();
        } else {
            this.getGroupsCategories().subscribe(() => {
            });
        }
    }

    private getProductData(): void {
        if (!this.productId) {
            return;
        }

        this.productsService.getProduct(this.productId)
            .subscribe(
                (response) => {
                    this.productDataDefault = response.data;
                    this.getGroupsCategories().subscribe(() => {
                        this.initExistsProduct(response.data);
                    });
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    private initExistsProduct(product: Product): void {
        const gc = this.getSelectedItem('id', product.pt_gc_id, this.groupsCategoriesProducts);

        if (gc) {
            this.groupCategoryProduct = gc;
            this.initSubGroupCategory(product);
        }

        this.productCreateEditForm.updateValueAndValidity();
    }

    private initSubGroupCategory(product: Product): void {
        let gsc = null;

        this.getSubCategories(this.groupCategoryProduct.id)
            .subscribe(
                () => {
                    gsc = this.getSelectedItem('id', product.pt_gs_id, this.groupsSubCategoriesProducts);

                    if (gsc) {
                        this.groupSubCategoryProduct = gsc;
                        this.initCategory(product);
                    }
                }
            );
    }

    private initCategory(product: Product): void {
        let c = null;

        this.getCategoriesProducts(this.groupSubCategoryProduct.id)
            .subscribe(
                () => {
                    c = this.getSelectedItem('id', product.pt_c_id, this.categoriesProducts);

                    if (c) {
                        this.onChangeCategoriesProductsItem(c);
                    }

                    this.initTypedFields(product);
                }
            );
    }

    private initTypedFields(product: Product): void {
        this.productCreateEditForm.controls['name'].setValue(product.pt_name);
        this.productCreateEditForm.controls['description'].setValue(product.pt_description);
        this.productCreateEditForm.controls['vendor_code'].setValue(product.pt_vendor_code);
        this.productCreateEditForm.controls['price'].setValue(product.pt_price);
        this.productCreateEditForm.controls['count'].setValue(product.pt_count);
    }

    private initGroupsCharacteristics(product: Product): void {
        const groupsCharacteristics = product.pt_groups_description_options;

        each(groupsCharacteristics, (groupsCharacteristic: GroupCharacteristics) => {
            const group = this.getSelectedItem('id', groupsCharacteristic.id, this.groupsCharacteristics);

            group.isChecked = true;
            group.characteristics = groupsCharacteristic.options;
        });

        this.onCloseGroupsCharacteristicPopover();
    }

    private getSelectedItem<T>(itemKey: string, itemValue: number, items: T[]): T | null {
        const index = findIndex(items, (item) => item[itemKey] === itemValue);

        if (index > -1) {
            return items[index];
        } else {
            return null;
        }
    }

    private getGroupsCategories(): Observable<CustomHttpResponse<GroupCategoryProduct[]>> {
        return this.productsService.getGroupsCategoriesProducts()
            .pipe(
                tap(
                    (response) => {
                        this.groupsCategoriesProducts = response.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            );
    }

    private getSubCategories(groupCategoryId: number): Observable<CustomHttpResponse<GroupSubCategoryProduct[]>> {
        return this.productsService.getGroupsSubCategoriesProducts({g_id: groupCategoryId})
            .pipe(
                tap(
                    (response) => {
                        this.groupsSubCategoriesProducts = response.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            );
    }

    private getCategoriesProducts(groupSubCategoryId: number): Observable<CustomHttpResponse<CategoryProduct[]>> {
        return this.productsService.getCategories({g_id: groupSubCategoryId})
            .pipe(
                tap(
                    (response) => {
                        this.categoriesProducts = response.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            );
    }

    private getCategoriesGroupsProducts(categoryId: number): void {
        this.productsService.getCategoriesGroups({c_id: categoryId})
            .subscribe(
                (response) => {
                    const resp = sortBy(response.data, (item) => !item.is_main);
                    this.groupsCharacteristics = resp.map((ch, index) => {
                        ch.sort_order = index + 1;
                        ch.isChecked = ch.is_main === 1;
                        ch.characteristics = [];
                        return ch;
                    });

                    if (this.productId) {
                        this.initGroupsCharacteristics(this.productDataDefault);
                    } else {
                        this.onCloseGroupsCharacteristicPopover();
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public onChangeGroupsCategoriesProductsItem(groupCategoryProduct: GroupCategoryProduct): void {
        this.groupCategoryProduct = groupCategoryProduct;
        this.groupsSubCategoriesProducts = null;
        this.groupSubCategoryProduct = null;
        this.categoriesProducts = null;
        this.categoryProduct = null;
        this.groupsCharacteristics = null;
        this.getSubCategories(groupCategoryProduct.id).subscribe(() => {
        });
    }

    public onOpenGroupsCategoriesDialog(): void {
        const groupCategoriesModal = this.modalService.open(CreateEditGroupsProductsComponent, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-wrapper',
            backdrop: 'static'
        });

        groupCategoriesModal.componentInstance.groupsCategoriesProducts = this.groupsCategoriesProducts;
    }

    public onChangeGroupsSubCategoriesProductsItem(groupSubCategoryProduct: GroupSubCategoryProduct): void {
        this.groupSubCategoryProduct = groupSubCategoryProduct;
        this.categoriesProducts = null;
        this.categoryProduct = null;
        this.groupsCharacteristics = null;
        this.getCategoriesProducts(groupSubCategoryProduct.id).subscribe(() => {
        });
    }

    public onOpenGroupsSubCategoriesDialog(): void {
        const groupSubCategoriesModal = this.modalService.open(CreateEditGroupsSubcategoriesProductsComponent, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-wrapper',
            backdrop: 'static'
        });

        groupSubCategoriesModal.componentInstance.groupsCategoriesProducts = this.groupsCategoriesProducts;
        groupSubCategoriesModal.componentInstance.groupsSubCategoriesProducts = this.groupsSubCategoriesProducts;
        groupSubCategoriesModal.componentInstance.groupCategoryProduct = this.groupCategoryProduct;

        groupSubCategoriesModal.result.then(
            (closedData) => {
                if (!closedData) {
                    return;
                }
                const type = closedData.type;
                const index = findIndex(this.groupsSubCategoriesProducts, {id: this.groupSubCategoryProduct.id});

                if (type === 'update') {
                    if (index > -1) {
                        this.groupsSubCategoriesProducts[index] = closedData.groupSubcategory;
                    }

                    if (this.groupSubCategoryProduct) {
                        this.groupSubCategoryProduct = closedData.groupSubcategory;
                    }
                }

                if (type === 'drop') {
                    if (index > -1) {
                        this.groupsSubCategoriesProducts.splice(index, 1);
                    }

                    if (this.groupSubCategoryProduct) {
                        this.groupSubCategoryProduct = null;
                    }
                }
            }
        );
    }

    public onChangeCategoriesProductsItem(categoryProduct: CategoryProduct): void {
        this.categoryProduct = categoryProduct;
        this.groupsCharacteristics = null;
        this.getCategoriesGroupsProducts(categoryProduct.id);
        this.productCreateEditForm.controls['category_product_id'].setValue(categoryProduct.id);
    }

    public onOpenCategoriesProductsDialog(): void {
        const categoriesModal = this.modalService.open(CreateEditCategoriesProductsComponent, {
            ariaLabelledBy: 'modal-basic-title',
            windowClass: 'modal-wrapper',
            backdrop: 'static'
        });

        categoriesModal.componentInstance.groupsSubCategoriesProducts = this.groupsSubCategoriesProducts;
        categoriesModal.componentInstance.groupSubCategoryProduct = this.groupSubCategoryProduct;
        categoriesModal.componentInstance.categoriesProducts = this.categoriesProducts;

        categoriesModal.result.then(
            (closedData) => {
                if (!closedData) {
                    return;
                }
                const type = closedData.type;
                const index = findIndex(this.categoriesProducts, {id: this.categoryProduct.id});

                if (type === 'update') {
                    if (index > -1) {
                        this.categoriesProducts[index] = closedData.categoryProduct;
                    }

                    if (this.groupSubCategoryProduct) {
                        this.categoryProduct = closedData.categoryProduct;
                    }
                }

                if (type === 'drop') {
                    if (index > -1) {
                        this.categoriesProducts.splice(index, 1);
                    }

                    if (this.categoryProduct) {
                        this.categoryProduct = null;
                    }
                }
            }
        );
    }

    public onCloseGroupsCharacteristicPopover(): void {
        const groups = cloneDeep(this.productCreateEditForm.value.products_groups_description_options);
        this.productCreateEditForm.removeControl('products_groups_description_options');
        this.productCreateEditForm.setControl('products_groups_description_options', this.fb.array([]));

        each(this.groupsCharacteristics, (group) => {
            if (group.is_main || group.isChecked) {
                const cloneGroup = filter(groups, (gr) => {
                    if (gr.id === group.id) {
                        group.sort_order = gr.sort_order;
                        return gr;
                    }
                });
                const groupLink = this.addGroupCharacteristic(group);

                each(group.characteristics, (c) => {
                    let cloneCharacteristic = {};

                    if (cloneGroup && cloneGroup.length) {
                        const cloneCharacteristicArr = filter(cloneGroup[0].characteristics, (ch) => {
                            if ((ch.fakeId === c.fakeId) || (ch.id && c.id && ch.id === c.id)) {
                                c.sort_order = ch.sort_order;
                                return ch;
                            }
                        });

                        if (cloneCharacteristicArr && cloneCharacteristicArr.length) {
                            cloneCharacteristic = cloneCharacteristicArr[0];
                        }
                    }

                    this.addCharacteristic(groupLink, Object.assign(c, cloneCharacteristic));
                });
                groupLink.controls['characteristics'].setValue(groupLink.value.characteristics.sort((a, b) => {
                    return a.sort_order - b.sort_order;
                }));
            } else {
                group.characteristics = [];
            }
        });

        this.productCreateEditForm.controls['products_groups_description_options']
            .setValue(this.productCreateEditForm.controls['products_groups_description_options'].value.sort((a, b) => {
                return a.sort_order - b.sort_order;
            }));
    }

    private addGroupCharacteristic(group: GroupCharacteristics): FormGroup {
        const opts = this.productCreateEditForm.get('products_groups_description_options') as FormArray;
        const formGroup = new FormGroup({
            id: new FormControl(group.id, Validators.required),
            name: new FormControl(group.name, Validators.required),
            description: new FormControl(group.description, Validators.required),
            sort_order: new FormControl(group.sort_order, Validators.required),
            is_main: new FormControl(group.is_main),
            isChecked: new FormControl(group.isChecked),
            characteristics: new FormArray([], Validators.required)
        }, [Validators.required]);

        opts.push(formGroup);

        return formGroup;
    }

    private addCharacteristic(group: FormGroup, characteristic: Characteristic): void {
        const groupIndex = findIndex(this.groupsCharacteristics, (g) => g.id === group.value.id);
        const characteristics = group.get('characteristics') as FormArray;
        characteristics.push(this.fb.group({
            fakeId: new FormControl(characteristic.fakeId),
            name: new FormControl(characteristic.name, Validators.required),
            value: new FormControl(characteristic.value, Validators.required),
            description: new FormControl(characteristic.description),
            sort_order: new FormControl(characteristic.sort_order, Validators.required)
        }, [checkCharacteristicsValidator()]));

        if (groupIndex > -1) {
            const characteristicIndex = findIndex(this.groupsCharacteristics[groupIndex].characteristics,
                (ch: Characteristic) => (ch.id || ch.fakeId) === (characteristic.id || characteristic.fakeId));

            if (characteristicIndex === -1) {
                this.groupsCharacteristics[groupIndex].characteristics.push(characteristic);
            }
        }
    }

    public onMakeCharacteristic(group: FormGroup): void {
        const characteristics = group.get('characteristics') as FormArray;
        const count = characteristics.controls.length ?
            characteristics.controls[characteristics.controls.length - 1].value.sort_order + 1 : 1;
        const characteristic = {
            fakeId: +new Date(),
            name: 'Новая характеристика ' + count,
            value: '',
            description: '',
            sort_order: count
        };

        this.addCharacteristic(group, characteristic);
    }

    public sortOrderGroupsCharacteristics(item: FormGroup, type: string, index: number): void {
        let sortItem;
        let itemSortOrder;
        const descriptionOptions = this.productCreateEditForm.controls['products_groups_description_options'];
        const descriptionOptionsControls = descriptionOptions['controls'];

        switch (type) {
            case 'up':
                if (index - 1 >= 0) {
                    sortItem = descriptionOptionsControls[index - 1];
                }
                break;
            case 'down':
                if ((index + 1) <= (descriptionOptionsControls.length - 1)) {
                    sortItem = descriptionOptionsControls[index + 1];
                }
                break;
            default:
                break;
        }

        if (!sortItem || sortItem.value.is_main) {
            return;
        }

        itemSortOrder = item.get('sort_order').value;
        item.controls['sort_order'].setValue(sortItem.get('sort_order').value);
        sortItem.controls['sort_order'].setValue(itemSortOrder);
        descriptionOptions.setValue(descriptionOptions.value.sort(
            (a: GroupCharacteristics, b: GroupCharacteristics) => {
                return a.sort_order - b.sort_order;
            }));
    }

    public sortOrderCharacteristics(items: FormGroup, item: FormGroup, type: string, index: number): void {
        let sortItem;
        let charactericticSortOrder;
        const characteristicsControls = items.controls.characteristics['controls'];
        const characteristics = items.controls.characteristics;

        switch (type) {
            case 'up':
                if (index - 1 >= 0) {
                    sortItem = characteristicsControls[index - 1];
                }
                break;
            case 'down':
                if ((index + 1) <= (characteristicsControls.length - 1)) {
                    sortItem = characteristicsControls[index + 1];
                }
                break;
            default:
                break;
        }

        if (!sortItem) {
            return;
        }

        charactericticSortOrder = item.get('sort_order').value;
        item.controls['sort_order'].setValue(sortItem.get('sort_order').value);
        sortItem.controls['sort_order'].setValue(charactericticSortOrder);
        characteristics.setValue(characteristics.value.sort((a: Characteristic, b: Characteristic) => {
            return a.sort_order - b.sort_order;
        }));
    }

    public removeCharacteristic(group: any, index: number): void {
        const grp = this.groupsCharacteristics.filter((g) => g.id === group.value.id);

        if (grp && grp.length) {
            grp[0].characteristics.splice(index, 1);
        }

        group.controls['characteristics'].removeAt(index);
    }

    public onSaveOrEditProduct(): void {
        const requestObj = cloneDeep(this.productCreateEditForm.value);

        requestObj.products_groups_description_options = requestObj.products_groups_description_options.map((group) => {
            return {
                id: group.id,
                sort_order: group.sort_order,
                options: group.characteristics.map((characteristic) => {
                    return {
                        name: characteristic.name,
                        value: characteristic.value,
                        description: characteristic.description,
                        sort_order: characteristic.sort_order
                    };
                })
            };
        });

        if (this.productId) {
            this.updateProduct(this.productId, requestObj);
        } else {
            this.createProduct(requestObj);
        }
    }

    private createProduct(product: Product): void {
        this.productsService.createProduct({product_json: product})
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    private updateProduct(productId: number, product: Product): void {
        this.productsService.updateProduct(productId, {product_json: product})
            .subscribe(
                (response) => {
                    if (this.filesList && this.filesList.length) {
                        this.imagesUpload(productId);
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    private imagesUpload(productId: number) {
        const formData = new FormData();
        const filesClone = cloneDeep(this.filesList);
        const files = sortBy(filesClone, (file: FileCustom) => {
            return !file.isFileTitle;
        }).map((file: FileCustom) => {
            delete file.previewSrc;
            delete file.isFileTitle;

            return file;
        });

        forEach(files, (file) => {
            formData.append('files', file);
        });

        this.productsService.imagesUpload(productId, formData).subscribe(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    }

}
