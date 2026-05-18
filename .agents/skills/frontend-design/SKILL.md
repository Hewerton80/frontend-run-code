---
name: frontend-design
description: >
  Guia de design e theming para componentes front-end com CSS variables semânticas, Tailwind CSS e OKLCH.
  Use SEMPRE que o usuário pedir para criar ou editar temas, customizar cores, configurar dark mode, adicionar
  tokens de cor, alterar border radius, customizar variantes de componentes, ou trabalhar com qualquer aspecto
  visual/estético do projeto. Esta skill define o padrão definitivo de theming e design do codebase.
  Ative também quando o usuário mencionar: globals.css, CSS variables, --primary, --background, oklch,
  dark mode, shadcn theme, tailwind theme, design tokens, paleta de cores ou customização de componentes.
---

# Frontend Design — Customization & Theming

Components reference semantic CSS variable tokens. Changing the variables changes every component that uses them — no need to hunt down individual class names.

---

## How It Works

The theming pipeline has three layers:

1. **CSS variables** defined in `:root` (light) and `.dark` (dark mode) inside the global CSS file.
2. **Tailwind utilities** that map those variables: `bg-primary`, `text-muted-foreground`, `border-input`, etc.
3. **Components** that consume the utilities — altering a variable cascades to all components that reference it.

Never bypass this pipeline by hardcoding hex or rgb values in component files.

---

## Rule: Color Variables

Every color follows the `name` / `name-foreground` convention:

- `name` → background/surface fill
- `name-foreground` → text or icons rendered **on top of** that fill

| Variable                                     | Purpose                          |
| -------------------------------------------- | -------------------------------- |
| `--background` / `--foreground`              | Page background and default text |
| `--card` / `--card-foreground`               | Card surfaces                    |
| `--primary` / `--primary-foreground`         | Primary buttons and actions      |
| `--secondary` / `--secondary-foreground`     | Secondary actions                |
| `--muted` / `--muted-foreground`             | Muted/disabled states            |
| `--accent` / `--accent-foreground`           | Hover and accent states          |
| `--destructive` / `--destructive-foreground` | Error and destructive actions    |
| `--border`                                   | Default border color             |
| `--input`                                    | Form input borders               |
| `--ring`                                     | Focus ring color                 |
| `--chart-1` through `--chart-5`              | Chart / data-visualization       |
| `--sidebar-*`                                | Sidebar-specific colors          |
| `--surface` / `--surface-foreground`         | Secondary surface                |

All colors use **OKLCH** format: `oklch(lightness chroma hue)`.

- Lightness: `0` (black) → `1` (white)
- Chroma: `0` = gray/achromatic, higher = more saturated
- Hue: `0`–`360` degrees

```css
/* Example */
--primary: oklch(0.205 0 0);
```

---

## Rule: Dark Mode

Use **class-based** dark mode toggled by adding `.dark` to the root `<html>` element.

```css
/* globals.css */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
}
```

In React projects using `next-themes`, wrap the app with `<ThemeProvider attribute="class">`. For other React setups, toggle the `dark` class on `document.documentElement` directly.

---

## Rule: Changing the Theme

To change the overall theme, update the CSS variables in the global CSS file (typically `globals.css`). Do **not** create a new CSS file.

Find the correct file path with:

```bash
npx shadcn@latest info
# Look for "tailwindCssFile"
```

### Preset approach

Replace the `:root` and `.dark` blocks entirely with a preset palette. Keep the variable names identical — only change the values.

### Manual approach

Edit individual variables while keeping the `name` / `name-foreground` pair contract intact.

---

## Rule: Adding Custom Colors

1. **Define the variables** in the global CSS file (`globals.css`). Never create a new file for this.

```css
:root {
  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);
}
.dark {
  --warning: oklch(0.41 0.11 46);
  --warning-foreground: oklch(0.99 0.02 95);
}
```

2a. **Register with Tailwind v4** using `@theme inline`:

```css
@theme inline {
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

2b. **Register with Tailwind v3** via `tailwind.config.js`:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        warning: "hsl(var(--warning) / <alpha-value>)",
        "warning-foreground": "hsl(var(--warning-foreground) / <alpha-value>)",
      },
    },
  },
};
```

> For Tailwind v3, convert OKLCH to HSL when declaring in `tailwind.config.js`, since v3 does not natively parse OKLCH. Use OKLCH directly only in `globals.css`.

---

## Rule: Border Radius

Border radius is controlled by a single variable that all components reference:

```css
:root {
  --radius: 0.625rem; /* adjust to taste */
}
```

Components derive their radius from it:

```css
/* Example derivations in globals.css */
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
```

Changing `--radius` reshapes every button, card, input, and popover at once.

---

## Rule: Customizing Components

Prefer these strategies in order:

### 1. Semantic token override

Change the CSS variable — affects all instances globally.

### 2. `className` prop

Pass Tailwind utilities directly to override a specific instance:

```tsx
<Button className="bg-warning text-warning-foreground hover:bg-warning/90">
  Warn
</Button>
```

### 3. Variant extension

Add a new variant to the component's `cva()` call when the style difference is intentional and reusable:

```tsx
const buttonVariants = cva("...", {
  variants: {
    variant: {
      warning: "bg-warning text-warning-foreground hover:bg-warning/90",
    },
  },
});
```

### 4. Wrapper / compound component

Wrap the primitive in a new component only when the composition is complex enough to warrant a name.

---

## Rule: Checking for Updates

Before updating any shadcn/ui component, diff the current component against the registry:

```bash
npx shadcn@latest diff
```

Apply updates selectively to avoid losing local customizations to variants or className logic.

---

## Quick Reference

| Goal                                 | Approach                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------- |
| Change brand color                   | Edit `--primary` / `--primary-foreground` in `:root` and `.dark`            |
| Add a new semantic color             | Add CSS var → register in `@theme inline` (v4) or `tailwind.config.js` (v3) |
| Enable dark mode                     | Add `.dark` class to `<html>`, mirror all vars in `.dark {}` block          |
| Adjust all corner radii              | Edit `--radius` in `:root`                                                  |
| Customize one component instance     | Use `className` prop with Tailwind utilities                                |
| Customize all instances of a variant | Edit `cva()` variants in the component file                                 |
