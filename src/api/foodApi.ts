import axios from 'axios';
import type { AxiosResponse } from 'axios'
import type { FoodSearchResponse } from '../types/food';

export async function searchFood(query: string): Promise<FoodSearchResponse> {
    const response: AxiosResponse = await axios.get<FoodSearchResponse>(
        'http://localhost:3001/api/search',
        {
            params: {
                q: query,
            },
        }
    );

    return response.data
}
