import store from '../store'

// eslint-disable-next-line no-unused-vars
export default req => {
  return ({ status }) => {
    if (status === 401) {
      store.dispatch('auth/ActionSignOut')
      window._Vue.$router.push({ name:'login' })
    }
  }
}