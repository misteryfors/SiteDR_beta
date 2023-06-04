import axios from 'axios'
import {addMessage, setChats, setMessages} from "../reducers/chatsReducer";
import {baseServerUrl} from "../globalSetings";



export const createChat = (firstUser,secondUser) => {
    return async dispatch => {
        try {
            const response = await axios.post(baseServerUrl+`/api/chat/createChat`, {
                firstUser,
                secondUser
            })
            dispatch(setChats(response.data.chats))
            console.log(response.data)
        } catch (e) {
            //alert(e.response.data.message)
        }
    }
}
export const getChats = (User) => {
    return async dispatch => {
        try {
            console.log(User)
            const response = await axios.get(baseServerUrl+`/api/chat/getChats`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
                dispatch(setChats(response.data.chats))
            console.log(response.data.chats)
        } catch (e) {
            //alert(e)
        }
    }
}
export const sendMessage = (chat,message,order,user) => {
    return async dispatch => {
        console.log(chat,message,order)
        try {
            const response = await axios.post(baseServerUrl+`/api/chat/sendMessage`, {
                chat,
                message,
                order,
                user
            })
            dispatch(addMessage(response.data.message))
            console.log(response.data)
        } catch (e) {
            //(e.response.data.message)
        }
    }
}
export const getMessages = (chat) => {
    return async dispatch => {
        try {
            console.log(chat)
            const response = await axios.get(baseServerUrl+`/api/chat/getMessages?chat=${chat}`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            console.log(response.data.messages)
            dispatch(setMessages(response.data.messages))
            console.log(response.data)
        } catch (e) {
            //alert(e)
        }
    }
}
