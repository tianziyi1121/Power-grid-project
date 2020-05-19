<template >
  <div class="body">
    <div class="condition">
      <div class="word">
        <!-- <img src="@/assets/images/common/back.png" alt=""> -->

        <Icon type="md-arrow-dropright" />

        <span>条件查询</span>
      </div>
      <ul class="block">
        <li>
          <Input
            v-model="number"
            placeholder="请输入供应商编号"
            clearable
            style="width: 200px"
          />
        </li>
        <li class="center">
          <Input
            v-model="name"
            placeholder="请输入供应商名称"
            clearable
            style="width: 200px"
          />
        </li>
      </ul>
      <ul class="look">
        <li class="look_1">
          <button :class="butto ? 'ma' : 'm'" @click="up">查询</button>
        </li>
        <li class="look_2">
          <button type="rest" :class="butt ? 'ma' : 'm'" @click="empty">
            重置
          </button>
        </li>
      </ul>
    </div>
    <div class="export">
      <button @click="exp" :class="get ? 'out' : 'go'">导出</button>
    </div>
    <div class="main_1">
      <!-- table表格 -->
      <Table stripe :columns="tableItem.columns" :data="tableItem.data"></Table>
      <Modal :visible.sync="modal5" v-model="open" title="提示" width="731.5px">
        <i-input
          type="textarea"
          :rows="4"
          placeholder="请输入被列入灰名单原因"
          style="width: 629.8px;border:1px solide #549B9B"
        ></i-input>
        <!-- <i-input size="large"  class="in" placeholder="" style="width: 629.8px"></i-input> -->
        <div class="xgpz">
          <span>相关凭证：</span>
          <label for class="xgpz_k">
            <Upload
              multiple
              :on-success="handleSuccess"
              :format="['jpg', 'jpeg', 'png']"
              :max-size="2048"
              :before-upload="handleBeforeUpload"
              action="/api/zhgyl-gysfk-setting/greyList/addGreyList"
            >
              <button class="xgpz_liu">浏览</button>
            </Upload>

            <!--  -->
            <!-- <Upload action="//jsonplaceholder.typicode.com/posts/">
                <i-button type="ghost" icon="ios-cloud-upload-outline">上传文件</i-button>
            </Upload>-->
          </label>
        </div>
        <div class="uoload">
          <span
            >(请上传jpg/png/txt/doc/pcf文件，图片大小不小于500kb，文件大于5mb)</span
          >
        </div>
      </Modal>
      <!-- <Modal
                    title="提示"
                    v-model="open"
                    class="ivu-modal-content"
                    width='731.5px'

                    >
                   <i-input size="large" placeholder="large size" style="width: 629.8px"></i-input>
                    <div class="center">
                        <span class="xgpz">相关凭证：</span>

                    </div>

      </Modal>-->
      <Modal title="Title" v-model="off" class="vertical-center-modal">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
      </Modal>
      <div class="page">
        <span>共有2222条记录</span>
        <Page prev-text="上一页" next-text="下一页"></Page>
      </div>

      <!-- 分页 -->
      <!-- <div class="page">
              <span>共有2222条记录</span>
              <Page :total="2222" show-elevator  prev-text="上一页"  next-text="下一页"></Page>

      </div>-->
    </div>
  </div>
</template>

<script>
// import {getLook} from '../../api/api'
import axios from "axios";
export default {
  data() {
    return {
      butto: false,
      modal5: false,
      butt: false,
      get: false,
      number: "",
      name: "",
      off: false,
      open: false,
      value17: "",
      tableheight: 0,
      defaultList: [],
      imgName: "",
      visible: false,

      tableItem: {
        columns: [
          {
            type: "selection",
            title: "全选",
            key: "checkbox"
          },
          {
            title: "序号",
            key: "index",
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "供应商编号",
            key: "supplierCode"
          },
          {
            title: "供应商名称",
            key: "supplierName"
          },
          {
            title: "注册地",
            key: "regRegion"
          },
          {
            title: "供应商等级",
            key: "supplierLevel"
          },
          {
            title: "是否加入灰名单",
            key: "cause"
          },
          // {
          //     title: '操作',
          //     key: 'action',
          //     fixed: 'right',
          //     // width: 150,
          //     align: 'center',
          //     render ( column, index) {
          //         return `<span type="primary" size="small" @click="show(${index})">查看</span> <span type="error" size="small" @click="remove(${index})">删除</span>`;
          //     }
          // },
          {
            title: "操作",
            key: "action",
            width: 120,
            render: (h, params) => {
              return h("span", [
                h(
                  "button",
                  {
                    class: "look_join",
                    style: {
                      color: "#549B9B",
                      border: "none",
                      background: "none",
                      outline: "none",
                      marginRight: "10px"
                    },
                    // 添加击事件
                    on: {
                      click: () => {
                        // 点击触发事件
                        this.open = true;
                        console.log(this.open);
                      }
                    }
                  },
                  "加入"
                ),
                h(
                  "button",
                  {
                    style: {
                      color: "#549B9B",
                      border: "none",
                      background: "none",
                      outline: "none"
                    },
                    // 添加击事件
                    on: {
                      click: () => {
                        // 点击触发事件
                        this.off == false;
                        console.log(this.off);
                      }
                    }
                  },
                  "解封"
                )
              ]);
            }
          }
        ],
        // 序号里面的内容
        data: []
      },
      page: {
        // page每页10条
        // pageSize: 10,
        // page当前页
        // pageNumber: 1,
        // page总页数
        // dataCount: 1
      }
    };
  },
  computed: {
    uploadList() {
      return this.$refs.upload ? this.$refs.upload.fileList : [];
    }
  },
  methods: {
    getObjectURL(file) {
      var url = null;
      if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      console.log(url, 112121);
      return url;
    },
    handleView(name) {
      console.log(name);
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      // 从 upload 实例删除数据
      console.log(file);
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      //
      console.log(res, file, 111112222);
      // 因为上传过程为实例，这里模拟添加 url
      // file.url =
      //   "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      // file.name = "7eb99afb9d5f317c912f08b5212fd69a";
      let obj = {
        name: file.name,
        url: "http://www.xxx.com/img1.jpg"
      };
    },
    handleFormatError(file) {
      console.log(file);
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    handleMaxSize(file) {
      console.log(file);
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      });
    },
    handleBeforeUpload(env) {
      console.log(env, 11111111111);
      this.getObjectURL(env);
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传 5 张图片。"
        });
      }
      return check;
    },

    lodup() {},
    //   show (index) {
    //     this.$Modal.info({
    //         title: '用户信息',
    //         content: `姓名：${this.data6[index].name}<br>年龄：${this.data6[index].age}<br>地址：${this.data6[index].address}`
    //     })
    // },
    // 重置
    empty() {
      this.butt = true;
      if (this.butt) {
        this.butto = false;
      }
      this.number = "";
      this.name = "";
      console.log(this.number);
      this.look();
    },

    remove(index) {
      this.data6.splice(index, 1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    // 查看
    up() {
      this.butto = true;
      if (this.butto) {
        this.butt = false;
      }
      // 接口请求
      axios
        .post("/api/zhgyl-gysfk-setting/greyList/queryGreyList", {
          supplierCode: this.number,
          supplierName: this.name,

          relieveFlag: 1
        })
        .then(res => {
          this.tableItem.data = res.data.data;

          console.log(res.data.data);
        });

      console.log(this.number);
      console.log(this.name);
    },
    // 导出
    exp() {
      let Export = this.tableItem.data.map((item, index) => {
        return item;
      });
      console.log(Export);
      axios
        .post("/api/zhgyl-gysfk-setting/greyList/greyListExport", {
          supplierCode: Export.supplierCode,
          supplierName: Export.supplierName,
          relieveFlag: 1
        })
        .then(res => {
          this.$Message.success("成功导出");
        });
    },
    look() {
      axios
        .post("/api/zhgyl-gysfk-setting/greyList/queryGreyList", {
          supplierCode: "",
          supplierName: "",
          relieveFlag: 1
        })
        .then(res => {
          this.tableItem.data = res.data.data;
          console.log(res.data.data);
          //  pageSize=this.pageSize,
          //  pageNumber=this.pageNumber
        });
    }
  },
  created() {
    this.look();
  }
};
</script>
<style lang="less" scoped>
@import url("./gray.less");
</style>
