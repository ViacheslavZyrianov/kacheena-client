const requireModule = require.context('./', false, /^(?!\.\/index).*\.js$/)

const messages = {}
const locales = []

requireModule.keys().forEach(fileName => {
  const key = fileName.replace('./', '').replace('.js', '')
  locales.push(key)
  const module = requireModule(fileName).default
  messages[key] = module
})

export default {
  messages,
  locales
}
