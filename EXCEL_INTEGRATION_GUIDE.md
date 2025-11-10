# Excel/Google Sheets Integration Guide

This guide explains how to connect your **constantly updated** Excel/Google Sheets data to the JunkTeens Stats Dashboard.

## ✅ Works with Constantly Updated Sheets!

**The current setup IS designed to work with constantly updated Excel/Google Sheets!** Here's how:

1. **Auto-refresh**: The page automatically fetches new data every minute (configurable)
2. **Cache-busting**: Prevents browser caching to ensure fresh data
3. **Real-time updates**: Changes in your Excel/Sheet will appear on the website within the refresh interval

## Current Status

✅ **Dummy data is now populated** - All tables show sample numbers for testing
✅ **Data attributes added** - Each cell has `data-sheet`, `data-metric`, and `data-truck` attributes for mapping
✅ **JavaScript integration ready** - Code is in place to fetch and update from Excel/Google Sheets
✅ **Constantly updated support** - Includes cache-busting and auto-refresh for live data

## How to Connect Live Excel Data

### Option 1: Google Sheets (Recommended - Works with Constantly Updated Data!)

**Why Google Sheets is Best for Constantly Updated Data:**
- ✅ Real-time sync: Changes in Excel automatically sync to Google Sheets if you use Google Sheets natively
- ✅ Auto-refresh: Website fetches fresh data every minute (configurable)
- ✅ No caching: Cache-busting ensures you always get the latest data
- ✅ No API key needed: Public sheets work out of the box

**Step 1: Set Up Your Sheet**
1. **Option A - Use Google Sheets directly**: Create a new Google Sheet and update it directly
2. **Option B - Upload Excel**: Upload your Excel file to Google Sheets (File → Import → Upload)
   - Note: If you keep updating Excel, you'll need to re-upload or use Excel Online (see Option 2)

**Step 2: Make Sheet Public**
1. Click "Share" button (top right)
2. Change access to "Anyone with the link can view"
3. Copy the link

**Step 3: Get Sheet ID**
From the URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
Copy the part between `/d/` and `/edit`

**Step 4: Update Configuration**
Open `index.html` and find the `CONFIG` object (around line 433):
```javascript
const CONFIG = {
    googleSheetId: 'YOUR_SHEET_ID_HERE',  // ← Paste your Sheet ID here
    sheetName: 'Sheet1',                  // ← Change if your tab has different name
    refreshInterval: 30000,               // ← Auto-refresh every 30 seconds (for constantly updated data)
    useDummyData: false,                  // ← Change to false when ready for live data
    dataSource: 'google_sheets'          // ← Keep as 'google_sheets'
};
```

**For Constantly Updated Data:**
- Set `refreshInterval: 30000` for 30-second updates (more frequent)
- Set `refreshInterval: 60000` for 1-minute updates (default)
- The cache-busting is automatic - no extra configuration needed!

**Step 5: Structure Your Sheet**

Your Google Sheet should have data organized like this:

**Sheet Structure:**
```
Row 1: Headers (TRUCK# | 1 | 2 | 3 | 4 | 5 | TOTAL)
Row 2: Daily Rev (Today)    | $1250 | $1450 | $1380 | $1320 | $1560 | $6960
Row 3: Close Rate (Today)    | 68%   | 72%   | 70%   | 65%   | 75%   | 70%
Row 4: RPH (Today)           | $156  | $181  | $172  | $165  | $195  | $174

Row 6: Daily Rev (Yesterday) | $1180 | $1350 | $1420 | $1290 | $1480 | $6720
Row 7: Close Rate (Yesterday) | 65%   | 70%   | 71%   | 64%   | 74%   | 69%
Row 8: RPH (Yesterday)        | $147  | $169  | $178  | $161  | $185  | $168

Row 10: Weekly Records
Row 11: Rank | Truck# | Revenue | Date
Row 12: 1ST  | 5      | $2150   | Sept. 20
Row 13: 2ND  | 2      | $2080   | Sept. 21
Row 14: 3RD  | 3      | $1980   | Sept. 19
```

**Note:** The exact row numbers can be adjusted in the `parseCSVToData()` function if your structure is different.

### Option 2: Excel Online / OneDrive (For Constantly Updated Excel Files)

**If you want to keep using Excel directly and have it constantly updated:**

**Step 1: Set Up Your Excel File**
1. Upload your Excel file to OneDrive
2. Right-click the file → "Share" → "Anyone with the link can view"
3. Copy the sharing link
4. **IMPORTANT:** Export your Excel file to CSV format (File → Save As → CSV)
   - Keep both the Excel file (for editing) and CSV file (for the website)
   - Or upload the Excel to Google Sheets for easier setup

**Step 2: Configure Excel Online in index.html**

Open `index.html` and update the `CONFIG` object:
```javascript
const CONFIG = {
    excelOnlineUrl: 'YOUR_ONEDRIVE_CSV_SHARE_LINK_HERE',  // ← Paste your CSV share link
    refreshInterval: 30000,  // Auto-refresh every 30 seconds
    useDummyData: false,
    dataSource: 'excel_online'  // ← Change this!
};
```

**Step 3: Map Your Excel Cells (IMPORTANT!)**

This is where you tell the website which Excel cells to pull data from. In the `CONFIG` object, find the `cellMapping` section:

```javascript
cellMapping: {
    today: {
        daily_rev: {
            truck1: 'B2',    // ← Change to your Excel cell (e.g., if Truck 1 Daily Rev is in cell D5, use 'D5')
            truck2: 'C2',    // ← Change to your Excel cell
            truck3: 'D2',    // ← Change to your Excel cell
            // ... etc
        }
    }
}
```

**How to Find Excel Cell References:**
1. Open your Excel file
2. Look at the cell where your data is (e.g., if "Truck 1 Daily Revenue" is in column B, row 2)
3. The cell reference is shown in the Name Box (top left) - it will say "B2"
4. Copy that cell reference (like "B2", "C5", "D10") into the CONFIG

**Example Excel Layout:**
```
     A         B      C      D      E      F      G
1  TRUCK#      1      2      3      4      5   TOTAL
2  Daily Rev   1250   1450   1380   1320   1560   6960
3  Close Rate  68     72     70     65     75     70
4  RPH         156    181    172    165    195    174
```

For this layout, your mapping would be:
```javascript
cellMapping: {
    today: {
        daily_rev: {
            truck1: 'B2',  // Column B, Row 2 = Truck 1 Daily Rev ($1250)
            truck2: 'C2',  // Column C, Row 2 = Truck 2 Daily Rev ($1450)
            truck3: 'D2',  // Column D, Row 2 = Truck 3 Daily Rev ($1380)
            truck4: 'E2',  // Column E, Row 2 = Truck 4 Daily Rev ($1320)
            truck5: 'F2',  // Column F, Row 2 = Truck 5 Daily Rev ($1560)
            total: 'G2'    // Column G, Row 2 = Total Daily Rev ($6960)
        },
        close_rate: {
            truck1: 'B3',  // Column B, Row 3 = Truck 1 Close Rate (68%)
            truck2: 'C3',  // Column C, Row 3 = Truck 2 Close Rate (72%)
            // ... etc
        },
        rph: {
            truck1: 'B4',  // Column B, Row 4 = Truck 1 RPH ($156)
            // ... etc
        }
    }
}
```

**Note:** OneDrive Excel files work best when exported to CSV format. The website reads CSV data, so you'll need to:
- Export your Excel to CSV when you make updates, OR
- Use Google Sheets instead (which works better with live updates)

### Option 3: Direct CSV URL (For Hosted CSV Files)

**If you have a CSV file hosted online that's constantly updated:**

1. Host your CSV file on a web server (or cloud storage like Dropbox, Google Drive, etc.)
2. Get the direct download URL
3. Update `index.html` CONFIG:
```javascript
const CONFIG = {
    csvUrl: 'https://your-server.com/path/to/data.csv',
    refreshInterval: 30000,  // Auto-refresh every 30 seconds
    useDummyData: false,
    dataSource: 'csv_url'  // ← Change this!
};
```

**For Google Drive CSV:**
- Upload CSV to Google Drive
- Get shareable link → Copy link ID
- Use: `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`

**For Dropbox CSV:**
- Upload CSV to Dropbox
- Get shareable link → Change `?dl=0` to `?dl=1` for direct download

## Excel Cell Mapping Guide

### How to Specify Which Excel Cells to Use

The website uses **Excel cell notation** (like A1, B2, C5) to pull data from specific cells in your Excel file.

**Understanding Excel Cell Notation:**
- **Columns** are letters: A, B, C, D, E, F, G, H, ... Z, AA, AB, etc.
- **Rows** are numbers: 1, 2, 3, 4, 5, etc.
- **Cell reference** = Column + Row: A1, B2, C5, D10, etc.

**Example:**
- Cell `B2` = Column B, Row 2
- Cell `C5` = Column C, Row 5
- Cell `AA10` = Column AA, Row 10

### Step-by-Step: Mapping Your Excel Cells

1. **Open your Excel file** and locate where each piece of data is stored

2. **Find the cell reference** for each number:
   - Click on the cell containing the data
   - Look at the **Name Box** (top-left, next to the formula bar)
   - It will show the cell reference (e.g., "B2", "C5")

3. **Update the CONFIG in index.html**:
   - Open `index.html`
   - Find the `CONFIG` object
   - Find the `cellMapping` section
   - Replace the cell references with your actual Excel cell locations

**Example Configuration:**
```javascript
cellMapping: {
    today: {
        daily_rev: {
            truck1: 'B2',    // If Truck 1 Daily Rev is in cell B2
            truck2: 'C2',    // If Truck 2 Daily Rev is in cell C2
            truck3: 'D2',    // If Truck 3 Daily Rev is in cell D2
            truck4: 'E2',    // If Truck 4 Daily Rev is in cell E2
            truck5: 'F2',    // If Truck 5 Daily Rev is in cell F2
            total: 'G2'      // If Total Daily Rev is in cell G2
        }
    }
}
```

### Common Excel Layouts

**Layout 1: Headers in Row 1, Data Starts in Row 2**
```
     A         B      C      D      E      F      G
1  TRUCK#      1      2      3      4      5   TOTAL
2  Daily Rev   1250   1450   1380   1320   1560   6960
3  Close Rate  68     72     70     65     75     70
```
→ Truck 1 Daily Rev = B2, Truck 2 Daily Rev = C2, etc.

**Layout 2: Headers in Row 1, Data Starts in Row 3 (with empty row)**
```
     A         B      C      D      E      F      G
1  TRUCK#      1      2      3      4      5   TOTAL
2  (empty row)
3  Daily Rev   1250   1450   1380   1320   1560   6960
```
→ Truck 1 Daily Rev = B3, Truck 2 Daily Rev = C3, etc.

**Layout 3: Different Columns for Different Metrics**
```
     A         B      C      D      E      F      G
1  METRIC      TRUCK1 TRUCK2 TRUCK3 TRUCK4 TRUCK5 TOTAL
2  Daily Rev   1250   1450   1380   1320   1560   6960
3  Close Rate  68     72     70     65     75     70
```
→ Same as Layout 1: Truck 1 Daily Rev = B2

### What Each Mapping Field Does

**Today's Stats:**
- `today.daily_rev.truck1` → Truck 1 Daily Revenue (shows in first column under "TODAY")
- `today.daily_rev.truck2` → Truck 2 Daily Revenue
- `today.close_rate.truck1` → Truck 1 Close Rate (%)
- `today.rph.truck1` → Truck 1 Revenue Per Hour ($)

**Yesterday's Stats:**
- Same structure as Today, but pulls from different rows in Excel

**Weekly Records:**
- `weekly.rank1_truck` → Truck number for 1st place
- `weekly.rank1_revenue` → Revenue for 1st place
- `weekly.rank1_date` → Date for 1st place record

## Customization

### Adjust Row Mapping

If your Excel structure is different, edit the `parseCSVToData()` function (around line 571) to match your row/column layout.

### Change Refresh Rate

For **constantly updated sheets**, use faster refresh rates:
- `refreshInterval: 30000` = 30 seconds (recommended for constantly updated data)
- `refreshInterval: 60000` = 1 minute (default)
- `refreshInterval: 120000` = 2 minutes
- `refreshInterval: 300000` = 5 minutes
- `refreshInterval: 0` = no auto-refresh (manual refresh only)

**Note:** Faster refresh rates use more bandwidth, but ensure more up-to-date data.

### Format Numbers

The code automatically formats:
- Currency: Adds `$` and commas (e.g., `1250` → `$1,250`)
- Percent: Adds `%` (e.g., `68` → `68%`)
- Dates: Uses as-is

## Testing

1. **With Dummy Data:** The page currently shows dummy numbers. This is active by default.
2. **With Live Data:** 
   - Set `useDummyData: false` in CONFIG
   - Enter your Google Sheet ID
   - Refresh the page
   - Check browser console (F12) for any errors

## Troubleshooting

**Data not loading?**
- Check browser console (F12) for errors
- Verify Google Sheet is public
- Verify Sheet ID is correct
- Check that sheet name matches `CONFIG.sheetName`

**Wrong data appearing?**
- Adjust row numbers in `parseCSVToData()` function
- Verify your Excel structure matches the expected format

**Need help?**
- Check the JavaScript console for error messages
- Verify your sheet structure matches the template above
- Make sure all cells have values (empty cells may cause issues)

## Next Steps

1. ✅ Dummy data is already showing
2. **Choose your data source:**
   - **Google Sheets**: Upload Excel to Google Sheets or use Google Sheets directly
   - **Excel Online**: Share Excel from OneDrive
   - **CSV**: Host CSV file online
3. Make your sheet/file public (view access)
4. Get the Sheet ID or URL
5. Update CONFIG in `index.html`:
   - Set `googleSheetId`, `excelOnlineUrl`, or `csvUrl`
   - Set `dataSource` to match your choice
   - Set `refreshInterval: 30000` for constantly updated data (30 seconds)
   - Set `useDummyData: false`
6. Test the connection

**The page will automatically refresh every 30-60 seconds to show updated data from your constantly updated Excel/sheet!**

## FAQ: Constantly Updated Data

**Q: Will this work if I'm constantly updating my Excel sheet?**  
A: Yes! The auto-refresh feature fetches new data every 30-60 seconds. The cache-busting ensures fresh data.

**Q: How often should I set the refresh interval?**  
A: For constantly updated data, use 30 seconds (30000ms). For less frequent updates, 1-2 minutes is fine.

**Q: Do I need to manually refresh the page?**  
A: No! The page auto-refreshes the data in the background. Just keep the page open.

**Q: What if my Excel structure changes?**  
A: Update the `parseCSVToData()` function in `index.html` to match your new structure.


