import React, {Component, useEffect} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import '../../../../../components/css/shortProduct.css'
import plug from "../../../../../components/image/Заглушка.png";
import {deleteService, addService, deletePriceList, redactService, redactList,uploadFile} from "../../../../../actions/piceList";
import UniversalModal from '../../../../../components/universalModal';
import {useState} from 'react';
import {baseServerUrl, baseUrl} from "../../../../../globalSetings";
import bookedIMG from "../../../../../components/image/BackgroundShop/Police-Tape2.png"


const Products=({product,setProducts,products})=>{
    const [modalActive, setModalActive] = useState("")
    const [booked,setBooked]=  useState(product.booked)
    const [dragEnter, setDragEnter] = useState(false)
    const [imgstr, setImgstr] = useState(product.img)


    let img;
    console.log(product,imgstr,img)

    {img=<img src={plug}/>
    if (product.img)
    {
        img=<img src={baseServerUrl+"/PriceList/"+product._id+"/"+product.img}/>
    }else {

    }
    }
    useEffect(() => {
         {
            img = <img src={plug} />;
            if (product.img) {
                img = <img src={baseServerUrl + "/PriceList/" + product._id + "/" + product.img} />;
            } else {

            }
        }
    }, [imgstr, product.img]);
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


    };
    const updateName = (event) => {
        const newName = event.target.value;
        setUpdatedProduct((prevProduct) => {
            return { ...prevProduct, name: newName };
        });
    };
    // Функция для обновления сервиса и его цены по индексу
    const updateService = (index, fieldName, value) => {
        setUpdatedProduct((prevProduct) => {
            const updatedServices = [...prevProduct.services];
            updatedServices[index][fieldName] = value;
            return { ...prevProduct, services: updatedServices };
        });
    };

    const addNewService = () => {
        setUpdatedProduct((prevProduct) => {
            const newService = {
                serviceName: '',
                price: '',
            };
            return { ...prevProduct, services: [...prevProduct.services, newService] };
        });
    };
    const deleteServiceHandler = (index) => {
        setUpdatedProduct((prevProduct) => {
            const updatedServices = [...prevProduct.services];
            updatedServices.splice(index, 1); // Удаляем сервис по индексу
            return { ...prevProduct, services: updatedServices };
        });
    };
    function fileUploadHandler(event) {
        const files = [...event.target.files];
        files.forEach(file => {
            uploadFile(file, product._id, 'PriceList', (newImgstr) => {
                // Update the 'product' object with the new image URL
                setImgstr(newImgstr);
                setProducts(prevProducts => {
                    return prevProducts.map(prevProduct => {
                        if (prevProduct._id === product._id) {
                            return { ...prevProduct, img: newImgstr };
                        }
                        return prevProduct;
                    });
                });
                setUpdatedProduct(prevProducts => {
                    return prevProducts.map(prevProduct => {
                        if (prevProduct._id === product._id) {
                            return { ...prevProduct, img: newImgstr };
                        }
                        return prevProduct;
                    });
                });
            });
        });
    }
    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
    function dropHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => {
            uploadFile(file, product._id, 'PriceList', (newImgstr) => {
                setProducts(prevProducts => {
                    return prevProducts.map(prevProduct => {
                        if (prevProduct._id === product._id) {
                            return { ...prevProduct, img: newImgstr };
                        }
                        return prevProduct;
                    });
                });
                setUpdatedProduct(prevProduct => {
                    if (prevProduct._id === product._id) {
                        return { ...prevProduct, img: newImgstr };
                    }
                    return prevProduct;
                });
            });
        });
        setDragEnter(false);
    }
    const dispatch = useDispatch()
    return (
        <div className="ShortProductsSlot" style={{ display: "flex" }}>
            <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                <UniversalModal
                    active={modalActive} setActive={setModalActive}
                    trueBtn={'Да'} falseBtn={'Нет'}
                    trueFunction={() => deletePriceList(product._id, setProducts, products)} falseFunction={() => setModalActive(false)}
                    trueLink={''} falseLink={''}
                    message={'Вы действительно хотите удалить товар?'} />

                <div className="product-wrapper">

                    <div className={"Short-product"}>

                        <div className='Products-short-allign-item'>

                            <div className="imageBox">
                                {!dragEnter ?
                                    <form onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                          onDragOver={dragEnterHandler}>
                                        <div className="mainImg">
                                            {img}
                                        </div>
                                    </form> :
                                    <div className="mainImg">
                                        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                                             onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                                            Перетащите файлы сюда
                                        </div>
                                    </div>}
                            </div>
                            <div className={'name-desc'}>Имя:<input value={updatedProduct.name} onChange={updateName} /></div>

                            <div style={{ display: 'block' }}>
                                <div style={{ display: 'flex' }}>
                                    <p style={{ margin: "10px 20px", borderRadius: "8px", color: "black", fontWeight: "700", padding: "5px 10px", marginTop: "10px", width: "200px" }}>Сервис</p>
                                    <p style={{ margin: "10px 20px", borderRadius: "8px", color: "black", fontWeight: "700", padding: "5px 10px", marginTop: "10px", width: "200px" }}>Цена</p>
                                </div>
                                {updatedProduct.services.map((service, index) => (
                                    <div style={{ display: 'flex' }} key={index}>
                                        <input value={service.serviceName} onChange={(e) => updateService(index, 'serviceName', e.target.value)} />
                                        <input value={service.price} onChange={(e) => updateService(index, 'price', e.target.value)} />
                                        <button className={'btn-delete'} onClick={() => deleteServiceHandler(index)}>
                                            Удалить
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="buttons_redact_delete">
                                <button className={'btn-delete'} onClick={() => redactList(product._id, updatedProduct)}>
                                    Сохранить изменения
                                </button>
                                <button className={'btn-delete'} onClick={() => addNewService()}>
                                    Добавить
                                </button>
                                <button className={'btn-delete'} onClick={() => setModalActive(true)}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Products;