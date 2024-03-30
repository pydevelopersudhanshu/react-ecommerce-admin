import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import { GlobalContext, handleError } from '../../../context/Provider'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'
import { editDeals } from '../../../context/interfaces'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'
const EditDealOfDay = () => {

    const match = useMatch("/management/deals/:_id/edit")
    const { brand, category, onChangeBack, authState,
        categoryId, setCategoryId, subCategory, subCategoryId, setSubCategoryId,
        subSubCategory, subSubCategoryId, setSubSubcategoryId, loading, setLoading, brandID, setbrandID } = useContext(GlobalContext);
    const [file, setfile] = useState(null as any)
    const [state, setstate] = useState({} as editDeals)

    const initialise = async () => {
        try {
            let apires = await henceforthApi.Dealsofday.viewdeals(match?.params._id)
            setstate(apires.message)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {

        }
    }
    const fileUpload = async () => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file[0])
            const data = apiRes.data
            console.log(data)
            return data.file_name

        } catch (error) {
            handleError(error)
        }
    }
    const onHandleChange = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            const image = await fileUpload()
            const data = {
                _id: match?.params._id,
                image: image,
                title: state.title,
                price: state.price,
                discount: state.discount,
                category_id: categoryId,
                subcategory_id: subCategoryId,
                sub_subcategory_id: subSubCategoryId,
                brand_id: brandID,
                language: authState.lang

            }
            console.log(image)
            let apiRes = await henceforthApi.Dealsofday.editDeals(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const handlechnage = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setstate({
            ...state,
            [name]: value
        })
    }
    useEffect(() => {
        initialise()
    }, [authState?.lang])

    console.log(state)

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Deal Of Day</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Deal Of Day</li>
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
                                        <h5>Edit Deal of Day</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={onHandleChange}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3 is-invalid'>
                                                <div className='banner-edit-image full-home-image img mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={(e: any) => setfile(e.target.files)} />
                                                    </div>
                                                    <img src={file ? URL.createObjectURL(file[0]) : state.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state.image}` : "Not Avaiable"} alt="img"
                                                        className={`form-control  rounded-0`}
                                                    />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>

                                            </div>
                                            {/* Title*/}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Title</label>
                                                <input type="text" className="form-control  rounded-0" value={state.title} onChange={handlechnage} name="title" />
                                            </div>

                                            {/* Price */}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Price(&#8377;)</label>
                                                <input type="text" className="form-control  rounded-0" value={state.price} onChange={handlechnage} name="price" />
                                            </div>

                                            {/* Category level-1 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className="form-select rounded-0" aria-label="Default select example" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
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
                                                <select className="form-select " aria-label="Default select example" value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                                    <option value="">{state.sub_subcategory_id?.name}</option>
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
                                                    <option value="">{state.sub_subcategory_id?.name ? state.sub_subcategory_id?.name : "Not Aaviable "}</option>
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
                                                <input type="text" className="form-control rounded-0" value={`${state.discount}`} onChange={handlechnage} name="discount" />
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeBack} disabled={loading} ><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i>Save</span>}</button></li>
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
export default EditDealOfDay;