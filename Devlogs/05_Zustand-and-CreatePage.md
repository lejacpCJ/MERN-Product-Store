# Zustand 與 CreatePage / Zustand and CreatePage

- [中文版](#zh)
- [English](#en)

---

<a name="zh"></a>

## 中文版 - Zustand 與 CreatePage

### 目標

- 使用 `Zustand` 進行狀態管理，讓其他 `jsx` 元件能夠共用資料。

### 使用 `Zustand` 管理商品資料

- 在 `frontend` 資料夾下，執行安裝指令：

```bash
npm i zustand
```

- 在 `src` 資料夾下建立 `store` 資料夾，並於其下新增 `product.js`。
- 實作 `product.js`，並以 `useProductStore` 作為自訂 Hook。

`product.js`

```js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
```

### 在 `product.js` 中實作 `createProduct` 方法

- 在 `vite.config.js` 設定 server proxy：

`vite.config.js`

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
```

- 實作 `createProduct` 方法：

`product.js`

```js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "請填寫所有欄位。" };
    }
    const res = await fetch("api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: data.message };
  },
}));
```

### 在 `CreatePage.jsx` 實作新增商品功能

- 在 `CreatePage.jsx` 中使用 `useProductStore`。
- 實作 `handleAddProduct` 方法，並以 `toast` 顯示通知。

`CreatePage.jsx`

```jsx
import { useProductStore } from "../store/product";

const { createProduct } = useProductStore();

const handleAddProduct = async () => {
  // Try to add product via store
  const { success, message } = await createProduct(newProduct);
  if (!success) {
    // Show error toast if creation failed
    toast({
      title: "Error",
      description: message,
      status: "error",
      isClosable: true,
    });
  } else {
    // Show success toast if creation succeeded
    toast({
      title: "Success",
      description: message,
      status: "success",
      isClosable: true,
    });
  }
  // Reset form after submission (success or failure)
  setNewProduct({ name: "", price: "", image: "" });
};
```

---

<a name="en"></a>

## English Version - Zustand and CreatePage

### Goal

- Use `Zustand` for state management so other `jsx` components can share data.

### Using `Zustand` to manage product data

- In the `frontend` folder, run the install command:

```bash
npm i zustand
```

- Create a `store` folder under `src`, and add `product.js` inside it.
- Implement `product.js`, using `useProductStore` as a custom hook.

`product.js`

```js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
```

### Implement the `createProduct` method in `product.js`

- Configure the server proxy in `vite.config.js`:

`vite.config.js`

```js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
```

- Implement the `createProduct` method:

`product.js`

```js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill out all fields." };
    }
    const res = await fetch("api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));

    return { success: true, message: data.message };
  },
}));
```

### Implement the add product feature in `CreatePage.jsx`

- Use `useProductStore` in `CreatePage.jsx`.
- Implement the `handleAddProduct` method and display notifications using `toast`.

`CreatePage.jsx`

```jsx
import { useProductStore } from "../store/product";

const { createProduct } = useProductStore();

const handleAddProduct = async () => {
  // Try to add product via store
  const { success, message } = await createProduct(newProduct);
  if (!success) {
    // Show error toast if creation failed
    toast({
      title: "Error",
      description: message,
      status: "error",
      isClosable: true,
    });
  } else {
    // Show success toast if creation succeeded
    toast({
      title: "Success",
      description: message,
      status: "success",
      isClosable: true,
    });
  }
  // Reset form after submission (success or failure)
  setNewProduct({ name: "", price: "", image: "" });
};
```
