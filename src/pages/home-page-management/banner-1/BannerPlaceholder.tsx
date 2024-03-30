import placeholder from "../../../assets/images/placeholder.jpg"
const BannerPlace = () => {
    return (
        <>
            <div className="common-card"  aria-hidden="true">
                <div className="commin-card-content p-2"></div>
                <img src={placeholder} className="card-img-top w-25" style={{height:200}} alt="..." />
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-1"></span>
                    <span className="placeholder col-2 ms-2"></span><br/>
                    <span className="placeholder col-1"></span>
                    <span className="placeholder col-2 ms-2"></span><br/>
                    <span className="placeholder col-1"></span>
                    <span className="placeholder col-2 ms-2"></span>
                </p>
                <a href="#" className=" disabled placeholder col-1"></a>
                <a href="#" className=" disabled placeholder col-1 ms-1"></a>
            </div>
        </>
    )
}
export default BannerPlace;