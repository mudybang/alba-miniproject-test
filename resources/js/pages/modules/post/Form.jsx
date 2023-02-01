import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

const Component_ = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title:"",
        content:""
    });
    const [inputCategory, setInputCategory] = useState({
        categories: [],
    });
    const [inputTag, setInputTag] = useState({
        tags:[]
    });

    const config = {
        headers: {
            'content-type': "application/json",
            'Accept': "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    const baseURL=`${import.meta.env.VITE_API_URL}post`
    const [categories, setCategories]= useState(false);
    const [tags, setTags]= useState(false);

    useEffect(() => {
        if(!localStorage.getItem('isAuthenticated')){
            navigate("/dashboard/login");
        }else{
            if(!categories){
                getCategories()
            }
            if(!tags){
                getTags()
            }
        }
    },[categories,tags]);
    function getCategories(){
        axios.get(`${import.meta.env.VITE_API_URL}category`,config).then((res) => {
            if(res.statusText==='OK'){
                setCategories(res.data)
            }
        });
    }
    function getTags(){
        axios.get(`${import.meta.env.VITE_API_URL}tag`,config).then((res) => {
            if(res.statusText==='OK'){
                setTags(res.data)
            }
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleCategoriesChange = (e) => {
        const { value, checked } = e.target;
        const { categories } = inputCategory;
        console.log(`${value} is ${checked}`);
        if (checked) {
            setInputCategory({
                categories: [...categories, value],
            });
        }else {
            setInputCategory({
                categories: categories.filter((e) => e !== value),
            });
        }
        console.log(categories);
    };
    const handleTagsChange = (e) => {
        const { value, checked } = e.target;
        const { tags } = inputTag;
        if (checked) {
            setInputTag({
                tags: [...tags, value],
            });
        }else {
            setInputTag({
                tags: tags.filter((e) => e !== value),
            });
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs)
        console.log(inputCategory)
        console.log(inputTag)
        postData()
    }

    function refreshForm(){
        setInputs({})
        setAction("post")
    }
    function postData(){
        const param={
            title:inputs.title,
            content:inputs.content,
            categories:JSON.stringify(inputCategory.categories),
            tags:JSON.stringify(inputTag.tags)
        }

        axios.post(baseURL,param,config).then((res) => {
            if(res.statusText==='OK'){
                navigate("/dashboard/post");
            }
        });
    }

    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-start-4 col-span-6 shadow-sm p-5 bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input name="title" onChange={handleChange} value={inputs.title} type="text" className="form-control" placeholder="Name" />
                    </div>
                    <div className="mb-3">
                        <label >Content</label>
                        <textarea name="content" onChange={handleChange} className="form-control" rows="3" value={inputs.content} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <div className="grid grid-cols-12 gap-4">
                        {categories && categories.map((row,key) => (
                            <div key={key} className="form-check col-span-4">
                                <input name="categories" onChange={handleCategoriesChange} value={row.id} className="form-check-input" type="checkbox"/>
                                <label >{row.name}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tags</label>
                        <div className="grid grid-cols-12 gap-4">
                        {tags && tags.map((row,key) => (
                            <div key={key} className="form-check col-span-4">
                                <input name="tags" onChange={handleTagsChange} value={row.id} className="form-check-input" type="checkbox" />
                                <label >{row.name}</label>
                            </div>
                        ))}
                        </div>
                    </div>
                    <button type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                    <button type="button" onClick={() => refreshForm()} className="ml-2 inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Refresh</button>
                </form>
            </div>
        </div>
    </>);
}

export default Component_;
