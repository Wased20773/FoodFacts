import axios from 'axios';
import type { AxiosResponse } from 'axios'
import type { FoodProduct, FoodSearchResponse } from '../types/food';
import { mockDatabase } from '../data/mockDatabase';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export async function searchFood(query: string): Promise<FoodSearchResponse> {
    console.log(import.meta.env.VITE_USE_MOCK_DATA);
    
    if (USE_MOCK_DATA) {
        const product: FoodProduct = mockDatabase[query.toLowerCase()];

        return {
            count: product ? 1 : 0,
            page: 1,
            page_size: 1,
            products: product ? [product] : []
        }
    }
    try {
        const response: AxiosResponse<FoodSearchResponse> = await axios.get<FoodSearchResponse>(
            'http://localhost:3001/api/search',
            {
                params: {
                    q: query,
                },
            }
        );
    
        return response.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.error || 'Failed to search food. ', { cause: error });
        };

        throw new Error('Unexpected food search error. ', { cause: error });
    }
}
