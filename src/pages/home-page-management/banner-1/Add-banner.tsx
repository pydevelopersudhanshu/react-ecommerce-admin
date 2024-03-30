import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import defaultIcon from '../../../assets/images/pages/dummy-image.jpg'
import { Link, useMatch } from 'react-router-dom'
import henceforthApi from '../../../utils/henceforthApi'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext, handleError } from '../../../context/Provider'
import { match } from 'assert'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'



const AddBanner = () => {
    const match = useMatch('/management/banner/:type/add')
    const { authState, authDispatch, onChangeBack, category, categoryId, setCategoryId,
        subCategory, subCategoryId, setSubCategoryId, subSubCategory, subSubCategoryId, setSubSubcategoryId, brandID, brand, setbrandID } = useContext(GlobalContext);
    
    const [selectedFile, setSelectedFile] = useState(null as any)
    const [state, setstate] = useState({
        title: "",
        sub_title: "",
        image: "",
        category_id: ""
    })
    const [imageError, setImageError] = useState("")
    const [titleError, settitleError] = useState("")
    const [sub_title, setSub_title] = useState("")
    const [categoryError, setcategoryError] = useState("")
    const [subCategoryError, setSubCategoryError] = useState<any>("")
    const [brandError, setBrandError] = useState("")
    const [loading, setLoading] = useState(false)
    const fileupload = async () => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", selectedFile[0])
            const data = apiRes.data
            return data.file_name
        } catch (error) {
            handleError(error)
        }
    }
    const handlesubmit = async (e: any) => {
        e.preventDefault();
        if (!selectedFile) {
            return setImageError("Please Upload Image")
        }
        if (!categoryId) {
            return setcategoryError("Please select")
        } if (!subCategoryId) {
            return setSubCategoryError("Please select")
        } if (!brandID) {
            return setBrandError("Please select")
        }
        if (!selectedFile) return setImageError("Please Upload Image")
        if (!categoryId) return setcategoryError("Please selcet")
        if (!subCategoryId) return setSubCategoryError("Please select")
        if (!brandID) return setBrandError("Please select")

        try {
            setLoading(true)
            const image = await fileupload()
            let data = {
                // title: state.title,
                // sub_title: state.sub_title,
                image,
                category_id: categoryId,
                subcategory_id: subCategoryId,
                sub_subcategory_id: subSubCategoryId,
                brand_id: brandID,
                position: String(match?.params.type).toUpperCase(),
                language: authState.lang
            }
            let apiRes = await henceforthApi.HomeManagemnt.addbanner(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
            setCategoryId("")
            setSubCategoryId("")
            setSubSubcategoryId("")
            setbrandID("")
        }
    }

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Add Banner</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Banner</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='edit-profile'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4 px-xs-0">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Banner</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-1 is-invalid'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file"  onChange={(e) => { setImageError(""); setSelectedFile(e.target.files) }} accept="image/*" />

                                                    </div>
                                                    <img src={selectedFile ? URL.createObjectURL(selectedFile[0]) : defaultIcon} alt="img" className={`from-control ${imageError ? `border border-danger` : ""} `} />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            <div className={`mb-3 ${imageError ? "invalid-feedback" : ""}`}>
                                                {imageError}
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className={`form-select ${categoryError ? `is-invalid` : ''}`} aria-label="Default select example" value={categoryId} onChange={(e) => { setcategoryError(""); setCategoryId(e.target.value) }}>
                                                    <option value="">Select</option>
                                                    {category.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${categoryError ? "invalid-feedback" : ""}`}>
                                                    {categoryError}
                                                </div>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-2</label>
                                                <select className={`form-select ${subCategoryError ? `is-invalid` : ''}`} aria-label="Default select example" value={subCategoryId} onChange={(e) => { setSubCategoryError(""); setSubCategoryId(e.target.value) }}>
                                                    <option value="">Select</option>
                                                    {subCategory?.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>
                                                    )}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${subCategoryError ? "invalid-feedback" : ""}`}>
                                                    {subCategoryError}
                                                </div>
                                            </div>
                                            {/* Category level-3 */}

                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-3 (optinal) </label>
                                                <select className="form-select" aria-label="Default select example" value={subSubCategoryId}
                                                    onChange={(e) => setSubSubcategoryId(e.target.value)} disabled={!subCategoryId}>
                                                    <option value="">Select</option>
                                                    {subSubCategory?.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                            {/* Brand */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className={`form-select ${brandError ? `is-invalid` : ""} `} aria-label="Default select example" value={brandID} onChange={(e) => { setBrandError(""); setbrandID(e.target.value) }}>
                                                    <option value="">Select</option>
                                                    {brand.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>
                                                    )}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${brandError ? "invalid-feedback" : ""}`}>
                                                    {brandError}
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
export default AddBanner;