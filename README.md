# ES TV Wall Mounting Website

A static website for a TV wall mounting service. The site features an interactive, multi-step wizard that allows users to get a price quote and book an installation by selecting various options.

## 🚀 Features

- **Interactive Quote Wizard:** A step-by-step form to build a custom installation package.
- **Dynamic Options:** Guides the user through choices for TV size, mount type, wall surface, wire concealment, and more.
- **Contact & Booking Form:** Collects user details and preferred installation date/time.
- **Dynamic Time Slots:** Available booking times are generated based on the selected date (weekday vs. weekend).
- **Email Submission:** Uses [Formspree](https://formspree.io/) to handle form submissions and send them via email.
- **Responsive Design:** Built with Tailwind CSS for a mobile-first, responsive layout.
- **Engaging UI:** Features a background video and smooth animations for a modern user experience.
- **CMS Integration:** Includes a configuration for [Decap CMS](https://decapcms.org/) for content management.

## 🛠️ Technology Stack

- **HTML5:** For the structure of the web pages.
- **Tailwind CSS:** For all utility-first styling.
- **JavaScript (ES6+):** For the wizard logic, form handling, dynamic content, and interactivity.
- **Node.js/npm:** For managing development dependencies and running build scripts.

## 🏃‍♀️ How to Run

### Viewing the Site
This is a static website. After following the restructuring steps, you can open the `index.html` file directly in your web browser to view it.

### Development
To work on the CSS, you need to have Node.js and npm installed.

1.  Clone the repository:
    ```bash
    git clone https://github.com/Rashymad/estvwallmounting.git
    ```
2.  Navigate into the project directory and install dependencies:
    ```bash
    npm install
    ```
3.  To watch for CSS changes and automatically rebuild `css/main.css`:
    ```bash
    npm run dev
    ```
4.  To build the CSS for production once:
    ```bash
    npm run build:css
    ```

## 📁 Project Structure

The project follows a standard static site structure:

```plaintext
estvwallmounting/
├── admin/              # Decap CMS configuration
├── css/                # Stylesheets (tailwind.css, main.css)
├── js/                 # JavaScript files (content-loader.js)
├── pages/              # Main HTML pages (homepage.html, booknow.html, etc.)
├── public/             # Static assets like images and icons
├── videos/             # Video assets
├── index.html          # Entry point (loader/redirect page)
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── README.md           # This file
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Custom utility classes include:


## 🧩 Customization

To customize the Tailwind configuration, edit the `tailwind.config.js` file:


## 📦 Build for Production

Build the CSS for production:

```bash
npm run build:css
# or
yarn build:css
```

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints:

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by HTML and Tailwind CSS

Built with ❤️ on Rocket.new
