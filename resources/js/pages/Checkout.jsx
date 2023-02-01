import React, { useEffect, useState  } from 'react';
import {useLocation,useNavigate } from "react-router-dom";

const Component_ = () => {
    //Midtrans
    const [snapToken, setSnapToken]= useState("");
    const [orderId, setOrderId]= useState("");
    const [paymentStatus, setPaymentStatus]=useState("")
    const [orders,setOrders]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)
    const location=useLocation()
    const config = {
        headers: {
            'content-type': "application/json",
            'Accept': "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    const baseURL=`${import.meta.env.VITE_API_URL}order`
    useEffect(() => {
        if(!localStorage.getItem('isAuthenticated')){
            navigate("/dashboard/login");
        }else{
            if(orders.length==0){
                setOrders(current =>[...current,location.state])
                console.log(orders)
            }
            if(totalPrice==0 && orders.length>0){
                orders?.map(function(row) {
                    if(row.price>0){
                        setTotalPrice(totalPrice+ parseInt(row.price))
                    }
                });
            }
        }
    },[orders,totalPrice]);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    };
    function CheckOut(){
        const param={
            total_price:totalPrice,
            item_name:orders[0].name
        }
        axios.post(baseURL,param,config).then((res) => {
            if(res.statusText==='OK'){
                console.log(res.data)
                setSnapToken(res.data.snapToken)
                const script = document.createElement('script')
                script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
                script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY)
                script.async = true

                document.body.appendChild(script)

                return () => {
                    document.body.removeChild(script)
                }
            }
        });
    }
    function doProccess(){
        window.snap.pay(snapToken, {
            onSuccess: () => {
              console.log('success')
            },
            onPending: (result) => {
                setOrderId(result.order_id)
                console.log('pending transaction', result)
            },
            onError: (result) => {
              console.log('error transaction', result)
            },
            onClose: () => {
              console.log('customer close the popup window without the finishing the payment')
            },
          })
    }

    function checkStatus(){
        const b64=window.btoa(`${import.meta.env.VITE_MIDTRANS_SERVER_KEY}:`)
        console.log(`Basic ${b64}`)
        const midtransconfig = {
            headers: {
                'content-type': "application/json",
                'Accept': "application/json",
                'Authorization' : `Basic ${b64}`
            }
        }
        const midurl=`https://corsanywhere.herokuapp.com/https://api.sandbox.midtrans.com/v2/${orderId}/status`
        axios.get(midurl,midtransconfig).then((res) => {
            if(res.statusText==='OK'){
                setPaymentStatus(res.data.status_message)
                console.log(res.data)
            }
        });

    }
    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3" width="200px">Product Name</th>
                            <th scope="col" className="px-6 py-3" width="300px">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((row,key) => (
                            <tr key={key}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-1">{row.name}</td>
                                <td className="px-6 py-1">{numberWithCommas(row.price)}</td>
                            </tr>
                        ))}
                        <tr>
                            <th scope="col" className="px-6 py-3" width="200px">Total</th>
                            <th scope="col" className="px-6 py-3" width="300px">{numberWithCommas(totalPrice)}</th>
                        </tr>
                    </tbody>
                </table>
                {snapToken==''?
                    <button onClick={()=>CheckOut()} className='btn btn-primary'>Check Out</button>:
                    orderId==''?<button onClick={()=>doProccess()} className='btn btn-primary'>Process</button>:
                    paymentStatus==''?<button onClick={()=>checkStatus()} className='btn btn-success'>Ceck Status</button>:
                    <div className="alert alert-info">
                        {paymentStatus}
                    </div>
                }
            </div>
        </div>
    </>);
}
export default Component_
