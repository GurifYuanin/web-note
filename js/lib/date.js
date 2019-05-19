// 格式化日期为 yyyy-mm-dd hh:mm:ss
function formatDate(date) {
  date = date || new Date();
  if (date instanceof Date) {
    // 如果是 Date 对象
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    const day = date.getDate();
    day = day < 10 ? '0' + day : day;
    const hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    const minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    const second = date.getSeconds();
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  } else if (/^\d+$/.test(date)) {
    // 如果是时间戳
    return formatDate(new Date(Number.parseInt(date)));
  } else {
    // 否则，还给你！
    return date;
  }
}