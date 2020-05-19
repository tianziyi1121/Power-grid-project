<template>
    <div class="tag-box">
        <div :class="['btn-menu',widthNums === 270 ? '':'toright' ]" @click="clickMenu"></div>
        <div class="history-list">
          <div v-for="item in historyLists" :key="item.id" class="item bkshadow active">
            {{item.name}}
          </div>
          <!-- <div class="item bkshadow">
            重点工程（单体）情况分析
          </div>
          <div class="item bkshadow">
            重点工程供应计划
          </div>
          <div class="item bkshadow">
            排产计划
          </div> -->
        </div>
        <div class="personIcon" v-if="personState">
            <!-- <span class="blue-col">admin</span>
            <span class="ml8 mr8">欢迎您</span>
            <Icon class="blue-col" type="md-settings" />
            <Icon class="blue-col icon-sy" type="md-arrow-dropleft" />
            <ul class="mess-list">
                <li class="cursor" @click="makeImportantInfo">重要通知配置</li>
            </ul> -->
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'menuTag',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  watch: {},
  mounted () { },
  computed: {
    ...mapGetters(['widthNums', 'personState', 'historyLists'])
  },
  methods: {
    clickMenu () {
      let passwidth = this.widthNums === 270 ? 0 : 270
      this.$store.commit('changeSileWidth', passwidth)
    },
    makePersonInfo () {
      this.$store.commit('showPersonInfo', true)
    },
    makeSafeManagement () {
      this.$store.commit('showSafeManagement', true)
    },
    makeImportantInfo () {
      this.$store.commit('showImportantInfo', true)
    }
  }
}
</script>
<style lang="less" scoped>
.tag-box {
    margin:4px 8px;
    display: flex;
    overflow: hidden;
}
.btn-menu {
    height: 33px;
    width: 32px;
    background-image: url('../../../assets/images/btn-menu.png');
    background-size: 100% 100%;
    float: left;
    z-index: 99;
}
.toright {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
}
.personIcon {
    font-size: 16px;
    float: right;
    padding-right: 24px;
    padding-top: 10px;
    position: relative;
    .icon-sy {
        font-size: 24px;
        transform: rotate(-90deg);
    }
    .mess-list {
        list-style: none;
        border: 1px solid #eee;
        border-radius: 3px;
        position: absolute;
        right: 16px;
        display: none;
        z-index: 100;
        li {
            padding: 8px 16px;
            font-size: 14px;
            &:hover {
            }
        }
    }
    &:hover .mess-list {
        display: block;
    }
}
.history-list{
  display: flex;
  .item{
    height:33px;
    line-height: 33px;
    border-radius: 6px;
    background: #fff;
    padding:0 10px;
    margin-left:16px;
    color:#999
  }
  .item.active{
    color:#666666;
    font-weight: bold;
  }
  .item:after{
    content:'';
    width:19px;
    height:33px;
    background: url('../../../assets/images/btn-close-tag.png') no-repeat center 40%;
    background-size:100% auto;
    display: block;
    margin-left:8px;
    float:right;
  }
}
</style>
