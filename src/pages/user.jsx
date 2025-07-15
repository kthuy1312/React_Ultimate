import UserTable from "../Components/user/user.table";
import UserForm from "../Components/user/user.form";

import { fetchUserAPI } from '../services/api.service';
import { useEffect, useState } from 'react';

const UserPage = () => {

    const [dataUser, setDataUser] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [total, setTotal] = useState(0)

    // nên ghi useEffect ngay bên dưới
    //sẽ có hai cái truyền vào
    // nếu truyền tham số thứ hai là [] thì mặc định sẽ chỉ chạy update 1 lần tránh vòng lặp vô hạn
    // lưu ý kh viết async await trong hàm này (kh nên viêt thêm gì hết)
    useEffect(() => {
        loadUser()
    }, [current, pageSize])




    const loadUser = async () => {
        const res = await fetchUserAPI(current, pageSize)
        // console.log(res)
        if (res) {
            setDataUser(res.data.result)
            setCurrent(res.data.meta.current)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }

    }
    // loadUser() nếu ghi ở đây nó sẽ thành vòng lặp vô tận (loadUser -> setDataUser -> re-render lại -> loadUser...)
    return (
        <div style={{ padding: "30px" }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUser={dataUser} loadUser={loadUser}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                setTotal={setTotal}
            />
        </div>
    )

}

export default UserPage;