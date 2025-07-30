// Google Tag Manager Integration
// ส่งข้อมูล Cookie consent ไป GTM สำหรับ GDPR/PDPA
 
// Interface สำหรับการตั้งค่า Cookie
export interface CookieSettings {
  necessary: boolean;        // คุกกี้จำเป็น
  analytics: boolean;        // Google Analytics
  adStorage: boolean;        // โฆษณา
  adPersonalization: boolean; // ปรับแต่งโฆษณา
  adUserData: boolean;       // ข้อมูลผู้ใช้โฆษณา
}

// Interface สำหรับข้อมูลที่ส่งไป GTM
export interface GTMEventData {
  event?: string;
  cookieSettings?: CookieSettings;
  [key: string]: unknown;
}

// ขยาย Window interface สำหรับ dataLayer
declare global {
  interface Window {
    dataLayer?: GTMEventData[];
  }
}

//  ส่งข้อมูล event ไป Google Tag Manager
//  @param eventData ข้อมูล event ที่ส่งไป GTM
//  @example pushToDataLayer({ event: 'cookie_consent_given' });

export const pushToDataLayer = (eventData: GTMEventData): void => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventData);
    
    // Log สำหรับ development
    if (process.env.NODE_ENV === 'development') {
      console.log('GTM Event:', eventData);
    }
  }
};