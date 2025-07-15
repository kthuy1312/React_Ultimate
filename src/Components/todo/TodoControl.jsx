// props là 1 obj
//   {
//     name: kthuy
//     age: 20
//     data: { }
//    }


// cách lấy props nhanh
// const {name, age, data}= props

import { useState } from "react"

const TodoControl = (props) => {

    // truyen func
    const { addNewTodo } = props;

    //dung state 
    const [valueInput, setValueInput] = useState("kthuy") //gtr mac dinh


    const handleonClick = () => {
        addNewTodo(valueInput);
        setValueInput("");
    }
    const handleonChange = (name) => {
        setValueInput(name)
    }


    return (
        <div className="todo-control">
            <input type="text" value={valueInput}
                onChange={(event) => {
                    handleonChange(event.target.value)
                }} />
            <button onClick={handleonClick} >Add</button>
            {/* <div>hi my name is {valueInput}</div> */}
        </div>
    );
}

export default TodoControl