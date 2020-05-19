<template>
    
</template>
<script>
export default {
  name: 'Navigation',
  components: {},
  data () {
    return {
      activeName: '',
      nameMap: {
        home: 'home', // 首页
        digital_logisticst: 'digital_logisticst/transition/page', // 数字物流
        smart_sourcing: 'smart_sourcing/transition/page', // 智能采购
        panoramic_control: 'panoramic_control/transition/page', // 全景质控
        supply_chain: 'supply_chain/transition/page', // 供应链协同
        operation_supervision: 'operation_supervision/transition/page', // 运营监督
        auxiliary_function: 'auxiliary_function/transition/page' // 辅助功能
      }
    }
  },
  props: {
    collapsed: Boolean
  },
  created: function () {
    this.activeName = this.nameMap[this.$route.path.substr(1).split('/')[0]]
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="less">
.navigation{
  &.ivu-menu-primary{
    background: none;
    .ivu-menu-item-selected{
      // background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAuCAMAAAAlZnaHAAAAXVBMVEV/3/+J5v+J5v+K5P+J5v+K6P+L4v9HcEwy3v+K6f+H5f9/1P+O3/9/5f+M6P+K6P9Z4/8t3/803f+L6f+L6f8A4f+L6f8A4P+L5/+L6P8A4P+K5/8A4P8A4P8A4P9xeHnOAAAAHnRSTlMIKR8wPFQaAKZeEwwPCm9EjE5iSHYSZmI1WPkhQn9qsFc2AAAA9UlEQVR42u3Yy3LDIAxAUTAPF0wgrjCGkPj/P7MlnekY7wWLcGF/tpLI8e41N2o//iLHPm/bRlq5pGDr4+0279nR3af27rauZO5Tcdevpn3/u3fvbVD4Beu9v5/dkASAQw4gKVu5NgGPDLvInQiVq4CznCfkMo0u2bObHMtSYycnyiGcXcGp1GZBzsgcQV1dcyPILTqz4Q53uMMd7nCHO9wO7nJDzujrfJV4mScNclrSCKGenyPNErspMy7s2Q3CRUaxY5GDqlwfBDiOHojLfuR9UEmIVB7iLwth7f5m8StMcbvu3X0ie+5yV/mw+1W3O2Gvu+gPcV2A5CxEcpQAAAAASUVORK5CYII=') no-repeat center center;
      // background-size: 100% 80%;
      a{
        color:#fff!important;
        font-weight: bold;
      }
    }
    .ivu-menu-item{
      font-size:18px;
      height:64px;
      line-height: 64px;
      a{
        color:#ccc
      }
    }
  }
  .ivu-menu-item{
    img{
      display: none;
    }
  }
  .ivu-menu-item-selected{
    img{
      width:17px;
      height:17px;
      display: inline-block;
      vertical-align: middle;
      margin-right:5px;
      vertical-align: -3px;
    }
  }
}
</style>
