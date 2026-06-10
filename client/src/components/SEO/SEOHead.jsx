import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SEOHead = ({ 
  title = 'SkyCast Pro | Advanced Weather Forecast Platform',
  description = 'Get accurate weather forecasts, real-time conditions, air quality alerts, and personalized weather tracking with SkyCast Pro. Your professional weather companion.',
  keywords = 'weather forecast, weather app, real-time weather, air quality, weather alerts, temperature, humidity, wind speed, weather tracking, meteorology, climate data',
  ogImage = '/og-image.png',
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  structuredData = null,
  alternateLanguages = {},
  article = false,
  publishedTime,
  modifiedTime,
  authorName
}) => {
  const location = useLocation()
  const currentUrl = canonicalUrl || `${window.location.origin}${location.pathname}`
  const siteName = 'SkyCast Pro'
  const twitterHandle = '@skycastpro'

  const defaultStructuredData = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: [ogImage],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Person',
      name: authorName || siteName
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    }
  } : {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    description,
    url: currentUrl,
    applicationCategory: 'WeatherApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: siteName
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    }
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteName} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate Language Links */}
      {Object.entries(alternateLanguages).map(([lang, url]) => (
        <link key={lang} rel="alternate" hreflang={lang} href={url} />
      ))}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#041124" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Article-specific meta tags */}
      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {article && authorName && <meta property="article:author" content={authorName} />}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}

export default SEOHead
