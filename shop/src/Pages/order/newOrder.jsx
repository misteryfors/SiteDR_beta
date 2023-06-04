import React, { useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../actions/product";
import "../../components/css/NewProd.css";
import '../../components/css/imgList.css'
import {createOrder, getOrder, redactOrder} from "../../actions/order";
import {getChats} from "../../actions/message";
import {Helmet} from "react-helmet";
import CloseImg from "../../components/image/close_icon.png"
import {baseServerUrl, baseUrl} from "../../globalSetings";

const NewOrder = () => {
    let { id } = useParams();




    const [mainImg, setMainImg] = useState([])
    const [adress, setAdress] = useState("")
    const [fio, setFio] = useState([])
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [timeInUse, setTimeInUse] = useState("")
    const [comment, setComment] = useState("")
    const [time, setTime] = useState("")
    const [imgs, setImgs] = useState([])
    const [urgency,setUrgency] = useState(false)
    //const [user, setUser] = useState('')
    const loads=true
    const order = useSelector(state =>state.order)
    const user=useSelector(state =>state.user.currentUser.id)
    const role=useSelector(state =>state.user.currentUser.role)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const chat=useSelector(state =>state.chats.chats)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


    };
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {uploadFile(file, user? user : 'undefined','orders',setImgs,imgs);})
        console.log(imgs)
        //setImgs(files[0].name)
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
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => {uploadFile(file, user? user : 'undefined','orders',setImgs,imgs);console.log(file.name);})
        setDragEnter(false)
    }

    function delImg(el){
        setImgs(imgs.filter(img => img!=el));
    }

    useEffect(() => {
        if (user)
        dispatch(getChats(user))
    }, [])
    return (
        <div>
            <Helmet>
                <title>Заказать ремонт</title>
                <link rel="canonical" href={baseServerUrl+"/newOrder"} />
                <meta name="description" content="Форма регистрации заказа" />
            </Helmet>
            {loads==true ?
                <div className="po4inis">
                    <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                        <div className={"leftBlock"}>
                            <div className="decorateblock">
                                <div className="imgSlot">
                                    {!dragEnter ?
                                        <form className="image-drop" onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                              onDragOver={dragEnterHandler}>
                                            {imgs.length==0 ?
                                            <div className="mainImg">
                                                <img src={baseUrl+'/image/plug.png'}/>
                                            </div>:
                                            <div className="mainImg">
                                                <img src={baseServerUrl+"/orders/" + user + "/" + mainImg}/>
                                            </div>}
                                        </form> :
                                        <div className="mainImg">
                                            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler}
                                                 onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                                                Перетащите файлы сюда
                                            </div>
                                        </div>}
                                    <div className={"imgList"}>
                                        {imgs.map(el => (
                                            <div className={"additionalImg"}>
                                               <div className="deleteImg">
                                                <img className="deleteImg_img" onClick={()=>delImg(el)} src={CloseImg} alt=''></img>
                                                </div>
                                                <img className="addImg" onMouseEnter={() => setMainImg(el)}
                                                     src={baseServerUrl+"/orders/" + user + "/" + el}/>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="disk__upload">
                                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                                    <input type="text"
                                           name={'uploader'}
                                           className="form-control"
                                           required multiple={true} onChange={(event) => {
                                        fileUploadHandler(event);
                                        console.log();
                                    }} type="file" id="disk__upload-input" className="disk__upload-input"/>
                                </div>
                            </div>
                        </div>
                        <div className="rightBlock">

                            <div className="info-rb">
                                <div className="name2 form-inpt">
                                    <label>Как к вам обращаться (ФИО)</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Иванов Иван Иваныч"
                                        value={fio}
                                        onChange={(e) => setFio(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="name2 form-inpt">
                                    <label>Адресс</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="г.Пушкина д.Колотушкина 69А"
                                        value={adress}
                                        onChange={(e) => setAdress(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="name2 form-inpt">
                                    <label>Телефон</label>
                                    <input
                                        type="tel"
                                        className="input"
                                        placeholder="8999999999"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        maxLength="12"
                                        required
                                    />
                                </div>
                                <div className="Type form-inpt">
                                    <label>Тип</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Холодильник"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Марка</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="LG,DEXP и т.д"
                                        value={mark}
                                        onChange={(e) => setMark(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Удобное время для прибытия</label>
                                    <input
                                        type="datetime-local"
                                        className="input"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Время эксплуатации оборудывания</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Например 2 недели"
                                        value={timeInUse}
                                        onChange={(e) => setTimeInUse(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="fullDescription form-inpt">
                                    <label>Комментарий</label>
                                    <textarea
                                        type="text"
                                        placeholder="Я куда то жмакнул и все пропало"
                                        className="input"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="Save-btn">

                                        <button className={"btnSave"}
                                                onClick={() => dispatch(createOrder(user?role!='admin'?chat[0]._id:'undefined':'undefined', user, adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs, role))}>Отправить
                                        </button>
                                </div>
                            </div>

                        </div>




                    </form>
                </div> : <div className={"loading"}/>
            }
        </div>

    )}
export {NewOrder}