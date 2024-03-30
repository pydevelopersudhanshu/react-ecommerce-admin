import '../../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import henceforthApi from '../../../utils/henceforthApi'
import { useContext, useEffect, useState } from 'react'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'
import { GlobalContext, handleError } from '../../../context/Provider'
import PaginationLayout from '../../../components/PaginationLayout'
import EnableDisable from '../../../components/common/enableDisable'
import Swal from 'sweetalert2'
import NODATA from '../../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'

interface list {
    _id: string
    image: string,
    category_id: { name: string }
    subcategory_id: { name: string }
    sub_subcategory_id: { name: string }
    brand_id: { name: string }
    loading: boolean
}
interface datalist {
    data: Array<list>,
    total_count: number

}

const StyleForList = () => {
    const match: any = useMatch("/management/style-for/:name/:_id/:page")
    const { loading, setLoading, authState } = useContext(GlobalContext);
    const navigate = useNavigate()
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    const limit = 10
    const [categoryList, setCategoryList] = useState({} as datalist)
    const [checkenable, setcheckenable] = useState([])
    const [state, setState] = useState({} as datalist)
    const [loading1, setLoading1] = useState(false)


    let checkdata = checkenable[0]
    const styleforallCategories = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.HomeManagemnt.styleMenCategory(match?.params?._id)
            console.log(apiRes);
            let v = [] as any
            apiRes?.data?.data.forEach((element: any) => {
                v.push({ ...element, loading: false })
            });

            console.log(apiRes?.data?.data)

            setCategoryList({
                ...state,
                data: v,
                total_count: apiRes.data.total_count
            })
            setState(apiRes)
            setcheckenable({
                ...apiRes.data.data.map((items: any) => {
                    if (items.is_enable === true) {
                        return true
                    }
                })
            })
            console.log(v)
            setLoading(false)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }
    }
    console.log(state.total_count)
    const enableDisable = async () => {
        setLoading1(true)
        try {
            const data = {
                _id: match?.params._id,
                is_enable: checkdata === true ? false : true
            }
            let apiRes = await henceforthApi.HomeManagemnt.enableDisableBanner(data)
            styleforallCategories()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading1(false)
        }
    }
    console.log(categoryList);

    const handleDelete = async (id: string, index: number) => {
        const data = categoryList.data;
        data[index].loading = true
        setCategoryList({
            ...categoryList,
            data
        })

        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apiRes = await henceforthApi.HomeManagemnt.deletestyleCategory(id)
                    toast.success("deleted successfully")
                    styleforallCategories()
                }
                catch (error) {
                    handleError(error)
                }
                finally {
                    data[index].loading = false
                }
            }
            data[index].loading = false
            styleforallCategories()
        })

    }
    const onChangePagination = (page: number) => {
        navigate({ pathname: `/management/style-for/:name/:id/${page}`, search: search.toString() })

    }
    console.log(categoryList)
    useEffect(() => {
        styleforallCategories()
    }, [match?.params?._id, match?.params?.name, authState?.lang])


    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='d-flex justify-content-between align-items-center flex-column flex-sm-row gap-2'>
                                <div>
                                    {/* title  */}
                                    <h2 className='fw-semibold text-center text-sm-start'>Style for {match?.params?.name}</h2>
                                    {/* breadcrum  */}
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active fw-bold">Style For {match?.params?.name}</li>
                                        </ol>
                                    </nav>
                                </div>

                                <div className='enable-diable-button d-flex gap-2'>
                                    <Link to={`/management/style-for/${match?.params.name}/${match?.params._id}/add`} className="btn btn-white btn-sm" type="button"> <i className='fa fa-plus me-1'></i>Add</Link>
                                    <EnableDisable checkdata={checkdata} isEnableDisable={enableDisable} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* {loading ? <div className='text-center'><Spinner /></div> : */}
                        <div className="row gy-3">
                            {/* 1  */}
                            {Array.isArray(categoryList.data) && categoryList.data.length ? categoryList.data.map((items, index) =>
                                <div className="col-md-12 col-lg-6 col-xl-6 col-xxl-4 px-xs-0">
                                    <div className="common-card h-100">
                                        <div className="common-card-content d-flex h-100 flex-column">
                                            {/* image  */}
                                            <div className="profile-image">
                                                <img src={items.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${items.image}` : ""} alt="img" className='img-fluid' />
                                            </div>
                                            {/* Product Detail  */}
                                            <div className="profile-image my-4">
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-1:</span> {items?.category_id?.name ? items?.category_id?.name : "Not Avaiable"}</p>
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-2:</span> {items?.subcategory_id?.name ? items?.subcategory_id?.name : "Not Avaiable"}</p>
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-3:</span> {items?.sub_subcategory_id?.name ? items?.sub_subcategory_id?.name : 'Not Avaiable'}</p>
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Brand(Clothing):</span>{items?.brand_id?.name ? items?.brand_id?.name : 'Not Avaiable'}</p>
                                            </div>
                                            {/* button  */}
                                            <div className="profile-button d-flex gap-2 mt-auto">
                                                <button className='btn btn-white bg-danger text-white border-danger w-100' onClick={() => handleDelete(items?._id, index)}><i className='fa fa-trash me-2'></i>Delete</button>
                                                <Link to={`/management/style-for/${match?.params.name}/${match?.params._id}/${items?._id}/edit`} className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i> Edit</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : <div className='text-center'><img src={NODATA} width="100" /><span className='text-center mt-3'>No data found</span></div>}
                        </div>
                        {/* // } */}
                        {/* Pagination  */}
                        {/* <div className="row">
                            <div className="col-md-12">
                                <div className="common-card">
                                    <div className="common-card-content">

                                        pagination 
                                        <div className='dashboad-pagination-box'> */}
                        <PaginationLayout
                            count={categoryList?.total_count}
                            data={categoryList?.data}
                            page={Number(match?.params.page)}
                            limit={Number(limit)}
                            loading={loading}
                            onPageChange={(val: number) => onChangePagination(val)}
                        />
                        {/* </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </div>

        </>
    )
}
export default StyleForList;