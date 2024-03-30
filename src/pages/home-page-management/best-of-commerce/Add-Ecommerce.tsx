import { useContext, useEffect, useState } from "react";
import { useMatch, Link, useNavigate } from "react-router-dom";
import henceforthApi from "../../../utils/henceforthApi";
import UPLOAD from "../../../assets/images/default1.jpg";
import { GlobalContext, handleError } from "../../../context/Provider";
import defaultIcon from '../../../assets/images/pages/dummy-image.jpg'
import Spinner from "../../../components/BootstrapCompo";
import { toast } from "react-toastify";



const Addcommerce = () => {
    const match = useMatch("/management/best-of-ecommerce/add")
    const navigate = useNavigate()
    const {authState, onChangeBack, category,
        categoryId, setCategoryId, subCategory, subCategoryId,
        setSubCategoryId, subSubCategory, subSubCategoryId, setSubSubcategoryId, brandID, brand, setbrandID } = useContext(GlobalContext);
    const [file, setfile] = useState()
    const [state, setstate] = useState({
        title: "",
        price: "",
        discount: "",
        loading: false,
        category_id: "",
        subcategory_id: "",
        brand_id: ""
    })
    const [error, setError] = useState({
        title: "",
        price: "",
        discount: "",
        loading: false,
        image: "",
        category_id: "",
        subcategory_id: "",
        brand_id: ""
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
        if (!file && !state.title && !state.price && !state.discount && !state.category_id
            && !state.subcategory_id && !state.brand_id) {
            setError({
                ...error,
                image: "Please upload",
                title: "Please fill title ",
                price: "Please enter price",
                discount: "Please enter discount",
                category_id: "Please select",
                subcategory_id: "Please select subcategory",
                brand_id: "Please slect brand_id"

            })
            return
        }
        if (!file) return setError({ ...error, image: "Please upload", })
        if (!state.title) return setError({ ...error, title: "Please fill title", })
        if (!state.price) return setError({ ...error, price: "Please enter Price" })
        if (!categoryId) return setError({ ...error, category_id: "Please select" })
        if (!subCategoryId) return setError({ ...error, subcategory_id: "Please select subcategory_id" })
        if (!brandID) return setError({ ...error, brand_id: "Please select brand_id" })
        setstate({
            ...state,
            loading: true
        })
        const image = await fileupload()
        const data = {
            image: image,
            title: state.title,
            price: state.price,
            category_id: categoryId,
            subcategory_id: subCategoryId,
            sub_subcategory_id: setSubSubcategoryId,
            brand_id: brandID,
            discount: state.discount,
            language: authState.lang
        }
        try {
            const apires = await henceforthApi.Ecommerce.Ecommereceadd(data)
            toast.success(apires.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setstate({
                ...state,
                loading: false
            })
            setCategoryId("")
            setSubCategoryId("")
            setSubSubcategoryId("")
            setbrandID("")
        }
    }
    const handlechnage = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "image") {
            setError({
                ...error,
                image: ""
            })
        } if (name === "title") {
            setError({
                ...error,
                title: ""
            })
        } if (name === "price") {
            setError({
                ...error,
                price: ""
            })
        } if (name === "discount") {
            setError({
                ...error,
                discount: ""
            })
        } if (name === "category_id") {
            setError({
                ...error,
                category_id: ""
            })
        }
        if (name === "subcategory_id") {
            setError({
                ...error,
                subcategory_id: ""
            })
        } if (name === "brand_id") {
            setError({
                ...error,
                brand_id: ""
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
                            <h2>Add Best of E-commerce</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home-Management</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Best of E-commerce</li>
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
                            <div className="col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Best of Ecommerce</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-1 is-invalid'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" onChange={(e: any) => { setError({ ...error, image: "" }); setfile(e.target.files[0]) }} accept="image/png,image/jpg,image/jpeg" />
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
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Title</label>
                                                <input type="text" className={`form-control ${error.title ? `is-invalid` : ``} rounded-0`} placeholder='Title' value={state.title} onChange={handlechnage} name="title" />
                                            {/* error msg  */}
                                            <div className={`${error.title ? "invalid-feedback" : ""}`}>
                                                {error.title}
                                            </div>
                                            </div>
                                            {/* price */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Price</label>
                                                <input type="text" className={`form-control ${error.price ? `is-invalid` : ``} rounded-0`}
                                                 value={state.price} placeholder='Price' onChange={handlechnage} 
                                                 name="price"
                                                 onKeyPress={(e) => {
                                                    if (!/[0-9]/.test(e.key)) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                  />
                                            {/* error msg  */}
                                            <div className={`${error.price ? "invalid-feedback" : ""}`}>
                                                {error.price}
                                            </div>
                                            </div>
                                            {/* Discount */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Discount</label>
                                                <input type="text" className={`form-control ${error.discount ? `is-invalid` : ``} rounded-0`} value={state.discount} placeholder='Discount' onChange={handlechnage} name="discount" />
                                            {/* error msg  */}
                                            <div className={`${error.discount ? "invalid-feedback" : ""}`}>
                                                {error.discount}
                                            </div> 
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                {/* <input type="text" className="form-control rounded-0"  placeholder='Category level-1' /> */}
                                                <select className={`form-select ${error.category_id ? `is-invalid` : ``}  `} aria-label="Default select example"
                                                    value={categoryId} onChange={(e: any) => { setError({ ...error, category_id: "" }); setCategoryId(e.target.value) }} >
                                                    <option value="" >Select</option>
                                                    {category.map((res: any) => <option key={res._id} value={res._id} >{res.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                            <div className={`${error.category_id ? "invalid-feedback" : ""}`}>
                                                {error.category_id}
                                            </div>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-2</label>
                                                <select className={`form-select ${error?.subcategory_id ? `is-invalid` : ``}`} aria-label="Default select example" value={subCategoryId}
                                                 onChange={(e: any) => { setError({ ...error, subcategory_id: "" }); setSubCategoryId(e.target.value) }} disabled={!categoryId} >
                                                    <option selected>select</option>
                                                    {subCategory?.map((res: any) => <option key={res._id} value={res._id}>{res.name}</option>)}
                                                </select>
                                            {/* error msg */}
                                            <div className={`${error.subcategory_id ? "invalid-feedback" : ""}`}>
                                                {error.subcategory_id}
                                            </div>
                                            </div>
                                            {/* category-level-3 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>sub_subcategory level-3(optinal)</label>
                                                <select className="form-select" aria-label="Default select example" value={subSubCategoryId} 
                                                onChange={(e: any) => setSubSubcategoryId(e.target.value)} disabled={!subCategoryId}>
                                                    <option selected>select</option>
                                                    {subSubCategory.map((res: any) => <option key={res._id} value={res._id}>{res.name}</option>)}
                                                </select>
                                            </div>
                                            {/* brand */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className={`form-select ${error.brand_id ? `is-invalid` : ``}`} aria-label="Default select example" value={brandID} onChange={(e: any) => { setError({ ...error, brand_id: "" }); setbrandID(e.target.value) }} >
                                                    <option selected>select</option>
                                                    {brand.map((res: any) => <option key={res._id} value={res._id}>{res.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${error.brand_id ? "invalid-feedback" : ""}`}>
                                                    {error.brand_id}
                                                </div>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button  type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeBack} disabled={state.loading} ><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'><button type='submit' className='btn btn-theme w-100' disabled={state.loading}>{state.loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i> Save</span>}</button></li>
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
export default Addcommerce;