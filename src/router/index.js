import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(({ name }, _, next) => {
  const isUserLoggedIn = !!localStorage.kacheena_me
  if (isUserLoggedIn && name === 'Auth') router.push('/dashboard')
  else if (!isUserLoggedIn) {
    if (name === "Home") next();
    else if (name !== 'Auth') router.push('/auth')
  }
  next()
})

export default router
