
import { Table, Popconfirm, notification, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UpdateUserModal from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { useState } from 'react';
import { deleteUserAPI } from '../../services/api.service';
const UserTable = (props) => {

    //--props--
    const { dataUser, loadUser
        , current, pageSize, total,
        setCurrent, setPageSize, setTotal
    } = props

    //--useState--
    //1.open modal update
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    //2. data khi nhan vao nut edit
    const [dataUpdate, setDataUpdate] = useState(null)
    //3.4. dataDetail và mở đóng detail
    const [dataDetail, setDataDetail] = useState(null)
    const [isOpenDetail, setIsOpenDetail] = useState(false)


    const confirmDelete = async (id) => {
        const res = await deleteUserAPI(id)
        // console.log(res)
        if (res.data) {
            notification.success({
                message: "Delete User ",
                description: "Xóa user thành công"
            })
            await loadUser()
        }
        else {
            notification.error({
                message: "Delete User ",
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
            dataIndex: '_id', // để ánh xạ tới data theo đúng key
            render: (_, record) => (
                <a href="#"
                    onClick=
                    {() => {
                        setIsOpenDetail(true)
                        setDataDetail(record)
                    }}
                    style={{ cursor: "pointer" }}>
                    {record._id}
                </a>
            ),
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "18px" }}>
                    <EditOutlined
                        style={{ fontSize: "22px", color: "orange", cursor: "pointer" }}
                        onClick={() => {
                            setIsModalUpdateOpen(true)
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
        }
    ];


    //giup lấy đuoc current, pageSize của trang đã đuoc chọn (nhưng chưa chuyển trang, chỉ nhấn)
    const onChange = (pagination, filters, sorter, extra) => {
        console.log(pagination, filters, sorter, extra)

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

    return (
        <>
            <Table columns={columns}
                dataSource={dataUser}
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
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isOpenDetail={isOpenDetail}
                setIsOpenDetail={setIsOpenDetail}
                loadUser={loadUser}
            />
        </>
    )
}

export default UserTable