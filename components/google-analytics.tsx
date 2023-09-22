import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
  const GA_TRACKING_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  
  if(!GA_TRACKING_ID) return null

  return (
    <div className="container">
      <Script src={GA_TRACKING_URL} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-FRH6AH1D9Z');
        `}
      </Script>
    </div>
  );
}
