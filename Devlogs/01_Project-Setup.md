# 專案設定 / Project Setup (筆記)

- [中文版 — 專案初始設定](#zh)
- [English — Project Setup](#en)

---

<a name="zh"></a>

## 中文版 — 專案初始設定

### 目標

- 記錄可讓專案在本機可運行的初始設定步驟：安裝必要套件、建立後端 server、設定 dotenv 與 MongoDB 連線，並加入開發腳本與工具（例如 nodemon）。

### 初始動作

- 建立 `/backend` 與 `/frontend` 兩個資料夾，以清楚分離後端與前端程式碼。

### 安裝基礎套件

在專案根目錄安裝：

```bash
npm install express mongoose dotenv
```

### 建立 `server.js`（位於 `/backend`）

- 在 `package.json` 中把 `"type"` 改為 `module`，讓 `.js` 可使用 ES modules（import/export）。
- 宣告 app 與 PORT，並讓 server listen：

```js
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
```

### 開發工具：nodemon 與 scripts

- 安裝 `nodemon`（開發用）：

```bash
npm i nodemon -D
```

- 在 `package.json` 的 `scripts` 加入 `dev`：

```json
"scripts": {
  "dev": "nodemon backend/server.js"
}
```

- 使用：

```bash
npm run dev
```

### 簡單檢查路由

回到 `server.js`，新增一個簡單 GET 路由以確認伺服器運作：

```js
app.get("/product", (req, res) => {
  res.send("Server is ready.");
});
```

### MongoDB 設定

- 在 MongoDB Atlas 建立資料庫與使用者，取得 connection string, username/password。
- 複製 connection string 並在專案根目錄建立 `.env`，寫入 `MONGO_URI`，例：

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<db uri>/products?retryWrites=true&w=majority&appName=Cluster0
```

> 開發階段可在 Atlas 設定中把 IP 白名單設為 Allow Access From Anywhere（僅限開發）。

### 使用 dotenv

在 `server.js` 使用 dotenv：

```js
import dotenv from "dotenv";
dotenv.config();
```

### 資料庫連線檔案（`/backend/config/db.js`）

- 建立 `config` 資料夾並新增 `db.js`，提供 `connectDB`：

```js
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // exit code 1 indicates failure
  }
};
```

### 將 `connectDB` 加入 `server.js`

```js
import { connectDB } from "./config/db.js";

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
```

### 完成檢查

- 執行 `npm run dev` 並確認伺服器及 MongoDB 連線皆正常。

---

<a name="en"></a>

## English — Project Setup

### Goal

- Document the setup steps required to run the project locally: install required dependencies, create the backend server, configure dotenv and MongoDB connection, and add development scripts/tools (e.g. nodemon).

### Initial actions

- Create `/backend` and `/frontend` folders to separate server and client code.

### Install core packages

From the project root:

```bash
npm install express mongoose dotenv
```

### Create `server.js` (in `/backend`)

- Set `"type": "module"` in `package.json` to use ES modules (import/export) with `.js` files.
- Initialize app, PORT and make it listen:

```js
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
```

### Dev tools: nodemon & scripts

- Install `nodemon` for development (save as devDependency):

```bash
npm i nodemon -D
```

- Add a `dev` script in `package.json`:

```json
"scripts": {
  "dev": "nodemon backend/server.js"
}
```

- Run:

```bash
npm run dev
```

### Quick route to verify server

Add a simple GET route in `server.js`:

```js
app.get("/product", (req, res) => {
  res.send("Server is ready.");
});
```

### MongoDB setup

- Create a database and a DB user on MongoDB Atlas and copy the connection string, username/password.
- Create a `.env` at the project root and set `MONGO_URI`. Example (this project uses the `products` database/path):

```bash
MONGO_URI=mongodb+srv://<username>:<password>@<db uri>/products?retryWrites=true&w=majority&appName=Cluster0
```

> For development you can allow access from anywhere in Atlas network settings.

### Use dotenv

In `server.js`:

```js
import dotenv from "dotenv";
dotenv.config();
```

### DB connector (`/backend/config/db.js`)

Create a `config` folder and add `db.js` with a `connectDB` function:

```js
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // exit code 1 indicates failure
  }
};
```

### Import and call `connectDB` in `server.js`

```js
import { connectDB } from "./config/db.js";

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
```

### Final check

- Run `npm run dev` and ensure the server starts and connects to MongoDB successfully.
