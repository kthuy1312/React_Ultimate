import { Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBookAPI } from "../../services/api.service";
import { useForm } from "antd/es/form/Form";


const UpdateBookModalUnControl = (props) => {
    const { setOpenEdit, isOpenEdit, setDataUpdate, dataUpdate, loadBook } = props

    const [preview, setPreview] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)

    const [form] = Form.useForm();


    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category,
            })
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

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

    // close and clear data
    const closeAndClearData = () => {
        form.resetFields();
        setSelectedFile(null)
        setPreview(null)
        setDataUpdate(null)
        setOpenEdit(false)

    }


    const handleSubmitUpdate = async (values) => {

        const { id, mainText, author, price, quantity, category } = values

        //không có ảnh preview + không có file => return
        if (!preview && !selectedFile) {
            return;
        }
        //có ảnh preview và không có file => không upload file
        //=> giá trị của thumbnail lấy từ state của dataUpdate
        else if (!selectedFile && preview) {
            const thumbnail = dataUpdate.thumbnail
            const resUpdate = await updateBookAPI(id, thumbnail, mainText, author, price, quantity, category)
            if (resUpdate && resUpdate.data) {
                closeAndClearData()
                await loadBook()
                notification.success({
                    message: "Update Book",
                    description: "Cập nhật sách thành công"
                })
            }
            else {
                notification.error({
                    message: "Update Book Error",
                    description: JSON.stringify(resUpdate.message)
                })
            }
        }

        //có ảnh preview và có file => upload file
        //=> giá trị của thumbnail lấy từ kết quả của upload file
        else if (selectedFile && preview) {
            const resUpload = await handleUploadFile(selectedFile, "book")
            if (resUpload && resUpload.data) {
                const thumbnail = resUpload.data.fileUploaded
                const resUpdate = await updateBookAPI(id, thumbnail, mainText, author, price, quantity, category)
                if (resUpdate && resUpdate.data) {
                    closeAndClearData()
                    await loadBook()
                    notification.success({
                        message: "Update Book",
                        description: "Cập nhật sách thành công"
                    })
                }
                else {
                    notification.error({
                        message: "Update Book Error",
                        description: JSON.stringify(resUpdate.message)
                    })
                }
            }

        }
    }


    return (


        <Modal
            title="UPDATE BOOK"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpenEdit}
            onOk={() => form.submit()}
            onCancel={async () => {
                setOpenEdit(false)
                await loadBook()
            }}
        >
            <Form
                name="basic"
                form={form}
                onFinish={handleSubmitUpdate}
                layout="vertical"
            >

                <Form.Item
                    label="Id"
                    name="id"
                >
                    <Input size="large" disabled />
                </Form.Item>

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
    )
}

export default UpdateBookModalUnControl