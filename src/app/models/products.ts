export interface GroupCategoryProduct {
  id: number;
  name: string;
  description: string | null;
}

export interface GroupsCategoryProduct {
  groups_categories: GroupCategoryProduct[];
}

export interface GroupSubCategoryProduct {
  id: number;
  group_category_id: number;
  name: string;
  description: string | null;
}

export interface GroupsSubCategoryProduct {
  groups_subcategories: GroupSubCategoryProduct[];
}

export interface CategoryProduct {
  id: number;
  name: string;
  description: string | null;
  group_subcategory_id: number;
}

export interface CategoriesProduct {
  categories: CategoryProduct[];
}
