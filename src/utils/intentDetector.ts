import {
    searchFoodUtterances,
    productNutritionUtterances,
    compareProductUtterances,
} from './utterances';

import type { Slots, NutrientSlot } from './slots';
import { nutrientSlotValues } from './slots';

export type FoodIntent =
    | 'SearchFoodIntent'
    | 'ProductNutritionIntent'
    | 'CompareProductsIntent'
    | 'UnknownIntent';

export type DetectedIntent = {
    intent: FoodIntent;
    transcript: string;
    slots: Slots;
};

/**
 * Removes small filler phrases from product names.
 * Example: "the product nutella?" -> "nutella"
 */
function cleanProductName(productName: string): string {
    return productName
        .replace(/^the product\s+/i, '')
        .replace(/^product\s+/i, '')
        .replace(/[?.!]$/g, '')
        .trim();
}

/**
 * Cleans captured nutrient text.
 * Example: "nutri-score?" -> "nutri-score"
 */
function cleanNutrient(nutrient: string): string {
    return nutrient
        .replace(/[?.!]$/g, '')
        .trim();
}

/**
 * Checks whether a string is a valid NutrientSlot.
 */
function isNutrientSlot(value: string): value is NutrientSlot {
    return nutrientSlotValues.includes(value as NutrientSlot);
}

// ###########################
// #         INTENTS         #
// ###########################

/**
 * Handles SearchFoodIntent.
 *
 * Slots:
 * - productName
 */
function detectSearchFoodIntent(text: string): DetectedIntent | undefined {
    for (const utterance of searchFoodUtterances) {
        const match = text.match(utterance);

        if (match?.[1]) {
            return {
                intent: 'SearchFoodIntent',
                transcript: text,
                slots: {
                    productName: cleanProductName(match[1]),
                },
            };
        }
    }

    return undefined;
}

/**
 * Handles ProductNutritionIntent.
 *
 * Slots:
 * - nutrient
 * - productName
 *
 * Expected match:
 * match[1] = nutrient
 * match[2] = productName
 */
function detectProductNutritionIntent(text: string): DetectedIntent | undefined {
    for (const utterance of productNutritionUtterances) {
        const match = text.match(utterance);


        if (match?.[1] && match?.[2]) {
            const nutrient = cleanNutrient(match[1]);
            const productName = cleanProductName(match[2]);

            if (!isNutrientSlot(nutrient)) {
                return undefined;
            }

            return {
                intent: 'ProductNutritionIntent',
                transcript: text,
                slots: {
                    nutrient,
                    productName,
                },
            };
        }
    }

    return undefined;
}

/**
 * Handles CompareProductsIntent.
 *
 * Slots:
 * - productName
 * - secondProductName
 */
function detectCompareProductsIntent(text: string): DetectedIntent | undefined {
    for (const utterance of compareProductUtterances) {
        const match = text.match(utterance);

        if (match?.[1] && match?.[2]) {
            return {
                intent: 'CompareProductsIntent',
                transcript: text,
                slots: {
                    productName: cleanProductName(match[1]),
                    secondProductName: cleanProductName(match[2]),
                },
            };
        }
    }

    return undefined;
}

/**
 * Main intent detector.
 *
 * Converts transcript text into:
 * - an intent
 * - a slots object
 */
export function detectIntent(transcript: string): DetectedIntent {
    const text = transcript.toLowerCase().trim();

    const compareIntent = detectCompareProductsIntent(text);
    if (compareIntent) return compareIntent;

    const nutritionIntent = detectProductNutritionIntent(text);
    if (nutritionIntent) return nutritionIntent;

    const searchIntent = detectSearchFoodIntent(text);
    if (searchIntent) return searchIntent;

    return {
        intent: 'UnknownIntent',
        transcript: text,
        slots: {},
    };
}