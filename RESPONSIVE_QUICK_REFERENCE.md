# 📱 Mobile Responsive Design - Quick Reference

## Breakpoints You Can Use

```css
/* Mobile First */
/* Default: < 640px */

/* Small devices (640px) */
@media (min-width: 640px) { }

/* Medium devices (768px) */
@media (min-width: 768px) { }

/* Large devices (1024px) */
@media (min-width: 1024px) { }

/* Extra large (1280px) */
@media (min-width: 1280px) { }

/* 2xl devices (1536px) */
@media (min-width: 1536px) { }
```

## Tailwind Responsive Classes

```html
<!-- Mobile: hidden, Tablet+: visible -->
<div class="hidden sm:block">Content</div>

<!-- Mobile: 1 col, Tablet: 2 col, Desktop: 3 col -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <!-- Items -->
</div>

<!-- Responsive padding -->
<div class="p-4 sm:p-6 lg:p-8">Content</div>

<!-- Responsive text size -->
<h1 class="text-2xl sm:text-3xl lg:text-4xl">Title</h1>

<!-- Responsive spacing -->
<div class="gap-2 sm:gap-4 lg:gap-6">Content</div>
```

## CSS Variables in Use

```css
/* Spacing */
var(--spacing-md)    /* 1rem */
var(--spacing-lg)    /* 1.5rem */
var(--spacing-xl)    /* 2rem */
var(--spacing-2xl)   /* 3rem */

/* Colors */
var(--primary)       /* #2a7fff */
var(--accent)        /* #00d4e6 */
var(--secondary)     /* #8000ff */

/* Sizing */
var(--radius-md)     /* 0.5rem */
var(--radius-lg)     /* 0.75rem */
var(--radius-xl)     /* 1rem */

/* Transitions */
var(--transition-fast)      /* 150ms */
var(--transition-base)      /* 200ms */
var(--transition-slow)      /* 300ms */
```

## Component Usage Examples

### Responsive Button

```jsx
import { Button } from './components/ui/Button'

// Mobile-first sizing
<Button 
  size="md"           // 44px on mobile
  fullWidth          // Full width on mobile
  variant="primary"
>
  Click Me
</Button>
```

### Responsive Card

```jsx
import { Card } from './components/ui/Card'

// Mobile-responsive padding
<Card>
  <SectionHeader title="Weather" />
  {/* Automatically responsive */}
</Card>
```

### Responsive Grid

```jsx
// 1 col mobile → 2 col tablet → 3 col desktop
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</section>
```

### Responsive Forms

```jsx
import { Input, Select } from './components/ui/Form'

<Input
  label="City"
  placeholder="Enter city name"
  // Automatically responsive
/>

<Select
  label="Country"
  options={countryOptions}
  // Automatically responsive
/>
```

## Animation Classes

```html
<!-- Fade in animation -->
<div class="animate-fade-in">Content</div>

<!-- Slide up animation -->
<div class="animate-slide-in-up">Content</div>

<!-- Scale in animation -->
<div class="animate-scale-in">Content</div>

<!-- Bounce animation -->
<div class="animate-bounce">Content</div>

<!-- Delayed animation -->
<div class="animate-fade-in animate-delay-200">Content</div>
```

## Testing Mobile Responsiveness

### Chrome DevTools
1. Open DevTools (F12)
2. Click "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Test different device presets
4. Try landscape orientation

### Testing Sizes
```
iPhone:       375px wide
iPhone Plus:  414px wide
iPad:         768px wide
Desktop:      1024px+ wide
```

### Touch Testing
- Test all buttons are 44×44px minimum
- Test spacing feels natural
- Test no horizontal scroll
- Test readable text sizes

## Common Responsive Patterns

### Stack on Mobile, Row on Desktop
```jsx
<div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
  <div className="flex-1">Column 1</div>
  <div className="flex-1">Column 2</div>
</div>
```

### Hide/Show Elements
```jsx
{/* Show only on mobile */}
<div className="lg:hidden">Mobile Menu</div>

{/* Show only on desktop */}
<div className="hidden lg:block">Desktop Nav</div>
```

### Responsive Text
```jsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl">
  Responsive Heading
</h1>
```

### Responsive Spacing
```jsx
<div className="p-4 sm:p-6 lg:p-8 gap-2 sm:gap-4 lg:gap-6">
  Responsive Padding & Gap
</div>
```

## Accessibility Checklist

- [ ] Text is readable on all sizes
- [ ] Buttons are 44×44px minimum on mobile
- [ ] No horizontal scrolling
- [ ] Forms are easy to fill on mobile
- [ ] Touch targets have spacing
- [ ] Focus indicators visible
- [ ] Colors have sufficient contrast
- [ ] Images scale properly

## Performance Tips

1. **Use CSS variables** instead of hardcoded values
2. **Use clamp()** for fluid sizing
3. **Use auto-fit/auto-fill** for grids
4. **Minimize media queries**
5. **Test on real devices**
6. **Monitor bundle size**
7. **Optimize images**
8. **Lazy load content**

## Troubleshooting

### Content overflows on mobile?
- Add `overflow-hidden` to parent
- Use `max-w-full` on elements
- Check padding/margin doesn't exceed 100%

### Text too small on mobile?
- Use responsive font sizes
- Minimum 16px on inputs (prevents iOS zoom)
- Use `clamp()` for fluid scaling

### Buttons not touch-friendly?
- Ensure 44×44px minimum
- Add padding for touch targets
- Test on actual mobile devices

### Layout breaks at certain size?
- Check all breakpoints
- Test on real device sizes
- Verify media queries are correct

## Resources

- [MDN Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Tailwind Responsive](https://tailwindcss.com/docs/responsive-design)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

**Quick Links**
- Dev Server: http://localhost:5173/
- Full Guide: PREMIUM_UPGRADE_GUIDE.md
- Implementation: UPGRADE_SUMMARY.md

Happy coding! 🚀
