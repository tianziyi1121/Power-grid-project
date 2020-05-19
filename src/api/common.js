import axios from '@/libs/api.request'
import api from './config'

// interface：请添加注释，接口相关重要信息
// post请求 json格式
export const query_zyxx_list = (params) => {
  return axios.request({
    url: '',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}

// get请求 ?ley=val字符串
export const query_zyxx_del = (params) => {
  return axios.request({
    url: '',
    method: 'get',
    headers: {
      'Content-Type': 'x-www-form-urlencoded'
    },
    params: params
    // params: {
    //   key: 'val'
    // }
  })
}

// 履约问题类别
export const get_lywtlb = (params) => {
  // return axios.request( {
  //   url: api.get_lywtlb,
  //   method: 'post',
  //   data: params
  // } )
  return new Promise((resolve) => {
    const data = [
      {
        value: '1',
        label: '技术图纸原因'
      },
      {
        value: '2',
        label: '合理生产周期不足'
      },
      {
        value: '3',
        label: '工程提前'
      },
      {
        value: '4',
        label: '工程延期'
      },
      {
        value: '5',
        label: '资金支付不及时'
      },
      {
        value: '6',
        label: '供应商资金问题'
      },
      {
        value: '7',
        label: '产能饱和'
      },
      {
        value: '8',
        label: '经营管理问题'
      },
      {
        value: '9',
        label: '原材料及组部件问题'
      },
      {
        value: '10',
        label: '环保督查问题'
      },
      {
        value: '11',
        label: '运输问题'
      },
      {
        value: '12',
        label: '现场服务问题'
      },
      {
        value: '13',
        label: '生产质量问题'
      },
      {
        value: '14',
        label: '通信类设备问题'
      },
      {
        value: '15',
        label: '自然灾害'
      },
      {
        value: '16',
        label: '重大活动'
      },
      {
        value: '17',
        label: '供应配套问题'
      },
      {
        value: '18',
        label: '其它'
      }
    ]
    resolve({
      code: '0000',
      data: data
    })
  })
}



