import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { FoodProduct, FoodSearchResponse } from '../src/types/food';

const app = express();
const PORT = 3001;

app.use(cors());

const OPEN_FOOD_FACTS_BASE_URL = 'https://world.openfoodfacts.org'

// GET https://world.openfoodfacts.org/api/v2/search
// Purpose: Fetches the metadata of a product via search query
app.get('/api/search', async (req: Request, res: Response): Promise<void> => {
    const query: string = String(req.query.q || '').trim();

    if (!query) {
        res.status(400).json({ error: 'Missing saerch query'});
        return;
    }

    try {
        const response: AxiosResponse = await axios.get<FoodSearchResponse>(
            `${OPEN_FOOD_FACTS_BASE_URL}/cgi/search.pl`, 
            {
                headers: {
                    'User-Agent': 'FoodFacts/0.1 (bvazquez1745@gmail.com)',
                },
                params: {
                    search_terms: query,
                    search_simple: 1,
                    action: 'process',
                    json: 1,
                    page_size: 5,
                }
            }
        );

        const rawProducts = response.data.products ?? [];

        const products: FoodProduct[] = rawProducts.map((product: FoodProduct) => ({
            code: product.code,
            product_name: product.product_name,
            brands: product.brands,
            image_front_url: product.image_front_url,
            ingredients_text: product.ingredients_text,
            nutriments: product.nutriments,
            nutriscore_grade: product.nutriscore_grade,
        }));

    
        res.json({ products });
    } catch (error: unknown) {
        console.error('Open Food Facts proxy error:', error);
        res.status(500).json({
            error: 'Server failed to fetch food data.',
        });
    }
});

app.listen(PORT, (): void => {
    console.log(`API proxy running on http://localhost:${PORT}`)
});