# 📚 Books4You
### *Made with love by Juan-Paul Naude*

A React + TypeScript web application built with Vite and Material UI that allows users to search and explore books via the Google Books API. I hope you all enjoy!

## 🚀 Features

- 🔍 Search books via Google Books API
- 📖 View book details with routing
- 🧾 Form for adding new books with validation
- 🎨 Styled with Material UI
- ✅ Pre-commit hooks, type-checking, linting

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [@toolpad/core](https://mui.com/toolpad/)
- [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) for forms & validation
- [react-router](https://reactrouter.com/)
- [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) + [lint-staged](https://github.com/okonet/lint-staged) for Git hooks
- [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) for formatting and linting

---

## 🏁 How to Get Started

Follow these steps to set up and run the project locally:

### 1. Install Dependencies

`npm install `

### 2. Start it up

`npm run dev`

### 3. See the magic
Go to: 
`http://localhost:1234/`

### 4. Be Amazed


## 🧪 Pre-commit Hooks

This project uses `simple-git-hooks` and `lint-staged` for Git hook automation:

### ✅ `pre-commit`
Runs:
- `eslint --fix` and `prettier --write` on staged `src/**/*.{ts,tsx}` files

### ✅ `pre-push`
Runs:
- `npm run typecheck` (to ensure no TypeScript errors)

---

## 🧾 Available Scripts

```bash
  npm run dev           # Start local dev server
  npm run build         # Type-check and build app
  npm run preview       # Preview production build
  npm run format        # Format files using Prettier
  npm run typecheck     # Run TypeScript type-checking
