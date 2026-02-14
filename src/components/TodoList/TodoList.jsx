import React, { useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";
import { FaPencilAlt } from "react-icons/fa";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../api/todoService";
import "./TodoList.css";

const TodoList = () => {
  // const list = [
  //   { id: 1, title: "React o'rganish", completed: false },
  //   { id: 2, title: "Mini loyiha tuzish", completed: true },
  //   { id: 3, title: "CSS bilan stil berish", completed: false },
  //   { id: 4, title: "GitHub-ga upload qilish", completed: false },
  //   { id: 5, title: "Node.js o‘rganish", completed: true },
  // ];
  const [text, setText] = useState("");
  const [editID, setEditID] = useState(null);
  const [toDo, setTodo] = useState([]);
  const [filter, setFilter] = useState("All");

  const ChekButton = async (id) => {
    const item = toDo.find((t) => t.id === id);
    if (!item) return;
    try {
      const updated = await updateTodo(id, {
        title: item.title,
        completed: !item.completed,
      });
      setTodo(toDo.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error("Yangilashda xatolik:", error);
    }
  };

  // const ChekButton = (id) => {
  //   setTodo(
  //     toDo.map((iteam) =>
  //       iteam.id === id ? { ...iteam, completed: !iteam.completed } : iteam,
  //     ),
  //   );
  // };

  // const Delete = (id) => {
  //   setTodo(toDo.filter((a) => a.id !== id));
  // };

  const Delete = async (id) => {
    try {
      await deleteTodo(id);
      setTodo(toDo.filter((b) => b.id !== id));
    } catch (error) {
      console.error("O'chirishda xatolig:", error);
    }
  };

  // const Save =  () => {
  //   if (editID) {
  //     setTodo(
  //       toDo.map((iteam) =>
  //         iteam.id === editID ? { ...iteam, title: text } : iteam,
  //       ),
  //     );
  //     setEditID(null);
  //   } else {
  //     setTodo([...toDo, { title: text, completed: false }]);
  //   }
  //   setText("");
  // };

  const Save = async () => {
    if (!text.trim()) return;
    try {
      if (editID !== null) {
        const item = toDo.find((a) => a.id === editID);
        const edit = await updateTodo(editID, {
          title: text,
          completed: item.completed,
        });
        setTodo(toDo.map((b) => (b.id === editID ? edit : b)));
        setEditID(null);
      } else {
        const newItem = await createTodo({ title: text, completed: false });
        setTodo([...toDo, newItem]);
      }
    } catch (error) {
      console.error("Server xatoligi:", error);
    }
    setText("");
  };

  const Edit = (iteam) => {
    setText(iteam.title);
    setEditID(iteam.id);
  };

  // useEffect(() => {
  //   const saved = localStorage.getItem("todoList");
  //   if (saved) {
  //     try {
  //       setTodo(JSON.parse(saved));
  //     } catch {
  //       console.error("localStoragedan noto'g'ri malumot keldi:", error);
  //       localStorage.removeItem("todoList");
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("todoList", JSON.stringify(toDo));
  // }, [toDo]);

  const filteredTodo = toDo.filter((g) =>
    filter === "All" ? true : filter === "Active" ? !g.completed : g.completed,
  );

  const n = toDo.filter((b) => !b.completed).length;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodo(data);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="ToDo">
      <h1 className="ToDo_h1">To-Do-list</h1>
      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Active" ? "active" : ""}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>
      <input
        className="ToDo_input"
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" ? Save() : e;
        }}
      />
      <div className="btns">
        <button className="btn_1" onClick={Save} disabled={!text.trim()}>
          {editID !== null ? "Saqlash" : "Qo'shish"}
        </button>
        <button
          className="btn_1"
          onClick={() => setText("")}
          disabled={!text.trim()}
        >
          Tozalash
        </button>
      </div>

      <ul className="ToDo_ul">
        {filteredTodo.map((iteam) => (
          <li className="ToDo_li" key={iteam.id}>
            <div className="text_btn">
              <GoTrash className="Trash" onClick={() => Delete(iteam.id)} />
              <span className={iteam.completed ? "line" : "unline"}>
                {iteam.title}
              </span>
            </div>
            <div className="btn">
              <span className="button" onClick={() => ChekButton(iteam.id)}>
                {iteam.completed ? "✅" : "❌"}
              </span>
              <span onClick={() => Edit(iteam)}>
                <FaPencilAlt />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p>Bajarilmagan vazifalar: {n}</p>
    </div>
  );
};

export default TodoList;
