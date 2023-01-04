import { useContext } from "react";

import ProductCard from "../../product-card.jsx/product-card";

import { ProductsContext } from "../../contexts/products.context";

import './shop.scss';



const Shop = () => {
    const {products} = useContext(ProductsContext);

    return(
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default Shop;