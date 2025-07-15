import { useRouteError, Link } from "react-router-dom";
import { Button, Result } from 'antd';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Result
            status="404"
            title="Oops!"
            subTitle={<i>{error.statusText || error.message}</i>}
            extra={<Button type="primary">
                <Link to="/">Back Home</Link>
            </Button>}
        />

    );
}
