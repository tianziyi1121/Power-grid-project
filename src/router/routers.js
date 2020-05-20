import Main from "@/components/main";
import Body from "@/components/body";
import Bodygd from "@/components/body/bodygd";
import Inner from "@/components/inner";
import Supplier from "@/components/supplier";
import Venture from "@/components/venture";
import Manage from "@/view/gray/manage.vue";
import Look from "@/view/gray/look.vue";

export default [
  // demo模块
  // {
  //   path: '/smart_sourcing',
  //   redirect: '/smart_sourcing/dashboard',
  //   name: 'smart_sourcing',
  //   component: Main,
  //   children: [
  //     {
  //       path: 'dashboard', // dashboard
  //       name: 'smart_sourcing-dashboard',
  //       component: Bodygd,
  //       children: [{
  //         path: 'page',
  //         name: 'page-project',
  //         component: () => import('@/view/transition.vue')
  //       }]
  //     },
  //     {
  //       path: 'transition',
  //       name: 'smart_sourcing-transition',
  //       component: Bodygd,
  //       children: [{
  //         path: 'page', // 过渡页
  //         name: 'page-project',
  //         component: () => import('@/view/transition.vue')
  //       }]
  //     }
  //   ]
  // }
  {
    path: "/digital_logisticst",
    name: "digital_logisticst",
    redirect: "/digital_logisticst/dashboard",
    component: Main,
    children: [
      {
        path: "dashboard", // dashboard
        name: "szwl-dashboard",
        component: Bodygd,
        children: [
          {
            path: "page",
            name: "szwl-dashboard-page",
            component: () => import("@/view/transition.vue")
          }
        ]
      },
      // {
      //   path: 'transition',
      //   name: 'szwl-transition',
      //   component: Bodygd,
      //   children: [{
      //     path: 'page', // 过渡页
      //     name: 'szwl-transition-page',
      //     component: () => import('@/view/transition.vue')
      //   }]
      // },
      // 菜单路由配置
      // {
      //   path: 'szwl_contract',// 供应商管理
      //   name: 'szwl_contract',
      //   component: Body,
      //   children: [
      //     {
      //       path: 'sign', // 合同签订
      //       name: 'sign',
      //       component: Inner,
      //       children: [{
      //         path: 'stand', // 合同台账
      //         name: 'stand',
      //         component: () => import('@/view/home.vue')
      //       }]
      //     }
      //   ]
      // },
      // 供应商管理
      {
        path: "szwl_supplier", // 供应商管理 老大
        name: "szwl_supplier",
        component: Body,
        children: [
          {
            path: "sup", // 同上 老二
            name: "sup",
            component: Supplier,
            children: [
              {
                path: "bui", // 基本信息 老三
                name: "bui",
                component: Supplier,
                children: [
                  {
                    path: "stock",
                    name: "stock",
                    component: () => import("@/view/supplier/sup/bui/stock.vue")
                  },
                  {
                    path: "full",
                    name: "full",
                    component: () => import("@/view/supplier/sup/bui/full.vue")
                  },
                  {
                    path: "concern",
                    name: "concern",
                    component: () =>
                      import("@/view/supplier/sup/bui/concern.vue")
                  }
                ]
              },
              {
                path: "apt",
                name: "apt",
                component: () => import("@/view/supplier/sup/apt.vue")
              }
            ]
            // children: [
            //   {
            //     path: "society", // 社会信息 老三
            //     name: "society",
            //     component: Supplier,
            //     children: [
            //       {
            //         path: "judicial",
            //         name: "judicial",
            //         component: () =>
            //           import("@/view/supplier/sup/society/judicial.vue")
            //       },
            //       {
            //         path: "run",
            //         name: "run",
            //         component: () =>
            //           import("@/view/supplier/sup/society/run.vue")
            //       },
            //       {
            //         path: "risk",
            //         name: "risk",
            //         component: () =>
            //           import("@/view/supplier/sup/society/risk.vue")
            //       },
            //       {
            //         path: "move",
            //         name: "move",
            //         component: () =>
            //           import("@/view/supplier/sup/society/move.vue")
            //       },
            //       {
            //         path: "fine",
            //         name: "fine",
            //         component: () =>
            //           import("@/view/supplier/sup/society/fine.vue")
            //       },
            //       {
            //         path: "badly",
            //         name: "badly",
            //         component: () =>
            //           import("@/view/supplier/sup/society/badly.vue")
            //       }
            //     ]
            //   },
            //   {
            //     path: "bad",
            //     name: "bad",
            //     component: () => import("@/view/supplier/sup/bad.vue")
            //   }
            // ]
          }
        ]
      },
      // 风险预警管理
      {
        path: "szwl_venture",
        name: "szwl_venture",
        component: Body,
        children: [
          {
            path: "bd",
            name: "bd",
            component: () => import("@/view/venture/bd.vue")
          }
        ]
      },
      // //灰名单管理
      {
        path: "szwl_gray", // 灰名单管理
        name: "szwl_gray",
        component: Body,
        children: [
          {
            path: "look", // 查看
            name: "look",
            component: () => import("@/view/gray/look.vue")
            // children:[
            //   {
            //     path:'join',
            //     name:'join',
            //     components:()=>import('@/components/body/components/join')
            //   }
            // ]
          },
          {
            path: "manage", // 管理
            name: "manage",
            component: () => import("@/view/gray/manage.vue")
          }
        ]
      }
    ]
  }
];
