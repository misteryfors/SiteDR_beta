import '../../../../components/css/inputs.css'
import '../../../../components/css/authorization.css'
import '../../../../components/css/UsersPage.css'
import '../../../../components/css/fix.css'
import {NavLink, Outlet, useParams} from "react-router-dom";
import {logout} from "../../../../reducers/userReducer";
import "../../../../components/css/fix.css"
import {useDispatch, useSelector} from "react-redux";
import UniversalModal from "../../../../components/universalModal";
import {useState} from 'react';

const MasterPage = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const [modalActive, setModalActive] = useState("")
    const dispatch = useDispatch()
    console.log(useParams())
    return(
        <div className='ClientBlock-'>
            <UniversalModal
                active={modalActive} setActive={setModalActive}
                trueBtn={'Да'} falseBtn={'Нет'}
                trueFunction={()=>dispatch(logout())} falseFunction={()=>setModalActive(false)}
                trueLink={'/'} falseLink={''}
                message={'Вы действительно хотите выйти'}/>
            <div className='nav-admin'>
                <div className="niggers">
                    <div className="bigger">
                        <NavLink to="profile"><button className={"MainButton"}><p>Профиль</p></button></NavLink>
                        <NavLink to="chats"><button className={"MainButton"}><p>Чаты</p></button></NavLink>
                        <NavLink to="products"><button className={"MainButton"}><p>Продукты</p></button></NavLink>
                        <NavLink to="orders"><button className={"MainButton"}><p>Заказы</p></button></NavLink>
                        <NavLink to="myOrders"><button className={"MainButton"}><p>Мои Заказы</p></button></NavLink>
                        
                        <button className={"MainButton"} onClick={()=>setModalActive(true)}>Выход</button>
                    </div>
                </div>
            </div>
            <div className="Chat-block">
                <Outlet/>
            </div>

        </div>



    )
}
export {MasterPage};