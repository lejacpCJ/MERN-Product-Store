# 使用 Chakra UI / Using Chakra UI

- [中文版](#zh)
- [English](#en)

---

<a name="zh"></a>

## 中文版 - 使用 Chakra UI

### 目標

- 完成 `Chakra UI` 之安裝及基本設置。

### 安裝 Vite

- 請將終端機切換至 `/frontend` 資料夾，並執行 Vite 安裝程序。
- 安裝過程中，請選擇 `react` 與 `javascript` 作為專案類型。
- 完成後，執行 `npm install` 以安裝所有相依套件。

```bash
npm create vite@latest
```

```bash
npm install
```

### 安裝 Chakra UI (v2.10.9)

- 請參考 Chakra UI 官方網站，取得安裝指令。
- 於 `/frontend` 資料夾下執行下列指令以安裝相關套件：

```bash
npm i @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
```

### 設定 Provider

- 在 `/frontend/src` 資料夾中，編輯 `main.jsx` 檔案。
- import ChakraProvider 並包覆於 React 根節點 (<App />)。

```jsx
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);
```

### 移除不必要檔案

- 刪除 `App.css` 與 `index.css`。
- 刪除 `src/assets`。
- 在 `App.jsx` 檔案中，移除預設不需要之 import。
- 清空 `function App()` 內之 `return`，並新增一個 `Button` 元件以進行測試。

```jsx
function App() {
  return (
    <>
      <Button>Hello</Button>
    </>
  );
}

export default App;
```

### 執行測試

- 在 `frontend` 資料夾中以終端機執行 `npm run dev`。
- 開啟瀏覽器並前往 `http://localhost:5173/`，確認畫面上顯示一個 `Button` 元件。

---

<a name="en"></a>

## English Version - Using Chakra UI

### Objective

- Complete the installation and basic setup of Chakra UI.

### Install Vite

- Open a terminal and switch to the `/frontend` folder, then run the Vite initialization.
- During the setup, choose `react` and `javascript` as the project type.
- After initialization, run `npm install` to install all dependencies.

```bash
npm create vite@latest
```

```bash
npm install
```

### Install Chakra UI (v2.10.9)

- Refer to the official Chakra UI website for the installation commands.
- In the `/frontend` folder, run the following command to install the required packages:

```bash
npm i @chakra-ui/react@2 @emotion/react @emotion/styled framer-motion
```

### Configure the Provider

- In the `/frontend/src` folder, edit the `main.jsx` file.
- Import `ChakraProvider` and wrap it around the React root component (<App />).

```jsx
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>
);
```

### Remove Unnecessary Files

- Delete `App.css` and `index.css`.
- Delete `src/assets`.
- In `App.jsx`, remove default imports that are not needed.
- Clear the return inside `function App()` and add a `Button` component to test.

```jsx
function App() {
  return (
    <>
      <Button>Hello</Button>
    </>
  );
}

export default App;
```

### Run the Test

- In the `/frontend` folder, run the dev server:

```bash
npm run dev
```

- Open the browser and visit http://localhost:5173/ to confirm a Button component is displayed on the page.
