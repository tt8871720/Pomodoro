<template>
  <div class="home">
    <Nav />
    <div class="content d-flex">
      <div class="button">
        <router-link to="pomo" class="button__box"
          ><button class="content-btn">Start pomodoro</button></router-link
        >
        <router-link to="task" class="button__box"
          ><button class="content-btn">Choose task</button></router-link
        >
      </div>
      <div class="image">
        <img src="@img/marketing.svg" alt="marketing.svg" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@com/Nav.vue";
export default {
  name: "Home",
  components: {
    Nav
  }
};
</script>
<style lang="scss" scoped></style>
