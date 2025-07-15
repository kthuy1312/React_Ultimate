
import logoreact from '../../assets/react.svg'
import './todo.css'
import TodoData from './TodoData'
import TodoControl from './TodoControl'
import { useState } from 'react'

const ToDoApp = () => {


    //dung state voi list
    const [todoList, setTodoList] = useState([
        // { id: 1, name: "Learning React " },
        // { id: 2, name: "Watching React " }
    ])


    // truyen func, them data vao list
    const addNewTodo = (name) => {
        const newTodo = {
            id: randomIntFromInterval(1, 10000),
            name: name
        }

        setTodoList([...todoList, newTodo])

    }

    //tao id random
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //xoa user
    const deleteTodo = (id) => {
        const newTodo = todoList.filter(item => item.id !== id)
        setTodoList(newTodo);
    }

    /*  có toán tử đkien, khi mà có dlieu se hiện TodoData và kh có logo react
        khi kh có dlieu sẽ hiện logo reactreact */

    return (
        <div className="todo-container">
            <div className="todo-title">Todo List</div>
            <TodoControl addNewTodo={addNewTodo}
            />

            {
                todoList.length > 0 ?
                    <TodoData todoList={todoList}
                        deleteTodo={deleteTodo} />
                    :
                    <div className='todo-img'>
                        <img src={logoreact} className='logo' />
                    </div>
            }
        </div>
    )
}

export default ToDoApp;
