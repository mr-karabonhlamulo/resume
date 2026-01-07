# Modern Resume & Admin Dashboard

![Project Preview](readme-assets/preview-hero.png)

A next-generation personal resume application built with React and Vite. This project combines a sleek, user-facing digital portfolio with a powerful admin dashboard for dynamic content management.

## Features

-   **Interactive Resume**: A beautiful, responsive frontend to showcase professional experience and skills.
-   **Admin Dashboard**: A secure backend interface to manage resume content in real-time.
-   **AI Job Matcher**: integrated tools to analyze job descriptions and match them against the resume profile.
-   **Real-time Updates**: Changes in the dashboard reflect immediately on the frontend.

## Privacy Notice

> [!IMPORTANT]
> **This project involves personal data and is intended for private use.**
> Please ensure that you do not inadvertently publish sensitive personal information if you decide to fork or share this repository.
> The code in this repository is **not freely public** and is proprietary to the owner.

## Dashboard Preview

![Admin Dashboard](readme-assets/screenshot-dashboard.png)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v16 or higher)
-   npm (v7 or higher)

### 1. Install Dependencies

Install the necessary packages for both the client and server.

```bash
npm install
```

### 2. Run the Development Environment

This project uses `concurrently` to run both the Vite frontend and the Express backend server simultaneously.

```bash
npm run dev
```

-   **Frontend**: http://localhost:5173
-   **Backend Server**: http://localhost:3000 (or configured port)

### 3. Build for Production

To create a production-ready build:

```bash
npm run build
```

## How It's Made

This project leverages a modern Full-Stack architecture to ensure performance and scalability.

### Technology Stack

-   **Frontend**:
    -   **React**: For building a component-based interactive UI.
    -   **Vite**: Next-generation frontend tooling for blazing fast development servers and optimized builds.
    -   **CSS Modules / Vanilla CSS**: Custom styling architecture (`src/styles`) for granular design control.
-   **Backend**:
    -   **Node.js & Express**: Provides API endpoints for the admin dashboard and data management.
    -   **Better-SQLite3**: A high-performance, serverless SQL database to store job applications and resume data (`database.sqlite`).
-   **Utilities**:
    -   **Concurrently**: Manages multiple processes (client & server) with a single command.
    -   **ESLint**: Ensures code quality and consistency.

### Project Structure

-   `src/components`: Reusable React UI components.
-   `src/data`: Static JSON data for default resume configurations.
-   `src/styles`: Global and module-specific CSS styles.
-   `server.cjs`: Express server entry point handling API requests and database interactions.
