'use client';

import { useEffect, useState } from 'react';
import { pushToDataLayer } from '@/lib/cookie/gtm';
import CookieConsent from 'react-cookie-consent';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true,
    analytics: false,
    adStorage: false,
    adPersonalization: false,
    adUserData: false,
  });

  // 
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 500);
  };

  const handleSaveSettings = () => {
    pushToDataLayer({
      event: 'cookie_consent_custom',
      cookieSettings: cookieSettings,
    });
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    setShowSettings(false);
    closeBanner();
  };

  const handleAcceptAll = () => {
    setCookieSettings({
      necessary: true,
      analytics: true,
      adStorage: true,
      adPersonalization: true,
      adUserData: true,
    });
    pushToDataLayer({ event: 'cookie_consent_given' });
    localStorage.setItem('cookieConsent', 'accepted');
    setShowSettings(false);
    closeBanner();
  };

  const handleToggleCookie = (type: keyof typeof cookieSettings) => {
    if (type === 'necessary') return;
    setCookieSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const handleOpenPolicy = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowPolicy(true);
  };

  const handleClosePolicy = () => {
    setShowPolicy(false);
  };

  const handleAcceptPolicy = () => {
    setShowPolicy(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          opacity: isVisible ? 1 : 0,
          zIndex: 1000,
        }}
      >
        <CookieConsent
          location="bottom"
          buttonText="ยอมรับทั้งหมด"
          declineButtonText="การตั้งค่าคุกกี้"
          cookieName="myWebsiteCookieConsent"
          expires={150}
          enableDeclineButton
          style={{
            background: '#1D3C6A', // น้ำเงินเข้มสำหรับพื้นหลัง
            color: '#DAEAFB', // น้ำเงินอ่อนสำหรับตัวอักษร
            padding: '20px',
            borderRadius: '8px 8px 0 0',
            boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '100%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
          buttonStyle={{
            background: '#F8BBD0', // ชมพูอ่อนสำหรับปุ่มยอมรับ
            color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษรปุ่ม
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.3s',
          }}
          declineButtonStyle={{
            background: '#DAEAFB', // น้ำเงินอ่อนสำหรับปุ่มตั้งค่า
            color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #1D3C6A',
            cursor: 'pointer',
            marginRight: '10px',
            transition: 'background 0.3s',
          }}
          contentStyle={{ flex: '1', marginRight: '20px' }}
          containerClasses="cookie-consent-container"
          onAccept={handleAcceptAll}
          onDecline={() => setShowSettings(true)}
        >
          <button
            onClick={closeBanner}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              color: '#DAEAFB', // น้ำเงินอ่อนสำหรับปุ่มปิด
              cursor: 'pointer',
            }}
          >
            ✖
          </button>
          เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ การใช้เว็บไซต์นี้ต่อไปถือว่าคุณยอมรับการใช้งานคุกกี้ของเรา อ่านเพิ่มเติมเกี่ยวกับการใช้คุกกี้ของเราใน{' '}
          <a
            href="#"
            onClick={handleOpenPolicy}
            style={{ color: '#F8BBD0', textDecoration: 'underline' }} // ชมพูอ่อนสำหรับลิงก์
          >
            นโยบายคุกกี้
          </a>
        </CookieConsent>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(5px)',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #1D3C6A, #DAEAFB)', // ไล่สีจากน้ำเงินเข้มไปน้ำเงินอ่อน
              color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
              padding: '30px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '550px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              border: '1px solid #F8BBD0', // ขอบชมพูอ่อน
            }}
          >
            <button
              onClick={handleCloseSettings}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#F8BBD0', // ชมพูอ่อนสำหรับปุ่มปิด
                border: 'none',
                fontSize: '18px',
                color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#F8BBD0';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#F8BBD0';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✖
            </button>

            <h2
              style={{
                marginBottom: '25px',
                color: '#1D3C6A', // น้ำเงินเข้มสำหรับหัวข้อ
                fontSize: '26px',
                fontWeight: '600',
                borderBottom: '2px solid #F8BBD0', // เส้นใต้สีชมพูอ่อน
                paddingBottom: '10px',
              }}
            >
              การตั้งค่าคุกกี้
            </h2>

            <div
              style={{
                marginBottom: '22px',
                background: '#DAEAFB', // น้ำเงินอ่อนสำหรับพื้นหลัง
                padding: '15px',
                borderRadius: '10px',
                borderLeft: '4px solid #1D3C6A', // เส้นซ้ายน้ำเงินเข้ม
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                <input
                  type="checkbox"
                  checked={cookieSettings.necessary}
                  disabled
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    accentColor: '#1D3C6A', // น้ำเงินเข้มสำหรับ checkbox
                  }}
                />
                <span style={{ color: '#1D3C6A' }}>คุกกี้ที่จำเป็น (Necessary Cookies)</span>
              </label>
              <p style={{ fontSize: '14px', color: '#1D3C6A', marginLeft: '28px', marginTop: '5px', lineHeight: '1.4' }}>
                ช่วยให้เว็บไซต์ทำงานได้อย่างถูกต้อง
              </p>
            </div>

            <div
              style={{
                marginBottom: '22px',
                background: '#DAEAFB',
                padding: '15px',
                borderRadius: '10px',
                borderLeft: '4px solid #F8BBD0', // เส้นซ้ายสีชมพูอ่อน
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={cookieSettings.analytics}
                  onChange={() => handleToggleCookie('analytics')}
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    accentColor: '#F8BBD0', // ชมพูอ่อนสำหรับ checkbox
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: '#1D3C6A' }}>คุกกี้เพื่อการวิเคราะห์ (Analytics Cookies)</span>
              </label>
              <p style={{ fontSize: '14px', color: '#1D3C6A', marginLeft: '28px', marginTop: '5px', lineHeight: '1.4' }}>
                ช่วยให้เราเข้าใจพฤติกรรมการใช้งานเว็บไซต์
              </p>
            </div>

            <div
              style={{
                marginBottom: '22px',
                background: '#DAEAFB',
                padding: '15px',
                borderRadius: '10px',
                borderLeft: '4px solid #F8BBD0',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={cookieSettings.adStorage}
                  onChange={() => handleToggleCookie('adStorage')}
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    accentColor: '#F8BBD0',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: '#1D3C6A' }}>คุกกี้โฆษณา (Ad Storage)</span>
              </label>
              <p style={{ fontSize: '14px', color: '#1D3C6A', marginLeft: '28px', marginTop: '5px', lineHeight: '1.4' }}>
                ใช้เพื่อจัดเก็บข้อมูลโฆษณา
              </p>
            </div>

            <div
              style={{
                marginBottom: '22px',
                background: '#DAEAFB',
                padding: '15px',
                borderRadius: '10px',
                borderLeft: '4px solid #F8BBD0',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={cookieSettings.adPersonalization}
                  onChange={() => handleToggleCookie('adPersonalization')}
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    accentColor: '#F8BBD0',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: '#1D3C6A' }}>คุกกี้เพื่อการปรับแต่งโฆษณา (Ad Personalization)</span>
              </label>
              <p style={{ fontSize: '14px', color: '#1D3C6A', marginLeft: '28px', marginTop: '5px', lineHeight: '1.4' }}>
                ใช้เพื่อปรับแต่งโฆษณาให้เหมาะสมกับคุณ
              </p>
            </div>

            <div
              style={{
                marginBottom: '22px',
                background: '#DAEAFB',
                padding: '15px',
                borderRadius: '10px',
                borderLeft: '4px solid #F8BBD0',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={cookieSettings.adUserData}
                  onChange={() => handleToggleCookie('adUserData')}
                  style={{
                    marginRight: '10px',
                    width: '18px',
                    height: '18px',
                    accentColor: '#F8BBD0',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ color: '#1D3C6A' }}>คุกกี้ข้อมูลผู้ใช้โฆษณา (Ad User Data)</span>
              </label>
              <p style={{ fontSize: '14px', color: '#1D3C6A', marginLeft: '28px', marginTop: '5px', lineHeight: '1.4' }}>
                ใช้เพื่อเก็บข้อมูลผู้ใช้สำหรับโฆษณา
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '15px',
                marginTop: '30px',
                borderTop: '1px solid #F8BBD0', // เส้นบนสีชมพูอ่อน
                paddingTop: '20px',
              }}
            >
              <button
                onClick={handleSaveSettings}
                style={{
                  background: '#F8BBD0', // ชมพูอ่อนสำหรับปุ่มบันทึก
                  color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
                  fontSize: '15px',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                }}
              >
                บันทึกการตั้งค่า
              </button>
              <button
                onClick={handleAcceptAll}
                style={{
                  background: '#1D3C6A', // น้ำเงินเข้มสำหรับปุ่มยอมรับทั้งหมด
                  color: '#DAEAFB', // น้ำเงินอ่อนสำหรับตัวอักษร
                  fontSize: '15px',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                }}
              >
                ยอมรับทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Pop-up */}
      {showPolicy && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            backdropFilter: 'blur(5px)',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(145deg, #DAEAFB, #FFFFFF)', // ไล่สีจากน้ำเงินอ่อนไปขาว
              color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
              padding: '30px',
              borderRadius: '16px',
              width: '90%',
              maxWidth: '650px',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              border: '1px solid #1D3C6A', // ขอบน้ำเงินเข้ม
            }}
          >
            <button
              onClick={handleClosePolicy}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#F8BBD0', // ชมพูอ่อนสำหรับปุ่มปิด
                border: 'none',
                fontSize: '18px',
                color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#F8BBD0';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#F8BBD0';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✖
            </button>

            <h2
              style={{
                marginBottom: '25px',
                color: '#1D3C6A', // น้ำเงินเข้มสำหรับหัวข้อ
                fontSize: '28px',
                fontWeight: '600',
                borderBottom: '2px solid #F8BBD0', // เส้นใต้สีชมพูอ่อน
                paddingBottom: '10px',
              }}
            >
              นโยบายคุกกี้
            </h2>

            <p style={{ marginBottom: '20px', fontSize: '17px', fontWeight: '600', color: '#F8BBD0' }}>
              นโยบายความเป็นส่วนตัว
            </p>
            <p style={{ marginBottom: '20px', lineHeight: '1.6', fontSize: '15px' }}>
              ขอต้อนรับสู่เว็บไซต์ของเรา! เรามุ่งมั่นที่จะปกป้องความเป็นส่วนตัวของคุณ
              และให้ความสำคัญกับข้อมูลส่วนบุคคลที่คุณได้มอบให้เรา
              เมื่อคุณใช้บริการของเรา
              เราจะรวบรวมข้อมูลบางส่วนเพื่อให้บริการได้อย่างมีประสิทธิภาพ
              โปรดอ่านนโยบายนี้เพื่อทราบถึงวิธีการที่เราจัดการและปกป้องข้อมูลของคุณ
            </p>

            <p style={{ marginBottom: '15px', fontSize: '17px', fontWeight: '600', color: '#F8BBD0' }}>
              ข้อมูลที่เรารวบรวม
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6', fontSize: '15px' }}>
              <li style={{ marginBottom: '8px' }}>ข้อมูลที่คุณให้เราโดยตรง เช่น ชื่อ อีเมล เบอร์โทรศัพท์</li>
              <li>ข้อมูลจากการใช้งานเว็บไซต์ เช่น การเยี่ยมชมหน้าเว็บไซต์ การใช้งานคุกกี้ และข้อมูลอุปกรณ์</li>
            </ul>

            <p style={{ marginBottom: '15px', fontSize: '17px', fontWeight: '600', color: '#F8BBD0' }}>
              วัตถุประสงค์ในการใช้ข้อมูล
            </p>
            <ul style={{ marginBottom: '20px', paddingLeft: '20px', lineHeight: '1.6', fontSize: '15px' }}>
              <li style={{ marginBottom: '8px' }}>เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ</li>
              <li style={{ marginBottom: '8px' }}>เพื่อการวิเคราะห์และพัฒนาเว็บไซต์</li>
              <li>เพื่อการสื่อสารและแจ้งข้อมูลที่เกี่ยวข้องกับบริการของเรา</li>
            </ul>

            <p style={{ marginBottom: '15px', fontSize: '17px', fontWeight: '600', color: '#F8BBD0' }}>
              การแบ่งปันข้อมูล
            </p>
            <p style={{ marginBottom: '15px', lineHeight: '1.6', fontSize: '15px' }}>
              เราอาจแบ่งปันข้อมูลบางส่วนของคุณกับบุคคลภายนอก เช่น หน่วยงานการตลาด
              (Marketing Agency) เพื่อปรับปรุงและพัฒนาแคมเปญทางการตลาดของเรา
              ข้อมูลของคุณจะถูกจัดการตามมาตรฐานความปลอดภัยและใช้เพื่อจุดประสงค์ทางการตลาดที่คุณอนุญาต
            </p>
            <p style={{ marginBottom: '20px', lineHeight: '1.6', fontSize: '15px' }}>
              เราจะไม่แบ่งปันข้อมูลของคุณกับบุคคลภายนอกโดยไม่ได้รับความยินยอม
              ยกเว้นเมื่อจำเป็นตามกฎหมายหรือเพื่อการให้บริการที่คุณร้องขอ
            </p>

            <p style={{ marginBottom: '15px', fontSize: '17px', fontWeight: '600', color: '#F8BBD0' }}>
              สิทธิของคุณ
            </p>
            <p style={{ marginBottom: '20px', lineHeight: '1.6', fontSize: '15px' }}>
              คุณมีสิทธิ์ที่จะขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้ทุกเมื่อ
              หากคุณมีคำถามหรือข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวของเรา
              กรุณาติดต่อเราผ่านช่องทางที่ระบุไว้ในเว็บไซต์
            </p>

            <p style={{ marginBottom: '25px', lineHeight: '1.6', fontSize: '15px', fontStyle: 'italic', color: '#1D3C6A' }}>
              เราขอขอบคุณที่ไว้วางใจในบริการของเรา
              และหวังว่าคุณจะได้รับประสบการณ์ที่ดีจากการใช้เว็บไซต์ของเรา
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '15px',
                marginTop: '30px',
                borderTop: '1px solid #1D3C6A', // เส้นบนน้ำเงินเข้ม
                paddingTop: '20px',
              }}
            >
              <button
                onClick={handleAcceptPolicy}
                style={{
                  background: '#F8BBD0', // ชมพูอ่อนสำหรับปุ่มยอมรับ
                  color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
                  fontSize: '15px',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                }}
              >
                ยอมรับ
              </button>
              <button
                onClick={handleClosePolicy}
                style={{
                  background: '#DAEAFB', // น้ำเงินอ่อนสำหรับปุ่มปิด
                  color: '#1D3C6A', // น้ำเงินเข้มสำหรับตัวอักษร
                  fontSize: '15px',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  border: '1px solid #1D3C6A',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#F8BBD0';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#DAEAFB';
                }}
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}