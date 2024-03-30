import henceofrthEnums from "../../utils/henceofrthEnums"

export default ({ order_status }: any) =>
    <span className={`badge-width ${order_status === henceofrthEnums.OrderStatus.PLACED ? 'text-white text-bg-warning' :
     order_status === henceofrthEnums.OrderStatus.CONFIRMED ? 'text-bg-success text-white' :
        order_status === henceofrthEnums.OrderStatus.DELIVERED ? 'text-white bg-success' :
            order_status === henceofrthEnums.OrderStatus.PENDING_CANCELLATION ? 'text-white bg-primary' :
                order_status === henceofrthEnums.OrderStatus.SHIPPED ? 'text-white bg-primary' :
                    order_status === henceofrthEnums.OrderStatus.CANCELLED ? 'text-bg-danger text-white' : ""}  px-2 py-half rounded-half fs-10 fw-semibold`}>
        {order_status && order_status === henceofrthEnums.OrderStatus.PENDING_CANCELLATION ? henceofrthEnums.OrderStatus.PENDING_CANCELLATION.replace(String(henceofrthEnums.OrderStatus.PENDING_CANCELLATION),'PENDING CANCELLATION') : order_status }</span>
