import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import Cryptr from "cryptr";

const cryptr = new Cryptr(`${process.env.CRYPTR_CODE}`);
export async function hash(param) {
  return await bcrypt.hash(param, 12);
}

export async function verifyHash(param, hashedPram) {
  return await bcrypt.compare(param, hashedPram);
}

//get current timestamp
export function getCurrentTimestamp(day = 0) {
  let oldDate = new Date();

  let date = new Date(oldDate.setDate(oldDate.getDate() + day));

  return dayjs(date, "YYYY-MM-DD HH:mm:ss.SSS").toDate();
}

export function monthDiff(from, to) {
  let months =
    to.getMonth() -
    from.getMonth() +
    12 * (to.getFullYear() - from.getFullYear());

  if (to.getDate() < from.getDate()) {
    months--;
  }
  return months;
}

export function daysDiff(from, to) {
  const diff = to.getTime() - from.getTime();
  return diff / (1000 * 3600 * 24);
}

export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date, month) {
  date.setMonth(date.getMonth() + month);
  return date;
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export function subMonths(date, month) {
  date.setMonth(date.getMonth() - month);
  return date;
}

//cryptr encrypt
export async function encrypt(data) {
  data = JSON.stringify(data);
  return await cryptr.encrypt(data);
}

//cryptr encrypt
export function decrypt(data) {
  const decryptedData = cryptr.decrypt(data);
  return JSON.parse(decryptedData);
}
