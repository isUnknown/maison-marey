const Store = {
    debug: true,
    state: {
      isCartOpen: false,
      coupons: []
    },
    toggleIsCartOpenAction() {
      if (Store.debug) console.log('toggleIsCartOpenAction déclenchée')
      Store.state.isCartOpen = !Store.state.isCartOpen
    }
}

export default Store