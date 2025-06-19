# Playwright-Typescript-Automation-Demo 

## 🚀 Playwright Test Commands

Use the following commands in your terminal to run Playwright tests in various modes and filter options:

| Task                         | CLI Command                                                                 |
|-----------------------------|------------------------------------------------------------------------------|
| Run all tests               | `npx playwright test`                                                        |
| Run headed                  | `npx playwright test --headed`                                               |
| Run with UI                 | `npx playwright test --ui`                                                   |
| Debug with Inspector        | `npx playwright test --debug`                                                |
| Specific file/test          | `npx playwright test tests/foo.spec.ts:10`                                   |
| Filter by name/regex        | `npx playwright test -g "login"`                                             |
| Limit to Chromium           | `npx playwright test --project=chromium`                                     |
| Single-threaded execution   | `npx playwright test --workers=1`                                            |
| Retry failures              | `npx playwright test --last-failed`                                          |
| Generate HTML report        | `npx playwright test --reporter=html` + `npx playwright show-report`         |
| Interactive selection CLI   | `npx playwright-cli-select run`                                              |
| Visual test                 | `npx playwright test tests/visual/homepage.spec.ts`                          |
| Updating snapshots          |  `npx playwright test --update-snapshots`                                    |  
 

---

### ✅ Summary of Common Options

- **`--headed`**: Launch browsers with visible UI.  
- **`--ui`**: Opens Playwright's interactive test runner UI.  
- **`--debug`**: Enables Debug mode with Playwright Inspector.  
- **`-g <pattern>`**: Filters tests by title using a regular expression.  
- **`--project=<name>`**: Specifies a named project (e.g., browser) defined in your config.  
- **`--workers=<n>`**: Controls parallelism; use `1` for single-threaded execution.  
- **`--last-failed`**: Runs only tests that failed in the last execution.  
- **`--reporter=html`**: Generates an HTML report viewable via `npx playwright show-report`.  
- **`npx playwright-cli-select run`**: Launches an interactive test selector in the terminal.

---
