export default {
  count: (state) => state.count,
  getPerson: (state) => (id) => {
    return state.tableData.find((item) => item.id === id);
  },
};
