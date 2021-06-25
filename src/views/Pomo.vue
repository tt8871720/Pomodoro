<template>
  <div class="pomo">
    <div class="nav">
      <router-link to="pomo" class="nav__title status-clicked"
        >Pomodoro</router-link
      >
      <router-link to="break" class="nav__title">Short Break</router-link>
    </div>
    <div>
      <div class="infos" v-show="!isReset">
        <div class="info__up">
          <div class="info__up-container">
            <div class="info__up__time">
              <!-- <span v-show="isReset">00:00</span> -->
              <Countdown
                ref="countdown"
                class="mx-auto"
                :time="countDownTime"
                format="mm:ss"
                @on-end="onCountdownEnd"
                :switch="isStart"
              >
                <template slot-scope="{ time }">{{ time }}</template>
              </Countdown>
            </div>
            <div class="info__up__task">{{ nowTaskName }}</div>
          </div>
        </div>
        <div class="info__down" v-show="!isEnd">
          <div class="d-flex justify-content-around align-items-center">
            <div class="info__down__status d-flex">
              <div class="mx-auto d-flex">
                <div class="info__down__status__start d-flex">
                  <div
                    class="d-flex mr-5"
                    @click="
                      isStart = !isStart;
                      isReset = false;
                    "
                  >
                    <div class="stop" v-show="isStart"></div>
                    <div class="stop" v-show="isStart"></div>
                  </div>
                  <div
                    class="start"
                    v-show="!isStart"
                    @click="isStart = !isStart"
                  ></div>
                </div>
                <div class="info__down__status__terminate" v-show="isStart">
                  <div class="terminate" @click="timereset"></div>
                </div>
              </div>
            </div>
            <div class="info__down__img">
              <img src="@img/break.png" alt="break.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="restart" v-show="isReset">
        <div class="restart__txt">Do you want to restart?</div>
        <div class="restart__img">
          <img src="@img/restart.png" alt="restart" @click="isReset = false" />
        </div>
        <div class="restart__task">
          <div>{{ nowTaskName }}</div>
        </div>
      </div>
      <div class="takebreak" v-show="isEnd && !isReset">
        <router-link to="break" class="button__box"
          ><button class="content-btn content-btn-break mx-auto">
            Take a short break？
          </button></router-link
        >
        <!-- <a class="takebreak__txt" @click="$router.back(-1)">Skip Break</a> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Nav from "@com/Nav.vue";
import Countdown from "@choujiaojiao/vue2-countdown";
import { mapState, mapActions } from "vuex";

export default {
  name: "Pomo",
  components: {
    // Nav
    Countdown
  },
  data() {
    return {
      isStart: false,
      isReset: false,
      countDownTime: 5,
      isEnd: false
    };
  },
  methods: {
    onCountdownEnd() {
      this.isEnd = true;
      //乎交freq +1
      var index = this.nowIndex;
      var freq = this.todoList[index].frequency;
      this.$set(this.todoList[index], "frequency", freq + 1);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      // console.log("frequency",freq)
      // console.log("index",index)
    },
    timereset() {
      this.isStart = false;
      this.isEnd = false;
      this.isReset = true;
      this.countDownTime = this.countDownTime;
      this.$refs.countdown.reCountdown();
      // console.log('this.isStart',this.isStart)
      // console.log('this.isReset',this.isReset)
      // console.log('this.isEnd',this.isEnd)
    },
    test() {
      this.isStart = false;
      this.isReset = false;
      this.isEnd = false;
      this.countDownTime = this.countDownTime;
      this.$refs.countdown.reCountdown();
    }
  },
  computed: {
    ...mapState(["taskIndex", "allLsit"]),
    nowTaskName() {
      return this.allLsit[this.taskIndex]
        ? this.allLsit[this.taskIndex].name
        : "Unknow Task";
    },
    nowIndex(){
      return this.taskIndex;
    },
    todoList(){
      return this.allLsit;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.info {
  &__up {
    color: $second_txt;
    margin-bottom: 20px;
    &-container {
      display: flex;
      align-items: center;
    }
    &__time {
      font-size: 140px;
      flex: 1;
    }
    &__task {
      font-size: 37px;
      flex: 1;
    }
  }
  &__down {
    &__status {
      flex: 1;
      &__start {
        cursor: pointer;
      }
      .stop {
        width: 16px;
        height: 50px;
        background-color: $second_txt;
        border-radius: 5px;
      }
      .stop + .stop {
        margin-left: 18px;
      }
      .start {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 25px 0 25px 50px;
        border-color: transparent transparent transparent #caceac;
        border-radius: 8px;
      }
      .terminate {
        height: 50px;
        width: 50px;
        border-radius: 4px;
        background-color: $second_txt;
        cursor: pointer;
      }
    }
    &__img {
      flex: 1;
      img {
        min-width: 362px;
        height: auto;
      }
    }
  }
}
.restart {
  text-align: center;
  font-size: 32px;
  color: $second_txt;
  &__txt {
    font-weight: bold;
    margin-bottom: 20px;
  }
  &__img {
    img {
      cursor: pointer;
    }
  }
  &__task {
    margin-top: 20px;
  }
}
.takebreak {
  color: $second_txt;
  .content-btn-break {
    color: $main_bg;
    background-color: $second_txt;
    margin-bottom: 40px;
  }
  &__txt {
    text-align: center;
    cursor: pointer;
    color: $second_txt;
  }
}
</style>
