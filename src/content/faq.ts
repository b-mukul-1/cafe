export interface FaqItem {
  id: string;
  questionEn: string;
  questionHi: string;
  shortAnswerEn: string;
  shortAnswerHi: string;
  detailedAnswerEn: string;
  detailedAnswerHi: string;
  category: "hours" | "menu" | "ordering" | "visit" | "amenities";
}

export const faqItems: FaqItem[] = [
  {
    id: "opening-hours",
    questionEn: "What are the opening hours of A2 Cafe?",
    questionHi: "A2 कैफे के खुलने का समय क्या है?",
    shortAnswerEn: "A2 Cafe is open Monday through Friday from 8:00 AM to 11:00 PM, and Saturday through Sunday from 8:00 AM to 11:30 PM.",
    shortAnswerHi: "A2 कैफे सोमवार से शुक्रवार सुबह 8:00 बजे से रात 11:00 बजे तक, और शनिवार-रविवार सुबह 8:00 बजे से रात 11:30 बजे तक खुला रहता है।",
    detailedAnswerEn: "Our breakfast and pour-over bar begins promptly at 8:00 AM. Hot kitchen orders for brioche burgers and mains close 30 minutes before our final doors close every night.",
    detailedAnswerHi: "हमारा नाश्ता और कॉफ़ी बार सुबह 8:00 बजे शुरू हो जाता है। गर्म किचन ऑर्डर समापन समय से 30 मिनट पहले तक स्वीकार किए जाते हैं।",
    category: "hours",
  },
  {
    id: "location-directions",
    questionEn: "Where is A2 Cafe located and how do I get there?",
    questionHi: "A2 कैफे कहाँ स्थित है और यहाँ कैसे पहुंचे?",
    shortAnswerEn: "A2 Cafe is located at [[A2_FULL_ADDRESS]]. We are located approximately 5 minutes from [[A2_TRANSIT_STATION]].",
    shortAnswerHi: "A2 कैफे [[A2_FULL_ADDRESS_HI]] पर स्थित है। हम [[A2_TRANSIT_STATION_HI]] से लगभग 5 मिनट की दूरी पर हैं।",
    detailedAnswerEn: "You can reach us easily by metro, cab, or personal vehicle. Clear directional signboards and an interactive Google Maps location guide are provided on our Visit page.",
    detailedAnswerHi: "आप मेट्रो, कैब या निजी वाहन द्वारा आसानी से पहुँच सकते हैं। विस्तृत दिशा-निर्देश हमारे विज़िट पेज पर उपलब्ध हैं।",
    category: "visit",
  },
  {
    id: "vegetarian-vegan-options",
    questionEn: "Does A2 Cafe offer vegetarian, vegan, and gluten-free options?",
    questionHi: "क्या A2 कैफे में शाकाहारी, वीगन और ग्लूटेन-मुक्त विकल्प उपलब्ध हैं?",
    shortAnswerEn: "Yes, over 80% of our menu is vegetarian, with dedicated vegan, dairy-free, and gluten-free items clearly marked.",
    shortAnswerHi: "हाँ, हमारे मेनू का 80% से अधिक हिस्सा शाकाहारी है, और वीगन व ग्लूटेन-मुक्त विकल्प स्पष्ट रूप से चिह्नित हैं।",
    detailedAnswerEn: "We prepare all vegetarian and vegan selections using dedicated cookware and fryers. Plant-based milk options (oat, almond, and soy) are readily available for all coffee beverages without compromising foam quality.",
    detailedAnswerHi: "हम शाकाहारी और वीगन व्यंजनों के लिए अलग बर्तनों का उपयोग करते हैं। सभी कॉफ़ी पेय पदार्थों के लिए बादाम, ओट और सोया मिल्क के विकल्प उपलब्ध हैं।",
    category: "menu",
  },
  {
    id: "table-reservations",
    questionEn: "Do I need a reservation to visit A2 Cafe?",
    questionHi: "क्या A2 कैफे आने के लिए टेबल रिज़र्वेशन आवश्यक है?",
    shortAnswerEn: "Walk-ins are warmly welcomed at all times; table reservations are recommended for weekend evenings and parties of 4 or more.",
    shortAnswerHi: "वॉक-इन का हमेशा स्वागत है; सप्ताहांत की शाम और 4 या अधिक लोगों के समूह के लिए पहले से रिज़र्वेशन कराने की सलाह दी जाती है।",
    detailedAnswerEn: "To reserve an intimate table or a group booth, simply tap the Reserve button to connect with our host desk directly via WhatsApp or call us ahead of time.",
    detailedAnswerHi: "अपनी टेबल बुक करने के लिए व्हाट्सएप द्वारा सीधे संपर्क करें या हमारे फोन नंबर पर कॉल करें।",
    category: "visit",
  },
  {
    id: "online-ordering-delivery",
    questionEn: "How can I order coffee and food online from A2 Cafe?",
    questionHi: "A2 कैफे से ऑनलाइन कॉफ़ी और खाना कैसे ऑर्डर करें?",
    shortAnswerEn: "You can place direct pickup orders or delivery via our Order button, or call our desk directly for curated takeaway orders.",
    shortAnswerHi: "आप हमारी वेबसाइट के 'ऑर्डर' बटन द्वारा सीधे पिकअप या डिलीवरी ऑर्डर दे सकते हैं।",
    detailedAnswerEn: "All beverages are packaged in temperature-insulating, spill-proof recyclable flasks, ensuring your espresso arrives at the ideal extraction temperature.",
    detailedAnswerHi: "सभी पेय पदार्थों को तापमान-रोधी और लीक-प्रूफ बोतलों में पैक किया जाता है ताकि आपकी कॉफ़ी बिल्कुल ताज़ा पहुँचे।",
    category: "ordering",
  },
  {
    id: "parking-availability",
    questionEn: "Is parking available at A2 Cafe?",
    questionHi: "क्या A2 कैफे में पार्किंग की सुविधा उपलब्ध है?",
    shortAnswerEn: "Yes, complimentary valet parking and dedicated customer parking bays are available right outside our cafe entrance.",
    shortAnswerHi: "हाँ, कैफे के प्रवेश द्वार के ठीक बाहर निःशुल्क वैले पार्किंग और समर्पित पार्किंग स्थान उपलब्ध है।",
    detailedAnswerEn: "Our valet team is on duty from 9:00 AM until closing. EV charging points and bicycle racks are also stationed within 50 meters.",
    detailedAnswerHi: "हमारी वैले टीम सुबह 9:00 बजे से रात तक उपलब्ध रहती है। पास ही ईवी चार्जिंग और साइकिल स्टैंड भी उपलब्ध हैं।",
    category: "amenities",
  },
  {
    id: "wifi-work-friendly",
    questionEn: "Is A2 Cafe suitable for remote work and studying?",
    questionHi: "क्या A2 कैफे काम या पढ़ाई करने के लिए उपयुक्त है?",
    shortAnswerEn: "Yes, we feature complimentary high-speed fiber Wi-Fi, accessible universal power outlets at booth tables, and a serene ambient workspace vibe.",
    shortAnswerHi: "हाँ, हमारे यहाँ तेज़ हाई-स्पीड वाई-फ़ाई, लैपटॉप चार्जिंग पॉइंट और काम करने के लिए शांत, सुखद वातावरण उपलब्ध है।",
    detailedAnswerEn: "During morning and afternoon hours (8:00 AM – 5:00 PM), we maintain low acoustic background jazz, making it a favorite retreat for creators, founders, and readers.",
    detailedAnswerHi: "सुबह और दोपहर के समय हल्का जैज़ संगीत रहता है, जो पढ़ाई और काम के लिए एक आदर्श वातावरण प्रदान करता है।",
    category: "amenities",
  },
  {
    id: "payment-methods",
    questionEn: "What payment methods are accepted at A2 Cafe?",
    questionHi: "A2 कैफे में भुगतान के कौन-से तरीके स्वीकार किए जाते हैं?",
    shortAnswerEn: "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards (Visa, MasterCard, Amex), Apple Pay, and Cash.",
    shortAnswerHi: "हम UPI (Google Pay, PhonePe, Paytm), क्रेडिट/डेबिट कार्ड, Apple Pay और नकद सहित सभी प्रमुख भुगतान तरीके स्वीकार करते हैं।",
    detailedAnswerEn: "Contactless tap-to-pay is supported at all cashier terminals and table-side ordering docks.",
    detailedAnswerHi: "काउंटर और टेबल दोनों जगह संपर्क रहित (कॉन्टैक्टलेस) कार्ड और UPI भुगतान की सुविधा है।",
    category: "ordering",
  },
];
