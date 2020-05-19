import axios from '@/libs/api.request'
import api from '@/api/config'
/**
 * @param {String} downpanel
 * @description table高度  类型一：有传参  类型二：无参数
 */

const getTableHeight = (downpanel) => {
  const windowHeight = window.innerHeight
  let height = downpanel ? (windowHeight - $('.' + downpanel).height() - 335) : windowHeight - 335
  return height
}

/**
 * 日期区间规则验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const validate = (rule, value, callback) => {
  let str = '日期不能为空'
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return callback(str)
    }
    value.map((item) => {
      if (item === '') {
        return callback(str)
      }
    })
  } else {
    if (value === '') {
      return callback(str)
    }
  }
  return callback()
}

/**
 * 手机号规则验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const validatePhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else if (!/^1[34578]\d{9}$/.test(value)) {
    return callback('手机号格式不正确')
  } else {
    return callback()
  }
}

/**
 * 导出文件
 * @param {*} hrefUrl 导出文件地址
 */
const exportFile = (hrefUrl) => {
  var href = hrefUrl
  if (href !== null && href !== undefined && href !== '') {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = href
    link.target = '_blank' // 解决pdf打开预览问题，新页面打开预览pdf
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/**
 * 日期格式化方法 格式YYYY-MM-DD
 * @param {字符串} str
 */
const formatData = (str) => {
  if (!str) {
    return ''
  } else {
    var dateString = new Date(str)
    return nowDate(dateString)
  }
}

/**
 * 日期格式化方法 格式yyyy-MM-dd HH:mm:ss
 * @param {字符串} str
 */
const formatDateTime = (str) => {
  if (!str) {
    return ''
  } else {
    var dateString = new Date(str)
    var date = dateString
    var seperator1 = '-'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour
    }
    if (minute >= 0 && minute <= 9) {
      minute = '0' + minute
    }
    if (second >= 0 && second <= 9) {
      second = '0' + second
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + minute + ':' + second
    return currentdate
  }
}

/*
 * 当前日期 格式YYYY-MM-DD
 * @param {*} dateString 日期 new Date()
 */
const nowDate = (dateString) => {
  var date = dateString
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

/*
 * 一个月前日期 格式YYYY-MM-DD
 * @param {*} dateString 日期 new Date()
 */
const beforeDate = (dateString) => {
  var date = dateString
  date.setDate(date.getDate() - 30)
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

/**
 * 获取当前时间
 * YYYY-MM-DD hh:mm:ss
 */
const switchTimeFormat = (time) => {
  let dateTime = new Date(time)

  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  let date = dateTime.getDate()
  let hour = dateTime.getHours()
  let minute = dateTime.getMinutes()
  let second = dateTime.getSeconds()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }

  if (date >= 1 && date <= 9) {
    date = '0' + date
  }

  if (hour >= 1 && hour <= 9) {
    hour = '0' + hour
  }

  if (minute >= 1 && minute <= 9) {
    minute = '0' + minute
  }

  if (second >= 1 && second <= 9) {
    second = '0' + second
  }
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

/**
 * 获取当前时间
 * YYYY-MM-DD hh:mm:ss
 */
const nowTime = () => {
  var date = new Date(),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds()

  M = M < 10 ? '0' + M : M
  D = D < 10 ? '0' + D : D
  h = h < 10 ? '0' + h : h
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s

  var newTime = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
  return newTime
}

/**
 * 默认table 分页展示情况
 */
const page_options = [20, 50, 100]

/**
 * 对象赋值方法
 * 方法说明：newObj将得到oldObj内属性相同的值
 */
const objAssign = (newObj, oldObj) => {
  for (let key in oldObj) {
    if (key in newObj) {
      newObj[key] = oldObj[key]
    }
  }
  return newObj
}

/**
 * 日期区间赋值
 */
const setDateRange = (arr, obj, ks, js) => {
  obj[ks] = arr[0]
  obj[js] = arr[1]
}

/**
 * 模拟table数据
 */
const tableDemoList = () => {
  let listArr = []
  let list = {
    'cgsqbh': '200033722',
    'cgsqbh_hxmh': '10',
    'wlbm': '500022693',
    'wlms': '高压开关柜，ac10kv，分段断路器柜，中置式，1000a20ka真空',
    'sqsl': '20',
    'zldw': '个',
    'pgjg': '4,520.00',
    'jgdw': '116',
    'gcdm': 'DCAO',
    'gcmc': '国网冀北电力有限公司唐山供电公司工厂',
    'xmbh': '1301011500MQ',
    'xmmc': '廊坊大城500千伏输变电工程',
    'sgsqcjrq': '2019-2-10',
    'jhjhrq': '2019-10-12',
    'jhddjjhfs': '施工现场地面交货',
    'zbpc': 'P19052',
    'zblx': '招标采购',
    'zbfs': '国网实施',
    'sszt': '一级采购',
    'zbjgfbrq': '2019-02-26',
    'zbjgzt': '已中标',
    'ecphtbh': '399393939',
    'ecphtbh_hxmh': 1,
    'gysbm': '39393939',
    'gysmc': '北京易达新电气成套设备有限公司',
    'bzq': 36,
    'fkbl': '0:9.5:0:0.5',
    'fbbm': '一二次设备',
    'fbxx': '001',
    'bhsdj': '97,345.13',
    'hsdj': '110,000.00',
    'fxjj': '110,000.00',
    'hbm': '97,345.13',
    'sl': '1',
    'gyslxr': '苏毅波',
    'phone': '13910678961',
    'cgddbh': '392999393939',
    'cgddbh_hxmh': '12',
    'zbnd': '2018',
    'dwmc': '国家电网有限公司输变电项目2018年第八次线路装置性材料招标采购',
    'ssdw': '本部',
    'spjg': '是',
    'pzzt': '一级审批通过',
    'cgsqpzrq': '2019-10-12',
    'wldl': '低压电器',
    'wlzl': '低压电器',
    'wlxl': '接线板',
    'jsgfid': '5216-5000090325-00002',
    'cgfs': '1(招标采购)',
    'xygcbh': '39399339',
    'xygcbh_hxmh': '10',
    'sfzdgc': '是',
    'zdgclx': '500kv工程',
    'cgzz': '秦皇岛电力',
    'cgzzms': '秦皇岛电力北戴河黄金海岸',
    'bhsj': '201920',
    'hszj': '302094',
    'warn_no': '2019090001',
    'warn_state': 2,
    'warn_days': '7',
    'supervise_state': '未督办',
    'supervise_date': '2019-08-28',
    'supervise_times': '2',
    'warn_type': '实体库存物资超期预警（库存物资）',
    'company': '本部/直属单位/其他',
    'factory_no': 'DDE0',
    'factory_name': '国网昌黎县供电分公司工厂',
    'warehouse_no': 'DAJ1',
    'warehouse': '国网冀北电力良乡中心库',
    'materiel_no': '500022693',
    'materiel_des': '接线板',
    'big_class': '二次设备',
    'middle_class': '电源系统',
    'small_class': '直流电源系统',
    'batch': '0000189620',
    'position': '',
    'num': '3',
    'unit': '台',
    'stock_maney': '1292.00',
    'stock_type': '非限制使用',
    'in_date': '20190825',
    'out_date': '20190910',
    'stock_year': '360',
    'wbs': '1301011500MV71000',
    'pro_no': '18010418003J',
    'pro_name': '秦皇岛昌黎县工业园区10千伏中心开闭所新建工程',
    'yjbh': '2019090001',
    'yjzt': 2,
    'yjts': '7',
    'dbzt': '未督办',
    'dbsj': '2019-08-28',
    'dbcs': '2',
    'yjlx': '实体库存物资超期预警（库存物资）',
    'ckcj': '仓储点',
    'ckbm': 'adj',
    'ckmc': '国网冀北电力良乡中心库',
    'ckdz': '河北省唐山市曹妃甸区垦丰大街38-1号',
    'ssqy': '唐山市唐海县',
    'tdzmj': '1111',
    'zzdmj': '222',
    'kfmj': '33',
    'hpmj': '4',
    'dcmj': '5',
    'zcsx': '全民',
    'glbm': '运检部门',
    'fzr': '李想',
    'lxfs': '17899009900',
    'zcssdw': '国网冀北电力有限公司唐山市曹妃甸区供电分公司',
    'jcrq': '201701',
    'ckzt': '启用',
    'affiliatedUnit': '本部',
    'factoryCode': 'd0a0',
    'factoryName': '国网冀北电力有限公司本部工厂',
    'warehouseCode': 'daj1',
    'warehouseName': '国网冀北电力良乡中心库',
    'materialCode': '500048114',
    'wldlms': '一次设备',
    'wlzlms': '开关箱',
    'wlxlms': '高压开关柜',
    'jldw': '台',
    'je': '1290.00',
    'kclx': '非限制使用',
    'hw': '',
    'xmbm': '18010418003J',
    'rkrq': '20190825',
    'kl': '27',
    'czjhbm': '2322224322',
    'cjrq': '2019-12-12',
    'gsdm': '0394920943',
    'gc': '国网冀北电力有限公司本部工厂',
    'zcbm': '00902094',
    'zcms': '高压开关柜',
    'fjwzbm': '039954030',
    'fjwzmc': '高压开关柜',
    'bcjhczsl': '4',
    'fjwzczjhbh': '8493030',
    'jjjhbh': '003930930',
    'jjjhmc': '竞价计划名称',
    'bh': '039',
    'bhmc': '包号名称',
    'lywtbh': 'JB201911010001',
    'wtlb': '物资供应',
    'xmmc': '唐山滦南县35千伏扒港变电站10千伏线路关口改造工程',
    'cgddbh': '100273271',
    'htbh': '01010026651200010001',
    'htje': '900，837.00',
    'tzqrwcsj': '2019-10-10',
    'htqdsj': '2018-10-10',
    'htjhq': '2019-9-10',
    'qdjhq': '2019-9-10',
    'gysmc': '莒南县美达电力实业有限公司',
    'gyslxr': '张三',
    'gyslxdh': '13612345678',
    'gysyx': '163@qq.com',
    'tbr': '李四',
    'tbrlxdh': '13612345678',
    'tbrq': '唐山滦南',
    'jjcd': '紧急',
    'zsdw': '滦南',
    'yjsjmc': '第1号台风',
    'yjwzdbsqh': 'YJXQ20190907',
    'yjwzdbbh': '',
    'xqdw': '秦皇岛',
    'wzbm': '684958394',
    'wlms': '冲锋舟',
    'jldw': '艘',
    'xqsl': '12',
    'xqtbbm': '秦皇岛',
    'xqtbr': '阿萨德',
    'zhshsj': '2019-10-12',
    'zhshr': '史蒂夫',
    'bb': '2019-10-12',
    'gyfs': '物资调拨',
    'sqd': '0',
    'qrd': '1',
    'ff': '0',
    'gg': '1',
    'jjcgpz': '0',
    'cwcl': '0',
    'lywtbh': 'JB201911010001',
    'wtlb': '物资供应',
    'xmmc': '唐山滦南县35千伏扒港变电站10千伏线路关口改造工程',
    'cgddbh': '100273271',
    'htbh': '01010026651200010001',
    'htje': '900，837.00',
    'tzqrwcsj': '2019-10-10',
    'htqdsj': '2018-10-10',
    'htjhq': '2019-9-10',
    'qdjhq': '2019-9-10',
    'gysmc': '莒南县美达电力实业有限公司',
    'gyslxr': '张三',
    'gyslxdh': '13612345678',
    'gysyx': '163@qq.com',
    'tbr': '李四',
    'tbrlxdh': '13612345678',
    'tbrq': '唐山滦南',
    'jjcd': '紧急',
    'zsdw': '滦南',
    'cgsqbh': '200033722',
    'cgsqbh_hxmh': '10',
    'wlbm': '500022693',
    'wlms': '高压开关柜，ac10kv，分段断路器柜，中置式，1000a20ka真空',
    'sqsl': '20',
    'zldw': '个',
    'pgjg': '4,520.00',
    'jgdw': '116',
    'gcdm': 'DCAO',
    'gcmc': '国网冀北电力有限公司唐山供电公司工厂',
    'xmbh': '1301011500MQ',
    'xmmc': '廊坊大城500千伏输变电工程',
    'sgsqcjrq': '2019-2-10',
    'jhjhrq': '2019-10-12',
    'jhddjjhfs': '施工现场地面交货',
    'zbpc': 'P19052',
    'zblx': '招标采购',
    'zbfs': '国网实施',
    'sszt': '一级采购',
    'zbjgfbrq': '2019-02-26',
    'zbjgzt': '已中标',
    'ecphtbh': '399393939',
    'ecphtbh_hxmh': 1,
    'gysbm': '39393939',
    'gysmc': '北京易达新电气成套设备有限公司',
    'bzq': 36,
    'fkbl': '0:9.5:0:0.5',
    'fbbm': '一二次设备',
    'fbxx': '001',
    'bhsdj': '97,345.13',
    'hsdj': '110,000.00',
    'fxjj': '110,000.00',
    'hbm': '97,345.13',
    'sl': '1',
    'gyslxr': '苏毅波',
    'phone': '13910678961',
    'cgddbh': '392999393939',
    'cgddbh_hxmh': '12',
    'zbnd': '2018',
    'dwmc': '国家电网有限公司输变电项目2018年第八次线路装置性材料招标采购',
    'ssdw': '本部',
    'spjg': '是',
    'pzzt': '一级审批通过',
    'cgsqpzrq': '2019-10-12',
    'wldl': '低压电器',
    'wlzl': '低压电器',
    'wlxl': '接线板',
    'jsgfid': '5216-5000090325-00002',
    'cgfs': '1(招标采购)',
    'xygcbh': '39399339',
    'xygcbh_hxmh': '10',
    'sfzdgc': '是',
    'zdgclx': '500kv工程',
    'cgzz': '秦皇岛电力',
    'cgzzms': '秦皇岛电力北戴河黄金海岸',
    'bhsj': '201920',
    'hszj': '302094',
    'warn_no': '2019090001',
    'warn_state': 2,
    'warn_days': '7',
    'supervise_state': '未督办',
    'supervise_date': '2019-08-28',
    'supervise_times': '2',
    'warn_type': '实体库存物资超期预警（库存物资）',
    'company': '本部/直属单位/其他',
    'factory_no': 'DDE0',
    'factory_name': '国网昌黎县供电分公司工厂',
    'warehouse_no': 'DAJ1',
    'warehouse': '国网冀北电力良乡中心库',
    'materiel_no': '500022693',
    'materiel_des': '接线板',
    'big_class': '二次设备',
    'middle_class': '电源系统',
    'small_class': '直流电源系统',
    'batch': '0000189620',
    'position': '',
    'num': '3',
    'unit': '台',
    'stock_maney': '1292.00',
    'stock_type': '非限制使用',
    'in_date': '20190825',
    'out_date': '20190910',
    'stock_year': '360',
    'wbs': '1301011500MV71000',
    'pro_no': '18010418003J',
    'pro_name': '秦皇岛昌黎县工业园区10千伏中心开闭所新建工程',
    'yjbh': '2019090001',
    'yjzt': 2,
    'yjts': '7',
    'dbzt': '未督办',
    'dbsj': '2019-08-28',
    'dbcs': '2',
    'yjlx': '实体库存物资超期预警（库存物资）',
    'ckcj': '仓储点',
    'ckbm': 'adj',
    'ckmc': '国网冀北电力良乡中心库',
    'ckdz': '河北省唐山市曹妃甸区垦丰大街38-1号',
    'ssqy': '唐山市唐海县',
    'tdzmj': '1111',
    'zzdmj': '222',
    'kfmj': '33',
    'hpmj': '4',
    'dcmj': '5',
    'zcsx': '全民',
    'glbm': '运检部门',
    'fzr': '李想',
    'lxfs': '17899009900',
    'zcssdw': '国网冀北电力有限公司唐山市曹妃甸区供电分公司',
    'jcrq': '201701',
    'ckzt': '启用',
    'affiliatedUnit': '本部',
    'factoryCode': 'd0a0',
    'factoryName': '国网冀北电力有限公司本部工厂',
    'warehouseCode': 'daj1',
    'warehouseName': '国网冀北电力良乡中心库',
    'materialCode': '500048114',
    'wldlms': '一次设备',
    'wlzlms': '开关箱',
    'wlxlms': '高压开关柜',
    'jldw': '台',
    'je': '1290.00',
    'kclx': '非限制使用',
    'hw': '',
    'xmbm': '18010418003J',
    'rkrq': '20190825',
    'kl': '27',
    'czjhbm': '2322224322',
    'cjrq': '2019-12-12',
    'gsdm': '0394920943',
    'gc': '国网冀北电力有限公司本部工厂',
    'zcbm': '00902094',
    'zcms': '高压开关柜',
    'fjwzbm': '039954030',
    'fjwzmc': '高压开关柜',
    'bcjhczsl': '4',
    'fjwzczjhbh': '8493030',
    'jjjhbh': '003930930',
    'jjjhmc': '竞价计划名称',
    'bh': '039',
    'bhmc': '包号名称',
    'lywtbh': 'JB201911010001',
    'wtlb': '物资供应',
    'xmmc': '唐山滦南县35千伏扒港变电站10千伏线路关口改造工程',
    'cgddbh': '100273271',
    'htbh': '01010026651200010001',
    'htje': '900，837.00',
    'tzqrwcsj': '2019-10-10',
    'htqdsj': '2018-10-10',
    'htjhq': '2019-9-10',
    'qdjhq': '2019-9-10',
    'gysmc': '莒南县美达电力实业有限公司',
    'gyslxr': '张三',
    'gyslxdh': '13612345678',
    'gysyx': '163@qq.com',
    'tbr': '李四',
    'tbrlxdh': '13612345678',
    'tbrq': '唐山滦南',
    'jjcd': '紧急',
    'zsdw': '滦南',
    'yjsjmc': '第1号台风',
    'yjwzdbsqh': 'YJXQ20190907',
    'yjwzdbbh': '',
    'xqdw': '秦皇岛',
    'wzbm': '684958394',
    'wlms': '冲锋舟',
    'jldw': '艘',
    'xqsl': '12',
    'xqtbbm': '秦皇岛',
    'xqtbr': '阿萨德',
    'zhshsj': '2019-10-12',
    'zhshr': '史蒂夫',
    'bb': '2019-10-12',
    'gyfs': '物资调拨',
    'sqd': '0',
    'qrd': '1',
    'ff': '0',
    'gg': '1',
    'jjcgpz': '0',
    'cwcl': '0',
    'cgsqbh': '200033722',
    'cgsqbh_hxmh': '10',
    'wlbm': '500022693',
    'wlms': '高压开关柜，ac10kv，分段断路器柜，中置式，1000a20ka真空',
    'sqsl': '20',
    'zldw': '个',
    'pgjg': '4,520.00',
    'jgdw': '116',
    'gcdm': 'DCAO',
    'gcmc': '国网冀北电力有限公司唐山供电公司工厂',
    'xmbh': '1301011500MQ',
    'xmmc': '廊坊大城500千伏输变电工程',
    'sgsqcjrq': '2019-2-10',
    'jhjhrq': '2019-10-12',
    'jhddjjhfs': '施工现场地面交货',
    'zbpc': 'P19052',
    'zblx': '招标采购',
    'zbfs': '国网实施',
    'sszt': '一级采购',
    'zbjgfbrq': '2019-02-26',
    'zbjgzt': '已中标',
    'ecphtbh': '399393939',
    'ecphtbh_hxmh': 1,
    'gysbm': '39393939',
    'gysmc': '北京易达新电气成套设备有限公司',
    'bzq': 36,
    'fkbl': '0:9.5:0:0.5',
    'fbbm': '一二次设备',
    'fbxx': '001',
    'bhsdj': '97,345.13',
    'hsdj': '110,000.00',
    'fxjj': '110,000.00',
    'hbm': '97,345.13',
    'sl': '1',
    'gyslxr': '苏毅波',
    'phone': '13910678961',
    'cgddbh': '392999393939',
    'cgddbh_hxmh': '12',
    'zbnd': '2018',
    'dwmc': '国家电网有限公司输变电项目2018年第八次线路装置性材料招标采购',
    'ssdw': '本部',
    'spjg': '是',
    'pzzt': '一级审批通过',
    'cgsqpzrq': '2019-10-12',
    'wldl': '低压电器',
    'wlzl': '低压电器',
    'wlxl': '接线板',
    'jsgfid': '5216-5000090325-00002',
    'cgfs': '1(招标采购)',
    'xygcbh': '39399339',
    'xygcbh_hxmh': '10',
    'sfzdgc': '是',
    'zdgclx': '500kv工程',
    'cgzz': '秦皇岛电力',
    'cgzzms': '秦皇岛电力北戴河黄金海岸',
    'bhsj': '201920',
    'hszj': '302094',
    'warn_no': '2019090001',
    'warn_state': 2,
    'warn_days': '7',
    'supervise_state': '未督办',
    'supervise_date': '2019-08-28',
    'supervise_times': '2',
    'warn_type': '实体库存物资超期预警（库存物资）',
    'company': '本部/直属单位/其他',
    'factory_no': 'DDE0',
    'factory_name': '国网昌黎县供电分公司工厂',
    'warehouse_no': 'DAJ1',
    'warehouse': '国网冀北电力良乡中心库',
    'materiel_no': '500022693',
    'materiel_des': '接线板',
    'big_class': '二次设备',
    'middle_class': '电源系统',
    'small_class': '直流电源系统',
    'batch': '0000189620',
    'position': '',
    'num': '3',
    'unit': '台',
    'stock_maney': '1292.00',
    'stock_type': '非限制使用',
    'in_date': '20190825',
    'out_date': '20190910',
    'stock_year': '360',
    'wbs': '1301011500MV71000',
    'pro_no': '18010418003J',
    'pro_name': '秦皇岛昌黎县工业园区10千伏中心开闭所新建工程',
    'yjbh': '2019090001',
    'yjzt': 2,
    'yjts': '7',
    'dbzt': '未督办',
    'dbsj': '2019-08-28',
    'dbcs': '2',
    'yjlx': '实体库存物资超期预警（库存物资）',
    'ckcj': '仓储点',
    'ckbm': 'adj',
    'ckmc': '国网冀北电力良乡中心库',
    'ckdz': '河北省唐山市曹妃甸区垦丰大街38-1号',
    'ssqy': '唐山市唐海县',
    'tdzmj': '1111',
    'zzdmj': '222',
    'kfmj': '33',
    'hpmj': '4',
    'dcmj': '5',
    'zcsx': '全民',
    'glbm': '运检部门',
    'fzr': '李想',
    'lxfs': '17899009900',
    'zcssdw': '国网冀北电力有限公司唐山市曹妃甸区供电分公司',
    'jcrq': '201701',
    'ckzt': '启用',
    'affiliatedUnit': '本部',
    'factoryCode': 'd0a0',
    'factoryName': '国网冀北电力有限公司本部工厂',
    'warehouseCode': 'daj1',
    'warehouseName': '国网冀北电力良乡中心库',
    'materialCode': '500048114',
    'wldlms': '一次设备',
    'wlzlms': '开关箱',
    'wlxlms': '高压开关柜',
    'jldw': '台',
    'je': '1290.00',
    'kclx': '非限制使用',
    'hw': '',
    'xmbm': '18010418003J',
    'rkrq': '20190825',
    'kl': '27',
    'czjhbm': '2322224322',
    'cjrq': '2019-12-12',
    'gsdm': '0394920943',
    'gc': '国网冀北电力有限公司本部工厂',
    'zcbm': '00902094',
    'zcms': '高压开关柜',
    'fjwzbm': '039954030',
    'fjwzmc': '高压开关柜',
    'bcjhczsl': '4',
    'fjwzczjhbh': '8493030',
    'jjjhbh': '003930930',
    'jjjhmc': '竞价计划名称',
    'bh': '039',
    'bhmc': '包号名称',
    'lywtbh': 'JB201911010001',
    'wtlb': '物资供应',
    'xmmc': '唐山滦南县35千伏扒港变电站10千伏线路关口改造工程',
    'cgddbh': '100273271',
    'htbh': '01010026651200010001',
    'htje': '900，837.00',
    'tzqrwcsj': '2019-10-10',
    'htqdsj': '2018-10-10',
    'htjhq': '2019-9-10',
    'qdjhq': '2019-9-10',
    'gysmc': '莒南县美达电力实业有限公司',
    'gyslxr': '张三',
    'gyslxdh': '13612345678',
    'gysyx': '163@qq.com',
    'tbr': '李四',
    'tbrlxdh': '13612345678',
    'tbrq': '唐山滦南',
    'jjcd': '紧急',
    'zsdw': '滦南',
    'yjsjmc': '第1号台风',
    'yjwzdbsqh': 'YJXQ20190907',
    'yjwzdbbh': '',
    'xqdw': '秦皇岛',
    'wzbm': '684958394',
    'wlms': '冲锋舟',
    'jldw': '艘',
    'xqsl': '12',
    'xqtbbm': '秦皇岛',
    'xqtbr': '阿萨德',
    'zhshsj': '2019-10-12',
    'zhshr': '史蒂夫',
    'bb': '2019-10-12',
    'gyfs': '物资调拨',
    'sqd': '0',
    'qrd': '1',
    'ff': '0',
    'gg': '1',
    'jjcgpz': '0',
    'cwcl': '0'
  }
  for (let i = 0; i < 20; i++) {
    listArr.push(list)
  }
  return listArr
}

/**
 * 履约问题类别转换
 */
const lywtlbChange = (params) => {
  switch (params) {
    case '1':
      return '技术图纸原因'
      break
    case '2':
      return '合理生产周期不足'
      break
    case '3':
      return '工程提前'
      break
    case '4':
      return '工程延期'
      break
    case '5':
      return '资金支付不及时'
      break
    case '6':
      return '供应商资金问题'
      break
    case '7':
      return '产能饱和'
      break
    case '8':
      return '经营管理问题'
      break
    case '9':
      return '原材料及组部件问题'
      break
    case '10':
      return '环保督查问题'
      break
    case '11':
      return '运输问题'
      break
    case '12':
      return '现场服务问题'
      break
    case '13':
      return '生产质量问题'
      break
    case '14':
      return '通信类设备问题'
      break
    case '15':
      return '自然灾害'
      break
    case '16':
      return '重大活动'
      break
    case '17':
      return '供应配套问题'
      break
    case '18':
      return '其它'
      break
    default:
  }
}

/**
 * 履约提交状态
 */
const lytjztChange = (params) => {
  switch (params) {
    case '0':
      return '全部'
      break
    case '1':
      return '待上报'
      break
    case '2':
      return '已上报'
      break
    case '3':
      return '已拒绝'
      break
    default:
  }
}

/**
 * 履约协调状态
 */
const lyxtztChange = (params) => {
  switch (params) {
    case '0':
      return '全部'
      break
    case '4':
      return '已受理'
      break
    case '5':
      return '上报审核中'
      break
    case '6':
      return '报备审核中'
    case '7':
      return '上报审核完成'
    case '8':
      return '报备审核完成'
      break
    case '9':
      return '已上报总部'
      break
    case '10':
      return '已报备总部'
      break
    case '11':
      return '已反馈'
      break
    default:
  }
}

/**
 * 接口状态
 */
const jkztChange = (params) => {
  switch (params) {
    case '1':
      return '待上报'
      break
    case '2':
      return '上报中'
      break
    case '3':
      return '上报成功'
    case '4':
      return '上报失败'
      break
    default:
  }
}

/**
 * 实物调配历史-审核状态
 */
const shztChange = (params) => {
  switch (params) {
    case '2':
      return '待确认'
      break
    case '3':
      return '调出方确认'
    case '4':
      return '确认驳回'
      break
    case '7':
      return '已审核'
      break
    case '8':
      return '审核驳回'
      break
    case '9':
      return '申请国网调剂'
      break
    case '10':
      return '申请国网调配'
      break
    case '11':
      return '国网调配确认'
      break
    case '12':
      return '国网调剂确认'
      break
    case '13':
      return '国网调剂驳回'
      break
    case '14':
      return '国网调配驳回'
      break
    default:
  }
}

/**
 * 实物调配历史- 资源类型
 */
const zylxChange = (params) => {
  switch (params) {
    case '1':
      return '实物库存资源'
      break
    case '2':
      return '可用合同资源'
    case '3':
      return '可用协议库存资源'
      break
    case '4':
      return '供应计划协议储备'
      break
    case '5':
      return '班组站所'
      break
    default:
  }
}

const cjlxChange = (params) => {
  switch (params) {
    case '0':
      return '全部'
      break
    case '1':
      return '合同生效'
      break
    case '2':
      return '图纸交付'
      break
    case '3':
      return '发票提交'
      break
    case '4':
      return '现场服务'
      break
  }
}

// 督办状态
const dbztChange = (params) => {
  switch (params) {
    case '01':
      return '已下发'
      break
    case '02':
      return '办理中'
      break
    case '03':
      return '已关闭'
      break
    case '04':
      return '已删除'
      break
    case '05':
      return '已驳回'
      break
    case '06':
      return '已办理待关闭'
      break
  }
}

/**
 * $Message 提示延时 时间
 */
const durationTime = 5

/**
 * table select 分页多选，数据操作
 * @param {*已选中的数组} selectArr
 * @param {*接口请求的list数组} listArr
 */
const showSelect = (selectArr, listArr) => {
  listArr.forEach((item, i) => {
    selectArr.forEach((element, index) => {
      if (item.id == element.id) {
        item._checked = true
      }
    })
  })
  return listArr
}

/**
 * 数组对象去重
 * @param {*} arr
 */
const reduceArrObj = (arr) => {
  let obj = {}
  let resultArr = []
  resultArr = arr.reduce(function (item, next) {
    obj[next.key] ? '' : obj[next.key] = true && item.push(next)
    return item
  }, [])
  return resultArr
}

/**
 * 上传地址
 */

let uploadDir = 'wzpt'
let uploadUrl = api.uploadUrl // 上传
let uploadUrlWb = api.uploadUrlWb // 上传
let uploadUrlMultiple = api.uploadUrlMultiple // 上传

// 删除文件
export const deleteFile = (params) => {
  return axios.request({
    url: api.delFile,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}

// boolean true/false
const BooleanTrue = true
const BooleanFalse = false

export const changeSsdw = (ssdwlist) => {
  ssdwlist.forEach((item) => {
    item.ssdwbm = item.ssdwmc
  })
  return ssdwlist
}

// 获取小灯泡提示信息
export const getTips = (tipsArr, data) => {
  let valArr = []
  let nameArr = []
  for (let i in data) {
    nameArr.push(i)
    valArr.push(data[i])
  }
  tipsArr.forEach((i, index) => {
    let str = ''
    str = i.title + i.subTitle
    for (let j = 0; j < nameArr.length; j++) {
      if (str == nameArr[j]) {
        i.tips = valArr[j]
        return
      }
    }
  })
}

// 对象深拷贝
export const deepCopy = (arr) => {
  let copyArr = arr.constructor === Array ? [] : {} // 判断是数组还是对象
  for (let i in arr) {
    if (typeof arr[i] === 'object') {
      // 判断是值类型还是引用类型
      copyArr[i] = deepCopy(arr[i]) // 引用类型的话进行递归操作
    } else {
      copyArr[i] = arr[i] // 值类型直接赋值
    }
  }
  return copyArr
}

// title名称
export const titleName1 = '数据统计'
export const titleName2 = '分析预测'
export const titleName3 = '监控预警'
export const titleName4 = '指标管控'

// 数组转tree结构
export const composeTree = (arr) => {
  var data = JSON.parse(JSON.stringify(arr))
  var result = []
  if (!Array.isArray(data)) {
    return reslut
  }
  data.forEach(function (item) {
    delete item.children
  })

  var map = {}
  data.forEach(function (item) {
    map[item.RESOURCEID] = item
  })
  data.forEach(function (item) {
    const parent = map[item.PARENTID]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export default {
  getTips,
  getTableHeight,
  validate,
  exportFile,
  nowDate,
  beforeDate,
  page_options,
  tableDemoList,
  validatePhone,
  formatData,
  lywtlbChange,
  lytjztChange,
  jkztChange,
  lyxtztChange,
  durationTime,
  shztChange,
  reduceArrObj,
  showSelect,
  // formValidate,
  objAssign,
  setDateRange,
  zylxChange,
  uploadUrl,
  uploadUrlMultiple,
  uploadUrlWb,
  cjlxChange,
  uploadDir,
  nowTime,
  switchTimeFormat,
  formatDateTime,
  deleteFile,
  dbztChange,
  BooleanTrue,
  BooleanFalse,
  changeSsdw,
  deepCopy,
  titleName1,
  titleName2,
  titleName3,
  titleName4,
  composeTree
}
