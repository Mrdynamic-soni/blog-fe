# Personal Blog Platform

A full-stack personal blog platform where users can sign up, log in, read articles and post their own articles. Built with Next.js 15 with TypeScript .

---

## Features

- User registration and authentication (JWT-based)
- Secure password storage (hashed)
- Post creation, listing, and filtering by author
- Server-side rendering for homepage
- Static generation for individual blog posts (if implemented)
- Protected routes for posting and dashboard
- Responsive, clean UI with Tailwind CSS

---

## Project Structure

```
blog-fe/                # Frontend (Next.js 14, TypeScript)
  src/
    app/
      page.tsx          # Homepage (SSR)
      login/            # Login page
      signup/           # Signup page
      dashboard/        # User dashboard (protected)
      dashboard/create/ # Create post page (protected)
    component/          # Reusable components (Header, BlogCard, etc.)
    types/              # TypeScript types
    lib/                # Utility functions (auth, etc.)
  public/               # Static assets
  ...
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- Yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mrdynamic-soni/blog-fe.git
   cd blog-fe
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Configure environment variables:**

   - Create a `.env.local` file in the root:
     ```
     NEXT_PUBLIC_API_LOCAL_URL=http://localhost:8080
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the development server:**

   ```bash
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Key Commands

- `yarn dev` — Start the development server
- `yarn build` — Build for production
- `yarn start` — Start the production server

---



## Choices & Considerations

- **Next.js 14 App Directory**: Enables SSR and SSG out of the box.
- **JWT Authentication**: Secure, stateless sessions.
- **Tailwind CSS**: Utility-first, responsive styling.
- **TypeScript**: Type safety across the codebase.

---

## License
