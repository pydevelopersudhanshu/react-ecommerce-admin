import { useContext, useState } from "react";
import henceforthApi from "../../../utils/henceforthApi";
import { Link } from "react-router-dom";
import Spinner from "../../../components/BootstrapCompo";
import { toast } from "react-toastify";
import { ELECTRONIC_PRODUCT, WEARABLE_PRODUCT } from "../../../context/actionTypes";
import { GlobalContext, handleError } from "../../../context/Provider";

const AddCategoryLevel1 = () => {
    const [loading, setloading] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const [productType, setProductType] = useState('')
    const [categoryNameError, setCategoryError] = useState("")
    const [productTypeError, setProductTypeError] = useState("")
    const { authState } = useContext(GlobalContext);

    const insertCategory = async (e: any) => {
        e.preventDefault()
        if (!categoryName) {
            return setCategoryError("Please Enter CategoryName")
        }
        if (!productType) {
            return setProductTypeError("Please choose product type")
        }

        if (!categoryName) return setCategoryError("Please Enter CategoryName")
        if (!productType) return setProductTypeError("Please choose product type")

        setloading(true)
        const data = {
            name: categoryName,
            product_type: productType,
            language: authState.lang
        }
        try {
            const apiRes = await henceforthApi.Category.addCategory(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            setloading(false)
            handleError(error)
        }
    }

    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Add Categories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Categories</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-detail'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-10 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Categories</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={insertCategory}>
                                            {/* Input Field  */}
                                            <div className="form-fields-box mb-4 is-invalid">
                                                <label className="mb-1 fw-bold">Category Name:</label>
                                                <input type="text" placeholder="Category Name" className={`form-control ${categoryNameError ? `is-invalid` : ``} rounded-0`} value={categoryName}
                                                    onChange={(e: any) => { if (categoryNameError) { setCategoryError("") } setCategoryName(e.target.value) }} />
                                                {/* error msg  */}
                                                <div className={`${categoryNameError ? "invalid-feedback" : ""}`}>
                                                    {categoryNameError}
                                                </div>
                                            </div>
                                            <div className="mb-4 form-select-box">
                                                <div className="is-invalid">
                                                    <label htmlFor="" className='fw-bolder mb-1'>Product Type</label>
                                                    <select className={`form-select ${productTypeError ? "is-invalid" : ""} `} value={productType} name='product_type' onChange={(e) => { setProductTypeError(""); setProductType(e.target.value) }} >
                                                        <option value='' >Select</option>
                                                        <option value='WEARABLE_PRODUCT'>WEARABLE PRODUCT</option>
                                                        <option value='ELECTRONIC_PRODUCT'>ELECTRONICS PRODUCT</option>
                                                    </select>
                                                </div>
                                                {/* error msg */}
                                                <div className={`${productTypeError ? "invalid-feedback" : ""}`}>
                                                    {productTypeError}
                                                </div>
                                            </div>
                                            {/* Button  */}
                                            <div className="button-box">
                                                <button type="submit" className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : "Add Category"}</button>
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
export default AddCategoryLevel1;