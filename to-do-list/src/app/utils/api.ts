const API_URL = 'https://assignment-todolist-api.vercel.app/api';

export const fetchTodos = async (tenantId: string) => {
  const response = await fetch(`${API_URL}/${tenantId}/items`);
  const data = await response.json();
  return data;
};

export const addTodo = async (tenantId: string, todo: string) => {
  const response = await fetch(`${API_URL}/${tenantId}/items`, {
    method: 'POST',
    body: JSON.stringify({ content: todo }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.json();
};
