# Google Drive & Sheets Integration Setup Guide

This guide walks you through setting up the Google APIs needed for the school newspaper website to automatically pull articles from Google Drive.

## Overview

The website will:
1. Read article metadata from a **Google Sheet** (master spreadsheet)
2. Pull article content from **Google Docs** (stored in Google Drive folders)
3. Display them on the website automatically

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project:
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Name it "School Newspaper"
   - Click CREATE

## Step 2: Enable Required APIs

1. In the Cloud Console, go to **APIs & Services > Library**
2. Search for and enable each of these APIs (click each, then click ENABLE):
   - **Google Sheets API**
   - **Google Drive API**
   - **Google Docs API**

## Step 3: Create an API Key

1. Go to **APIs & Services > Credentials**
2. Click **+ CREATE CREDENTIALS** at the top
3. Select **API Key**
4. Copy the key that appears
5. Click **RESTRICT KEY** (optional but recommended)
6. Under "Application restrictions", select "HTTP referrers (web sites)"
7. Add your website domain(s) - for development use `localhost:5173`
8. Click SAVE
9. Copy this key - you'll need it in Step 7

## Step 4: Create the Master Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "School Newspaper Articles"
3. In the first sheet (rename it to "Articles"), set up the header row with these column names:

```
Column A: Title
Column B: Author
Column C: Category
Column D: Date
Column E: Google Doc ID
Column F: Featured
Column G: Excerpt
Column H: Image URL
```

**Example row:**
| Title | Author | Category | Date | Google Doc ID | Featured | Excerpt | Image URL |
|-------|--------|----------|------|---------------|----------|---------|-----------|
| New Sports Facility Opens | John Smith | Sports | 2024-10-21 | 1ABC2def3GHI4jkl | TRUE | The new gym facility is now open... | https://example.com/image.jpg |

### How to get a Google Doc ID:
1. Open the Google Doc in your browser
2. Look at the URL: `https://docs.google.com/document/d/**`[THIS IS THE ID]`**/edit`
3. Copy the long string between `/d/` and `/edit`

4. Copy the Sheet ID from your spreadsheet URL:
   - URL: `https://docs.google.com/spreadsheets/d/**`[THIS IS THE ID]`**/edit`
   - The Sheet ID is the long string after `/d/`

## Step 5: Organize Google Drive Folders (Optional)

While not required, organizing articles by category makes sense:

1. Create a folder in Google Drive called "School Newspaper Articles"
2. Inside, create subfolders for each section:
   - `Sports`
   - `Arts & Culture`
   - `Opinion`
   - `Student Life`
   - `Campus News`
   - etc.
3. Store Google Docs in these folders
4. Reference them in your master sheet by their Document ID

## Step 6: Configure Environment Variables

1. Copy `.env.example` to `.env.local` (it's already created):
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your values:
   ```
   VITE_GOOGLE_API_KEY=your_api_key_from_step_3
   VITE_GOOGLE_SHEETS_ID=your_sheet_id_from_step_4
   VITE_GOOGLE_DRIVE_FOLDER_ID=your_folder_id_from_step_5
   VITE_CACHE_ENABLED=true
   VITE_CACHE_DURATION_MS=3600000
   ```

### How to get the Sheet ID:
- Open your master spreadsheet
- Look at the URL: `https://docs.google.com/spreadsheets/d/`**[COPY THIS PART]**`/edit`

### How to get the Folder ID:
- Open your Drive folder in Google Drive
- Look at the URL: `https://drive.google.com/drive/folders/`**[COPY THIS PART]**
- If you only have one folder, you can leave this blank for now

## Step 7: Grant Permissions

For the website to read your Google Sheets and Docs:

1. Open your master Google Sheet
2. Click **Share** (top right)
3. Under "General access", select **"Anyone with the link"** and choose **"Viewer"**
4. Copy the sharing link to verify

This allows the website to read the sheet and documents using your API key.

## Step 8: Test the Connection

1. In your terminal, run the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:5173`

3. Check the browser console (F12 > Console) for messages like:
   - "Fetched X articles from Google Sheets" ✓ (success)
   - Error messages ✗ (check your API key and sheet ID)

## Troubleshooting

### "Google Sheets ID or API Key not configured"
- Check that `.env.local` exists in the project root
- Verify `VITE_GOOGLE_SHEETS_ID` and `VITE_GOOGLE_API_KEY` are filled in
- Remember: Environment variables must start with `VITE_` to be accessible in the browser

### "404: Spreadsheet not found"
- Verify your Sheet ID is correct (copy/paste from the URL)
- Make sure the sheet has been shared (step 7)

### Articles not appearing
- Check that your sheet is named "Articles" (case-sensitive)
- Verify articles have Google Doc IDs in column E
- Check browser console for specific error messages

### Images not loading
- Verify image URLs are public (right-click > Inspect link > open in new tab)
- Make sure URLs start with `https://`

## Making Articles Live

To publish a new article:

1. **Write in Google Docs**
   - Create a new Google Doc
   - Write your article content
   - Place it in the appropriate Drive folder (optional)

2. **Add to Master Sheet**
   - Open the "School Newspaper Articles" sheet
   - Add a new row with:
     - Title, Author, Category, Date, Google Doc ID, Featured status, Excerpt, Image URL
   - The website will update automatically within 1 hour (or immediately if cache is disabled)

3. **Manual Refresh** (if needed)
   - Developers can run this in browser console: `clearCache()` and refresh

## Performance Notes

- The website caches articles for 1 hour to reduce API calls
- Each article fetch counts toward Google's API quotas
- Free API keys have high quotas but not unlimited
- Caching helps keep the site fast and reliable

## Security

- **Do NOT share your API key publicly** in GitHub or other public places
- The `.env.local` file is in `.gitignore` - never commit it
- API keys in `.env.example` show the format only
- If your key is exposed, regenerate it in Google Cloud Console

## Next Steps

- Set up your first few articles in Google Docs
- Add them to the master sheet
- Test that they appear on the website
- Share the setup process with your editing team

---

**Questions?** Check the main README.md or ask a developer.
