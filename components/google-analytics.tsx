import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-J942NQQLB8" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-J942NQQLB8');
        `}
      </Script>
    </div>
  );
}
