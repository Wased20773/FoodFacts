import type { FoodProduct } from '../types/food';
import './FoodResultCard.css'
type Props = {
    product: FoodProduct | null;
};

export default function FoodResultCard({ product }: Props): React.JSX.Element {
    return (
        <article className='food-result-card' style={{color: 'white'}}>
            {/* Image */}
            <img className='product-image' src={product?.image_front_url} width={300}/>
            
            {/* Product Details */}
            <div>
                <h3 style={{marginBottom: 0}}>{product?.product_name}</h3>
                <p style={{marginTop: 0}}>{product?.brands}</p>

                {/* Ingredients */}
                <div>
                    <h4 style={{marginBottom: 0}}>Ingredients</h4>
                    <p style={{marginTop: 0}}>{product?.ingredients_text}</p>
                </div>

                {/* Nutriments */}
                <div>
                    <h4 style={{marginBottom: 0}}>Nutriments</h4>
                    <ul style={{marginTop: 0}}>
                        <li>
                            Calories: { product?.nutriments?.['energy-kcal_100g'] ?? 'N/A' }
                        </li>

                        <li>
                            Sugar: { product?.nutriments?.sugars_100g ?? 'N/A' } g
                        </li>

                        <li>
                            Fat: { product?.nutriments?.fat_100g ?? 'N/A' } g
                        </li>

                        <li>
                            Protein: { product?.nutriments?.proteins_100g ?? 'N/A' } g
                        </li>
                    </ul>
                </div>

                {/* Nutriscore Grade */}
                <p>Nutriscore Grade: {product?.nutriscore_grade}</p>
            </div>
        </article>
    )
}