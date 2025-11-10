# Live Excel Sync Setup Guide

## 🎯 Best Solution: Google Sheets (Recommended for Live Updates)

**For constantly updated Excel files, Google Sheets is the BEST option** because:
- ✅ True live sync - updates appear automatically
- ✅ No manual CSV export needed
- ✅ Works seamlessly with the existing code
- ✅ Free and easy to set up

### Quick Setup Steps:

1. **Import Your Excel to Google Sheets:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Click "Blank" or "New spreadsheet"
   - Go to **File → Import → Upload**
   - Upload your Excel file
   - Click "Import data"

2. **Make It Public:**
   - Click the **"Share"** button (top right)
   - Click **"Change to anyone with the link"**
   - Set permission to **"Viewer"**
   - Click **"Done"**

3. **Get Your Sheet ID:**
   - Look at the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit` (this is your Sheet ID)

4. **Update index.html:**
   Open `index.html` and find the `CONFIG` object (around line 429):
   ```javascript
   const CONFIG = {
       googleSheetId: 'PASTE_YOUR_SHEET_ID_HERE',  // ← Paste your Sheet ID
       sheetName: 'Sheet1',                        // ← Change if your tab name is different
       refreshInterval: 30000,                     // ← 30 seconds for live updates
       useDummyData: false,                         // ← Change to false
       dataSource: 'google_sheets'                 // ← Keep as 'google_sheets'
   };
   ```

5. **That's it!** Your website will now:
   - Auto-refresh every 30 seconds
   - Show live data from your Google Sheet
   - Update automatically when you change the sheet

---

## Alternative: Excel Online (Requires CSV Export)

If you must use Excel Online directly, you need to export to CSV format:

### Option A: OneDrive Excel → CSV

1. **Upload Excel to OneDrive**
2. **Export to CSV:**
   - Open the Excel file in Excel Online
   - Go to **File → Save As → Download a Copy → CSV**
   - Upload the CSV file to OneDrive
   - Share the CSV file publicly

3. **Get the CSV Download URL:**
   - Right-click the CSV file in OneDrive
   - Click "Share" → "Anyone with the link can view"
   - Copy the link
   - Convert to direct download: Change the URL to end with `?download=1`

4. **Update index.html:**
   ```javascript
   const CONFIG = {
       excelOnlineUrl: 'YOUR_CSV_DOWNLOAD_URL_HERE',
       refreshInterval: 30000,
       useDummyData: false,
       dataSource: 'excel_online'
   };
   ```

**⚠️ Note:** This requires manual CSV export each time you update Excel. For live sync, use Google Sheets instead.

---

## Your Excel Workbook URL

If you provided a workbook URL, here's how to use it:

### If it's a Google Sheets URL:
- Extract the Sheet ID and use the Google Sheets setup above

### If it's an Excel Online/OneDrive URL:
- Follow Option A above (export to CSV)
- Or better: Import to Google Sheets for live sync

### If it's a SharePoint URL:
- Export to CSV first
- Or import to Google Sheets for better live sync

---

## Recommended Workflow for Live Updates

1. **Use Google Sheets** (easiest for live sync)
   - Import your Excel once
   - Edit directly in Google Sheets
   - Website auto-updates every 30 seconds

2. **Or: Excel → Google Sheets Sync**
   - Keep editing in Excel
   - Periodically re-import to Google Sheets
   - Website pulls from Google Sheets (live)

3. **Or: Excel → CSV → Auto-upload**
   - Export Excel to CSV
   - Use a service to auto-upload CSV
   - Website pulls CSV (requires manual export)

**For the best live sync experience, use Google Sheets!**

---

## Testing Your Setup

1. Open your website
2. Open browser console (F12)
3. Look for messages like:
   - ✅ "Data updated successfully at [time]" = Working!
   - ❌ Error messages = Check your Sheet ID/URL and sharing settings

4. Make a change in your Google Sheet
5. Wait 30 seconds (or your refresh interval)
6. Check the website - it should update automatically!

---

## Troubleshooting

**Data not updating?**
- Check browser console (F12) for errors
- Verify Sheet is public (Anyone with link can view)
- Verify Sheet ID is correct
- Check refreshInterval is set (30000 = 30 seconds)

**Wrong data showing?**
- Check your Excel cell mapping in CONFIG.cellMapping
- Verify your sheet structure matches the expected format

**Still having issues?**
- Use Google Sheets (most reliable)
- Make sure sheet is public
- Check console for specific error messages

