import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from "react-router-dom"
const ProductItem = ({id, price, image, name, thumb = false}) => {
    const {currency} =useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
    <div className={thumb ? 'w-40 h-40 sm:w-48 sm:h-48 flex-shrink-0 overflow-hidden rounded' : 'overflow-hidden'}>
        <img
          className={thumb ? 'w-full h-full object-cover hover:scale-110 transition ease-in-out' : 'hover:scale-110 transition ease-in-out'}
          src={image[0]}
          alt=""
        />

    </div>
    <p className='pt-3 pb-1 text-sm'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem