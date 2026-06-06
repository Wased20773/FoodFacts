import type { FoodProduct } from '../types/food'
import FoodResultCard from './FoodResultCard'
import './CompareResultsCard.css'
type Props = {
    firstProdcut: FoodProduct;
    secondProduct: FoodProduct;
}

export default function CompareResultsCard({firstProdcut, secondProduct}: Props): React.JSX.Element {
    return (
        <section className='compare-results-section'>
            <div className='compare-first-product'>
                <FoodResultCard product={firstProdcut} side='left'/>
            </div>
            <div className='compare-second-product'>
                <FoodResultCard product={secondProduct} side='right'/>
            </div>
        </section>
    )
}