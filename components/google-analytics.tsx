import Script from "next/script";

export default function GoogleAnalytics() {
  if(!process.env.NEXT_PUBLIC_GA_ID) return <></>;

  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-J942NQQLB8" strategy="afterInteractive"/>
      <Script id="google-analytics" strategy="afterInteractive">
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
