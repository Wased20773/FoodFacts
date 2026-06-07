import type { FoodProduct, Nutriments } from '../types/food';
import type { NutrientSlot } from '../utils/slots';
import './FoodResultCard.css'
type Props = {
    product: FoodProduct | null;
    compareProduct?: FoodProduct;
    selectedNutriment?: NutrientSlot | null;
    side?: 'left' | 'right';
};

export default function FoodResultCard({ product, compareProduct, selectedNutriment, side }: Props): React.JSX.Element {
    function compareProducts(nutriment: keyof Nutriments): string {
        if (!compareProduct) return '';
        
        const firstNutriment = product?.nutriments?.[`${nutriment}`] || 0;
        const secondNutriment = compareProduct.nutriments?.[`${nutriment}`] || 0;

        if (firstNutriment === secondNutriment) return 'product-equal-nutriment'

        if (firstNutriment < secondNutriment) {
            if (nutriment === 'proteins_100g') return 'product-poor-nutriment';
            return 'product-healthier-nutriment';
        }
        if (nutriment === 'proteins_100g') return 'product-healthier-nutriment';
        return 'product-poor-nutriment';
    }

    function compareNutriscore(): string {
        if (!compareProduct) return '';

        const firstScore = product?.nutriscore_grade?.toLowerCase() || 'z';
        const secondScore = compareProduct?.nutriscore_grade?.toLowerCase() || 'z';

        if (firstScore === secondScore) return 'product-equal-nutriment'
        if (firstScore !== 'not-applicable' && secondScore == 'not-applicable') return ''
        if (firstScore === 'not-applicable') return ''
        if (firstScore < secondScore) {
            return 'product-healthier-nutriment';
        }

        return 'product-poor-nutriment';
    }

    function highlightNutriment(nutriment: NutrientSlot): string {
        return nutriment === selectedNutriment ? 'product-highlight-nutriment' : '';
    }
    
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
                        <li className={`${compareProducts('energy-kcal_100g')} ${highlightNutriment('calories')}`}>
                            Calories: { product?.nutriments?.['energy-kcal_100g'] ?? 'N/A' }
                        </li>

                        <li className={`${compareProducts('sugars_100g')} ${highlightNutriment('sugar')}`}>
                            Sugar: { product?.nutriments?.sugars_100g ?? 'N/A' } g
                        </li>

                        <li className={`${compareProducts('fat_100g')} ${highlightNutriment('fat')}`}>
                            Fat: { product?.nutriments?.fat_100g ?? 'N/A' } g
                        </li>

                        <li className={`${compareProducts('proteins_100g')} ${highlightNutriment('protein')}`}>
                            Protein: { product?.nutriments?.proteins_100g ?? 'N/A' } g
                        </li>

                        <li className={`${compareProducts('salt_100g')} ${highlightNutriment('salt')}`}>
                            Salt: { product?.nutriments?.salt_100g ?? 'N/A' } g
                        </li>

                        <li className={`${compareProducts('sodium_100g')} ${highlightNutriment('sodium')}`}>
                            Sodium: { product?.nutriments?.sodium_100g ?? 'N/A' } g
                        </li>
                    </ul>
                </div>

                {/* Nutriscore Grade */}
                <p className={compareNutriscore()}>Nutriscore Grade: {product?.nutriscore_grade}</p>
            </div>
        </article>
    )
}