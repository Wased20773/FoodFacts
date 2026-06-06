import type { FoodProduct } from '../types/food';
import './FoodResultCard.css'
type Props = {
    product: FoodProduct | null;
    side?: 'left' | 'right';
};

export default function FoodResultCard({ product, side }: Props): React.JSX.Element {
    return (
        <article className='food-result-card' style={side ? side === 'left' ? {marginRight: 0} : {marginLeft: 0} : undefined}>
            {/* Image */}
            <img className='product-image' src={product?.image_front_url} width={300}/>
            
            {/* Product Details */}
            <div>
                <div className='product-heading'>
                    <h3 className='product-name'>{product?.product_name || 'N/A' }</h3>
                    <p className='product-brand'>
                        {product?.brands}
                    </p>
                </div>

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

                        <li>
                            Salt: { product?.nutriments?.salt_100g ?? 'N/A' } g
                        </li>

                        <li>
                            Sodium: { product?.nutriments?.sodium_100g ?? 'N/A' } g
                        </li>
                    </ul>
                </div>

                {/* Nutriscore Grade */}
                <p>Nutriscore Grade: {product?.nutriscore_grade}</p>
            </div>
        </article>
    )
}