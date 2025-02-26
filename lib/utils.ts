import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import JSCookie from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLanguage() {
  const lang = JSCookie.get("lang") || "id";
  
  return lang;
}

export function isEnglish() {
  return getLanguage() === 'en';
}