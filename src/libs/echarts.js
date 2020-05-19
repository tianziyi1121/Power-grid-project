/**
 * @param {String} echarTitle 系列名称，用于tooltip的显示，legend 的图例筛选
 * @param {String} legendType 图例的类型 默认：plain
 * @param {Function} tooltipFormatter tooltip显示
 * @param {Function} seriesFormatter label展示信息
 * @param {String} labelPosition label显示的位置 默认：outside
 * @param {Array} seriesRadius series radius  饼图内外环角度
 * @param {Array} seriesCenter series center  饼图位置
 * @param {Array} seriesColor series color 饼图颜色
 * @param {Array} data
 * @param roseType // 南丁格尔图 'radius' 'area' false
 * @Description 饼图
 */

//  legend信息自定义
export const getdefLineChart = (paramObj) => {
  // echarts 坐标轴颜色
  const xColor = '#666'
  const yColor = '#666'
  let legendData = []
  let xAxisStyle = {
    // axisLabel: {
    //   fontWeight: 'bold'
    // },
    axisLine: {
      lineStyle: {
        color: xColor,
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      fontWeight: 'bold',
      padding: [0, 0, 0, 10]
    }
  }
  let yAxisStyle = {
    axisLabel: {
      fontWeight: 'bold'
    },
    axisLine: {
      lineStyle: {
        color: yColor,
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      fontWeight: 'bold',
      padding: [0, 0, 0, -20],
      align: 'left'
    }
  }

  paramObj.xAxis.forEach((item) => {
    item.axisLabel.fontWeight = 'bold'
    Object.assign(item, xAxisStyle)
  })
  paramObj.yAxis.forEach((item) => {
    item.axisLabel.fontWeight = 'bold'
    Object.assign(item, yAxisStyle)
  })

  paramObj.data.forEach((item) => {
    legendData.push(item.name)
  })
  let option = {
    title: {
      show: false
    },
    legend: {
      orient: 'horizontal',
      show: true,
      type: paramObj.legendType || 'plain',
      right: 0,
      top: 0,
      data: legendData,
      borderRadius: 0,
      textStyle: {
        color: xColor
        // fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          color: 'rgba(50, 50, 50, 0.1)',
          shadowColor: 'rgba(50, 50, 50, 0.1)'
        }
      },
      formatter: function (param) {
        return paramObj.tooltipFormatter(param)
      }
    },
    color: paramObj.color,
    grid: {
      show: false,
      left: 0,
      right: paramObj.gridRight ? paramObj.gridRight : 0,
      bottom: 0,
      top: 60,
      containLabel: true
    },
    xAxis: paramObj.xAxis,
    yAxis: paramObj.yAxis,
    series: paramObj.data
  }
  return option
}

//  legend信息自定义
export const getdefPieChartlegend = (paramObj) => {
  let legendData = []
  let allData = 0
  let total = 0
  paramObj.data.forEach((item) => {
    legendData.push(item.name)
    allData = allData + item.value
    total += Number(item.value)
  })
  let option = {
    title: {
      show: false
    },
    legend: {
      orient: 'vertical',
      show: true,
      type: paramObj.legendType || 'plain',
      right: 16,
      top: 16,
      icon: 'pin',
      data: legendData,
      textStyle: {
        rich: {
          a: {
            align: 'left',
            color: '#666666',
            padding: [0, 10, 0, 0]
          },
          b: {
            align: 'right',
            color: '#77899c',
            padding: [0, 10, 0, 0]
          },
          c: {
            align: 'right',
            color: '#666666'
          }
        }
      },
      formatter: function (name) {
        let dataSer = paramObj.data
        let _index = 0
        for (let i = 0; i < dataSer.length; i++) {
          if (dataSer[i]['name'] === name) {
            _index = i
          }
        }
        let arr = []
        // if (name == '应交人民币') {
        //   arr = [
        //     '{a|' + name + '}',
        //     '{b|￥' + _dataList[_index].value + '}'
        //   ]
        // } else {
        //   arr = [
        //     '{a|' + name + '}',
        //     '{c|￥' + _dataList[_index].value + '}'
        //   ]
        // }
        arr = [
          '{a|' + name + '}',
          '{b|￥' + dataSer[_index].value + '}',
          '{c|' + dataSer[_index].percentage + '%}'
        ]
        // console.log(_index)
        // console.log(dataSer[_index].value)
        // 注意，换行仍是使用 '\n'。
        return arr.join('')
      }
    },
    tooltip: {
      trigger: 'item',
      // formatter: (p) => {
      //   return `${p.seriesName}<br>${p.name}:${p.value} (${p.percent}%)`
      // }
      formatter: function (param) {
        return paramObj.tooltipFormatter(param)
      }
    },
    grid: {
      show: false,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      containLabel: true
    },
    series: [
      {
        name: paramObj.echarTitle,
        type: 'pie',
        color: paramObj.seriesColor,
        radius: paramObj.seriesRadius,
        center: paramObj.seriesCenter,
        avoidLabelOverlap: true, // 是否启用防止标签重叠策略
        roseType: paramObj.roseType || false, // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小 'area' || 所有扇区圆心角相同，仅通过半径展现数据大小
        label: {
          show: true,
          color: '#999999',
          fontWeight: 'bold',
          position: paramObj.labelPosition || 'outside',
          margin: '5%',
          bleedMargin: 10,
          distanceToLabelLine: 0,
          formatter: function (param) {
            return paramObj.seriesFormatter(param)
          }
          // formatter: p => {
          // if (paramObj.labelPosition === 'center') {
          //   return `${allData}万元`
          // } else {
          //   // return `${p.name}:(${p.percent}%)`
          //   return `${p.percent}%`
          // }
          // }
        },
        labelLine: {
          show: false,
          length: 5,
          length2: 8,
          lineStyle: {
            width: 1
          }
        },
        itemStyle: {
          shadowColor: 'rgba(120, 120, 120, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 10
        },
        data: paramObj.data
      }
    ]
  }
  return option
}

//  legend默认值
export const getdefPieChart = (paramObj) => {
  let legendData = []
  let allData = 0
  let total = 0
  paramObj.data.forEach((item) => {
    legendData.push(item.name)
    allData = allData + item.value
    total += Number(item.value)
  })
  let option = {
    title: {
      show: false
    },
    legend: {
      orient: 'vertical',
      show: true,
      type: paramObj.legendType || 'plain',
      right: 16,
      top: 16,
      icon: 'pin',
      data: legendData,
      textStyle: {
        color: '#666'
        // fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      // formatter: (p) => {
      //   return `${p.seriesName}<br>${p.name}:${p.value} (${p.percent}%)`
      // }
      formatter: function (param) {
        return paramObj.tooltipFormatter(param)
      }
    },
    grid: {
      show: false,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      containLabel: true
    },
    series: [
      {
        name: paramObj.echarTitle,
        type: 'pie',
        color: paramObj.seriesColor,
        radius: paramObj.seriesRadius,
        center: paramObj.seriesCenter,
        avoidLabelOverlap: true, // 是否启用防止标签重叠策略
        roseType: paramObj.roseType || false, // 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小 'area' || 所有扇区圆心角相同，仅通过半径展现数据大小
        label: {
          show: true,
          color: '#999999',
          fontWeight: 'bold',
          position: paramObj.labelPosition || 'outside',
          margin: '5%',
          bleedMargin: 10,
          distanceToLabelLine: 0,
          formatter: function (param) {
            return paramObj.seriesFormatter(param)
          }
          // formatter: p => {
          // if (paramObj.labelPosition === 'center') {
          //   return `${allData}万元`
          // } else {
          //   // return `${p.name}:(${p.percent}%)`
          //   return `${p.percent}%`
          // }
          // }
        },
        labelLine: {
          show: false,
          length: 5,
          length2: 8,
          lineStyle: {
            width: 1
          }
        },
        itemStyle: {
          shadowColor: 'rgba(120, 120, 120, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 10
        },
        data: paramObj.data
      }
    ]
  }
  return option
}

// seriesd自定义
export const getdefPieChartseries = (paramObj) => {
  let legendData = []
  let allData = 0
  let total = 0
  paramObj.data.forEach((item) => {
    legendData.push(item.name)
    allData = allData + item.value
    total += Number(item.value)
  })
  let option = {
    title: {
      show: false
    },
    legend: {
      orient: 'vertical',
      show: true,
      type: paramObj.legendType || 'plain',
      right: 16,
      top: 16,
      icon: 'pin',
      data: legendData,
      textStyle: {
        color: '#666'
        // fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      // formatter: (p) => {
      //   return `${p.seriesName}<br>${p.name}:${p.value} (${p.percent}%)`
      // }
      formatter: function (param) {
        return paramObj.tooltipFormatter(param)
      }
    },
    grid: {
      show: false,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      containLabel: true
    },
    series: paramObj.data
  }
  return option
}

/**
 * @param {String} echarTitle 系列名称，用于tooltip的显示，legend 的图例筛选
 * @param {String} legendType 图例的类型 默认：plain
 * @param {Function} tooltipFormatter tooltip显示
 * @param {Object} xAxis
 * @param {Object} yAxis
 * @param {Array} color 颜色
 * @param {String} gridRight 右边距
 * @param {Array} data
 * @Description 柱状图、折线图
 */
export const getdefMaxChart = (paramObj) => {
  // echarts 坐标轴颜色
  const xColor = '#666'
  const yColor = '#666'
  let legendData = []
  let xAxisStyle = {
    // axisLabel: {
    //   fontWeight: 'bold'
    // },
    axisLine: {
      lineStyle: {
        color: xColor,
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      fontWeight: 'bold',
      padding: [0, 0, 0, 10]
    }
  }
  let yAxisStyle = {
    axisLabel: {
      fontWeight: 'bold'
    },
    axisLine: {
      lineStyle: {
        color: yColor,
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      fontWeight: 'bold',
      padding: [0, 0, 0, -20],
      align: 'left'
    }
  }

  paramObj.xAxis.forEach((item) => {
    item.axisLabel.fontWeight = 'bold'
    Object.assign(item, xAxisStyle)
  })
  paramObj.yAxis.forEach((item) => {
    item.axisLabel.fontWeight = 'bold'
    Object.assign(item, yAxisStyle)
  })

  paramObj.data.forEach((item) => {
    legendData.push(item.name)
  })
  let option = {
    title: {
      show: false
    },
    legend: {
      orient: 'horizontal',
      show: true,
      type: paramObj.legendType || 'plain',
      right: 0,
      top: 0,
      data: legendData,
      borderRadius: 0,
      textStyle: {
        color: xColor
        // fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          color: 'rgba(50, 50, 50, 0.1)',
          shadowColor: 'rgba(50, 50, 50, 0.1)'
        }
      },
      formatter: function (param) {
        return paramObj.tooltipFormatter(param)
      }
    },
    color: paramObj.color,
    grid: {
      show: false,
      left: 0,
      right: paramObj.gridRight ? paramObj.gridRight : 0,
      bottom: 0,
      top: 60,
      containLabel: true
    },
    xAxis: paramObj.xAxis,
    yAxis: paramObj.yAxis,
    series: paramObj.data
  }
  return option
}

export const getdefMaxChartLine = (paramObj) => {
  // echarts 坐标轴颜色
  const xColor = '#666'
  const yColor = '#666'
  let legendData = []
  let xAxisStyle = {
    // axisLabel: {
    //   fontWeight: 'bold'
    // },
    axisLine: {
      lineStyle: {
        color: xColor,
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      fontWeight: 'bold',
      padding: [0, 0, 0, 10]
    }
  }
  let yAxisStyle = {
    axisLabel: {
      fontWeight: 'bold'
    },
    axisLine: {
      lineStyle: {
        color: yColor,
        width: 1
      }
    },
    axisTick: {
      show: false
    },
    nameTextStyle: {
      fontWeight: 'bold',
      padding: [0, 0, 0, -20],
      align: 'left'
    }
  }

  paramObj.xAxis.forEach((item) => {
    item.axisLabel.fontWeight = 'bold'
    Object.assign(item, xAxisStyle)
  })
  paramObj.yAxis.forEach((item) => {
    item.axisLabel.fontWeight = 'bold'
    Object.assign(item, yAxisStyle)
  })

  paramObj.data.forEach((item) => {
    legendData.push(item.name)
  })
  let option = {
    title: {
      show: false
    },
    legend: {
      orient: 'vertical',
      show: true,
      type: paramObj.legendType || 'plain',
      right: 0,
      top: 0,
      data: legendData,
      borderRadius: 0,
      textStyle: {
        color: xColor
        // fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      show: false,
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        shadowStyle: {
          color: 'rgba(50, 50, 50, 0.1)',
          shadowColor: 'rgba(50, 50, 50, 0.1)'
        }
      },
      formatter: function (param) {
        return paramObj.tooltipFormatter(param)
      }
    },
    color: paramObj.color,
    grid: {
      show: false,
      left: 0,
      right: '50%',
      bottom: 0,
      top: 20,
      containLabel: true
    },
    xAxis: paramObj.xAxis,
    yAxis: paramObj.yAxis,
    series: paramObj.data
  }
  return option
}

/**
 * @param {String} mapName 地图名称
 * @param {Array} data
 */
export const getdefMapChart = (mapName, data) => {
  let option = {
    tooltip: {
      formatter: '{b} : {c}'
    },
    visualMap: {
      show: true,
      min: 0,
      max: 200,
      left: '0',
      top: 'bottom',
      calculable: true,
      seriesIndex: [1],
      inRange: {
        color: ['#aaf7fd', '#2696d5'] // 蓝绿
      }
    },
    geo: {
      show: true,
      map: mapName,
      label: {
        normal: {
          show: true,
          color: '#191F25'
        },
        emphasis: {
          show: false
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#023677',
          borderColor: '#1180c7'
        },
        emphasis: {
          areaColor: '#4499d0'
        }
      }
    },
    series: [
      {
        name: '北京',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [
          {
            name: '',
            value: [116.405285, 40.004989]
          }
        ],
        symbol:
          'path://m463.27193,186.73462l27.50175,0l8.49825,-26.12654l8.49826,26.12654l27.50174,0l-22.24934,16.14691l8.49869,26.12654l-22.24935,-16.14735l-22.24934,16.14735l8.49869,-26.12654l-22.24935,-16.14691z',
        symbolSize: 20
      },
      {
        type: 'map',
        map: mapName,
        geoIndex: 0,
        aspectScale: 0.75, // 长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: '#031525',
            borderColor: '#3B5077'
          },
          emphasis: {
            areaColor: '#2B91B7'
          }
        },
        animation: false,
        data: data
      }
    ]
  }
  return option
}

// ############################################3

/**
 * @param {String} echartitle
 * @param {String} legendright 图例位置
 * @param {String} legendtop 图例位置
 * @param {Boolean} percent label 百分比
 * @param {Array} legend 图例
 * @param {Array} color 颜色
 * @param {Array} radius 环形角度
 * @param {Array} center 位置
 * @param {Array} data
 * @description 饼图暂时使用，后期删除
 */

export const getPieChart = (paramObj) => {
  let option = {
    title: {
      text: '',
      subtext: '',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: `{a} <br/>{b} : {c} ({d}%)`
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    legend: {
      orient: 'vertical',
      right: paramObj.legendright ? paramObj.legendright : 16,
      top: paramObj.legendtop ? paramObj.legendtop : 0,
      icon: 'pin',
      data: paramObj.legend
    },
    series: [{
      name: paramObj.echartitle,
      type: 'pie',
      color: paramObj.color,
      radius: paramObj.radius,
      center: paramObj.center,
      avoidLabelOverlap: false, // 是否启用防止标签重叠策略
      label: {
        show: true, // 设置图文 中间的提示
        color: '#333',
        formatter: p => {
          let ret = {}
          if (p.percent) {
            ret = `${p.name}${p.percent}%`
          } else {
            ret = p.name
          }
          return ret
        }
      },
      labelLine: {
        show: false,
        lineStyle: {
          width: 1
        }
      },
      data: paramObj.data
    }]
  }
  return option
}

// color: new echarts.graphic.LinearGradient( 0, 0, 0, 1, [
//     { offset: 0, color: "#f3d333" },
//     { offset: 0.5, color: "#f3a012" }
// ] )
// import { getPieChart } from "@/libs/echarts"
// let param = {
//     echartitle: "项目阶段占比",
//     legend: [
//         "物资需求",
//         "图纸确认",
//         "初设批复",
//         "初设",
//         "项目开工",
//         "任务下达"
//     ],
//     color: [
//         "#3FB1E3",
//         "#6BE6C1",
//         "#626C91",
//         "#A0A7E6",
//         "#C4EBAD",
//         "#96DEE8"
//     ],
//     radius: ["35%", "60%"],
//     center: ["35%", "42%"],
//     data: [
//         { value: 9, name: "物资需求" },
//         { value: 12, name: "图纸确认" },
//         { value: 19, name: "初设批复" },
//         { value: 15, name: "初设" },
//         { value: 19, name: "项目开工" },
//         { value: 24, name: "任务下达" }
//     ]
// }
// this.echartData1 = {
//     bLoading: false,
//     id: "monitor-pie-1"
// }
// this.$nextTick( () => {
//     this.echartData1.option = getPieChart( param )
// } )
