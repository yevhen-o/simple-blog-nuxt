# My Blog Nuxt

This is a Nuxt 3 project for a simple blog application.

**Preview:** [https://simple-blog-nuxt.vercel.app/](https://simple-blog-nuxt.vercel.app/)

## Features

- Server-Side Rendering (SSR)
- Dynamic Routing
- Markdown Content Support
- Form Validation with `vee-validate` and `zod`
- Firebase Authentication
- Reusable Components
- Type Safety with TypeScript
- `pnpm` as Package Manager

## Setup

1.  **Install Dependencies:**

    ```bash
    pnpm install
    ```

2.  **Environment Variables:**

    - Create a `.env` file in the root of your project.
    - Add your Firebase configuration variables to the `.env` file. You can use the `.env` file you provided as a template:

      ```properties
      VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
      VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
      VITE_FIREBASE_DATABASE_URL=YOUR_FIREBASE_DATABASE_URL
      VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
      VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
      VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
      VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
      ```

    - Replace the placeholder values with your actual Firebase credentials.

## Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```
