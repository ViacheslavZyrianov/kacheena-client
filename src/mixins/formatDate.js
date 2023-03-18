export default {
  filters: {
    formatDate(val) {
      return val && val.split('-').reverse().join('.')
    }
  }
}