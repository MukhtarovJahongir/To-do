import api from './axios';

export const getTodos = async () => {
  const res = await api.get("/todo")
  return res.data;
};

export const createTodo = async (data) => {
  const res = await api.post("/todo", data);
  return res.data;
};

export const updateTodo = async (id , data) => {
  const res = await api.put(`/todo/${id}`, data);
  return res.data;
};

export const deleteTodo = async (id) => {
  await api.delete(`/todo/${id}`)
};