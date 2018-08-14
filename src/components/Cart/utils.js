const getInitialStateFromSession = (key) => {
    let value = null
    try {
      value = JSON.parse(sessionStorage.getItem(key))
    } catch(e) {
      return value
    }
    return value
  }

  export {
    getInitialStateFromSession,
  }