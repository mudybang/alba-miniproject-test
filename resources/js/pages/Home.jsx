import React, { useEffect, useState  } from 'react';
import {useSearchParams, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const refresh = searchParams.get('refresh')
    const [userData,setUserData] = useState(null)

    useEffect(() => {
        if(refresh){window.location.href="/dashboard/";}
        if(localStorage.getItem('isAuthenticated')){
            if(userData===null){
                getUserData()
            }else{
                localStorage.setItem('userdata',JSON.stringify(userData))
            }
        }else{
            navigate("/dashboard/login");
        }
    },[refresh, userData]);

    function getUserData(){
        const baseURL=`${import.meta.env.VITE_API_URL}user`
        const config = {
            headers: {
                'content-type': "application/json",
                'Accept': "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        axios.get(baseURL,config).then((res) => {
            if(res.statusText==='OK'){
                setUserData(res.data)
            }
        });
    }
    return (<>
        {searchParams.get('userid')}
        <h1>Your Token :</h1>
        <h1 className="text-1xl text-red-600 font-bold">{localStorage.getItem('access_token')}</h1>

    </>);
}
export default Home;
