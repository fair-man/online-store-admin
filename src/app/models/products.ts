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

export interface CategoryProduct {
  id: number;
  name: string;
  description: string | null;
  group_subcategory_id: number;
}

export interface CharacteristicsGroup {
  id: number;
  name: string;
  description: string | null;
  is_main: number;
}
