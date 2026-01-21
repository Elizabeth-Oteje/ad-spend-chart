# Ad Spend Chart (2024 vs 2025)

## Design Decisions
AD X-RAY prioritizes a 'High-Tech Intelligence' aesthetic. I chose a deep dark theme with a high-contrast Purple/Teal palette to ensure YoY data is instantly distinguishable. Framer Motion was chosen to move beyond static charts; its physics-based springs and orchestrated sequences allow for a cinematic data reveal that feels powerful and intentional. The deliberate 1.5s simulated delay reinforces the high-precision syncing feel of a premium marketing tool.

## Technical Notes
- **Core Architecture**: Next.js 16.1.4 and TypeScript using standard React Hooks for high-performance, minimalist data management.
- **Visualization**: Chart.js for canvas-based rendering of complex YoY datasets.
- **Styling**: Tailwind CSS for a streamlined, responsive design system.
- **Formatting**: Prettier and ESLint for consistent code quality and automatic Tailwind class sorting.

## 🛠️ Code Formatting
To maintain a clean codebase, this project uses Prettier and ESLint.
- **Auto-format on Save**: If you use VS Code, the project includes workspace settings in `.vscode/settings.json` that will automatically format your code every time you save.
- **Manual Formatting**: You can run `npx prettier --write .` to format all files in the project.

## �️ Getting Started
Follow these steps to run the application locally:

1.  **Clone & Install**:
    ```bash
    npm install --legacy-peer-deps
    ```
2.  **Start Development**:
    ```bash
    npm run dev
    ```
3.  **View App**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## �🚀 CI/CD & Deployment
This project is configured for automated deployment to **Netlify** via GitHub Actions.

### Instructions:
1.  **Push to Main**: Any push to the `main` branch will automatically trigger a production build and deployment.
2.  **Pull Requests**: PRs will generate unique "Preview Deployments" for testing changes before merging.
