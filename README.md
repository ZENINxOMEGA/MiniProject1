# Employee Payroll System (EPS)

A server-side web application built with Node.js, Express, and EJS to manage employee records and calculate payroll.

## Features

- Dashboard table listing all employees
- Payroll calculations per employee:
  - Tax = 10% of basic salary
  - Net salary = basic salary - tax
- Add employee form
- Edit employee form
- Delete employee action
- File-based persistence using `employees.json`
- Custom file operations module (`modules/fileHandler.js`)

## Project Structure

```
payroll-app/
├── modules/
│   └── fileHandler.js
├── public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── add.ejs
│   └── edit.ejs
├── employees.json
├── server.js
└── package.json
```

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the server:

   ```bash
   npm start
   ```

3. Open in browser:

   ```
   http://localhost:3000
   ```

## Validation Rules

- Name cannot be empty.
- Basic salary must be a non-negative number.

## Notes

- All add/edit/delete actions redirect to `/`.
- New employees use `Date.now()` for unique IDs.
- Static files are served from `/public`.
