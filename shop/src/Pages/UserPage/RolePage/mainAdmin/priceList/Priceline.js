import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../../components/css/shortProduct.css'
import plug from "../../../../../components/image/Заглушка.png";
import {bookedProduct, deletePriceList} from "../../../../../actions/piceList";
import UniversalModal from '../../../../../components/universalModal';
import {useState} from 'react';
import {baseServerUrl, baseUrl} from "../../../../../globalSetings";
import bookedIMG from "../../../../../components/image/BackgroundShop/Police-Tape2.png"

const PriceLine=({service, price})=>{
    const [modalActive, setModalActive] = useState("")


    let img;

    const dispatch = useDispatch()
    return(
        <div className="ShortProductsSlot" style={{display:"flex"}}>

            <UniversalModal
                active={modalActive} setActive={setModalActive}
                trueBtn={'Да'} falseBtn={'Нет'}
                trueFunction={() => deletePriceList()} falseFunction={()=>setModalActive(false)}
                trueLink={''} falseLink={''}
                message={'Вы действительно хотите удалить товар?'}/>

            <div className="product-wrapper">

                <div className={"Short-product"}>


                    <div className='Products-short-allign-item'>

                        <div className="imageBox">
                            {img}
                        </div>
                        <div className={'name-desc'}>Имя:<b> {service ? service : 'БезИмени'}</b></div>
                        <div className={'price-desc'}>Цена:<br></br> <p><b>{price ? price: 0}₽</b></p></div>
                        <div className='buttons_redact_delete'>
                            <button className={'btn-delete'} onClick={()=>setModalActive(true)}>Удалить</button>

                        </div>
                    </div>


                </div>
            </div>


        </div>
    )
}
export default PriceLine