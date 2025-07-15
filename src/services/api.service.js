import axios from './axios.customize'; // lay tu instance nha


const creatUserAPI = (fullName, email, password, phone) => {

    const URL_BACKEND = "/api/v1/user"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
    // phải trả kqua để bên kia hứng nên return
}
const updateUserAPI = (_id, fullName, phone) => {

    const URL_BACKEND = "/api/v1/user"
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}
const deleteUserAPI = (_id) => {

    const URL_BACKEND = `/api/v1/user/${_id}`
    return axios.delete(URL_BACKEND)
}

const fetchUserAPI = (current, pageSize) => {
    // const URL_BACKEND = "/api/v1/user"
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND)
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = "api/v1/file/upload"

    const config = {
        headers: {
            //upload-type vì bên api ghi v
            'upload-type': folder,
            // api dùng form-data cho file nên phải ghi như v
            "Content-Type": 'multipart/form-data'
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', file);
    return axios.post(URL_BACKEND, bodyFormData, config)

}

const updateAvatarUserAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
        avatar: avatar,
        _id: _id,
        fullName: fullName,
        phone: phone
    }
    return axios.put(URL_BACKEND, data)
}

const registerUserAPI = (fullName, email, password, phone) => {

    const URL_BACKEND = "/api/v1/user/register"
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    }
    return axios.post(URL_BACKEND, data)
    // phải trả kqua để bên kia hứng nên return
}

const loginAPI = (email, password) => {

    const URL_BACKEND = "/api/v1/auth/login"
    const data = {
        username: email,
        password: password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data)
}

//kh cần truyền access token vì nó đã được truyền sẵn khi gọi api (viet trong axios.customize)
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account"
    return axios.get(URL_BACKEND)
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout"
    return axios.post(URL_BACKEND)
}

const fetchBookAPI = (current, pagesize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pagesize}`
    return axios.get(URL_BACKEND)
}


const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {

    const URL_BACKEND = "/api/v1/book"
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data)
    // phải trả kqua để bên kia hứng nên return
}

const updateBookAPI = (_id, thumbnail, mainText, author, price, quantity, category) => {
    const URL_BACKEND = "/api/v1/book"
    const data = {
        _id: _id,
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.put(URL_BACKEND, data)
}

const deletedBookAPI = (_id) => {

    const URL_BACKEND = `/api/v1/book/${_id}`
    return axios.delete(URL_BACKEND)
}

export {
    creatUserAPI, fetchUserAPI, updateUserAPI, deleteUserAPI,
    handleUploadFile, updateAvatarUserAPI, registerUserAPI,
    loginAPI, getAccountAPI, logoutAPI,
    fetchBookAPI, createBookAPI, updateBookAPI, deletedBookAPI
}


