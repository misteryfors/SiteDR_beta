import React, {Component, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {getProduct} from "../../../actions/product";
import {useDispatch, useSelector} from "react-redux";
import "../../../components/css/NewProd.css"
import '../../../components/css/imgList.css'
import '../../../components/css/loading.css'
import plug from "../../../components/image/Заглушка.png"
import CloseImg from "../../../components/image/close_icon.png"
import {Helmet} from "react-helmet";
import {baseServerUrl} from "../../../globalSetings";

const ProductPage=()=>{
    const [mainImg, setMainImg] = useState("")
    const dispatch = useDispatch()
    let { id } = useParams();
    const [product, setProduct] = useState(null)
    const [fetching, setFetching] = useState(true)
    const user=useSelector(state =>state.user.currentUser.id)
    useEffect(() => {

        getProduct(id,setProduct,setFetching)
        console.log(product)

    }, [])
    // получаем параметры строки запроса
    return(
        <div className='Products-Items-arr'>
            <Helmet>
                <title>Товар</title>
                <link rel="canonical" href="https://master43.ru/newOrder" />
                <meta name="description" content="Товар" />
            </Helmet>
            {fetching===false ?
                <div>
                    <form className={"ProductForm-prod"} >

                        <div className="cringe">
                            <div className='vmeste'>

                            <div className='goBack'><button><a href='/shop'>Назад</a></button></div>

                                <div className={"leftBlock-prod"}>
                                    <div className='leftBlock-prod2'>
                                        <div className="imgSlot" style={{display: "flex",flexDirection: "column"}}>
                                            <div className="mainImg">
                                                <img  src={baseServerUrl+"/products/"+id+"/"+(mainImg!="" ? mainImg:product.imgs[0])}/>
                                                {/*<img src="https://avatars.mds.yandex.net/get-mpic/5220722/img_id1852846487040977932.jpeg/orig" alt=''></img>*/}
                                            </div>
                                            <div className={"imgList"}>
                                                {product.imgs.map(el =>(
                                                    <div className={"additionalImg"}>
                                                        <img className="addImg" onMouseEnter={()=>setMainImg(el)} src={baseServerUrl+"/products/"+id+"/"+el ? baseServerUrl+"/products/"+id+"/"+el :plug}/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={"price"}>
                                            <label>Цена: {product.price}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="rightBlock-prod">
                                    <div className='rightBlock-prod2'>
                                        <div className="Name">
                                            <label>Название</label>
                                            <p>{product.name}</p>
                                        </div>
                                        <div className="Type">
                                            <label>Тип:</label>
                                            <p>{product.type}</p>
                                        </div>
                                        <div className="Mark">
                                            <label>Марка:</label>
                                            <p>{product.mark}</p>
                                        </div>
                                        <div className="shortDescription">
                                            <label>Описание:</label>
                                            <p>{product.shortDescription}</p>
                                        </div>
                                        <div className="fullDescription">
                                            <label>Дополнительно:</label>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </form>
                </div> : <div className={"loading"}/>}
        </div>
    )
}
export default ProductPage