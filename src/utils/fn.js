//时间戳转年、月、日、时、分、秒
/*
 * 参数1-date：为13位时间戳 number
 * 参数2-t： 返回值类型：
  *   dateTime日期时间类型
  *   date日期类型
 * */
export function timestampTime(date, t) {
//      var date = new Date(date*1000);//如果date为13位不需要乘1000
  var date = new Date(date);
  if (t === "dateTime") {
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

    return Y + M + D + h + m + s;
  } else if (t === "date") {
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

    return Y + M + D;
  }else if (t === "time") {
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

    return h + m + s;
  }

}
//获取本月第一天或最后一天
/*
 *参数1-type：'mothFirst'或'mothLast' str
 *
 */
export function getCurrentMonth(type) {
  var date = new Date();
  var year = date.getFullYear() + "";
  var month = (date.getMonth() + 1) + "";
  var month_first = year + "-" + month + "-01 00:00:00";

  var lastDateOfCurrentMonth = new Date(year, month, 0);
  var month_last = year + "-" + month + "-" + lastDateOfCurrentMonth.getDate() + " 59:59:59";
  if (type === "mothFirst") {
    return month_first
  } else if (type === "mothLast") {
    return month_last
  }

}
/*
 *【日期】获取上个月第一天或最后一天
 *  参数1-t：值为	firstDay/lastDay   str
 */
export function getLastMonth(t) {
  var nowdays = new Date();
  var year = nowdays.getFullYear();
  var month = nowdays.getMonth();
  if (month == 0) {
    month = 12;
    year = year - 1;
  }
  if (month < 10) {
    month = "0" + month;
  }
  var firstDay = year + "-" + month + "-" + "01";//上个月的第一天

  var myDate = new Date(year, month, 0);
  var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天

  if (t === 'firstDay') {
    return firstDay
  } else if (t === 'lastDay') {
    return lastDay
  }

}

//获取下个月某一天
export function getNextMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  var year2 = year;
  var month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  return t2;
}


//正则表达式获取url地址栏参数
/*
 *参数1：参数名 str
 * */
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}
//数组去重
/*
 * 参数1：数组 arr
 * */
export function removeRepet (arr) {
  return Array.from(new Set(arr));
}
//数组对象去重
/*
 * 参数1：数组对象，arrObj
 * 参数二：属性名  str
 * */
export function arrayUnique(arrObj, name){
  var hash = {};
  return arrObj.reduce(function (item, next) {
    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
    return item;
  }, []);
}

//数组对象 查找是否存在某元素 返回 -1或下标
/*
 * 参数1：数组对象 arrObj
 * 参数2：属性  str
 * 参数3：值    str
 * */
export function findElem(arrObj, attr, val) {
  for (var i = 0; i < arrObj.length; i++) {
    if (arrObj[i][attr] == val) {
      return i;
    }
  }
  return -1;
}
//根据区间，获取随机整数
/*
 * 参数1：最小值
 * 参数2：最大值
 * 返回值：整数
 * */
export function randomNum(n, m){
  var random = Math.floor(Math.random()*(m-n+1)+n);
  return random;
}
//标准简单sort排序 arrayObject.sort(sortby)  sortby必须是函数。
/*
 * 参数1：数组/数组对象 arrObj
 * */
export function simpleSort(arrObj){

  return arrObj.sort((a,b)=>{
    return a-b
  });
}
//传数组返回逗号隔开字符串
/*
 * 参数1：数组 arr
 * 返回值：str
 * */
export function getArrBarterStr (arr) {
  let str='';
  for (let v of arr){
    str+=v+','
  }
  return str.substring(0,str.length-1)
}