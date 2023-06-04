import React from 'react'
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../components/MicroComponents/input/Input";
import "../../components/css/fix.css"
import {ChangAccountInformation, login} from "../../actions/user";
import {useState} from 'react';
import UniversalModal from '../../components/universalModal';
export default function CPProfile(){
    const user=useSelector(state =>state.user.currentUser)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("******")
    const [phone, setPhone] = useState(user.phone)
    const [name, setName] = useState(user.name)
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState("")
    console.log(useParams())
    return(
        <div className='Profile-block-allign'>
            <UniversalModal
                active={modalActive} setActive={setModalActive}
                trueBtn={'Да'} falseBtn={'Нет'}
                trueFunction={() => {dispatch(ChangAccountInformation(email, password, phone, name));setModalActive(false)}} falseFunction={()=>setModalActive(false)}
                trueLink={''} falseLink={''}
                message={'Вы действительно хотите внести изменения?'}/>
            <div className='Profile-block'>
            <p>Изменить почту:</p>
            <Input  value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <p>Изменить пароль:</p>
            <Input  value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <p>Изменить телефон:</p>
            <Input  value={phone} setValue={setPhone} type="text" placeholder="Введите телефон..."/>
            <p>Изменить Имя:</p>
            <Input  value={name} setValue={setName} type="text" placeholder="Введите Имя..."/>

            
            <button className='change-btn'  onClick={()=>setModalActive(true)}>Изменить</button>
            </div>
        </div>
    )
}
export {CPProfile};