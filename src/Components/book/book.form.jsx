import create from "@ant-design/icons/lib/components/IconFont"
import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react"
import { handleUploadFile, createBookAPI } from "../../services/api.service"


const BookForm = (props) => {


    const { loadBook, isModalCreateOpen, setIsModalCreateOpen } = props


    //1. file đã chọn
    const [selectedFile, setSelectedFile] = useState(null)
    //2. đường dẫn của file đã chọn 
    const [preview, setPreview] = useState(null)
    //data create book
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")

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

    const closeAndClearInput = () => {
        setIsModalCreateOpen(false)
        setAuthor("")
        setMainText("")
        setPrice(0)
        setQuantity(0)
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
    }

    //create book
    const createBook = async () => {
        if (selectedFile) {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                const thumbnail = resUpload.data.fileUploaded
                const resCreateBook = await createBookAPI(thumbnail, mainText, author, price, quantity, category)
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
        }
        else {
            notification.error({
                message: "Create Fail",
                description: "Bạn cần phải chọn ảnh thumbnail cho sách"
            })
        }
    }


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
                onOk={() => { createBook() }}
                onCancel={() => closeAndClearInput()}
            >
                <div style={{
                    display: "flex", gap: "30px", flexDirection: "column", fontSize: "20px",
                }}>
                    <div>
                        <span>Tiêu Đề</span>
                        <Input size="large" value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Tác Giả</span>
                        <Input size="large" value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}

                        />
                    </div>
                    <div>
                        <span>Giá Tiền</span>
                        <br />
                        <InputNumber size="large" style={{ width: "100%" }}
                            addonAfter={"VND"}
                            value={price}
                            onChange={(event) => { setPrice(event) }}

                        />
                    </div>
                    <div>
                        <span>Số lượng</span>
                        <br />
                        <InputNumber size="large" style={{ width: "100%" }}
                            min={1}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }} />
                    </div>
                    <div>
                        <span>Thể Loại</span>
                        <br />
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
                            onChange={(event) => { setCategory(event) }}

                        />
                    </div>
                    <div>
                        <span>Thumbnail</span>
                        <br />
                        <div >
                            <label htmlFor='uploadBtn'
                                style={{
                                    marginTop: "5px",
                                    display: "block", width: "fit-content",
                                    padding: "3px 12px", background: "#04AA6D",
                                    borderRadius: "10px", cursor: "pointer",
                                    userSelect: "none", outline: "none",
                                }}
                            >
                                UPLOAD THUMBNAIL
                            </label>
                            <input type="file" hidden id='uploadBtn'
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
                    </div>

                </div>
            </Modal>

        </div>

    )
}
export default BookForm