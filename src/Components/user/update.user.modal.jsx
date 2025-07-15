import { Input, Button, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateUserAPI } from "../../services/api.service";
const UpdateUserModal = (props) => {

    // props 
    const {
        isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate,
        loadUser
    } = props
    //useState
    const [id, setId] = useState("")
    const [fullName, setFullname] = useState("")
    const [phone, setPhone] = useState("")
    // console.log("check props dataUpdate", dataUpdate)


    //useEffect
    //khi dataUpdate thay đổi (có nghĩ là nhấn edit một ng nào đó nó sẽ đuọc thay đổi)
    //nó chỉ chạy vô hàm khi dataUpdate thay đổi
    //nhưng sẽ xảy ra 1 bug vì nếu chọn edit một ng -> thoát ra -> nhấn edit lại ng đó
    //suy ra dataUpdate sẽ kh thay đổi nên nó sẽ kh chạy vào hàm 
    // vì vậy sau khi out khỏi modal update ta phải set lại dataUpdate thành null
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullname(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])

    //handle btn update
    const handleSaveBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone)
        console.log("check res:", res.data) // tra ra phan ben network nhma do đã có interceptor nên rút gọn thành res.data thôi 
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Sửa user thành công"
            })
            resetAndCloseModal();
            await loadUser()

        }
        else {
            notification.error({
                message: "Error Update User",
                description: JSON.stringify(res.message)
            })
        }

    }

    // clear input khi update user thanh cong
    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false)
        setDataUpdate(null)
    }

    return (

        <Modal title="UPDATE USER"
            open={isModalUpdateOpen}
            onOk={() => { handleSaveBtn() }}
            onCancel={async () => {
                setIsModalUpdateOpen(false)
                await loadUser()
            }}
            maskClosable={false}
            okText={"Save"}>
            <div style={{
                display: "flex", gap: "20px", flexDirection: "column", fontSize: "20px",
            }}>
                <div>
                    <span>ID</span>
                    <Input size="large"
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input size="large"
                        value={fullName}
                        onChange={(event) => { setFullname(event.target.value) }}

                    />
                </div>

                <div>
                    <span>Phone number</span>
                    <Input size="large"
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}

                    />

                </div>
            </div>

        </Modal>



    )
}
export default UpdateUserModal