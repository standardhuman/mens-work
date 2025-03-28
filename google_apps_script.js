/**
 * Serves the content of the Google Sheet formatted as JSON.
 * Each row represents a profile with Name, Category, and Description (HTML).
 */
function doGet(e) {
  // Replace with your actual Google Sheet ID
  const sheetId = 'YOUR_SHEET_ID_HERE';
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Sheet1');
  
  // Get all data from the sheet
  const data = sheet.getDataRange().getValues();
  
  // Extract header row
  const headers = data[0];
  
  // Initialize arrays to store profiles
  const profiles = [];
  
  // Process each row (skip header row)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    // Skip empty rows
    if (!row[0]) continue;
    
    // Create profile object
    const profile = {
      name: row[0], // Name (Column A)
      category: row[1], // Category (Column B)
      descriptionHtml: row[2] // Description with HTML (Column C)
    };
    
    // Add profile to array
    profiles.push(profile);
  }
  
  // Log the number of profiles found
  console.log("Profiles found:", profiles.length);
  
  // Serve the data as JSON
  return ContentService
    .createTextOutput(JSON.stringify(profiles, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

// Helper function to test the script within the editor
function testGetData() {
  const jsonOutput = doGet().getContent();
  Logger.log(jsonOutput);
}
