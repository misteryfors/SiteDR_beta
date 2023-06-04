import React, {useState}  from 'react';
import '../../components/css/authorization.css'
import Input from "../../components/MicroComponents/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {confirm, login} from "../../actions/user";
import {NavLink, useParams} from "react-router-dom";

const ConfirmPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    let { id } = useParams();
    dispatch(confirm(id))
    console.log(id)
    return (
        <div className='Allign'>
            <div className='authorization'>
                <div className="authorization__header">Почта не подтвержденна время действия ссылки истекло</div>
                <NavLink to={"registration"} style={{textDecoration:'none'}}><button className="authorization__btn">К регистрации</button></NavLink>
            </div>
        </div>
    );
};

export {ConfirmPage};