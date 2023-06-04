import React from 'react'
import {NavLink} from "react-router-dom";
import '../../../components/css/fix.css'
import {useState, useEffect} from 'react'
import { initWow } from '../../../wow/wow';
import boookedIMG from "../../../../src/components/image/BackgroundShop/Police-Tape2.png"
import {baseServerUrl} from "../../../globalSetings";

const Products=({product})=>{
    useEffect(() => {
        initWow();
      }, []);
    let img;
    if (product.imgs.length!=0)
    {
        img=<img src={baseServerUrl+"/products/"+product._id+"/"+product.imgs[0]}/>
    }
        return(
            <div className="ProductsSlot wow animate__animated animate__fadeIn">


                    <div className="product-wrapper">

                        <div className={"product " + product.background}>
                            <NavLink to={"item/"+product._id} style={{textDecoration:'none'}}>
                                <div className='Item-Content'>
                                        <div className="imageBox" style={{position: "relative"}}>
                                            { product.booked == true &&
                                                <div className='booked-block'>
                                                    <div className='booked-block_img'>
                                                        <img src={boookedIMG} alt=''></img>
                                                    </div>
                                                </div>}
                                            {img}
                                        </div>
                                        <div className={'name'}>{product.name}</div>
                                        <hr></hr>
                                        <div className={'price'}>{product.price}₽</div>
                                        <div className={'short'}><p>{product.shortDescription}</p></div>
                                        {/*<button className='Buy_btn'>Заказать</button>*/}
                                </div>
                            </NavLink>
                        </div>
                    </div>


            </div>
        )
}
export default Products