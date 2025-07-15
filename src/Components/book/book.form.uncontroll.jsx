import create from "@ant-design/icons/lib/components/IconFont"
import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { handleUploadFile, createBookAPI } from "../../services/api.service"


const BookFormUncontrol = (props) => {


    const { loadBook, isModalCreateOpen, setIsModalCreateOpen } = props


    //1. file đã chọn
    const [selectedFile, setSelectedFile] = useState(null)
    //2. đường dẫn của file đã chọn 
    const [preview, setPreview] = useState(null)


    const [form] = Form.useForm();


    //upload file
    const handlePreviewFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return;
        }

        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    //close and clear modal
    const closeAndClearInput = () => {
        setIsModalCreateOpen(false)
        form.resetFields();
        setPreview(null)
        setSelectedFile(null)
    }

    //submit form 
    const onFinish = async (values) => {
        const resUpload = await handleUploadFile(selectedFile, "book")
        console.log(resUpload)
        if (resUpload && resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded
            const resCreateBook = await createBookAPI(thumbnail, values.mainText, values.author, values.price, values.quantity, values.category)
            if (resCreateBook.data) {
                closeAndClearInput()
                await loadBook()
                notification.success({
                    message: "Create Book",
                    description: "Thêm sách thành công"
                })
            }
            else {
                notification.error({
                    message: "FAIL UPDATE AVATAR",
                    description: JSON.stringify(resCreateBook.message)
                })
            }
        }
        else {
            notification.error({
                message: "Create Fail",
                description: "Bạn cần phải chọn ảnh thumbnail cho sách"
            })
        }
    }

    //thumbnail, mainText, author, price, quantity, category

    return (

        <div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 5px" }}>
                <div style={{ fontSize: "35px", fontWeight: "700" }}>Table Book</div>
                <Button size="large" type="primary" style={{ fontSize: "21px" }}
                    onClick={() => setIsModalCreateOpen(true)}
                > Create Book</Button>
            </div>
            <Modal
                title="CREATE BOOK"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalCreateOpen}
                onOk={() => { form.submit() }}
                onCancel={() => closeAndClearInput()}
            >
                <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Tiêu Đề"
                        name="mainText"
                        rules=
                        {[{
                            required: true,
                            message: 'Vui lòng nhập tiêu đề!'
                        }]}
                    >
                        <Input size="large" />
                    </Form.Item>


                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules=
                        {[{
                            required: true,
                            message: 'Vui lòng nhập tên tác giả!'
                        }]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules=
                        {[{
                            required: true,
                            message: 'Vui lòng nhập giá!'
                        }]}
                    >
                        <InputNumber size="large" style={{ width: "100%" }}
                            addonAfter={"VND"} min={1000}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules=
                        {[{
                            required: true,
                            message: 'Vui lòng nhập số lượng sách!'
                        }]}
                    >
                        <InputNumber size="large" style={{ width: "100%" }}
                            min={1} />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules=
                        {[{
                            required: true,
                            message: 'Vui lòng chọn thể loại sách!'
                        }]}
                    >
                        <Select size="large" style={{ width: "100%" }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },

                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },

                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <span>Thumbnail</span>
                        <br />
                        <div >
                            <label htmlFor='uploadBtn'
                                style={{
                                    marginTop: "5px",
                                    display: "block", width: "fit-content",
                                    padding: "3px 12px", background: "#04AA6D",
                                    borderRadius: "7px", cursor: "pointer",
                                    userSelect: "none", outline: "none", fontSize: "18px"
                                }}
                            >
                                UPLOAD THUMBNAIL
                            </label>
                            <input type="file" hidden id='uploadBtn' style={{ display: "none" }}
                                onChange={handlePreviewFile}
                                onClick={(event) => {
                                    event.target.value = null
                                }}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{ height: "250px", width: "250px", border: "solid 1px #ccc", marginTop: "15px" }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview}>
                                    </img>
                                </div>
                            </>
                        }

                    </Form.Item>
                </Form>


            </Modal>

        </div>

    )
}
export default BookFormUncontrol