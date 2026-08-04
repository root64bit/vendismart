# Vendismart Website Logo Assets

## Recommended files
- Header on light background: `vendismart-logo-horizontal-color-512.webp`
- Header on dark background: `vendismart-logo-horizontal-white-512.png`
- Mobile navigation / compact mark: `vendismart-icon-64x64.png`
- Browser favicon: `favicon.ico`
- Apple devices: `apple-touch-icon.png`
- PWA / Android: `android-chrome-192x192.png` and `android-chrome-512x512.png`
- Social sharing: `vendismart-logo-social-light-1200x630.jpg`

## Suggested HTML

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<picture>
  <source srcset="/vendismart-logo-horizontal-color-512.webp" type="image/webp">
  <img
    src="/vendismart-logo-horizontal-color-512.png"
    alt="Vendismart"
    width="512"
    height="168"
  >
</picture>
```

For best performance, set the displayed header width with CSS, for example:

```css
.site-logo {
  width: clamp(180px, 22vw, 280px);
  height: auto;
  display: block;
}
```

The supplied source is raster artwork, so these are optimized raster website assets rather than a true vector redraw.
