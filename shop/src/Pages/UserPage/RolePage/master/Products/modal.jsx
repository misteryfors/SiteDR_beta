import React from 'react';
import '../../../../../components/css/modal.css'
import {createProduct} from "../../../../../actions/product";
import {useDispatch} from "react-redux";



const Modal = ({active,setActive,name,setName,setProducts,products})=>{
    const dispatch = useDispatch()
    return(
        <div className={active ? 'Modal active': 'Modal'} onClick={()=>setActive(false)}>
            <div className={"Modal__content addproducttt"} onClick={e=> e.stopPropagation()}>
            <input
                type="text"
                className="form-control inputikcreate"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
                <div className='adddbtn' onClick={() => createProduct(name,'','',[],0,'','',false,false,"none",setProducts,products)}><button className={"MainButton"} >Добавить</button></div>
            </div>
        </div>
    )
}
export default Modal;