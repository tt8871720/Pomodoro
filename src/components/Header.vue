<template>
  <header>
    <div class="header__container d-flex">
      <router-link to="pomo" class="header__icon">
        <img class="d-bolck icon" src="@img/timer.svg" alt="timer" />
      </router-link>
      <router-link to="/task" class="header__icon">
        <img class="d-bolck icon" src="@img/task.svg" alt="task" />
      </router-link>
      <router-link to="/analytics" class="header__icon">
        <img class="d-bolck icon" src="@img/analytic.svg" alt="analytic" />
      </router-link>
    </div>
  </header>
</template>
<script>
export default {
  name: "Header",
  methods: {
    toAnalytics() {
      var todoList = localStorage.getItem("todoList");
      this.$store.dispatch("listGet", todoList);
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  background-color: $main_bg;
  color: white;
}
.header__container {
  max-width: 550px;
  margin-left: auto;
  margin-right: 100px;
  width: 40%;
  align-items: baseline;
}
.header__icon {
  flex: 1;
  height: 110px;
  width: auto;
  &:active {
    background-color: $primary_dark;
  }
  &:focus {
    background-color: $primary_dark;
  }
  &:hover {
    color: $second_txt;
    text-decoration: none;
  }
  &:focus {
    color: $second_txt;
    padding-bottom: 8px;
  }
}
.icon {
  cursor: pointer;
  margin-top: 30px;
}

::v-deep.nav__icon:hover,
.nav__icon:focus {
  border-bottom: 0;
}
</style>
