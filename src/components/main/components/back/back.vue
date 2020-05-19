<template>
  <div class="full-screen-btn-con">
    <Tooltip :content="'返回'" placement="bottom">
      <i  @click="handleChange" class="back-btn"></i>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'Fullscreen',
  computed: {
  },
  props: {
  },
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    },
    handleChange () {
      this.handleGoBack()
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
.full-screen-btn-con .ivu-tooltip-rel{
  height: 64px;
  line-height: 64px;
  i{
    cursor: pointer;
  }
}
.back-btn{
  display:inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background:url('../../../../assets/images/common/back.png') no-repeat center center;
  background-size:100% 100%;
  margin-left:16px;
}
</style>
