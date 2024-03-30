import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import Spinner from "../../components/BootstrapCompo";
import BreadCrumb from "../../components/common/BreadCrumb";
import OrderStatus from "../../components/order/OrderStatus";
import henceforthApi from "../../utils/henceforthApi";
import { GlobalContext } from "../../context/Provider";

const NotificationOrderList = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'NotificationOrder Detail', url: ``, active: 'not-allowed' }
    ]
    const { authState } = useContext(GlobalContext);
    const match = useMatch(`/order/:id`)
    const [loading, setLoading] = useState(false)
    const [state, setstate] = useState({
        order_products: []
    })
    const initialise = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.Notification.orderDetails(match?.params.id)
            setstate(apiRes.data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        initialise()
    }, [authState?.lang])

    return (
        <>
            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* search-filter-export */}
                        <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row justify-content-between">

                            </div>
                            {/* table  */}
                            {loading ? <div className="d-flex justifly-content-center"> <Spinner /></div> :
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mt-4">

                                            <div>
                                                {/* table */}
                                                <div className='data-list-table table-responsive mb-3'>
                                                    <table className="table table-striped align-middle">
                                                        <thead className=''>
                                                            <tr>
                                                                <th>Sr.no</th>
                                                                {/* <th>Order ID</th> */}
                                                                <th>Customer Detail</th>
                                                                {/* <th>Seller Detail</th> */}
                                                                <th>Product ID</th>
                                                                <th>Product Detail</th>
                                                                <th>Product price</th>
                                                                <th>Order Status</th>
                                                                <th>Earning</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Array.isArray(state.order_products) && (state.order_products.length) ? state.order_products.map((res: any, index: any) => {
                                                                return (
                                                                    <>
                                                                        <tr >
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td>{res?.address_data?.name}</td>
                                                                            {/* <td></td> */}
                                                                            {/* <td></td> */}
                                                                            <td>{res?.products?.prodct_id}</td>
                                                                            <td>
                                                                                <Fragment>
                                                                                    {Array.isArray(res.products.images) && (res.products.images.length) ? <img src={henceforthApi.FILES.imageSmall(res.products.images[0])} className="w-25" /> : <img src={''} />}
                                                                                    <span>{res?.products?.name ? res?.products?.name : "Not Avaiable"}</span>
                                                                                </Fragment>
                                                                            </td>
                                                                            <td>&#36;{res?.price ? res?.price : 0}</td>
                                                                            <td><OrderStatus {...res} /></td>
                                                                            <td>&#36;{res.admin_commision ? res.admin_commision : 0}</td>
                                                                            <td><div className="btn-group gap-2">
                                                                                <Link to={`/ordersdetails/${res._id}`} className="btn btn-white btn-sm"> <i className='fa fa-eye me-1'></i>View</Link>
                                                                            </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            }) : <tr><td colSpan={9} className="text-center">No data found </td></tr>}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default NotificationOrderList