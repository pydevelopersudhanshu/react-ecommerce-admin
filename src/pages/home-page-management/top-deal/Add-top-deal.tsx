import { useMatch, useNavigate } from "react-router-dom";
import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from "react";
import henceforthApi from "../../../utils/henceforthApi";
import { GlobalContext, handleError } from "../../../context/Provider";
import defaultIcon from '../../../assets/images/pages/dummy-image.jpg'
import Spinner from "../../../components/BootstrapCompo";


const Addtop = () => {

    const naigate = useNavigate()
    const { authState, authDispatch, onChangeBack, category, categoryId,
        setCategoryId, subCategory, subCategoryId, setSubCategoryId, subSubCategoryId, setSubSubcategoryId,
        subSubCategory, brand, brandID, setbrandID, loading, setLoading } = useContext(GlobalContext);
    const [file, setfile] = useState(null as any)
    const [state, setstate] = useState({
        title: "",
        price: "",
        discount: "",
        image: "",
        category_id: "",
        subcategory_id: "",
        brand_id: ""
    })
    const [error, seterror] = useState({
        image: "",
        title: "",
        price: "",
        discount: "",
        category_id: "",
        subcategory_id: "",
        brand_id: ""

    })
    const fileupload = async () => {

        // const url = `${henceforthApi.API_ROOT}Upload/do_spaces_file_upload`;
        // const formData = new FormData;
        // formData.append("file", file)
        // const condig = {
        //     headers: {
        //         "content-type": "multipart/form-data",
        //         token: authState.access_token,
        //     },
        // }
        const apiRes = await (await henceforthApi.Common.do_spaces_file_upload("file", file))
        const data = apiRes.data
        return data.file_name
    }
    const handlesubmit = async (e: any) => {
        e.preventDefault()

        if (!file && !state.title && !state.price && !state.category_id && !state.subcategory_id && !state.brand_id) {
            seterror({
                ...error,
                image: "Please upload",
                title: "Please fill title",
                price: "Please enter price",
                discount: "Please enter discount",
                category_id: "Please choose category",
                subcategory_id: "Please choose subcategory",
                brand_id: "Please choose brand"
            })
            return
        }

        if (!file) return seterror({ ...error, image: "Please upload" })
        // if (!state.title) return seterror({ ...error, image: "Please Enter title" })
        // if (!state.price) return seterror({ ...error, price: "please Enter Price" })
        // if (!state.discount) return seterror({ ...error, discount: "please Enter Price" })
        if (!categoryId) return seterror({ ...error, category_id: "Please select" })
        if (!subCategoryId) return seterror({ ...error, subcategory_id: "Please select" })
        if (!brandID) return seterror({ ...error, brand_id: "Please select brand_id" })

        setLoading(true)
        const image = await fileupload()
        try {
            const data = {
                // title: state.title,
                image: image,
                // price: state.price,
                category_id: categoryId,
                subcategory_id: subCategoryId,
                sub_subcategory_id: null,
                brand_id: brandID,
                language: authState.lang
            }
            let apires = await henceforthApi.Topdeals.Addtop(data)
            naigate('/management/top-deal/1')
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
            setCategoryId("")
            setSubCategoryId("")
            subSubCategoryId("")
            setbrandID("")
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
        } if (name === "discount") {
            seterror({
                ...error,
                discount: ""

            })
        } if (name === "category_id") {
            seterror({
                ...error,
                category_id: ""
            })
        } if (name === "subcategory_id") {
            seterror({
                ...error,
                subcategory_id: ""
            })
        } if (name === "brand_id") {
            seterror({
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
                            <h2>Add Top Deals</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home-Management</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Top Deals</li>
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
                            <div className="col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4 px-xs-0">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Top Deals</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-1 is-invalid'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" onChange={(e: any) => { seterror({ ...error, image: "" }); setfile(e.target.files[0]) }} accept="image/png,image/jpg,image/jpeg" />
                                                    </div>
                                                    <img src={file ? URL.createObjectURL(file as any) : `${defaultIcon}`} alt="img"
                                                        className={`form-control ${error.image ? 'border border-danger' : ""} rounded-0`}
                                                    />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* error msg */}
                                            <div className={` mb-3 ${error.image ? "invalid-feedback" : ""}`}>
                                                {error.image}
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                {/* <input type="text" className="form-control rounded-0"  placeholder='Category level-1' /> */}
                                                <select className={`form-select ${error.category_id ? `is-invalid` : ""} rounded-0`} aria-label="Default select example" value={categoryId}
                                                    onChange={(e: any) => { seterror({ ...error, category_id: "" }); setCategoryId(e.target.value) }}>
                                                    <option value=''>select</option>
                                                    {category.map((res: any) => <option value={res._id}>{res.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${error.category_id ? "invalid-feedback" : ""}`}>
                                                    {error.category_id}
                                                </div>
                                            </div>

                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-2</label>
                                                <select className={`form-select ${error.subcategory_id ? `is-invalid` : ""} rounded-0`}
                                                    aria-label="Default select example" value={subCategoryId}
                                                    onChange={(e: any) => { seterror({ ...error, subcategory_id: "" }); setSubCategoryId(e.target.value) }} disabled={!categoryId}>
                                                    <option value=''>Select</option>
                                                    {subCategory.map((res: any) => <option value={res._id}>{res.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${error.subcategory_id ? "invalid-feedback" : ""}`}>
                                                    {error.subcategory_id}
                                                </div>
                                            </div>
                                            {/* Category level-3 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Sub-SubCategory level-3 (optional)</label>
                                                <select className="form-select rounded-0" aria-label="Default select example" value={subSubCategoryId}
                                                    onChange={(e: any) => setSubSubcategoryId(e.target.value)} disabled={!subCategoryId}>
                                                    <option value=''>Select</option>
                                                    {subSubCategory.map((res: any) => <option value="1">{res.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Brand */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className={`form-select rounded-0 ${error.brand_id ? `is-invalid` : ``}`} aria-label="Default select example"
                                                    value={brandID} onChange={(e: any) => { seterror({ ...error, brand_id: "" }); setbrandID(e.target.value) }} >
                                                    <option value=''>select</option>
                                                    {brand.map((res: any) => <option value={res._id}>{res.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${error.brand_id ? "invalid-feedback" : ""}`}>
                                                    {error.brand_id}
                                                </div>
                                            </div>

                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'><button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i>Save</span>}</button></li>
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
export default Addtop