<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ nameTest }}</h2>
    <button @click="changeName">{{ countState }}</button>
    <button @click="increaseMutate">{{ stateCount }}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return { nameTest: "ThaiK" };
  },
  methods: {
    changeName: function () {
      this.nameTest = "Vip Pro";
    },
    ...mapActions({ increFunc: "incrementAction" }),
    ...mapMutations({ increaseMutate: "increase" }),
  },
  computed: {
    ...mapGetters({ countState: "count" }),
    ...mapState({ stateCount: "count" }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
