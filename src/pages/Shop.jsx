// import { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../context/CartContext.jsx';

const PLACEHOLDER_PRODUCTS = [
    {
        id: 'p1',
        title: 'Pathfinding agent starter kit',
        category: 'code',
        platform: 'engine-agnostic',
        license: 'personal',
        price: 12,
        tags: ['pathfinding', 'ai', 'starter'],
    },
    {
        id: 'p2',
        title: 'Low-poly forest environment pack',
        category: 'game-asset',
        platform: 'unity',
        license: 'commercial',
        price: 24,
        tags: ['3d', 'environment', 'nature'],
    },
    {
        id: 'p3',
        title: 'Retro UI kit — arcade style',
        category: 'template',
        platform: 'figma',
        license: 'personal',
        price: 8,
        tags: ['ui', 'retro', 'figma'],
    },
    {
        id: 'p4',
        title: 'Ambient synth loop pack',
        category: 'audio',
        platform: 'engine-agnostic',
        license: 'extended',
        price: 18,
        tags: ['audio', 'ambient', 'loops'],
    },
    {
        id: 'p5',
        title: '3D globe visualization template',
        category: 'code',
        platform: 'web',
        license: 'commercial',
        price: 30,
        tags: ['3d', 'data-viz', 'web'],
    },
];

const CATEGORIES = ['all', 'code', 'game-asset', 'template', 'audio'];

function Shop() {
    const [activeCategory, setActiveCategory] = useState('all');
    const { addToCart } = useCart();
    const navigate = useNavigate();


    const filteredProducts = useMemo(() => {
        if (activeCategory === 'all') return PLACEHOLDER_PRODUCTS;
        return PLACEHOLDER_PRODUCTS.filter((p) => p.category === activeCategory);
    }, [activeCategory]);


    const handleAddToCart = (product) => {
        addToCart(product);
        navigate('/checkout');

    };
    return (
        <div className="shop">
            <aside className="facet-panel">
                <h2>Category</h2>
                <ul className="facet-list">
                    {CATEGORIES.map((cat) => (
                        <li key={cat}>
                            <button
                                className={cat === activeCategory ? 'facet-active' : ''}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
                {/* platform, price, and license facets go here once data layer is real */}
            </aside>

            <section className="product-grid">
                {filteredProducts.map((product) => (
                    <article key={product.id} className="product-card">
                        <h3>{product.title}</h3>
                        <p className="product-meta">
                            {product.platform} &middot; {product.license} license
                        </p>
                        <p className="product-price">${product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default Shop;