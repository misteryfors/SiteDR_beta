import '../../../../components/css/inputs.css'
import '../../../../components/css/authorization.css'
import '../../../../components/css/UsersPage.css'
import {NavLink, Outlet, useParams} from "react-router-dom";
import {logout} from "../../../../reducers/userReducer";
import {useDispatch, useSelector} from "react-redux";
import '../../../../components/css/fix.css'

const ClientPage = () => {
        const isAuth = useSelector(state => state.user.isAuth)
        const dispatch = useDispatch()
        console.log(useParams())
        return(
        <div  className='ClientBlock-'>
                <div className='nav-admin'>
                        <div className="niggers">
                                <div className="bigger">
                                        <NavLink to="profile"><button className={"MainButton"}>Профиль</button></NavLink>
                                        <NavLink to="chats"><button className={"MainButton"}>Чат</button></NavLink>
                                        <NavLink to="myOrders"><button className={"MainButton"}>Мои Заказы</button></NavLink>
                                        <NavLink to="/"><div className={"MainButton"} onClick={() => dispatch(logout()) }>Выход</div></NavLink>
                                </div>
                        </div>
                
                
                </div>

                        <Outlet/>

        </div>



        )
}
export {ClientPage};