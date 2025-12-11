import React, { useEffect, useState } from 'react'
import axios from "axios"
import { backendUrl, currency } from "../App"
import { toast } from 'react-toastify'
const List = ({ token }) => {

  const [list, setList] = useState([])
  const fetchlist = async () => {
    try {

      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (Id) => {
    console.log("DELETE CLICKED, ID =", Id); 
      try {
      const response = await axios.delete(backendUrl + "/api/product/remove", { data: { Id }, headers: { token } })
      console.log("DELETE RESPONSE:", response.data);
      if (response.data.success) {
        toast.success(response.data.message)
        setList(prevList => prevList.filter(item => item._id !== Id));
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      console.log("DELETE ERROR:", error);
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchlist()
  }, [])

  return (
    <>
      <p className='mb-2'>ALL PRODUCTS LIST</p>
      <div className='flex flex-col gap-2'>
        {/* //LIST TABLE TITLE */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* product listing */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr]  md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 py-2 border text-sm' key={index}>

              <img className='w-12' src={item.image[0]} alt='' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>🗑️</p>

            </div>
          ))
        }

      </div>
    </>
  )
}

export default List