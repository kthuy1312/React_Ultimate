import { Input, InputNumber, Modal, notification, Select } from "antd"
import { useEffect, useState } from "react"
import { handleUploadFile, updateBookAPI } from "../../services/api.service";


const UpdateBookModal = (props) => {
    const { setOpenEdit, isOpenEdit, setDataUpdate, dataUpdate, loadBook } = props

    const [id, setId] = useState("");
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [mainText, setMainText] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [category, setCategory] = useState("")


    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            setId(dataUpdate._id)
            setMainText(dataUpdate.mainText)
            setAuthor(dataUpdate.author)
            setPrice(dataUpdate.price)
            setQuantity(dataUpdate.quantity)
            setCategory(dataUpdate.category)
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
        setId("")
        setMainText("")
        setAuthor("")
        setPrice("")
        setQuantity("")
        setCategory("")
        setSelectedFile(null)
        setPreview(null)
        setDataUpdate(null)
        setOpenEdit(false)

    }


    const handleSubmitUpdate = async () => {
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
            onOk={() => handleSubmitUpdate()}
            onCancel={async () => {
                setOpenEdit(false)
                await loadBook()
            }}
        >
            <div style={{
                display: "flex", gap: "30px", flexDirection: "column", fontSize: "20px",
            }}>
                <div>
                    <span>Id</span>
                    <Input size="large" value={id} disabled
                    />
                </div>
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
                        value={category}
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
    )
}

export default UpdateBookModal