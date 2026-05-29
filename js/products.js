// js/products.js
const products = [
    {
        id: "p1",
        name: "Midnight Velvet Gown",
        category: "Dresses",
        price: 899,
        oldPrice: 1200,
        image: "https://images.unsplash.com/photo-1566160983866-f187a54a7f05?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80",
        badge: "sale",
        isNew: true,
        description: "A stunning velvet gown designed for the perfect evening. Features a deep V-neck and a slit up the leg."
    },
    {
        id: "p2",
        name: "Noir Leather Jacket",
        category: "Outerwear",
        price: 550,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Premium Italian leather jacket with a tailored fit. Silver hardware accents."
    },
    {
        id: "p3",
        name: "Silk Serenity Blouse",
        category: "Tops",
        price: 220,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "100% pure silk blouse with delicate draping and pearl buttons."
    },
    {
        id: "p4",
        name: "Oxford Tailored Trousers",
        category: "Bottoms",
        price: 310,
        oldPrice: 380,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "High-waisted tailored trousers in a premium wool blend. Sharp crease lines."
    },
    {
        id: "p5",
        name: "Cashmere Cloud Sweater",
        category: "Knitwear",
        price: 450,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Ultra-soft 100% cashmere sweater. Ribbed cuffs and hem."
    },
    {
        id: "p6",
        name: "Aura Pleated Midi Skirt",
        category: "Bottoms",
        price: 180,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1583496924765-728b97d268d8?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1555529902-5261145633bf?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Flowy pleated midi skirt in an iridescent fabric."
    },
    {
        id: "p7",
        name: "Obsidian Trench Coat",
        category: "Outerwear",
        price: 780,
        oldPrice: 850,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Classic double-breasted trench coat in water-resistant gabardine."
    },
    {
        id: "p8",
        name: "Celestial Silk Scarf",
        category: "Accessories",
        price: 120,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Printed silk scarf with astrological motifs. Hand-rolled edges."
    }
];

// Utility to find product by id
const getProductById = (id) => products.find(p => p.id === id);

// Generate Product Card HTML
const generateProductCard = (product) => {
    const saleBadge = product.badge === 'sale' ? `<span class="badge-tag sale">Sale</span>` : '';
    const trendingBadge = product.badge === 'trending' ? `<span class="badge-tag">Trending</span>` : '';
    const newBadge = product.isNew ? `<span class="badge-tag">New</span>` : '';
    
    const oldPriceHTML = product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : '';

    return `
        <div class="product-card reveal">
            <div class="product-badges">
                ${newBadge}
                ${saleBadge}
                ${trendingBadge}
            </div>
            <a href="product.html?id=${product.id}" class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="img-main">
                <img src="${product.hoverImage}" alt="${product.name}" class="img-hover">
            </a>
            <div class="product-actions">
                <button class="action-btn wishlist-btn" data-id="${product.id}" title="Add to Wishlist">
                    <i class="ph ph-heart"></i>
                </button>
                <button class="action-btn add-to-cart-btn" data-id="${product.id}" title="Add to Cart">
                    <i class="ph ph-shopping-bag"></i>
                </button>
                <a href="product.html?id=${product.id}" class="action-btn" title="View Details">
                    <i class="ph ph-eye"></i>
                </a>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
                <div class="product-price">
                    ${oldPriceHTML}
                    <span class="price-current">$${product.price}</span>
                </div>
            </div>
        </div>
    `;
};
