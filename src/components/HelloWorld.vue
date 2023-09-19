<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ nameTest }}</h2>
    <h3>Reverted: {{ revertName }}</h3>
    <button @click="increFunc">{{ countState }}</button>
    <button @click="increaseMutate">{{ stateCount }}</button>
    <div>
      <Table :newName="nameTest" @updateNewName="changeName" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import Table from "./Table.vue";
export default {
  name: "HelloWorld",
  components: {
    Table,
  },
  props: {
    msg: String,
  },
  data() {
    return { nameTest: "ThaiK" };
  },
  methods: {
    changeName: function (value) {
      this.nameTest = value ?? "Hehee";
    },
    ...mapActions({ increFunc: "incrementAction" }),
    ...mapMutations({ increaseMutate: "increase" }),
  },
  watch:{
    nameTest(){
      console.log('new Name');
    }
  },
  computed: {
    ...mapGetters({ countState: "count" }),
    ...mapState({ stateCount: "count" }),
    revertName() {
      return this.nameTest.slice(2,5);
    },
  },
  beforeUpdate() {
    console.log("update parent");
  },
  updated() {
    console.log("updated parent");
  },
};
</script>
