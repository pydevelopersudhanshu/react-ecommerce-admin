import { useContext, useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { GlobalContext, handleError } from "../../../context/Provider";
import henceforthApi from "../../../utils/henceforthApi";
import defaultIcon from '../../../assets/images/pages/dummy-image.jpg'
import Spinner from "../../../components/BootstrapCompo";
import { toast } from "react-toastify";



const Addfeaturedcategory = () => {

    const {onChangeBack, category,authState,
        categoryId, setCategoryId, subCategory, subCategoryId, setSubCategoryId,numericValue } = useContext(GlobalContext);
    const match = useMatch(`/management/featured-categories/add`)
    const navigate = useNavigate()
    const [file, setfile] = useState(null as any)
    const [state, setstate] = useState({
        title: "",
        price: "",
        loading: false,
        category_id: "",
        subcategory_id: ""
    })
    const [error, seterror] = useState({
        image: "",
        title: "",
        price: "",
        category_id: "",
        subcategory_id: ""
    })
    const fileupload = async () => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file)
            const data = apiRes.data
            return data.file_name
        } catch (error) {
            handleError(error)
        } finally {

        }
    }
    const handlesubmit = async (e: any) => {
        e.preventDefault()
        if (!file && !state.title && !state.price && !state.category_id && !state.subcategory_id) {
            seterror({
                ...error,
                image: "Please upload",
                title: "Please enter title",
                price: "Please enter price",
                category_id: "Please choose ",
                subcategory_id: "Please choose subcategory"
            })
            return
        }
        if (!file) return seterror({ ...error, image: "Please upload", })
        if (!state.title) return seterror({ ...error, title: "Please enter title", })
        if (!state.price) return seterror({ ...error, price: "Please enter price", })
        if (!categoryId) return seterror({ ...error, category_id: "Please choose category", })
        if (!subCategoryId) return seterror({ ...error, subcategory_id: "Please choose subCategory", })
        setstate({
            ...state,
            loading: true
        })
        try {
            const image = await fileupload()
            const data = {
                title: state.title,
                image: image,
                price: state.price,
                category_id: categoryId,
                subcategory_id: subCategoryId,
                language: authState.lang
            }
            let apiRes = await henceforthApi.FeaturedCategories.Featuredadd(data)
            toast.success(apiRes.message)
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
                            <h2>Add Featured Categories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home-Management</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Featured Categories</li>
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
                            <div className="col-sm-10 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Featured Categories</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-1 is-invalid'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file"
                                                            onChange={(e: any) => { seterror({ ...error, image: "" }); setfile(e.target.files[0]) }} />
                                                    </div>
                                                    <img src={file ? URL.createObjectURL(file as any) : `${defaultIcon}`} alt="img"
                                                        className={`form-control ${error.image ? 'border border-danger' : ""} rounded-0`}
                                                    />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            {/* error msg */}
                                            <div className={`mb-3 ${error.image ? "invalid-feedback" : ""}`}>
                                                {error.image}
                                            </div>
                                            </div>
                                            {/* Title*/}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Title</label>
                                                <input type="text" className={`form-control ${error.title ? 'is-invalid' : ''}   rounded-0`} placeholder='Title' value={state.title} onChange={handlechnage} name="title" />
                                            {/* error msg  */}
                                            <div className={`${error.title ? "invalid-feedback" : ""}`}>
                                                {error.title}
                                            </div>
                                            </div>
                                            {/* price */}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Price</label>
                                                <input type="text" className={`form-control ${error.price ? `is-invalid` : ``} rounded-0`}
                                                    value={state.price} placeholder='Price'
                                                    onKeyPress={(e) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                     onChange={handlechnage} name="price" />
                                            {/* error msg  */}
                                            <div className={`${error.price ? "invalid-feedback" : ""}`}>
                                                {error.price}
                                            </div>
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                {/* <input type="text" className="form-control rounded-0"  placeholder='Category level-1' /> */}
                                                <select className={`form-select ${error.category_id ? `is-invalid` : ``}  `} aria-label="Default select example" value={categoryId}
                                                    onChange={(e: any) => { seterror({ ...error, category_id: "" }); setCategoryId(e.target.value) }}>
                                                    <option value=''>Select</option>
                                                    {category.map((res: any) => <option key={res._id} value={res._id} >{res.name}</option>)}
                                                </select>
                                            {/* error message */}
                                            <div className={`${error.category_id ? "invalid-feedback" : ""}`}>
                                                {error.category_id}
                                            </div>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-2</label>
                                                <select className={`form-select ${error.subcategory_id ? `is-invalid` : ``}`} aria-label="Default select example" value={subCategoryId}
                                                    onChange={(e: any) => { seterror({ ...error, subcategory_id: "" }); setSubCategoryId(e.target.value) }} disabled={!categoryId} >
                                                    <option value=''>Select</option>
                                                    {subCategory.map((res: any) => <option key={res._id} value={res._id}>{res.name}</option>)}
                                                </select>
                                            {/* error msg */}
                                            <div className={`${error.subcategory_id ? "invalid-feedback" : ""}`}>
                                                {error.subcategory_id}
                                            </div>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={state.loading} onClick={onChangeBack} ><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'><button type='submit' className='btn btn-theme w-100' disabled={state.loading} >{state.loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i> Save</span>}</button></li>
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
export default Addfeaturedcategory;