# Wanderlust Tours - Travel Website

A modern, responsive tour and travel website built with Vite and vanilla JavaScript. This project showcases a beautiful user interface for exploring destinations, booking tours, and managing travel experiences.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with support for all devices
- **Interactive Navigation**: Smooth scrolling and mobile menu
- **Search Functionality**: Advanced search with autocomplete
- **Booking System**: Complete booking flow with form validation
- **Tour Galleries**: Beautiful destination and tour cards
- **Contact Forms**: Comprehensive contact system with validation
- **Modern UI**: Clean design with smooth animations
- **Performance Optimized**: Fast loading with Vite's optimizations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:5173/`

### Build for Production

Build the project for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
├── public/
│   ├── images/          # Static images
│   └── vite.svg        # Favicon
├── src/
│   ├── components/     # Reusable UI components
│   ├── scripts/        # JavaScript modules
│   │   ├── animations.js
│   │   ├── booking.js
│   │   ├── contact.js
│   │   ├── navigation.js
│   │   └── search.js
│   ├── styles/         # CSS stylesheets
│   │   └── main.css
│   └── main.js         # Entry point
├── index.html          # Main HTML file
├── package.json        # Project configuration
└── README.md          # This file
```

## 🎨 Design Features

### Color Scheme
- Primary: Blue (#2563eb)
- Secondary: Amber (#f59e0b)
- Accent: Emerald (#10b981)
- Neutral: Gray scale for text and backgrounds

### Typography
- Font Family: Poppins (Google Fonts)
- Responsive font sizes
- Optimized line heights

### Animations
- Smooth scroll animations
- Hover effects on interactive elements
- Loading animations
- Parallax effects

## 🔧 Technical Details

### Built With
- **Vite**: Fast build tool and development server
- **Vanilla JavaScript**: No frameworks - pure JavaScript
- **CSS3**: Modern CSS features including Grid and Flexbox
- **HTML5**: Semantic markup
- **Font Awesome**: Icon library
- **Google Fonts**: Web typography

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Performance Features
- Lazy loading for images
- Optimized animations
- Minified production builds
- Tree-shaking for unused code

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1200px and up)

## 🎯 Key Functionalities

### Navigation
- Smooth scrolling between sections
- Mobile hamburger menu
- Active section highlighting
- Responsive navigation bar

### Search System
- Destination autocomplete
- Date selection with validation
- Guest count selection
- Search results display

### Booking Flow
- Tour selection
- Booking form with validation
- Price calculation
- Confirmation system

### Contact System
- Contact form with validation
- Real-time form feedback
- Success/error notifications
- Character counter for messages

## 🛠️ Customization

### Adding New Destinations
1. Add destination data to the destinations array in `search.js`
2. Create destination cards in the HTML
3. Add corresponding images to the `public/images/` folder

### Styling Changes
- Main styles are in `src/styles/main.css`
- CSS custom properties (variables) are defined in `:root`
- Responsive breakpoints can be adjusted in media queries

### Adding New Features
- Create new JavaScript modules in `src/scripts/`
- Import and initialize them in `main.js`
- Add corresponding HTML structure
- Style with CSS

## 🔍 SEO Optimization

- Semantic HTML structure
- Meta tags for description and keywords
- Proper heading hierarchy
- Alt text for images (when implemented)
- Fast loading times

## 📝 Development Notes

### Code Style
- Modern ES6+ JavaScript
- Modular architecture
- Consistent naming conventions
- Comprehensive comments

### Best Practices
- Mobile-first CSS approach
- Accessible design patterns
- Performance optimizations
- Error handling

## 🚀 Deployment

The project can be deployed to various platforms:

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Vercel
1. Connect your repository to Vercel
2. Vercel will automatically build and deploy

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## 📞 Support

For questions or issues:
- Check the documentation
- Review the code comments
- Test in different browsers
- Validate HTML and CSS

## 🎉 Future Enhancements

Potential features to add:
- Backend integration for real bookings
- User authentication system
- Payment processing
- Multi-language support
- Blog/news section
- Social media integration
- Advanced search filters
- Customer reviews system

## 📄 License

This project is for educational and demonstration purposes. Feel free to use as a template for your own travel website projects.

---

**Built with ❤️ by Muhammad Umair**
