/* eslint-disable no-unused-vars */
import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'
import { http } from '../../../http'

export const ActionDoLogin = ({dispatch}, payload) => {
  return services.auth.login(payload).then(res => {
    dispatch('ActionSetUser', res.data.user)
    dispatch('ActionSetToken', res.data.token)
  })
}

export const ActionCreateUser = ({dispatch}, payload) => {
  return services.auth.createUser(payload).then(res => {
    dispatch('ActionSetUser', res.data.user)
    dispatch('ActionSetToken', res.data.token)
  })
}

export const ActionCheckToken = ({dispatch, state}) => {
  if (state.token) {
    return Promise.resolve(state.token)
  }
  const token = storage.getLocalToken()
  if (!token) {
    return Promise.reject(new Error('No token'))
  }
  dispatch('ActionSetToken', token)
  return dispatch('ActionLoadSession')
}

export const ActionLoadSession = ({ dispatch }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const { data: { user } } = await services.auth.loadSession()
      dispatch('ActionSetUser', user)
      resolve()
    } catch (error) {
      dispatch('ActionSignOut')
      reject(error)
    }
  })
}

export const ActionSetUser = ({ commit }, payload) => {
  commit(types.SET_USER, payload)
}

export const ActionSetToken = ({ commit }, payload) => {
  storage.setLocalToken(payload)
  storage.setHeaderToken(payload)
  commit(types.SET_TOKEN, payload)
}

export const ActionSignOut = ({ dispatch }) => {
  storage.setHeaderToken('')
  storage.deleteLocalToken()
  dispatch('ActionSetUser', {})
  dispatch('ActionSetToken', '') 
  dispatch('ActionSetTasks', [])
}

export const ActionGetTasks = ({ dispatch }) => {
  return services.auth.getTasks().then(res => {
    dispatch('ActionSetTasks', res.data.sort((a, b) => b.id - a.id))
  })
}

export const ActionSetTasks = ({ commit }, payload) => {
  commit(types.SET_TASKS, payload)
}

export const ActionCreateTask = ({ dispatch }, payload) => {
  return services.auth.createTask(payload).then(res => {
    dispatch('ActionGetTasks', res.data)
  })
}

export const ActionUpdateTask = ({ dispatch }, payload) => {
  return http.put(`task/${payload.id}`, payload).then(res => {
    dispatch('ActionGetTasks', res.data)
  })
}

export const ActionDeleteTask = ({ dispatch }, payload) => {
  return http.delete(`task/${payload}`).then(res => {
    dispatch('ActionGetTasks', res.data)
  })
}

export const ActionUpdateUser = ({ dispatch }, payload) => {
  return http.put(`user`, payload).then(res => {
    dispatch('ActionSetUser', res.data)
  })
}

export const ActionDeleteUser = ({ dispatch }, payload) => {
  return http.delete(`user`).then(res => {
    dispatch('ActionSignOut')
  })
}