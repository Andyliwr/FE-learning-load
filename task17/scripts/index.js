/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = {num: 0, height: 0,color: ''};
    returnData[datStr].num = Math.ceil(Math.random() * seed);
    returnData[datStr].height = (returnData[datStr].num*100/seed).toFixed(2);
    returnData[datStr].color = whichColor(returnData[datStr].num*100/seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

// 决定要用那种颜色的函数
function whichColor(zhishu) {
    if (zhishu < 0) {
        return '#FFFFFF';
    } else if (0 <= zhishu && zhishu < 20) {
        return '#5CB85C';
    } else if (20 <= zhishu && zhishu < 40) {
        return '#3071A9';
    } else if (40 <= zhishu && zhishu < 60) {
        return '#5BC0DE';
    } else if (60 <= zhishu && zhishu < 80) {
        return '#F0AD4E';
    } else if (80 <= zhishu && zhishu < 100) {
        return '#D9534F';
    } else {
        return '#FFFFFF';
    }
}

/**
 * 渲染图表
 */
function renderChart(cdata) {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var selectHTML = '';
  for(var item in aqiSourceData){
    selectHTML += '<option value="'+ item +'">'+ item +'</option>';
  }
  document.querySelector('#city-select').innerHTML = '<select id="city-select">' + selectHTML + '</select>';
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  //默认显示日
  chartData = {
    x: {name: '城市', xwidth: 500, per: 16},
    y: {name: '空气质量指数', yheight: 500, per: 5},
    data: aqiSourceData
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart(chartData);
}

init();
