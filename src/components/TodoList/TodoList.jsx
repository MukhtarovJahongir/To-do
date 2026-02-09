import React, { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaPencilAlt } from "react-icons/fa";
import "./TodoList.css";

const TodoList = () => {
  const list = [
    { id: 1, title: "React o'rganish", completed: false },
    { id: 2, title: "Mini loyiha tuzish", completed: true },
    { id: 3, title: "CSS bilan stil berish", completed: false },
    { id: 4, title: "GitHub-ga upload qilish", completed: false },
    { id: 5, title: "Node.js o‘rganish", completed: true },
  ];
  const [text, setText] = useState("");
  const [editID, setEditID] = useState(null);
  const [toDo, setTodo] = useState(list);
  const [filter, setFilter] = useState("All");
  const ChekButton = (id) => {
    setTodo(
      toDo.map((iteam) =>
        iteam.id === id ? { ...iteam, completed: !iteam.completed } : iteam,
      ),
    );
  };

  const Delete = (id) => {
    setTodo(toDo.filter((a) => a.id !== id));
  };

  const Save = () => {
    if (editID) {
      setTodo(
        toDo.map((iteam) =>
          iteam.id === editID ? { ...iteam, title: text } : iteam,
        ),
      );
      setEditID(null);
    } else {
      setTodo([
        ...toDo,
        { id: crypto.randomUUID(), title: text, completed: false },
      ]);
    }
    setText("");
  };

  const Edit = (iteam) => {
    setText(iteam.title);
    setEditID(iteam.id);
  };

  useEffect(() => {
    const saved = localStorage.getItem("todoList");
    if (saved) {
      try {
        setTodo(JSON.parse(saved));
      } catch {
        console.error("localStoragedan noto'g'ri malumot keldi:", error);
        localStorage.removeItem("todoList");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(toDo));
  }, [toDo]);

  const filteredTodo = toDo.filter((g) =>
    filter === "All" ? true : filter === "Active" ? !g.completed : g.completed,
  );

  const n = toDo.filter((b) => !b.completed).length;

  return (
    <div className="ToDo">
      <h1 className='ToDo_h1'>To-Do-list</h1>
      <div className="filters">
        <button className={filter === "All" ? "active":""} onClick={() => setFilter("All")}>All</button>
        <button className={filter === "Active" ? "active":""} onClick={() => setFilter("Active")}>Active</button>
        <button className={filter === "Completed" ? "active":""} onClick={() => setFilter("Completed")}>Completed</button>
      </div>
      <input className='ToDo_input'
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" ? Save() : e;
        }}
      />
      <div className="btns">
        <button className='btn_1' onClick={Save} disabled={!text.trim()}>
        {editID ? "Saqlash" : "Qo'shish"}
      </button>
      <button className='btn_1' onClick={() => setText("")} disabled={!text.trim()}>
        Tozalash
      </button>
      </div>

      <ul className='ToDo_ul'>
        {filteredTodo.map((iteam) => (
          <li className='ToDo_li' key={iteam.id}>
            <div className="text_btn">
              <GoTrash className="Trash" onClick={() => Delete(iteam.id)} />
            <span className={iteam.completed ? "line" : "unline"}>{iteam.title}</span>
            </div>
            <div className="btn"><span className="button" onClick={() => ChekButton(iteam.id)}>
              {iteam.completed ? "✅" : "❌"}
            </span>
            <span onClick={() => Edit(iteam)}>
              <FaPencilAlt />
            </span></div>
          </li>
        ))}
      </ul>
      <p>Bajarilmagan vazifalar: {n}</p>
    </div>
  );
};

export default TodoList;
