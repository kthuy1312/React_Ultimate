import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from '../services/api.service';
import { useContext, useState } from "react";
import { AuthContext } from "../Components/context/auth.context";

const LoginPage = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()
    //loading khi nhấn login
    const [isLoading, setIsloading] = useState(false)

    //context để lưu in4 user 
    const { setUser } = useContext(AuthContext)



    const onFinish = async (values) => {
        setIsloading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        }
        else {
            notification.error({
                message: "Login Error",
                description: JSON.stringify(res.message)
            })
        }
        setIsloading(false)

    }

    return (
        <>


            <Row justify={"center"} >
                <Col xs={24} md={8} >
                    <fieldset style={{ marginTop: "50px", borderRadius: "15px" }}>
                        <legend style={{ marginLeft: "50px", fontSize: "23px", fontWeight: "600" }}>
                            ĐĂNG NHẬP
                        </legend>

                        <Form
                            name="basic"
                            form={form}
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                            layout="vertical"
                            style={{ margin: "50px" }}

                        >

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    pattern: /\S+@\S+\.\S+/,
                                    message: 'Enter a valid email address!',
                                }
                                ]}
                            >
                                <Input size="large" />
                            </Form.Item>


                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{
                                    required: true,
                                    message: 'Please input your password!'
                                }]}
                            >
                                <Input.Password size="large"
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter')
                                            form.submit()
                                    }}
                                />
                            </Form.Item>



                            {/* Với đkien button phải có type là submit (nó xấu) 
                nhưng có thể ghi theo hình dưới là onClick=()=>{form.submit()} */}

                            {/* <button type="submit">Register</button> */}

                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
                                <Button size="large"
                                    type="primary"
                                    style={{ fontSize: "21px" }}
                                    loading={isLoading}
                                    onClick={() => {
                                        form.submit()
                                    }}
                                >
                                    Login</Button>
                                <Link to="/"
                                    style={{ fontSize: "21px", alignContent: "center" }}>
                                    Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                            <Divider />
                            <div style={{ fontSize: "22px", textAlign: "center" }}>Chưa có tài khoản? <Link to="/register" >Đăng ký tại đây </Link></div>

                        </Form>
                    </fieldset>
                </Col>
            </Row>

        </>
    )


}

export default LoginPage;