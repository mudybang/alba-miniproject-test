import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Component_ = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [action, setAction] = useState("post");
    const [data, setData] = useState([]);
    const config = {
        headers: {
            'content-type': "application/json",
            'Accept': "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    const baseURL=`${import.meta.env.VITE_API_URL}tag`

    const handleSubmit = (event) => {
        event.preventDefault();
        postData()
    }

    useEffect(() => {
        if(!localStorage.getItem('isAuthenticated')){
            navigate("/dashboard/login");
        }else{
            if(data.length==0){
                getData()
            }
        }
    });

    function getData(){
        axios.get(baseURL,config).then((res) => {
            if(res.statusText==='OK'){
                setData(res.data)
                console.log(res.data)
            }
        });
    }
    function refreshForm(){
        setId(0);
        setName("")
        setAction("post")
    }
    function postData(){
        const param={
            name:name,
        }
        if(action=="post"){
            axios.post(baseURL,param,config).then((res) => {
                if(res.statusText==='OK'){
                    console.log(res.data)
                    refreshForm()
                    getData()
                }
            });
        }else{
            axios.put(`${baseURL}/${id}`,param,config).then((res) => {
                if(res.statusText==='OK'){
                    console.log(res.data)
                    refreshForm()
                    getData()
                }
            });
        }

    }
    function editData(row){
        setId(row.id)
        setName(row.name)
        setAction("put")
    }
    function deleteData(id){
        axios.delete(`${baseURL}/${id}`,config).then((res) => {
            if(res.statusText==='OK'){
                getData()
                console.log(res.data)
            }
        });
    }
    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-start-4 col-span-6 shadow-sm p-5 bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name" />
                    </div>
                    <button type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                    <button type="button" onClick={() => refreshForm()} className="ml-2 inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Refresh</button>
                </form>
            </div>
            <div className="col-span-12">
                <hr/>
                <div className="relative overflow-y-auto" style={{maxHeight:"300px"}}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3" width="200px">Title</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map((row,key) => (
                            <tr key={key}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-1">{row.name}</td>
                                <td className="px-6 py-1">
                                    <button onClick={() => editData(row)} className="inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out">Edit</button>
                                    <button onClick={() => deleteData(row.id)} className="ml-2 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

export default Component_;
