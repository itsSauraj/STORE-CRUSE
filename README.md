# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Installation

To install node modules, use:
```
npm install --legacy-peer-deps
```

## Running the Project

To start the development server, use:
```
npm run dev
```

## Running the Project with Netlify Dev

Install netlify cli globally.
use:
```
npm install -g netlify-cli
```

To start the development server with Netlify Dev, use:
```
netlify dev
```

## Deploying to Netlify

To deploy your project to Netlify, follow these steps:

1. Push your code to your GitHub repository: `itsSauraj/STORE-CRUSE`.
2. Log in to your Netlify account and click on "New site from Git".
3. Select your GitHub repository and configure the build settings:
    - Build command: `npm run build`
    - Publish directory: `dist`
4. Click on "Deploy site".

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

