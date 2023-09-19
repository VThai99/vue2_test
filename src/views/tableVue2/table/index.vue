<script>
import IconEdit from "@/components/icons/IconEdit.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconUp from "@/components/icons/IconUp.vue";
import IconDown from "@/components/icons/IconDown.vue";

export default {
  name: "TableComp",
  components: {
    IconEdit,
    IconDelete,
    IconUp,
    IconDown,
  },
  props: ["data", "chosedAll", "chosedList", "orderField", "orderDirection"],
  methods: {
    updateChosed: function (value) {
      this.$emit("chosedHandle", value);
    },
    handleGetPerson: function (id) {
      this.$emit("editPerson", id);
    },
    handleDeletePerson: function (id) {
      this.$emit("deletePerson", id);
    },
    handleSort: function (field) {
      if (field !== this.$props.orderField) {
        this.$emit("onChangeSort", { fieldSort: field, isIncrease: true });
      } else {
        this.$emit("onChangeSort", {
          fieldSort: field,
          isIncrease: !this.$props.orderDirection,
        });
      }
    },
  },
  computed: {},
};

// const data = computed(() => props.data);
// const chosedArr = computed(() => props.chosedList);
// const chosedAllCom = computed(() => props.chosedAll);
</script>
<template>
  <div>
    <table border="1" class="table_style">
      <thead>
        <tr>
          <td>
            <input
              type="checkbox"
              :checked="chosedAll"
              @change="$emit('chosedAll')"
            />
          </td>
          <td @click="handleSort('name')">
            Name
            <span v-if="orderField == 'name' && orderDirection"
              ><IconUp
            /></span>
            <span v-if="orderField == 'name' && !orderDirection"
              ><IconDown
            /></span>
          </td>
          <td @click="handleSort('age')">
            Age
            <span v-if="orderField == 'age' && orderDirection"><IconUp /></span>
            <span v-if="orderField == 'age' && !orderDirection"
              ><IconDown
            /></span>
          </td>
          <td @click="handleSort('gender')">
            Gender
            <span v-if="orderField == 'gender' && orderDirection"
              ><IconUp
            /></span>
            <span v-if="orderField == 'gender' && !orderDirection"
              ><IconDown
            /></span>
          </td>
          <td @click="handleSort('phone')">
            Phone Number
            <span v-if="orderField == 'phone' && orderDirection"
              ><IconUp
            /></span>
            <span v-if="orderField == 'phone' && !orderDirection"
              ><IconDown
            /></span>
          </td>
          <td @click="handleSort('address')">
            Address
            <span v-if="orderField == 'address' && orderDirection"
              ><IconUp
            /></span>
            <span v-if="orderField == 'address' && !orderDirection"
              ><IconDown
            /></span>
          </td>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>
            <input
              type="checkbox"
              :checked="chosedList.includes(item.id)"
              @change="
                () => {
                  updateChosed(item.id);
                }
              "
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.gender }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td class="action_style">
            <span
              @click="
                () => {
                  handleGetPerson(item.id);
                }
              "
              ><IconEdit
            /></span>
            <span
              @click="
                () => {
                  handleDeletePerson(item.id);
                }
              "
              ><IconDelete
            /></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style>
.table_style {
  width: 100%;
  text-align: center;
  font-size: 13px;
  border-radius: 10px;
}

.table_style thead {
  background-color: rgba(24, 24, 31, 0.712);
  color: #fff;
  font-size: 18px;
}
.action_style {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.action_style span {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
thead tr td {
  cursor: pointer;
}
</style>
