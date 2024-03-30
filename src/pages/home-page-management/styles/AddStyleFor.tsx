import { useContext, useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import henceforthApi from "../../../utils/henceforthApi";
import defaultIcon from '../../../assets/images/pages/dummy-image.jpg'
import { toast } from "react-toastify";
import { GlobalContext, handleError } from "../../../context/Provider";
import Spinner from "../../../components/BootstrapCompo";

interface category {
    _id: string,
    name: string
}
const AddStyleFor = () => {
    const match = useMatch(`/management/style-for/:name/:id/add`)
    const { authState, onChangeBack } = useContext(GlobalContext);
    const [brand, setBrand] = useState<Array<category>>([])
    const [brandId, setBrandId] = useState()
    const [category, setCategory] = useState<Array<category>>([])
    const [categoryId, setCategoryId] = useState()
    const [file, setFile] = useState(null as any)
    const [subCategory, setSubcategory] = useState<Array<category>>([])
    const [subCategoryId, setSubcategoryId] = useState<string>()
    const [subsubCategory, setsubSubcategory] = useState<Array<category>>([])
    const [subSubCategoryId, setsubSubcategoryId] = useState()
    const [imageError, setImageError] = useState("")
    const [categoryError, setcategoryError] = useState("")
    const [subCategoryError, setSubCategoryError] = useState<any>("")
    const [subSubCategoryError, setSubSubCategoryError] = useState("")
    const [brandError, setBrandError] = useState("")
    const [loading, setLoading] = useState<boolean>(false)

    // const handleImage = async (e: any) => {
    //     if (imageError) {
    //         setImageError("")
    //     }
    //     let file = e.target.files[0]
    //     const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file)
    //     console.log(apiRes);
    //     setFile(apiRes.data.file_name)
    // }
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
    const initialiseBrand = async () => {
        try {
            let apires = await henceforthApi.HomeManagemnt.Brands()
            setBrand(apires?.data.data)
        } catch {
            console.log("error")
        }
    }
    const initialcategory1 = async () => {
        try {
            const apiRes = await henceforthApi.Category.listCategory()
            setCategory(apiRes?.data.data)
        } catch (error) {
            // handleError(error)
        }
    }
    const initialcategory2 = async () => {
        try {
            const apiRes = await henceforthApi.Category.filterSubCategory(categoryId)
            setSubcategory(apiRes?.data.data)
        } catch (error) {
            // handleError(error)
        }
    }
    const initialcategory3 = async () => {
        try {
            const apiRes = await henceforthApi.Category.filterSubSubCategory(subCategoryId)
            setsubSubcategory(apiRes?.data.data)
        } catch (error) {
            // handleError(error)
        }
    }
    const addCategory = async () => {

        if (!file) {
            return setImageError("Please Upload Image")
        }
        if (!brandId) {
            return setBrandError("Please select")
        }
        if (!categoryId) {
            return setcategoryError("Please select")
        } if (!subCategoryId) {
            return setSubCategoryError("Please select")
        }
        if (!subSubCategoryId) {
            return setSubSubCategoryError("Please select")
        }
        setLoading(true)
        const image = await fileupload()
        let data = {
            style_for_id: match?.params.id,
            image: image,
            category_id: categoryId,
            subcategory_id: subCategoryId,
            sub_subcategory_id: subSubCategoryId,
            brand_id: brandId,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.HomeManagemnt.addstyleCategory(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            // handleError(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialiseBrand()
    }, [authState?.lang])
    useEffect(() => {
        initialcategory1()
    }, [authState?.lang])
    useEffect(() => {
        if (categoryId) {
            initialcategory2()
        } else {
            setSubcategory([])
            setsubSubcategory([])
        }
    }, [categoryId, authState?.lang])
    useEffect(() => {
        if (subCategoryId) {
            initialcategory3()
        } else {
            setsubSubcategory([])
        }
    }, [subCategoryId, authState?.lang])


    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Add Styles</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home-Management</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add styles</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page */}
            <div className='page-spacing'>
                <section className='product-detail'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-3 px-xs-0">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Styles</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={(e) => { e.preventDefault(); addCategory() }}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" onChange={(e: any) => {
                                                            setImageError(""); setFile(e.target.files[0])
                                                        }} />
                                                    </div>
                                                    <img src={file ? URL.createObjectURL(file as any) : defaultIcon} alt="img" className={`from-control ${imageError ? `border border-danger` : ""} `} />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* Title*/}
                                            {/* Brand_id */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className={`form-select ${brandError ? `is-invalid` : ""} `} value={brandId} onChange={(e: any) => {
                                                    setBrandId(e.target.value); if (brandError) {
                                                        setBrandError("")
                                                    }
                                                }} aria-label="Default select example" >
                                                    <option value=''>Select</option>
                                                    {brand.map(items => <option value={items?._id}>{items?.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className={`form-select ${categoryError ? `is-invalid` : ''}`} value={categoryId} aria-label="Default select example" onChange={(e: any) => {
                                                    setCategoryId(e.target.value); if (categoryError) {
                                                        setcategoryError("")
                                                    }
                                                }}>
                                                    <option value=''>Select</option>
                                                    {category.map(item => <option value={item._id}>{item.name}</option>)}
                                                    <option></option>
                                                </select>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-2</label>
                                                <select className={`form-select ${subCategoryError ? `is-invalid` : ''}`} value={subCategoryId}
                                                    onChange={(e: any) => {
                                                        setSubcategoryId(e.target.value); if (subCategoryError) {
                                                            setSubCategoryError("")
                                                        }
                                                    }} aria-label="Default select example" disabled={!categoryId} >
                                                    <option value=''>Select</option>
                                                    {subCategory.map(items => <option value={items?._id}>{items?.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Category level-3 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-3</label>
                                                <select className={`form-select ${subSubCategoryError ? `is-invalid` : ''}`} value={subSubCategoryId} onChange={(e: any) => {
                                                    setsubSubcategoryId(e.target.value); if (subSubCategoryError) {
                                                        setSubSubCategoryError("")
                                                    }
                                                }} aria-label="Default select example" disabled={!subCategoryId}  >
                                                    <option value=''>Select</option>
                                                    {subsubCategory.map(items => <option value={items?._id}>{items?.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'><button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i> Save</span>}</button></li>
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
export default AddStyleFor;