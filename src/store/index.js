import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    todos: []
  },
  getters: {
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    },
    storeTodo(state, payload) {
      state.todos.push(payload)
    },
    updateTodo(state, payload) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id)

      if (index !== -1) {
        state.todos.splice(index, 1, payload)
      }
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id)
    }
  },
  actions: {
    async getTodos({ commit }) {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await axios.get('http://localhost:3000/todos')
      commit('storeTodos', response.data)
    },

    async addTodo({ commit }, data) {
      const response = await axios.post('http://localhost:3000/todos', data)
      commit('storeTodo', response.data)
    },

    async updateTodo({ commit }, { id, data }) {
      const response = await axios.put(`http://localhost:3000/todos/${id}`, data)
      commit('updateTodo', response.data)
    },

    async deleteTodo({ commit }, id) {
      await axios.delete(`http://localhost:3000/todos/${id}`)
      commit('deleteTodo', id)
    },
  },

  modules: {
  }
})
