import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../../components/css/shortProduct.css'
import plug from "../../../../../components/image/Заглушка.png";
import {acceptOrder, allReadyOrder, deleteOrder} from "../../../../../actions/order";
import UniversalModal from '../../../../../components/universalModal';
import {useState} from 'react';
import {baseServerUrl} from "../../../../../globalSetings";

const Orders=({product,setProducts,products})=>{
    const [modalActive, setModalActive] = useState("")
    const [status, setStatus] = useState(product.status)
    const [master, setMaster] = useState(product.responsible)
    let img;
    let user=product.user!=null?product.user:'undefined'
    if (product)
    {img=<img src={plug}/>
        if (product.imgs.length!=0)
        {
            img=<img src={baseServerUrl+"/orders/"+user+"/"+product.imgs[0]}/>
        }else {

        }
    }
    const dispatch = useDispatch()
    return(
        <div className="ShortProductsSlot" style={{display:"flex"}}>

                        <UniversalModal
                            active={modalActive} setActive={setModalActive}
                            trueBtn={'Да'} falseBtn={'Нет'}
                            trueFunction={()=>deleteOrder(product._id,setProducts,products)} falseFunction={()=>setModalActive(false)}
                            trueLink={''} falseLink={''}
                            message={'Вы действительно хотите удалить заказ?'}/>

           
            <div className="product-wrapper">
                <div className={"Short-product"}>
                    <div className='Products-short-allign-item'>

                    <div className='Products-short-allign-item-flex'>
        

                        <div className="imageBox">
                            {img}
                        </div>

                        <div className='Products-short-allign-item-flex-info'>
                            <div className='status-desc'>
                            Статус:
                                {product.chek ?
                                    <span><p> В работе</p></span>
                                    :
                                    !status?
                                    <span><p> В обработке</p></span>
                                        :
                                        <span><p> {status}</p></span>
                                }

                            </div>
                            <div className='status-desc'>
                            Ответственный:
                            {master ?
                                <span><p> {master}</p></span>
                                :
                                <span><p> Не назначен</p></span>
                            }
                            </div>
                            <div className={'name-desc adress'}>Адресс: <span>{product.adress ? product.adress : 'БезАдресса'}</span></div>
                            <div className={'price-desc'}>ФИО: <span>{product.fio ? product.fio: 'БезФИО'}</span></div>
                            <div className={'name-desc break-all'}>Id: <span>{product._id}</span></div>
                            <div className={'date-desc'}>Удобное время для прибытия:<span>{product.time.replace("Z", "").slice(0, -4).replace("T"," ")}</span></div>
                            <div className={'short-desc'}>Телефон: {product.phone ? product.phone: 'без телефона'}</div>
                        </div>
                        
                    </div>
                       
                       
                        <div className='buttons_redact_delete'>


                            <button className={'btn-delete'} onClick={()=>setModalActive(true)}>Удалить</button>
                            
                            <NavLink to={'/Order/'+product._id}>
                                <button className={'btn-redact'} >Изменить</button>
                            </NavLink>
                        </div>
     <div className='buttons_redact_delete'>


                            {master ?
                                <button className={'btn-delete'} onClick={() => {acceptOrder(product._id, setStatus, setMaster);console.log(status, master)}}> Отменить заявку</button>:
                                <button className={'btn-delete'} onClick={() => {acceptOrder(product._id, setStatus, setMaster);console.log(status, master)}}>Откликнуться заявку</button>
                            }
                             {status == "Готов к сдаче" ?
                                 <button className={'btn-delete'} onClick={() => {allReadyOrder(product._id, setStatus);console.log(status, master)}}>Возобновить</button>
                                 :
                                 status == "в работе"?
                                     <button className={'btn-delete'} onClick={() => {allReadyOrder(product._id, setStatus);console.log(status, master)}}>Сдать заявку</button>
                                :
                                     <div/>
                             }

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default Orders