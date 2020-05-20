<template>
  <div>
    <!-- 图片尺寸需要16*24 -->
    <Menu
      ref="side_menu"
      :active-name="path"
      :open-names="openedNames"
      :width="widthNums"
      @on-select="handleSelect($event)"
    >
      <!-- 供应商管理 -->
      <Submenu name="digital_logisticst/szwl_supplier">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/htgl.png" />
          <span class="menuUnderline">供应商管理</span>
        </template>
        <MenuItem name="digital_logisticst/szwl_supplier/sup/bui/stock">
          <span class="itemSpan">供应商管理</span>
        </MenuItem>
        <!-- <Submenu name="digital_logisticst/szwl_supplier/sup"> -->
        <!-- <template slot="title">
            <span class="menuUnderline">供应商管理</span>
          </template> -->
        <!-- <Submenu name="digital_logisticst/szwl_supplier/sup/bui">
            <template slot="title">
              <span class="menuUnderline">基本信息详情页</span>
            </template>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/bui/stock">
              <span class="itemSpan">股权穿透图</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/bui/full">
              <span class="itemSpan">实际控制人</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/bui/concern">
              <span class="itemSpan">企业关系关联图谱</span>
            </MenuItem>
          </Submenu>
          <MenuItem name="digital_logisticst/szwl_supplier/sup/apt">
            <span class="itemSpan">资质信息详情页</span>
          </MenuItem> -->
        <!-- 社会信用管理 -->
        <!-- <Submenu name="digital_logisticst/szwl_supplier/sup/society">
            <template slot="title">
              <span class="menuUnderline">社会信用信息</span>
            </template>
            <MenuItem
              name="digital_logisticst/szwl_supplier/sup/society/judicial"
            >
              <span class="itemSpan">司法风险</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/society/run">
              <span class="itemSpan">经营风险</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/society/risk">
              <span class="itemSpan">股权风险</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/society/move">
              <span class="itemSpan">动产抵押</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/society/fine">
              <span class="itemSpan">行政处罚</span>
            </MenuItem>
            <MenuItem name="digital_logisticst/szwl_supplier/sup/society/badly">
              <span class="itemSpan">严重违法失信</span>
            </MenuItem>
          </Submenu>
          <MenuItem name="digital_logisticst/szwl_supplier/sup/bad">
            <span class="itemSpan">供应商内部不良信息</span>
          </MenuItem> -->
        <!-- </Submenu> -->
      </Submenu>
      <!-- 风险预警管理 -->
      <Submenu name="digital_logisticst/szwl_venture">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/jsgl.png" />
          <span class="menuUnderline">风险预警管理</span>
        </template>
        <MenuItem name="digital_logisticst/szwl_venture/bd">
          <span class="itemSpan">不良行为预警</span>
        </MenuItem>

        <Submenu name="digital_logisticst/szwl_settlement/fpgl">
          <template slot="title">
            <span class="menuUnderline">发票管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_settlement/fpgl/jpyj">
            <span class="itemSpan">交票预警</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_settlement/fpgl/fpgljfx">
            <span class="itemSpan">发票管理统计分析</span>
          </MenuItem>
        </Submenu>
        <Submenu name="digital_logisticst/szwl_settlement/fkgl">
          <template slot="title">
            <span class="menuUnderline">付款管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_settlement/fkgl/zdgc">
            <span class="itemSpan">重点工程结算管理</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_settlement/fkgl/zb">
            <span class="itemSpan"
              >到货款、投运款、质保款预警、僵尸合同指标</span
            >
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_settlement/fkgl/zjsy">
            <span class="itemSpan">资金使用情况综合分析</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_settlement/fkgl/htfkzh">
            <span class="itemSpan">合同付款综合报表</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_settlement/fkgl/htjszj">
            <span class="itemSpan">合同结算资金预测</span>
          </MenuItem>
        </Submenu>
      </Submenu>
      <!-- 协议库存管理 -->
      <Submenu name="digital_logisticst/szwl_xykcgl">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/xykcgl.png" />
          <span class="menuUnderline">协议库存管理</span>
        </template>
        <Submenu name="digital_logisticst/szwl_xykcgl/xypp">
          <template slot="title">
            <span class="menuUnderline">协议库存匹配</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_xykcgl/xypp/wzxy">
            <span class="itemSpan">物资协议库存中标结果情况统计</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_xykcgl/xypp/xykc">
            <span class="itemSpan">协议库存匹配</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_xykcgl/xypp/wzxqpp">
            <span class="itemSpan">物资需求匹配情况统计表</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_xykcgl/xypp/phlk">
            <span class="itemSpan">平衡利库</span>
          </MenuItem>
        </Submenu>
        <Submenu name="digital_logisticst/szwl_xykcgl/xykczx">
          <template slot="title">
            <span class="menuUnderline">协议库存执行情况</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_xykcgl/xykczx/xykczxyj">
            <span class="itemSpan">协议库存执行情况预警</span>
          </MenuItem>
        </Submenu>
      </Submenu>
      <!-- 履约管理 -->
      <Submenu name="digital_logisticst/szwl_wzlvql">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/ccgl.png" />
          <span class="menuUnderline">履约管理</span>
        </template>
        <MenuItem name="digital_logisticst/szwl_wzlvql/qxt">
          <span class="itemSpan">重点工程物资保障全息图</span>
        </MenuItem>

        <Submenu name="digital_logisticst/szwl_wzlvql/wzlyqlfx">
          <template slot="title">
            <span class="menuUnderline">物资履约全量分析</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_wzlvql/wzlyqlfx/qlwztz">
            <span class="itemSpan">全量物资台账</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/wzlyqlfx/qlwdhtz">
            <span class="itemSpan">全量未到货台账</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/wzlyqlfx/lyyj">
            <span class="itemSpan">履约预警</span>
          </MenuItem>
        </Submenu>

        <Submenu name="digital_logisticst/szwl_wzlvql/lyhj">
          <template slot="title">
            <span class="menuUnderline">履约环节</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/gyjh">
            <span class="itemSpan">供应计划</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/tzjf">
            <span class="itemSpan">图纸交付</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/scbl">
            <span class="itemSpan">生产备料</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/pcjh">
            <span class="itemSpan">排产计划</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/sczx">
            <span class="itemSpan">生产执行</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/fhtz">
            <span class="itemSpan">发货通知</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_wzlvql/lyhj/dhys">
            <span class="itemSpan">到货验收</span>
          </MenuItem>
        </Submenu>

        <Submenu name="digital_logisticst/szwl_xykcgl/zggclyywfx">
          <template slot="title">
            <span class="menuUnderline">直管工程履约业务分析</span>
          </template>
          <MenuItem name="">
            <span class="itemSpan">物资供应保障任务</span>
          </MenuItem>
          <MenuItem name="">
            <span class="itemSpan">物资供应保障计划</span>
          </MenuItem>
          <MenuItem name="">
            <span class="itemSpan">物资供应保障分析</span>
          </MenuItem>
        </Submenu>

        <MenuItem name="digital_logisticst/szwl_xykcgl/fzggclyywfx">
          <span class="menuUnderline">非直管工程履约业务分析</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_xykcgl/lywt">
          <span class="menuUnderline">履约问题</span>
        </MenuItem>
      </Submenu>
      <!-- 仓储管理 -->
      <Submenu name="digital_logisticst/szwl_ccgl">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/ccgl.png" />
          <span class="menuUnderline">仓储管理</span>
        </template>
        <MenuItem name="digital_logisticst/szwl_ccgl/jbxx">
          <span class="itemSpan">仓库基本信息</span>
        </MenuItem>
        <MenuItem name="">
          <span class="itemSpan">仓储总体库存</span>
        </MenuItem>
        <MenuItem name="">
          <span class="itemSpan">仓储业务监控</span>
        </MenuItem>
        <MenuItem name="">
          <span class="itemSpan">指标管控预警</span>
        </MenuItem>
      </Submenu>
      <Submenu name="">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/psgl.png" />
          <span class="menuUnderline">配送管理</span>
        </template>
      </Submenu>
      <Submenu name="digital_logisticst/szwl_fjczgl">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/fjczgl.png" />
          <span class="menuUnderline">废旧处置管理</span>
        </template>
        <Submenu name="digital_logisticst/szwl_fjczgl/bfgl">
          <template slot="title">
            <span class="menuUnderline">报废管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_fjczgl/bfgl/ccxmbfspyj">
            <span class="itemSpan">拆除项目报废审批预警</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_fjczgl/bfgl/sbtynxjfb">
            <span class="itemSpan">设备退役年限及分布</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_fjczgl/bfgl/sbbfgzbb">
            <span class="itemSpan">设备报废跟踪报表</span>
          </MenuItem>
        </Submenu>
        <Submenu name="digital_logisticst/szwl_fjczgl/czgl">
          <template slot="title">
            <span class="menuUnderline">处置管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_fjczgl/czgl/xgyj">
            <span class="itemSpan">处置管理相关预警</span>
          </MenuItem>
          <MenuItem name="">
            <span class="itemSpan">废旧物资处置综合分析</span>
          </MenuItem>
          <MenuItem name="">
            <span class="itemSpan">废旧物资处置跟踪报表</span>
          </MenuItem>
          <MenuItem name="">
            <span class="itemSpan">废旧处置综合报告</span>
          </MenuItem>
        </Submenu>
      </Submenu>
      <Submenu name="digital_logisticst/szwl_yjbz">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/yjbz.png" />
          <span class="menuUnderline">应急保障</span>
        </template>
        <MenuItem name="digital_logisticst/szwl_yjbz/yjqxt">
          <span class="itemSpan">应急全息图</span>
        </MenuItem>
        <Submenu name="digital_logisticst/szwl_yjbz/yjyagl">
          <template slot="title">
            <span class="menuUnderline">应急预案管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_yjbz/yjyagl/yaglym">
            <span class="itemSpan">应急预案管理</span>
          </MenuItem>
        </Submenu>
        <Submenu name="digital_logisticst/szwl_yjbz/yjxxgl">
          <template slot="title">
            <span class="menuUnderline">预警信息管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_yjbz/yjxxgl/yjxxwh">
            <span class="itemSpan">预警信息维护</span>
          </MenuItem>
        </Submenu>
        <Submenu name="digital_logisticst/szwl_yjbz/yjwzgl">
          <template slot="title">
            <span class="menuUnderline">应急物资管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_yjbz/yjwzgl/bzsyjwzcx">
            <span class="itemSpan">班组所应急物资查询</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_yjbz/yjwzgl/yjwzwh">
            <span class="itemSpan">应急物资维护</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_yjbz/yjwzgl/yjwztcgl">
            <span class="itemSpan">应急物资图册管理</span>
          </MenuItem>
        </Submenu>
        <MenuItem name="digital_logisticst/szwl_yjbz/wzrcwb">
          <span class="itemSpan">物资日常维保</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/ckztgl">
          <span class="itemSpan">仓库状态管理</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/yjylgl">
          <span class="itemSpan">应急演练管理</span>
        </MenuItem>
        <Submenu name="digital_logisticst/szwl_yjbz/zbgl">
          <template slot="title">
            <span class="menuUnderline">值班管理</span>
          </template>
          <MenuItem name="digital_logisticst/szwl_yjbz/zbgl/yjzbgl">
            <span class="itemSpan">应急值班管理</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_yjbz/zbgl/zbqd">
            <span class="itemSpan">应急值班签到</span>
          </MenuItem>
          <MenuItem name="digital_logisticst/szwl_yjbz/zbgl/zbrytxl">
            <span class="itemSpan">应急值班人员通讯录</span>
          </MenuItem>
        </Submenu>
        <MenuItem name="digital_logisticst/szwl_yjbz/yjsjgl">
          <span class="itemSpan">应急事件管理</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/yjxqtb">
          <span class="itemSpan">应急需求提报</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/yjxqsp">
          <span class="itemSpan">应急需求审批</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/wzgygz">
          <span class="itemSpan">物资供应跟踪</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/dbxxbl">
          <span class="itemSpan">调拨信息补录</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/jjcgbl">
          <span class="itemSpan">紧急采购补录</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_yjbz/yjsjfx">
          <span class="itemSpan">应急事件分析</span>
        </MenuItem>
      </Submenu>
      <!-- 灰名单管理 -->
      <Submenu name="digital_logisticst/szwl_gray">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/ccgl.png" />
          <span class="menuUnderline">灰名单管理</span>
        </template>
        <MenuItem name="digital_logisticst/szwl_gray/manage">
          <span class="itemSpan">灰名单管理</span>
        </MenuItem>
        <MenuItem name="digital_logisticst/szwl_gray/look">
          <span class="itemSpan">查看灰名单</span>
        </MenuItem>
      </Submenu>
      <!-- 常见问题 -->
      <!-- <Submenu name="digital_logisticst/szwl_contract">
        <template slot="title">
          <img src="../../../assets/images/side_icon/szwl/htgl.png">
          <span class="menuUnderline">供应商管理</span>
        </template>

      </Submenu> -->
    </Menu>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: "SideMenu",
  components: {},
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    collapsed: {
      type: Boolean
    }
  },
  data() {
    return {
      widthNums: "270px",
      activeName: "",
      nameMap: {
        home: "home", // 首页
        digital_logisticst: "digital_logisticst/transition/page", // 数字物流
        smart_sourcing: "smart_sourcing/transition/page", // 智能采购
        panoramic_control: "panoramic_control/transition/page", // 全景质控
        supply_chain: "supply_chain/transition/page", // 供应链协同
        operation_supervision: "operation_supervision/transition/page", // 运营监督
        auxiliary_function: "auxiliary_function/transition/page" // 辅助功能
      }
    };
  },
  created: function() {
    this.activeName = this.$route.path.substr(1).split("/")[0];
  },
  methods: {
    toResourceOverall(e) {},
    handleSelect(name) {
      // 多次重复点击一个菜单，加判断
      if (!window.location.href.includes(name)) {
        // 演示用 -- start -- 后期删除
        let namearr = [
          "重点工程物资保障全息图",
          "排产计划",
          "生产执行",
          "重点工程结算管理",
          "供应计划",
          "重点工程单体情况分析"
        ];
        let patharr = [
          "digital_logisticst/szwl_wzlvql/qxt",
          "digital_logisticst/szwl_wzlvql/lyhj/pcjh",
          "digital_logisticst/szwl_wzlvql/lyhj/sczx",
          "digital_logisticst/szwl_settlement/fkgl/zdgc",
          "digital_logisticst/szwl_wzlvql/lyhj/gyjh",
          "digital_logisticst/szwl_wzlvql/overview_hologram_single"
        ];
        let list = [];
        for (let i = 0; i < patharr.length; i++) {
          if (patharr[i] === name) {
            list = [
              {
                name: namearr[patharr.indexOf(name)],
                path: name
              }
            ];
          }
        }
        this.$store.commit("changeHistoryList", list);
        // 演示用 -- end -- 后期删除

        this.$emit("on-select", name);
      }
    },
    getPath(route) {
      this.path = route.path.substr(1);
    },
    getOpenedNames(route) {
      let p = route.path.split("/");
      p.shift();
      p.pop();
      let openNames = [];
      for (let i = 0; i < p.length; i++) {
        let openNamesStr = "";
        for (let j = 0; j <= i; j++) {
          if (j == 0) {
            openNamesStr = p[j];
          } else {
            openNamesStr = openNamesStr + "/" + p[j];
          }
        }
        openNames.push(openNamesStr);
      }
      this.openedNames = openNames;
    }
  },
  computed: {
    path() {
      return this.$route.path.substr(1);
    },
    openedNames() {
      // alert('c'+this.$route.path);
      let p = this.$route.path.split("/");
      p.shift();
      let a = p.pop();
      let openNames = [];
      for (let i = 0; i < p.length; i++) {
        let openNamesStr = "";
        for (let j = 0; j <= i; j++) {
          if (j == 0) {
            openNamesStr = p[j];
          } else {
            openNamesStr = openNamesStr + "/" + p[j];
          }
        }
        openNames.push(openNamesStr);
      }
      return openNames;
    }
  },
  watch: {
    $route(to, from) {
      this.activeName = this.$route.path.substr(1).split("/")[0];
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.side_menu.updateOpened();
      this.$refs.side_menu.updateActiveName();
    });
  }
};
</script>
