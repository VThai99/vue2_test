<template>
  <v-data-table
    dense
    :headers="headers"
    :items="userList"
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:[`item.avatar`]="{ item }">
      <v-chip>
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="150"
          max-width="250"
          :src="item.avatar"
        ></v-img>
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import { UserService } from "@/services/userServices";
export default {
  data() {
    return {
      search: "",
      userList: [],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Avatar",
          value: "avatar",
        },
        { text: "Gender", value: "gender" },
        { text: "Age", value: "age" },
        { text: "Location", value: "location" },
        { text: "Position", value: "position" },
      ];
    },
  },
  methods: {
    getUserList() {
      UserService.getUser()
        .then((res) => {
          console.log(res);
          this.userList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>
