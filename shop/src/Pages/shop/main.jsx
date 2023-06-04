import '../../main.css';
import {createChat, getChats, sendMessage} from "../../actions/message";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../actions/product";
import ProductsList from "./products/ProductsList";
import '../../components/css/search.css'
import '../../components/css/Filter.css'
import '../../components/css/Pagination.css'
import '../../components/css/fix.css'
import Filters from "./filters/filters";
import {NavLink, useParams, useLocation} from "react-router-dom";
import {Helmet} from "react-helmet";
import { initWow } from '../../wow/wow';
import {baseUrl} from "../../globalSetings";

const MainPage = () => {
    const dispatch = useDispatch()
    const search = useLocation().search;
    let params = (new URL(document.location)).searchParams;
    let currentPage1 = params.get('currentPage');
    let all1 = params.get('all');
    let name1 = params.get('name');
    let type1 = params.get('type');
    let mark1 = params.get('mark');
    let minPrice1 = params.get('minPrice');
    let maxPrice1 = params.get('maxPrice');
    const [products,setProducts] = useState([]);
    const [currentPage,setCurrenPage] = useState(currentPage1 ? currentPage1 : 0);
    const [countPage,setCountPage] = useState(1);
    const [all, setAll] = useState(all1?all1:"")
    const [name, setName] = useState(name1?name1:"")
    const [type, setType] = useState(type1?type1:"")
    const [mark, setMark] = useState(mark1?mark1:"")
    const [minPrice, setMinPrice] = useState(minPrice1 ? minPrice1 : 0)
    const [maxPrice, setMaxPrice] = useState(maxPrice1 ? maxPrice1 : 100000)
    const user=useSelector(state =>state.user.currentUser.id)
    const role=useSelector(state =>state.user.currentUser.role)
    const [fetching, setFetching] = useState(false)
    const navigate = useLocation();


    useEffect(()=>{
        setFetching(true)
    },[])
    useEffect(()=> {

        if (currentPage + 1 <= countPage)
        {
            if (fetching) {
                getProducts(currentPage, setCurrenPage, setFetching, products, setProducts, setCountPage, countPage,false, {
                    all,
                    name,
                    type,
                    mark,
                    minPrice,
                    maxPrice
                })

            }
        }

    },[fetching])
    useEffect(()=>{
        dispatch(getChats(user))
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
        getProducts(0,setCurrenPage,setFetching,[],setProducts,setCountPage,0,false,{all,name,type,mark,minPrice,maxPrice})

    }

    useEffect(() => {
        initWow();
      }, []);

    return(
        <div className='Items-inside-cont'>
            <Helmet>
                <title>Товары и услуги</title>
                <link rel="canonical" href={baseUrl} />
                <meta name="description" content="На нашем сайте мы предоставляем услуги
                    по сервисному обслуживанию гарантийному и после гарантийный" />
            </Helmet>
                    <div className="searchBlock">
                        <div className="searchBox">
                            <input className="search" placeholder="Поиск" style={{outline:'none'}} onKeyDown={(e)=>{if (e.keyCode === 13) filtr()}}  value={all} onChange={(e) => setAll(e.target.value)}/>

                        </div>

                            <NavLink style={{width: '15%',marginLeft:'19px'}} to={'/NewOrder'}>
                                <button  className="repair_btn"><img style={{height: '50px',objectFit:"cover"}} src={require("../../components/image/Order.jpg")}/> Заказать Ремонт</button>
                        </NavLink>


                    </div>
                    <div className='Filter-Content-Allign'>
                        <Filters
                            filtr={filtr}
                            dispatch={dispatch} currentPage={currentPage}
                            all={all} setAll={setAll}
                            name={name} setName={setName}
                            type={type} setType={setType}
                            mark={mark} setMark={setMark}
                            minPrice={minPrice} setMinPrice={setMinPrice}
                            maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>


                        <div className='Products-List'>
                            <div className="Product-item">
                                    <ProductsList prod={products} fetching={fetching} currentPage={currentPage} countPage={countPage}/>

                            </div>


                        </div>

                    </div>
        </div>
    )
}
export {MainPage};