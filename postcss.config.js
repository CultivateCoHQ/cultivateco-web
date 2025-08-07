module.exports = {
  plugins: {
    // Tailwind CSS for CultivateCo cannabis industry design system
    tailwindcss: {},
    
    // Autoprefixer for cannabis marketing cross-browser compatibility
    autoprefixer: {},
    
    // PostCSS Import for cannabis component stylesheets
    'postcss-import': {},
    
    // PostCSS Nested for cannabis design system organization
    'postcss-nested': {},
    
    // PostCSS Custom Properties for cannabis brand color variables (FIXED)
    'postcss-custom-properties': {
      preserve: false,
      // REMOVED exportTo - this was causing the deprecation warnings!
    },
    
    // PostCSS Custom Media for cannabis responsive design (FIXED)  
    'postcss-custom-media': {
      preserve: false,
      // REMOVED exportTo - this was causing the deprecation warnings!
    },
    
    // Cannabis-specific CSS optimizations for production
    ...(process.env.NODE_ENV === 'production' && {
      // CSS Nano for cannabis marketing performance optimization
      'cssnano': {
        preset: [
          'default',
          {
            // Cannabis industry specific optimizations
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: true,
            colormin: true,
            convertValues: true,
            discardDuplicates: true,
            discardEmpty: true,
            discardOverridden: true,
            discardUnused: {
              // Preserve cannabis compliance and map related keyframes
              keyframes: false,
              fontFace: false,
            },
            mergeIdents: true,
            mergeLonghand: true,
            mergeRules: true,
            minifyFontValues: true,
            minifyGradients: true,
            minifyParams: true,
            minifySelectors: true,
            normalizeCharset: true,
            normalizeDisplayValues: true,
            normalizePositions: true,
            normalizeRepeatStyle: true,
            normalizeString: true,
            normalizeTimingFunctions: true,
            normalizeUnicode: true,
            normalizeUrl: true,
            orderedValues: true,
            reduceIdents: {
              // Preserve cannabis and compliance related keyframes
              keyframes: false,
            },
            reduceInitial: true,
            reduceTransforms: true,
            svgo: {
              // Cannabis logo and icon optimization
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // Preserve cannabis brand elements
                      removeViewBox: false,
                      cleanupIds: false,
                    },
                  },
                },
              ],
            },
            uniqueSelectors: true,
            zindex: {
              // Preserve cannabis map and modal z-index values
              safe: true,
            },
          },
        ],
      },
      
      // PurgeCSS for cannabis marketing bundle optimization
      '@fullhuman/postcss-purgecss': {
        content: [
          './pages/**/*.{js,ts,jsx,tsx}',
          './src/components/**/*.{js,ts,jsx,tsx}',
          './src/pages/**/*.{js,ts,jsx,tsx}',
          './src/cannabis/**/*.{js,ts,jsx,tsx}',
          './src/compliance/**/*.{js,ts,jsx,tsx}',
          './src/governance/**/*.{js,ts,jsx,tsx}',
          './src/map/**/*.{js,ts,jsx,tsx}',
        ],
        // Cannabis industry specific CSS preservation
        safelist: [
          // Cannabis brand colors and utilities
          /^cannabis-/,
          /^brand-/,
          /^compliance-/,
          /^map-/,
          /^governance-/,
          
          // Mapbox GL JS classes for cannabis governance map
          /^mapboxgl-/,
          /^mapbox-/,
          
          // Framer Motion classes for cannabis animations
          /^motion-/,
          /^animate-/,
          
          // Cannabis form and interaction states
          /^focus:/,
          /^hover:/,
          /^active:/,
          /^disabled:/,
          
          // Cannabis responsive classes
          /^sm:/,
          /^md:/,
          /^lg:/,
          /^xl:/,
          /^2xl:/,
          
          // Cannabis dark mode classes
          /^dark:/,
          
          // Cannabis accessibility classes
          /^sr-only/,
          /^focus-visible:/,
          
          // Cannabis utility classes
          'transition-all',
          'duration-300',
          'ease-in-out',
          'transform',
          'scale-105',
          'opacity-0',
          'opacity-100',
          
          // Cannabis gradient and shadow utilities
          'cannabis-gradient',
          'cannabis-gradient-light',
          'cannabis-glow',
          'compliance-pulse',
          'map-zoom',
          
          // Cannabis button states
          'button-primary',
          'button-secondary',
          'button-cannabis',
          'button-compliance',
        ],
        // Variables and keyframes preservation
        variables: true,
        keyframes: true,
        fontFace: true,
        rejected: true,
        rejectedCss: process.env.NODE_ENV === 'development',
      },
    }),
    
    // PostCSS Flexbugs Fixes for cannabis marketing cross-browser support
    'postcss-flexbugs-fixes': {},
    
    // PostCSS Preset Env for cannabis industry browser support
    'postcss-preset-env': {
      stage: 3,
      features: {
        // Cannabis design system modern CSS features (FIXED)
        'custom-properties': false, // Handled by postcss-custom-properties
        'custom-media-queries': false, // Handled by postcss-custom-media
        'nesting-rules': true,
        'color-mod-function': false, // DISABLED - was causing warnings
        'hex-alpha-notation': false, // DISABLED - was causing warnings
        'lab-function': true,
        'logical-properties-and-values': true,
        'media-query-ranges': true,
        'prefers-color-scheme-query': true,
      },
      // Cannabis industry browser support targets
      browsers: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions',
        'last 2 Edge versions',
        'not IE 11',
        'not dead',
        '> 0.2%',
        'Firefox ESR',
      ],
    },
    
    // REMOVED postcss-reporter completely - it was causing build failures!
  },
}
