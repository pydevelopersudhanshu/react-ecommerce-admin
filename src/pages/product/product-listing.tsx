import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { Fragment, useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { listApiResponse } from '../../context/interfaces'
import { GlobalContext, handleError } from '../../context/Provider'
import PaginationLayout from '../../components/PaginationLayout'
import Spinner from '../../components/BootstrapCompo'
import moment from 'moment'
import { numberWithCommas } from '../../utils/validations'
import 'react-calendar/dist/Calendar.css';
import Filter from '../filter/filter'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import BreadCrumb from '../../components/common/BreadCrumb'
import { toast } from 'react-toastify'
import COPY from "../../../src/assets/images/copy.png"
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


const ProductListing = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Product List', url: ``, active: 'not-allowed' }
    ]
    const limit = 10
    const match = useMatch("products/:page")
    const location = useLocation()
    const newParam = new URLSearchParams(location.search);
    const { authState, loading, setLoading, onChangePagination } = useContext(GlobalContext)
    const [state, setState] = useState<listApiResponse>()




    const productlisting = async () => {
        setLoading(true)
        try {
            let apires = await henceforthApi.ProductList.getProductList(
                Number(match?.params.page) - 1,
                limit,
                newParam.toString()
            )
            setState(apires)
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
            toast.success(`ProductId copy successfull`)
        }
    }
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.ProductList.export(startDate, endDate)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "Product Id",
                    "Category Level 1",
                    "Category level 2",
                    "Brand",
                    "Product Name",
                    "Product Price  "
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        res._id,
                        res.category_id?.name,
                        res.subcategory_id?.name,
                        res?.brand_id?.name,
                        res.name,
                        `$${res.price}`
                    ])
                })
            }
            console.log(rows);
            // debugger
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
            // debugger
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        productlisting()
    }, [newParam.get('start_date'), newParam.get('end_date'),
    newParam.get('search'), newParam.get('product_id'), newParam.get('category_id'), newParam.get('subcategory_id'),
    newParam.get('sub_subcategory_id'), newParam.get('min_price'), newParam.get('max_price'), newParam.get('out_of_stock'),
    match?.params.page, authState?.lang])
    return (
        <>
            {/* breadcrum  */}

            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* Page  */}
            <div className=' page-spacing'>
                <section className='product-listing'>
                    <div className='product-detail-box'>
                        <Filter date="active" />
                        <div className="common-card">
                            <div className="common-card-title d-flex justify-content-between">
                                <h5>Product Listing
                                </h5>
                            </div>
                            <div className="common-card-content ">
                                {/* table */}
                                <div className='data-list-table table-responsive mb-3'>
                                    {loading ? <div className='vh-100 d-flex justify-content-center py-5'>
                                        <Spinner />
                                    </div> : <table className="table table-striped align-middle">
                                        <thead className=''>
                                            <tr>
                                                <th>Sr.No.</th>
                                                <th>Product Id</th>
                                                <th>Category Level 1</th>
                                                <th>Category level 2</th>
                                                <th>Brand</th>
                                                <th>Product Details</th>
                                                <th>Product Price</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array.isArray(state?.data.data) && state?.data.data?.length ? state?.data.data.map((res: any, index: any) => {
                                                return (
                                                    <>
                                                        <tr key={res.id}>
                                                            < td>{Number(match?.params?.page) == 0
                                                                ? index + 1
                                                                : (Number(match?.params?.page) - 1) * limit + (index + 1)}</td>
                                                            <td>{res.prodct_id ? res.prodct_id : "Not Avaiable"} <img src={COPY} style={{ width: 15 }} onClick={() => copyText(res.prodct_id)} role="button" data-toggle="tooltip" title={`${res.prodct_id}`} /></td>
                                                            <td>{res?.category_id?.name}</td>
                                                            <td>{res?.subcategory_id?.name}</td>
                                                            <td>{res?.brand_id?.name}</td>
                                                            <td className='product-image-table'>
                                                                {Array.isArray(res.images) || res.images.length ?
                                                                    <img src={res.images[0] ? henceforthApi.FILES.imageSmall(res.images[0]) : profile_placeholder} alt="img" />
                                                                    : ''} {res.name ? res?.name?.slice(0, 20) : 'Not Avaiable'}
                                                            </td>
                                                            <td>&#36; {numberWithCommas(res.price)}</td>
                                                            <td>
                                                                <div className="btn-group gap-2">
                                                                    <Link className="btn btn-white btn-sm" to={`/product/${res._id}`}> <i className="fa fa-eye me-1"></i>View</Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            }) : <tr><td colSpan={9} className="text-center">Not Avaiable</td></tr>}
                                        </tbody>
                                    </table>}
                                </div>
                                {/* pagination  */}
                                <div className='dashboad-pagination-box'>
                                    <PaginationLayout
                                        count={state?.data?.total_count as number}
                                        data={state?.data?.data}
                                        page={Number(match?.params.page)}
                                        limit={Number(limit)}
                                        // loading={loading}
                                        onPageChange={(val: any) => onChangePagination(val)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <DownloadFileModal exportData={exportData} />
        </>
    )
}
export default ProductListing;