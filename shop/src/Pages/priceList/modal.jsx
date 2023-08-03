import React from 'react';
import '../../components/css/modal.css'

import {useDispatch} from "react-redux";



const Modal = ({active,setActive,name,setName,setProducts,products})=>{
    const dispatch = useDispatch()
    return(
        <div className={active ? 'Modal active': 'Modal'} onClick={()=>setActive(false)}>
            <div className={"Modal__content"} onClick={e=> e.stopPropagation()}>
                <div style={{width: '100%',height:'100%'}}>
                        <iframe style={{borderRadius:   '10px 10px 10px 10px',marginTop:'0px'}}
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3Abff9f1ac217f2a9dc341a55d6c32aac79c107ec9c2e040c295e225ecef581fda&amp;source=constructor"
                                width="100%" height="100%" frameBorder="0"></iframe>
                    </div>
            </div>
        </div>
    )
}
export default Modal;