import store from '../store'

export default async (to, from, next) => {
  document.title = `${to.name} - ToDo List`;

  if (to.name === 'Login' || to.name === 'Cadastrar') {
    if (store.getters['auth/hasToken']) {
      next({ name: 'Home' })
    } else {
      try {
        await store.dispatch('auth/ActionCheckToken');
        next({ name: to.name });
      }
      catch (err) {
        next();
      }
    }
  } else {
    if (store.getters['auth/hasToken']) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
}