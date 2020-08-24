// 鉴权
import Cookies from "js-cookie";

export function getItem(name) {
  return Cookies.getJSON(name);
}

export function setItem(name, value) {
  return Cookies.set(name, value);
}

export function removeItem(name) {
  return Cookies.remove(name);
}
