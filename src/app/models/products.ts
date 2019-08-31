export interface GroupCategoryProduct {
  id: number;
  name: string;
  description: string | null;
}

export interface GroupSubCategoryProduct {
  id: number;
  group_category_id: number;
  name: string;
  description: string | null;
}
