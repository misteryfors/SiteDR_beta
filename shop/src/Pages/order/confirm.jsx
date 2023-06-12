import React, {useState}  from 'react';
import '../../components/css/authorization.css'
import Input from "../../components/MicroComponents/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {confirm, login} from "../../actions/user";
import {NavLink, useParams} from "react-router-dom";

const ConfirmAuthPage = () => {
    const dispatch = useDispatch()
    let { id } = useParams();
    return (
        <div className='Allign'>
            <div className='authorization'>
                <div className="authorization__header">В целях безопасности заявки может оставлять только авторизованный пользователь</div>
                <NavLink to={"../registration"} style={{textDecoration:'none'}}><button className="authorization__btn">К регистрации</button></NavLink>
            </div>
        </div>
    );
};

export {ConfirmAuthPage};