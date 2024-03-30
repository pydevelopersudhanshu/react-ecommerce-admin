import { useContext, useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../../../components/BootstrapCompo"
import { GlobalContext, handleError } from "../../../context/Provider"
import henceforthApi from "../../../utils/henceforthApi"

const CategoryEdit = () => {
    const match = useMatch("/category/level-1/edit/:name/:type/:id")
    const navigate = useNavigate()
    const [categoryNameError, setCategoryError] = useState("")
    const [categoryName, setCategoryName] = useState(match?.params.name)
    const [loading, setloading] = useState(false)
    const [productType, setProductType] = useState(match?.params.type)
    const { authState } = useContext(GlobalContext);



    const editCategory = async (e: any) => {
        e.preventDefault()
        if (!categoryName) {
            return setCategoryError("Please Enter CategoryName")
        }
        if (!categoryName) return setCategoryError("Please Enter CategoryName")
        setloading(true)
        const data = {
            _id: match?.params.id,
            name: categoryName,
            product_type: productType,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.Category.editCategory(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setloading(false)
        }
    }
    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Categories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Categories</li>
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
                                        <h5>Edit Categories</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={editCategory} >
                                            {/* Input Field  */}
                                            <div className="form-fields-box mb-3 is-invalid">
                                                <label className="mb-1 fw-semibold">Category Name:</label>
                                                <input type="text" placeholder="Category Name" className={`form-control ${categoryNameError ? `is-invalid` : ``} rounded-0`} value={categoryName}
                                                    onChange={(e: any) => { if (categoryNameError) { setCategoryError("") } setCategoryName(e.target.value) }} />
                                                {/* error msg  */}
                                                <div className={`${categoryNameError ? "invalid-feedback" : ""}`}>
                                                    {categoryNameError}
                                                </div>
                                            </div>
                                            <div className="form-select-box mb-4">
                                                <label className="mb-1 fw-semibold">Product Type:</label>
                                                <select className="form-select" aria-label="Default select example" value={productType} onChange={(e) => setProductType(e.target.value)}>
                                                    <option value='WEARABLE_PRODUCT'>WEARABLE PRODUCT</option>
                                                    <option value='ELECTRONIC_PRODUCT'>ELECTRONICS</option>
                                                </select>
                                            </div>
                                            {/* Button  */}
                                            <div className="button-box">
                                                <button type="submit" className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : "Edit Category"}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}
export default CategoryEdit