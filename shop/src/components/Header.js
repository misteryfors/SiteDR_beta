import React, {useEffect,useState} from 'react';
import './css/Header.css'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Logotip from  "./image/DaR.svg";
import './css/fix.css'
import ArrowUp from "../../src/components/image/uparrow.png"
import {getNotice} from "../actions/user";
import "animate.css"
import {baseUrl} from "../globalSetings";
import { initWow } from '../../src/wow/wow';
import {getChats} from "../actions/message";
export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotice, setIsNotice] = useState('');
    const currentUser=useSelector(state =>state.user.currentUser);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (currentUser._id)
            getNotice(setIsNotice);
        }, 5000);

        return () => clearInterval(interval); //очистка интервала
    }, []);

    const user=useSelector(state =>state.user.currentUser)
    return(
        <header id="toparrow">
        <div className='Header-desktop'>
            <NavLink className="HeaderNav" to="/">
                <div id='logo'>
                    <img src={Logotip}/>
                </div>
            </NavLink>

            <NavLink className="HeaderNav" to="/info">
                <div id='info'>
                    О нас
                </div>
            </NavLink>
            <NavLink className="HeaderNav" to="/shop">
                <div id='shop'>
                    Ассортимент
                </div>
            </NavLink> 
            
            <NavLink className="HeaderNav" to={'/NewOrder'}>
                <div id='Repair2'>
                    Заказать Ремонт
                </div>
            </NavLink>

            <div className='HeaderWrapper'></div>

           
            
            <NavLink className="HeaderNav" to="/User">
                <div id='account'>
                    <img src={require('./image/Profile.PNG')}/>
                    {user.email?(user.name?user.name:user.email):"Мой аккаунт"}
                </div>
            </NavLink>
        </div>

            <div className="Nav-mobile"  >
                <img style={{height:'70px',width:'70px'}} id='btn-menu' onClick={toggleMenu} src={baseUrl+'/image/menu.png'}/>
                <NavLink className="HeaderNav" to="/">
                <img className="Logo-nav-mob" style={{height:'70px'}} src={baseUrl+'/image/DaRmini.svg'}/>
                </NavLink>
                <NavLink style={{height:'70px'}} to="/User">
                <img className="Auth-nav-mob" style={{height:'70px',width:'70px'}} src={require('./image/Profile.PNG')}/>
                </NavLink>
                </div>
            {isMenuOpen && (
                <div className={isMenuOpen ? 'Modal2 active2': 'Modal2'} onClick={()=>setIsMenuOpen(false)}>
                <div className="navigation-menu">
                    <div className='HeaderWrapper'></div>

                    <NavLink className="HeaderNav" to="/info">
                        <div id='info'>
                            О нас
                        </div>
                    </NavLink>
                    <NavLink className="HeaderNav" to="/shop">
                        <div id='shop'>
                            Ассортимент
                        </div>
                    </NavLink>
                    <NavLink className="HeaderNav" to={'/NewOrder'}>
                        <div id='Repair'>
                            Заказать Ремонт
                        </div>
                    </NavLink>
                </div>
                </div>
            )}


            {isNotice!='' ?

                <div className='Notification'>
                    <NavLink to={isNotice=='Вам сообщение'?'../User/chats/':isNotice=='Новый заказ'?'../User/orders/':''}>
                        <p>{isNotice}</p>
                    </NavLink>
                </div>
                :
                <div className={'NoNotification'}>

                </div>
            }
        <a href="#toparrow" className='UpLink'><button className='UpButton'><img src={ArrowUp} alt=""></img></button></a>
            
        </header>
    )
}