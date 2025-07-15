

import { createContext, useState } from 'react';

export const AuthContext = createContext(
    {
        id: "",
        email: "",
        phone: "",
        fullNme: "",
        role: "",
        avatar: ""
    }
);

//props ở đây chính là các component được AuthWrapper bọc lại
//khi gọi AuthWrapper cũng có nghĩa là gọi AuthContext
//ghi v để truyền động thằng children dô , kh cần xuất tk cha ra
export const AuthWrapper = (props) => {
    const [user, setUser] = useState(
        {
            id: "",
            email: "",
            phone: "",
            fullNme: "",
            role: "",
            avatar: ""
        })
    //khi F5 dlieu chưa kịp có thì nó sẽ loading
    const [isAppLoading, setAppLoading] = useState(true)
    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )

}