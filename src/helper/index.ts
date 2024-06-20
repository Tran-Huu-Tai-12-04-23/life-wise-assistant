import { v4 as uuid } from "uuid";

export function saveUserDataToLocalStorage(email: string) {
  localStorage.setItem("email", email);
}

export function getUserEmailFromLocalStorage() {
  return localStorage.getItem("email");
}

export function clearUserDataFromLocalStorage() {
  localStorage.removeItem("email");
}

export function getUUid() {
  return uuid();
}
