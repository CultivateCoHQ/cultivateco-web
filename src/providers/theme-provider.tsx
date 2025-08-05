'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * =============================================================================
 * CultivateCo Cannabis Theme Provider
 * =============================================================================
 * Professional theme management for cannabis business applications
 */

interface CannabisThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: CannabisThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      disableTransitionOnChange={false}
      themes={['light', 'dark', 'cannabis-pro']}
      {...props}
    >
      <CannabisThemeEnhancer>
        {children}
      </CannabisThemeEnhancer>
    </NextThemesProvider>
  )
}

/**
 * Cannabis theme enhancer component
 * Adds cannabis business specific styling and behavior
 */
function CannabisThemeEnhancer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch for cannabis theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Add cannabis business theme class to body
  React.useEffect(() => {
    if (!mounted) return

    const body = document.body
    
    // Add cannabis business styling
    body.classList.add('cannabis-business-app')
    
    // Add smooth transitions for cannabis theme changes
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease'
    
    // Cannabis business focus management
    const handleFocusVisible = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        body.classList.add('keyboard-navigation')
      }
    }
    
    const handleMouseDown = () => {
      body.classList.remove('keyboard-navigation')
    }

    document.addEventListener('keydown', handleFocusVisible)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleFocusVisible)
      document.removeEventListener('mousedown', handleMouseDown)
      body.classList.remove('cannabis-business-app', 'keyboard-navigation')
    }
  }, [mounted])

  if (!mounted) {
    // Cannabis theme loading placeholder
    return (
      <div className="min-h-screen bg-cultivateco-cream">
        {children}
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Cannabis theme hook for accessing current theme
 */
export function useCannabisTheme() {
  const { theme, setTheme, resolvedTheme, themes } = require('next-themes').useTheme()
  
  return {
    theme,
    setTheme,
    resolvedTheme,
    themes,
    // Cannabis business theme utilities
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark',
    isPro: resolvedTheme === 'cannabis-pro',
    
    // Cannabis business color utilities
    getBackgroundColor: () => {
      switch (resolvedTheme) {
        case 'dark':
          return '#0f172a' // Dark slate
        case 'cannabis-pro':
          return '#154438' // CultivateCo green
        default:
          return '#fbfaf7' // CultivateCo cream
      }
    },
    
    getTextColor: () => {
      switch (resolvedTheme) {
        case 'dark':
          return '#fbfaf7' // CultivateCo cream
        case 'cannabis-pro':
          return '#fbfaf7' // CultivateCo cream
        default:
          return '#1f2937' // Dark gray
      }
    },
    
    getBrandColor: () => {
      return '#154438' // Always CultivateCo green
    },
    
    getAccentColor: () => {
      return '#0b447a' // Always CultivateCo blue
    },
  }
}

/**
 * Cannabis theme toggle component
 */
export function CannabisThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useCannabisTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 bg-cultivateco-cream border border-gray-200 rounded-lg animate-pulse" />
    )
  }

  const toggleTheme = () => {
    switch (resolvedTheme) {
      case 'light':
        setTheme('dark')
        break
      case 'dark':
        setTheme('cannabis-pro')
        break
      case 'cannabis-pro':
        setTheme('light')
        break
      default:
        setTheme('light')
    }
  }

  const getThemeIcon = () => {
    switch (resolvedTheme) {
      case 'light':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
      case 'dark':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )
      case 'cannabis-pro':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"/>
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )
    }
  }

  const getThemeLabel = () => {
    switch (resolvedTheme) {
      case 'light':
        return 'Light theme'
      case 'dark':
        return 'Dark theme'
      case 'cannabis-pro':
        return 'Cannabis Pro theme'
      default:
        return 'Toggle theme'
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-9 h-9 rounded-lg transition-all duration-200
        border border-gray-200 hover:border-cultivateco-green
        bg-cultivateco-cream hover:bg-cultivateco-green/5
        text-gray-600 hover:text-cultivateco-green
        focus:outline-none focus:ring-2 focus:ring-cultivateco-green focus:ring-offset-2
        dark:bg-slate-800 dark:border-slate-600 dark:text-slate-400
        dark:hover:bg-cultivateco-green/10 dark:hover:border-cultivateco-green
        dark:hover:text-cultivateco-green dark:focus:ring-offset-slate-800
      `}
      title={getThemeLabel()}
      aria-label={getThemeLabel()}
    >
      {getThemeIcon()}
    </button>
  )
}

/**
 * Cannabis theme-aware container component
 */
export function CannabisThemeContainer({ 
  children, 
  className = "",
  variant = "default"
}: { 
  children: React.ReactNode
  className?: string
  variant?: "default" | "card" | "elevated" | "minimal"
}) {
  const { resolvedTheme } = useCannabisTheme()

  const getVariantClasses = () => {
    const baseClasses = "transition-all duration-200"
    
    switch (variant) {
      case "card":
        return `${baseClasses} bg-cultivateco-cream border border-gray-200 rounded-lg shadow-cultivateco p-6 dark:bg-slate-800 dark:border-slate-600`
      case "elevated":
        return `${baseClasses} bg-cultivateco-cream border border-gray-200 rounded-lg shadow-cultivateco-lg hover:shadow-xl p-6 dark:bg-slate-800 dark:border-slate-600`
      case "minimal":
        return `${baseClasses} bg-transparent`
      default:
        return `${baseClasses} bg-cultivateco-cream dark:bg-slate-900`
    }
  }

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {children}
    </div>
  )
}

/**
 * Cannabis business status indicator with theme awareness
 */
export function CannabisStatusIndicator({ 
  status,
  size = "sm"
}: { 
  status: 'compliant' | 'warning' | 'violation' | 'offline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}) {
  const { resolvedTheme } = useCannabisTheme()

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-2 h-2'
      case 'sm':
        return 'w-3 h-3'
      case 'md':
        return 'w-4 h-4'
      case 'lg':
        return 'w-5 h-5'
    }
  }

  const getStatusClasses = () => {
    switch (status) {
      case 'compliant':
        return 'bg-cultivateco-green shadow-cultivateco'
      case 'warning':
        return 'bg-amber-500 shadow-amber-500/20'
      case 'violation':
        return 'bg-red-500 shadow-red-500/20'
      case 'offline':
        return 'bg-gray-400 shadow-gray-400/20'
    }
  }

  return (
    <div
      className={`
        ${getSizeClasses()} ${getStatusClasses()}
        rounded-full shadow-sm animate-pulse-cultivateco
      `}
      title={`Cannabis system ${status}`}
    />
  )
}

/**
 * Cannabis theme utility class generator
 */
export const cannabisThemeClasses = {
  // Cannabis background variants
  background: {
    primary: "bg-cultivateco-cream dark:bg-slate-900",
    card: "bg-cultivateco-cream dark:bg-slate-800 border border-gray-200 dark:border-slate-600",
    elevated: "bg-cultivateco-cream dark:bg-slate-800 shadow-cultivateco-lg dark:shadow-slate-900/20",
  },
  
  // Cannabis text variants
  text: {
    primary: "text-gray-900 dark:text-slate-100",
    secondary: "text-gray-600 dark:text-slate-400",
    brand: "text-cultivateco-green",
    accent: "text-cultivateco-blue",
  },
  
  // Cannabis interactive elements
  interactive: {
    button: "bg-cultivateco-green hover:bg-cultivateco-green/90 text-cultivateco-cream focus:ring-cultivateco-green",
    link: "text-cultivateco-blue hover:text-cultivateco-green transition-colors",
    input: "border-gray-300 focus:border-cultivateco-green focus:ring-cultivateco-green dark:border-slate-600 dark:bg-slate-800",
  },
  
  // Cannabis status colors
  status: {
    compliant: "text-cultivateco-green bg-cultivateco-green/10 border-cultivateco-green/20",
    warning: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-800",
    violation: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800",
  },
}
