import React, { useState, useEffect } from 'react';
import { NavLink  } from "react-router-dom";

const CustomNavBar = () =>{
    const [isNavCollapsed, setIsNavCollapsed] = useState(false);
    const [isProfileCollapsed, setIsProfileCollapsed] = useState(false);
    const [isLogin,setIsLogin]= useState(localStorage.getItem('isAuthenticated'));
    const [userdata]= useState(JSON.parse(localStorage.getItem('userdata')))

    function doLogout(){
        localStorage.clear();
        setIsLogin(false);
        window.location.href="/dashboard/login"
    }
    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="https://ombagoes.com/" className="flex items-center">
                    <h1 className="text-1xl text-blue-600 font-bold">OmBagoes.COM</h1>
                </a>

                {!isLogin? <div className="flex items-center md:order-2">
                        <NavLink to="/dashboard/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</NavLink>
                    </div>:
                    <div className="flex items-center md:order-2">
                        <button onClick={() => setIsProfileCollapsed(!isProfileCollapsed)} className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={!isProfileCollapsed ? true : false} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="" alt="user photo" />
                        </button>
                        <div className={`${!isProfileCollapsed ? 'hidden' : ''} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown" data-popper-placement="bottom">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{userdata?userdata.name:''}</span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userdata?userdata.email:''}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Change Password</a>
                                </li>
                                <li>
                                    <button onClick={doLogout} className="text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                </li>
                            </ul>
                        </div>
                        <button onClick={() => setIsNavCollapsed(!isNavCollapsed)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded={!isNavCollapsed ? true : false}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                }
                <div className={`${!isNavCollapsed ? 'hidden' : ''} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="mobile-menu-2">
                    <ul className="flex flex-col p-2 mt-2 sm:border sm:border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/dashboard/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/dashboard/post">Posts</NavLink>
                        </li>
                        <li>
                            <NavLink className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/dashboard/category">Categories</NavLink>
                        </li>
                        <li>
                            <NavLink className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/dashboard/tag">Tags</NavLink>
                        </li>
                        <li>
                            <NavLink className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" to="/dashboard/subscription">Subscription</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default CustomNavBar
