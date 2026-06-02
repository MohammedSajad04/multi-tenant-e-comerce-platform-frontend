import {
    useEffect,
    useMemo,
    useState
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import {
    categories
} from "../../config/categories";
import {
    useAuth
} from "../../context/AuthContext";

const initialFormData = {
    name: "",
    description: "",
    category: "",
    business_type: "mobile",
    price: "",
    stock: "",
    image: null,
};

const getTenantBusinessType = (user) => {
    const businessType =
        user?.tenant?.business_type ||
        user?.tenant_business_type ||
        user?.business_type ||
        user?.company?.business_type;

    const normalizedBusinessType = businessType?.toLowerCase();

    return categories[normalizedBusinessType] ? normalizedBusinessType : "";
};

function ProductsPage() {
    const {
        user
    } = useAuth();
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const tenantBusinessType = getTenantBusinessType(user);

    const currentCategories = useMemo(
        () => categories[formData.business_type] || [],
        [formData.business_type]
    );

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await api.get(
                "products/company-products/"
            );

            setProducts(response.data);
        } catch (fetchError) {
            console.log(fetchError);
            setError("Unable to load products. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const {
            name,
            value,
            files
        } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setFormData({
            ...initialFormData,
            business_type: tenantBusinessType,
        });
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);

        setFormData({
            name: product.name || "",
            description: product.description || "",
            category: product.category || "",
            business_type: product.business_type || tenantBusinessType,
            price: product.price || "",
            stock: product.stock ?? "",
            image: null,
        });

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setFormData({
            ...initialFormData,
            business_type: tenantBusinessType,
        });
        setIsSaving(false);
    };

    const buildProductData = () => {
        const productData = new FormData();

        Object.keys(initialFormData).forEach((key) => {
            const value = formData[key];

            if (key === "image" && !value) {
                return;
            }

            if (value !== "" && value !== null) {
                productData.append(key, value);
            }
        });

        return productData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        try {
            const productData = buildProductData();
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };

            if (editingProduct) {
                await api.put(
                    `products/detail/${editingProduct.id}/`,
                    productData,
                    config
                );
            } else {
                await api.post(
                    "products/create/",
                    productData,
                    config
                );
            }

            await fetchProducts();
            closeModal();
        } catch (submitError) {
            console.log(submitError);
            setError("Unable to save product. Check all fields and try again.");
            setIsSaving(false);
        }
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        setError("");

        try {
            await api.delete(
                `products/detail/${productId}/`
            );

            fetchProducts();
        } catch (deleteError) {
            console.log(deleteError);
            setError("Unable to delete product. Please try again.");
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gray-50 p-6 md:p-10">
                <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-950">
                        Products
                    </h1>

                    <button
                        onClick={openAddModal}
                        className="bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-sm hover:bg-gray-800 transition"
                    >
                        + Add Product
                    </button>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-gray-500 shadow-sm">
                        Loading products...
                    </div>
                ) : products.length === 0 ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-gray-500 shadow-sm">
                        No products yet. Add your first product to get started.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition"
                            >
                                {product.image && (
                                    <img
                                        src={`http://127.0.0.1:8000${product.image}`}
                                        alt={product.name}
                                        className="w-full h-60 object-cover"
                                    />
                                )}

                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h2 className="text-2xl font-bold text-gray-950">
                                            {product.name}
                                        </h2>
                                        

                                        <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap">
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    <p className="text-gray-500 mb-6 line-clamp-3">
                                        {product.description}
                                    </p>

                                    <div className="flex justify-between items-center gap-4 mb-4">
                                        <h1 className="text-3xl font-bold text-gray-950">
                                            Rs. {product.price}
                                        </h1>

                                        <span className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-full">
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(product)}
                                            className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:border-black hover:text-black transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(product.id)}
                                            className="flex-1 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                        <div className="bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto p-6 md:p-10 rounded-2xl shadow-2xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-10">
                                {editingProduct ? "Edit Product" : "Add Product"}
                            </h1>

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-10"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold mb-6">
                                        Basic Info
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Product Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border border-gray-200 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            required
                                        />

                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="border border-gray-200 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            required
                                        >
                                            <option value="">
                                                Select Category
                                            </option>

                                            {currentCategories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="number"
                                            name="price"
                                            placeholder="Price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="border border-gray-200 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            min="0"
                                            step="0.01"
                                            required
                                        />

                                        <input
                                            type="number"
                                            name="stock"
                                            placeholder="Stock"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className="border border-gray-200 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                                            min="0"
                                            step="1"
                                            required
                                        />

                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleChange}
                                            className="border border-gray-200 p-5 rounded-xl"
                                            accept="image/*"
                                        />
                                    </div>

                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="border border-gray-200 p-5 rounded-xl w-full mt-5 focus:outline-none focus:ring-2 focus:ring-black"
                                        rows="5"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-5">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-black text-white px-8 py-4 rounded-xl font-semibold flex-1 hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:bg-gray-500"
                                    >
                                        {isSaving
                                            ? "Saving..."
                                            : editingProduct
                                                ? "Update Product"
                                                : "Add Product"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-100 text-gray-800 px-8 py-4 rounded-xl font-semibold flex-1 hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default ProductsPage;
