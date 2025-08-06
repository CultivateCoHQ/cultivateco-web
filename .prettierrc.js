module.exports = {
  // Cannabis industry code formatting standards
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // Cannabis component and JSX formatting
  jsxBracketSameLine: false,
  htmlWhitespaceSensitivity: 'css',
  
  // Cannabis file type specific formatting
  overrides: [
    // Cannabis TypeScript and JavaScript files
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    },
    
    // Cannabis JSON configuration files
    {
      files: ['*.json', '*.json5'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        singleQuote: false,
        trailingComma: 'none',
        bracketSpacing: true,
      },
    },
    
    // Cannabis CSS and SCSS files
    {
      files: ['*.css', '*.scss', '*.sass'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'none',
      },
    },
    
    // Cannabis HTML and template files
    {
      files: ['*.html', '*.htm'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        htmlWhitespaceSensitivity: 'css',
        bracketSameLine: false,
      },
    },
    
    // Cannabis Markdown documentation
    {
      files: ['*.md', '*.mdx'],
      options: {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        proseWrap: 'preserve',
        htmlWhitespaceSensitivity: 'ignore',
      },
    },
    
    // Cannabis YAML configuration files
    {
      files: ['*.yaml', '*.yml'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        singleQuote: true,
        bracketSpacing: true,
      },
    },
    
    // Cannabis configuration files
    {
      files: [
        '*.config.js',
        '*.config.ts',
        'tailwind.config.js',
        'next.config.js',
        'postcss.config.js',
        '.eslintrc.js',
        '.prettierrc.js',
      ],
      options: {
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    },
    
    // Cannabis environment files
    {
      files: ['.env*'],
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    
    // Cannabis package.json
    {
      files: ['package.json', 'package-lock.json'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        trailingComma: 'none',
        bracketSpacing: true,
      },
    },
    
    // Cannabis documentation files
    {
      files: ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md'],
      options: {
        printWidth: 80,
        tabWidth: 2,
        proseWrap: 'always',
        htmlWhitespaceSensitivity: 'strict',
      },
    },
    
    // Cannabis test files
    {
      files: ['**/*.test.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}', '**/__tests__/**/*'],
      options: {
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
      },
    },
    
    // Cannabis map and data files
    {
      files: [
        'src/map/**/*.{js,ts,tsx}',
        'src/data/**/*.{js,ts,json}',
        'src/governance/**/*.{js,ts,tsx}',
        'src/compliance/**/*.{js,ts,tsx}',
      ],
      options: {
        printWidth: 120, // Longer lines for data structures
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    },
    
    // Cannabis Netlify configuration
    {
      files: ['netlify.toml'],
      options: {
        printWidth: 100,
        tabWidth: 2,
      },
    },
    
    // Cannabis TypeScript definition files
    {
      files: ['*.d.ts'],
      options: {
        printWidth: 120,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
      },
    },
  ],
  
  // Cannabis industry specific formatting plugins
  plugins: [
    'prettier-plugin-tailwindcss', // Cannabis Tailwind class sorting
    '@trivago/prettier-plugin-sort-imports', // Cannabis import organization
  ],
  
  // Tailwind CSS class sorting for cannabis design system
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'twMerge'],
  
  // Cannabis import sorting configuration
  importOrder: [
    // React and Next.js (cannabis app framework)
    '^react$',
    '^react/(.*)$',
    '^next/(.*)$',
    
    // External libraries (cannabis dependencies)
    '<THIRD_PARTY_MODULES>',
    
    // Cannabis internal modules
    '^@/(.*)$',
    '^@/cannabis/(.*)$',
    '^@/compliance/(.*)$',
    '^@/governance/(.*)$',
    '^@/map/(.*)$',
    
    // Cannabis relative imports
    '^[./]',
    
    // Cannabis type imports
    '^.*\\.types$',
    '^@/types/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  
  // Cannabis code formatting rules
  endOfLine: 'lf',
  insertPragma: false,
  requirePragma: false,
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  
  // Cannabis ignore patterns
  ignore: [
    'node_modules/**',
    '.next/**',
    'out/**',
    'dist/**',
    'build/**',
    'coverage/**',
    '.netlify/**',
    'public/**',
    '*.min.js',
    '*.min.css',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
  ],
}
