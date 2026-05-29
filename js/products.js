// js/products.js — each product has a unique main image (no repeats across catalog)

const products = [
    // ── Dresses (5) ──
    {
        id: "p1",
        name: "Midnight Velvet Gown",
        category: "Dresses",
        price: 899,
        oldPrice: 1200,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80",
        badge: "sale",
        isNew: true,
        description: "A stunning velvet gown designed for the perfect evening. Features a deep V-neck and a slit up the leg."
    },
    {
        id: "p9",
        name: "Crimson Satin Slip Dress",
        category: "Dresses",
        price: 420,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Bias-cut satin slip dress with adjustable straps and a fluid silhouette."
    },
    {
        id: "p10",
        name: "Ivory Lace Maxi Dress",
        category: "Dresses",
        price: 650,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Romantic lace maxi with scalloped hem and fitted bodice."
    },
    {
        id: "p11",
        name: "Emerald Wrap Dress",
        category: "Dresses",
        price: 380,
        oldPrice: 480,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Classic wrap dress in rich emerald silk with a flattering tie waist."
    },
    {
        id: "p12",
        name: "Starlight Cocktail Dress",
        category: "Dresses",
        price: 520,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
        badge: "trending",
        isNew: true,
        description: "Sequined cocktail dress with a fitted bodice and flared skirt."
    },

    // ── Outerwear (5) ──
    {
        id: "p2",
        name: "Noir Leather Jacket",
        category: "Outerwear",
        price: 550,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Premium Italian leather jacket with a tailored fit. Silver hardware accents."
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
        id: "p13",
        name: "Frost Wool Overcoat",
        category: "Outerwear",
        price: 920,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Long-line wool overcoat with notched lapels and horn buttons."
    },
    {
        id: "p14",
        name: "Camel Suede Blazer",
        category: "Outerwear",
        price: 640,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Structured suede blazer in warm camel with satin lining."
    },
    {
        id: "p15",
        name: "Storm Puffer Jacket",
        category: "Outerwear",
        price: 490,
        oldPrice: 590,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Lightweight quilted puffer with down fill and a high collar."
    },

    // ── Tops (5) ──
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
        id: "p16",
        name: "Linen Breeze Shirt",
        category: "Tops",
        price: 185,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Relaxed-fit linen shirt with a curved hem and mother-of-pearl buttons."
    },
    {
        id: "p17",
        name: "Noir Corset Top",
        category: "Tops",
        price: 260,
        oldPrice: 320,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Structured corset top with boning and a sweetheart neckline."
    },
    {
        id: "p18",
        name: "Champagne Camisole",
        category: "Tops",
        price: 145,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Delicate satin camisole with adjustable straps and lace trim."
    },
    {
        id: "p19",
        name: "Striped Sailor Top",
        category: "Tops",
        price: 195,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Nautical-inspired striped top in breathable cotton with a boat neck."
    },

    // ── Bottoms (5) ──
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
        id: "p6",
        name: "Aura Pleated Midi Skirt",
        category: "Bottoms",
        price: 180,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1555529902-5261145633bf?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Flowy pleated midi skirt in an iridescent fabric."
    },
    {
        id: "p20",
        name: "High-Rise Denim Jeans",
        category: "Bottoms",
        price: 240,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Straight-leg denim jeans with a high rise and vintage wash."
    },
    {
        id: "p21",
        name: "Velvet Wide-Leg Pants",
        category: "Bottoms",
        price: 340,
        oldPrice: 420,
        image: "https://images.unsplash.com/photo-1555529902-5261145633bf?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Luxurious velvet wide-leg pants with a side zip and fluid drape."
    },
    {
        id: "p22",
        name: "Silk Column Skirt",
        category: "Bottoms",
        price: 275,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Floor-length silk column skirt with a hidden side slit."
    },

    // ── Knitwear (5) ──
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
        id: "p23",
        name: "Merino Roll Neck",
        category: "Knitwear",
        price: 320,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Fine merino wool roll-neck sweater in a slim, modern fit."
    },
    {
        id: "p24",
        name: "Cable Knit Cardigan",
        category: "Knitwear",
        price: 290,
        oldPrice: 360,
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Chunky cable-knit cardigan with horn buttons and patch pockets."
    },
    {
        id: "p25",
        name: "Mohair Blend Vest",
        category: "Knitwear",
        price: 210,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Fluffy mohair vest with a V-neck and ribbed hem."
    },
    {
        id: "p26",
        name: "Wool Blend Turtleneck",
        category: "Knitwear",
        price: 265,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Classic turtleneck in a soft wool-cashmere blend."
    },

    // ── Accessories (5) ──
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
    },
    {
        id: "p27",
        name: "Gold Chain Belt",
        category: "Accessories",
        price: 95,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Delicate gold-plated chain belt with an adjustable clasp."
    },
    {
        id: "p28",
        name: "Leather Crossbody Bag",
        category: "Accessories",
        price: 380,
        oldPrice: 450,
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
        badge: "sale",
        isNew: false,
        description: "Compact crossbody bag in pebbled leather with an adjustable strap."
    },
    {
        id: "p29",
        name: "Pearl Drop Earrings",
        category: "Accessories",
        price: 160,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=500&q=80",
        badge: null,
        isNew: true,
        description: "Freshwater pearl drop earrings set in 14k gold vermeil."
    },
    {
        id: "p30",
        name: "Silk Headband Set",
        category: "Accessories",
        price: 75,
        oldPrice: null,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80",
        hoverImage: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80",
        badge: "trending",
        isNew: false,
        description: "Set of three printed silk headbands in complementary patterns."
    }
];

// Unique fallback per product if an image fails to load
const imageFallbacks = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&q=80",
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80"
];

const getFallbackImage = (productId) => {
    const num = parseInt(productId.replace(/\D/g, ""), 10) || 0;
    return imageFallbacks[num % imageFallbacks.length];
};

const getProductById = (id) => products.find(p => p.id === id);

const generateProductCard = (product) => {
    const saleBadge = product.badge === 'sale' ? `<span class="badge-tag sale">Sale</span>` : '';
    const trendingBadge = product.badge === 'trending' ? `<span class="badge-tag">Trending</span>` : '';
    const newBadge = product.isNew ? `<span class="badge-tag">New</span>` : '';
    const oldPriceHTML = product.oldPrice ? `<span class="price-old">$${product.oldPrice}</span>` : '';
    const fallback = getFallbackImage(product.id);

    return `
        <div class="product-card reveal">
            <div class="product-badges">
                ${newBadge}
                ${saleBadge}
                ${trendingBadge}
            </div>
            <a href="product.html?id=${product.id}" class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="img-main" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
                <img src="${product.hoverImage}" alt="" class="img-hover" loading="lazy" aria-hidden="true" onerror="this.closest('.product-img-wrapper').classList.add('hover-broken')">
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
