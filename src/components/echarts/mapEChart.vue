<!--3D地图echart组件封装，如需有对组件进行修改，请通知所有前端开发人员-->
<template>
    <div v-if="mapChartData.bLoading" key="loading" class="flex-c flex-justify-center flex-align-center f-w f-h">
        <icon name="circle-o-notch" class="icon" spin scale="1.5" style="color:#aaa;"></icon>
    </div>
    <div v-else :id="mapChartData.id" class="mapchart-box" :key="mapChartData.id"></div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-gl'
import 'vue-awesome/icons/circle-o-notch'
import jibei from '@/assets/json/jibei.json' // 冀北
import tangshan from '../../assets/json/130200.json' // 唐山
import qinhuangdao from '../../assets/json/130300.json' // 秦皇岛
import zhangjiakou from '../../assets/json/130700.json' // 张家口
import chengde from '../../assets/json/130800.json' // 承德
import langfang from '../../assets/json/131000.json' // 廊坊

// 地图json数据
let mapJson = {
  jibei,
  tangshan,
  qinhuangdao,
  zhangjiakou,
  chengde,
  langfang
}

// 地图图标
const fiveStar =
    'path://m463.27193,186.73462l27.50175,0l8.49825,-26.12654l8.49826,26.12654l27.50174,0l-22.24934,16.14691l8.49869,26.12654l-22.24935,-16.14735l-22.24934,16.14735l8.49869,-26.12654l-22.24935,-16.14691z'
const imgLegendCenter = 'image:///images/resource-overall/map-center.png'
const imgLegendEmergency = 'image:///images/resource-overall/map-emergency.png'
const imgLegendRevolve = 'image:///images/resource-overall/map-revolve.png'
const imgLegendStorage = 'image:///images/resource-overall/map-storage.png'

const imgCenter =
    'path://M929.792 330.752v-1.024h-1.536L529.92 29.696l-10.24-15.872-517.12 389.12 32.768 50.688 68.608-51.712v607.232h825.856V406.016l62.976 47.616 32.768-50.688-95.744-72.192z m-56.832 616.96h-711.68v-588.8l352.768-265.216 358.4 269.824v584.192zM264.192 406.016h103.936v119.808H264.192zM264.192 581.12h103.936v119.808H264.192zM264.192 755.2h103.936v119.808H264.192zM464.896 406.016h103.936v119.808H464.896zM464.896 581.12h103.936v119.808H464.896zM464.896 755.2h103.936v119.808H464.896zM662.016 406.016h103.936v119.808h-103.936zM662.016 581.12h103.936v119.808h-103.936zM662.016 755.2h103.936v119.808h-103.936z'
const imgEmergency =
    'path://M515.8 335.1c8.3 0 16.4 7.2 16.6 11.4l-5.1 239.4v0.8c0 6.4-5.1 11.5-11.5 11.5s-11.5-5.1-11.5-11.5v-0.8l-5.1-239.4c0.2-4.3 8.2-11.4 16.6-11.4m0-30.7c-23.3 0-47.4 18.9-47.4 42.2l5.1 240c0 23.3 18.9 42.2 42.2 42.2 23.3 0 42.2-18.9 42.2-42.2l5.1-240c0.1-23.3-23.9-42.2-47.2-42.2zM515.8 698.1c11.8 0 21.4 9.6 21.4 21.4 0 11.8-9.6 21.4-21.4 21.4-11.8 0-21.4-9.6-21.4-21.4 0-11.8 9.6-21.4 21.4-21.4m0-30.7c-28.8 0-52.1 23.3-52.1 52.1s23.3 52.1 52.1 52.1 52.1-23.3 52.1-52.1-23.3-52.1-52.1-52.1zM513.2 161.1c13.4 0 25.1 6.5 32 18l379.7 628.2c10.2 16.9 3.8 32 0.5 37.8s-12.9 19.1-32.6 19.1H133.5c-19.7 0-29.4-13.3-32.6-19.1-3.2-5.8-9.6-20.9 0.5-37.8l379.7-628.2c7-11.3 18.7-18 32.1-18m0-30.7c-22.5 0-45 11-58.4 32.9L75.1 791.6C47.6 837 80.4 895 133.5 895h759.4c53.1 0 85.7-58 58.4-103.4L571.6 163.3c-13.3-21.9-35.9-32.9-58.4-32.9z'
const imgRevolve =
    'path://M451.66689 712.584388c-13.826913-4.332678-27.257807-10.165524-39.921221-17.333784-12.426007-7.034207-24.196075-15.404852-34.981722-24.88169-10.697643-9.399067-20.47738-19.930935-29.067013-31.302937-8.67559-11.486612-16.193821-23.911596-22.344914-36.928051-6.290263-13.317307-11.186783-27.361161-14.553461-41.73759-3.460822-14.793938-5.323239-30.086226-5.536087-45.449121-0.210801-15.394618 1.238201-30.78412 4.307096-45.744857 2.972705-14.497179 7.507998-28.724205 13.480013-42.290175 5.808286-13.198603 13.025665-25.858948 21.450545-37.629016 8.29799-11.597129 17.821901-22.394033 28.308743-32.090882 10.514471-9.722432 22.053272-18.381649 34.298154-25.739221 12.450567-7.483438 25.721825-13.660114 39.447431-18.36016 14.125719-4.840238 28.851095-8.143471 43.763736-9.8176 7.709589-0.862647 15.560394-1.299599 23.334451-1.299599 11.656481 0 22.070668-7.012717 26.533306-17.871019 4.456498-10.852162 2.01182-23.230074-6.228865-31.53625l-40.166815-40.481993c-5.425569-5.460362-12.634762-8.465812-20.301372-8.465812-7.671727 0-14.883989 3.010567-20.315698 8.483208-10.667967 10.765181-11.157107 27.961842-1.469468 39.315424-7.996115 1.922792-15.888875 4.216022-23.636327 6.869455-17.515932 6.002714-34.463929 13.892405-50.376341 23.451108-15.614629 9.384741-30.322609 20.423145-43.714617 32.80822-13.354146 12.345166-25.487487 26.100448-36.062334 40.881083-10.743692 15.011902-19.952424 31.166837-27.369348 48.016597-7.629771 17.33276-13.423731 35.515888-17.22429 54.042847-3.90903 19.060101-5.755074 38.662555-5.485945 58.259892 0.26606 19.570731 2.6432 39.063691 7.061836 57.93448 4.295839 18.361183 10.55131 36.303834 18.596544 53.334719 7.850805 16.613376 17.440208 32.462343 28.499078 47.099714 10.948353 14.499226 23.407106 27.915793 37.026288 39.877219 13.739932 12.072967 28.745694 22.745027 44.597731 31.718399 16.167215 9.155521 33.322943 16.604166 51.030234 22.154579 2.768043 0.859577 5.627161 1.295506 8.496511 1.295506 12.646018 0 23.664979-8.179286 27.41642-20.348444 2.278903-7.383154 1.569752-15.216563-1.998517-22.060435C464.99136 719.91126 458.990692 714.877617 451.66689 712.584388zM777.588891 479.795531c-2.266623-19.053961-6.590092-37.896098-12.849656-55.996338-6.058996-17.522072-13.984503-34.485419-23.558555-50.41625-9.382695-15.613606-20.407796-30.324656-32.764218-43.721781-12.302187-13.345959-26.012444-25.475208-40.750099-36.049031-14.963807-10.732435-31.068599-19.916609-47.857984-27.291576-8.80862-3.874237-17.931395-7.29822-27.118638-10.177803-2.77009-0.86674-5.63944-1.307785-8.526187-1.307785-12.650111 0-23.670096 8.181333-27.41949 20.35049-2.27788 7.380084-1.567705 15.214517 1.99954 22.057365 3.568269 6.843872 9.56689 11.877515 16.895809 14.174837 7.166213 2.243087 14.301727 4.920056 21.209044 7.956206 13.163811 5.782703 25.781176 12.980639 37.505195 21.393239 11.567453 8.299013 22.330588 17.818831 31.990598 28.296463 9.699919 10.514471 18.349927 22.057365 25.707498 34.3002 7.500834 12.485359 13.707187 25.767873 18.449187 39.479153 4.897543 14.164604 8.281617 28.915563 10.060123 43.844577 1.827625 15.337313 1.985214 30.91101 0.470721 46.291302-1.482771 15.06716-4.581342 29.951149-9.209756 44.239574-4.489244 13.857613-10.450003 27.290553-17.717524 39.925315-7.15291 12.434194-15.611559 24.175609-25.142633 34.899858-9.465582 10.654664-20.044522 20.37198-31.441083 28.874631-11.527544 8.600889-23.963785 16.014742-36.95875 22.033829-13.292748 6.15314-27.270087 10.892071-41.542138 14.08581-14.793938 3.307326-30.05962 4.984524-45.37135 4.984524-11.658528 0-22.073738 7.013741-26.532283 17.86795-4.458545 10.852162-2.01489 23.231097 6.225795 31.53625l40.165792 40.478923c5.424546 5.462408 12.635785 8.468882 20.306488 8.468882 7.673773 0 14.885012-3.009544 20.303418-8.472975 5.425569-5.465478 8.413624-12.734022 8.413624-20.465101 0-6.993275-2.444679-13.608949-6.927783-18.853393 16.799618-4.045129 33.244148-9.769504 48.933479-17.036002 16.57449-7.67275 32.43983-17.130146 47.155996-28.109198 14.508435-10.821463 27.986401-23.197328 40.059368-36.780695 12.146645-13.669324 22.927175-28.637224 32.04381-44.487214 9.278317-16.129352 16.890692-33.284057 22.626323-50.990325 5.91471-18.258852 9.871835-37.264719 11.765975-56.489572C780.113387 519.125281 779.912819 499.308957 777.588891 479.795531z'
const imgStorage =
    'path://M512 479.0272m-239.8208 0a117.1 117.1 0 1 0 479.6416 0 117.1 117.1 0 1 0-479.6416 0ZM512 56.32c-233.472 0-422.7072 189.2352-422.7072 422.7072 0 233.472 189.2352 422.7072 422.7072 422.7072s422.7072-189.2352 422.7072-422.7072C934.7072 245.5552 745.472 56.32 512 56.32zM512 863.8464c-212.5824 0-384.8192-172.2368-384.8192-384.8192S299.4176 94.208 512 94.208s384.8192 172.2368 384.8192 384.8192S724.5824 863.8464 512 863.8464z'

const tower =
  'path://M180 5169 c0 -6 131 -624 290 -1372 240 -1126 290 -1373 290 -1438 l0 -79 -345 0 -344 0 -3 116 c-2 95 -6 119 -19 127 -9 6 -24 7 -33 4 -14 -6 -16 -27 -16 -165 l0 -158 380 -124 380 -124 0 -183 0 -183 -345 0 -345 0 0 120 0 120 -35 0 -35 0 0 -154 0 -154 380 -127 380 -127 0 -249 0 -249 -345 0 -344 0 -3 128 -3 127 -30 0 -30 0 -3 -156 -2 -156 342 -118 c189 -65 370 -128 403 -140 l60 -22 37 -114 c20 -63 51 -160 68 -216 l31 -103 99 0 99 0 31 103 c17 56 48 153 68 216 l37 114 60 22 c33 12 214 75 403 140 l342 118 -2 156 -3 156 -30 0 -30 0 -3 -127 -3 -128 -344 0 -345 0 0 249 0 249 380 127 380 127 0 154 0 154 -35 0 -35 0 0 -120 0 -120 -345 0 -345 0 0 183 0 183 380 124 380 124 0 158 c0 138 -2 159 -16 165 -9 3 -24 2 -33 -4 -13 -8 -17 -32 -19 -127 l-3 -116 -344 0 -345 0 0 79 c0 65 50 312 290 1438 160 748 290 1366 290 1372 0 8 -53 11 -192 9 l-192 -3 -33 -155 c-18 -85 -35 -171 -37 -191 -4 -31 -16 -87 -32 -141 -5 -17 -31 -18 -373 -18 l-368 0 -32 143 c-17 78 -42 192 -55 252 l-22 110 -192 3 c-139 2 -192 -1 -192 -9z'
const project =
  'path://M932.52266667 466.1248c-106.496 26.2144-312.9344-9.8304-367.0016-40.96-43.69066667-24.576-81.37386667 0-81.37386667 0V801.45066667H402.77333333V99.66933333c0-22.39146667 18.0224-40.96 40.96-40.96s40.96 18.0224 40.96 40.96V140.62933333s37.6832-22.9376 91.20426667 4.36906667c94.48106667 48.05973333 357.1712 36.0448 357.1712 36.0448-39.3216 29.4912-68.26666667 63.35146667-74.27413333 146.90986667-6.00746667 74.27413333 73.728 138.17173333 73.728 138.17173333zM361.81333333 710.79253333c0 2.73066667 0.54613333 4.36906667 0 7.09973334-120.69546667 12.56106667-202.06933333 41.50613333-202.06933333 74.82026666 0 44.78293333 153.46346667 81.37386667 344.61013333 81.37386667s344.064-36.59093333 344.064-81.92c0-33.31413333-80.82773333-61.16693333-201.5232-73.728v-67.72053333c166.02453333 16.384 285.0816 71.54346667 285.0816 142.5408 0 90.112-191.6928 162.74773333-428.16853333 162.74773333s-428.16853333-73.18186667-428.16853333-162.74773333c0-70.99733333 119.05706667-123.97226667 285.0816-146.36373334v63.8976z'
const hot =
  'path://M872.4 224.5c-34.8 0-63.1 28.3-63.1 63.1v12.9h-34v-12.9c0-34.8-28.3-63.1-63.1-63.1s-63.1 28.3-63.1 63.1v12.9h-34v-12.9c0-34.8-28.3-63.1-63.1-63.1s-63.1 28.3-63.1 63.1v12.9h-34v-12.9c0-34.8-28.3-63.1-63.1-63.1s-63.1 28.3-63.1 63.1v12.9h-34v-12.9c0-34.8-28.3-63.1-63.1-63.1s-63.1 28.3-63.1 63.1v44.6h-21.3v-11.3c0-24.5-19.9-44.4-44.4-44.4s-44.4 19.9-44.4 44.4v47.9c0 24.5 19.9 44.4 44.4 44.4s44.4-19.9 44.4-44.4v-11.3h21.3V844.3h75.7v-60.6c28.8-5.9 50.5-31.4 50.5-61.8v-19.8h34v19.8c0 34.8 28.3 63.1 63.1 63.1s63.1-28.3 63.1-63.1v-19.8h34v19.8c0 34.8 28.3 63.1 63.1 63.1s63.1-28.3 63.1-63.1v-19.8h34v19.8c0 34.8 28.3 63.1 63.1 63.1s63.1-28.3 63.1-63.1v-19.8h34v19.8c0 30.5 21.7 56 50.5 61.8v60.6h75.7V287.6c0-34.8-28.3-63.1-63.1-63.1zM122.1 368.8c0 10.5-8.6 19.1-19.1 19.1s-19.1-8.6-19.1-19.1v-47.9c0-10.5 8.6-19.1 19.1-19.1s19.1 8.6 19.1 19.1v47.9z m71.8 450.3v-47c7.4 5.6 15.9 9.8 25.2 11.7v35.3h-25.2z m75.7-97.2c0 20.9-17 37.9-37.9 37.9s-37.9-17-37.9-37.9V287.6c0-20.9 17-37.9 37.9-37.9s37.9 17 37.9 37.9v434.3z m59.2-396.1v60.9h-34v-60.9h34z m0 86.1v181.9h-34V411.9h34z m-34 264.9V619h34v57.8h-34z m134.9 45.1c0 20.9-17 37.9-37.9 37.9s-37.9-17-37.9-37.9V287.6c0-20.9 17-37.9 37.9-37.9s37.9 17 37.9 37.9v434.3zM489 325.8v60.9h-34v-60.9h34z m0 86.1v181.9h-34V411.9h34z m-34 264.9V619h34v57.8h-34z m134.9 45.1c0 20.9-17 37.9-37.9 37.9s-37.9-17-37.9-37.9V287.6c0-20.9 17-37.9 37.9-37.9s37.9 17 37.9 37.9v434.3z m59.2-396.1v60.9h-34v-60.9h34z m0 86.1v181.9h-34V411.9h34z m-34 264.9V619h34v57.8h-34z m135 45.1c0 20.9-17 37.9-37.9 37.9s-37.9-17-37.9-37.9V287.6c0-20.9 17-37.9 37.9-37.9s37.9 17 37.9 37.9v434.3z m59.2-396.1v60.9h-34v-60.9h34z m0 86.1v181.9h-34V411.9h34z m-34 264.9V619h34v57.8h-34zM885 819.1v-35.3c9.4-1.9 17.9-6.1 25.2-11.7v47H885z m25.2-97.2c0 20.9-17 37.9-37.9 37.9s-37.9-17-37.9-37.9V287.6c0-20.9 17-37.9 37.9-37.9s37.9 17 37.9 37.9v434.3z'
const sun =
  'path://M569.581986 391.004438l46.216439 8.677792 71.427275 86.346085-57.238468-10.034982-60.405246-84.988895zM482.762941 534.712372l115.14525 23.750829L739.333578 735.874691l-128.747997-12.276402-127.82264-188.885917zM176.953033 470.482318l136.49015 33.189469L430.069004 707.178344l-162.276764-14.68233-90.839207-222.013696M198.184834 470.482318l110.096913 232.254313-44.077836-8.513284-87.250878-227.627528 21.231801 3.886499M221.647773 285.719381l112.893548 31.328473 54.421271 108.42099-133.83746-29.364661-33.477359-110.384802M240.010968 297.923811l57.022552 98.478543-32.397775-13.253168-42.987972-85.225375h18.363195M980.944277 802.191939q-1.028174 0-2.056348-0.092535l-726.220134-67.787538a21.591662 21.591662 0 0 1-17.787417-12.883025L23.261525 235.369681a21.591662 21.591662 0 0 1 25.478162-29.446915l581.854168 158.606182a21.591662 21.591662 0 0 1 10.363997 6.384962l356.025946 395.230235a21.591662 21.591662 0 0 1-16.039521 36.047794zM269.38591 692.496014l658.494287 61.464265-314.765307-349.435348-532.285881-145.106251M605.074566 560.355041a10.795831 10.795831 0 0 1-2.056349-0.195353l-158.71928-30.845231a10.795831 10.795831 0 0 1-6.991586-4.709039l-57.320722-88.176236a10.795831 10.795831 0 0 1 11.443581-16.45079L546.859332 455.296183a10.795831 10.795831 0 0 1 6.354118 4.194951l60.662289 83.775649a10.795831 10.795831 0 0 1-8.739482 17.129385z m-152.169809-51.408719l127.401088 24.768721-42.206558-58.328333-125.51953-28.429022zM267.802522 410.488343a10.795831 10.795831 0 0 1-9.407796-5.48017l-66.132177-116.841737a10.795831 10.795831 0 0 1 18.795028-10.631323l66.132177 116.841737a10.795831 10.795831 0 0 1-9.387232 16.111493M400.807161 436.264675a10.785549 10.785549 0 0 1-9.068499-4.914674l-66.831335-102.94082A10.795831 10.795831 0 0 1 342.982633 316.677712l66.831335 102.940819a10.795831 10.795831 0 0 1-9.047934 16.676989zM523.519774 463.387915a10.785549 10.785549 0 0 1-8.698356-4.390305l-71.550655-96.997971a10.795831 10.795831 0 0 1 17.376147-12.821335L532.197566 446.227684a10.795831 10.795831 0 0 1-8.677792 17.201358zM636.721774 495.045404a10.775268 10.775268 0 0 1-8.379621-3.979035l-82.336205-101.100387A10.795831 10.795831 0 1 1 562.744627 376.311826l82.336205 101.100388a10.795831 10.795831 0 0 1-8.36934 17.612627M400.807161 436.264675a10.785549 10.785549 0 0 1-9.068499-4.914674l-66.831335-102.94082A10.795831 10.795831 0 0 1 342.982633 316.677712l66.831335 102.940819a10.795831 10.795831 0 0 1-9.047934 16.676989zM523.519774 463.387915a10.785549 10.785549 0 0 1-8.698356-4.390305l-71.550655-96.997971a10.795831 10.795831 0 0 1 17.376147-12.821335L532.197566 446.227684a10.795831 10.795831 0 0 1-8.677792 17.201358zM636.721774 495.045404a10.775268 10.775268 0 0 1-8.379621-3.979035l-82.336205-101.100387A10.795831 10.795831 0 1 1 562.744627 376.311826l82.336205 101.100388a10.795831 10.795831 0 0 1-8.36934 17.612627M721.926585 517.480169a10.816395 10.816395 0 0 1-2.4779-0.287888L113.216503 374.923791A10.795831 10.795831 0 0 1 118.110613 353.907906l606.273309 142.26849a10.795831 10.795831 0 0 1-2.457337 21.303773zM788.058762 601.173565a10.84724 10.84724 0 0 1-2.190011-0.226199L154.281788 470.90387a10.795831 10.795831 0 0 1 4.359459-21.149547L790.22821 579.797819a10.795831 10.795831 0 0 1-2.169448 21.375746M441.985545 725.72661a10.785549 10.785549 0 0 1-9.397514-5.459606L306.41047 498.458943a10.795831 10.795831 0 1 1 18.764183-10.67245l126.156997 221.808061a10.795831 10.795831 0 0 1-9.346105 16.132056zM610.606144 746.670522a10.785549 10.785549 0 0 1-8.975962-4.781011L461.891001 533.715043a10.795831 10.795831 0 1 1 17.931361-12.02964l139.7289 208.164186a10.795831 10.795831 0 0 1-8.945118 16.820933zM751.681952 757.692552a10.775268 10.775268 0 0 1-8.523565-4.164107L596.551001 565.084644a10.795831 10.795831 0 1 1 17.036849-13.253168L760.195236 740.285559a10.795831 10.795831 0 0 1-8.513284 17.427556zM870.734265 772.015021a10.775268 10.775268 0 0 1-8.297368-3.886499L708.50891 583.437556A10.795831 10.795831 0 0 1 725.093363 569.608611l153.917705 184.701247a10.795831 10.795831 0 0 1-8.276803 17.705163M857.367998 1024H267.79224a21.591662 21.591662 0 0 1-17.417274-34.351306l187.559572-256.015423a21.591662 21.591662 0 0 1 34.834548 25.519288L310.379223 980.816676h496.60823L598.268052 761.21919a21.591662 21.591662 0 1 1 31.297628-29.755367l243.389441 256.015423A21.591662 21.591662 0 0 1 857.367998 1024z'
const bdz = 'path://M30 975 l0 -315 30 0 c28 0 30 -2 24 -27 -3 -16 -13 -32 -22 -38 -47 -29 -62 -54 -62 -100 0 -63 31 -95 93 -95 62 0 97 35 97 97 0 34 -6 50 -25 69 -24 23 -25 29 -15 60 11 33 14 34 61 34 l49 0 0 130 c0 80 4 130 10 130 6 0 10 -50 10 -130 l0 -130 40 0 c44 0 43 1 30 -55 -6 -28 -6 -42 3 -47 16 -10 4 -19 -35 -27 -41 -9 -50 -38 -14 -47 37 -9 33 -32 -6 -36 -42 -4 -51 -34 -14 -44 36 -9 32 -22 -6 -26 -44 -4 -49 -32 -9 -46 40 -14 39 -30 -1 -34 -42 -4 -51 -34 -14 -44 39 -10 33 -34 -9 -34 -45 0 -48 -27 -4 -43 29 -11 30 -14 24 -52 -13 -73 -12 -80 16 -83 27 -3 39 15 39 61 0 27 23 45 61 49 45 4 51 32 10 46 -43 15 -38 32 9 32 49 0 55 26 10 43 -38 14 -34 31 8 35 39 4 43 28 7 44 -31 14 -23 28 16 28 36 0 39 26 5 41 -32 15 -22 39 15 39 37 0 39 26 4 42 -28 13 -31 23 -11 43 8 8 17 37 21 65 l7 50 84 0 84 0 0 -55 c0 -42 3 -55 15 -55 27 0 16 -28 -15 -39 -34 -11 -40 -37 -10 -46 27 -9 25 -33 -2 -37 -35 -5 -31 -42 5 -46 36 -4 34 -18 -4 -26 -39 -8 -37 -39 4 -44 36 -4 34 -25 -4 -39 -37 -14 -34 -36 6 -43 33 -6 46 -30 17 -30 -30 0 -52 -11 -52 -25 0 -14 22 -25 51 -25 13 0 19 -7 19 -23 0 -13 3 -27 7 -31 4 -4 6 -27 4 -52 -3 -45 -2 -45 26 -42 27 3 28 5 29 60 2 74 7 86 41 90 41 4 44 36 4 44 -39 8 -40 23 -1 30 41 9 41 40 -1 49 -35 8 -34 27 2 35 33 8 36 36 5 44 -32 8 -34 24 -4 28 33 4 35 36 4 44 -35 8 -33 30 4 37 41 9 38 33 -5 47 -31 10 -50 40 -25 40 6 0 10 25 10 55 l0 55 79 0 79 0 11 -50 c6 -28 11 -58 11 -67 0 -10 6 -13 16 -9 27 10 10 -18 -20 -32 -31 -16 -32 -45 -1 -50 47 -7 49 -13 16 -33 -40 -24 -36 -42 10 -49 l34 -6 -33 -17 c-41 -23 -37 -41 11 -45 43 -4 48 -18 12 -32 -16 -6 -25 -17 -25 -31 0 -18 5 -21 35 -17 44 5 46 -13 4 -29 -21 -8 -30 -17 -27 -30 3 -14 12 -18 41 -16 27 2 37 -2 37 -12 0 -8 5 -15 10 -15 6 0 10 -10 10 -22 0 -47 12 -68 36 -68 20 0 24 5 24 33 0 17 -4 38 -9 45 -14 23 0 63 26 73 29 11 28 42 -2 47 -46 7 -50 13 -17 27 17 8 32 21 32 29 0 17 -31 29 -54 20 -27 -10 -19 22 9 34 36 16 33 42 -5 42 -37 0 -39 12 -5 30 31 17 27 34 -7 38 -36 4 -42 27 -11 41 36 17 27 46 -15 45 -21 -1 -32 3 -32 12 0 8 4 14 9 14 5 0 5 16 0 38 -13 58 -12 62 26 62 l35 0 0 315 0 315 -425 0 -425 0 0 -55 c0 -30 -4 -55 -10 -55 -5 0 -10 25 -10 55 l0 55 -115 0 -115 0 0 -315z m715 125 c59 -67 105 -123 103 -125 -3 -3 -46 4 -98 15 -51 12 -94 19 -97 17 -2 -3 39 -57 91 -120 53 -64 96 -118 96 -122 0 -3 -41 -4 -91 -3 l-91 3 -90 168 c-49 93 -88 170 -86 172 1 1 44 -4 95 -13 51 -9 95 -13 99 -9 3 3 -5 35 -19 71 -14 37 -24 66 -22 66 1 0 51 -54 110 -120z'
const huoju = 'path://M20.2,47.7s-1.1-13.5,4.3-23.9a5.9,5.9,0,0,1-2.7.5S21,22.2,24,20.7a20.7,20.7,0,0,1,4.3-1.5s3.7-.8,3.9-2.6c0,0-.6,1.2-4.5,1.3,0,0-5.5-.1-6.5,2.5a3.6,3.6,0,0,0-.3,1.2,4.7,4.7,0,0,0,.7,2.6H19.9a5.7,5.7,0,0,1,.6-4.3s1.9-2.3,6.9-3.7c0,0,5.9-1.3,6.5-1.7s4.9-1.4,5-4.2c0,0-1,1.5-5.8,2.2,0,0-8.7.7-9.6,1.2s-5.6,1.3-5.1,6.4a10.9,10.9,0,0,0,1.3,4l-1.2-.4a6.7,6.7,0,0,1-.9-6.6s2.1-4.6,10.2-6.9c0,0,8.7-1.6,12.7-4.5,0,0,2.4-1.8,2.5-3.9,0,0-2.5,3.4-13.2,3.7,0,0-12.4-.8-16.7,4.8a7.7,7.7,0,0,0,.4,9,37.7,37.7,0,0,0,4.4,4.3s-6.3-2.5-7-6.3c0,0-.1,9.2,8.4,30.4C19.1,47.7,19.7,48.7,20.2,47.7Z'
// 地图标题
const mapTitle = {
  show: false,
  text: '',
  x: 'center',
  top: '20',
  textStyle: {
    color: '#000',
    fontSize: 24
  }
}
// 地图tooltip属性
const defalutTooltip = {
  show: true,
  backgroundColor: 'rgba(5, 40, 75, 0.5)',
  opacity: 0.8,
  padding: 0,
  formatter: p => {
    if (p.data.inventoryData) {
      var ret = `<div style="font-size:16px;min-width:100%;min-height:100%;padding:5px 10px;line-height:28px;position:relative">
                 <h4 style="font-size:18px;">${p.data.rename}</h4> `
      if (p.data.inventoryData) {
        ret = ret + `
                 <h5>实物库存资源</h5>
                  <p>
                    <label style="color:#fff;">条目数: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.inventoryData.value2}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">条</span>
                  </p>
                  <p>
                    <label style="color:#fff;">金额: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.inventoryData.value1}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">万元</span>
                  </p>
                `
      }
      if (p.data.contractData) {
        ret = ret + `
                 <h5>可用合同资源</h5>
                  <p>
                    <label style="color:#fff;">条目数: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.contractData.value2}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">条</span>
                  </p>
                  <p>
                    <label style="color:#fff;">金额: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.contractData.value1}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">万元</span>
                  </p>
                `
      }
      ret = ret + `
                <span style="position: absolute;left:0;bottom:0;border-color: #0ff;width: 10px;height: 10px;border-bottom-width:  2px;border-bottom-style: solid;border-left-width: 2px;border-left-style: solid;"></span>
                <span style="position: absolute;right:0;bottom:0;border-color: #0ff;width: 10px;height: 10px;border-bottom-width:  2px;border-bottom-style: solid;border-right-width: 2px;border-right-style: solid;"></span>
                <span style="position: absolute;right:0;top:0;border-color: #0ff;width: 10px;height: 10px;border-top-width:  2px;border-top-style: solid;border-right-width: 2px;border-right-style: solid;"></span>
                <span style="position: absolute;left:0;top:0;border-color: #0ff;width: 10px;height: 10px;border-top-width:  2px;border-top-style: solid;border-left-width: 2px;border-left-style: solid;"></span>
                </div>
            `
      return ret
    }
  }
}
// 地图视图倾斜角度
const defalutviewControl = {
  distance: 120,
  zoomSensitivity: 0, // 缩放操作的灵敏度，值越大越灵敏。默认为1
  alpha: 70, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。
  beta: 0, // 视角绕 y 轴，即左右旋转的角度。
  rotateSensitivity: 0// 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1
}
// 地图图例样式
const label = {
  show: true,
  distance: 0.01,
  // formatter: '{b}: {c}'
  textStyle: {
    color: '#fff', // 地图初始化地区字体颜色
    fontSize: 16,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,0)'
  }
}
// 地图图形和标签的样式
const itemStyle = {
  color: '#15bba0',
  opacity: 1,
  borderWidth: 0.8, // 图形描边的宽度。加上描边后可以更清晰的区分每个区域
  borderColor: '#fff' // 地图边界线颜色
}
// 地图鼠标hover高亮时图形和标签的样式
const emphasis = {
  label: {
    show: true,
    distance: 0.01,
    // formatter: '{b}: {c}'
    textStyle: {
      color: '#fff', // 地图初始化地区字体颜色
      fontSize: 16,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,0)'
    }
  },
  itemStyle: {
    color: 'rgba(21, 187, 160, 0.8)', // 地图颜色 hover
    opacity: 1,
    borderWidth: 0.8,
    borderColor: '#fff' // 地图边界线颜色
  }
}
// 地图widht
const boxWidth = 100
// 地图height
const boxHeight = 5
// 地图boxDepth
const boxDepth = 100
// 地图位置
const top = -20

// 地图默认样式
const def3DOption = {
  boxWidth,
  boxHeight,
  boxDepth,
  top,
  instancing: true, // instancing会将 GeoJSON 中所有的 geometry 合并成一个，在 GeoJSON 拥有特别多（上千）的 geometry 时可以有效提升绘制效率。
  label: label,
  itemStyle: itemStyle,
  emphasis: emphasis
}
// 北京位置五角星标记
const bjStarData = [{
  name: '北京',
  type: 'scatter3D', // 北京五角星图标
  coordinateSystem: 'geo3D',
  data: [[116.3984298706, 39.9027571617, 1]],
  zlevel: 4,
  symbol: fiveStar,
  symbolSize: 20,
  label: {
    show: false,
    formatter: ''
  },
  tooltip: {
    show: false
  },
  itemStyle: {
    normal: {
      color: 'red'
    }
  }
}]
// 太子城火炬位置
const huojuData = [{
  name: '太子城',
  type: 'scatter3D', // 北京五角星图标
  coordinateSystem: 'geo3D',
  data: [[115.335158, 40.920615, 1]],
  zlevel: 4,
  symbol: huoju,
  symbolSize: 20,
  label: {
    show: false,
    formatter: ''
  },
  tooltip: {
    show: false
  },
  itemStyle: {
    normal: {
      color: 'red'
    }
  }
}]
// 张家口项目部位置
const projectData = [{
  name: '项目部',
  type: 'scatter3D', // 北京五角星图标
  coordinateSystem: 'geo3D',
  data: [[114.89421, 40.79795, 1]],
  zlevel: 4,
  symbol: project,
  symbolSize: 20,
  label: {
    show: false,
    formatter: ''
  },
  tooltip: {
    show: false
  },
  itemStyle: {
    normal: {
      color: 'red'
    }
  }
}]
// 地图数据格式
const getMapFormatter = (mapName, mapData, tooltip, legendData, scatterData, barData, lineData, viewControl, bjStarData) => ({
  title: mapTitle,
  tooltip: tooltip,
  legend: {
    show: true,
    data: legendData,
    right: 15,
    top: 20,
    orient: 'vertical',
    itemGap: 20,
    itemWidth: 25, // 图例每个图像的高度
    itemHeight: 25
  },
  geo3D: {
    zlevel: 1,
    show: false,
    map: mapName,
    viewControl: viewControl,
    ...def3DOption
  },
  series: [
    {
      type: 'map3D', // 3d地图
      name: null,
      zlevel: 2,
      map: mapName,
      viewControl: viewControl,
      ...def3DOption,
      data: mapData
    },
    ...scatterData,
    ...barData,
    ...lineData,
    ...bjStarData
  ]
})
// Legend 图例数据
const getLegendFormatter = (name, icon, iconSize, color) => ({
  name: name, // 图例名称
  symbol: icon, // 图例图标
  symbolSize: iconSize, // 图例大小
  textStyle: {
    // 图例文字的样式
    color: color || '#333', // 图例颜色
    fontSize: 16,
    padding: [0, 0, 0, 15]
  }
})
// scatter series 数据
const getDefScatter3DFormatter = (name, symbol, size, data, color) => ({
  type: 'scatter3D',
  name: name,
  coordinateSystem: 'geo3D',
  zlevel: 2,
  symbol: symbol, // 图标
  symbolSize: size, // 图标大小
  symbolRotate: 90,
  label: {
    show: false
  },
  emphasis: {
    label: {
      show: false
    }
  },
  tooltip: {
    show: false,
    formatter: p => {
      var ret = `<div style="font-size:16px;min-width:100%;min-height:100%;padding:5px 10px;line-height:28px;position:relative;">
                  <p>
                    <label style="color:#fff">${p.seriesName}: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.name}</span>
                  </p>
                  <p>
                    <label style="color:#fff">条目数: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.value1}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">条</span>
                  </p>
                  <p>
                    <label style="color:#fff">金额: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.value2}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">万元</span>
                  </p>
                  <span style="position: absolute;left:0;bottom:0;border-color: #0ff;width: 10px;height: 10px;border-bottom-width:  2px;border-bottom-style: solid;border-left-width: 2px;border-left-style: solid;"></span>
                  <span style="position: absolute;right:0;bottom:0;border-color: #0ff;width: 10px;height: 10px;border-bottom-width:  2px;border-bottom-style: solid;border-right-width: 2px;border-right-style: solid;"></span>
                  <span style="position: absolute;right:0;top:0;border-color: #0ff;width: 10px;height: 10px;border-top-width:  2px;border-top-style: solid;border-right-width: 2px;border-right-style: solid;"></span>
                  <span style="position: absolute;left:0;top:0;border-color: #0ff;width: 10px;height: 10px;border-top-width:  2px;border-top-style: solid;border-left-width: 2px;border-left-style: solid;"></span>
                </div>
                `
      return ret
    },
    backgroundColor: 'rgba(5, 40, 75, 0.3)',
    opacity: 0.8,
    padding: 0
  },
  itemStyle: {
    normal: {
      color: color
    }
  },
  data: data
})
// bar3D series 数据
const getDefBar3DFormatter = (name, data) => ({
  name: name,
  type: 'bar3D',
  coordinateSystem: 'geo3D',
  zlevel: 2,
  label: {
    show: false
  },
  emphasis: {
    label: {
      show: false
    }
  },
  itemStyle: {
    normal: {
      color: '#fff',
      opacity: 0.001 // bar透明度
    }
  },
  tooltip: {
    show: true,
    formatter: p => {
      var ret = `<div style="font-size:16px;min-width:100%;min-height:100%;padding:5px 10px;line-height:28px;position:relative;">
                  <p>
                    <label style="color:#fff">${p.seriesName}: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.name}</span>
                  </p>
                  <p>
                    <label style="color:#fff">条目数: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.value1}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">条</span>
                  </p>
                  <p>
                    <label style="color:#fff">金额: </label>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">${p.data.value2}</span>
                    <span style="color: #12dcc9;font-family: fontliquidcrystal;">万元</span>
                  </p>
                  <span style="position: absolute;left:0;bottom:0;border-color: #0ff;width: 10px;height: 10px;border-bottom-width:  2px;border-bottom-style: solid;border-left-width: 2px;border-left-style: solid;"></span>
                  <span style="position: absolute;right:0;bottom:0;border-color: #0ff;width: 10px;height: 10px;border-bottom-width:  2px;border-bottom-style: solid;border-right-width: 2px;border-right-style: solid;"></span>
                  <span style="position: absolute;right:0;top:0;border-color: #0ff;width: 10px;height: 10px;border-top-width:  2px;border-top-style: solid;border-right-width: 2px;border-right-style: solid;"></span>
                  <span style="position: absolute;left:0;top:0;border-color: #0ff;width: 10px;height: 10px;border-top-width:  2px;border-top-style: solid;border-left-width: 2px;border-left-style: solid;"></span>
                </div>
                `
      return ret
    },
    backgroundColor: 'rgba(5, 40, 75, 0.3)',
    opacity: 0.8,
    padding: 0
  },
  data: data
})

const lineZ = 0.5 // 垂直误差调整
const lineDis = 0.1 // 两根电线间的距离
const lineEffect = {
  show: true,
  constantSpeed: 8,
  trailLength: 0.15,
  trailColor: '#fff000',
  symbolSize: 2,
  symbol: 'circle',
  loop: true
}
// 电线 电流 样式
export const lines3D1 = {
  effect: lineEffect,
  lineStyle: {
    normal: {
      color: '#48ff89',
      opacity: 1,
      curveness: 0.3,
      width: 1
    }
  },
  silent: true
}
export const lines3D2 = {
  effect: lineEffect,
  lineStyle: {
    normal: {
      color: '#48ff89',
      opacity: 1,
      curveness: 0.3,
      width: 1
    }
  },
  silent: true
}
export const lines3D11 = {
  effect: lineEffect,
  lineStyle: {
    normal: {
      color: '#48ff89',
      opacity: 1,
      curveness: 0.3,
      width: 3
    }
  },
  silent: true
}
export const lines3D22 = {
  effect: lineEffect,
  lineStyle: {
    normal: {
      color: '#48ff89',
      opacity: 1,
      curveness: 0.3,
      width: 1.6
    }
  },
  silent: true
}
export const lines3D33 = {
  effect: lineEffect,
  lineStyle: {
    normal: {
      color: '#48ff89',
      opacity: 1,
      curveness: 0.3,
      width: 0.5
    }
  },
  silent: true
}
// lines3D series 数据
const getDefLines3DFormatter = (name, data, linesStyle) => ({
  name: name,
  type: 'lines3D',
  coordinateSystem: 'geo3D',
  ...linesStyle,
  polyline: true,
  silent: true,
  data: data
})
// 深拷贝
const deepCopy = (arr) => {
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
// 此方法：地图数据格式化，给地图上图标位置 加个高度2
const dataFormatter = (data) => {
  let dataArr = deepCopy(data)
  dataArr.forEach(item => {
    item.value.push(2)
  })
  return dataArr
}

export default {
  name: 'mapEchart',
  data () {
    return {
      echart: '',
      // 地图option
      mapOption: {},
      timeout: ''
    }
  },
  mounted () {
    if (!this.mapChartData.bLoading) {
      this.$nextTick(() => {
        this.handleIntOption()
      })
    }
  },
  watch: {
    mapChartData: {
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
  props: {
    // 地图数据
    mapChartData: Object
    // 组件调用传参demo
    // mapChartDataDemo: {
    //   id: 'map',
    //   mapName: 'jibei', // 地图json
    //   bLoading: false,
    //   isShowMark: true, // 是否显示图标 true:显示 false：不显示
    //   isShowline: false, // 是都显示线路图 true:显示 false：不显示
    //   isShowTooltip: true, // 是否tooltip true:显示 false：不显示
    //   isShowLenged: true, // 是否lenged true:显示 false：不显示
    //   legendColor: '#333', // 图例颜色
    //   alpha:70,//倾斜角度
    //   distance: 140, // 地图展示大小
    //   data: {
    //     // 地图数据
    //     mapdata: [],
    //     // 图标数据
    //     markData: {
    //       // 图标位置
    //       // 中心库
    //       center: [
    //       ],
    //       // 国网应急库
    //       emergency: [
    //       ],
    //       // 仓储点
    //       storage: [
    //       ],
    //       // 周转库
    //       revolve: [
    //       ]
    //     }
    //   }
    // }
  },
  methods: {
    /**
     * 数据赋值
     */
    changeData () {
      // map名字
      let mapName = this.mapChartData.mapName
      // 不同地区显示不同图标
      let starDatadef = []
      if (this.mapChartData.mapName === 'jibei') {
        starDatadef = bjStarData
      } else if (this.mapChartData.mapName === 'zhangjiakou') {
        starDatadef = [...huojuData, ...projectData]
      }
      // map数据
      let mapData = this.mapChartData.data.mapdata
      // tooltip
      let tooltip = {
        ...defalutTooltip,
        show: this.mapChartData.isShowTooltip
      }
      // viewControl
      let viewControl = {
        ...defalutviewControl,
        distance: this.mapChartData.distance || 120,
        alpha: this.mapChartData.alpha || 70
      }
      // 图例数据
      let legendData = []
      if (this.mapChartData.isShowLenged) {
        legendData.push(getLegendFormatter('中心库', imgLegendCenter, 25, this.mapChartData.legendColor))
        legendData.push(getLegendFormatter('国网储备库', imgLegendEmergency, 20, this.mapChartData.legendColor))
        legendData.push(getLegendFormatter('仓储点', imgLegendStorage, 15, this.mapChartData.legendColor))
        legendData.push(getLegendFormatter('周转库', imgLegendRevolve, 20, this.mapChartData.legendColor))
      }

      // 线路图
      let lineData = []
      // bar3D数据
      let barData = []
      // Scatter3D 数据
      let scatterData = []

      // 中心库、国网储备库、仓储点、周转库
      if (this.mapChartData.isShowMark) {
        let centerData = dataFormatter(this.mapChartData.data.markData.center)
        let emergencyData = dataFormatter(this.mapChartData.data.markData.emergency)
        let storageData = dataFormatter(this.mapChartData.data.markData.storage)
        let revolveData = dataFormatter(this.mapChartData.data.markData.revolve)
        scatterData.push(getDefScatter3DFormatter('中心库', imgCenter, 25, centerData, '#f00'))
        barData.push(getDefBar3DFormatter('中心库', centerData))
        scatterData.push(getDefScatter3DFormatter('国网储备库', imgEmergency, 20, emergencyData, '#facc14'))
        barData.push(getDefBar3DFormatter('国网储备库', emergencyData))
        scatterData.push(getDefScatter3DFormatter('仓储点', imgStorage, 15, storageData, '#00ff4e'))
        barData.push(getDefBar3DFormatter('仓储点', storageData))
        scatterData.push(getDefScatter3DFormatter('周转库', imgRevolve, 20, revolveData, '#ff7e00'))
        barData.push(getDefBar3DFormatter('周转库', revolveData))
      }
      this.mapOption = getMapFormatter(mapName, mapData, tooltip, legendData, scatterData, barData, lineData, viewControl, starDatadef)
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
      }, 2000)
    },
    /**
     * 初始化
     */
    handleIntOption () {
      this.changeData()
      echarts.registerMap(this.mapChartData.mapName, mapJson[this.mapChartData.mapName])
      let c = echarts.init(document.getElementById(this.mapChartData.id))
      c.clear()
      c.setOption(this.mapOption)
      c.on('click', this.mapChartData.onClick)
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
.mapchart-box{
  width: 100%;
  height: 100%;
}
</style>
