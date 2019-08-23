export default function filterSizes(products, filters) {
    return products.filter(
        el => {
            for (let size of filters) {
                if (!el.availableSizes.includes(size)) {
                    return false;
                }
            }
            return true;
        }
    )
}