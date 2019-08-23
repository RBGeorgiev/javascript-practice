export default function sortByPrice(products, order) {
    switch (order) {
        case 'low-to-high':
            return products = products.sort((a, b) => a.price - b.price);
        case 'high-to-low':
            return products.sort((a, b) => b.price - a.price);
        default:
            return products;
    }
}