# Setup Instructions for lu-x-perience Portfolio

## Quick Start Guide

### Option 1: Copy files to existing repository

1. **Navigate to your portfolio directory:**
   ```bash
   cd /Users/lu.zhang/Documents/lu-x-perience-portfolio
   ```

2. **Initialize git (if not already done):**
   ```bash
   git init
   git remote add origin https://github.com/zhanglux/lu-x-perience.git
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build the site:**
   ```bash
   npm run build
   ```

5. **Commit and push:**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git push -u origin main
   ```

### Option 2: Clone repository first, then copy files

1. **Clone the repository:**
   ```bash
   cd /Users/lu.zhang/Documents
   git clone https://github.com/zhanglux/lu-x-perience.git
   cd lu-x-perience
   ```

2. **Copy all files from lu-x-perience-portfolio:**
   ```bash
   cp -r ../lu-x-perience-portfolio/* .
   cp -r ../lu-x-perience-portfolio/.* . 2>/dev/null || true
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build and deploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Add portfolio homepage"
   git push
   ```

## Enable GitHub Pages

After pushing your code:

1. Go to https://github.com/zhanglux/lu-x-perience
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/docs`
4. Click **Save**

Your portfolio will be live at: **https://zhanglux.github.io/lu-x-perience/**

## Customize Before Deploying

Don't forget to update:
- Email address in `src/app/page.tsx`
- LinkedIn URL in `src/app/page.tsx`
- Project links and descriptions
- About section content
