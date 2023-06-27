import React from 'react';
import '../components/css/modal.css'
import {NavLink, Outlet, useParams} from "react-router-dom";
import "../components/css/fix.css"
import {useDispatch, useSelector} from "react-redux";





const UniversalModal = ({active,setActive,trueBtn,falseBtn,trueFunction,falseFunction,trueLink,falseLink,message})=>{
    const dispatch = useDispatch()
    return(
        <div className={active ? 'Modal active': 'ModalYesNo'} onClick={()=>setActive(false)}>
            <div className={"Modal__contentYesNo"} onClick={e=> e.stopPropagation()}>
                <div className='YesNoContent'>
                    {message}
                </div>

                <div className='YesNoContentBtn'>
                    <NavLink to={trueLink}><button className={'TrueBtn'} onClick={trueFunction}>Да</button></NavLink>
                    <NavLink to={falseLink}><button className={'FalseBtn'} onClick={falseFunction}>Нет</button></NavLink>
                </div>
            </div>
        </div>
    )
}
export default UniversalModal;