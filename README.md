# 📚 Books4You
### *Made with love by Juan-Paul Naude*

A React + TypeScript web application built with Vite and Material UI that allows users to search and explore books via the Google Books API. I hope you all enjoy!

## 🚀 Features

- 🔍 Search books via Google Books API
- 📖 View book details with routing
- 🧾 Form for adding new books with validation
- 🎨 Styled with Material UI
- ✅ Pre-commit hooks, type-checking + linting
- ✅ Pre-push hooks, type-checking + unit tests
- 🚨 Git action workflow on PR merge with main

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ViTest](https://vitest.dev/)
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

### 4. Be Amazed (Hopefully)

### 5. Run tests
`npm run test` OR `npm run test:ui` (This one is pretty neat)


## 🧪 Pre-commit Hooks

This project uses `simple-git-hooks` and `lint-staged` for Git hook automation:

### ✅ `pre-commit`
Runs:
- `eslint --fix` and `prettier --write` on staged `src/**/*.{ts,tsx}` files

### ✅ `pre-push`
Runs:
- `npm run validate` - checks for Typescript errors and runs unit tests

---

## 🧾 Available Scripts

```bash
  npm run dev           # Start local dev server
  npm run build         # Type-check and build app
  npm run preview       # Preview production build
  npm run format        # Format files using Prettier
  npm run typecheck     # Run TypeScript type-checking
  npm run test          # Run Unit Tests
  npm run test:ui       # Cool UI interface for the tests
  npm run test:silent   # Run tests with no logs
  npm run test:verbose  # Run tests with logs
  npm run validate      # Run typechecks and tests
  npm run lint          # Run linter
