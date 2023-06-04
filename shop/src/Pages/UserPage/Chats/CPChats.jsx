import React,{useState,useEffect} from 'react'
import '../../../components/css/UsersPage.css'
import '../../../components/css/Chat.css'
import {getChats, getMessages, sendMessage} from "../../../actions/message";
import {useDispatch, useSelector} from "react-redux";
import '../../../components/css/fix.css'
import Message from "./message";


export default function CPChats(){
    const [currentMessage, setCurrentMessage] = useState("")
    const [currentChat, setCurrentChat] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(getChats(user))
            dispatch(getMessages(chat[currentChat]._id))
        }, 5000);

        return () => clearInterval(interval); //очистка интервала
    }, [currentChat]);
    const dispatch = useDispatch()
    const messages = useSelector(state =>state.chats.messages)
    const user=useSelector(state =>state.user.currentUser.id)
    const chat=useSelector(state =>state.chats.chats)
    function sendmsg(){
        dispatch(sendMessage(chat[currentChat]._id,currentMessage,null,user))
        setCurrentMessage("")
    }
    useEffect(() => {
        console.log(chat)
        console.log(user)
        if (chat==null)
        dispatch(getChats(user))
        if (chat)
        if (chat.length>0)
        {
            if (chat.length==1)
                dispatch(getMessages(chat[0]._id))
        }

    }, [user,chat])


    useEffect(()=>{
        dispatch(getChats(user))

    },[])

    const messageList = messages?.map(msg => <Message key={msg._id} message={msg} user={msg.user==chat[currentChat].firstUser ? chat[currentChat].firstUserName : chat[currentChat].secondUserName} pos={msg.user==user ? 'message right':'message left'}/>)
    return(
        <div className='Chat-allign'>
            {chat ?
                chat.length>1 ?

                        <div className={"chatsList"}>
                            {chat.map((el,index)=>(
                                    <div key={el._id} className={"additionalChats"} onClick={()=>{setCurrentChat(index);dispatch(getMessages(el._id))}}>
                                        <p>{el.firstUserName}</p>
                                        {!el.chekSecondUser ? <div className='not-send'>Не прочитанно</div>:<div className='not-read'>Прочитано</div>}
                                    </div>
                                )
                            )
                            }
                        </div>
                    :
                    <div className='bbbbbbb'></div>
                :
                <div className='bbbbbbb'></div>

            }
        <div className={"Chat"}>
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
                <div
                    className={"btnSend"}

                    onClick={() => sendmsg()}
                >
                    <p>Отправить</p>
                </div>
                </div>

        </div>
        </div>
    )
}
export {CPChats};