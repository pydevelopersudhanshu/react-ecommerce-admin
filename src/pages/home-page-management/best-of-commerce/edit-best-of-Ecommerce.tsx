import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import profile_img from '../../../assets/images/pages/profile-image.jpg'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../../context/Provider'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'

const EditBestOfEcommerce = () => {

    const match = useMatch(`management/ecommerce/:_id/edit`)
    const navigate = useNavigate()
    const { brand, category, onChangeBack, authState,
        categoryId, setCategoryId, subCategory, subCategoryId, setSubCategoryId,
        subSubCategory, subSubCategoryId, setSubSubcategoryId, loading, setLoading, brandID, setbrandID } = useContext(GlobalContext);
    const [isCategory, setIsCategory] = useState(false)
    const [state, setState] = useState({
        image: "",
        title: "",
        price: "",
        category_id: {
            name: "",
            _id:""
        },
        subcategory_id: {
            name: "",
            _id:""
        },
        sub_subcategory_id: {
            name: "",
            _id:""
        },
        brand_id: {
            name: "",
            _id:""
        },
        discount: ""
    })
    const fileUpload = async (name:string) => {
        try {
            let apiRes = await henceforthApi.Common.do_spaces_file_upload("file", name)
            let data = apiRes.data.file_name
            setState({
                ...state,
                image:data
            })
        } catch (error) {

        }
    }
    const initialise = async () => {
        try {
            let apiRes = await henceforthApi.Ecommerce.detailsEcommerce(match?.params._id)
            setState(apiRes.message)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }
    }
    
    const onChangeHandle = async (e: any) => {
        e.preventDefault()
        if (isCategory && !subCategoryId) {
            return toast.warn('Please select subcategory')
        }
        setLoading(true)
        const data = {
            _id: match?.params._id,
            image: state.image,
            title: state.title,
            price: state.price,
            category_id: categoryId || state?.category_id?._id,
                subcategory_id: isCategory ? subCategoryId : state?.subcategory_id?._id,
                sub_subcategory_id: isCategory ? subSubCategoryId : state?.sub_subcategory_id?._id,
                brand_id: brandID || state?.brand_id?._id,
            discount: state.discount,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.Ecommerce.editEcommerce(data)
            toast.success(apiRes.message)
            navigate('/management/best-of-ecommerce/1')
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const handleChange = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({
            ...state,
            [name]: value
        })

    }

    useEffect(() => {
        initialise()
    }, [authState?.lang])



    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Best of Ecommerce</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Best of Ecommerce</li>
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
                        <div className="row">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-3">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Best of Ecommerce</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={onChangeHandle}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3'>
                                                <div className='banner-edit-image full-home-image img mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" onChange={(e: any) => fileUpload(e.target.files[0])} accept="image/png,image/jpeg" />
                                                    </div>
                                                    <img src={ state.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state.image}` : ""} alt="img" />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* Title*/}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Title</label>
                                                <input type="text" className="form-control rounded-0" value={state.title} name="title" onChange={handleChange} />
                                            </div>
                                            {/* Price */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Price(&#8377;)</label>
                                                <input type="text" className="form-control rounded-0" value={state.price} name="price" onChange={handleChange}
                                                    onKeyPress={(e) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className="form-select" aria-label="Default select example" value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setIsCategory(true); setSubCategoryId(''); setSubSubcategoryId('') }}>
                                                    <option value="">{state.category_id?.name}</option>
                                                    {category.map((res: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-2</label>
                                                <select className="form-select" aria-label="Default select example" value={subCategoryId} onChange={(e) => { setSubCategoryId(e.target.value); setSubSubcategoryId('') }}>
                                                    <option value="">{!isCategory ? state.subcategory_id?.name : "Select"}</option>
                                                    {subCategory.map((res: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}

                                                </select>
                                            </div>
                                            {/* Category level-3 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-3</label>
                                                <select className="form-select" aria-label="Default select example" value={subSubCategoryId} onChange={(e) => setSubSubcategoryId(e.target.value)} >
                                                    <option value="">{!isCategory ? state.sub_subcategory_id?.name : "select"}</option>
                                                    {subSubCategory.map((res: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}

                                                </select>
                                            </div>
                                            {/* Brand */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className="form-select" aria-label="Default select example" value={brandID} onChange={(e) => setbrandID(e.target.value)} >
                                                    <option value="">{state.brand_id?.name}</option>
                                                    {brand.map((res: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}

                                                </select>

                                            </div>

                                            {/* Discount */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Discount</label>
                                                <input type="text" className="form-control rounded-0" value={state.discount}
                                                    name="discount" onChange={handleChange} onKeyPress={(e: any) => {
                                                        if (!/[0-9]/.test(e.key)) {
                                                            e.preventDefault()
                                                        }
                                                    }} />
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}><i className='fa fa-save me-2'></i>{loading ? <Spinner /> : "Save"}</button></li>
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
export default EditBestOfEcommerce;