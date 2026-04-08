# Job Board Platform

Professional job listing platform where users can browse open roles, search by keywords, filter by location and job type, view role details, save jobs, apply, and track application status.

## Submission Links

- GitHub Repository: https://github.com/rishichaturvedi2024-dotcom/Job-Board-Platform
- Live Website (GitHub Pages): https://rishichaturvedi2024-dotcom.github.io/Job-Board-Platform/

## Features Implemented

- Responsive, modern UI for desktop and mobile.
- Home page with hero section, search, filters, and role cards.
- Incremental role loading (shows first 10, then "Load More").
- Job details page with application form.
- Saved Jobs page and local persistence.
- Application Tracker page with status updates (Applied, Reviewed, Shortlisted, Rejected).
- Light/Dark mode toggle with theme persistence.
- 100+ mock roles for realistic browsing and filtering.

## Project Structure

```
job-listing-web-app/
  client/                 # React + JavaScript frontend
    src/
      components/
      pages/
      services/
      data/
  server/                 # Express + TypeScript backend
    src/
      controllers/
      routes/
      models/
  index.html              # Root entry for GitHub Pages redirect
  README.md
```

## How to Run Locally

### Frontend

```bash
cd client
npm install
npm start
```

Open: http://localhost:3000

### Backend

```bash
cd server
npm install
npm start
```

API runs on: http://localhost:5000

## GitHub Pages Setup (main / root)

This repository is configured to follow the required setup: Branch `main` and Folder `/ (root)`.

1. Build the frontend output:

```bash
cd client
npm install
npm run build
```

2. Commit the generated `client/build` folder to `main`.
3. Go to GitHub repository Settings -> Pages.
4. Under Source, choose:
   - Branch: `main`
   - Folder: `/ (root)`
5. Save and wait for deployment.

The root `index.html` redirects to `client/build/index.html`, so the deployed site is served correctly from the required Pages configuration.

The root `404.html` also redirects unknown URLs back to the app entry, so refreshes or deep links resolve safely on GitHub Pages.

## Notes

- All source code, assets, and dependencies are included in one public repository.
- The deployed site is based on the same code present in this repository.
- Frontend source now uses JavaScript/JSX while preserving the same UI and behavior from the earlier TypeScript version.