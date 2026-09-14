# 🎓 CS Department Student Guide & FAQ

A lightweight, no-build-tools website for CUST CS students — a single hub for the FAQ knowledge base, an interactive campus map, the course requirement visualizer, a title-page generator, and the shared academic archive.

> 🌐 **For Students:** Looking for answers, the campus map, or another tool? Visit the **[Live Website](https://mhuzaifa003.github.io/CS-Dept.-Student-Guide-FAQ/)**. This repository is for maintainers only.

---

## 🛠️ For Future Ambassadors & Maintainers

This documentation is written for future Student Ambassadors and administrators of the CS Student Body who fork, maintain, or expand this project.

The site is deliberately built without frameworks or a build step, so anyone stepping into the ambassador role can update content and maintain the codebase with basic HTML, CSS, and JS knowledge. As a maintainer, you'll spend almost all of your time editing **JSON files** — HTML/JS changes should be rare.

### Built With

- Vanilla HTML, CSS, and JavaScript (no framework, no bundler)
- [Leaflet.js](https://leafletjs.com/) `v1.9.4` — powers the interactive campus map
- [pdf-lib](https://pdf-lib.js.org/) `v1.4.0` — fills the title-page PDF template client-side
- Google Fonts (Roboto Slab, Inter, IBM Plex Mono)
- Embedded Google Drive folders and a Google Calendar
- Hosted on GitHub Pages

---

## 📂 Project Structure

```
├── index.html                     # Landing dashboard — links to every feature below
├── styles.css                     # Shared stylesheet / design system for the whole site
├── _config.yml                    # Component file used for localhosting with Clean URL Support
├── serve.json                     # Component file user for localhosting with Clean URL Support
├
├── data/                          # Every feature page, and the accompanying JSON files
│   ├── archive.html
│   ├── calendar.html
│   ├── contact-dir.html
│   ├── contact-dir.json
│   ├── course-visualizer.html
│   ├── course-visualizer.json
│   ├── faq.html
│   ├── faq.json
│   ├── index.json
│   ├── map.html
│   ├── map.json
│   └── title-generator.html
│
└── files/                         # Static assets referenced across the site
    ├── campus-map.png             # Base image for the interactive map, edited with GIMP to add blur to non-campus regions.
    ├── course_offerings.pdf
    ├── CUST.png                   # Circular logo shown in the homepage header
    ├── CUST Banner.webp           # Blurred header background
    ├── datesheet.pdf
    ├── favicon.ico                # .ico Conversion of CUST.png used throughout the website as page favicons
    ├── important_dates.pdf
    ├── Student ID Card - AFFIDAVIT.docx
    ├── Student ID Card Form - CUST 2026.pdf
    ├── timetable.pdf
    └── Title Page.pdf             # Blank template used by the Title Generator, should match the pdf offered on the G-Drive for consistency's sake.
```

| Page | Data source | What it does |
|---|---|---|
| `index.html` | `data/index.json` | Landing dashboard + the deadline countdown banner |
| `data/archive.html` | — | Tabbed Google Drive embeds (past papers, templates) |
| `data/calendar.html` | — | Embedded Google Calendar for the current semester |
| `data/contact-dir.html` | `data/contact-dir.json` | Searchable, categorized Administration and Faculty contact information
| `data/course-visualizer.html` | `data/course-visualizer.json` | Curriculum dependency graph |
| `data/faq.html` | `data/faq.json` | Searchable, categorized Q&A knowledge base |
| `data/map.html` | `data/map.json` | Leaflet.js map with categorized, clickable pins |
| `data/title-generator.html` | `files/Title Page.pdf` | Client-side PDF cover-page generator |

---

## 🚀 Local Development

Because most pages fetch their data asynchronously (`fetch('...json')`), opening the files directly from your file system will throw a CORS error and the dynamic content won't load. Similarly, since the website uses Clean/Pretty URLs, direct links will fail unless parsed through Jekyll, To test changes locally before pushing:

1. Start a local development server in the project directory, e.g.:
   ```bash 
   npx serve . -p 4000
   ```
2. Open `http://localhost:4000` (or your chosen port) in your browser.
3. Always test your changes locally before pushing an update publicly.

---

## 🤝 Content & Maintenance Guide

### 💡 General Tips
**Files:** All

- Always update the value of `<p class="updated" id="updated-line">` inside the `div.footer-bottom` in `body/footer` of the `HTML` file you're edited, along with reflecting the same change on `index.html`.

### 🏠 Home Page & Notification Banner
**Files:** `index.html`, `data/index.json`

- **Adding a feature card:** duplicate one of the existing `<a class="landing-card">` blocks inside the `div.landing-grid` in `body/main` of `index.html`, then update its link, tag, heading, and description.
- **The countdown banner:** on load, the homepage fetches `data/index.json` and finds the *first* entry whose date is today or later. The banner only appears if that event is **14 days or fewer** away.
- Because the script always grabs the first upcoming entry, **keep the events in `index.json` sorted chronologically** (earliest date first) — otherwise the wrong event may surface.
- Each entry only needs a name and a date:
  ```json
  { "name": "Mid Term Exams Begin", "date": "2026-11-21" }
  ```

### 🗄️ Archive
**File:** `data/archive.html`

- The content itself lives entirely in Google Drive — add or remove files in the linked folders and they show up automatically, no code changes needed.
- To add a new tab: copy an existing `<button class="tab" data-url="...">` line inside the `nav.drive-tabs` block, point `data-url` at a new Drive folder's **embeddedfolderview** link, and update the button label.

### 📅 Calendar
**File:** `data/calendar.html`

- No code changes needed — everything (event titles, dates, descriptions) is managed directly from the linked Google Calendar.
- Only touch the code if the embed's timezone, color, or size needs to change (the `ctz`, `color`, `width`, and `height` parameters on the iframe's `src`).
- **The countdown banner:** the countdown banner from the Home Page `index.html` is copied over into the Calendar Page as well, with the `View Calendar` button removed, consult the guide for the Home Page for information on the countdown banner, the only difference with the original code being that this uses a different, extended timer on the banner so it always displays the next event regardless of how far it is.

### 📒 Contact Directory
**Files:** `data/contact-dir.html`, `data/contact-dir.json`

- Edit `contact-dir.json` to add, edit, or remove Contact Information. The order of items in the `categories` and `contacts` arrays controls ther display order on the site - reorder by moving an entry's position in the file.
- Structure:
  ```json
  {
    "categories": ["Category A", "Category B"],
    "contacts": [
      { "category": "Category A", "name": "...", "email": "Official @cust.edu.pk Email Address", "designation": "...", "location": "..." }
    ]
  }
  ```
- The `email` field becomes a `mailto:` link on the front-end.
- The small ID tags next to each contact (e.g. `FAC-001`) are generated automatically from each category's initials — you never need to number them by hand.

### 🧭 Course Visualizer
**Files:** `data/course-visualizer.html`, `data/course-visualizer.json`

Rebuild this once per semester using the course-offerings PDF as your source of truth. Each course is one object in the array:
```json
{
  "courseId": "CS2143",
  "courseName": "Data Structures",
  "semester": "3",
  "preRequisiteCourses": ["CS1143"],
  "coRequisiteCourses": ["CS2141"],
  "postRequisiteCourses": ["CS2772", "CS3163", "CS3412"]
}
```
- `semester` is a **string** and controls which column the course lands in.
- The three requisite arrays reference other courses' `courseId`s and drive both the dependency arrows and the lookup modes below. Keep both sides in sync — e.g. if `CS1143` lists `CS2143` as a post-requisite, `CS2143` should list `CS1143` back as a prerequisite.
- The page offers three modes: **Full curriculum** (every course, grouped by semester, arrows hidden by default), **Course lookup** (search by code or name to see one course's full dependency chain), and **Semester lookup** (see every course in a semester plus what feeds into and out of it). Both lookup modes have a "Direct requisites" toggle to stop at one relationship step instead of following the full chain, and an "Include co-requisites" toggle.
- A single placeholder course (`FALLBACK_COURSES`) is hard-coded in the script purely so the page never renders empty if `course-visualizer.json` fails to load — you don't need to touch it.

### 📖 FAQ
**Files:** `data/faq.html`, `data/faq.json`

- Edit `faq.json` to add, edit, or remove questions. The order of items in the `categories` and `faqs` arrays controls their display order on the site — reorder by moving an entry's position in the file.
- Structure:
  ```json
  {
    "categories": ["Category A", "Category B"],
    "faqs": [
      { "category": "Category A", "question": "...", "answer": "<p>HTML allowed here</p>" }
    ]
  }
  ```
- The `answer` field accepts raw HTML (`<p>`, `<a>`, `<b>`, `<u>`, `<ul><li>`, etc.), so you can link forms, bold key details, or add lists.
- The small ID tags next to each question (e.g. `UPG-001`) are generated automatically from each category's initials — you never need to number them by hand.
- Update `meta.lastUpdated` whenever you do a content pass; it's shown in the footer.

### 🗺️ Campus Map
**Files:** `data/map.html`, `data/map.json`, `files/campus-map.png`

To add a pin:
1. In `map.html`, uncomment the **Click-to-Log** helper function near the bottom of the script block.
2. Open the live map, click the exact spot for the new pin — the coordinates will print to the console/an alert.
3. **Re-comment the helper function** before pushing to production; it's a debug-only tool.
4. Add a new object to the `locations` array in `map.json` using the coordinates you copied:
   ```json
   { "name": "PIN_NAME", "tags": ["tagKey"], "color": "HEX_CODE (Color is Optional - if Missing, Category Color will be used)", "x": 000, "y": 9999, "desc": "<b>Houses:</b><br>• Key Area" }
   ```
5. If the pin needs a new category, add it to `categoryDefinitions` first - its position there also controls where it appears in the legend:
   ```json
   "blocks": { "tagKey": "CATEGORY_NAME", "color": "HEX_CODE (Color is Mandatory, used as a default for that category and for visual flair)" }
   ```

If `campus-map.png` is ever replaced, update the `w` and `h` values in `map.html`'s script to match the new image's exact pixel dimensions, or every pin will drift out of place.

### 🧾 Title Generator
**Files:** `data/title-generator.html`, `files/Title Page.pdf`

- This only needs work when the university changes the physical title page template.
- If that happens, replace `files/Title Page.pdf`, then re-measure and update the x/y coordinates in each `drawField(...)` call inside the script block so text lands correctly on the new template.

---

Originally established by Muhammad Huzaifa (mhuzaifa003) for the CUST CS Student Body.
