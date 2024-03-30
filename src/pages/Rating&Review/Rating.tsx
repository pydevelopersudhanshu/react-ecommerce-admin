import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { Fragment, useContext, useEffect, useState } from 'react'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import moment from 'moment'
import { numberWithCommas } from '../../utils/validations'
import Spinner from '../../components/BootstrapCompo'
import BreadCrumb from '../../components/common/BreadCrumb'
import PaginationLayout from '../../components/PaginationLayout'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import Filter from '../filter/filter'
import COPY from "../../../src/assets/images/copy.png"
import { toast } from 'react-toastify'
import NODATA from '../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


const RatingReview = () => {

    const location = useLocation()
    const match = useMatch('/rating/:page')
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Ratings & Reviews List', url: ``, active: 'not-allowed' }
    ]
    let limit = 10
    const newParam = new URLSearchParams(location.search);
    const [totalCount, setTotalCount] = useState(0)
    const { authState, loading, setLoading } = useContext(GlobalContext)
    const navigate = useNavigate()


    const [state, setstate] = useState({
        data: [] as any,
        product_id: {}

    })
    const initialise = async () => {
        setLoading(true)
        try {
            let apires = await henceforthApi.Rating.RatingReview(
                Number(match?.params.page) - 1,
                limit,
                newParam.toString(),
            )
            setstate(apires?.data)
            setTotalCount(apires?.data?.total_count)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const copyText = (id: string) => {
        if (id) {
            navigator?.clipboard?.writeText(id)
            toast.success("ProductId copy successfull")
        }
    }
    const handleSearch = (name: string, value: any) => {
        if (value) {
            newParam.set(name, value)
        } else {
            if (newParam.has(name)) {
                newParam.delete(name)
            }
        }
        navigate({ pathname: `/rating/1`, search: newParam.toString() })
    }
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.Order.export(startDate, endDate)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "Order ID",
                    "Customer Name",
                    "Seller Name",
                    "Product ID",
                    "Product Name",
                    "Product Price  "
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        res.order_id,
                        res.user_id?.name,
                        res.seller_id?.name,
                        res?.product_id?._id,
                        res.product_id?.name,
                        res.product_id?.price
                    ])
                })
            }
            let csvContent =
                "data:text/csv;charset=utf-8," +
                rows.map((e) => e.join(",")).join("\n");
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `user_${moment().valueOf()}.csv`);
            document.body.appendChild(link);
            link.click();
            let closeModal = document.getElementById("closeModal");
            if (closeModal) {
                closeModal.click();
            }
        } catch (error) {
            handleError(error)
        }
    }

    const onChangePriceHandler = async (min_price: string, max_price: string) => {
        if (min_price && max_price) {
            newParam.set("min_price", min_price)
            newParam.set("max_price", max_price)
        } else {
            if (newParam.has("min_price")) {
                newParam.delete('min_price')
            }
            if (newParam.has("max_price")) {
                newParam.delete('max_price')
            }
        }
        navigate({ pathname: '/rating/1', search: newParam.toString() })
    }
    const onChangePagination = (newval: any) => {
        navigate({ pathname: `/rating/${newval}`, search: newParam.toString() })
    }

    useEffect(() => {
        initialise()
    }, [newParam.get('search'), newParam.get('order_status=DELIVERED'), newParam.get('product_id'), newParam.get('min_price'), newParam.get('max_price'), match?.params.page, authState?.lang])


    return (
        <>
            {/* breadcrum  */}
            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* Page  */}

            <div className=' page-spacing'>
                <section className='product-listing'>
                    <div className='product-detail-box'>
                        <div className="row justify-content-between">
                            <div className="col-md-12">
                                <Filter />
                            </div>
                        </div>
                        {loading ? <div className='d-flex justifly-content-center'><Spinner /></div> :
                            <div className="common-card">
                                <div className="common-card-title">
                                    <h5>Rating & Review</h5>
                                </div>
                                <div className="common-card-content">
                                    {/* table */}

                                    <div className='data-list-table table-responsive mb-3'>
                                        <table className="table table-striped align-middle">
                                            <thead className=''>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    {/* <th>Order ID</th> */}
                                                    <th>Customer Detail</th>
                                                    <th>Seller Detail</th>
                                                    <th>Product ID</th>
                                                    <th>Product Detail</th>
                                                    <th>Product Price</th>
                                                    <th>Rating & Review</th>
                                                    {/* <th>Review</th> */}
                                                    <th> Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(state.data) && (state.data.length) ? state.data?.map((res: any, index: any) => {
                                                    return (
                                                        <>


                                                            <tr>
                                                                < td>{Number(match?.params?.page) == 0
                                                                    ? index + 1
                                                                    : (Number(match?.params?.page) - 1) * limit + (index + 1)}</td>
                                                                <td className='product-image-table'>
                                                                    <Link to={`/user/${res?.user_id?._id}`}>
                                                                        <Fragment>
                                                                            <img src={res?.user_id?.profile_pic ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${res?.user_id?.profile_pic}` : profile_placeholder} alt="img" className='rounded-circle me-2' />
                                                                            <span>{res.user_id?.name ? res.user_id?.name : "Not Avaiable"}</span>
                                                                        </Fragment>
                                                                    </Link>
                                                                </td>
                                                                <td className='product-image-table'>
                                                                    <Link to={`/seller/${res?.seller_id?._id}`}>
                                                                        <Fragment>
                                                                            <img src={res.seller_id?.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.seller_id?.image}` : profile_placeholder}
                                                                                alt="img" className='rounded-circle me-2' />
                                                                            <span>{res.seller_id?.name ? res.seller_id?.name : "Not Avaiable"}</span>
                                                                        </Fragment>
                                                                    </Link>
                                                                </td>
                                                                <td>{res.product_id?.prd_id ? res.product_id?.prd_id : 'Not Avaiable'} <img src={COPY} style={{ width: 15 }} onClick={() => copyText(res.product_id?.prd_id)} role="button" data-toggle="tooltip" title={res.product_id?.prd_id} /></td>
                                                                <td >
                                                                    <Link to={`/product/${res?.product_id?._id}`} className="product-image-table d-flex">
                                                                        <Fragment>
                                                                            {Array.isArray(res.product_id?.images) && (res.product_id?.images?.length) ?
                                                                                <img src={henceforthApi.FILES.imageSmall(res.product_id?.images[0])} alt="img" className='me-2' />

                                                                                : ""}
                                                                            <div>
                                                                                <p title={res.product_id?.name}>{res.product_id?.name ? res.product_id?.name : "Not Avaiable"}</p>
                                                                            </div>
                                                                        </Fragment>
                                                                    </Link>
                                                                </td>
                                                                <td><b>&#36;</b>{numberWithCommas(res?.product_id?.product_price ? res?.product_id?.product_price : 0)}</td>
                                                                <td>
                                                                    <i className="fa fa-star text-warning pe-1"></i>{res.ratings ? res.ratings.toFixed(1) : 0} <span>{res.description ? res.description.slice(0, 20) : 'No Rating && Review '}</span>
                                                                </td>
                                                                <td>
                                                                    <div className="btn-group gap-2">
                                                                        <Link className="btn btn-white btn-sm" to={`/product/${res?.product_id?._id}`}> <i className="fa fa-eye me-1"></i>View</Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                }) : <tr><td colSpan={9} className="text-center py-3"> <img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
                                            </tbody>

                                        </table>
                                    </div>
                                    {/* pagination  */}
                                    <div className='dashboad-pagination-box'>
                                        <PaginationLayout
                                            count={totalCount}
                                            data={state?.data}
                                            page={Number(match?.params.page)}
                                            limit={Number(limit)}
                                            loading={loading}
                                            onPageChange={(val: any) => onChangePagination(val)}
                                        />
                                    </div>
                                </div>
                            </div>}
                    </div>
                </section>
            </div>
            <DownloadFileModal exportData={exportData} />
        </>
    )
}
export default RatingReview;