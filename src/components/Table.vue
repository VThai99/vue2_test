<template>
  <div class="style_table">
    <div>test{{ count }}</div>
    <button @click="updateCount">{{ count }}</button>
    <form @submit.prevent="onSubmitData">
      <input name="name" type="text" />
      <button type="submit">submit</button>
    </form>
    <input
      type="text"
      :value="newName"
      @change="$emit('updateNewName', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "TableComp",
  props: {
    newName: String,
  },
  emits: ["updateNewName"],
  data() {
    return { count: 3 };
  },
  methods: {
    updateCount() {
      this.count += 1;
    },
    onSubmitData(data) {
      console.log({ data });
    },
  },
  computed: {},
  beforeCreate() {
    console.log("before Created");
  },
  created() {
    console.log(this.$data.count);
    console.log("created");
    this.$data.count = 10;
  },
  beforeMount() {
    console.log("before Mount");
    console.log(this.$data.count);
    this.$data.count = 20;
  },
  mounted() {
    console.log("mounted");
    console.log(this.$data.count);
  },
  beforeUpdate() {
    console.log("before update");
  },
  updated() {
    console.log("updated");
    this.$data.count = 60;
  },
  beforeDestroy() {
    console.log("before destroy");
  },
  destroyed() {
    console.log("destroyed");
  },
};
</script>

<style scoped>
.style_table input {
  background: red;
}
</style>
