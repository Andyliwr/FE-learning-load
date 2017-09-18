// 动态添加css样式
function addNewStyle(cssUrl) {
  var styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.id = 'append_css';
  styleElement.src = cssUrl;
  document.getElementsByTagName('head')[0].appendChild(styleElement);
}

addNewStyle('../static/css/style.css');
