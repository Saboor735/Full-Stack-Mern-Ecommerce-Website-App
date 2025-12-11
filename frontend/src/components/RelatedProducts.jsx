import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams, useNavigate } from 'react-router-dom';
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);
    const { id: currentProductId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (products.length > 0) {
            // Filter out the current product and get products from the same category or subcategory
            let relatedProducts = products.filter(product => 
                product._id !== currentProductId && 
                (product.category === category || product.subCategory === subCategory)
            );

            // If we have more than 5 related products, take a random sample
            if (relatedProducts.length > 5) {
                const shuffled = [...relatedProducts].sort(() => 0.5 - Math.random());
                relatedProducts = shuffled.slice(0, 5);
            }

            setRelated(relatedProducts);
        }
    }, [products, category, subCategory, currentProductId]);

    if (related.length === 0) return null; // Don't render if no related products

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <div 
                        key={index} 
                        className='cursor-pointer transition-transform hover:scale-105'
                        onClick={() => navigate(`/product/${item._id}`)}
                    >
                        <ProductItem 
                            key={item._id}
                            id={item._id} 
                            name={item.name} 
                            price={item.price} 
                            image={Array.isArray(item.image) ? item.image : [item.image]}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts