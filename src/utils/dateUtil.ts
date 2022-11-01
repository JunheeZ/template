/**
 * 独立的时间操作工具，方便后续切换到 dayjs
 */
import moment from 'moment';
import { isDate, isString } from "@/utils/is";

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DAY = new Date();
// 一天的时间
export const ONE_DAY_SSS = 3600 * 1000 * 24;

export function formatToDateTime(date: moment.MomentInput = null, format = DATE_TIME_FORMAT): string {
  return moment(date).format(format);
}

export function formatToDate(date: moment.MomentInput = null, format = DATE_FORMAT): string {
  return moment(date).format(format);
}

export const dateUtil = moment;

/**
 * 获取时间的 年 月 日 时 分 秒 毫秒
 * @param date 要获取的时间
 * @constructor 返回
 */
export function GET_TYPE_CHIP(date: string | Date = new Date()) {
  const dObj: Date = toDateObject(date);
  const Y = dObj.getFullYear();
  const M = dObj.getMonth() + 1;
  const D = dObj.getDate();
  const W = dObj.getDay(); // 获取周几
  const h = dObj.getHours();
  const m = dObj.getMinutes();
  const s = dObj.getSeconds();
  const sss = dObj.getMilliseconds();
  const total_days = new Date(Y, M, 0).getDate();
  const unix = dObj.getTime();

  return {
    Y,
    M,
    MM: M < 10 ? `0${M}` : M,
    D,
    DD: D < 10 ? `0${D}` : D,
    W,
    h,
    hh: h < 10 ? `0${h}` : h,
    m,
    mm: m < 10 ? `0${m}` : m,
    s,
    ss: s < 10 ? `0${s}` : s,
    sss,
    CN_W: { 0: "日", 1: "一", 2: "二", 3: "三", 4: "四", 5: "五", 6: "六" }[W],
    total_days,
    unix
  };
}

/**
 * 将时间转成时间对象, 转换失败则返回 undefined
 * @param date
 */
export function toDateObject(date: any): any {
  let res;
  if (isString(date)) {
    const newDate = date.replace(/-/g, '/');
    res = new Date(newDate);
  } else {
    res = isDate(date) ? date : new Date(date);
  }
  return isDate(res) ? res : undefined;
}

/**
 * 获取最大或最小年
 */
export function maxOrMinYear(year: number, date: string | Date = new Date()) {
  const { Y, M, D, h, m, s } = GET_TYPE_CHIP(date);
  return new Date(Y + (+year), M - 1, D, h, m, s);
}

// 获取当前月有几天
export const mGetDate = (time) => {
  const date = time ? new Date(time) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const d = new Date(year, month, 0);
  return d.getDate();
};

/**
 * 获取未来日期
 */
export function toMonthEnd(day: Date | string, MONTH: number, type = "end59") {
  const d = toDateObject(day);
  const dTime = d.setMonth(d.getMonth() + MONTH);
  const { Y, MM, DD } = GET_TYPE_CHIP(dTime);
  return { end59: `${Y}-${MM}-${DD} 22:00:00` }[type];
}
