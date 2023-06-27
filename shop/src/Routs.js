import React, {useEffect} from 'react'
import {Route, Routes, Navigate} from "react-router-dom";
import {Layout} from "./Pages/layout/Layout";
import {InfoPage} from "./Pages/info/info";
import {MainPage} from "./Pages/shop/main";
import {CPProfile} from "./Pages/UserPage/CPProfile";
import {CPChats} from "./Pages/UserPage/Chats/CPChats"
import {NewProduct} from "./Pages/UserPage/RolePage/master/Products/NewProduct"
import {LoginPage} from "./Pages/auntification/Login";
import {RegistrationPage} from "./Pages/auntification/Registration";
import {ClientPage} from "./Pages/UserPage/RolePage/client/ClientPage";
import {MasterPage} from "./Pages/UserPage/RolePage/master/MasterPage";
import {AdminPage} from "./Pages/UserPage/RolePage/admin/AdminPage";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./actions/user";
import {CPProducts} from "./Pages/UserPage/RolePage/master/Products/CPProducts";
import ProductPage from "./Pages/shop/products/productPage";
import {NewOrder} from "./Pages/order/newOrder";
import {Order} from "./Pages/order/order";
import {Slider} from "./Pages/slider";
import CPOrders from "./Pages/UserPage/RolePage/master/Orders/CPOrders";
import {CPClientsOrders} from "./Pages/UserPage/RolePage/client/Orders/CPClientsOrders";
import {CPMastersOrders} from "./Pages/UserPage/RolePage/master/Orders/CPMastersOrders";
import {Helmet} from "react-helmet";
import {ConfirmPage, confirmPage} from "./Pages/auntification/confirm";
import {MoreInfoPage} from "./Pages/moreInfo/moreInfo";
import AdminPanel from "./Pages/UserPage/RolePage/admin/adminPanel";
import AllOrders from "./Pages/UserPage/RolePage/admin/AllOrders";
import ReadyOrders from "./Pages/UserPage/RolePage/admin/ReadyOrders";
import NewOrders from "./Pages/UserPage/RolePage/admin/NewOrders";
import {ConfirmAuthPage} from "./Pages/order/confirm";

export default function Routs(){
    const isAuth =useSelector(state =>state.user.isAuth)
    const role =useSelector(state =>state.user.currentUser.role)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

    return(
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="fer" element={<Slider/>}/>
                <Route index element={<InfoPage/>}/>
                <Route path="info" element={<MoreInfoPage/>}/>
                <Route path="shop" element={<MainPage/>}/>
                <Route path="confirm/:id" element={<ConfirmPage/>}/>
                <Route path="shop" element={<MainPage/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="*" element={<MainPage/>}/>

                </Route>
                <Route path="shop/item/:id" element={<ProductPage/>}/>
                {!isAuth && <Route path="/User" element={<Navigate to="/login" />}/>}
                {isAuth && <Route path="registration" element={<Navigate to="/User"/>}/>}
                {isAuth && <Route path="login" element={<Navigate to="/User"/>}/>}
                {role==="admin" ?
                    <Route path="/User" element={<AdminPage/>}>
                        <Route path="profile" element={<CPProfile/>}/>
                        <Route path="chats" element={<CPChats/>}/>
                        <Route path="products" element={<CPProducts/>}/>
                        <Route path="orders" element={<CPOrders/>}/>
                        <Route path="allOrders" element={<AllOrders/>}/>
                        <Route path="readyOrders" element={<ReadyOrders/>}/>
                        <Route path="newOrders" element={<NewOrders/>}/>
                        <Route path="adminPanel" element={<AdminPanel/>}/>
                        <Route path="myOrders" element={<CPMastersOrders/>}/>
                    </Route>
                    :role==="master" ?
                        <Route path="/User" element={<MasterPage/>}>
                            <Route path="profile" element={<CPProfile/>}/>
                            <Route path="chats" element={<CPChats/>}/>
                            <Route path="products" element={<CPProducts/>}/>
                            <Route path="orders" element={<CPOrders/>}/>
                            <Route path="myOrders" element={<CPMastersOrders/>}/>
                        </Route>
                        :role==="client" ?
                    <Route path="/User" element={<ClientPage/>}>
                        <Route path="profile" element={<CPProfile/>}/>
                        <Route path="chats" element={<CPChats/>}/>
                        <Route path="products" element={<CPProducts/>}/>
                        <Route path="myOrders" element={<CPClientsOrders/>}/>
                    </Route>
                            :
                            <Route path="/User" element={<Navigate to="/login" />}>
                                <Route path="profile" element={<Navigate to="/login" />}/>
                                <Route path="chats" element={<Navigate to="/login" />}/>
                                <Route path="products" element={<Navigate to="/login" />}/>
                                <Route path="orders" element={<Navigate to="/login" />}/>
                                <Route path="allOrders" element={<Navigate to="/login" />}/>
                                <Route path="readyOrders" element={<Navigate to="/login" />}/>
                                <Route path="newOrders" element={<Navigate to="/login" />}/>
                                <Route path="adminPanel" element={<Navigate to="/login" />}/>
                                <Route path="myOrders" element={<Navigate to="/login" />}/>
                            </Route>
                }
                <Route path="Order/:id" element={<Order/>}/>
                {isAuth ?<Route path="NewOrder" element={<NewOrder/>}/>:
                    <Route path="NewOrder" element={<ConfirmAuthPage/>}/>}
                <Route path="redact/item/:id" element={<NewProduct/>}/>
                <Route path="NewProduct" element={<NewProduct/>}/>
                <Route path="registration" element={<RegistrationPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="*" element={<InfoPage/>}/>
            </Route>
        </Routes>
    )
}