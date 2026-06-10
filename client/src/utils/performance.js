// ============================================================================
// SKYCAST PRO - PERFORMANCE OPTIMIZATION UTILITIES
// Lazy loading, caching, and performance monitoring
// ============================================================================

// Lazy load images with intersection observer
export const lazyLoadImage = (imgElement, src) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          imgElement.src = src
          imgElement.classList.add('loaded')
          observer.unobserve(imgElement)
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    })
    observer.observe(imgElement)
  } else {
    // Fallback for browsers without IntersectionObserver
    imgElement.src = src
  }
}

// Simple in-memory cache for API responses
class SimpleCache {
  constructor(maxSize = 100) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  set(key, value, ttl = 300000) { // 5 minutes default TTL
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    this.cache.set(key, {
      value,
      expires: Date.now() + ttl
    })
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null
    
    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }
    
    return item.value
  }

  has(key) {
    return this.cache.has(key) && Date.now() <= this.cache.get(key).expires
  }

  clear() {
    this.cache.clear()
  }
}

export const apiCache = new SimpleCache(50)

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Performance monitoring
export const measurePerformance = (metricName, fn) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`[Performance] ${metricName}: ${(end - start).toFixed(2)}ms`)
    return result
  }
  return fn()
}

// Lazy load component
export const lazyLoadComponent = (importFn) => {
  return importFn()
}

// Prefetch resources
export const prefetchResource = (url) => {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url
  document.head.appendChild(link)
}

// Preload critical resources
export const preloadResource = (url, as = 'script') => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = url
  link.as = as
  document.head.appendChild(link)
}

// Check if element is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Optimize images based on device pixel ratio
export const getOptimizedImageUrl = (baseUrl, width, height) => {
  const dpr = window.devicePixelRatio || 1
  const optimizedWidth = Math.round(width * dpr)
  const optimizedHeight = Math.round(height * dpr)
  
  // This assumes your image service supports these parameters
  // Adjust based on your actual image service
  return `${baseUrl}?w=${optimizedWidth}&h=${optimizedHeight}&q=80&format=webp`
}

// Memory cleanup
export const cleanupMemory = () => {
  // Clear caches
  apiCache.clear()
  
  // Force garbage collection hint (works in some browsers)
  if (window.gc) {
    window.gc()
  }
}

// Network status monitoring
export const monitorNetworkStatus = (callback) => {
  const updateStatus = () => {
    callback({
      isOnline: navigator.onLine,
      connectionType: navigator.connection?.effectiveType,
      downlink: navigator.connection?.downlink,
      rtt: navigator.connection?.rtt
    })
  }

  window.addEventListener('online', updateStatus)
  window.addEventListener('offline', updateStatus)
  
  if (navigator.connection) {
    navigator.connection.addEventListener('change', updateStatus)
  }

  updateStatus() // Initial check

  return () => {
    window.removeEventListener('online', updateStatus)
    window.removeEventListener('offline', updateStatus)
    if (navigator.connection) {
      navigator.connection.removeEventListener('change', updateStatus)
    }
  }
}

// Request animation frame helper
export const rafThrottle = (callback) => {
  let ticking = false
  return (...args) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(...args)
        ticking = false
      })
      ticking = true
    }
  }
}
