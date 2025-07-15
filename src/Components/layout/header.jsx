
import './header.css'
import { HomeOutlined, UserAddOutlined, BookOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';


const iconStyle = { fontSize: "20px" };

const Header = () => {

    const [current, setCurrent] = useState('home');
    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };

    const { user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    //logout btn
    const handleLogout = async () => {
        //call api logout
        const res = await logoutAPI()
        if (res.data) {

            //clear data
            localStorage.removeItem("access_token")
            setUser(
                {
                    id: "",
                    email: "",
                    phone: "",
                    fullNme: "",
                    role: "",
                    avatar: ""
                }
            )

            //thông báo
            message.success("Đăng xuất thành công")

            //đá ng dùng về homepage
            navigate("/")
        }
    }

    // khi lòa lại trang current sẽ thay đổi dựa theo useLocation 
    // (nếu kh có thì load lại trang vẫn hiện đúng trang, nhưng phát sáng trang khác)

    const location = useLocation()
    useEffect(() => {
        // console.log(location)
        if (location && location.pathname) {
            const allRoute = ["users", "products"]
            const currentRoute = allRoute.find(item => `/${item}` === location.pathname)
            if (currentRoute) {
                setCurrent(currentRoute);
            }
            else {
                setCurrent("home");
            }
        }
    }
        , [location])

    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined style={iconStyle} />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserAddOutlined style={iconStyle} />
        },

        {
            label: <Link to={"/products"}>Products</Link>,
            key: 'products',
            icon: <BookOutlined style={iconStyle} />
        },
        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined style={iconStyle} />,
        }] : []),

        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined style={iconStyle} />,
            children: [
                {
                    label: <span onClick={() => { handleLogout() }}>Đăng xuất</span>,
                    key: 'logout',
                },
            ],
        }] : []),


    ];
    return (
        <Menu onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className='menu'
        />
    )
}
export default Header;