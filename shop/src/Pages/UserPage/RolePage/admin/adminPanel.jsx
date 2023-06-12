import React from 'react'
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../../components/MicroComponents/input/Input";
import "../../../../components/css/fix.css"
import {addMaster, ChangAccountInformation, login} from "../../../../actions/user";
import {useState} from 'react';
import UniversalModal from '../../../../components/universalModal';
export default function AdminPanel(){
    const user=useSelector(state =>state.user.currentUser)
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState("")
    const [selectedRole, setSelectedRole] = useState('');

    const handleSelectChange = (event) => {
        setSelectedRole(event.target.value);
    };
    console.log(useParams())
    return(
        <div className='Profile-block-allign'>
            <UniversalModal
                active={modalActive} setActive={setModalActive}
                trueBtn={'Да'} falseBtn={'Нет'}
                trueFunction={() => {addMaster(email,selectedRole);setModalActive(false)}} falseFunction={()=>setModalActive(false)}
                trueLink={''} falseLink={''}
                message={'Cделать мастером пользователя с почтой : "'+email+' "?'}/>
            <div className='Profile-block'>
                <p>Выберите роль:</p>
                <select id="mySelect" value={selectedRole} onChange={handleSelectChange}>
                    <option value="">-- Выберите --</option>
                    <option value="master">мастер</option>
                    <option value="admin">админ</option>
                    <option value="client">клиент</option>
                </select>
                <p>Почта</p>
                <Input  value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
                <button className='change-btn'  onClick={()=>setModalActive(true)}>Присвоить</button>
            </div>
        </div>
    )
}
export {AdminPanel};