# JunkTeens Stats Dashboard

A live statistics dashboard for JunkTeens operations, displaying daily revenue, close rates, RPH (Revenue Per Hour), and weekly records.

## Features

- Real-time stats dashboard
- Today and Yesterday comparisons
- Weekly record tracking
- Google Reviews integration
- Excel/Google Sheets data integration

## GitHub Pages Deployment

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Initial Setup (One-time)

1. Go to your repository on GitHub: https://github.com/Ga1axia/JunkTeensStats
2. Click on **Settings** (in the repository menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
5. Save the settings

### Automatic Deployment

Once enabled, every time you push to the `main` branch, GitHub Actions will automatically:
- Build and deploy your site
- Make it available at: `https://ga1axia.github.io/JunkTeensStats/`

### Manual Deployment

You can also trigger a manual deployment:
1. Go to the **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### View Your Site

After the first deployment completes (usually takes 1-2 minutes), your site will be live at:
**https://ga1axia.github.io/JunkTeensStats/**

## Local Development

Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000`

## Configuration

See `EXCEL_INTEGRATION_GUIDE.md` for instructions on connecting your Excel/Google Sheets data source.

