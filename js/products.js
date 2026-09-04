let PRODUCTS = [
  { id: 1, name: "Scentelle Noir", gender: "Men", type: "Eau de Parfum", price: 12999, rating: 4.8, image: "assets/images/bottle-noir.svg", description: "A sophisticated fragrance combining fresh citrus with warm woods and deep amber.", topNotes: ["Bergamot", "Lemon"], heartNotes: ["Lavender", "Cedarwood"], baseNotes: ["Amber", "Musk", "Oud"] },
  { id: 2, name: "Velvet Rose", gender: "Women", type: "Eau de Parfum", price: 9999, rating: 4.7, image: "assets/images/bottle-rose.svg", description: "A soft rose fragrance wrapped in creamy musk and a quiet touch of spice.", topNotes: ["Pink Pepper", "Mandarin"], heartNotes: ["Rose", "Peony"], baseNotes: ["Musk", "Vanilla", "Sandalwood"] },
  { id: 3, name: "Oud Royale", gender: "Unisex", type: "Parfum", price: 18999, rating: 4.9, image: "assets/images/bottle-amber.svg", description: "Deep oud, resin, and amber create a rich evening scent with lasting presence.", topNotes: ["Saffron", "Nutmeg"], heartNotes: ["Rose", "Incense"], baseNotes: ["Oud", "Amber", "Leather"] },
  { id: 4, name: "Azure Mist", gender: "Women", type: "Eau de Toilette", price: 7499, rating: 4.4, image: "assets/images/bottle-blue.svg", description: "Fresh aquatic notes meet jasmine and clean woods for an airy daytime fragrance.", topNotes: ["Sea Salt", "Pear"], heartNotes: ["Jasmine", "Lily"], baseNotes: ["Cedar", "White Musk", "Ambergris"] },
  { id: 5, name: "Amber Essence", gender: "Unisex", type: "Eau de Parfum", price: 11999, rating: 4.6, image: "assets/images/bottle-amber.svg", description: "Warm amber, tonka, and soft woods make this a comfortable signature scent.", topNotes: ["Orange", "Cardamom"], heartNotes: ["Tonka", "Cinnamon"], baseNotes: ["Amber", "Patchouli", "Musk"] },
  { id: 6, name: "Midnight Reverie", gender: "Men", type: "Parfum", price: 16999, rating: 4.8, image: "assets/images/bottle-noir.svg", description: "Dark spices and smoky woods designed for late nights and formal moments.", topNotes: ["Black Pepper", "Grapefruit"], heartNotes: ["Violet", "Clove"], baseNotes: ["Vetiver", "Incense", "Amber"] },
  { id: 7, name: "White Musk", gender: "Women", type: "Eau de Toilette", price: 6999, rating: 4.3, image: "assets/images/bottle-rose.svg", description: "Clean, delicate, and softly floral with a graceful musk trail.", topNotes: ["Aldehydes", "Neroli"], heartNotes: ["Iris", "Lily"], baseNotes: ["White Musk", "Cashmere Wood", "Vanilla"] },
  { id: 8, name: "Golden Oud", gender: "Men", type: "Parfum", price: 17999, rating: 4.9, image: "assets/images/bottle-amber.svg", description: "A golden blend of oud, spice, and smoky resin for confident evenings.", topNotes: ["Saffron", "Bergamot"], heartNotes: ["Oud", "Rosewood"], baseNotes: ["Amber", "Labdanum", "Leather"] },
  { id: 9, name: "Citrus Veil", gender: "Unisex", type: "Eau de Toilette", price: 7999, rating: 4.2, image: "assets/images/bottle-blue.svg", description: "Bright citrus and tea notes make a fresh, easy fragrance for warm days.", topNotes: ["Lime", "Grapefruit"], heartNotes: ["Green Tea", "Mint"], baseNotes: ["Cedar", "Musk", "Vetiver"] },
  { id: 10, name: "Fleur Lumiere", gender: "Women", type: "Eau de Parfum", price: 10999, rating: 4.6, image: "assets/images/bottle-rose.svg", description: "Radiant white flowers with pear and sandalwood for an elegant floral finish.", topNotes: ["Pear", "Bergamot"], heartNotes: ["Tuberose", "Jasmine"], baseNotes: ["Sandalwood", "Musk", "Vanilla"] },
  { id: 11, name: "Obsidian", gender: "Men", type: "Eau de Parfum", price: 13999, rating: 4.7, image: "assets/images/bottle-noir.svg", description: "A crisp woody aromatic fragrance with leather accents and a polished edge.", topNotes: ["Apple", "Bergamot"], heartNotes: ["Geranium", "Sage"], baseNotes: ["Leather", "Cedar", "Amber"] },
  { id: 12, name: "Ocean Eclat", gender: "Unisex", type: "Eau de Toilette", price: 8999, rating: 4.5, image: "assets/images/bottle-blue.svg", description: "Sparkling marine freshness balanced with citrus, herbs, and soft musk.", topNotes: ["Marine Accord", "Lemon"], heartNotes: ["Basil", "Jasmine"], baseNotes: ["Musk", "Driftwood", "Ambergris"] },
  { id: 13, name: "Imperial Amber", gender: "Men", type: "Parfum", price: 18499, rating: 4.8, image: "assets/images/bottle-amber.svg", description: "Resinous amber and spice with a smooth, formal depth.", topNotes: ["Cinnamon", "Orange"], heartNotes: ["Myrrh", "Clove"], baseNotes: ["Amber", "Oud", "Tonka"] },
  { id: 14, name: "Rose Nocturne", gender: "Women", type: "Parfum", price: 15499, rating: 4.7, image: "assets/images/bottle-rose.svg", description: "Dark rose petals, plum, and patchouli create a romantic evening perfume.", topNotes: ["Plum", "Pink Pepper"], heartNotes: ["Damask Rose", "Violet"], baseNotes: ["Patchouli", "Musk", "Amber"] },
  { id: 15, name: "Cedar Elixir", gender: "Men", type: "Eau de Toilette", price: 8499, rating: 4.4, image: "assets/images/bottle-noir.svg", description: "Dry cedar, herbs, and citrus form a clean masculine everyday scent.", topNotes: ["Bergamot", "Rosemary"], heartNotes: ["Cedar Leaf", "Lavender"], baseNotes: ["Cedarwood", "Vetiver", "Musk"] },
  { id: 16, name: "Vanilla Muse", gender: "Unisex", type: "Eau de Parfum", price: 11499, rating: 4.6, image: "assets/images/bottle-amber.svg", description: "Creamy vanilla, almond, and amber with a refined gourmand warmth.", topNotes: ["Almond", "Mandarin"], heartNotes: ["Vanilla Orchid", "Heliotrope"], baseNotes: ["Vanilla", "Amber", "Sandalwood"] }
];

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}

let productsRequest = null;

function loadProducts() {
  if (productsRequest) return productsRequest;

  productsRequest = fetch("api/products.php")
    .then((response) => {
      if (!response.ok) throw new Error("Products API unavailable");
      return response.json();
    })
    .then((data) => {
      if (data.success && Array.isArray(data.products) && data.products.length) {
        PRODUCTS = data.products;
      }
      return PRODUCTS;
    })
    .catch(() => PRODUCTS);

  return productsRequest;
}

function onProductsReady(callback) {
  const run = () => loadProducts().then(callback);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
}
