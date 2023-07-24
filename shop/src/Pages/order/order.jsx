import React, { useState, useEffect} from "react";
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uploadFile} from "../../actions/product";
import "../../components/css/NewProd.css";
import '../../components/css/imgList.css'
import {getOrder, redactOrder, sendOrderMessage} from "../../actions/order";
import {getChats, sendMessage} from "../../actions/message";
import CloseImg from "../../components/image/close_icon.png"
import {baseServerUrl, baseUrl} from "../../globalSetings";
import '../../components/css/Chat.css'
import Message from "../UserPage/Chats/message";
const Order = () => {
    let { id } = useParams();



    const [mainImg, setMainImg] = useState([])
    const [adress, setAdress] = useState("")
    const [fio, setFio] = useState([])
    const [phone, setPhone] = useState("")
    const [type, setType] = useState("")
    const [mark, setMark] = useState("")
    const [timeInUse, setTimeInUse] = useState("")
    const [comment, setComment] = useState("")
    const [time, setTime] = useState(Date.now+1)
    const [imgs, setImgs] = useState([])
    const [user, setUser] = useState('')
    const [privateComment, setPrivateComment] = useState("")
    const currentUser=useSelector(state =>state.user.currentUser)
    const [urgency,setUrgency] = useState(false)


    const [inputEnabledAdress, setInputEnabledAdress] = useState(false)
    const [inputEnabledfio, setInputEnabledFio] = useState(false)
    const [inputEnabledPhone, setInputEnabledPhone] = useState(false)
    const [inputEnabledType, setInputEnabledType] = useState(false)
    const [inputEnabledMark, setInputEnabledMark] = useState(false)
    const [inputEnabledTimeInUse, setInputEnabledTimeInUse] = useState(false)
    const [inputEnabledComment, setInputEnabledComment] = useState(false)
    const [inputEnabledTime, setInputEnabledTime] = useState(false)
    const [inputEnabledUser, setInputEnabledUser] = useState(false)
    const [inputEnabledUrgency,setInputEnabledUrgency] = useState(false)
    const [first,setFirst] = useState("")
    const loads=true

    const order = useSelector(state =>state.order)
    //const user=useSelector(state =>state.user.currentUser.id)
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const [chat, setChat] = useState("")
    const [messages, setMessages] = useState([])
    const messageList = messages?.map(msg => <Message key={msg._id} message={msg} user={msg.name} pos={msg.user==currentUser.id ? 'message right':'message left'}/>)
    const [currentMessage, setCurrentMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();


    };
    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => {uploadFile(file, user,'orders',setImgs,imgs)})
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
        files.forEach(file => {uploadFile(file, user?user:'nullUser','orders',setImgs,imgs)})
        setDragEnter(false)
    }

    function delImg(el){
        setImgs(imgs.filter(img => img!=el));
    }
    function sendmsg(){
        console.log(messages)
        console.log(messageList)
        console.log(chat)
        dispatch(sendOrderMessage(chat,currentMessage,null,currentUser.id,messages,setMessages,currentUser.name+" "+currentUser.role,false))

        setCurrentMessage("")
    }
    function lockAll(save) {
        setFirst(save.toString())
        setInputEnabledAdress(false)
        setInputEnabledFio(false)
        setInputEnabledPhone(false)
        setInputEnabledType(false)
        setInputEnabledMark(false)
        setInputEnabledTimeInUse(false)
        setInputEnabledComment(false)
        setInputEnabledTime(false)
        setInputEnabledUser(false)
        setInputEnabledUrgency(false)
    }
    function save() {
        redactOrder(id,adress, fio, phone, type, mark, timeInUse, comment, urgency, new Date(time).toISOString(), privateComment, imgs)
    }
    function redact(atribute,first,second)
    {
        console.log(atribute)
        console.log(first)
        console.log(second)
        if (first!=second)
        {
        dispatch(sendOrderMessage(chat,"Изменено "+atribute+" | "+first+" => "+second+" |",null,currentUser.id,messages,setMessages,currentUser.name+" "+currentUser.role,true))
        save()
        }
    }

    useEffect(() => {
        //dispatch(getChats(user))
        dispatch(getOrder(id,setMainImg, setAdress, setFio,setPhone, setType, setMark, setTimeInUse, setComment, setTime, setImgs, setUrgency,setUser,setMessages,setChat,setPrivateComment))
    }, [])
    return (
        <div>
            {loads==true ?
                <div className="po4inis" style={{display:"block"}}>
                    <form className={"ProductForm"} onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                        <div className={"leftBlock"}>
                            <div className="decorateblock">
                            <div className="imgSlot" style={{display: "block"}}>
                                {!dragEnter ?
                                    <form onSubmit={handleSubmit} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
                                          onDragOver={dragEnterHandler}>
                                        <div className="mainImg">
                                            <img src={baseServerUrl+"/orders/" + user + "/" + mainImg}/>
                                        </div>
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
                                       multiple={true} onChange={(event) => {
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
                                        value={fio}
                                        onChange={(e) => inputEnabledfio && setFio(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledfio ?redact("ФИО",first,fio): lockAll(fio);  setInputEnabledFio(!inputEnabledfio)}}>
                                        {inputEnabledfio ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="name2 form-inpt">
                                    <label>Адресс</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={adress}
                                        onChange={(e) => inputEnabledAdress && setAdress(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledAdress ? redact("Адрес",first,adress):lockAll(adress) ;setInputEnabledAdress(!inputEnabledAdress)}}>
                                        {inputEnabledAdress ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="name2 form-inpt">
                                    <label>Телефон</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={phone}
                                        onChange={(e) => inputEnabledPhone && setPhone(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledPhone ? redact("Телефон",first,phone):lockAll(phone); setInputEnabledPhone(!inputEnabledPhone)}}>
                                        {inputEnabledPhone ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="Type form-inpt">
                                    <label>Тип</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={type}
                                        onChange={(e) => inputEnabledType && setType(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledType?  redact("Тип",first,type):lockAll(type);setInputEnabledType(!inputEnabledType)}}>
                                        {inputEnabledType ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Марка</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={mark}
                                        onChange={(e) => inputEnabledMark && setMark(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledMark ?redact("Марка",first,mark) :lockAll(mark); setInputEnabledMark(!inputEnabledMark)}}>
                                        {inputEnabledMark ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="Mark form-inpt">
                                    <label>удобное время для прибытия</label>
                                    <input
                                        id={'dateTimeInput'}
                                        type="datetime-local"
                                        className="input"
                                        value={time.toString()}
                                        onChange={(e) => inputEnabledTime && setTime(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={(time1)=>{inputEnabledTime ? redact("Время прибытия",first,time.toString()) :lockAll(time.toString()); setInputEnabledTime(!inputEnabledTime);console.log(time)}}>
                                        {inputEnabledTime ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="Mark form-inpt">
                                    <label>Время эксплуатации оборудывания</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={timeInUse}
                                        onChange={(e) => inputEnabledTimeInUse && setTimeInUse(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledTimeInUse ? redact("Время в использовании",first,timeInUse) :lockAll(timeInUse); setInputEnabledTimeInUse(!inputEnabledTimeInUse)}}>
                                        {inputEnabledTimeInUse ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                <div className="fullDescription form-inpt">
                                    <label>Комментарий</label>
                                    <textarea
                                        type="text"
                                        className="input"
                                        value={comment}
                                        onChange={(e) => inputEnabledComment && setComment(e.target.value)}
                                        required
                                    />
                                    <button className="btnToggleInput" onClick={()=>{inputEnabledComment ?redact("Комментарий",first,comment) :lockAll(comment); setInputEnabledComment(!inputEnabledComment)}}>
                                        {inputEnabledComment ? "Выключить ввод" : "Включить ввод"}
                                    </button>
                                </div>
                                {privateComment &&
                                <div className="fullDescription form-inpt">
                                    <label>Приватный комментарий</label>
                                    <textarea
                                        type="text"
                                        className="input"
                                        value={privateComment}
                                        onChange={(e) => setPrivateComment(e.target.value)}
                                        required
                                    />
                                </div>
                                }
                                <div className="Save-btn">
                                    <a>
                                    <button className={"btnSave"}
                                            onClick={() => save()}>Сохранить
                                    </button>
                                    </a>
                                </div>
                            </div>
                        </div>



                    </form>
                    <div className='Chat-allign' style={{height:'600px'}}>
                    <div className={"Chat"} style={{width:'95%'}}>
                        <div className={"messageList"}>
                            {messageList}
                            <div className='Popusk'><a href="shop/src/Pages/UserPage/Chats/CPChats#downnibba">Вниз</a></div>
                            <div id="downnibba"></div>
                        </div>

                        <div className="inputBox">
                            <input
                                type="text"
                                className="input"
                                value={currentMessage}
                                onKeyDown={(e)=>{
                                    if (e.keyCode === 13)

                                        sendmsg()
                                }}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                required
                            />
                            <div className={"btnSend"} onClick={() => sendmsg()}>
                                <p>Отправить</p>
                            </div>
                        </div>

                    </div>
                    </div>
                </div> : <div className={"loading"}/>

            }
        </div>

    )}
export {Order}