import {Link, NavLink, Outlet} from "react-router-dom";
import React, {useEffect,useState} from 'react';
import '../../main.css';
import {Helmet} from "react-helmet";
import Modal from "./modal";
import "../../components/css/fix.css";
import "../../components/css/Arrow-info.css";
import LogoImgFullScreen from "../../components/image/DaRmini.svg"
import MapMarker from "../../components/image/mapmarker.png"
import { initWow } from '../../wow/wow';
import {baseUrl} from "../../globalSetings";
import i1 from '../../../../shop/src/components/image/mainSlider/stiralka.png'
import i2 from '../../../../shop/src/components/image/mainSlider/holodos.png'
import i3 from '../../../../shop/src/components/image/mainSlider/CoffeeM.png'
import i4 from '../../../../shop/src/components/image/mainSlider/Posyda.png'
import i5 from '../../../../shop/src/components/image/mainSlider/Plita.png'
import i6 from '../../../../shop/src/components/image/mainSlider/duh.png.webp'

const InfoPage = () => {
    useEffect(() => {
        initWow();
      }, []);
    const [mapActive, setMapActive] = useState(false)
    const [mainImg, setMainImg] = useState("stiralka.png")

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    function bebra4() {
        console.log("bbbb")
        window.scrollTo({
          top: 0,
          behavior: "Instant"
        });
      }

    return(
        <div className="MainPage animate__animated animate__fadeIn">
            <div className="FullScreen">
                <img src={LogoImgFullScreen} alt=""></img>
                <div className="TextFullScreen">
                    <p>Починим бытовую технику, поломки любой сложности!
                        <br></br>
                        Или предложим другую технику.
                    </p>
                </div>
                <div className="arrow">
                    <div class="center-con">
                        <a href="#yakor">
                            <div class="round" >
                                <span className="span4ik"></span>
                                <span className="span4ik"></span>
                                <span className="span4ik"></span>
                                <span className="span4ik"></span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>Главная</title>
                <link rel="canonical" href={baseUrl} />
                <meta name="description" content="На нашем сайте мы предоставляем услуги
                        по сервисному обслуживанию гарантийному и после гарантийный
                        Стиральных машин
                        Холодильников
                        Кофемашин
                        Посудомоечные машины
                        Варочные панели
                        И продаже
                        Холодильников
                        Стиральных машин
                        Варачных панелей
                        Духовые шкафы" />
            </Helmet>
            <div className="main-info" id="yakor">
                <div className="main-info-text">
                    <div className="text-block wow animate__animated animate__fadeInUp">
                        <h1> На нашем сайте мы</h1>
                        Предоставляем услуги
                        по сервисному обслуживанию, ремонту или покупке бытовой техники:
                        <ul>
                            <li onMouseEnter={() => setMainImg(i1)}>Стиральных машин</li>
                            <li onMouseEnter={() => setMainImg(i2)}>Холодильников</li>
                            <li onMouseEnter={() => setMainImg(i3)}>Кофемашин</li>
                            <li onMouseEnter={() => setMainImg(i4)}>Посудомоечные машины</li>
                            <li onMouseEnter={() => setMainImg(i5)}>Варочные панели</li>
                            И продаже
                            <li onMouseEnter={() => setMainImg(i2)}>Холодильников</li>
                            <li onMouseEnter={() => setMainImg(i1)}>Стиральных машин</li>
                            <li onMouseEnter={() => setMainImg(i5)}>Варочных панелей</li>
                            <li onMouseEnter={() => setMainImg(i6)}>Духовые шкафы</li>
                        </ul>
                    </div>
                </div>

                <div className="main-info-img wow animate__animated animate__fadeInRight">
                    <img src={mainImg}/>
                </div>
            </div>

            <div className="navigationSecond">

                <div className="sections">
                    <div className={`repairb block-link ${active ? 'active' : ''}`} onClick={handleClick}>

                        <div className="block-link-info">

                        <h3>Заказать ремонт техники</h3>
                        <p>У нас вы можете заказть ремонт техники. 
                            <br></br>Просто заполните форму.</p>

                            <button className="block-link-btn"><NavLink onClick={bebra4} className="HeaderNav" to={'/NewOrder'}>Форма</NavLink></button>
                        </div>

                    </div>

                    <div className={`aboutUsb block-link ${active ? 'active' : ''}`} onClick={handleClick}>

                    <div className="block-link-info">
                        <h3>Узнать о нас</h3>
                        <p> Вы можете почитать о нас.
                            <br></br>На отдельной странице.</p>

                            <button className="block-link-btn"><NavLink onClick={bebra4} className="HeaderNav" to="/info">О нас</NavLink></button>
                        </div>


                    </div>

                    <div  className={`accountb block-link ${active ? 'active' : 'inactive'}`} onClick={handleClick}>

                    <div className="block-link-info">
                        <h3>Аккаунт</h3>
                        <p> Вы можете создать аккаунт!
                            <br></br>Переписывайтесь с мастером на сайте.</p>

                            <button className="block-link-btn"><NavLink onClick={bebra4} className="HeaderNav" to="/User">Аккаунт</NavLink></button>
                        </div>


                    </div>
                </div>

            </div>


            <div className="map-widget">
                <div className="text-map wow animate__animated animate__fadeInUp">

                    <div className="map-marker">
                        <hr></hr>
                        <div className="bebra">
                            <h1>Мы на карте</h1><img src={MapMarker} alt=""></img>
                        </div>
                    </div>
                    <p>Или по адресу: Киров, Октябрьский проспект, 65</p>

                </div>

                <div className="frame-map" style={{position:'relative'}}>
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A6e743de26903bbd9e5361ef1c3d5d581cae71139d92ff2f79422debe05e6ef3a&amp;source=constructor" width="100%" height="550" frameborder="0"></iframe>

                    {mapActive==false? <div style={{
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        display: 'flex'
                    }}></div>:<div></div>}
                    <button className="Map-btn" style={{position:"absolute",top:'10px'}} onClick={()=>setMapActive(mapActive==false?true:false)}>Открыть карту</button>
                </div>
            </div>

            {/*<div>
                <button className={"MainButton"} onClick={()=>setModalActive(true)}>Карта</button>
                <Modal active={modalActive} setActive={setModalActive}/>
            </div>*/}


            {/*<div style={{width: "50%",display:'flex'}}>
                <NavLink style={{width: '20%',height: '200px',margin:"20px"}} to={'/NewOrder'}>
                    <div  style={{display:'block'}}>
                        <img style={{width: '75%',height: '75%',objectFit:"cover",margin:'20px'}} src={require("../../components/image/Order.jpg")}/>
                        <img style={{width: '75%',height: '75%',objectFit:"cover",margin:'20px'}} src={require("../../components/image/strelka.png")}/>
                    </div>
                </NavLink>
            </div>*/}
        </div>


    )
}
export {InfoPage};