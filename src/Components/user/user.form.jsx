import { Input, Button, notification, Modal } from "antd";
import { useState } from "react";
import axios from "axios";
import { creatUserAPI } from "../../services/api.service";
const UserForm = (props) => {

    // truyen props để load lại data sau khi add user
    const { loadUser } = props


    const [fullName, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    // console.log("check data:", { fullName, email, password, phone })


    //MODAL
    const [isModalOpen, setIsModalOpen] = useState(false)

    //handle btn create
    const handleSubmitBtn = async () => {
        const res = await creatUserAPI(fullName, email, password, phone)
        console.log("check res:", res.data) // tra ra phan ben network nhma do đã có interceptor nên rút gọn thành res.data thôi 
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Thêm user thành công"
            })
            resetAndCloseModal();
            await loadUser()

        }
        else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(res.message)
            })
        }

    }

    // clear input khi add user thanh cong
    const resetAndCloseModal = () => {
        setIsModalOpen(false)
        setFullname("")
        setEmail("")
        setPassword("")
        setPhone("")
    }


    return (
        <div >
            <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 5px" }}>
                <div style={{ fontSize: "35px", fontWeight: "700" }}>Table User</div>
                <Button size="large" type="primary" style={{ fontSize: "21px" }}
                    onClick={() => setIsModalOpen(true)}
                > Create User</Button>
            </div>

            <Modal title="CREATE USER"
                open={isModalOpen}
                onOk={() => { handleSubmitBtn() }}
                onCancel={() => {
                    resetAndCloseModal()
                }}
                maskClosable={false}
                okText={"Create"}>
                <div style={{
                    display: "flex", gap: "20px", flexDirection: "column", fontSize: "20px",
                }}>
                    <div>
                        <span>Full Name</span>
                        <Input size="large"
                            value={fullName}
                            onChange={(event) => { setFullname(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input size="large"
                            value={email}
                            onChange={(event) => { setEmail(event.target.value) }}

                        />

                    </div>
                    <div>
                        <span>Password</span>
                        <Input size="large"
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                        />   {/* Input.Password để ẩn pw và có con mắt */}

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


        </div>
    )
}
export default UserForm