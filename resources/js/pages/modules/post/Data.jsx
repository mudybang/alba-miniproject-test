import { useState, useEffect } from "react";
import { NavLink,useNavigate  } from "react-router-dom";

const Component_ = () => {
    const navigate=useNavigate();
    const [data, setData] = useState(false);
    const config = {
        headers: {
            'content-type': "application/json",
            'Accept': "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    const baseURL=`${import.meta.env.VITE_API_URL}post`

    useEffect(() => {
        if(!localStorage.getItem('isAuthenticated')){
            navigate("/dashboard/login");
        }else{
            if(!data){
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
    function editData(row){
        navigate("/dashboard/post/edit", {state: row})
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
            <div className="col-span-12">
                <NavLink to="/dashboard/post/create" className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Add Data</NavLink>
                <hr className="mt-2"/>
            </div>
            <div className="col-span-12">
                <div className="relative overflow-y-auto" style={{maxHeight:"300px"}}>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3" width="200px">Title</th>
                                <th scope="col" className="px-6 py-3" width="300px">Content</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Tag</th>
                                <th scope="col" className="px-6 py-3" width="225px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((row,key) => (
                            <tr key={key}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-1">{row.title}</td>
                                <td className="px-6 py-1">{row.content.substring(0, 20)}</td>
                                <td className="px-6 py-1">{row.categories_}</td>
                                <td className="px-6 py-1">{row.tags_}</td>
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
