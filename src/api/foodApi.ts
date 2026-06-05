import axios from 'axios';
import type { AxiosResponse } from 'axios'
import type { FoodSearchResponse } from '../types/food';

export async function searchFood(query: string): Promise<FoodSearchResponse> {
    try {
        const response: AxiosResponse = await axios.get<FoodSearchResponse>(
            'http://localhost:3001/api/search',
            {
                params: {
                    q: query,
                },
            }
        );
    
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.error || 'Failed to search food. ');
        };

        throw new Error('Unexpected food search error. ');
    }
}
