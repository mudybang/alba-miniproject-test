import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CustomNavBar from './components/TWNavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/modules/post/Data';
import PostForm from './pages/modules/post/Form';
import EditForm from './pages/modules/post/Edit';
import Category from './pages/modules/Category';
import Tag from './pages/modules/Tag';
import Subscription from './pages/Subscription';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    const [isAuthenticated,setIsAuthenticated]=useState(localStorage.getItem('isAuthenticated'))
    const [isLoaded,setIsLoaded]=useState(false)
    useEffect(() => {
        if(!isAuthenticated && !isLoaded){
            setIsLoaded(true)
        }
    },[isAuthenticated,isLoaded]);
    return (
        <div className="App">
            <div className="container-lg">
                <BrowserRouter>
                    <header>
                        {isAuthenticated && (
                            <CustomNavBar/>
                        )}
                    </header>
                    <main className="p-4" style={{minHeight:"80vh"}}>
                        <Routes>
                            <Route path="/dashboard/" element={<Home/>}/>
                            <Route path="/dashboard/post" element={<Post/>}/>
                            <Route path="/dashboard/post/create" element={<PostForm/>}/>
                            <Route path="/dashboard/post/edit" element={<EditForm/>}/>
                            <Route path="/dashboard/category" element={<Category/>}/>
                            <Route path="/dashboard/tag" element={<Tag/>}/>
                            <Route path="/dashboard/subscription" element={<Subscription/>}/>
                            <Route path="/dashboard/checkout" element={<Checkout/>}/>
                            <Route path="/dashboard/login" element={<Login/>}/>
                            <Route path="/dashboard/register" element={<Register/>}/>
                        </Routes>
                    </main>
                    {isAuthenticated && (
                        <Footer/>
                    )}
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(

            <App/>

    )
}
