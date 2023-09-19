<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import FilterComp from "@/views/tableVue2/filter/index.vue";
import Modal from "@/views/tableVue2/modal/Modal.vue";
import Pagination from "./pagination/index.vue";
import TableComp from "@/views/tableVue2/table/index.vue";

export default {
  name: "TableVue2",
  components: {
    FilterComp,
    Modal,
    Pagination,
    TableComp,
  },
  data() {
    return {
      chosedAll: false,
      chosedList: [],
      form: {
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
      },
      formEdit: {
        id: "",
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
      },
      orderBy: {
        field: "name",
        isIncrease: true,
      },
      searchField: "",
      searchProps: "",
      genderFilter: "",
      page: { pageSize: "5", pageNumber: 1 },
      show: false,
      showEdit: false,
    };
  },
  computed: {
    ...mapGetters(["getPerson"]),
    ...mapState({ dataTable: "tableData" }),
    ...mapMutations(["updatePerson", "deletePerson", "addPerson"]),
    dataShow() {
      const arrayFilter = this.dataTable.filter(
        (item) =>
          (this.genderFilter != ""
            ? item.gender === this.genderFilter
            : true) &&
          (this.searchField !== ""
            ? this.checkContain(item.name, this.searchField) ||
              this.checkContain(item.phone, this.searchField) ||
              this.checkContain(item.address, this.searchField)
            : true)
      );

      return this.paginate(
        this.sortData(arrayFilter, this.orderBy.field, this.orderBy.isIncrease),
        Number(this.page.pageSize),
        this.page.pageNumber
      );
    },
    chosedAllShow() {
      if (this.chosedList.length === this.dataShow.length) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    paginate(dataFull, size, page) {
      return dataFull.slice((page - 1) * size, page * size);
    },

    checkContain(target, checkValue) {
      return target.toLowerCase().includes(checkValue.toLowerCase());
    },
    sortData(arrayInput, fieldSort, increase) {
      const sortArr = arrayInput.toSorted((itemA, itemB) =>
        itemA[fieldSort]
          .toLowerCase()
          .localeCompare(itemB[fieldSort].toLowerCase())
      );
      if (increase) {
        return sortArr;
      }
      return sortArr.toReversed();
    },
    closeModal() {
      this.show = false;
    },

    closeModalEdit() {
      this.showEdit = false;
    },

    onSearch() {
      this.searchField = this.searchProps;
    },

    addHandle() {
      this.$store.commit("addPerson", {
        newPerson: {
          id: Date.now(),
          name: this.form.name,
          age: this.form.age,
          gender: this.form.gender,
          phone: this.form.phone,
          address: this.form.address,
        },
      });
      //   this.addPerson({
      //     newPerson: {
      //       id: Date.now(),
      //       name: this.form.name,
      //       age: this.form.age,
      //       gender: this.form.gender,
      //       phone: this.form.phone,
      //       address: this.form.address,
      //     },
      //   });
      Object.assign(this.form, {
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
      });
      this.closeModal();
    },
    openModal() {
      this.show = true;
    },
    changeAmount(amount) {
      this.page.pageSize = amount;
    },

    onChangePage(value) {
      this.page.pageNumber = value;
    },

    onChosedAll() {
      if (this.chosedAll) {
        this.chosedAll = false;
        this.chosedList = [];
      } else {
        this.chosedAll = true;
        this.chosedList = this.dataShow.map((item) => item.id);
      }
    },

    onChosedHandle(value) {
      if (this.chosedList.includes(value)) {
        this.chosedList = this.chosedList.filter((item) => item != value);
        return;
      }
      this.chosedList.push(value);
    },

    onDelete() {
      this.$store.commit("deletePerson", { deleteArr: this.chosedList });
      //   this.deletePerson({ deleteArr: this.chosedList });
    },

    onDeleteOne(value) {
      this.$store.commit("deletePerson", { deleteArr: [value] });
      //   this.deletePerson({ deleteArr: [value] });
    },

    onGetDetail(value) {
      const person = this.getPerson(value);
      Object.assign(this.formEdit, {
        id: person.id,
        name: person.name,
        age: person.age,
        gender: person.gender,
        phone: person.phone,
        address: person.address,
      });
      this.showEdit = true;
    },

    saveHandle() {
      this.$store.commit("updatePerson", this.formEdit);
      //   this.updatePerson(this.formEdit);
      this.closeModalEdit();
    },

    onChangeSort: function (value) {
      Object.assign(this.orderBy, {
        field: value.fieldSort,
        isIncrease: value.isIncrease,
      });
    },

    onChangeSearch: function (value) {
      this.searchProps = value;
    },

    onChangeGender: function (value) {
      this.genderFilter = value;
    },
  },
};
</script>

<template>
  <div>
    <div class="mt-5">
      <div class="filter_wrapper">
        <FilterComp
          @handleAdd="openModal"
          @changeAmount="changeAmount"
          @delete="onDelete"
          @search="onSearch"
          @changeSearch="onChangeSearch"
          @changeGender="onChangeGender"
          :amount="page.pageSize"
          :searchField="searchProps"
          :genderFilter="genderFilter"
        />
      </div>
      <div class="table_wrapper">
        <TableComp
          :data="dataShow"
          :chosedList="chosedList"
          :chosedAll="chosedAllShow"
          :orderField="orderBy.field"
          :orderDirection="orderBy.isIncrease"
          @chosedHandle="onChosedHandle"
          @chosedAll="onChosedAll"
          @deletePerson="onDeleteOne"
          @editPerson="onGetDetail"
          @onChangeSort="onChangeSort"
        />
      </div>
      <div class="pagination_wrapper">
        <Pagination
          :pageNumber="page.pageNumber"
          :totalPage="Math.ceil(dataTable.length / Number(page.pageSize))"
          @changePage="onChangePage"
        />
      </div>
    </div>
    <Modal :show="show" @closeModal="closeModal" @save="addHandle">
      <template #modal-content>
        <div class="mt-1 name_age">
          <div class="flex_style">
            <span class="label_style">Name: </span>
            <input v-model="form.name" class="input_style" />
          </div>
          <div class="flex_style">
            <span class="label_style">Age: </span>
            <input v-model="form.age" class="input_style" />
          </div>
        </div>

        <div class="mt-1 flex_style">
          <span class="label_style">Gender: </span>
          <select class="input_style" name="" id="" v-model="form.gender">
            <option value="">Chose your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div class="mt-1 flex_style">
          <span class="label_style">Phone number: </span>
          <input v-model="form.phone" class="input_style" />
        </div>
        <div class="mt-1 flex_style">
          <span class="label_style">Address: </span>
          <input v-model="form.address" class="input_style" />
        </div>
      </template>
    </Modal>

    <!-- modal Edit -->
    <Modal :show="showEdit" @closeModal="closeModalEdit" @save="saveHandle">
      <template #modal-content>
        <div class="mt-1 name_age">
          <div class="flex_style">
            <span class="label_style">Name: </span>
            <input v-model="formEdit.name" class="input_style" />
          </div>
          <div class="flex_style">
            <span class="label_style">Age: </span>
            <input v-model="formEdit.age" class="input_style" />
          </div>
        </div>

        <div class="mt-1 flex_style">
          <span class="label_style">Gender: </span>
          <select class="input_style" name="" id="" v-model="formEdit.gender">
            <option value="">Chose your gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div class="mt-1 flex_style">
          <span class="label_style">Phone number: </span>
          <input v-model="formEdit.phone" class="input_style" />
        </div>
        <div class="mt-1 flex_style">
          <span class="label_style">Address: </span>
          <input v-model="formEdit.address" class="input_style" />
        </div>
      </template>
    </Modal>
  </div>
</template>
<style>
.pagination_wrapper {
  display: flex;
  justify-content: flex-end;
}

.table_wrapper {
  margin-top: 1rem;
}

.pagination_wrapper {
  margin-top: 1rem;
}

.input_style {
  border-radius: 5px;
  border: 1px solid #331515;
  padding: 5px 10px;
  font-size: 12px;
  flex-grow: 1;
}

.label_style {
  font-weight: bold;
  margin-right: 5px;
  width: 120px;
  display: block;
}

.name_age {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex_style {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
