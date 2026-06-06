import type { FoodProduct } from '../types/food';

/*
 * 12 row entries for our mock database. The user should be able to
 * search and pull up any data from any of these generated rows by using
 * the product_name value.
 * 
 * Look at ./mockDatabase.ts for how to enable mock data-use
 * through the command line.
 */

export const mockNutella: FoodProduct = {
    code: 'mock-nutella',
    product_name: 'Nutella',
    brands: 'Ferrero',
    image_front_url: 'https://www.ferrerofoodservice.com/us/sites/ferrerofoodservice20_us/files/styles/width_750/public/2023-11/nutella_jar_white.jpg?t=1780326470',
    ingredients_text: 'Sugar, palm oil, hazelnuts, skim milk powder, cocoa, lecithin, vanillin.',
    nutriments: {
        sugars_100g: 21,
        fat_100g: 11,
        proteins_100g: 2,
        salt_100g: 0.038,
        sodium_100g: 0.015,
        'energy-kcal_100g': 200,
    },
    nutriscore_grade: 'e',
};

export const mockAppleSlices: FoodProduct = {
    code: 'mock-apple-slices',
    product_name: 'Apple Slices',
    brands: 'Go Ahead',
    image_front_url: 'https://images.openfoodfacts.org/images/products/500/016/803/6991/front_en.32.400.jpg',
    ingredients_text: 'Wheat flour, dried grapes (27%) (sultanas and currants in varying proportions), apple flavour filling (9%) [bulking agent (maltitol syrup), humectant (glycerine), wheat bran, apple juice concentrate (0.3%), gelling agent (pectins), acidity regulators (sodium citrates, citric acid), ground cinnamon, natural flavouring, firming agent (calcium lactate)], vegetable oil (sunflower), sugar, dietary fibre (inulin), maltodextrin, rice flour, milk solids, raising agents (sodium bicarbonate, disodium diphosphate, ammonium bicarbonate), glucose syrup, dried skimmed milk, natural flavourings (contains milk), salt, ground cinnamon. for allergens, including cereals containing gluten, see ingredients in bold. may also contain nuts, sesame seeds. *contains 27% dried fruit (sultanas/ currants) and the equivalent of 3.2% apple. typical number of slices per pack: 12',
    nutriments: {
        sugars_100g: 25.6,
        fat_100g: 7.1,
        proteins_100g: 0,
        salt_100g: 0.42,
        sodium_100g: 0.168,
        'energy-kcal_100g': 372.41,
    },
    nutriscore_grade: 'c',
};

export const mockPeanutButter: FoodProduct = {
    code: 'mock-peanut-butter',
    product_name: 'Peanut Butter',
    brands: 'Skippy',
    image_front_url: 'https://images.openfoodfacts.org/images/products/003/760/010/6009/front_en.16.400.jpg',
    ingredients_text: 'CACAHUÈTES GRILLÉES (ARACHIDES) 91%, SUCRE, HUILE DE COLZA, HUILE DE COTON, SEL.',
    nutriments: {
        sugars_100g: 11.4,
        fat_100g: 43.4,
        proteins_100g: 26.9,
        salt_100g: 1,
        sodium_100g: 0.4,
        'energy-kcal_100g': 605,
    },
    nutriscore_grade: 'c',
};

export const mockOreo: FoodProduct = {
    code: 'mock-oreo',
    product_name: 'Oreo Cookies',
    brands: 'Oreo',
    image_front_url: 'https://images.openfoodfacts.org/images/products/762/230/033/6738/front_en.407.400.jpg',
    ingredients_text: 'Sugar, enriched flour, cocoa, palm oil',
    nutriments: {
        sugars_100g: 38,
        fat_100g: 20,
        proteins_100g: 4,
        salt_100g: 1.1,
        sodium_100g: 0.43,
        'energy-kcal_100g': 480,
    },
    nutriscore_grade: 'e',
};

export const mockCocaCola: FoodProduct = {
    code: 'mock-coca-cola',
    product_name: 'Coca-Cola',
    brands: 'Coca-Cola',
    image_front_url: 'https://images.openfoodfacts.org/images/products/544/900/000/0439/front_en.292.400.jpg',
    ingredients_text: 'Carbonated water, sugar, color (caramel (E150d)), acid (phosphoric acid), flavorings, caffeine',
    nutriments: {
        sugars_100g: 11.2,
        fat_100g: 0,
        proteins_100g: 0,
        salt_100g: 0,
        sodium_100g: 0,
        'energy-kcal_100g': 45,
    },
    nutriscore_grade: 'e',
};

export const mockBanana: FoodProduct = {
    code: 'mock-banana',
    product_name: 'Banana',
    brands: 'Del Monte',
    image_front_url: 'https://images.openfoodfacts.org/images/products/071/752/411/1074/front_en.20.400.jpg',
    ingredients_text: 'bananas',
    nutriments: {
        sugars_100g: 12,
        fat_100g: 0.3,
        proteins_100g: 1.1,
        salt_100g: 0,
        sodium_100g: 0,
        'energy-kcal_100g': 89,
    },
    nutriscore_grade: 'a',
};

export const mockGreekYogurt: FoodProduct = {
    code: 'mock-greek-yogurt',
    product_name: 'Creamy Greek Style Natural Yogurt',
    brands: 'Milbona',
    image_front_url: 'https://images.openfoodfacts.org/images/products/405/648/914/8739/front_en.84.400.jpg',
    ingredients_text: 'Milk',
    nutriments: {
        sugars_100g: 0,
        fat_100g: 10,
        proteins_100g: 10,
        salt_100g: 0.0975,
        sodium_100g: 0.039,
        'energy-kcal_100g': 126.4,
    },
    nutriscore_grade: 'c',
};

export const mockProteinBar: FoodProduct = {
    code: 'mock-protein-bar',
    product_name: 'Protein Bars Cocoa Hazelnut',
    brands: 'Nakd',
    image_front_url: 'https://images.openfoodfacts.org/images/products/506/008/870/0112/front_en.30.400.jpg',
    ingredients_text: 'Dates (38%), Peanuts (35%), Chicory fibre (10%), Peanut flour (8%), Hazelnuts (5%), Fat-reduced cocoa powder (3%), natural flavouring.',
    nutriments: {
        sugars_100g: 25.2,
        fat_100g: 21.7,
        proteins_100g: 33,
        salt_100g: 0.01,
        sodium_100g: 0.004,
        'energy-kcal_100g': 424.44,
    },
    nutriscore_grade: 'not-applicable',
};

export const mockPotatoChips: FoodProduct = {
    code: 'mock-potato-chips',
    product_name: 'Lay\'s Classic Potato Chips',
    brands: 'Lay\'s',
    image_front_url: 'https://images.openfoodfacts.org/images/products/002/840/019/9148/front_en.82.400.jpg',
    ingredients_text: 'POTATOES, VEGETABLE OIL (CANOLA, CORN, SOYBEAN AND/OR SUNFLOWER OIL), AND SALT',
    nutriments: {
        sugars_100g: 0.4,
        fat_100g: 35.714,
        proteins_100g: 7.143,
        salt_100g: 1.25,
        sodium_100g: 0.5,
        'energy-kcal_100g': 571.429,
    },
    nutriscore_grade: 'd',
};

export const mockWholeMilk: FoodProduct = {
    code: 'mock-whole-milk',
    product_name: 'Whole Ultra-Filtered Milk',
    brands: 'Dairygold',
    image_front_url: 'https://images.openfoodfacts.org/images/products/002/640/041/7576/front_en.22.400.jpg',
    ingredients_text: 'Ultra-filtered milk, milk, lactase enzyme, vitamin d3.',
    nutriments: {
        sugars_100g: 2.917,
        fat_100g: 3.75,
        proteins_100g: 5.833,
        salt_100g: 0.0833,
        sodium_100g: 0.0333,
        'energy-kcal_100g': 66.667,
    },
    nutriscore_grade: 'b',
};

export const mockCheerios: FoodProduct = {
    code: 'mock-cheerios',
    product_name: 'Cheerios',
    brands: 'General Mills',
    image_front_url: 'https://images.openfoodfacts.org/images/products/001/600/017/0032/front_en.47.400.jpg',
    ingredients_text: 'Whole Grain Oats, Corn Starch, Sugar, Salt, Tripotassium Phosphate. Vitamin E (mixed tocopherols) (added for freshness). Vitamins and Minerals: Calcium Carbonate, Iron and Zinc (mineral nutrients), Vitamin C (sodium ascorbate), A B Vitamin (niacinamide), Vitamin B6 (pyridoxine hydrochloride), Vitamin A (palmitate), Vitamin B₁ (thiamin mononitrate), A B Vitamin (folic acid), Vitamin B12, Vitamin D3.',
    nutriments: {
        sugars_100g: 5.128,
        fat_100g: 1.218,
        proteins_100g: 13,
        salt_100g: 1.35,
        sodium_100g: 0.487,
        'energy-kcal_100g': 358.974,
    },
    nutriscore_grade: 'c',
};

export const mockChickenBreast: FoodProduct = {
    code: 'mock-chicken-breast',
    product_name: 'Boneless Skinless Chicken Breasts',
    brands: 'Tyson',
    image_front_url: 'https://images.openfoodfacts.org/images/products/002/370/016/2205/front_en.4.400.jpg',
    ingredients_text: 'Chicken broth, salt, natural flavorings.',
    nutriments: {
        sugars_100g: 0,
        fat_100g: 2.23,
        proteins_100g: 20.54,
        salt_100g: 0.49,
        sodium_100g: 0.196,
        'energy-kcal_100g': 98.214,
    },
    nutriscore_grade: 'a',
};