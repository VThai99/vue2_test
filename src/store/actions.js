export default {
  incrementAction({ commit }) {
    // something need to handle before call an action or asynchronous
    console.log("before commit");
    commit("increase");
  },
};
