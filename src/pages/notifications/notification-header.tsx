import moment from "moment"
import { Fragment, useContext } from "react"
import { Link } from "react-router-dom"
import { GlobalContext, handleError } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"

const Notificationheader = (props: any) => {

    const { authDispatch, authState, loading, setLoading } = useContext(GlobalContext)
    

    const markAsRead = async (id: string) => {
        if (loading) return
        if (props.readNotification) return
        setLoading(true)
        try {
            await henceforthApi.Notification.markAsRead({}, id)
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {props.checkLength ? <li className="ps-2">{props.NotificationHeading}</li> : ''}
            {Array.isArray(props.Array) && props.Array.length ? props.Array.slice(0, 10).map((res: any, index: number) => <Fragment key={index}>
                {/* <li className="px-3 pt-2"><p>{props.NotificationHeading}</p></li> */}
                <li className='px-3 py-2'>
                    <Link to={`/order/${res?.order_id}`} className="dropdown-item p-2" onClick={() => { markAsRead(res._id) }} >
                        <div className="media-body notification-text d-flex gap-3 justify-content-between align-items-start" >
                            <p><i className="fa fa-envelope fa-fw"></i> {res?.message.length > 21 ? `${res?.message.slice(0, 21)}...` : res?.message ? res?.message : ''}</p>
                            <p className="pull-right text-muted small">{moment(Number(res.created_at)).fromNow()} </p>
                        </div>
                    </Link>
                </li>
                <li className="divider mx-2 my-0"></li></Fragment>) : props.Notifications ? <li className="mx-2 my-0 py-3 notification-text text-center"><p className="text-grey">{props.Notifications}</p></li> : ''}
            {props.viewAll ? <li className="text-center"><p>View All</p></li> : ''}
        </>
    )
}
export default Notificationheader