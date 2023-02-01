import { useState } from "react";
const Segment = () => {
    const [inputs, setInputs] = useState({
        name:'',
        email:'',
        password:'',
        cpassword:''
    });
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState('')
    const config = {
        headers: {
            'content-type': "application/json",
            'Accept': "application/json",
        }
    }
    const baseURL=`${import.meta.env.VITE_API_URL}register`
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const param={
            name:inputs.name,
            email:inputs.email,
            password:inputs.password
        }
        if(inputs.password!=inputs.cpassword){
            setErrorMessage("Password not match")
        }else{
            axios.post(baseURL,param,config).then((res) => {
                if(res.statusText==='OK'){
                    console.log(res.data)
                    setSuccessMessage('Register Success')
                    doRefresh()
                }
            });
        }
    }
    function doRefresh(){
        setInputs({
            name:'',
            email:'',
            password:'',
            cpassword:''
        })
    }

    return (<><div className="grid grid-cols-12">
        <div className="col-start-5 col-span-4 shadow-sm p-5 bg-white mt-10">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" onChange={handleChange} value={inputs.name} type="text" className="form-control" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input name="email" onChange={handleChange} value={inputs.email} type="email" className="form-control" placeholder="Your Email" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" onChange={handleChange} value={inputs.password} type="password" className="form-control" placeholder="Your Password" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm</label>
                    <input name="cpassword" onChange={handleChange} value={inputs.cpassword} type="password" className="form-control" placeholder="Confirm Password" />
                </div>
                <button type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
            </form>
            <div className="mt-2">
                {errorMessage && successMessage=="" && <p className="text-red-600">{errorMessage}</p>}
                {successMessage && <p className="text-green-600">{successMessage} login <a href='/dashboard/login'>here</a></p>}
            </div>
        </div>
    </div></>);
}
export default Segment;
