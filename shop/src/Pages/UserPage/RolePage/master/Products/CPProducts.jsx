import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../../../../actions/product";
import Products from "./Products";
import Modal from "./modal";




export default function CPProducts(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [modalActive, setModalActive] = useState("")
    const [products,setProducts] = useState([]);
    const [currentPage,setCurrenPage] = useState(0);
    const [countPage,setCountPage] = useState(1);
    const [fetching, setFetching] = useState(false)
    const productsList = products?.map(product => <Products key={product._id} product={product} setProducts={setProducts} products={products}/>)
    let pages=[]
    function createPages(pages, pagesCount, currentPage) {
        if(pagesCount > 10) {
            if(currentPage > 5) {
                for (let i = currentPage-4; i <= currentPage+5; i++) {
                    pages.push(i)
                    if(i == pagesCount) break
                }
            }
            else {
                for (let i = 1; i <= 10; i++) {
                    pages.push(i)
                    if(i == pagesCount) break
                }
            }
        }  else {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        }
    }

    useEffect(()=> {
        console.log(fetching)
        console.log(currentPage)
        console.log(countPage)
        if (currentPage + 1 <= countPage)
        {
            if (fetching) {

                getProducts(currentPage, setCurrenPage, setFetching, products, setProducts, setCountPage, countPage,true,
                    {all:'',name:'',type:'',mark:'',minPrice:0,maxPrice:100000})

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
    return(
        <div className='Shor-list-allign'>
            <div className="Shor-list-kek">
                <button className={"MainButton createprod"} onClick={()=>setModalActive(true)}>Создать</button>
                    <div className={"shortList"} style={{display:"block"}}>
                        {productsList}
                        {fetching===true && currentPage + 1 <= countPage ?<div style={{width:'100%',height:'200px'}} className="product-wrapper"><div className={"loading1"}/></div>:<div/> }
                    </div>
                <Modal active={modalActive} setActive={setModalActive} name={name} setName={setName} setProducts={setProducts} products={products}/>
            </div>
        </div>
    )
}
export {CPProducts};