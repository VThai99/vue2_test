<script>
import IconFirst from "../../../components/icons/IconFirst.vue";
import IconLast from "../../../components/icons/IconLast.vue";
import IconNext from "../../../components/icons/IconNext.vue";
import IconPrevious from "../../../components/icons/IconPrevious.vue";

export default {
  name: "PaginationComp",
  components: {
    IconFirst,
    IconLast,
    IconNext,
    IconPrevious,
  },
  props: ["pageNumber", "totalPage"],
  methods: {
    handleSelectPage(item) {
      this.$emit("changePage", item);
    },

    previousPage() {
      if (this.pageNumber > 1) this.$emit("changePage", this.pageNumber - 1);
    },
    nextPage() {
      if (this.pageNumber < this.totalPage)
        this.$emit("changePage", this.pageNumber + 1);
    },
    firstPage() {
      this.$emit("changePage", 1);
    },
    lastPage() {
      this.$emit("changePage", this.totalPage);
    },
  },
};

// const emit = defineEmits(["changePage"]);
// const pN = computed(() => props.pageNumber);
// const tP = computed(() => props.totalPage);
</script>
<template>
  <div class="page_nav">
    <li class="page_item" @click="firstPage">
      <IconFirst />
    </li>
    <li class="page_item" @click="previousPage">
      <IconPrevious />
    </li>
    <li class="prefix" v-if="pageNumber - 2 > 1">...</li>
    <span v-for="item in totalPage" :key="item">
      <li
        :class="[item === pageNumber ? 'active' : '', 'page_item']"
        v-if="pageNumber - 2 <= item && item <= pageNumber + 2"
        @click="handleSelectPage(item)"
      >
        {{ item }}
      </li>
    </span>
    <li class="prefix" v-if="pageNumber + 2 < totalPage">...</li>
    <li class="page_item" @click="nextPage">
      <IconNext />
    </li>
    <li class="page_item" @click="lastPage">
      <IconLast />
    </li>
  </div>
</template>
<style>
.page_nav {
  display: flex;
  gap: 10px;
}
.page_item {
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border: 1px dashed black;
}
.page_item:hover {
  background: red;
}
.prefix {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.active {
  background: blue;
  color: white;
}
</style>
