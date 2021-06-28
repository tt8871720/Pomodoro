<template>
  <div class="task">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="task__txt">Todo List</div>
        </div>
        <div class="col-12 col-md-6">
          <div class="task__status mb-4">
            <div
              class="nav__title task__status__title ml-md-auto"
              :class="{ 'status-clicked': isTodo }"
              @click="isTodo = true"
            >
              ToDo
            </div>
            <div
              class="nav__title task__status__title"
              :class="{ 'status-clicked': !isTodo }"
              @click="isTodo = false"
            >
              Done
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <div class="task__list">
            <!-- 有task -->
            <div class="task__list__pages" v-show="todoList.length">
              <div class="task__list__pages__detailed">
                <!-- todoList -->
                <vuedraggable class="wrapper"  v-model="todoList" v-show="isTodo">
                  <!-- <transition-group> -->
                  <div class="task__list__pages__detailed-wrapper" v-for="(task, index) in todoList" :key="task.id" v-if="!task.done">
                    <div class="task__list__pages__detailed__item">
                      <div
                        class="task__list__pages__detailed__item__name"
                        @click="doneTask(index)"
                      >
                        <div class="btn-radio" v-show="!task.done"></div>
                        <div :name="index">{{ task.name }}</div>
                      </div>
                      <div class="task__list__pages__detailed__item__func">
                        <!-- 刪除 -->
                        <div
                          class="task__list__pages__detailed__item__func__icon"
                        >
                          <font-awesome-icon
                            icon="trash-alt"
                            @click="deleteTask(todoList, index)"
                          />
                        </div>
                        <!-- 拖曳 -->
                        <div
                          class="task__list__pages__detailed__item__func__icon"
                        >
                          <font-awesome-icon icon="bars" />
                        </div>
                        <!-- 計時 -->
                        <div
                          class="task__list__pages__detailed__item__func__icon"
                        >
                          <router-link
                            to="pomo"
                            @click.native="chooseTask(index, task.frequency)"
                          >
                            <font-awesome-icon icon="sign-out-alt" />
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div class="task__list__pages__detailed__freq" :class="{ 'freqin-todo': isTodo }">
                      <div class="freq-icon" v-for="(freq, index) in task.frequency" :key="index"></div>
                    </div>
                  </div>
                  <!-- </transition-group> -->
                </vuedraggable>
                <!-- doneList -->
                <div class="task__list__pages__detailed-wrapper" v-for="(task, index) in doneList" :key="task.id" v-show="!isTodo">
                  <div class="task__list__pages__detailed__item">
                    <div class="task__list__pages__detailed__item__name" @click="doneTask(index)">
                      <div class="btn-radio" v-show="!task.done"></div>
                      <div :name="index">{{ task.name }}</div>
                    </div>
                    <div class="task__list__pages__detailed__item__date">
                      {{ task.id.substr(0, 9).replace(/\//gi,"-") }}
                    </div>
                  </div>
                  <div class="task__list__pages__detailed__freq">
                    <div class="freq-icon" v-for="(freq, index) in task.frequency" :key="index"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 沒task -->
            <div class="task__list__none" v-show="!todoList.length">
              <div class="task__list__none__txt">Let’s start something fun</div>
              <img src="@img/fun.svg" alt="fun.svg" />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-12 mt-4 mt-lg-0">
          <div class="task__add">
            <div class="task__add__input">
              <input type="text" placeholder="Task" v-model="taskInput" />
            </div>
            <div class="task__add__btn">
              <button class="addtask-btn" @click="addTask(todoList, taskInput)">
                Add Task
              </button>
              <button class="addtask-btn cleartask-btn" @click="clearTask">Clear all Tasks</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vuedraggable from "vuedraggable";
import { mapActions, mapState } from "vuex";

export default {
  name: "Task",
  components: { vuedraggable },
  data() {
    return {
      taskInput: "",
      isTodo: true,
      todoList: JSON.parse(localStorage.getItem("todoList"))
        ? JSON.parse(localStorage.getItem("todoList"))
        : [],
      all: []
    };
  },
  updated() {
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
    localStorage.setItem("doneList", JSON.stringify(this.doneList));
  },
  created() {},
  watch: {
    // isTodo: "assignStatus"
  },
  methods: {
    addTask(arr, item) {
      if (item != "") {
        var nowTime = new Date().toLocaleString();
        var task = {};
        task.id = nowTime;
        task.name = item;
        task.done = false;
        task.frequency = 0;
        console.log("item", task);
        arr.push(task);
        // arr.push({ id: nowTime, name: item, done: false, frequency: 0 });
        localStorage.setItem("todoList", JSON.stringify(arr));
        this.taskInput = "";
      } else {
        alert("不可輸入空值");
      }
    },
    swapTask(arr, nowIndex, direction) {
      var targetIndex = direction == "up" ? nowIndex - 1 : nowIndex + 1;
      var temp = arr[targetIndex];
      this.$set(arr, targetIndex, arr[nowIndex]);
      this.$set(arr, nowIndex, temp);
      localStorage.setItem("todoList", JSON.stringify(arr));
      console.log(arr);
    },
    deleteTask(arr, nowIndex) {
      arr.splice(nowIndex, 1);
      localStorage.setItem("todoList", JSON.stringify(arr));
    },
    doneTask(index) {
      this.$set(this.todoList[index], "done", true);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    },
    chooseTask(index, freq) {
      // console.log("index", index);
      // console.log("frequency", freq);
      this.$store.dispatch("indexGet", index);
      this.$store.dispatch("listGet", this.todoList);
    },
    clearTask() {
      localStorage.clear();
    }
  },
  computed: {
    doneList() {
      return this.todoList.filter(t => t.done);
    }
  },
  mounted() {
    window.onbeforeunload = function(e) {
      var storage = window.localStorage;
      //   storage.setItem("beforeclose", "hi");
      // storage.clear();
      //合併todo、done
    };
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
          &__date {
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
    }
  }
}
.icon-up {
  transform: scaleY(-1);
}
.btn-radio {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid $second_txt;
  cursor: pointer;
  margin-right: 15px;
  &:hover {
    background-color: $second_txt;
  }
}
.addtask-btn {
  font-size: 20px;
  color: $main_bg;
  background-color: $second_txt;
  border-radius: 4px;
  display: block;
  margin-left: auto;
  padding: 3px 35px;
}
.cleartask-btn {
  background-color: #d02210;
  margin-top: 40px;
}
@include lg-media() {
  .task__list__pages__detailed__item__func__icon {
    margin-left: 20px;
  }
}
</style>
