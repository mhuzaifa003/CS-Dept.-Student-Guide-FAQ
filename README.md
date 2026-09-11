# 🎓 CS Department Student Guide & FAQ

**🌐 For Students:** If you are looking for the actual guide to find answers or view the campus map, please visit the **[Live Website](https://mhuzaifa003.github.io/CS-Dept.-Student-Guide-FAQ/)**, this repository is only for maintainers.

---

## 🛠️ For Future Ambassadors & Maintainers

This documentation is specifically written for future Student Ambassadors and administrators of the CS Student Body who may fork, maintain, and/or expand this project in the future.

This interactive website was deliberately designed without complex build tools, ensuring that anyone stepping into the ambassador role can easily update the content and maintain the codebase with basic web development knowledge (HTML, CSS, JS).

### 📂 Architecture & File Structure
*   **`index.html`**: The main dashboard houses links to all other pages for the website (Referred to as 'features').
*   **`faq.html & faq.json`**: The core logic controller that fetches data from `faq.json`, auto-generates display IDs (e.g., `GEN-001`), renders category tabs, and powers the live search filtering.
*   **`faq`**: The central data store containing the page metadata (like the last updated date) and an array of categorized questions alongside their HTML-formatted answers.
*   **`styles.css`**: The global stylesheet defining the university color palette, typography, and responsive grid layout that adapts to mobile screens.
*   **`map.html`**: A standalone interactive map page utilizing the Leaflet.js library (`L.CRS.Simple`) to overlay the custom `campus-map.png` onto a coordinate system.

### 🚀 Local Development
Because the application fetches `data/faq.json` dynamically via an asynchronous function, opening `index.html` directly from your file system will throw a CORS error and fail to load the questions. To test your changes locally:
1.  Fork and clone the repository to your machine.
2.  Start a local development server in the project directory (e.g., `python -m http.server 8000`, `npx serve`, or use the VS Code "Live Server" extension).
3.  Open `http://localhost:8000` (or your respective port) in your browser.

### 🤝 Handover & Updating Content
As a maintainer, you will rarely need to alter the HTML or JavaScript files. 
*   **Updating FAQs:** To add or modify questions, simply open `faq.json` and append your new question object to the `faqs` array. Ensure you assign it a valid category from the `categories` array.
*   **Updating the Map:** If you need to add a new campus facility to `map.html`, use the built-in click-to-log helper (Commented out in the public release). Click anywhere on the map in your browser to trigger an alert with the exact `x` and `y` pixel coordinates, then add the new location object to the `locations` array.

Originally established by Muhammad Huzaifa (mhuzaifa003) for the CUST CS Student Body.
