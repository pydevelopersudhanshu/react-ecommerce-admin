import placeholder from "../../../assets/images/placeholder.jpg"
const PlaceHolder = (props:any) => {
    return (
        <div className="placeholder-glow"> 
            <div className="placeholder" style={{width:`${props.width}`, height:`${props.height}`}}></div> 
        </div>
        
    )
}
export default PlaceHolder;