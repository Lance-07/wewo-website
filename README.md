# WEWO Website

This is the official website for WEWO, built using [Next.js](https://nextjs.org). The project leverages modern web technologies like [Supabase](https://supabase.com) for backend services and [Tailwind CSS](https://tailwindcss.com) for styling. It is designed to provide a seamless and responsive user experience.

## Features

- **Data Fetching**: Uses Supabase to fetch and display data dynamically.
- **Responsive Design**: Built with Tailwind CSS for mobile-first design.
- **Optimized Fonts**: Utilizes [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for automatic font optimization.
- **Modern Framework**: Powered by Next.js for server-side rendering and static site generation.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional, for managing the backend)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/wewo-website.git
   cd wewo-website
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the required environment variables. Refer to `.env.example` if available.

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn how to use Supabase for backend services.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to style your application with Tailwind CSS.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
