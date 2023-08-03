import axios from 'axios'
import {baseServerUrl} from "../globalSetings";


export async function createPriceList (name,setProducts,products) {
        try {
            const response = await axios.post(baseServerUrl+`/api/list/createPricelist`, {
                name
            })
            if (response.data.List)
            {
                console.log(response.data.List)
                setProducts([response.data.List,...products])
            }
            console.log(response.data)
        } catch (e) {
            alert(e)
            //alert(e.response.data.message)*
        }
}
export async function getPriceList (UID,setProduct,setFetching,products) {
        try {
            let user=localStorage.getItem('token')
            const response = await axios.get(baseServerUrl+`/api/list/getPriceList?id=${UID}&user=${user}`)
            if (response.status === 200) {
                setProduct(response.data.product)
                setFetching(false)
            }
            console.log(products)
            console.log(response.data)
            console.log(response.data.product)
            console.log(true)
        } catch (e) {
            alert(e.response.data.message)
        }
}
export async function deletePriceList (UID,setProducts,products) {
        try {
            console.log('-------------------------------------')
            console.log(UID)
            const response = await axios.get(baseServerUrl+`/api/list/deletePriceList?UID=${UID}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
            console.log(response.data.product._id)
            if (response.data.product)
                setProducts(products.filter(product => product._id != response.data.product._id))
            console.log(response.data.product)
        } catch (e) {
            alert(e.response.data.message)
        }
}
export async function redactList (UID, newlist) {
    try {

        const response = await axios.post(baseServerUrl+`/api/list/redactList`, {
            UID,
            newlist
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export async function redactService (UID, name, type, mark, imgs, price, shortDescription, description, publicate,privateComment,background) {
    try {

        const response = await axios.post(baseServerUrl+`/api/list/redactProduct`, {
            UID,
            name,
            type,
            mark,
            imgs,
            price,
            shortDescription,
            description,
            publicate,
            privateComment,
            background
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export async function addPriceList (UID, name, type, mark, imgs, price, shortDescription, description, publicate,privateComment,background) {
    try {

        const response = await axios.post(baseServerUrl+`/api/list/redactProduct`, {
            UID,
            name,
            type,
            mark,
            imgs,
            price,
            shortDescription,
            description,
            publicate,
            privateComment,
            background
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export async function addService (UID) {
    try {
        console.log(UID)
        const response = await axios.post(baseServerUrl+`/api/list/addService`, {UID})
        alert(response.data.message)
    } catch (e) {
        alert(e)
    }
}
export async function deleteService (list,service,setProducts,products) {
    try {
        console.log('-------------------------------------')
        console.log(list,service)
        const response = await axios.get(baseServerUrl+`/api/list/deleteService?list=${list}&service=${service}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        console.log(response.data.product._id)
        if (response.data.product)
            setProducts(products.filter(product => product._id != response.data.product._id))
        console.log(response.data.product)
    } catch (e) {
        alert(e.response.data.message)
    }
}
export async function uploadFile (file, UID,DIR,setImgstr) {
        try {
            console.log(UID);
            console.log(DIR);
            const formData = new FormData()
            formData.append('file', file)
            formData.append('UID', UID)
            formData.append('DIR', DIR)
            const response = await axios.post(baseServerUrl+`/api/list/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            setImgstr(response.data.fname)
            console.log(response.data.fname)
            //dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
}
