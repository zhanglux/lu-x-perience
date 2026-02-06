# Lu Zhang - Portfolio

Personal portfolio website showcasing product design work and projects.

## 🚀 Getting Started

### Prerequisites

- Node.js 22.22.0 or higher
- npm 10 or higher

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📦 Build for Production

Build the static site for GitHub Pages:

```bash
npm run build
```

This will:
- Build the Next.js static export
- Copy the output to the `docs/` directory
- Create a `.nojekyll` file for GitHub Pages

## 🚢 Deploy to GitHub Pages

### Initial Setup

1. **Clone or initialize the repository:**
   ```bash
   git clone https://github.com/zhanglux/lu-x-perience.git
   cd lu-x-perience
   ```

2. **Copy the portfolio files:**
   If you created this in a different location, copy all files to the `lu-x-perience` directory.

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
   git commit -m "Add portfolio homepage"
   git push origin main
   ```

6. **Enable GitHub Pages:**
   - Go to your repository on GitHub: https://github.com/zhanglux/lu-x-perience
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select:
     - Branch: `main` (or your default branch)
     - Folder: `/docs`
   - Click **Save**

7. **Access your portfolio:**
   Your portfolio will be available at:
   ```
   https://zhanglux.github.io/lu-x-perience/
   ```

### Updating Your Portfolio

1. Make your changes to the code
2. Build: `npm run build`
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push
   ```

GitHub Pages will automatically update within a few minutes.

## ✏️ Customization

Before deploying, update these in `src/app/page.tsx`:

- **Email address**: Replace `your.email@example.com` with your actual email
- **LinkedIn URL**: Replace `https://linkedin.com/in/yourprofile` with your LinkedIn profile
- **Projects**: Update the projects array with your actual work
- **About section**: Customize the about text with your own story

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📝 License

This project is open source and available under the MIT License.
