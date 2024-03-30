import { useContext } from "react";
import BreadCrumb from "../../components/common/BreadCrumb";
import loginSuccess from "../../context/actions/auth/loginSuccess";
import { GlobalContext } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";

const SettingPage = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Setting', url: ``, active: 'not-allowed' }
    ]
    const { authState, authDispatch } = useContext(GlobalContext);

    const onChangeLanguage = (value: string) => {
        loginSuccess({ lang: value })(authDispatch)
        henceforthApi.languageChange(value)
    }
    return (
        <>
            {/* page  */}
            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            <div className='page-spacing' >
                <section className='change-password'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-9 col-md-5 col-lg-4 col-xl-4 col-xxl-3">
                                <div className="common-card">
                                    {/* card title  */}
                                    <div className="common-card-title">
                                        <h5>Language</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className="form-select-box">
                                            <select className="form-select" aria-label="Default select example" value={authState.lang} onChange={(e) => onChangeLanguage(e.target.value)}>
                                                <option selected>Select</option>
                                                <option value="ENGLISH">ENGLISH</option>
                                                <option value="ARABIC">ARABIC</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default SettingPage;