import { useContext } from "react"
import { AuthContext } from "../Components/context/auth.context"
import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext)


    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    return (
        <>
            <Result
                status="403"
                title="Oops!"
                subTitle={<i>Bạn cần phải đăng nhập để truy cập nguồn tài nguyên này</i>}
                extra={<Button type="primary">
                    <Link to="/">Back Home</Link>
                </Button>}
            />

        </>
    )

}

export default PrivateRoute
