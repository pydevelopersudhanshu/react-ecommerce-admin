import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



const TextEditor = () => {
    const [value, setValue] = useState<any>("");

    return <ReactQuill theme="snow" value={value} onChange={(e:any)=>setValue(e.target.value)}   />;
    
}
export const ChipButton = ({ _id, name, onClick }:any) => {
    return <button type="button" key={_id} className="btn btn-aus bg-light mx-1" onClick={() => onClick(_id, name)}>{name} <i className="bi bi-x"></i></button>
}

export default TextEditor;