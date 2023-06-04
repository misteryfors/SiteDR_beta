import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import '../../../components/css/Chat.css'



const Message=({message,pos,user})=>{
    return(
        <div className={"messageBlock"}>
        <div className={pos}>
            <div className={'userNameMessage'}>{user}</div>
            {message.order!=null ?
                <NavLink to={'/Order/'+message.order}>
                <img style={{width:'50px',height:'50px'}} src={require('../../../components/image/Order.jpg')}/>
                </NavLink>
                :
                <div className={'messageText'}>
                    {message.message}
                </div>
            }
            {!message.chek ? <div className='not-send'>Отправлено</div>:<div className='not-read'>Прочитано</div>}



        </div>
        </div>
    )
}
export default Message