import store from '../store'

export default async (to, from, next) => {
  document.title = `${to.name} - ToDo List`;

  if (to.name === 'Login') {
    if (store.getters['auth/hasToken']) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else if (to.name === 'Cadastrar') {
    if (store.getters['auth/hasToken']) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    if (store.getters['auth/hasToken']) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
}