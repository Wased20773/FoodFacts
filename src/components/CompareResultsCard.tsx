import type { FoodProduct } from '../types/food'
import { FoodResultCard } from './FoodResultCard'

type Props = {
    firstProdcut: FoodProduct;
    secondProduct: FoodProduct;
}

export default function CompareResultsCard({firstProdcut, secondProduct}: Props): React.JSX.Element {
    return (
        <div className='compare-results-card'>
            <FoodResultCard product={firstProdcut} />

            <FoodResultCard product={secondProduct} />
        </div>
    )
}