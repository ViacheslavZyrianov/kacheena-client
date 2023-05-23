export const actions = {
    async fetchInit() {
        const { data } = await this.axios.get('init')
        console.log('data', data)
    }
}