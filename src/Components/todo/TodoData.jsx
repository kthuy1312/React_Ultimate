// props là 1 obj
//   {
//     name: kthuy
//     age: 20
//     data: { }
//    }

// cách lấy props nhanh
// const {name, age, data}= props


const TodoData = (props) => {

    const { todoList, deleteTodo } = props;

    return (
        <div className="todo-data">
            {
                todoList.map((item, index) => {
                    return (
                        <div className="todo-item" >
                            <div>{item.name}</div>
                            <button onClick={() => deleteTodo(item.id)}>Delete</button>
                        </div>)
                })
            }

            {/* <div> {JSON.stringify(todoList)} </div> */}
        </div>
    );
}

export default TodoData