# GitHub Pages Setup Instructions

## ⚠️ IMPORTANT: Enable GitHub Pages First

The deployment workflow failed because GitHub Pages needs to be enabled in your repository settings.

## Step-by-Step Setup

### 1. Enable GitHub Pages

1. **Go directly to your Pages settings:**
   - Click this link: https://github.com/Ga1axia/JunkTeensStats/settings/pages

2. **Configure the source:**
   - Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
   - Do NOT select "main" branch - select "GitHub Actions" instead
   - Click **Save**

### 2. Re-run the Workflow

After enabling Pages, you have two options:

**Option A: Wait for next push**
- Just push any change to trigger the workflow automatically

**Option B: Manual trigger**
1. Go to: https://github.com/Ga1axia/JunkTeensStats/actions
2. Click on **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** button (top right)
4. Select **"main"** branch
5. Click **"Run workflow"**

### 3. View Your Site

Once the workflow completes successfully (green checkmark), your site will be live at:
**https://ga1axia.github.io/JunkTeensStats/**

## Troubleshooting

### If you see "Not Found" error:
- Make sure you selected **"GitHub Actions"** as the source (not a branch)
- Wait 1-2 minutes after enabling Pages before running the workflow

### If the workflow still fails:
- Check the Actions tab for error messages
- Make sure you have admin access to the repository
- Verify Pages is enabled in Settings → Pages

## Quick Links

- **Pages Settings:** https://github.com/Ga1axia/JunkTeensStats/settings/pages
- **Actions/Workflows:** https://github.com/Ga1axia/JunkTeensStats/actions
- **Your Site (after deployment):** https://ga1axia.github.io/JunkTeensStats/

