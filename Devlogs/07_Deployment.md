# 網站部署 / Deployment

- [中文版](#zh)
- [English](#en)

---

<a name="zh"></a>

## 中文版 - 網站部署

### 目標

- 使用 Render.com 將專案部署至雲端，供外部使用者存取

### 設定 `frontend` 建置相關路徑

- 在 `server.js` 設定 production 路徑

`server.js`

```js
// ... exisiting code

import path from "path";

// ... exisiting code

// Resolve the current directory path for file operations
// Necessary for serving static files in production
const __dirname = path.resolve();

// ... exisiting code

// In production, serve the built frontend static files from /frontend/dist
// This allows the Express server to handle both API and client-side routing
// The catch-all route (*) serves index.html for client-side routing (SPA)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ... exisiting code
```

### 修改 `package.json` 的 build script

- 在專案根目錄的 `package.json`，新增 `build` 與 `start` 指令

`/package.json`

```json
"scripts": {
    "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
    "build": "npm install && npm install cross-env && npm install --prefix frontend && npm run build --prefix frontend",
    "start": "cross-env NODE_ENV=production node backend/server.js"
  },
```

### 上傳至 `Github`

- 確認專案已推送至 `Github`
- 以便後續 `Render.com` 能存取專案

### 部署至 `Render.com`

- 前往 [Render](https://render.com/)，註冊帳號
- Dashboard -> Projects -> Add new -> Web Service
- 從 Git Provider 選擇該專案
- 將 Build Command 設定為 `npm run build`
- 選擇 Free Tier
- 設定 Environment Variables（使用 `.env` 中的內容）
- 完成部署

---

<a name="en"></a>

## English Version - Deployment

### Goal

- Deploy the project to the cloud using Render.com so external users can access it

### Configure frontend build-related paths

- Set the production path in `server.js`

`server.js`

```js
// ... existing code

import path from "path";

// ... existing code

// Resolve the current directory path for file operations
// Necessary for serving static files in production
const __dirname = path.resolve();

// ... existing code

// In production, serve the built frontend static files from /frontend/dist
// This allows the Express server to handle both API and client-side routing
// The catch-all route (*) serves index.html for client-side routing (SPA)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// ... existing code
```

### Modify the build scripts in `package.json`

- In the project's root `package.json`, add `build` and `start` scripts

`/package.json`

```json
"scripts": {
    "dev": "cross-env NODE_ENV=development nodemon backend/server.js",
    "build": "npm install && npm install cross-env && npm install --prefix frontend && npm run build --prefix frontend",
    "start": "cross-env NODE_ENV=production node backend/server.js"
  },
```

### Push to GitHub

- Ensure the project is pushed to GitHub
- This allows Render.com to access the repository for deployment

### Deploy to Render.com

- Go to https://render.com/ and sign up for an account
- Dashboard -> Projects -> Add New -> Web Service
- Select the project from your Git provider
- Set the Build Command to `npm run build`
- Choose the Free Tier
- Configure Environment Variables (use the values from your `.env` file)
- Complete the deployment
