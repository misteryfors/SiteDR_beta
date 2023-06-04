import React, {useState} from 'react';
import '../../components/css/inputs.css'
import '../../components/css/authorization.css'
import Input from "../../components/MicroComponents/input/Input";
import {registration} from "../../actions/user";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

const RegistrationPage = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='Allign'>
            <div className='authorization'>
                <div className="authorization__header">Регистрация</div>
                <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
                <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
                <button className="authorization__btn" onClick={() => dispatch(registration(email, password))}>Зарегистрироваться</button>
                <NavLink to="/login"><div className="authorization__btn">Авторизация</div></NavLink>
            </div>
        </div>
    );
};

export {RegistrationPage};