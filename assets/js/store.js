const Store = {
    debug: true,
    state: {
      products: [],
      isCartOpen: false,
      coupons: [],
      authors: [],
      modal: false
    },
    toggleIsCartOpenAction() {
      if (Store.debug) console.log('toggleIsCartOpenAction déclenchée')
      Store.state.isCartOpen = !Store.state.isCartOpen
    }
}

export default Store