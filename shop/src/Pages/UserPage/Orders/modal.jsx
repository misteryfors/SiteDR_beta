import React from 'react';
import '../../../components/css/modal.css'
import {createProduct} from "../../../actions/product";
import {useDispatch} from "react-redux";



const Modal = ({active,setActive,name,setName})=>{
    const dispatch = useDispatch()
    return(
        <div className={active ? 'Modal active': 'Modal'} onClick={()=>setActive(false)}>
            <div className={"Modal__content"} onClick={e=> e.stopPropagation()}>
            <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
                <div  onClick={() => createProduct(name,'','',[],0,'','',false)}><button className={"MainButton"} >Добавить</button></div>
            </div>
        </div>
    )
}
export default Modal;