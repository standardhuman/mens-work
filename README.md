# The Alchemist's Circle - Setup Instructions

This document provides instructions for setting up the Google Sheet data source and Google Apps Script for The Alchemist's Circle website.

## Setup Process

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Import the `profiles.csv` file:
   - Click "File" > "Import" > "Upload" > Select the `profiles.csv` file
   - Select "Replace spreadsheet" and click "Import data"
3. Make sure the sheet has these columns:
   - Column A: Name
   - Column B: Category
   - Column C: Description (with HTML)
4. Add your own profile data as needed
5. Note the Sheet ID from the URL:
   - The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the `YOUR_SHEET_ID_HERE` part for the next step

### 2. Create a Google Apps Script

1. Go to [Google Apps Script](https://script.google.com) and create a new project
2. Delete any default code in the editor
3. Copy and paste the code from `google_apps_script.js`
4. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID from step 1
5. Save the project (click the disk icon or press Ctrl+S/Cmd+S)
6. Deploy the script as a web app:
   - Click "Deploy" > "New deployment"
   - Select type: "Web app"
   - Description: "Mens Work Profiles"
   - Execute as: "Me"
   - Who has access: "Anyone, even anonymous"
   - Click "Deploy"
   - Authorize the app when prompted
   - Copy the Web App URL that's provided after deployment

### 3. Update the Website

1. Update the `APPS_SCRIPT_URL` in `code.js` with your new Web App URL:
   ```javascript
   const APPS_SCRIPT_URL = 'YOUR_NEW_WEB_APP_URL';
   ```
2. Commit and push the changes to GitHub
3. The website should now display profiles from your Google Sheet

## Maintaining Your Profiles

To add, edit, or remove profiles:
1. Simply update the Google Sheet
2. The website will automatically reflect these changes the next time it's loaded

## Troubleshooting

If profiles aren't showing up:
1. Check the browser console for errors
2. Make sure your Google Sheet is properly formatted
3. Verify that your Google Apps Script is deployed correctly
4. Ensure the Web App URL in `code.js` is correct
