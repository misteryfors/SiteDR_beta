import axios from 'axios'
import {baseServerUrl} from "../globalSetings";
export async function createReview (review,username,reviews,setReviews) {
    try {
        const response = await axios.post(baseServerUrl+`/api/revw/createReview`, {
            review,
            username
        })
        if (response.data.product)
        {
            console.log(response.data)
            setReviews([response.data.reviews,...reviews])
        }
        console.log(response.data)
    } catch (e) {
        alert(e)
        //alert(e.response.data.message)
    }
}
export async function getReviews(currentPage,setCurrenPage,setFetching,reviews,setReviews,setCountPage,pageCount,revers, filters) {
    try {
        let url=baseServerUrl+`/api/prod/getReviews?currentPage=${currentPage+1}`

        const response = await axios.get(url).finally(()=>setFetching(false))
        console.log(response.data)
        console.log(response.data.products)
        if (revers===true)
            response.data.products.reverse()
        setReviews([...reviews,response.data.reviews])
        setCountPage(pageCount=>response.data.pagination.pageCount)
        setCurrenPage(currentPage=>Number(currentPage+1))
        return url
        //dispatch(setProducts(response.data.products))
        //dispatch(setPageCount(response.data.pagination.pageCount))

    } catch (e) {
        //alert(e)
    }
}
export async function deleteReview (UID,setProducts,products) {
    try {
        console.log('-------------------------------------')
        console.log(UID)
        const response = await axios.get(baseServerUrl+`/api/prod/deleteProduct?UID=${UID}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
        console.log(response.data.product._id)
        if (response.data.product)
            setProducts(products.filter(product => product._id != response.data.product._id))
        console.log(response.data.product)
    } catch (e) {
        alert(e.response.data.message)
    }
}