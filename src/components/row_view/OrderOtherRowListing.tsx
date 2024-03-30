import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import { Fragment } from "react";
import { Link, useMatch } from "react-router-dom";
import henceforthApi from "../../utils/henceforthApi";
import { numberWithCommas } from "../../utils/validations";
import OrderStatus from "../order/OrderStatus";

export default (res: any) => <tr>
    < td> {res.index + 1}
    </td>
    <td>{res.order_id}</td>

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
    <td>{res?.product_id?.prd_id}</td>
    <td >
        <Link to={`/product/${res?.product_id?._id}`} className="product-image-table d-flex">
            <Fragment>
                {Array.isArray(res.product_id?.images) && (res.product_id?.images?.length) ?
                    <img src={henceforthApi.FILES.imageSmall(res.product_id?.images[0])} alt="img" className='me-2' />

                    : <img src={profile_placeholder} alt='' />}
                <div>
                    <p title={res?.product_id?.name}>{res?.product_id?.name ? res?.product_id?.name : "Not Aviable"}</p>
                    {/* <p>{res.product_id?.name.charAt(2)}</p> */}
                </div>
            </Fragment>
        </Link>
    </td>
    {/* <td><b>&#8377;</b>{res.total_price.toLocaleString()}</td> */}
    <td><b>&#36;</b>{numberWithCommas(res?.total_price)}</td>
    <td>
        <OrderStatus {...res} />
    </td>
    {/* <td>{res.product_quantity ? res.product_quantity : 'Not Available'}</td> */}
    <td><b>&#36;</b>{res?.admin_commision?.toLocaleString()}</td>
    <td>
        <div className="btn-group gap-2">
            <Link className="btn btn-white btn-sm" to={`/ordersdetails/${res._id}`}> <i className="fa fa-eye me-1"></i>View</Link>
        </div>
    </td>
</tr>