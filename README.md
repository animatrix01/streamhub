# StreamHub

A modern, full-featured admin dashboard application built with React, TypeScript, and Supabase. StreamHub provides a complete solution for managing business analytics, user administration, billing operations, and real-time notifications with a sleek, responsive UI powered by shadcn/ui components.

## ✨ Features

- **📊 Analytics Dashboard** - Real-time data visualization with interactive charts (bar, line, pie, area) powered by Recharts
- **👥 User Management** - Complete user administration with role-based access control, status tracking, and search functionality
- **💳 Billing & Subscriptions** - Multi-tier pricing plans, payment method management, invoice history, and usage tracking
- **🔔 Notifications Center** - Real-time notification system with read/unread states, filtering, and customizable preferences
- **🔐 Authentication** - Secure user authentication powered by Supabase Auth
- **🎨 Modern UI/UX** - Beautiful, responsive design with dark mode support using Tailwind CSS and shadcn/ui
- **📱 Mobile Responsive** - Fully optimized for desktop, tablet, and mobile devices
- **⚡ Performance** - Built with Vite for lightning-fast development and optimized production builds

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom animations
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Backend & Auth:** Supabase
- **State Management:** TanStack Query (React Query)
- **Routing:** React Router v6
- **Charts:** Recharts
- **Form Handling:** React Hook Form with Zod validation
- **Icons:** Lucide React

## 📁 Project Structure

```
streamhub/
├── public/                      # Static assets
│   ├── favicon.svg
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── UserGrowthChart.tsx
│   │   │   ├── RecentActivityTable.tsx
│   │   │   └── ServerHealthGauge.tsx
│   │   ├── layout/             # Layout components
│   │   │   └── DashboardLayout.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (other UI primitives)
│   │   └── NavLink.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/            # Third-party integrations
│   │   └── supabase/           # Supabase client & types
│   ├── lib/                     # Utility functions
│   │   └── utils.ts
│   ├── pages/                   # Page components (routes)
│   │   ├── Index.tsx           # Landing page
│   │   ├── Auth.tsx            # Authentication page
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Analytics.tsx       # Analytics page
│   │   ├── Users.tsx           # User management
│   │   ├── Billing.tsx         # Billing & subscriptions
│   │   ├── Notifications.tsx   # Notifications center
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                  # Main app component with routing
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles
│   └── vite-env.d.ts           # Vite type definitions
├── supabase/                    # Supabase configuration
│   ├── config.toml
│   └── migrations/             # Database migrations
├── .env                         # Environment variables
├── components.json              # shadcn/ui configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Supabase account and project

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm i

# Step 4: Set up environment variables
# Create a .env file and add your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Step 5: Start the development server
npm run dev
```

## 🚀 Development

To run the project locally:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

You can deploy this project to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
