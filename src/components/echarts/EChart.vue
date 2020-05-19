<!--echart组件封装，如需有对组件进行修改，请通知所有前端开发人员-->
<template>
  <div v-if="chartData.bLoading" key="loading" class="flex-c flex-justify-center flex-align-center f-w f-h">
      <icon name="circle-o-notch" class="icon" spin scale="1.5" style="color:#aaa;"></icon>
  </div>
  <div v-else :id="chartData.id" class="chart-box" :key="chartData.id"></div>
</template>
<script>
import 'vue-awesome/icons/circle-o-notch'
import echarts from 'echarts'
export default {
  name: 'EChart',
  data () {
    return {
      echart: '',
      timeout: ''
    }
  },
  props: {
    chartData: Object
  },
  mounted () {
    if (!this.chartData.bLoading) {
      this.$nextTick(() => {
        this.handleIntOption()
      })
    }
  },
  watch: {
    chartData: {
      handler: function (v) {
        if (!v.bLoading) {
          this.$nextTick(() => {
            this.handleIntOption()
          })
        }
      },
      deep: true
    }
  },
  methods: {
    closeLegend (data) {
      data.forEach((item) => {
        this.echart.dispatchAction({
          type: 'legendUnSelect',
          // 图例名称
          name: item
        })
      })
    },
    openLegend (data) {
      data.forEach((item) => {
        this.echart.dispatchAction({
          type: 'legendSelect',
          // 图例名称
          name: item
        })
      })
    },
    /**
     * 重绘
     */
    handleResize () {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.echart.resize()
      }, 1000)
    },
    /**
     * 初始化
     */
    handleIntOption () {
      let c = echarts.init(document.getElementById(this.chartData.id))
      c.clear()
      c.setOption(this.chartData.option)
      c.on('click', this.chartData.onClick)
      c.on('legendselectchanged', this.chartData.onLegendselectchanged)
      this.echart = c
      window.addEventListener('resize', this.handleResize, { passive: false })
    }
  },
  destoryed () {
    window.removeEventListener('resize', this.handleResize)
    this.echart.dispose()
  }
}
</script>

<style scoped lang="less">
.chart-box {
    width: 100%;
    height: 100%;
}
</style>
