/**
 * Custom slot/entity type.
 *
 * Represents some of the nutrition values supported by the Food Facts VA.
 */
export type NutrientSlot =
    | 'calories'
    | 'sugar'
    | 'fat'
    | 'protein'
    | 'salt'
    | 'sodium'

/**
 * Slot collection used by intents.
 */
export type Slots = {
    productName?: string;       // product_name
    secondProductName?: string; // product_name
    nutrient?: NutrientSlot;    // custom: NutrientSlot
};

/**
 * Valid values for the NutrientSlot entity type.
 */
export const nutrientSlotValues: NutrientSlot[] = [
    'calories',
    'sugar',
    'fat',
    'protein',
    'salt',
    'sodium',
];