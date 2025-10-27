export const openAIDesingCSS = `
/**
 * OpenAI Apps SDK Design System
 * Complete CSS implementation following official design guidelines
 * https://developers.openai.com/apps-sdk/concepts/design-guidelines
 */

/* ============================================
   ROOT VARIABLES - Light & Dark Mode
   ============================================ */

:root {
  /* Light Mode Colors - Background */
  --bg-primary: #FFFFFF;
  --bg-secondary: #E8E8E8;
  --bg-tertiary: #F3F3F3;
  
  /* Light Mode Colors - Text */
  --text-primary: #0D0D0D;
  --text-secondary: #5D5D5D;
  --text-tertiary: #8F8F8F;
  --text-invert: #8F8F8F;
  
  /* Light Mode Colors - Icons */
  --icon-primary: #0D0D0D;
  --icon-secondary: #5D5D5D;
  --icon-tertiary: #8F8F8F;
  --icon-invert: #8F8F8F;
  
  /* Accent Colors (same for light/dark) */
  --accent-blue: #0285FF;
  --accent-red: #E02E2A;
  --accent-orange: #E25507;
  --accent-green: #008635;
  
  /* Dark Mode Accent Variants */
  --accent-blue-dark: #0285FF;
  --accent-red-dark: #FF8583;
  --accent-orange-dark: #FF9E6C;
  --accent-green-dark: #40C977;
  
  /* Spacing Scale (as per design guidelines) */
  --space-0: 0;
  --space-1: 2px;
  --space-2: 4px;
  --space-4: 8px;
  --space-6: 12px;
  --space-8: 16px;
  --space-12: 24px;
  --space-16: 32px;
  --space-20: 40px;
  --space-24: 48px;
  --space-32: 64px;
  --space-64: 128px;
  
  /* Typography Scale */
  --font-family-system: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --font-family-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Courier New', monospace;
  
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  --font-size-4xl: 36px;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-base: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;
  
  /* Z-index Scale */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  
  /* Breakpoints (mobile-first) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Container Max Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}

/* Dark Mode Variables */
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark Mode Colors - Background */
    --bg-primary: #212121;
    --bg-secondary: #303030;
    --bg-tertiary: #414141;
    
    /* Dark Mode Colors - Text */
    --text-primary: #FFFFFF;
    --text-secondary: #CDCDCD;
    --text-tertiary: #AFAFAF;
    --text-invert: #AFAFAF;
    
    /* Dark Mode Colors - Icons */
    --icon-primary: #FFFFFF;
    --icon-secondary: #CDCDCD;
    --icon-tertiary: #AFAFAF;
    --icon-invert: #AFAFAF;
    
    /* Use dark mode accent variants */
    --accent-red: var(--accent-red-dark);
    --accent-orange: var(--accent-orange-dark);
    --accent-green: var(--accent-green-dark);
    
    /* Shadows for dark mode */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  }
}

/* Manual dark mode class override */
.dark {
  --bg-primary: #212121;
  --bg-secondary: #303030;
  --bg-tertiary: #414141;
  
  --text-primary: #FFFFFF;
  --text-secondary: #CDCDCD;
  --text-tertiary: #AFAFAF;
  --text-invert: #AFAFAF;
  
  --icon-primary: #FFFFFF;
  --icon-secondary: #CDCDCD;
  --icon-tertiary: #AFAFAF;
  --icon-invert: #AFAFAF;
  
  --accent-red: var(--accent-red-dark);
  --accent-orange: var(--accent-orange-dark);
  --accent-green: var(--accent-green-dark);
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
}

/* ============================================
   BASE STYLES & RESET
   ============================================ */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-system);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: background-color var(--transition-base), color var(--transition-base);
}

/* ============================================
   TYPOGRAPHY
   ============================================ */

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  color: var(--text-primary);
  margin: 0;
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-base); }

p {
  margin: 0;
  color: var(--text-primary);
}

a {
  color: var(--accent-blue);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

a:hover {
  opacity: 0.8;
}

a:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

strong, b {
  font-weight: var(--font-weight-semibold);
}

em, i {
  font-style: italic;
}

code {
  font-family: var(--font-family-mono);
  font-size: 0.875em;
  background-color: var(--bg-tertiary);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

/* Text Utility Classes */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }

.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.text-tertiary { color: var(--text-tertiary); }

.font-regular { font-weight: var(--font-weight-regular); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* ============================================
   LAYOUT & SPACING
   ============================================ */

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-8);
  padding-right: var(--space-8);
}

@media (min-width: 640px) {
  .container { max-width: var(--container-sm); }
}

@media (min-width: 768px) {
  .container { max-width: var(--container-md); }
}

@media (min-width: 1024px) {
  .container { max-width: var(--container-lg); }
}

@media (min-width: 1280px) {
  .container { max-width: var(--container-xl); }
}

/* Spacing Utilities */
.m-0 { margin: var(--space-0); }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }
.m-12 { margin: var(--space-12); }
.m-16 { margin: var(--space-16); }
.m-20 { margin: var(--space-20); }
.m-24 { margin: var(--space-24); }
.m-32 { margin: var(--space-32); }

.mt-0 { margin-top: var(--space-0); }
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-4 { margin-top: var(--space-4); }
.mt-6 { margin-top: var(--space-6); }
.mt-8 { margin-top: var(--space-8); }
.mt-12 { margin-top: var(--space-12); }
.mt-16 { margin-top: var(--space-16); }
.mt-20 { margin-top: var(--space-20); }
.mt-24 { margin-top: var(--space-24); }

.mb-0 { margin-bottom: var(--space-0); }
.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-6 { margin-bottom: var(--space-6); }
.mb-8 { margin-bottom: var(--space-8); }
.mb-12 { margin-bottom: var(--space-12); }
.mb-16 { margin-bottom: var(--space-16); }
.mb-20 { margin-bottom: var(--space-20); }
.mb-24 { margin-bottom: var(--space-24); }

.p-0 { padding: var(--space-0); }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }
.p-12 { padding: var(--space-12); }
.p-16 { padding: var(--space-16); }
.p-20 { padding: var(--space-20); }
.p-24 { padding: var(--space-24); }

/* ===========================================…
`;
