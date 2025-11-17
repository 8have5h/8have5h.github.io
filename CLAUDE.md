# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Bhavesh Gurnani, built with Next.js 15.3.1, React 19, TypeScript, and Tailwind CSS 4. The site is configured for static export and deployment to GitHub Pages (8have5h.github.io).

## Development Commands

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production (static export)
npm run build

# Start production server (for testing build output locally)
npm start

# Run linter
npm run lint
```

## Architecture

### App Structure

- **Next.js App Router**: Uses Next.js 15 App Router with `src/app/` directory
- **Static Export**: Configured with `output: 'export'` in next.config.ts for GitHub Pages deployment
- **Client-Side Rendering**: Main portfolio component is client-side (`'use client'` directive)
- **Path Aliases**: `@/*` maps to `./src/*` for imports

### Key Files

- `src/app/layout.tsx`: Root layout with Inter font from Google Fonts, metadata configuration
- `src/app/page.tsx`: Server component that renders the PortfolioClient component
- `src/components/PortfolioClient.tsx`: Main client component (728 lines) containing all portfolio content and logic
- `src/lib/utils.ts`: Utility functions (likely contains `cn()` for className merging)

### Component Organization

The main portfolio component (`PortfolioClient.tsx`) is a monolithic client component that includes:

- **Hero Section**: Animated background with floating elements, social links
- **Tab System**: Uses Radix UI tabs for navigation between sections
  - About: Personal info, technical skills, areas of interest
  - Projects: Project cards with technologies and links
  - Experience: Timeline of internships and positions
  - Achievements: Academic milestones and education
  - Blog: Markdown blog post rendering (fetches from `/public/posts/`)

- **Helper Components** (defined within PortfolioClient.tsx):
  - `ProjectCard`: Displays project with details, tech stack, and links
  - `AchievementCard`: Shows achievements with icons and color coding
  - `BlogTabContent`: Fetches and renders markdown from `/public/posts/sample-post.md`

### Styling

- **Tailwind CSS 4**: Using new `@import "tailwindcss"` syntax
- **shadcn/ui Components**: Card, Badge, Tabs from Radix UI
- **Typography Plugin**: `@tailwindcss/typography` for blog post styling with extensive prose customization
- **Custom Animations**: `float` animation for hero background elements
- **Color Scheme**: Dark theme with gradient accents (blue, purple, green, yellow, red)
- **Dynamic Classes**: Color-coded cards and badges based on props

### Data Flow

- **Static Content**: All portfolio data (projects, achievements, experience) is hardcoded in PortfolioClient.tsx
- **Blog Posts**: Loaded client-side via fetch from `/public/posts/` directory
- **Markdown Rendering**: Uses `react-markdown` with `remark-gfm` plugin

## Important Notes

### GitHub Pages Deployment

- The site is configured for deployment to `8have5h.github.io` (username.github.io format)
- Since this is a username.github.io repo, `basePath` and `assetPrefix` are **not** used
- If deploying to a different repo name, uncomment and configure basePath/assetPrefix in next.config.ts

### Hydration Considerations

- Uses `suppressHydrationWarning` on `<html>` tag in layout.tsx
- Client component uses opacity transition on mount to avoid flash
- Comment in layout.tsx notes: "suppressHydrationWarning can sometimes help, but fixing the root cause is better"

### Content Updates

To update portfolio content, edit `src/components/PortfolioClient.tsx`:

**Profile Image**:
- Located at `/public/profile.jpg`
- Displayed in About section (line ~312-317)
- Circular with gradient border

**Personal Info**:
- Hero section: Name, title, description (line ~245-251)
- About section: Bio, skills, interests (line ~307-419)
- Contact links throughout (email, GitHub, LinkedIn)

**Projects**:
- Each ProjectCard call in Projects tab (line ~432-575)
- Color-coded by theme (purple, yellow, blue, green, red)
- Includes technologies, details, and GitHub/project links

**Experience Timeline**:
- Timeline items in Experience tab (line ~586-730)
- Includes internships, teaching, research, and activities
- Color-coded dots on timeline

**Achievements**:
- Academic milestones using AchievementCard (line ~746-751)
- Education details (line ~757-777)
- Additional activities and learning (line ~782-790)

**Blog Posts**:
- Add markdown files to `/public/posts/`
- Update `blogPosts` array (line ~162-172)
- Posts automatically appear in searchable grid

### TypeScript Configuration

- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (Next.js 15 default)
- All return types are inferred (explicitly removed `: JSX.Element` annotations per comments)

### UI Components

Uses shadcn/ui component library (Radix UI primitives):
- Components defined in `src/components/ui/`
- Configuration in `components.json`
- Utility function `cn()` from `src/lib/utils.ts` for className merging

## Blog System

The blog system is a full-featured blogging platform with:

### Features
- **Multiple Post Support**: Define posts in the `blogPosts` array in PortfolioClient.tsx (line ~162)
- **Blog Post Grid**: Shows all posts in a responsive 2-column grid
- **Search Functionality**: Real-time search by title, excerpt, or tags
- **Tag System**: Each post can have multiple tags for categorization
- **Individual Post View**: Click any post to read the full content
- **Back Navigation**: Easy navigation back to the post list
- **Loading States**: Proper loading and error handling for markdown files

### Adding New Blog Posts
1. Create a new markdown file in `/public/posts/` (e.g., `my-new-post.md`)
2. Add entry to `blogPosts` array in PortfolioClient.tsx:
```typescript
{
  id: '2',
  title: 'Your Post Title',
  date: '2024-01-20',
  excerpt: 'A brief description of your post...',
  tags: ['Tag1', 'Tag2'],
  filename: 'my-new-post.md'
}
```
3. The post will automatically appear in the blog grid

### Blog Post Interface
Each post requires:
- `id`: Unique identifier
- `title`: Post title
- `date`: Publication date (YYYY-MM-DD format)
- `excerpt`: Brief description shown on grid
- `tags`: Array of tags for categorization and search
- `filename`: Markdown file name in `/public/posts/`

## Design Patterns

- **Monolithic Client Component**: Entire portfolio is a single large component rather than split into multiple files
- **Color Coding**: Consistent color system across project cards (blue, purple, green, yellow, red, gray)
- **Responsive Design**: Uses Tailwind breakpoints (sm, md, lg) throughout
- **Animation**: Fade-in on mount, floating background elements, hover effects
- **Accessibility**: ARIA labels on links and interactive elements
