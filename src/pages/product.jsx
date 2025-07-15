import { useEffect, useState } from "react";
import Book from "../Components/book/book.table";
import { fetchBookAPI } from "../services/api.service";
import BookForm from "../Components/book/book.form";

const ProductPage = () => {

    const [dataBook, setDataBook] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(7)
    const [total, setTotal] = useState(0)

    useEffect(() => { loadBook() }
        , [current, pageSize])

    const loadBook = async () => {
        const res = await fetchBookAPI(current, pageSize)
        if (res.data) {
            setDataBook(res.data.result)
            // setCurrent(res.data.meta.current)
            // setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <div style={{ padding: "30px" }}>
                <Book loadBook={loadBook}
                    dataBook={dataBook}
                    current={current} setCurrent={setCurrent}
                    pageSize={pageSize} setPageSize={setPageSize}
                    total={total} setTotal={setTotal}
                />
            </div>
        </>
    )

}

export default ProductPage;