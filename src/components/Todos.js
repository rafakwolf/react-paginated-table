import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _, {range} from 'lodash';

const pageSize = 10;

function Todos() {
    const [todos, setTodos] = useState([]);
    const [paginatedTodos, setPaginatedTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(resp => {
            setTodos(resp.data);
            setPaginatedTodos(_(resp.data).slice(0).take(pageSize).value());
        })
        .catch(console.error);
    }, []);

    function pagination(pageNo) {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const newPage = _(todos).slice(startIndex).take(pageSize).value();
        setPaginatedTodos(newPage);
    }

    const pageCount = todos ? Math.ceil(todos.length/pageSize) : 0;
    if (pageCount === 1) return null;
    const pages = range(1, pageCount+1);

    return (
        <div>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserId</th>
                        <th>Title</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginatedTodos.map((todo, index) => (
                                <tr key={index}>
                                    <td>{todo.id}</td>
                                    <td>{todo.userId}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.completed}</td>
                                </tr>)
                            )
                    }
                </tbody>
            </table>
            <nav className="d-flex justify-content-center">
                <ul className="pagination">
                    {
                        pages.map(page => (
                            <li className={page === currentPage ? "page-item active" : "page-item"}>
                                <p className="page-link" onClick={() => pagination(page)}>{page}</p>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Todos;