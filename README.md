
## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The dashboard will load with sample transit data

## Usage

### Filtering Transit Modes
- Use the **Mode Selector** checkboxes on the left panel to show/hide:
  - Bus routes and stops
  - Light rail lines and stations
  - Bike lanes
  - Park & ride facilities

### Accessibility Filtering
- Select from the **Accessibility Filter** dropdown:
  - All Stops
  - Within 5 min walk
  - Within 10 min walk
  - ADA accessible stops

### Neighborhood Selection
- Use the **Neighborhood** dropdown to filter by specific Seattle neighborhoods

### Interactive Map
- **Hover** over transit stops to see the cursor change
- **Click** on any bus stop, light rail station, or park & ride to view details
- **Zoom** and **pan** to explore different areas of Seattle

### Navigation
- Click **About** to learn more about the dashboard
- Click **Team** to see project team information
- Click **Project Goal** to understand the project's mission

## Technologies Used

- **MapLibre GL** - Open-source mapping library
- **Mapbox Satellite API** - High-quality satellite imagery
- **HTML5** - Page structure
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - Interactivity and map functionality
- **GeoJSON** - Transit data format

## Data

Currently uses sample transit data for demonstration. To integrate real Seattle transit data:

1. Replace the `transitData` object in `js/app.js` with actual GeoJSON data
2. Connect to transit APIs such as:
   - King County Metro
   - Sound Transit
   - Seattle Department of Transportation (SDOT)

## Customization

### Changing Map Colors
Edit the `paint` properties in `addTransitLayers()` function in `js/app.js`:
- Bus: `#FF0000` (red)
- Light Rail: `#00FF00` (green)
- Bike Lanes: `#0000FF` (blue)
- Park & Ride: `#FFD700` (gold)

### Changing Theme Colors
Edit `css/styles.css` to modify:
- Header gradient (currently purple to violet)
- Filter panel styling
- Button colors and hover states

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Responsive design supported

## Future Enhancements

- [ ] Integration with real-time transit data APIs
- [ ] User geolocation and nearest transit finding
- [ ] Route planning functionality
- [ ] Historical transit data and trends
- [ ] User saved preferences
- [ ] Accessibility audit reports
- [ ] Mobile app version

## License

This project is open source and available for public use.

## Contact & Feedback

For questions or suggestions about this dashboard, please reach out to the project team.

---

**Dashboard Status**: Active Development
**Last Updated**: February 2026
