import { useState } from 'react';
import { Button, Drawer, notification } from 'antd';
import { handleUploadFile, updateAvatarUserAPI } from '../../services/api.service';

const ViewUserDetail = (props) => {

    //--props
    const {
        dataDetail, setDataDetail,
        isOpenDetail, setIsOpenDetail,
        loadUser
    } = props
    // console.log("check data", dataDetail)

    //--state
    //1. file đã chọn
    const [selectedFile, setSelectedFile] = useState(null)
    //2. đường dẫn của file đã chọn 
    const [preview, setPreview] = useState(null)


    //preview avatar
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setPreview(null)
            setSelectedFile(null)
            return;
        }

        const file = event.target.files[0]
        // console.log(file)

        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }
    // console.log("check file", preview)

    //upload avatar
    const hanleUpdateUserAvatar = async () => {
        //step1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")
        if (resUpload.data) {
            //step2 update user avatar
            const newAvatar = resUpload.data.fileUploaded
            const resUpdateAvater = await updateAvatarUserAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)
            // console.log(res)
            if (resUpdateAvater) {
                //để khi cập nhật ava thành công thì mình đóng modal lại, xóa Preview, xóa SelectedFile
                //và load lại user , rồi mới tb thành công
                setIsOpenDetail(false)
                setPreview(null)
                setSelectedFile(null)
                await loadUser()
                notification.success({
                    message: "UPDATE AVATAR",
                    description: "Cập nhật avater thành công"
                })

            } else {
                notification.error({
                    message: "FAIL UPDATE AVATAR",
                    description: JSON.stringify(resUpdateAvater.message)
                })
            }

        } else {
            notification.error({
                message: "FAIL UPDATE AVATAR",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    return (
        <>

            <Drawer
                title="Basic Drawer"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={() => {
                    setIsOpenDetail(false)
                    setDataDetail(null)
                }
                }
                open={isOpenDetail}
                width="40vw"
            >
                {dataDetail ?
                    <div style={{ fontFamily: "serif", fontSize: "20px" }}>
                        <h3 style={{ fontSize: "50px" }}>Detail User</h3>
                        <br />
                        <p>ID:  {dataDetail._id} </p>
                        <br />
                        <p>FULL NAME:  {dataDetail.fullName}</p>
                        <br />
                        <p>EMAIL:  {dataDetail.email}</p>
                        <br />
                        <p>PHONE NUMBER:  {dataDetail.phone}</p>
                        <br />
                        <p>AVATAR:  </p>
                        <br />
                        {/*http://localhost:8080/images/avatar/file-name */}
                        <div style={{ height: "250px", width: "250px", border: "solid 1px #ccc" }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}>
                            </img>
                        </div>

                        <div >
                            <label htmlFor='uploadBtn'
                                style={{
                                    marginTop: "15px",
                                    display: "block", width: "fit-content",
                                    padding: "7px 15px", background: "#6eb6ff",
                                    borderRadius: "12px", fontWeight: "800", cursor: "pointer"
                                }}
                            >
                                UPLOAD AVATAR
                            </label>
                            <input type="file" hidden id='uploadBtn'
                                onChange={handleOnChangeFile}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{ height: "250px", width: "250px", border: "solid 1px #ccc", marginTop: "15px" }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview}>
                                    </img>
                                </div>
                                <Button size="large" type="primary" style={{ fontSize: "21px", marginTop: "15px" }}
                                    onClick={() => hanleUpdateUserAvatar()}
                                > Save</Button>
                            </>
                        }

                    </div>
                    :
                    <p>Không có dữ liệu</p>
                }
            </Drawer>

        </>
    )
}

export default ViewUserDetail