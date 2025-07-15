import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";
import BookForm from "./book.form";
import BookFormUncontrol from "./book.form.uncontroll";
import UpdateBookModal from "./update.book";
import UpdateBookModalUnControl from "./update.book.uncontrol";
import { deletedBookAPI } from "../../services/api.service";

const Book = (props) => {
    //get props
    const { loadBook, dataBook,
        current, pageSize, total,
        setCurrent, setPageSize, setTotal
    } = props

    //state modal edit
    const [isOpenDetail, setOpenDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState(null)
    const [isOpenEdit, setOpenEdit] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)

    //giup lấy đuoc current, pageSize của trang đã đuoc chọn (nhưng chưa chuyển trang, chỉ nhấn)
    const onChange = (pagination) => {
        // console.log(pagination)

        //nếu thay đổi current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(pagination.current)
            }
        }

        //nếu thay đổi pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(pagination.pageSize)
            }
        }

    };

    const confirmDelete = async (id) => {
        const res = await deletedBookAPI(id)
        if (res.data) {
            notification.success({
                message: "Delete Book",
                description: "Xóa sách thành công"
            })
            await loadBook()
        }
        else {
            notification.error({
                message: "Delete Book Error",
                description: JSON.stringify(res.message)
            })
        }
    }


    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => (
                <>
                    {(index + 1) + (current - 1) * pageSize}
                </>
            ),
        },
        {
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => (
                <a href="#"
                    onClick=
                    {() => {
                        setOpenDetail(true)
                        setDataDetail(record)
                    }}
                    style={{ cursor: "pointer" }}>
                    {record._id}
                </a>
            ),
        },
        {
            title: 'Tiêu Đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "18px" }}>
                    <EditOutlined
                        style={{ fontSize: "22px", color: "orange", cursor: "pointer" }}
                        onClick={() => {
                            setOpenEdit(true)
                            setDataUpdate(record)
                        }}

                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => { confirmDelete(record._id) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ fontSize: "22px", color: "red", cursor: "pointer" }}
                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];
    return (
        <>

            {/* <BookForm
                loadBook={loadBook}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen} /> */}

            <BookFormUncontrol
                loadBook={loadBook}
                isModalCreateOpen={isModalCreateOpen}
                setIsModalCreateOpen={setIsModalCreateOpen} />

            < Table dataSource={dataBook} columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />

            <ViewBookDetail
                isOpenDetail={isOpenDetail}
                setOpenDetail={setOpenDetail}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />

            {/* <UpdateBookModal
                setOpenEdit={setOpenEdit}
                isOpenEdit={isOpenEdit}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
                loadBook={loadBook}
            /> */}
            <UpdateBookModalUnControl
                setOpenEdit={setOpenEdit}
                isOpenEdit={isOpenEdit}
                setDataUpdate={setDataUpdate}
                dataUpdate={dataUpdate}
                loadBook={loadBook}

            />

        </>
    )
}

export default Book



