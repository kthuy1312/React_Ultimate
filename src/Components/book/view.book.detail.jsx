import { Drawer } from "antd"
import { useState } from "react";


const ViewBookDetail = (props) => {

    const { isOpenDetail, setOpenDetail, dataDetail, setDataDetail } = props

    return (
        <>
            <Drawer
                title="Basic Drawer"
                onClose={() => {
                    setOpenDetail(false)
                    setDataDetail(null)
                }}
                open={isOpenDetail}
                width="40vw"

            >
                {dataDetail ?
                    <div style={{ fontFamily: "serif", fontSize: "20px" }}>
                        <h3 style={{ fontSize: "50px" }}>Detail Book</h3>
                        <br />
                        <p>ID:  {dataDetail._id} </p>
                        <br />
                        <p>TIÊU ĐỀ:  {dataDetail.mainText}</p>
                        <br />
                        <p>GIÁ:  {dataDetail.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
                        <br />
                        <p>TÁC GIẢ:  {dataDetail.author}</p>
                        <br />
                        <p>SỐ LƯỢNG ĐÃ BÁN:  {dataDetail.sold}</p>
                        <br />
                        <p>TỔNG SỐ LƯỢNG:  {dataDetail.quantity}</p>
                        <br />
                        <p>THỂ LOẠI:  {dataDetail.category}</p>
                        <br />
                        <p>ẢNH:  </p>
                        <br />
                        {/*http://localhost:8080/images/book/file-name */}
                        <div style={{ height: "250px", width: "250px", border: "solid 1px #ccc" }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}>
                            </img>
                        </div>
                    </div>
                    :
                    <p>Không có dữ liệu</p>
                }
            </Drawer>
        </>
    )
}
export default ViewBookDetail