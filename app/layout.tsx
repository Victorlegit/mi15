// app/layout.tsx
import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Mi15 Agency - US Army',
  description: 'Strategic intelligence and operations unit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/css/bootstrap.min.css" as="style" />
        <link rel="preload" href="/css/main.css" as="style" />
        <link rel="preload" href="/images/logo.png" as="image" />
        
        {/* Critical CSS - loaded immediately */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/main.css" />
        
        {/* Non-critical CSS - loaded after page render */}
        <link 
          rel="stylesheet" 
          href="/css/animations.css" 
          media="print" 
          onLoad="this.media='all'" 
        />
        <link 
          rel="stylesheet" 
          href="/css/shop.css" 
          className="color-switcher-link"
          media="print" 
          onLoad="this.media='all'" 
        />
        
        {/* Font Awesome with preconnect */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
        
        {/* Non-critical scripts loaded after page content */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
        <Script 
          src="/js/vendor/modernizr-custom.js"
          strategy="lazyOnload"
        />
        <Script 
          src="/js/compressed.js"
          strategy="lazyOnload"
        />
        <Script 
          src="/js/main.js"
          strategy="lazyOnload"
        />
        <Script 
          src="/js/switcher.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
