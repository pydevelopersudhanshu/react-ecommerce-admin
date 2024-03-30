import { Fragment } from "react";

const TheFooter = () => {
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center text-lg-start">
                        {/* Copy Right Text  */}
                        <p>Copyright &copy; 2022 <b>Henceforth Ecommerce Admin Panel</b>. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default TheFooter;