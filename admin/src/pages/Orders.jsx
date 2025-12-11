import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets';
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }
    try {
      console.log("Admin token (Orders.jsx):", token)
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { authorization: `Bearer ${token}` } })
      if (response.data.success) {
        // show recent orders first
        const sorted = [...(response.data.orders || [])].sort((a, b) => (b.date || 0) - (a.date || 0))
        setOrders(sorted)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }
  }
const statusHandler= async (event, orderId)=>{

try {
  
  const response = await axios.post(backendUrl + "/api/order/status", {orderId, status:event.target.value}, {headers:{ authorization: `Bearer ${token}` }})
  if (response.data.success) {
    await fetchAllOrders()
  }
} catch (error) {
  console.log(error)
  toast.error(error.message)
}

}

  useEffect(() => {
    fetchAllOrders()
  }, [token])
  return (
    <div>
      <h3>Order Page</h3>
      {orders && orders.length === 0 && <p>No orders found</p>}
      {orders && orders.length > 0 && (
        <div >
          {orders.map((order, orderIndex) => (
            <div 
  className="
    border-2 border-gray-200 rounded-xl p-6 md:p-8 
    my-4 shadow-sm hover:shadow-md transition
    text-gray-700
    grid grid-cols-1 md:grid-cols-[0.6fr_2fr_1fr_1fr] gap-6 items-start
  " 
  key={orderIndex}
>
  {/* Column 1 — Icon */}
  <div className="flex justify-center">
    <img className="w-14 opacity-80" src={assets.parcel_icon} alt="parcel" />
  </div>

  {/* Column 2 — Order Info */}
  <div className="space-y-2">
    <h3 className="font-semibold text-base">Order #{order._id}</h3>

    <div className="text-sm space-y-1">
      {order.items.map((item, idx) => (
        <p key={idx}>
          {item.name} ×{item.quantity} — <span className="text-gray-500">{item.size}</span>
        </p>
      ))}
    </div>

    {/* Address */}
    <div className="pt-3 text-sm">
      <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
      <p>{order.address.street}</p>
      <p>{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
      <p className="text-gray-500 mt-1">📞 {order.address.phone}</p>
    </div>
  </div>

  {/* Column 3 — Metadata */}
  <div className="text-sm space-y-2">
    <p><span className="font-medium">Items:</span> {order.items.length}</p>
    <p><span className="font-medium">Method:</span> {order.paymentMethod}</p>
    <p>
      <span className="font-medium">Payment:</span>{" "}
      <span className={order.payment ? "text-green-600" : "text-red-500"}>
        {order.payment ? "Done" : "Pending"}
      </span>
    </p>
    <p><span className="font-medium">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
  </div>

  {/* Column 4 — Price & Status aligned RIGHT */}
  <div className="flex flex-col items-end gap-3">
    <p className="text-lg font-semibold">{currency}{order.amount}</p>

    <select
    onChange={(event)=>statusHandler(event,order._id)}  value={order.status} className="border rounded-md px-3 py-2 text-sm cursor-pointer shadow-sm"
    >
      <option value="Order Placed">Order Placed</option>
      <option value="Packing">Packing</option>
      <option value="Shipped">Shipped</option>
      <option value="Out for Delivery">Out for Delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  )
}

export default Orders