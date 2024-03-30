import { Link } from "react-router-dom";


const DashboardCard = (props: any) => {
    return (
        <Link to={props.link ? props.link : '#'} className="h-100">
            <div className="dashboard-card h-100">
                {/* card title  */}
                <div className={`dashboard-card-title d-flex justify-content-between align-items-start  ${props.loading ? 'placeholder-glow' : ''}`}>
                    <h5 className={props.loading ? '' : 'placeholder'}>{props.title}</h5>
                    <span className='px-2'><small className="text-nowrap">Monthly</small></span>
                </div>
                {/* count and Description */}
                <div className="dashboard-card-content d-flex justify-content-between align-items-center">
                    <div className={`dashboard-count-description ${props.loading ? 'placeholder-glow' : ''}`} >
                        <h2 className={`fw-bold m-0 mb-1 ${props.loading ? '' : 'placeholder'}`}>{props.count ? props.count :'0.00' }</h2>
                        <small className={`${props.loading ? '' : 'placeholder'}`}>{props.description}</small>
                    </div>
                    {/* Icon  */}
                    <div className='dashboard-card-icon'>
                        <i className={`fa ${props.icon}`}></i>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default DashboardCard;