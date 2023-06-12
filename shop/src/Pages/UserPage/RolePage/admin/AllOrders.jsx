import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../../actions/product";
import Products from "./Orders";
import Modal from "../../Orders/modal";
import {getMasters, getOrders} from "../../../../actions/order";
import "../../../../components/css/fix.css"



export default function AllOrders(){
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

                getOrders(currentPage, setCurrenPage, setFetching, products, setProducts, setCountPage, countPage,true,1,all)
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
        getOrders(0, setCurrenPage, setFetching, [], setProducts, setCountPage, 0,true,1,all)

    }
    return(
        <div className='Orders-block'>
            <div className="Orders-block-allign">
                <div className={"shortList"}>
                    <div className="searchBlock">
                        <div className="searchBox">
                            <input className="search" placeholder="Поиск" style={{outline:'none'}} onKeyDown={(e)=>{if (e.keyCode === 13) filtr()}}  value={all} onChange={(e) => setAll(e.target.value)}/>
                        </div>
                    </div>
                    {productsList}
                    {fetching===true && currentPage + 1 <= countPage ?<div style={{width:'100%',height:'200px'}} className="product-wrapper"><div className={"loading1"}/></div>:<div/> }
                </div>
                <Modal active={modalActive} setActive={setModalActive} name={name} setName={setName} />
            </div>
        </div>
    )
}
export {AllOrders};