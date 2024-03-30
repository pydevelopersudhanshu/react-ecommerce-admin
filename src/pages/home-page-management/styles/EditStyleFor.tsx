import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../../context/Provider'
import { toast } from 'react-toastify'
import Spinner from '../../../components/BootstrapCompo'
interface addList {
    style_for_id: string,
    image: string,
    category_id: string,
    subcategory_id: string,
    sub_subcategory_id: string,
    brand_id: string,
    language: string
}
interface category {
    _id: string,
    name: string
}
interface editList {
    image: string
    category_id: {
        name: string
    },
    sub_subcategory_id: {
        name: string
    },
    subcategory_id: {
        name: string
    },
    brand_id: {
        name: string
    }
}
const EditStyleFor = () => {
    const match: any = useMatch("/management/style-for/:name/:style_id/:id/edit")
    const { category, categoryId, setCategoryId, authState, onChangeBack } = useContext(GlobalContext);
    const [state, setState] = useState({} as editList)
    const [brand, setBrand] = useState<Array<category>>([])
    const [brandId, setBrandId] = useState()
    // const [category, setCategory] = useState<Array<category>>([])
    const [file, setFile] = useState()
    const [subCategory, setSubcategory] = useState<Array<category>>([])
    const [subCategoryId, setSubcategoryId] = useState()
    const [subsubCategory, setsubSubcategory] = useState<Array<category>>([])
    const [subSubCategoryId, setsubSubcategoryId] = useState()
    const [imageError, setImageError] = useState("")
    const [categoryError, setcategoryError] = useState("")
    const [subCategoryError, setSubCategoryError] = useState<any>("")
    const [subSubCategoryError, setSubSubCategoryError] = useState("")
    const [brandError, setBrandError] = useState("")
    const [loading, setLoading] = useState(false)

    const styleforallCategories = async () => {
        try {
            // setLoading(true)
            const apiRes = await henceforthApi.HomeManagemnt.styleCategoryList(match?.params.id, match?.params.style_id)
            console.log(apiRes.data?.data);
            setState(apiRes?.data?.data)
            // setLoading(false)
        } catch (error) {
        }
    }
    const handleImage = async (e: any) => {
        setLoading(true)
        let file = e.target.files[0]
        const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file)
        console.log(apiRes);
        setFile(apiRes.data.file_name)
        setLoading(false)
    }
    const initialiseBrand = async () => {
        try {
            let apires = await henceforthApi.HomeManagemnt.Brands()
            setBrand(apires?.data.data)
        } catch {
            console.log("error")
        }
    }

    const initialcategory2 = async () => {
        try {
            const apiRes = await henceforthApi.Category.filterSubCategory(categoryId)
            setSubcategory(apiRes?.data.data)
        } catch (error) {
            handleError(error)
        }
    }
    const initialcategory3 = async () => {
        try {
            const apiRes = await henceforthApi.Category.filterSubSubCategory(subCategoryId)
            setsubSubcategory(apiRes?.data.data)
        } catch (error) {
            handleError(error)
        }
    }
    const editstyleCategory = async () => {
        setLoading(true)
        let data = {
            _id: match?.params.id,
            style_for_id: match?.params.style_id,
            image: file,
            category_id: categoryId,
            subcategory_id: subCategoryId,
            sub_subcategory_id: subSubCategoryId,
            brand_id: brandId,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.HomeManagemnt.editstyleCategory(data)
            toast.success(apiRes.message)
            setLoading(false)
            window.history.back()
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        initialiseBrand()
    }, [authState?.lang])
    useEffect(() => {
        if (subCategoryId) {
            initialcategory3()
        }
    }, [subCategoryId])
    useEffect(() => {
        if (categoryId) {
            initialcategory2()
        }
    }, [categoryId])
    useEffect(() => {
        styleforallCategories()
    }, [])
    console.log(state?.category_id?.name);

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Styles</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Styles</li>
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
                            <div className="col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4 px-s=xs-0">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Styles</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form action="" onSubmit={(e: any) => { e.preventDefault(); editstyleCategory() }}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3'>
                                                <div className='banner-edit-image full-home-image img mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" accept="image/png,image/jpeg" onChange={(e) => { handleImage(e); setImageError("") }} />
                                                    </div>
                                                    <img src={file ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${file}` : `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state?.image}`} alt="img" />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className="form-select" value={categoryId} aria-label="Default select example" onChange={(e: any) => {
                                                    setCategoryId(e.target.value); if (categoryError) {
                                                        setcategoryError("")
                                                    }
                                                }}>
                                                    <option>{state?.category_id?.name ? state?.category_id?.name : "Not Avaiable"}</option>
                                                    {category.map((item: any) => {
                                                        return (
                                                            <>
                                                                <option value={item._id}>{item.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                    <option></option>
                                                </select>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-2</label>
                                                <select className="form-select" value={subCategoryId} onChange={(e: any) => {
                                                    setSubcategoryId(e.target.value); if (subCategoryError) {
                                                        setSubCategoryError("")
                                                    }
                                                }} aria-label="Default select example" >
                                                    <option>{state?.subcategory_id?.name ? state?.subcategory_id?.name : "Not Available"}</option>
                                                    {subCategory.map(items => <option value={items?._id}>{items?.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Category level-3 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Sub-Category level-3</label>
                                                <select className="form-select" value={subSubCategoryId} onChange={(e: any) => {
                                                    setsubSubcategoryId(e.target.value); if (subSubCategoryError) {
                                                        setSubSubCategoryError("")
                                                    }
                                                }} aria-label="Default select example"  >
                                                    <option>{state?.sub_subcategory_id?.name
                                                    }</option>
                                                    {subsubCategory.map(items => <option value={items?._id}>{items?.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Brand */}
                                            <div className='form-select-box  mb-3'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className="form-select" value={brandId} onChange={(e: any) => {
                                                    setBrandId(e.target.value); if (brandError) {
                                                        setBrandError("")
                                                    }
                                                }} aria-label="Default select example" >
                                                    <option>{state?.brand_id?.name}</option>
                                                    {brand.map(items => <option value={items?._id}>{items?.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i> Save</span>}</button></li>
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
export default EditStyleFor;