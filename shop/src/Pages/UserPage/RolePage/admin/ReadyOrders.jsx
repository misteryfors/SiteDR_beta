import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../../actions/product";
import Products from "./Orders";
import Modal from "../../Orders/modal";
import {getMasters, getOrders} from "../../../../actions/order";
import "../../../../components/css/fix.css"
import MultiRangeSlider from "../../../shop/filters/multiRangeSlider/MultiRangeSlider";
import {NavLink} from "react-router-dom";



export default function ReadyOrders(){
    const dispatch = useDispatch()
    let params = (new URL(document.location)).searchParams;
    let all1 = params.get('all');
    const [name, setName] = useState("")
    const [modalActive, setModalActive] = useState("")
    const [products,setProducts] = useState([]);
    const [masters,setMasters] = useState([]);
    const [currentPage,setCurrenPage] = useState(0);
    const [countPage,setCountPage] = useState(1);
    const [fetching, setFetching] = useState(false)
    const [all, setAll] = useState(all1?all1:"")
    const [adress, setAdress] = useState("")
    const [fio, setFio] = useState("")
    const [mark, setMark] =useState("")
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [privateComment, setPrivateComment] = useState("")
    const [responsible, setResponsible] = useState("")

    const productsList = products?.map(product => <Products key={product._id} product={product} setProducts={setProducts} products={products} masters={masters}/>)
    const user=useSelector(state =>state.user.currentUser)
    console.log(user.id)
    useEffect(()=> {
        console.log(fetching)
        console.log(currentPage)
        console.log(countPage)
        if (currentPage + 1 <= countPage)
        {
            if (fetching) {

                getOrders(currentPage, setCurrenPage, setFetching, products, setProducts, setCountPage, countPage,true,4,all,filtr={
                    adress,
                    fio,
                    mark,
                    phone,
                    type,
                    privateComment,
                    responsible})
                getMasters(masters,setMasters)
            }
        }

    },[fetching])
    useEffect(()=>{
        setFetching(true)
    },[])
    useEffect(()=>{
        document.addEventListener('scroll',scrollHandler)
        return function (){
            document.removeEventListener('scroll',scrollHandler)
        }
    },[])
    const scrollHandler = (e) =>  {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop +window.innerHeight)<100 && currentPage+1<=countPage ){

            setFetching(true)
        }

    }
    function filtr(){
        getOrders(0, setCurrenPage, setFetching, [], setProducts, setCountPage, 0,true,4,all,{
            adress,
            fio,
            mark,
            phone,
            type,
            privateComment,
            responsible})

    }
    return(
        <div className='Orders-block'>
            <div className="Orders-block-allign">
                <div className={"shortList"}>
                    <div className="searchBlock">
                        <div className="searchBox">
                            <form onSubmit={(e) => {
                                e.preventDefault(); // Предотвращаем перезагрузку страницы
                                filtr(); // Вызываем вашу функцию
                            }} style={{
                                width:"100%",
                                borderRadius: "0px",
                                display: "flex",
                                border: "1px solid #00000078",
                                backgroundColor: "white"
                            }}> <input className="search" placeholder="Поиск" style={{outline:'none'}} onKeyDown={(e)=>{if (e.keyCode === 13) filtr()}}  value={all} onChange={(e) => setAll(e.target.value)}/>
                            </form>
                        </div>
                    </div>

                    <div id="filterBox2" className="filterBlock">
                        <div className="filterBox2"  id="filters">
                            <div className="filterSlot" style={{display: 'block'}}>
                                <div style={{display: 'flex'}}>
                                    <div className={"filterTag"}>
                                        Адресс
                                    </div>
                                    <input className={"filterInput"} value={adress} onChange={(e) => setAdress(e.target.value)}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className={"filterTag"}>
                                        ФИО
                                    </div>
                                    <input className={"filterInput"} value={fio} onChange={(e) => setFio(e.target.value)}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className={"filterTag"}>
                                        Марка
                                    </div>
                                    <input className={"filterInput"} value={mark} onChange={(e) => setMark(e.target.value)}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className={"filterTag"}>
                                        Телефон
                                    </div>
                                    <input className={"filterInput"} value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                </div>

                                <div style={{display: 'flex'}}>
                                    <div className={"filterTag"}>
                                        Мастер
                                    </div>
                                    <input className={"filterInput"} value={responsible} onChange={(e) => setResponsible(e.target.value)}/>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <button onClick={()=>{filtr()}} className="Buy_btn">Фильтр</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div  style={{width:'100%',height:'100px'}}>

                    </div>
                    {productsList}
                    {fetching===true && currentPage + 1 <= countPage ?<div style={{width:'100%',height:'200px'}} className="product-wrapper"><div className={"loading1"}/></div>:<div/> }
                </div>
                <Modal active={modalActive} setActive={setModalActive} name={name} setName={setName} />
            </div>
        </div>
    )
}
export {ReadyOrders};