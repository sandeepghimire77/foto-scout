export default {
  /**
   * Set location
   * @param {Object} state
   * @param {Object} payload
   */
  setLocation (state, payload) {
    state.location = { ...state.location, ...payload.location }
  }
}