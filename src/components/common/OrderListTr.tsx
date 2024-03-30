import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'

import moment from "moment";
import { Link } from "react-router-dom";
import { OrderResponse } from "../../context/interfaces/OrderInterface";
import henceforthApi from "../../utils/henceforthApi";
import henceofrthEnums from '../../utils/henceofrthEnums';
import OrderStatus from '../order/OrderStatus';

export default (props: OrderResponse) => <tr key={props._id}>
    <td>{(props?.index + 1)}</td>
    <td><Link to={`/order/${props._id}`}>{props.order_id}</Link></td>
    <td className='product-image-table'>
        {props.openFor == "seller_id" ?
            <Link className='d-flex align-items-center gap-2' to={`/seller/${props?.seller_id?._id}`}>
                <img src={props?.seller_id?.image ? `${henceforthApi.API_FILE_ROOT_SMALL}${props?.seller_id?.image}` : profile_placeholder} alt="img" className='rounded-circle' />
                <span>{props?.seller_id?.name ? props?.seller_id?.name : "Not Aaviable"}</span>
            </Link> :
            <Link className='d-flex align-items-center gap-2' to={`/user/${props?.user_id?._id}`}>
                <img src={props?.user_id?.profile_pic ? `${henceforthApi.API_FILE_ROOT_SMALL}${props?.user_id?.profile_pic}` : profile_placeholder} alt="img" className='rounded-circle' />
                <span>{props?.user_id?.name ? props?.user_id?.name : "Not Aaviable"}</span>
            </Link>}
    </td>
    <td className='product-image-table'>
        <Link to={`/product/${props?.product_id?._id}`} className='d-flex gap-2'>
            {Array.isArray(props?.product_id?.images) && (props?.product_id?.images?.length) ?  <img src={`${henceforthApi.API_FILE_ROOT_MEDIUM}${props?.product_id?.images[0]}`} alt="img" /> : <img src={profile_placeholder} alt=''/>}
            <div className='product-detail-table'>
                <p>{props?.product_id.name ? props?.product_id.name.slice(0,20) : "Not Aaviable"}</p>
                <p><b>&#36;</b>{props?.total_price ? props?.total_price : "Not Aaviable"}</p>
            </div>
        </Link>
    </td>
    <td className='status-badge'>
        <OrderStatus {...props} />
    </td>
    <td>{moment(Number(props?.created_at)).format("MMM Do YY")}</td>
</tr>