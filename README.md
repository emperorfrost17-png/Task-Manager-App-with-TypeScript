# Daymark

Task app I built to learn React + TypeScript.

[Live Demo](https://task-manager-app-with-type-script-b.vercel.app/) | [GitHub](link)

## What It Does

- Make tasks, check them off, delete them
- Filter by status or search
- Works offline in your browser

## What I Built

4 page components (Active, Completed, Overdue, All) that were almost identical. Extracted TaskList component - saved 270 lines of copy-paste code.

Also focused on accessibility since I read somewhere it matters. Made sure keyboard navigation works, added proper ARIA labels, etc.

## Tech

React + TypeScript + Vite

## Run It

```bash
git clone ...
npm install
npm run dev
```

## What I Learned

- How to spot code duplication and fix it
- FormEvent vs MouseEvent (form submission matters)
- Why buttons should be buttons, not spans
- TypeScript is less scary than I thought

## What's Missing

- No backend (just localStorage)
- No tests
- Not deployed yet

## Next

Want to add a real backend so you can access tasks across devices. Also should probably write some tests.

[GitHub](link) for the code.
