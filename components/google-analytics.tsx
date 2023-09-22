import Script from "next/script";

export default function GoogleAnalytics() {
  if(!process.env.NEXT_PUBLIC_GA_ID) return <></>;

  return (
    <div className="container">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-FRH6AH1D9Z" />
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
