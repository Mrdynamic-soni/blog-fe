# Personal Blog Platform (Frontend)

A full-stack personal blog platform where users can sign up, log in, read articles, and post their own articles.  
Frontend built with **Next.js 14** and **TypeScript**.  
Backend: [blog-be](https://github.com/Mrdynamic-soni/blogging-be) (Node.js/Express/PostgreSQL).
Hosted Frontend: https://blogs-sand-three.vercel.app/

---

## 🚀 Features

- User registration and authentication (JWT-based, secure cookies)
- Secure password storage (hashed, handled by backend)
- Create, list, and filter blog posts by author
- **Server-side rendering (SSR)** for homepage
- **Static generation (SSG)** for individual blog posts
- Protected routes for posting and dashboard
- Responsive, clean UI with Tailwind CSS
- Mobile-friendly and accessible design

---

## 🏗️ Project Structure

```
blog-fe/
  src/
    app/
      page.tsx                # Homepage (SSR, lists all posts)
      login/                  # Login page
      signup/                 # Signup page
      dashboard/              # User dashboard (protected)
      dashboard/create/       # Create post page (protected)
      posts/[id]/page.tsx     # Static blog post page (SSG)
    component/                # Reusable components (Header, BlogCard, etc.)
    types/                    # TypeScript types
    lib/                      # Utility functions (auth, etc.)
  public/                     # Static assets
  ...
```

---

## ⚙️ Setup Instructions

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
     NEXT_PUBLIC_API_URL=https://blog-be-g7o8.onrender.com
     JWT_SECRET=your_jwt_secret
     ```

   > **Note:**  
   > Never commit your `.env.local` or any secret credentials to version control.

4. **Run the development server:**

   ```bash
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🗝️ Key Commands

- `yarn dev` — Start the development server
- `yarn build` — Build for production
- `yarn start` — Start the production server

---

## 📚 Pages & Routing

- `/` — Homepage, lists all blog posts (SSR)
- `/login` — Login page
- `/signup` — Signup page
- `/dashboard` — User dashboard (protected, shows your posts)
- `/dashboard/create` — Create a new post (protected)
- `/posts/[id]` — Full blog post page (SSG, mobile-optimized)

---

## 🛡️ Security & Best Practices

- **No hardcoded credentials:** All secrets and API URLs are managed via environment variables.
- **JWT authentication:** Secure, stateless sessions via HTTP-only cookies.
- **Protected routes:** Dashboard and post creation are only accessible to authenticated users.
- **.env files are gitignored:** Your secrets are safe.

---

## 📝 Development Choices

- **Next.js 14 App Directory:** Enables SSR and SSG out of the box.
- **TypeScript:** Type safety across the codebase.
- **Tailwind CSS:** Utility-first, responsive styling.
- **React Hooks:** Modern, maintainable state management.

---

## 🤝 Backend

This frontend expects the backend API to be running at the URL specified in your `.env.local` file.  
See [blog-be](https://github.com/Mrdynamic-soni/blogging-be) for backend setup and API documentation.
