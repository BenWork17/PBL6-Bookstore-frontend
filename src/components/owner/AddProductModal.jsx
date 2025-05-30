import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AddProductModal({
  token,
  categories,
  shopId,
  onClose,
  onAdded,    // sẽ gọi createProduct
}) {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    file_url: "",
    categoryId: categories.length ? categories[0].id : null,
  });

  const handleChange = (f) => (e) => {
    const v = f === "price" ? +e.target.value : e.target.value;
    setForm((s) => ({ ...s, [f]: v }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: form.price,
      description: form.description,
      file_url: form.file_url,
      file_format: "pdf",
      is_downloadable: true,
      category_id: form.categoryId,
      shop_id: shopId,
    };
    onAdded(payload);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-xl shadow-2xl w-96"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>

        {["name", "price", "description", "file_url"].map((f) => (
          <label key={f} className="block mb-3">
            {f.charAt(0).toUpperCase() + f.slice(1)}:
            <input
              type={f === "price" ? "number" : "text"}
              value={form[f]}
              onChange={handleChange(f)}
              className="w-full border px-2 py-1 rounded mt-1"
              required={f !== "description"}
            />
          </label>
        ))}

        <fieldset className="mb-4">
          <legend className="font-medium mb-2">Danh mục</legend>
          <div className="space-y-2">
            {categories.map((c) => (
              <label key={c.id} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="category"
                  checked={form.categoryId === c.id}
                  onChange={() => setForm((s) => ({ ...s, categoryId: c.id }))}
                  className="mr-1"
                />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Lưu
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
