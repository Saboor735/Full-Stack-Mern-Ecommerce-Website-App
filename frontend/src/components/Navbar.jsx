import React, { useContext, useState, useEffect } from 'react'
import {assets} from "../assets/frontend_assets/assets"
import {Link, NavLink} from "react-router-dom"
import {ShopContext} from "../context/ShopContext"
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setIsAdmin(decodedToken.role === 'admin');
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [token]);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36 ml-4" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        {/* <li>
          <Link to="/virtual-dressing" className="flex flex-col items-center gap-1 text-bold">
            VIRTUAL ROOM
          </Link>
        </li> */}
        <NavLink to="/collections" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        <a 
          href="http://localhost:5174" 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#3D2B1F] hover:bg-[#2A1D15] text-white text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-200 flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span>Admin</span>
        </a>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="" />

        <div className="group relative">
          <img onClick={() => (token ? null : navigate("/login"))} src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />
          {token && (
            <div className="group-hover:block hidden absolute dropdown menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <div>
                  <p className="cursor-pointer hover:text-black">My Profile</p>
                  <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">
                    Orders
                  </p>
                  <p onClick={logout} className="cursor-pointer hover:text-black">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" />
      </div>

      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex item-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collections">
            COLLECTIONS
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;