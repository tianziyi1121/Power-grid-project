<template>
  <div class="bd">
    <ul class="top">
      <li class="one">
        <span>供应商编号</span>：
        <Input v-model="number" placeholder clearable style="width: 262px" />
      </li>
      <li>
        <span>供应商名称</span>：
        <Input v-model="name" placeholder clearable style="width: 439.9px" />
      </li>
      <li class="time">
        <span>约谈时间</span>：
            <!-- <DatePicker
              type="date"
              placeholder=""
              v-model="tiem"
              style="width: 226.4px"
              format="yyyy-MM-dd"
            ></DatePicker> -->
             <Date-picker type="date" placeholder="选择日期" style="width: 226.4px"></Date-picker>
      </li>
      <li>
        <span>公司参会人员</span>：
        <Input v-model="name" placeholder clearable style="width: 302.1px" />
      </li>
      <li>
        <span>供应商参会人员</span>：
        <Input v-model="name" placeholder clearable style="width: 968.5px" />
      </li>
      <li>
        <span>问题描述</span>：
        <i-input type="textarea" placeholder :rows="4" style="width: 968.5px"></i-input>
      </li>
      <li>
        <span>原因分析</span>：
        <i-input type="textarea" placeholder :rows="4" style="width: 968.5px"></i-input>
      </li>
      <li>
        <span>处理情况</span>：
        <i-input type="textarea" placeholder :rows="4" style="width: 968.5px"></i-input>
      </li>
      <li>
        <span>约谈双方意见</span>：
        <i-input type="textarea" placeholder :rows="4" style="width: 968.5px"></i-input>
      </li>
    </ul>
    <!-- 底部按钮 -->
    <div class="foooter_button">
      <span class="succeed">
        <button :class='succeed?"ma" :"m"' @click="up">添加约谈记录</button>
      </span>
      <span>
        <button :class='cancel?"ma" :"m"' @click="no">取消</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      succeed: false,
      cancel: false,
      number:'',
      name:'',
      tiem:''
    };
  },
  methods: {
    up() {
      this.succeed = true;
      console.log(this.number)
      console.log(this.time)
      console.log(this.name)
    },
    no() {
      this.cancel = true;
    }
  }
};
</script>
<style>
.bd {
  width: 1661px;
  background: #ffffff;
}
.top {
  list-style: none;
  padding: 0px 25px;
}
.top li {
  margin-top: 28px;
}
.one {
  padding-top: 18px;
}
.tiem {
  display: flex;
}
.top li span {
  width: 137px;
  display: inline-block;
  text-align: right;
  font-size: 18px;
  color: #000000;
}
/*  */
.foooter_button {
  width: 1181px;
  text-align: center;
  margin-top: 46px;
  padding-bottom: 18.7px;
}

.succeed {
  margin-right: 20px;
}
.m {
  width: 146px;
  height: 53px;
  border: none;
  color: white;
  background: #575757;
  border-radius: 5px;
  outline: none;
}
.ma {
  width: 146px;
  height: 53px;
  border: none;
  color: white;
  border-radius: 5px;
  background: #549b9b;
  outline: none;
}
</style>