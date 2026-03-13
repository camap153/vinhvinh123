import React, { useState, useEffect } from 'react';
import { db, ref, onValue, set, push, remove, update } from './firebase';

function App() {
    const [products, setProducts] = useState([]);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editPrice, setEditPrice] = useState('');

    useEffect(() => {
        const productsRef = ref(db, 'products');
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            const productList = data ? Object.entries(data).map(([id, values]) => ({
                id,
                ...values
            })) : [];
            setProducts(productList);
        });
        return () => unsubscribe();
    }, []);

    const addProduct = (e) => {
        e.preventDefault();
        if (!newName || !newPrice) return;
        const productsRef = ref(db, 'products');
        push(productsRef, {
            name: newName,
            price: parseInt(newPrice) || 0,
            updatedAt: new Date().toISOString()
        });
        setNewName('');
        setNewPrice('');
    };

    const deleteProduct = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
            remove(ref(db, `products/${id}`));
        }
    };

    const startEdit = (product) => {
        setEditingId(product.id);
        setEditPrice(product.price);
    };

    const savePrice = (id) => {
        update(ref(db, `products/${id}`), {
            price: parseInt(editPrice) || 0,
            updatedAt: new Date().toISOString()
        });
        setEditingId(null);
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <header>
                <h1>Quản Lý Báo Giá</h1>
                <p>Hệ thống quản lý giá sản phẩm chuyên nghiệp</p>
            </header>

            <div className="add-section">
                <h2>Thêm Sản Phẩm Mới</h2>
                <form onSubmit={addProduct} className="form-grid">
                    <input
                        type="text"
                        placeholder="Tên sản phẩm..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Giá (VNĐ)..."
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                    <button type="submit" className="primary">Thêm mới</button>
                </form>
            </div>

            <input
                type="text"
                className="search-bar"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="product-list">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            {editingId === product.id ? (
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <input
                                        type="number"
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(e.target.value)}
                                        autoFocus
                                    />
                                    <button onClick={() => savePrice(product.id)} className="primary btn-small">Lưu</button>
                                    <button onClick={() => setEditingId(null)} className="btn-small">Hủy</button>
                                </div>
                            ) : (
                                <p className="product-price">{product.price.toLocaleString()} VNĐ</p>
                            )}
                        </div>
                        <div className="actions">
                            <button onClick={() => startEdit(product)} className="btn-small">Sửa giá</button>
                            <button onClick={() => deleteProduct(product.id)} className="btn-small btn-delete">Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
