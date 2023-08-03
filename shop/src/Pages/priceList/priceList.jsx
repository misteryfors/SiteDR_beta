import React, { useEffect, useState } from 'react';
import plug from "../../components/image/Заглушка.png";
import { baseServerUrl } from "../../globalSetings";
import { getPriceList } from "../../actions/piceList";
import "../../components/css/table.css"

const PriceList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getPriceList('', setProducts);
    }, []);

    return (
        <div className="MainPage animate__animated animate__fadeIn">
            {products.map((product, productIndex) => (
                <div className="about-us_content">
                    <div className="choetoblya">

                        <h1 className="wow animate__animated animate__fadeInLeft">{product.name}</h1>

                        <div className="info-1 wow animate__animated animate__fadeInLeft" style={{width:"90%"}}>
                <table key={productIndex}>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Изображение</th>
                    </tr>
                    </thead>
                    <tbody>
                    {product.services?.map((service, index) => (
                        <tr key={index}>
                            <td>{service.serviceName}</td>
                            <td>{service.price}</td>
                            {index === 0 && (
                                <td rowSpan={product.services?.length}>
                                    {product.img ? (
                                        <img style={{ width: "100px", height: "100px" }} src={baseServerUrl + "/PriceList/" + product._id + "/" + product.img} alt="Product Img" />
                                    ) : (
                                        <img style={{ width: "100px", height: "100px" }} src={plug} alt="Placeholder Img" />
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
</div>
</div>
                </div>
            ))}
        </div>
    )
}

export { PriceList };