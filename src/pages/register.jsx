import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { registerUserAPI } from '../services/api.service';
import { Link, useNavigate } from 'react-router-dom';


const RegisterPage = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const onFinish = async (values) => {

        console.log(values)
        //call api
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone)

        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Đăng ký user thành công"
            })
            //trở về trang login
            navigate("/login")
        }
        else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.mess)
            })
        }
    }

    return (
        <>
            <h1
                style=
                {{
                    marginTop: "50px",
                    textAlign: "center"
                }} >
                ĐĂNG KÝ TÀI KHOẢN</h1>

            <Row justify={"center"}>
                <Col xs={24} md={8} >
                    <Form
                        name="basic"
                        form={form}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        layout="vertical"
                        style={{ margin: "50px" }}

                    >

                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[{
                                required: true,
                                message: 'Please input your full name!'
                            },
                            {}]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Please input your email!'
                            },
                            {
                                pattern: new RegExp("/\S+@\S+\.\S+/"),
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
                            <Input.Password size="large" />
                        </Form.Item>


                        <Form.Item
                            label="Phone number"
                            name="phone"
                            //rules: input phải là số
                            rules={[{
                                required: true,
                                pattern: new RegExp(/\d+/g),
                                message: "Wrong format!"
                            }
                            ]}
                        >
                            <Input size="large" />
                        </Form.Item>

                        {/* Với đkien button phải có type là submit (nó xấu) 
                nhưng có thể ghi theo hình dưới là onClick=()=>{form.submit()} */}

                        {/* <button type="submit">Register</button> */}


                        <Button size="large"
                            type="primary"
                            style={{ fontSize: "21px" }}
                            onClick={() => {
                                form.submit()
                            }}
                        >
                            Register</Button>

                    </Form>
                    <Divider />
                    <div style={{ fontSize: "22px", textAlign: "center" }}>Đã có tài khoản? <Link to="/login" >Đăng nhập tại đây </Link></div>
                </Col>
            </Row>

        </>
    )

}

export default RegisterPage;