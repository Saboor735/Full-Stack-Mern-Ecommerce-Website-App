import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller, setBestSeller]= useState([]);
    
    useEffect(()=>
    { const bestProduct=products.filter((item)=>item.bestseller);
setBestSeller(bestProduct.slice(0,5))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLERS"}/>
            <p className='w-3/4 m-auto text-center text-xs sm:text-sm md:text-base text-gray-600'> xgyxkwndkle d efdy2hdo2md2bdi2edn2klwd2e2 </p>
        </div>
 {/* Rendering Best Seller Products */}
            <div className='flex gap-4 overflow-x-auto py-4'>
                {bestSeller.map((item, index) => (
                    <ProductItem 
                        key={index} 
                        id={item._id} 
                        image={item.image} 
                        name={item.name} 
                        price={item.price}
                        thumb={true}
                    />
                ))}
                </div>
    </div>
  )
}

export default BestSeller