# 後端功能 / Backend Function

- [中文版](#zh)
- [English](#en)

---

<a name="zh"></a>

## 中文版 - 後端功能

### 目標

- 實作後端 API，以便進行資料庫操作。

### 建立 `models` 資料夾與 `product.model.js`

- 於 `product.model.js` 檔案中，定義 `productSchema`。
- 以 `productSchema` 宣告 `mongoose.model`。
- 設定並匯出模組。

`product.model.js`

```js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
```

### 在 `server.js` 中建立 `POST` 方法以接收使用者輸入資料

- 使 `app` 支援 `JSON` 格式。
- 建立 `POST` 方法以接收使用者輸入資料。
  `server.js`

```js
app.use(express.json()); // allows us to accept JSON data in the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### 在 `server.js` 中建立 `GET` 方法以取得所有資料

`server.js`

```js
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### 在 `server.js` 中建立 `PUT` 方法以更新資料

`server.js`

```js
app.put("/api/products", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### 在 `server.js` 中建立 `DELETE` 方法以刪除資料

`server.js`

```js
app.delete("/api/products", async (req, res) => {
  const { id } = req.params;
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### 建立 `routes` 以提升程式碼模組化

- 於 `backend` 資料夾下建立 `routes` 資料夾，並新增 `product.route.js`。
- 將 `server.js` 中的 `GET`、`POST`、`PUT`、`DELETE` 方法移至 `product.route.js`，並改用 `product.route` 管理。
- 將移入 `product.route.js` 的功能由 `app` 改為 `router`，並將路徑調整為 `/`。

`server.js`

```js
import productRoutes from "./routes/product.route.js";

app.use("/api/products", productRoutes);
```

`product.route.js`

```js
import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
```

### 建立 `controllers` 以進一步提升程式碼模組化

- 建立 `controllers` 資料夾，並於其中新增 `product.controller.js`。
- 將 `product.route.js` 之功能重構至 `product.controller.js`。
- 於 `product.route.js` 中匯入 `product.controller.js` 的相關功能。

`product.controller.js`

```js
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
```

`product.route.js`

```js
import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
```

---

<a name="en"></a>

## English Version - Backend Features

### Goal

- Implement backend APIs to perform database operations.

### Create a `models` folder and `product.model.js`

- Define `productSchema` in the `product.model.js` file.
- Declare a `mongoose.model` using `productSchema`.
- Export the model.

`product.model.js`

```js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
```

### Add a `POST` method in `server.js` to receive user input

- Enable `app` to accept JSON.
- Create a `POST` endpoint to receive user-submitted data.

`server.js`

```js
app.use(express.json()); // allows us to accept JSON data in the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### Add a `GET` method in `server.js` to retrieve all data

`server.js`

```js
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### Add a `PUT` method in `server.js` to update data

`server.js`

```js
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

Note: The original snippet had `app.put("/api/products", ...)` but used `req.params.id`. The correct route should include `/:id` as shown above.

### Add a `DELETE` method in `server.js` to delete data

`server.js`

```js
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
```

### Create `routes` to improve modularity

- Under the `backend` folder, create a `routes` folder and add `product.route.js`.
- Move the `GET`, `POST`, `PUT`, and `DELETE` handlers from `server.js` into `product.route.js`.
- Use `router` in `product.route.js` and set paths to `/`.

`server.js`

```js
import productRoutes from "./routes/product.route.js";

app.use("/api/products", productRoutes);
```

`product.route.js`

```js
import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
```

### Create `controllers` to further modularize logic

- Create a `controllers` folder and add `product.controller.js`.
- Refactor the logic from `product.route.js` into `product.controller.js`.
- Import the controller functions into `product.route.js`.

`product.controller.js`

```js
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Delete Product ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
```

`product.route.js`

```js
import express from "express";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
```
