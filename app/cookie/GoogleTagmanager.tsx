import Script from 'next/script';

export default function GoogleTagManager() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXX'; // แทนด้วย GTM ID ของคุณ

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
      {/* Google Tag Manager (noscript) */}
      <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NN2QDJW4"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
      >
      </iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
}