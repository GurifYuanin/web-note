// 格式化日期为 yyyy-mm-dd hh:mm:ss
export function formatDate(date: Date | number): string | number{
  date = date || new Date();
  if (date instanceof Date) {
    // 如果是 Date 对象
    let year = date.getFullYear();
    let month: number | string = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day: number | string = date.getDate();
    day = day < 10 ? '0' + day : day;
    let hour: number | string = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute: number | string = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second: number | string = date.getSeconds();
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  } else if (date && /^\d+$/.test(date.toString())) {
    // 如果是时间戳
    return formatDate(new Date(Number.parseInt(date.toString())));
  } else {
    // 否则，还给你！
    return date;
  }
}