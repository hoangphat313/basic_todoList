import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; // Import CSS for transitions

function App() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todos.some(item => item.id === value?.replace(/\s/g, ''))) {
      toast.error('Công việc đã được thêm rồi');
    } else {
      setTodos(prev => [...prev, { id: value?.replace(/\s/g, ''), job: value, completed: false }]);
      toast.success('Thêm thành công');
      setValue('');
    }
  };

  const handleDeleteJob = (id) => {
    setTodos(prev => prev.filter(item => item.id !== id));
    toast.success('Xóa thành công');
  };

  const handleEditJob = (id) => {
    const todo = todos.find(item => item.id === id);
    setEditing(id);
    setEditingValue(todo.job);
  };

  const handleSaveEdit = (id) => {
    if (todos.some(item => item.job === editingValue && item.id !== id)) {
      toast.error('Công việc đã tồn tại');
    } else {
      setTodos(prev =>
        prev.map(item =>
          item.id === id ? { ...item, job: editingValue } : item
        )
      );
      setEditing(null);
      setEditingValue('');
      toast.success('Chỉnh sửa thành công');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    toast.success('Trạng thái công việc đã được cập nhật');
    setTimeout(() => {
      setTodos(prev => prev.filter(item => item.id !== id));
    }, 500); // Delay to allow transition
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8">
        <h2 className="font-bold text-3xl text-blue-700 bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
          My TodoList
        </h2>
      </div>
      <div className="flex flex-col gap-6 justify-center items-center bg-gray-100 p-6 min-h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
          <div className="form-container">
            <input
              type="text"
              className="outline-none border border-blue-600 px-4 py-2 w-full rounded-md shadow-sm"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Nhập công việc..."
            />
            <button
              type="button"
              className="outline-none px-4 py-2 bg-blue-500 rounded-md text-white flex items-center gap-2 hover:bg-blue-600 transition duration-300"
              onClick={handleAdd}
            >
              <FaPlus /> Add
            </button>
          </div>
          <h3 className="font-bold text-xl my-4 text-blue-700">Danh sách công việc:</h3>
          <TransitionGroup component="ul" className="space-y-3">
            {todos.map(item => (
              <CSSTransition
                key={item.id}
                timeout={500}
                classNames="todo"
              >
                <li className="flex justify-between items-center p-2 bg-gray-100 rounded-md shadow-sm hover:shadow-lg transition duration-300">
                  <div className="flex items-center gap-2 w-full">
                    <span
                      onClick={() => handleToggleComplete(item.id)}
                      className="cursor-pointer text-green-500 hover:text-green-700 transition duration-300"
                    >
                      {item.completed ? <FaCheckCircle /> : <FaRegCircle />}
                    </span>
                    {editing === item.id ? (
                      <input
                        type="text"
                        className="outline-none border border-blue-600 px-4 py-2 w-full rounded-md shadow-sm"
                        value={editingValue}
                        onChange={e => setEditingValue(e.target.value)}
                      />
                    ) : (
                      <span className={item.completed ? "line-through" : ""}>{item.job}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editing === item.id ? (
                      <button
                        className="outline-none px-2 py-1 bg-green-500 rounded-md text-white flex items-center gap-1 hover:bg-green-600 transition duration-300"
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        <FaCheck /> Save
                      </button>
                    ) : (
                      <button
                        className="outline-none px-2 py-1 bg-yellow-500 rounded-md text-white flex items-center gap-1 hover:bg-yellow-600 transition duration-300"
                        onClick={() => handleEditJob(item.id)}
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                    <button
                      className="outline-none px-2 py-1 bg-red-500 rounded-md text-white flex items-center gap-1 hover:bg-red-600 transition duration-300"
                      onClick={() => handleDeleteJob(item.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
