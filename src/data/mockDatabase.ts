import type { FoodProduct } from '../types/food';
import {
    mockNutella,
    mockAppleSlices,
    mockPeanutButter,
    mockOreo,
    mockCocaCola,
    mockBanana,
    mockGreekYogurt,
    mockProteinBar,
    mockPotatoChips,
    mockWholeMilk,
    mockCheerios,
    mockChickenBreast,
} from './mockProducts';

/*
 * mockDatabase is a pre-generated database to mock the functionality of Open
 * Food Facts, using the same FoodProduct Type. 
 * 
 * To use mockDatabase instead of the Open Food Facts API database, run the
 * command:
 *  npm run dev:mock
 * 
 * For more details regarding the mock data or the Open Food Facts API you can go
 * to the README.md file for more details.
 */

export const mockDatabase: Record<string, FoodProduct> = {
    'nutella': mockNutella,
    'apple slices': mockAppleSlices,
    'peanut butter': mockPeanutButter,
    'oreo cookies': mockOreo,
    'coca-cola': mockCocaCola,
    'banana': mockBanana,
    'greek yogurt': mockGreekYogurt,
    'protein bar': mockProteinBar,
    'lay\'s potato chips': mockPotatoChips,
    'Whole ultra filtered milk': mockWholeMilk,
    'cheerios': mockCheerios,
    'boneless skinless chicken breast': mockChickenBreast,
} satisfies Record<string, FoodProduct>;