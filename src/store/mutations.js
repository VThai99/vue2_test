export default {
  //  only call synchronous funtion
  increase(state) {
    return state.count++;
  },
  increment(state, payload) {
    state.count += payload.amount;
  },
  addPerson(state, payload) {
    console.log("addddd", payload.newPerson);
    state.tableData.push(payload.newPerson);
  },
  deletePerson(state, payload) {
    console.log("Deleeetettee", payload);
    state.tableData = state.tableData.filter((item) => {
      if (!payload.deleteArr.includes(item.id)) return item;
    });
  },
  updatePerson(state, payload) {
    console.log("updateete");
    const indexUpdate = state.tableData.findIndex(
      (obj) => obj.id === payload.id
    );
    (state.tableData[indexUpdate].id = payload.id),
      (state.tableData[indexUpdate].name = payload.name),
      (state.tableData[indexUpdate].age = payload.age),
      (state.tableData[indexUpdate].gender = payload.gender),
      (state.tableData[indexUpdate].phone = payload.phone),
      (state.tableData[indexUpdate].address = payload.address);
  },
};
