/* =====================================================================
   EDIT THIS FILE to change prices, models, offers, contact details.
   Prices are in rupees (ex-showroom). price: null shows "Ask for price".
   Model prices below are from public launch listings - replace with
   your official dealer price list before going live.
   ===================================================================== */
window.SITE = {
  dealer: "Vignesh Nissan",
  whatsapp: "919787877779",            // sales WhatsApp: country code + number, no + or spaces
  serviceWhatsapp: "919787044191",     // service WhatsApp
  phones: ["+91 84899 44191", "+91 70944 41991"],
  email: "",                            // enquiry email (optional, shown in footer)
  address: "10, Vignesh Towers, East Coast Rd, Pakkamudayanpet, Lawspet, Puducherry, 605008",
  hours: { mon_sat: [9, 21], sun: [10, 20] },   // 24h clock: open, close (Puducherry showroom)
  // Showrooms shown in the Visit Us section. hours:true shows the Open now badge and timings (needs hours below).
  locations: [
    { id: "puducherry", name: "Puducherry", address: "10, Vignesh Towers, East Coast Rd, Pakkamudayanpet, Lawspet, Puducherry, 605008", phones: ["+91 70944 41991"], hours: true,
      mapLink: "https://www.google.com/maps/search/?api=1&query=Vignesh%20Nissan%2C%2010%2C%20Vignesh%20Towers%2C%20East%20Coast%20Rd%2C%20Pakkamudayanpet%2C%20Lawspet%2C%20Puducherry%2C%20605008", mapEmbed: "https://maps.google.com/maps?q=Vignesh%20Nissan%2C%2010%2C%20Vignesh%20Towers%2C%20East%20Coast%20Rd%2C%20Pakkamudayanpet%2C%20Lawspet%2C%20Puducherry%2C%20605008&z=16&output=embed" },
    { id: "villupuram", name: "Villupuram", address: "53/5, Gingee Main Road, Kamalanagar, Villupuram – 605602 (Opposite Sri Jayeandra Saraswati Vidyaalayaa School)", phones: ["+91 84899 44191"], hours: false },
    { id: "cuddalore", name: "Cuddalore", address: "8, Imperial Rd, Sellankuppam, Cuddalore, Tamil Nadu 607003", phones: ["+91 84899 44191"], hours: false }
  ],
  instagram: "https://www.instagram.com/vignesh_nissan",
  facebook: "https://www.facebook.com/VigneshNissan",
  youtube: "https://www.youtube.com/channel/UCFKA8_JgrQNEDb7luTmgn9Q",
  twitter: "https://twitter.com/VigneshMoteurx",
  linkedin: "https://www.linkedin.com/company/69943655",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Vignesh%20Nissan%2C%2010%2C%20Vignesh%20Towers%2C%20East%20Coast%20Rd%2C%20Pakkamudayanpet%2C%20Lawspet%2C%20Puducherry%2C%20605008",
  mapEmbed: "https://maps.google.com/maps?q=Vignesh%20Nissan%2C%2010%2C%20Vignesh%20Towers%2C%20East%20Coast%20Rd%2C%20Pakkamudayanpet%2C%20Lawspet%2C%20Puducherry%2C%20605008&z=16&output=embed",
  // Optional: free key from web3forms.com so enquiries also arrive by email
  web3formsKey: "",
  popupDelayMs: 3500,
  detailPopup: true,          // show the enquiry popup shortly after a car page opens
  detailPopupDelayMs: 1800
};

/* Each model: card copy, key claims, engines, dimensions and variants.
   Mileage figures are ARAI-claimed values from published sources; real-world mileage varies.
   Prices are ex-showroom (Puducherry on-road price on request). */
window.MODELS = [
  {
    id: "tekton", name: "Tekton", badge: "New Launch", type: "Midsize SUV", enabled: true,
    from: 1049000, to: 1859000,
    panel: "assets/images/panels/tekton.jpg",
    title: "All-New Nissan Tekton",
    blurb: "The premium SUV inspired by the legendary Patrol is designed to disrupt. Unmistakably.",
    priceLine: "Special Introductory Ex-Showroom Price From",
    tagline: "The unmistakable new midsize SUV.",
    specs: ["1.0L Turbo 100 PS", "1.3L GDi Turbo 163 PS", "6MT / 6-speed DCT"],
    image: "assets/images/models/tekton.png",
    photo: "assets/images/models/tekton/tekton-desert.jpg",   // used in the variants card and compare (falls back to image)
    // Slideshow used on the panel and detail page. kind "int" images zoom in and out.
    slides: [
      { src: "assets/images/panels/tekton.jpg",                  kind: "ext", label: "Tekton on the open road" },
      { src: "assets/images/models/tekton/tekton-desert.jpg",    kind: "ext", label: "Born for the dunes" },
      { src: "assets/images/models/tekton/int-dashboard.avif",   kind: "int", label: "Cockpit & infotainment" },
      { src: "assets/images/models/tekton/ext-mountain.avif",    kind: "ext", label: "Built for any terrain" },
      { src: "assets/images/models/tekton/int-sunroof.avif",     kind: "int", label: "Panoramic sunroof" },
      { src: "assets/images/models/tekton/ext-silver.avif",      kind: "ext", label: "Blade Silver" },
      { src: "assets/images/models/tekton/int-rear-seats.avif",  kind: "int", label: "Spacious rear cabin" },
      { src: "assets/images/models/tekton/ext-desert.avif",     kind: "ext", label: "Rugged stance" },
      { src: "assets/images/models/tekton/ext-side.webp",        kind: "ext", label: "Side profile" }
    ],
    claims: [["Claimed mileage", "17.8 – 19.4 km/l"], ["Max power", "163 PS"], ["Max torque", "280 Nm"], ["0–100 km/h", "9.51 s (163 PS MT)"], ["Airbags", "6 standard"]],
    engines: [
      { name: "Turbo T160 MPFI", power: "100 PS @ 5000 rpm", torque: "166 Nm @ 2000–3750 rpm", gearbox: "6-speed MT", mileage: "19.4 km/l" },
      { name: "Turbo T280 GDi", power: "163 PS @ 5250 rpm", torque: "280 Nm @ 2000–3500 rpm", gearbox: "6-speed MT", mileage: "17.8 km/l" },
      { name: "Turbo T280 GDi", power: "163 PS @ 5250 rpm", torque: "280 Nm @ 2000–3500 rpm", gearbox: "6-speed DCT (wet clutch)", mileage: "18.5 km/l" }
    ],
    dims: [],
    colors: [
      { name: "White", hex: "#f2f2f2" }, { name: "Black", hex: "#1e1e1e" }, { name: "Moon Silver", hex: "#a9aeb6" }
    ],
    // Trim prices from nissan.in (starting price of each trim). The 1.3L DCT costs more.
    variants: [
      { trim: "Visia",      engine: "1.0L Turbo (100 PS)",     gearbox: "6MT",       price: 1049000, features: "Matrix Vision LED headlamps, 40+ safety features, 6 airbags, R17 wheels" },
      { trim: "Visia+",     engine: "1.0L Turbo (100 PS)",     gearbox: "6MT",       price: 1114000, features: "9-inch infotainment, wireless Android Auto & Apple CarPlay" },
      { trim: "Acenta",     engine: "1.0L Turbo / 1.3L GDi",   gearbox: "6MT",       price: 1179000, features: "10.1-inch Tek-Link HD infotainment, rear split seat, cruise control" },
      { trim: "N-Connecta", engine: "1.0L Turbo / 1.3L GDi",   gearbox: "6MT / DCT", price: 1369000, features: "Electric panoramic sunroof, R18 alloys, dual-zone climate control" },
      { trim: "Tekna",      engine: "1.3L GDi Turbo (163 PS)", gearbox: "6MT / DCT", price: 1539000, features: "Ventilated seats, powered driver seat, ADAS, ambient lighting" },
      { trim: "Tekna+",     engine: "1.3L GDi Turbo (163 PS)", gearbox: "6MT / DCT", price: 1649000, features: "Google built-in (55+ connectivity features), 3D around-view monitor, powered tailgate" }
    ]
  },
  {
    id: "gravite", name: "Gravite", badge: "7-Seater", type: "Family MPV", enabled: true,
    from: 573400, to: null,
    panel: "assets/images/panels/gravite.jpg",
    title: "All-New Nissan Gravite",
    blurb: "Inspired by 1.4 billion Indians, a new class of togetherness has arrived.",
    priceLine: "Ex-Showroom Price From",
    tagline: "Room for the whole family.",
    specs: ["1.0L NA 72 PS", "5MT / EZ-Shift AMT", "3-row 7 seater"],
    image: "assets/images/models/gravite.png",
    claims: [["Claimed mileage", "19.3 – 19.6 km/l"], ["Max power", "72 PS"], ["Max torque", "96 Nm"], ["Seating", "7 seats"], ["Boot space", "320 L"], ["Ground clearance", "182 mm"]],
    engines: [
      { name: "1.0L NA petrol (B4D, 999 cc)", power: "72 PS @ 6250 rpm", torque: "96 Nm @ 3400–3600 rpm", gearbox: "5-speed MT / EZ-Shift AMT", mileage: "19.3 – 19.6 km/l" }
    ],
    dims: [],
    priceNote: "Trim prices are from the launch price list. Ask us for today's price.",
    colors: [{ name: "Colour 1", hex: "#f2f2f2" }, { name: "Colour 2", hex: "#8a8f98" }, { name: "Colour 3", hex: "#1e1e1e" }, { name: "Green", hex: "#3d5a48" }],
    variants: [
      { trim: "Visia",      engine: "1.0L NA (72 PS)", gearbox: "5MT",       price: 573400, features: "6 airbags, ESP, hill start assist, tyre pressure monitor, 50:50 folding rear seat" },
      { trim: "Acenta",     engine: "1.0L NA (72 PS)", gearbox: "5MT",       price: 659000, features: "Wireless Android Auto & Apple CarPlay, steering-mounted controls, independent rear AC" },
      { trim: "N-Connecta", engine: "1.0L NA (72 PS)", gearbox: "5MT / AMT", price: 720000, features: "Higher-trim comfort and tech, rear camera, LED lighting (AMT from ₹7.80 L)" },
      { trim: "Tekna",      engine: "1.0L NA (72 PS)", gearbox: "5MT / AMT", price: 791000, features: "Top-trim features, digital cluster, push start/stop (AMT from ₹8.49 L)" },
      { trim: "Tekna +",    engine: "1.0L NA (72 PS)", gearbox: "5MT / AMT", price: 836000, features: "Limited launch edition of the Tekna (AMT from ₹8.94 L)" }
    ]
  },
  {
    id: "magnite", name: "Magnite", badge: "Best Seller", type: "Compact SUV", enabled: true,
    from: 568000, to: null,
    panel: "assets/images/panels/magnite.jpg",
    title: "Nissan Magnite",
    blurb: "With 20+ first-in-segment and best-in-segment features.",
    priceLine: "Ex-Showroom Price From",
    tagline: "Big, bold, beautiful.",
    specs: ["1.0L NA 72 PS", "1.0L Turbo 100 PS", "MT / AMT / CVT"],
    image: "assets/images/models/magnite.png",
    claims: [["Claimed mileage", "Up to 19.9 km/l"], ["Max power", "99 bhp (Turbo)"], ["Max torque", "Up to 160 Nm"], ["Boot space", "336 L"], ["Ground clearance", "205 mm"], ["Airbags", "6 standard"]],
    engines: [
      { name: "1.0L NA petrol", power: "72 PS (71 bhp)", torque: "96 Nm", gearbox: "5-speed MT / AMT", mileage: "19.4 – 19.9 km/l" },
      { name: "1.0L Turbo petrol", power: "100 PS (99 bhp)", torque: "160 Nm (MT) / 152 Nm (CVT)", gearbox: "5-speed MT / CVT", mileage: "17.9 km/l (CVT); ask us for MT" }
    ],
    dims: [["Length", "3,994 mm"], ["Width", "1,758 mm"], ["Height", "1,572 mm"], ["Wheelbase", "2,500 mm"], ["Ground clearance", "205 mm"], ["Boot space", "336 L (up to 690 L, seats folded)"]],
    colors: [
      { name: "Flare Garnet Red", hex: "#bf2327" }, { name: "Pearl White", hex: "#f2f2f2" },
      { name: "Onyx Black", hex: "#1e1e1e" }, { name: "Sapphire Blue", hex: "#2f5d9e" },
      { name: "Storm White / Grey", hex: "#8a8f98" }
    ],
    // Trim prices from nissan.in (starting price of each trim; turbo/CVT cost more)
    variants: [
      { trim: "Visia",      engine: "1.0L NA (72 PS)",   gearbox: "MT",             price: 568000, features: "R16 wheels, 6 airbags, 60:40 rear seat split with armrest" },
      { trim: "Visia+",     engine: "1.0L NA (72 PS)",   gearbox: "MT",             price: 622000, features: "22.86 cm touchscreen, rear wiper & defogger" },
      { trim: "Acenta",     engine: "1.0L NA (72 PS)",   gearbox: "MT / AMT",       price: 683000, features: "Steering controls, electric ORVM, auto climate control" },
      { trim: "N-Connecta", engine: "1.0L NA / Turbo",   gearbox: "MT / AMT / CVT", price: 746000, features: "17.78 cm digital cluster, 20.32 cm WiFi touchscreen, push-button start, diamond-cut alloys" },
      { trim: "Tekna",      engine: "1.0L NA / Turbo",   gearbox: "MT / AMT / CVT", price: 839000, features: "LED projector headlamps, 360° camera, leather accents" },
      { trim: "Tekna+",     engine: "1.0L NA / Turbo",   gearbox: "MT / AMT / CVT", price: 872000, features: "Quilted leather seats, ambient lighting, leather-trimmed cabin" }
    ]
  },
  {
    id: "xtrail", name: "X-Trail", badge: "Premium", type: "Premium SUV", enabled: false,   // set enabled: true if you sell it
    from: 4992000, to: null,
    panel: "assets/images/panels/xtrail.jpg",
    title: "Nissan X-Trail",
    blurb: "The flagship 7-seater adventurer.",
    priceLine: "Ex-Showroom Price From",
    tagline: "The flagship 7-seater adventurer.",
    specs: ["Premium 7-seater SUV"],
    image: "assets/images/models/xtrail.png",
    claims: [], engines: [], dims: [],
    colors: [{ name: "Colour 1", hex: "#f2f2f2" }, { name: "Colour 2", hex: "#1e1e1e" }],
    variants: [{ trim: "X-Trail", engine: "Petrol", gearbox: "Automatic", price: 4992000, features: "" }]
  }
];

// Leave `ends` empty for no countdown, or set e.g. "2026-10-31".
window.OFFERS = [
  { title: "This Month's Offers", text: "Call or WhatsApp us for the latest benefits on Tekton, Magnite and Gravite.", ends: "" },
  { title: "Exchange Your Old Car", text: "Get the best value for your current car with a free evaluation at our showroom.", ends: "" },
  { title: "Easy Finance", text: "Quick loan approvals with leading banks. Check your EMI instantly below.", ends: "" }
];

window.TESTIMONIALS = [
  { name: "Joseph Christopher", car: "Magnite AMT", photo: "assets/images/people/joseph.png",
    text: "The experience of purchasing a Magnite AMT from Vignesh Nissan was amazing. Magnite absolutely fits into my purchase budget and has all of the characteristics that I had hoped for." },
  { name: "Christy", car: "Magnite", photo: "assets/images/people/christy.png",
    text: "Magnite car purchase experience with Vignesh Nissan was fantastic. The sales person was quick to respond to all of my questions." }
];
