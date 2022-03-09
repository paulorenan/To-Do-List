export default {
  createUser: { method: 'POST', url: 'user' },
  login: { method: 'post', url: 'login' },
  loadSession: { method: 'get', url: 'load' },
  getTasks: { method: 'get', url: 'task/user' },
  createTask: { method: 'post', url: 'task' },
  updateTask: { method: 'put', url: 'task{/id}' },
}