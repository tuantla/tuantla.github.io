/**
 * Vietnamese lunar calendar algorithm (years 1800-2199).
 *
 * Ported to TypeScript from amlich-hnd.js (version 0.8):
 * https://www.xemamlich.uhm.vn/JavaScript/amlich-hnd.js
 *
 * Copyright 2004 Ho Ngoc Duc [http://come.to/duc]. All Rights Reserved.
 * Permission to use, copy, modify, and redistribute this software and its
 * documentation for personal, non-commercial use is hereby granted provided that
 * this copyright notice appears in all copies.
 */
import { TK19, TK20, TK21, TK22 } from './lunarData'

export const MIN_YEAR = 1800
export const MAX_YEAR = 2199

export interface LunarDate {
  day: number
  month: number
  year: number
  /** 1 when the month is a leap month */
  leap: 0 | 1
  /** Julian day number */
  jd: number
}

export const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý']
export const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
export const TUAN = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
const GIO_HD = ['110100101100', '001101001011', '110011010010', '101100110100', '001011001101', '010010110011']

const INT = Math.floor

/** Julian day number of a Gregorian date */
export function jdn(dd: number, mm: number, yy: number): number {
  const a = INT((14 - mm) / 12)
  const y = yy + 4800 - a
  const m = mm + 12 * a - 3
  return dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045
}

/** Expand the packed year code into the 12 (or 13 with a leap month) lunar month starts */
function decodeLunarYear(yy: number, k: number): LunarDate[] {
  const monthLengths = [29, 30]
  const regularMonths: number[] = new Array(12)
  const offsetOfTet = k >> 17
  const leapMonth = k & 0xf
  const leapMonthLength = monthLengths[(k >> 16) & 0x1]
  let currentJD = jdn(1, 1, yy) + offsetOfTet
  let j = k >> 4
  for (let i = 0; i < 12; i++) {
    regularMonths[12 - i - 1] = monthLengths[j & 0x1]
    j >>= 1
  }
  const ly: LunarDate[] = []
  for (let mm = 1; mm <= 12; mm++) {
    ly.push({ day: 1, month: mm, year: yy, leap: 0, jd: currentJD })
    currentJD += regularMonths[mm - 1]
    if (mm === leapMonth) {
      ly.push({ day: 1, month: mm, year: yy, leap: 1, jd: currentJD })
      currentJD += leapMonthLength
    }
  }
  return ly
}

export function getYearInfo(yyyy: number): LunarDate[] {
  let code: number
  if (yyyy < 1900) code = TK19[yyyy - 1800]
  else if (yyyy < 2000) code = TK20[yyyy - 1900]
  else if (yyyy < 2100) code = TK21[yyyy - 2000]
  else code = TK22[yyyy - 2100]
  return decodeLunarYear(yyyy, code)
}

const FIRST_DAY = jdn(25, 1, 1800) // Tet 1800
const LAST_DAY = jdn(31, 12, 2199)

function findLunarDate(jd: number, ly: LunarDate[]): LunarDate {
  if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
    return { day: 0, month: 0, year: 0, leap: 0, jd }
  }
  let i = ly.length - 1
  while (jd < ly[i].jd) i--
  return { day: ly[i].day + (jd - ly[i].jd), month: ly[i].month, year: ly[i].year, leap: ly[i].leap, jd }
}

/** Convert a Gregorian date to a lunar date (day 0 means out of the supported range) */
export function getLunarDate(dd: number, mm: number, yyyy: number): LunarDate {
  let ly = getYearInfo(yyyy)
  const jd = jdn(dd, mm, yyyy)
  if (jd < ly[0].jd) ly = getYearInfo(yyyy - 1)
  return findLunarDate(jd, ly)
}

/** All days of a Gregorian month as lunar dates (index 0 = the 1st) */
export function getMonth(mm: number, yy: number): LunarDate[] {
  const mm1 = mm < 12 ? mm + 1 : 1
  const yy1 = mm < 12 ? yy : yy + 1
  const jd1 = jdn(1, mm, yy)
  const jd2 = jdn(1, mm1, yy1)
  const ly1 = getYearInfo(yy)
  const tet1 = ly1[0].jd
  const result: LunarDate[] = []
  if (tet1 <= jd1) {
    for (let i = jd1; i < jd2; i++) result.push(findLunarDate(i, ly1))
  } else if (jd1 < tet1 && jd2 < tet1) {
    const prev = getYearInfo(yy - 1)
    for (let i = jd1; i < jd2; i++) result.push(findLunarDate(i, prev))
  } else if (jd1 < tet1 && tet1 <= jd2) {
    const prev = getYearInfo(yy - 1)
    for (let i = jd1; i < tet1; i++) result.push(findLunarDate(i, prev))
    for (let i = tet1; i < jd2; i++) result.push(findLunarDate(i, ly1))
  }
  return result
}

/** Day of week of a Julian day number: 0 = Sunday ... 6 = Saturday */
export function dayOfWeek(jd: number): number {
  return (jd + 1) % 7
}

export function getYearCanChi(year: number): string {
  return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`
}

/** [day, month, year] can-chi names of a lunar date */
export function getCanChi(lunar: LunarDate): [string, string, string] {
  const day = `${CAN[(lunar.jd + 9) % 10]} ${CHI[(lunar.jd + 1) % 12]}`
  let month = `${CAN[(lunar.year * 12 + lunar.month + 3) % 10]} ${CHI[(lunar.month + 1) % 12]}`
  if (lunar.leap === 1) month += ' (nhuận)'
  return [day, month, getYearCanChi(lunar.year)]
}

/** Auspicious hours ("giờ hoàng đạo") of a day, as e.g. "Tý (23-1)" */
export function getGioHoangDao(jd: number): string[] {
  const gioHD = GIO_HD[((jd + 1) % 12) % 6]
  const ret: string[] = []
  for (let i = 0; i < 12; i++) {
    if (gioHD.charAt(i) === '1') ret.push(`${CHI[i]} (${(i * 2 + 23) % 24}-${(i * 2 + 1) % 24})`)
  }
  return ret
}
