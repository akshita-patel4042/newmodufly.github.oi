# ModuFly AI — GitHub Pages website

This is the static HTML/CSS/JavaScript conversion of the ModuFly AI Streamlit dashboard.

## Files
- `index.html` — dashboard layout
- `style.css` — responsive styling
- `script.js` — six demo modules, monitoring alerts, JavaScript anomaly screening, calculator and CSV export

## Test locally
Open `index.html` in a browser. No Python, package installation or build command is required.

## Publish on GitHub Pages
1. Create/open a GitHub repository and upload all three files (`index.html`, `style.css`, `script.js`) to the repository root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`, then click **Save**.
5. Wait for the published URL to appear in Settings → Pages.

## Notes
- Farm readings are simulated, not live sensor data.
- Demo AI is a simple JavaScript reference-range heuristic. It does not run the original Python `IsolationForest` model.
- The two requested images (batch detection and AI anomaly) are loaded from Unsplash and need an internet connection. Replace the two image URLs in `index.html` if you have your own photos.
- Estimates are illustrative only, not validated production, feed-safety or revenue forecasts.
