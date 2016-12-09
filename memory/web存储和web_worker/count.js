/**
 * Created by Andyliwr on 2016/2/28.
 */
var hour, minute, second = 0;//时，分，秒
var t;//setTimeout()方法
var json = {
    hour: "00",
    minute: "00",
    second: "00"
}

function start() {
    //call start() function every second
    t = setInterval("start()", 1000);

    second++;
    if (second >= 60) {
        second = 0;
        minute++
    }
    if (minute >= 60) {
        minute = 0;
        hour++;
    }
    transfer(json);
    this.postMessage(json);
}

start();

function transfer(json) {
    if (hour >= 0 | hour <= 9) {
        json.hour = "0" + hour;
    }
    if (minute >= 0 | minute <= 9) {
        json.minute = "0" + minute;
    }
    if (second >= 0 | second <= 9) {
        json.second = "0" + second;
    }
}