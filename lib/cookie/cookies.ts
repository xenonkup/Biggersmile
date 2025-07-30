// Cookie Utility Functions - Native JavaScript API
// จัดการ Cookie โดยไม่ต้องพึ่ง external library

/**
 * ตั้งค่า Cookie
 * @param name ชื่อ Cookie
 * @param value ค่าที่เก็บ
 * @param options ตัวเลือก (expires, path, domain, secure)
 */

export const setCookie = (
  name: string, 
  value: string, 
  options: { 
    expires?: number; // จำนวนวันหมดอายุ
    path?: string;    
    domain?: string;  
    secure?: boolean; 
  } = {}
) => {
  let cookieString = `${name}=${encodeURIComponent(value)}`;
  
  // เพิ่มวันหมดอายุ
  if (options.expires) {
    const date = new Date();
    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }
  
  // เพิ่ม options อื่นๆ
  if (options.path) cookieString += `; path=${options.path}`;
  if (options.domain) cookieString += `; domain=${options.domain}`;
  if (options.secure) cookieString += `; secure`;
  
  document.cookie = cookieString;
};

/**
 * อ่านค่า Cookie
 * @param name ชื่อ Cookie ที่ต้องการ
 * @returns ค่า Cookie หรือ undefined
 */

export const getCookie = (name: string): string | undefined => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return undefined;
};

/**
 * ลบ Cookie
 * @param name ชื่อ Cookie ที่ต้องการลบ
 */

export const removeCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};