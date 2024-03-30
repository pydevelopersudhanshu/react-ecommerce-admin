const Placeholder = () => {
    return (
        <>
            {[...Array(10)].map((res, index) => <tr key={index} className="placeholder-glow">
                <td  className=" p-0 ">
                        <h5 className="placeholder col-1 ms-3"></h5>
                </td>
                <td  className=" p-0">
                        <span className="placeholder col-4"></span>
                </td>
                <td className=" p-0">
                        <span className="placeholder col-3"></span>
                </td>
                <td  className=" p-0">
                        <span className="placeholder col-2"></span>
                </td>
                <td  className=" p-0">
                        <span className="placeholder col-2"></span>
                </td>
            </tr>
            )}

        </>

    )
}
export default Placeholder;