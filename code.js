document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    // PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE:
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxhV7Xp2lcJXgBnUglsM2k9hya6JRQl_icoasCsk602DMEA10vJ74gB_djX4ksuxeRKXg/exec';
    // --- END CONFIGURATION ---

    const profilesContainer = document.getElementById('profiles-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const yearSpan = document.getElementById('year');

    // Set current year in footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
        console.error("ERROR: Google Apps Script URL is not set in script.js!");
        showError("Configuration error: Web App URL is missing.");
        return; // Stop execution if URL is missing
    }

    function showError(message) {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
        if (profilesContainer) profilesContainer.innerHTML = ''; // Clear any potential partial content
        if (errorMessage) {
            errorMessage.querySelector('p').textContent = message || 'An unexpected error occurred. Please try refreshing.';
            errorMessage.style.display = 'block';
        }
    }

    function displayProfiles(profiles) {
        if (!profilesContainer) return;

        profilesContainer.innerHTML = ''; // Clear previous content or loading indicator

        if (!profiles || profiles.length === 0) {
             profilesContainer.innerHTML = '<p>No profiles found in the source document.</p>';
             return;
        }

        profiles.forEach((profile, index) => {
            const card = document.createElement('article');
            card.className = 'profile-card';

            // Create and append Name Heading
            const nameHeading = document.createElement('h2');
            nameHeading.textContent = profile.name;
            card.appendChild(nameHeading);

            // Create a container for the description HTML
            const descriptionDiv = document.createElement('div');
            // Use innerHTML carefully as the Apps Script constructs basic HTML
            // This assumes the Apps Script output is trusted (as you control it)
            descriptionDiv.innerHTML = profile.descriptionHtml || '<p><em>No description provided.</em></p>';
            card.appendChild(descriptionDiv);

            // Set animation delay for staggered effect
            card.style.animationDelay = `${index * 0.1}s`;

            profilesContainer.appendChild(card);
        });
    }

    // Fetch data from Google Apps Script
    fetch(APPS_SCRIPT_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            if (loadingIndicator) loadingIndicator.style.display = 'none';
            displayProfiles(data);
        })
        .catch(error => {
            console.error('Error fetching or processing data:', error);
            showError(`Failed to load profiles. ${error.message}. Please check the console for more details and ensure the Apps Script URL is correct and deployed for 'Anyone'.`);
        });
});
