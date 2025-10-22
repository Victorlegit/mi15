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
        
        {/* Non-critical CSS */}
        <link rel="stylesheet" href="/css/animations.css" />
        <link 
          rel="stylesheet" 
          href="/css/shop.css" 
          className="color-switcher-link"
        />
        
        {/* Font Awesome with preconnect */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossOrigin="anonymous"
        />
        
        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
        
        {/* Load non-critical CSS after page load using a script */}
        <Script id="load-non-critical-css" strategy="afterInteractive">
          {`
            // Load non-critical CSS after page becomes interactive
            const loadCSS = (href) => {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = href;
              document.head.appendChild(link);
            };
            
            // Load non-critical CSS files
            loadCSS('/css/animations.css');
            loadCSS('/css/shop.css');
          `}
        </Script>
        
        {/* Non-critical scripts loaded after page content */}
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script 
          src="/js/vendor/modernizr-custom.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/js/compressed.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/js/main.js"
          strategy="afterInteractive"
        />
        <Script 
          src="/js/switcher.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
