<template>
  <div class="analytics">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="task__txt">Analytics</div>
        </div>
        <div class="col-12 col-md-6">
          <div class="task__status mb-4">
            <div class="nav__title task__status__title ml-md-auto" :class="{ 'status-clicked': isToday }" @click="isToday=true">Today</div>
            <div class="nav__title task__status__title" :class="{ 'status-clicked': !isToday }" @click="isToday=false">Weekly</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="analytics__statistics">
            <div class="analytics__statistics__date">
              <!-- <date-picker v-model="todayTimeStamps" :clearable="false"></date-picker> -->
              <date-picker v-if="isToday" v-model="todayTimeStamps" valueType="timestamp" :clearable = "false"></date-picker>
              <date-picker v-if="!isToday" v-model="weekTimeStamps" valueType="timestamp" :clearable = "false" range></date-picker>
            </div>
            <div class="analytics__statistics__info">Pomodoros : {{pomodoros}}</div>
            <div class="analytics__statistics__info">Tasks : {{tasks}}</div>
            <div class="analytics__statistics__info">Completed : {{completed}}</div>
            <div class="analytics__statistics__info">Focus time : {{focusTime}}</div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="analytics__task">
            <div class="analytics__task__empty" v-if="!analyticsList.length">Oops no task here!</div>
            <div class="task__list__pages__detailed-wrapper" v-for="(task, index) in analyticsList" :key="task.id" v-if="isToday">
              <div class="task__list__pages__detailed__item">
                <div class="task__list__pages__detailed__item__name" @click="doneTask(index)">
                  <div :name="index">{{ task.name }}</div>
                  <div class="task__list__pages__detailed__item__name__icon" v-if="task.done">
                    <font-awesome-icon :icon="['far', 'check-circle']" />
                   </div>
                </div>
                <div class="task__list__pages__detailed__item__time">
                  {{task.frequency * 25}}mins
                  <!-- {{ (task.id.substr(0, 9)).replace(/\//gi,"-") }} -->
                </div>
              </div>
              <div class="task__list__pages__detailed__freq">
                <div class="freq-icon" v-for="(freq, index) in task.frequency" :key="index"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
let moment = require("moment");

export default {
  components: { DatePicker },
  name: "analytics",
  data() {
    return {
      todoList: JSON.parse(localStorage.getItem("todoList"))
        ? JSON.parse(localStorage.getItem("todoList"))
        : [],
      isToday: true,
      todayTimeStamps: new Date().getTime(),
      weekTimeStamps: [moment().subtract(7, 'days').valueOf(), moment().valueOf()]
    };
  },
  computed: {
    weekDate() {
      var weekArr = this.weekTimeStamps.map(function(timestamps) {
        return moment(timestamps).format("YYYY-MM-DD");
      });
      return weekArr;
    },
    analyticsList() {
      if (this.isToday) {
        var pickedDate = moment(this.todayTimeStamps).format("YYYY-M-D").replace(/-/gi,"/");
        return this.todoList.filter(t => t.id.substr(0, 9) == pickedDate);
      } else {
        var weekList = this.todoList.map(function(list){
          // var listId = list.id.substr(0, 9)
          // var inWeek = moment('2018-11-02').isBetween(this.weekDate[0], this.weekDate[1]); 
          // console.log('inWeek',inWeek)
          // console.log('list',list.id)
        })
        return this.todoList.filter(t => t.id.substr(0, 9) == pickedDate);
      }
    },
    pomodoros() {
      var count = 0;
      this.analyticsList.forEach(element => {
        count = count + element.frequency;
      });
      return count;
    },
    tasks() {
      return this.analyticsList.length;
    },
    focusTime() {
      var total = 25 * this.pomodoros;
      var hour = Math.floor(total / 60);
      var min = total % 60;
      if (total > 60) {
        return hour + "h" + min + "m";
      } else {
        return min + "m";
      }
    },
    completed() {
      return this.analyticsList.filter(a => a.done).length;
    }
  },
  updated() {
    console.log("weekTimeStamps", this.weekTimeStamps);
    // console.log("2021/6/28", moment('2021/6/23 上午10:52:28').valueOf().format("YYYY-MM-DD"));
    // console.log("analyticsList", this.analyticsList);
    console.log("weekDate", this.weekDate);
  }
};
</script>
<style lang="scss" scoped>
.task {
  &__txt {
    color: $second_txt;
    font-size: 40px;
    text-align: left;
    margin-bottom: 40px;
  }
  &__status {
    display: flex;
    &__title {
      padding-bottom: 8px;
      cursor: pointer;
    }
  }
  &__list {
    &__pages {
      &__detailed {
        &-wrapper {
          &:not(:last-child) {
            padding-bottom: 13px;
            border-bottom: $mute solid 1px;
            align-items: center;
          }
        }
        &__item {
          display: flex;
          padding-top: 20px;

          &__name {
            font-size: 20px;
            color: $second_txt;
            margin-right: auto;
            display: flex;
            align-items: center;
            cursor: pointer;
            &__icon {
              color: $mute;
              margin-left: 10px;
            }
          }
          &__func {
            display: flex;
            align-items: center;
            &__icon {
              width: 15px;
              margin-left: 10px;
              color: $second_txt;
              cursor: pointer;
            }
          }
          &__time {
            font-size: 20px;
            color: $second_txt;
            font-weight: initial;
          }
        }
        &__freq {
          display: flex;
          .freq-icon {
            width: 10px;
            height: 10px;
            border-radius: 5px;
            background-color: $secondart-dark;
            & + .freq-icon {
              margin-left: 5px;
            }
          }
        }
        .freqin-todo {
          padding-left: 35px;
        }
      }
    }
    &__none {
      &__txt {
        font-size: 28px;
        color: $mute;
        margin-bottom: 60px;
      }
    }
  }
  &__add {
    &__input {
      margin-bottom: 40px;
      input {
        width: 100%;
        background-color: transparent;
        border: 1px solid #caceac;
        border-radius: 4px;
        font-size: 20px;
        color: $second_txt;
        padding: 9px 15px;
      }
    }
    &__btn {
      .addtask-btn {
        font-size: 20px;
        color: $main_bg;
        background-color: $second_txt;
        border-radius: 4px;
        display: block;
        margin-left: auto;
        padding: 3px 35px;
      }
    }
  }
}
.analytics {
  &__statistics {
    font-size: 20px;
    color: $second_txt;
    &__date {
      border-bottom: 4px solid $second_txt;
      padding-bottom: 12px;
      margin-bottom: 30px;
    }
    &__info {
      text-align: left;
      & + .analytics__statistics__info {
        margin-top: 20px;
      }
    }
  }
  &__task {
    &__empty {
      font-size: 24px;
      color: $mute;
    }
  }
}
</style>
