import {Link, Outlet} from "react-router-dom";
import '../../main.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Products from "../shop/products/Products";

const Layout = () => {
    return(

        <div>
            <Header/>
            <main>
                <div className={"content"}>
                <Outlet/>
                </div>
                <Footer/>
            </main>
        </div>

    )
}
export {Layout};