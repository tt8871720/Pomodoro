<template>
  <div class="break">
    <div class="nav">
      <router-link to="pomo" class="nav__title">Pomodoro</router-link>
      <router-link to="break" class="nav__title status-clicked"
        >Short Break</router-link
      >
    </div>
    <div>
      <div class="infos" v-show="!isEnd">
        <div class="info__up d-flex">
          <div class="info__up__time d-flex">
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
          <div class="info__up__task d-flex">Time to Take a break</div>
        </div>
        <div class="info__down d-flex">
          <div class="info__down__status d-flex">
            <div class="mx-auto d-flex">
              <div class="info__down__status__start d-flex">
                <div class="d-flex mr-5" @click="isStart = !isStart">
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
      <div class="restart" v-show="isEnd">
        <div class="restart__txt">Ready to work?</div>
        <div class="restart__img">
          <router-link to="pomo" class="d-inline-block">
            <div class="restart__img__circle">
              <div class="restart__img__triangle"></div>
            </div>
          </router-link>
        </div>
        <div class="restart__task">
          <div>{{ nowTaskName }}</div>
        </div>
      </div>
      <div class="other" v-show="isEnd">
        <div class="other__txt">or</div>
        <div class="other__links">
          <router-link to="task" class="other__links__item"
            >Check Todo list</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "@choujiaojiao/vue2-countdown";
import { mapState } from "vuex";

export default {
  name: "Break",
  components: {
    Countdown
  },
  data() {
    return {
      isStart: false,
      isReset: false,
      isEnd: false,
      countDownTime: 5
    };
  },
  methods: {
    timeattrReset() {
      this.isStart = false;
      this.isReset = false;
      this.countDownTime = this.countDownTime;
    },
    onCountdownEnd() {
      this.isEnd = true;
    },
    timereset() {
      this.$refs.countdown.reCountdown();
      this.isEnd = false;
      this.timeattrReset();
    }
  },
  computed: {
    ...mapState(["taskIndex", "allLsit"]),
    nowTaskName() {
      return this.allLsit[this.taskIndex]
        ? this.allLsit[this.taskIndex].name
        : "Unknow Task";
    }
  }
};
</script>

<style lang="scss" scoped>
.pomoclicked {
  color: $second_txt;
  border-bottom: 3px solid;
  padding-bottom: 8px;
}
.info {
  &__up {
    justify-content: space-around;
    align-items: center;
    color: $second_txt;
    margin-bottom: 20px;
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
    justify-content: space-around;
    align-items: center;
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
  color: $second_txt;
  &__txt {
    font-size: 20px;
    font-style: italic;
    margin-bottom: 40px;
  }
  &__img {
    &__circle {
      width: 100px;
      height: 100px;
      background-color: $second_txt;
      border-radius: 999em;
      position: relative;
    }
    &__triangle {
      border-color: transparent transparent transparent $main_bg;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 25px 0 25px 50px;
      border-radius: 8px;
      position: absolute;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-35%, -50%);
    }
  }
  &__task {
    margin-top: 25px;
    font-size: 32px;
  }
}
.other {
  font-size: 20px;
  color: $secondart-dark;
  padding-top: 40px;
  &__txt {
  }
  &__links {
    display: flex;
    justify-content: center;
    &__item {
      font-size: 20px;
      color: $secondart-dark;
    }
  }
  .other__links__item + .other__links__item {
    margin-left: 15px;
  }
}
</style>
