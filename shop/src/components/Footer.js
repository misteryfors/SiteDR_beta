import React from 'react'
import Help from '../../../shop/src/components/image/socials/phone-call.png'
import Ok from '../../../shop/src/components/image/socials/telegram.png'
import Vk from '../../../shop/src/components/image/socials/whatsapp.png'
import DaRimg from '../../../shop/src/components/image/socials/DaRmini.svg'
import {baseUrl} from "../globalSetings";
import './css/Footer.css'
export default function Footer(){
    return(
        <footer id="footer">
            <div class="Rdfooter">
                <img src={DaRimg} alt=""></img>
                </div>

        <div className='footer-wrapper'></div>


        <div class="footer-links">
            <div class="Links">
                <div class='link'>
                    <img src={Vk} alt=''></img><p><a href="#">WhatsApp</a></p>
                </div>
                <div class='link'>
                <img src={Ok} alt=''></img><p><a href="https://t.me/master_43">Telegram</a></p>
                </div>
                <div class='link'>
                <img src={Help} alt=''></img><p><a href="tel:+7 922 906 6670">+7 922 906 6670</a></p>
                </div>
            </div>
        </div>
        </footer>
    )
}