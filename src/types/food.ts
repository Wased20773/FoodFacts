export interface FoodSearchResponse {
    count: number;
    page: number;
    page_size: number;
    products: FoodProduct[];
}

export interface FoodProduct {
    code?: string;
    product_name?: string;
    brands?: string;
    image_front_url?: string;
    ingredients_text?: string;
    nutriments?: Nutriments;
    nutriscore_grade?: string;
}

export interface Nutriments {
    sugars_100g?: number;
    fat_100g?: number;
    proteins_100g?: number;
    salt_100g?: number;
    ['energy-kcal_100g']?: number;
}
