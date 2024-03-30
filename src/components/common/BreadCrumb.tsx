import { Link } from "react-router-dom";
import { breadcrumArray } from "../../context/interfaces";

const BreadCrumb=(props:breadcrumArray)=>{
    return(
        <>
            <section className="breadcrum-box">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-between align-items-center">
                            {/* title  */}
                            <div>
                                <h2 className="fw-semibold">{props?.pathNameDeclare[props?.pathNameDeclare?.length - 1]?.name}</h2>
                                {/* breadcrum  */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb m-0">
                                        {props.pathNameDeclare.map((res:any, index: number) => <li className="breadcrumb-item " key={index}><Link to={`${res?.url}`} className={res?.active}>{res?.name}</Link></li>)}
                                    </ol>
                                </nav>
                            </div>
                            {props?.pathNameDeclare[props?.pathNameDeclare?.length - 1]?.name === 'Coupons list' ? <div >
                                <Link to="/coupons/add" className="btn btn-white btn-sm"> <i className='fa fa-plus me-1'></i>Add</Link>
                            </div>:''}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}
export default BreadCrumb;