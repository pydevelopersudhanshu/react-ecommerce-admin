import { url } from "inspector";
import { useContext, useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import henceforthApi from "../../../utils/henceforthApi";
import { GlobalContext, handleError } from "../../../context/Provider";
import defaultIcon from '../../../assets/images/pages/dummy-image.jpg'
import { toast } from "react-toastify";
import Spinner from "../../../components/BootstrapCompo";
import { loadavg } from "os";

const Addshop = () => {

    const {onChangeBack, category, categoryId, setCategoryId, } = useContext(GlobalContext);
    const match = useMatch("/management/shop-with-us/add")
    const navigate = useNavigate()


    const [file, setfile] = useState()
    const [state, setstate] = useState({
        title: "",
        price: "",
        category_id: "",
        loading: false
    })
    const [error, seterror] = useState({
        image: "",
        title: "",
        price: "",
        category_id: ""
    })
    const fileupload = async () => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file)
            let data = apiRes.data
            return data.file_name
        } catch (error) {
            handleError(error)
        }
    }

    const handlesubmit = async (e: any) => {
        e.preventDefault()

        if (!file && !state.title && !state.price && !state.category_id) {
            seterror({
                ...error,
                image: "Please upload image",
                title: "Please enter title",
                price: "Please enter price",
                category_id:"Please choose category"
            })
            return
        }
        if (!file) return seterror({ ...error, image: "Please upload image" })
        if (!state.title) return seterror({ ...error, title: "Please enter title", })
        if (!state.price) return seterror({ ...error, price: "Please enter price", })
        if (!categoryId) return seterror({ ...error, category_id: "Please choose category", })

        setstate({
            ...state,
            loading:true
        })
        const image = await fileupload();
        const data = {
            image: image,
            title: state.title,
            price: state.price,
            category_id: categoryId,
            language: "ENGLISH"
        }
        try {

            let apiRes = await henceforthApi.Shopwith.shopadd(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setstate({
                ...state,
                loading:false
            })
            setCategoryId("")
            
        }
    }
    const handlechnage = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "image") {
            seterror({
                ...error,
                image: ""
            })
        } if (name === "title") {
            seterror({
                ...error,
                title: ""
            })
        } if (name === "price") {
            seterror({
                ...error,
                price: ""
            })
        } if(name === "category_id"){
            seterror({
                ...error,
                category_id:""
            })
        }
        setstate({
            ...state,
            [name]: value
        })
    }

    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2>Add Shop </h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home-Management</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Shop-with-us</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <div className='page-spacing'>
                <section className='edit-profile'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Shop with us</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-1 is-invalid'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" onChange={(e: any) => { seterror({ ...error, image: "" }); setfile(e.target.files[0]) }} accept="image/png,image/jpg,image/jpeg"/>
                                                    </div>
                                                    <img src={file ? URL.createObjectURL(file as any) : `${defaultIcon}`} alt="img"
                                                        className={`form-control ${error.image ? 'border border-danger' : ""} rounded-0`}
                                                    />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* error msg */}
                                            <div className={`mb-3 ${error.image ? "invalid-feedback" : ""}`}>
                                                {error.image}
                                            </div>
                                            {/* Title*/}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Title</label>
                                                <input type="text" className={`form-control ${error.title ? 'is-invalid' : ''}   rounded-0`} placeholder='Title' value={state.title} name="title" onChange={handlechnage} />
                                            {/* error msg  */}
                                            <div className={`${error.title ? "invalid-feedback" : ""}`}>
                                                {error.title}
                                            </div>
                                            </div>
                                            {/* price */}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Price</label>
                                                <input type="text" className={`form-control ${error.price ? 'is-invalid' : ''}   rounded-0`} placeholder='Price' value={state.price} name="price" 
                                                 onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                onChange={handlechnage} />
                                            {/* error msg  */}
                                            <div className={`${error.price ? "invalid-feedback" : ""}`}>
                                                {error.price}
                                            </div>
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className={`form-select ${error.category_id ? `is-invalid` : ``}  `} aria-label="Default select example" value={categoryId}
                                                    onChange={(e: any) => { seterror({ ...error, category_id: "" }); setCategoryId(e.target.value) }} >
                                                    <option value=''>select</option>
                                                    {category.map((res: any) => <option value={res._id}>{res.name}</option>)}

                                                </select>
                                            {/* error message */}
                                            <div className={`${error.category_id ? "invalid-feedback" : ""}`}>
                                                {error.category_id}
                                            </div>
                                            </div>
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white'  disabled={state.loading}  onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'><button type='submit' className='btn btn-theme w-100' disabled={state.loading} >{state.loading ? <Spinner/> :<span><i className='fa fa-save me-2'></i>Save</span>}</button></li>
                                                </ul>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Addshop;