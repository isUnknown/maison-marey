const Store = {
    debug: true,
    state: {
      isCartOpen: false
    },
    toggleIsCartOpenAction() {
      if (this.debug) console.log('toggleIsCartOpenAction déclenchée')
      this.state.isCartOpen = !this.state.isCartOpen
    }
}

export default Store