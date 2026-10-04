export interface MenuItem {
  id: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  price: number;
  priceFormatted: string;
  isVegetarian: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isChefSpecial?: boolean;
  isSignature?: boolean;
  calories?: number;
  allergens?: string[];
  imageUrl?: string;
}

export interface MenuCategory {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "specialty-coffee",
    slug: "coffee",
    titleEn: "Specialty Coffee & Brews",
    titleHi: "विशेष कॉफ़ी और ब्रूज़",
    descriptionEn: "Ethically sourced, single-origin Arabica beans roasted in micro-batches and poured with precision.",
    descriptionHi: "नैतिक रूप से प्राप्त, विशेष अरेबिका बीन्स जिन्हें सूक्ष्म बैचों में भुना और तैयार किया जाता है।",
    items: [
      {
        id: "a2-signature-pourover",
        nameEn: "A2 Pour-Over Reserve (V60)",
        nameHi: "A2 पोर-ओवर रिज़र्व (V60)",
        descriptionEn: "Single-origin washed Ethiopian Yirgacheffe with bright floral jasmine notes, bergamot citrus, and honey finish.",
        descriptionHi: "चमेली के फूलों और सिट्रस की ताज़ा सुगंध के साथ विशेष इथियोपियन अरेबिका कॉफ़ी।",
        price: 280,
        priceFormatted: "₹280",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        isSignature: true,
        allergens: [],
      },
      {
        id: "cortado-velvet",
        nameEn: "Velvet Spanish Cortado",
        nameHi: "वेलवेट स्पैनिश कोरटाडो",
        descriptionEn: "Equal parts double ristretto espresso and silky textured steamed whole milk, served in a heavy fluted glass.",
        descriptionHi: "डबल रिस्ट्रैटो एस्प्रेसो और मलाईदार दूध का उत्तम 1:1 संतुलन।",
        price: 240,
        priceFormatted: "₹240",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        allergens: ["Dairy"],
      },
      {
        id: "salted-caramel-cold-brew",
        nameEn: "Slow Drip Salted Caramel Cold Brew",
        nameHi: "साल्टेड कारमेल कोल्ड ब्रू",
        descriptionEn: "18-hour cold steeped Arabica infused with house-cooked sea salt caramel syrup, crowned with vanilla cold foam.",
        descriptionHi: "18 घंटे धीमी गति से तैयार कोल्ड ब्रू, घर पर बने सी सॉल्ट कारमेल और वैनिला फोम के साथ।",
        price: 290,
        priceFormatted: "₹290",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSignature: true,
        allergens: ["Dairy"],
      },
      {
        id: "affogato-al-caffe",
        nameEn: "Artisanal Affogato al Caffè",
        nameHi: "आर्टिसनल अफ़ोगाटो अल कैफे",
        descriptionEn: "Two scoops of artisanal Madagascar vanilla bean gelato drenched with a double shot of piping hot espresso.",
        descriptionHi: "मडागास्कर वैनिला जिलाटो पर डाला गया ताज़ा गर्म एस्प्रेसो का डबल शॉट।",
        price: 260,
        priceFormatted: "₹260",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        allergens: ["Dairy"],
      },
    ],
  },
  {
    id: "gourmet-burgers",
    slug: "burgers",
    titleEn: "Artisanal Brioche Burgers",
    titleHi: "हस्तनिर्मित ब्रियोश बर्गर",
    descriptionEn: "House-baked French brioche buns, melted artisanal cheeses, crisp organic farm greens, and secret sauces.",
    descriptionHi: "घर पर बेक किए गए ब्रियोश बन, कारीगरी चीज़ और ताज़ी जैविक सब्ज़ियों के साथ बने लाजवाब बर्गर।",
    items: [
      {
        id: "truffle-mushroom-melt",
        nameEn: "Truffle & Forest Mushroom Melt",
        nameHi: "ट्रफ़ल और मशरूम मेल्ट",
        descriptionEn: "Pan-seared Portobello and button mushrooms, melted Gruyère cheese, white truffle emulsion, caramelized balsamic onions.",
        descriptionHi: "पैन-सियर्ड पोर्टोबेलो मशरूम, पिघला हुआ ग्रुयेर चीज़ और वाइट ट्रफ़ल सॉस।",
        price: 460,
        priceFormatted: "₹460",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSignature: true,
        isChefSpecial: true,
        allergens: ["Gluten", "Dairy"],
      },
      {
        id: "smoky-cottage-cheese-stack",
        nameEn: "Smoky Charred Paneer Brioche",
        nameHi: "स्मोकी पनीर ब्रियोश बर्गर",
        descriptionEn: "Tandoor-smoked spiced cottage cheese steak, crunchy pickled jalapeño slaw, chimichurri aioli on toasted butter bun.",
        descriptionHi: "तंदूरी स्मोक्ड पनीर स्टेक, क्रंची जालापिनो स्ला और चिमिचुरी मायो के साथ।",
        price: 420,
        priceFormatted: "₹420",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["Gluten", "Dairy"],
      },
      {
        id: "crispy-avocado-halloumi",
        nameEn: "Crisp Halloumi & Hass Avocado",
        nameHi: "क्रिस्प हालूमी और एवोकैडो बर्गर",
        descriptionEn: "Golden pan-fried halloumi cheese block, sliced ripe Hass avocado, heirloom tomato, baby arugula, sun-dried tomato pesto.",
        descriptionHi: "सुनहरा तला हुआ हालूमी चीज़, ताज़ा हास एवोकैडो और सन-ड्राइड टोमैटो पेस्टो।",
        price: 490,
        priceFormatted: "₹490",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["Gluten", "Dairy"],
      },
    ],
  },
  {
    id: "patisserie-desserts",
    slug: "desserts",
    titleEn: "Small-Batch Patisserie",
    titleHi: "ताज़ी बेक्ड पेस्ट्री और डेसर्ट",
    descriptionEn: "Handcrafted daily by our pastry chefs using pure Normandy butter, Belgian single-estate chocolates, and seasonal fruits.",
    descriptionHi: "शुद्ध मक्खन, बेल्जियन चॉकलेट और मौसमी फलों से हमारे पेस्ट्री शेफ द्वारा रोज़ाना ताज़ा तैयार।",
    items: [
      {
        id: "pistachio-opera-cake",
        nameEn: "Bronte Pistachio Opera Gateau",
        nameHi: "पिस्ता ओपेरा गेटो",
        descriptionEn: "Almond joconde sponge steeped in coffee liqueur, layered with Italian pistachio buttercream and 70% dark ganache.",
        descriptionHi: "कॉफ़ी में डूबा हुआ बादाम स्पंज, इटालियन पिस्ता बटरक्रीम और डार्क चॉकलेट गनाश।",
        price: 380,
        priceFormatted: "₹380",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        isSignature: true,
        isChefSpecial: true,
        allergens: ["Gluten", "Dairy", "Nuts"],
      },
      {
        id: "basque-burnt-cheesecake",
        nameEn: "San Sebastián Burnt Cheesecake",
        nameHi: "सैन सेबेस्टियन बर्न्ट चीज़केक",
        descriptionEn: "Caramelized deeply on top with a silky molten center, served with warm raspberry coulis and vanilla bean cream.",
        descriptionHi: "ऊपर से कैरामेलाइज़्ड और अंदर से बेहद मलाईदार चीज़केक, रैस्पबेरी सॉस के साथ।",
        price: 360,
        priceFormatted: "₹360",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: true,
        isSignature: true,
        allergens: ["Dairy"],
      },
      {
        id: "belgian-choc-fondant",
        nameEn: "Molten Belgian Chocolate Lava",
        nameHi: "बेल्जियन चॉकलेट लावा केक",
        descriptionEn: "Warm Callebaut dark chocolate cake with a cascading liquid chocolate center, dusted with gold flakes and served with gelato.",
        descriptionHi: "पिघली हुई डार्क बेल्जियन चॉकलेट से भरा गर्म लावा केक, जिलाटो के साथ।",
        price: 350,
        priceFormatted: "₹350",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["Gluten", "Dairy"],
      },
    ],
  },
  {
    id: "artisanal-breakfast",
    slug: "breakfast",
    titleEn: "All-Day Artisanal Breakfast",
    titleHi: "ऑल-डे स्पेशल नाश्ता",
    descriptionEn: "Wholesome sourdough toasts, organic farm eggs, açai superfood bowls, and cold-pressed elixirs.",
    descriptionHi: "ताज़ा सॉरडो टोस्ट, जैविक अंडे, सुपरफ़ूड असाई बाउल और ताज़ा कोल्ड-प्रेस्ड जूस।",
    items: [
      {
        id: "whipped-ricotta-toast",
        nameEn: "Whipped Truffle Honey Ricotta Toast",
        nameHi: "व्हिप्ड ट्रफ़ल हनी रिकोटा टोस्ट",
        descriptionEn: "Toasted country sourdough, whipped sheep's milk ricotta, wild acacia honey, roasted crushed pistachios, fresh figs.",
        descriptionHi: "कुरकुरा सॉरडो टोस्ट, मखमली रिकोटा चीज़, शहद, भुना हुआ पिस्ता और ताज़ा अंजीर।",
        price: 390,
        priceFormatted: "₹390",
        isVegetarian: true,
        isVegan: false,
        isGlutenFree: false,
        allergens: ["Gluten", "Dairy", "Nuts"],
      },
      {
        id: "classic-avocado-sourdough",
        nameEn: "Hass Avocado & Poached Egg Sourdough",
        nameHi: "एवोकैडो और पोच्ड एग सॉरडो",
        descriptionEn: "Chunky smashed Hass avocado, poached organic farm egg, Danish feta crumbles, toasted chili flakes, microgreens.",
        descriptionHi: "मैश किया हुआ ताज़ा एवोकैडो, ऑर्गेनिक पोच्ड एग, फेटा चीज़ और माइक्रो-ग्रीन्स सॉरडो ब्रेड पर।",
        price: 440,
        priceFormatted: "₹440",
        isVegetarian: false, // contains egg
        isVegan: false,
        isGlutenFree: false,
        isSignature: true,
        allergens: ["Gluten", "Dairy", "Egg"],
      },
      {
        id: "wild-berry-acai-bowl",
        nameEn: "Amazonian Wild Açai Bowl",
        nameHi: "अमेज़ोनियन वाइल्ड असाई बाउल",
        descriptionEn: "Organic blended açai pulp topped with house-baked granola, chia seeds, sliced bananas, fresh berries, cacao nibs.",
        descriptionHi: "जैविक असाई पल्प, घर का बना ग्रेनोला, चिया बीज, ताज़े फल और कोको निब्स।",
        price: 420,
        priceFormatted: "₹420",
        isVegetarian: true,
        isVegan: true,
        isGlutenFree: true,
        allergens: ["Nuts"],
      },
    ],
  },
];
