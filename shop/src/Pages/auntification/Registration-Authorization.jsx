import {useState} from 'react'
import Input from "../../components/MicroComponents/input/Input";
import '../../components/css/inputs.css'
import {registration} from "../../actions/user";
import {useDispatch} from "react-redux";

const AuthPage = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='registration'>
            <div className="registratio n__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="registration__btn" onClick={() => registration(email, password)}>Войти</button>
        </div>
    );
};
export {AuthPage};