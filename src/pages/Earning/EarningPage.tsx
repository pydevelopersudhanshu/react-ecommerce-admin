import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import defaultImage from '../../assets/images/pages/defaultImage.jpg'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { Fragment, useContext, useEffect, useState } from 'react'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import moment from 'moment'
import { numberWithCommas } from '../../utils/validations'
import Spinner from '../../components/BootstrapCompo'
import BreadCrumb from '../../components/common/BreadCrumb'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import PaginationLayout from '../../components/PaginationLayout'
import EarningRowListing from '../../components/row_view/EarningRowListing'
import Filter from '../filter/filter'
import { toast } from 'react-toastify'
import NODATA from '../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


const EarningPage = () => {
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Earning', url: ``, active: 'not-allowed' }
    ]
    const { authState, loading, setLoading, authDispatch } = useContext(GlobalContext)

    const location = useLocation()
    let limit = 10;
    const navigate = useNavigate()
    const match = useMatch('/earning/:page')
    const newParam = new URLSearchParams(location.search);
    const [state, setstate] = useState({
        data: [] as any,
        product_id: {}

    })
    const [totalCount, setTotalCount] = useState(0)
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
    const copyText = (id: string, name: string) => {
        if (id) {
            navigator?.clipboard?.writeText(id)
            toast.success(`${name} copy successfull`)
        }
    }
    const initialise = async () => {
        setLoading(true)
        try {
            let apires = await henceforthApi.Order.getOrder(
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
    const onChangePagination = (newval: any) => {
        navigate({ pathname: `/earning/${newval}`, search: newParam.toString() })
    }
    useEffect(() => {
        initialise()
    }, [match?.params.page, authState?.lang, newParam.get('search'), newParam.get('product_id'), newParam.get('min_price'), newParam.get('max_price')])
    return (
        <>
            {/* breadcrum  */}


            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {/* Page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className='product-detail-box'>
                        <div className="row justify-content-between">
                            {/* serach and filter  */}
                            <div className="col-md-12">
                                <Filter />
                            </div>
                        </div>

                        {loading ? <div className='d-flex justifly-content-center'><Spinner /></div> :
                            <div className="common-card">
                                <div className="common-card-title">
                                    <h5>Earning</h5>
                                </div>
                                <div className="common-card-content">
                                    {/* table */}

                                    <div className='data-list-table table-responsive mb-3'>
                                        <table className="table table-striped align-middle">
                                            <thead className=''>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Order ID</th>
                                                    <th>Customer Detail</th>
                                                    <th>Seller Detail</th>
                                                    <th>Product ID</th>
                                                    <th>Product Detail</th>
                                                    <th>Product Price</th>
                                                    <th>Earning</th>
                                                    <th>Review</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(state?.data) && (state?.data.length) ? state.data.map((res: any, index) =>
                                                    <EarningRowListing key={res._id} {...res} page={Number(match?.params.page)} index={index} limit={limit} copyText={copyText} />)
                                                    : <tr><td colSpan={9} className="text-center py-3"><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
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
                                            // loading={loading}
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
export default EarningPage;