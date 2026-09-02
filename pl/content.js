/*
  Mountain Safari — content data (Polish / pl)
  Key-for-key clone of content.js with all string VALUES translated to Polish.
  Deployed as /pl/content.js by scripts/build-tour-pages.mjs; the /pl/ pages load
  this file instead of /content.js. Keep every key identical to content.js —
  main.js and assets/tour.js read the same structure for both languages.

  DRAFT-TRANSLATION FLAG: translated by Claude (AI) as a precise, direct
  translation of the Slovak copy — MUST be reviewed by a native Polish speaker
  before the Polish campaign launches. Notes:
  - Peaks use Polish exonyms (Gierlach, Łomnica, Lodowy Szczyt, Wysoka);
    Slovak villages/huts keep official names (people navigate there).
  - Phone numbers stay Slovak (+421 …) — the guides' real numbers.
  - faqSection.moreLinkHref and tour link: fields still point to the Slovak
    mountainsafari.sk pages — no Polish equivalents exist yet (open item).
  - SYNC: any future edit to content.js must be mirrored here.
*/
window.MS_CONTENT = {
  meta: {
    lang: "pl",
    siteTitle: "Mountain Safari — Przewodnicy wysokogórscy Tatry Wysokie",
    metaDescription: "Licencjonowani przewodnicy wysokogórscy IVBV/UIAGM/IFMGA w Tatrach Wysokich. Prywatne wejścia szyte na miarę — od łatwych wypraw po wymagające szczyty.",
  },

  nav: {
    logoText: "Mountain Safari",
    links: [
      { label: "Wyprawy", href: "#tours" },
      { label: "O nas", href: "#about" },
      { label: "Proces", href: "#process" },
      { label: "Opinie", href: "#testimonials" },
      { label: "Galeria", href: "#gallery" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Zarezerwuj",
    phone: "+421903624085",
    phoneDisplay: "+421 903 624 085",
    phoneDisplayShort: "0903 624 085",
    phoneAriaLabel: "Zadzwoń do nas",
  },

  hero: {
    bgImage: "brand_assets/Background.webp",
    bgImageAlt: "Panorama ośnieżonej tatrzańskiej grani o świcie",
    badgeImage: "brand_assets/ivbv-ifmga-uiagm.webp",
    badgeImageAlt: "IVBV/UIAGM/IFMGA — certyfikat przewodnika wysokogórskiego",
    eyebrow: "Tatry Wysokie — przeżycie na całe życie",
    heading: "Przygoda, którą będziesz wspominać przez całe życie.",
    subheading: "Przewodnicy wysokogórscy IVBV/UIAGM/IFMGA — Tatry Wysokie i Alpy",
    ctaLabel: "Wybierz swój szczyt",
    ctaHref: "#tours",
    ctaSecondaryLabel: "Mam pytanie",
  },

  about: {
    eyebrow: "Kto się Tobą zaopiekuje?",
    heading: "Kto się Tobą zaopiekuje?",
    paragraph: [
      "Nazywamy się Anton Sedlák i Štefan Krasňan.",
      "Jesteśmy dwoma przewodnikami wysokogórskimi z międzynarodową licencją **IVBV/UIAGM/IFMGA** — mamy za sobą setki udanych wejść w Tatrach Wysokich i w Alpach.",
      "Tempo i trasę zawsze dopasowujemy do Ciebie, tak aby wejście było nie tylko wykonalne, ale i przyjemne.",
      "Jeśli warunki w dniu wejścia są niekorzystne, bez problemu **przełożymy Twój termin** albo **zwrócimy Ci pieniądze**.",
      "Twoje przeżycie z drogi na szczyt jest dla nas priorytetem — zrobimy wszystko, żebyś przekroczył swoje granice w najbezpieczniejszy możliwy sposób.",
      "Nie masz pewności, czy dasz radę na swojej wyprawie?",
      "**Zadzwoń do nas.**",
    ],
    ctaPrimaryLabel: "Zadzwoń do nas",
    ctaSecondaryLabel: "Napisz do nas",
    photoAnton: "brand_assets/Anton.webp",
    photoAntonAlt: "Anton Sedlák, przewodnik wysokogórski IVBV/UIAGM/IFMGA",
    photoStefan: "brand_assets/stefan-krasnan.webp",
    photoStefanAlt: "Štefan Krasňan, przewodnik wysokogórski IVBV/UIAGM/IFMGA",
    nameAnton: "Anton",
    nameStefan: "Štefan",
  },

  toursSection: {
    eyebrow: "Wybór wyprawy",
    heading: "Który szczyt jest Twoim marzeniem?",
    difficultyLabel: "Trudność:",
    priceFromLabel: "Od",
    priceOnRequestLabel: "Cena na zapytanie",
    guideRatioPrefix: "Maks.",
    guideRatioSuffix: "na przewodnika",
    guideRatioUnit: { one: "osoba", few: "osoby", many: "osób" },
    ctaLabel: "Więcej info",
    ctaReserveLabel: "Zarezerwuj",
    callCtaLabel: "Zadzwoń do nas",
    showAllLabel: "Pokaż wszystkie {count} wypraw",
    showLessLabel: "Pokaż mniej",
  },

  seasonToggle: {
    heading: "Który szczyt jest Twoim marzeniem?",
    options: [
      { id: "leto", label: "Wyprawy letnie" },
      { id: "zima", label: "Wyprawy zimowe" },
    ],
    defaultSeason: "leto",
    regionLabels: { tatry: "Tatry Wysokie", alpy: "Alpy", svet: "Świat" },
    emptyState: "Brak wypraw w tej kategorii.",
    liveAnnounceTemplate: "Wyświetlono: {season} — {count} wypraw",
  },

  tours: [
    /* ===== LATO — Tatry Wysokie (show all) ===== */
    {
      id: "gerlach",
      slug: "gerlachovsky-stit",
      name: "Gierlach (Gerlachovský štít)",
      location: "2655 m n.p.m.",
      duration: "1 dzień",
      difficulty: 3,
      priceFrom: 430,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      featured: true,
      image: "brand_assets/Gerlachovský.webp",
      imageAlt: "Wejście na Gierlach, najwyższy szczyt Słowacji i całych Tatr",
      description: "Wejście prowadzi od schroniska Sliezsky dom przez Dolinę Wielicką i eksponowaną, ubezpieczoną liną Wielicką Próbę. Ze szczytu otwiera się widok na całe Tatry, jakiego z dołu nigdy nie zobaczysz.",
      link: "https://www.mountainsafari.sk/kurzy/gerlachovsky-stit/",
      meetingPoint: "Tatranská Polianka, Tatry Wysokie (Słowacja)",
      meetingTime: "ok. 4:00 – 7:30 (w zależności od sezonu i pogody)",
      pricingDetail: [
        { label: "1 osoba", price: 430, unit: "€" },
        { label: "2 osoby", price: 450, unit: "€ (225 €/os.)" },
        { label: "3 osoby", price: 500, unit: "€ (167 €/os.)" },
      ],
      winterPricingDetail: [
        { label: "1 osoba", price: 450, unit: "€" },
        { label: "2 osoby", price: 500, unit: "€ (250 €/os.)" },
      ],
      routes: [
        { name: "Droga klasyczna", duration: "8 h", maxGroup: 3 },
        { name: "Tatarkova ferrata", duration: "9 h", maxGroup: 2 },
        { name: "Martinova cesta", duration: "10–12 h", maxGroup: 2 },
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA wraz z jego kosztami",
        "Wypożyczenie sprzętu (uprząż, kask, czekan, raki)",
      ],
      excluded: [
        "Transport Tatranská Polianka – Sliezsky dom i z powrotem: 20 €/os.",
      ],
    },
    {
      id: "lomnicky",
      slug: "lomnicky-stit",
      name: "Łomnica (Lomnický štít)",
      location: "2634 m n.p.m.",
      duration: "1 dzień",
      difficulty: 2,
      priceFrom: 390,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      image: "brand_assets/lomnicky-stit-leto.webp",
      imageAlt: "Letnie wejście na Łomnicę w Tatrach Wysokich",
      description: "Jeden z najwyższych i najbardziej ikonicznych szczytów Słowacji. Wejście na Łomnicę prowadzi dzikim, wysokogórskim terenem, poza znakowanymi szlakami turystycznymi, przez skalne pasaże i eksponowane odcinki ubezpieczone liną. Nagrodą jest szczyt na wysokości 2 634 m i wyjątkowy widok na Tatry Wysokie, Tatry Bielskie oraz daleko w głąb Słowacji i Polski.",
      meetingPoint: "Tatranská Lomnica, Tatry Wysokie (Słowacja)",
      meetingTime: "8:00",
      pricingDetail: [
        { label: "1 osoba", price: 390, unit: "€" },
        { label: "2 osoby", price: 430, unit: "€ (215 €/os.)" },
        { label: "3 osoby", price: 450, unit: "€ (150 €/os.)" },
      ],
      longDescription: [
        "Te wejścia prowadzą wyłącznie licencjonowani przewodnicy wysokogórscy (IVBV/UIAGM/IFMGA), którzy doskonale znają teren, pogodę i aktualne warunki. Cały dzień poświęcamy jednej grupie — tempo i konkretną drogę dopasujemy do Twojego doświadczenia, kondycji i warunków w górach.",
        "Bezpieczeństwo jest u nas na pierwszym miejscu. Przed wejściem wspólnie omawiamy plan, technikę i potrzebny sprzęt, a w trudnych pasażach jesteś asekurowany liną i pod stałym nadzorem przewodnika. Celem nie jest samo stanięcie na szczycie Łomnicy — ale przeżycie Tatr z perspektywy, której ze szlaku turystycznego nigdy nie zobaczysz.",
      ],
      routes: [
        { name: "Droga klasyczna", duration: "6 h", maxGroup: 3 },
        { name: "Żleb Térego", duration: "7 h", maxGroup: 2 },
        { name: "Miedziane Ławki", duration: "8 h", maxGroup: 2 },
        { name: "Grań Birkenmajera", duration: "6 h", maxGroup: 2 },
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA wraz z jego kosztami",
        "Wypożyczenie sprzętu (uprząż, kask, czekan, raki)",
      ],
      excluded: [
        "Transport Tatranská Lomnica – Lomnické sedlo i z powrotem: ok. 40 €/os. (www.vt.sk)",
      ],
    },
    {
      id: "ladovy",
      slug: "ladovy-stit",
      name: "Lodowy Szczyt",
      location: "2627 m n.p.m.",
      duration: "1 dzień",
      difficulty: 3,
      priceFrom: 430,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      image: "brand_assets/ladovy-stit-leto.webp",
      imageAlt: "Wejście na Lodowy Szczyt, trzeci najwyższy szczyt Słowacji",
      description: "Trzeci najwyższy szczyt Słowacji i jeden z najpotężniejszych szczytów tatrzańskich. Wejście na Lodowy Szczyt (2 627 m) prowadzi przepięknym, wysokogórskim otoczeniem Doliny Małej Zimnej Wody, obok Téryho chaty, a dalej poza znakowanymi szlakami przez strome skalne i eksponowane granie. Ze szczytu otwiera się fantastyczny widok na najwyższe szczyty Tatr Wysokich i okoliczne doliny.",
      meetingPoint: "Hrebienok albo Téryho chata (Słowacja)",
      meetingTime: "Hrebienok 4:00 – 6:00, Téryho chata 7:00 – 8:00",
      pricingDetail: [
        { label: "1 osoba", price: 430, unit: "€" },
        { label: "2 osoby", price: 470, unit: "€ (235 €/os.)" },
        { label: "3 osoby", price: 500, unit: "€ (167 €/os.)" },
      ],
      longDescription: [
        "Te wejścia prowadzą wyłącznie licencjonowani przewodnicy wysokogórscy (IVBV/UIAGM/IFMGA), którzy doskonale znają teren, pogodę i aktualne warunki. Cały dzień poświęcamy jednej grupie — tempo i przebieg wejścia dopasujemy do Twojego doświadczenia, kondycji i warunków w górach.",
        "Bezpieczeństwo jest u nas na pierwszym miejscu. Przed wejściem wspólnie omawiamy plan, technikę i potrzebny sprzęt, a w eksponowanych pasażach jesteś asekurowany liną i pod stałym nadzorem przewodnika. Lodowy Szczyt to nie kolejny wierzchołek — to solidny dzień w wysokich górach, w samym sercu Tatr, i przeżycie, którego się nie zapomina.",
      ],
      routes: [
        { name: "Droga przez Lodowego Konia", duration: "6 h", maxGroup: 3 },
        { name: "Grań Lodowych Szczytów", duration: "7 h", maxGroup: 2 },
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA wraz z jego kosztami",
        "Wypożyczenie sprzętu (uprząż, kask, czekan, raki)",
      ],
    },
    {
      id: "vysoka",
      slug: "vysoka",
      name: "Wysoka",
      location: "2547 m n.p.m.",
      duration: "1 dzień",
      difficulty: 3,
      priceFrom: 430,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      image: "brand_assets/vysoka-leto.webp",
      imageAlt: "Wejście na Wysoką w Tatrach Wysokich",
      description: "Jeden z najpiękniejszych i najbardziej charakterystycznych szczytów Tatr Wysokich. Wysoka (2 547 m) ze swoim typowym dwuwierzchołkiem należy do tatrzańskiej klasyki. Wejście prowadzi przez Dolinę Mięguszowiecką, obok Popradzkiego Stawu, a dalej dzikim, wysokogórskim terenem poza znakowanymi szlakami. Końcowe skalne i eksponowane pasaże pokonasz z asekuracją liną.",
      meetingPoint: "Popradské pleso (Popradzki Staw), Słowacja",
      meetingTime: "4:00 – 6:00",
      pricingDetail: [
        { label: "1 osoba", price: 430, unit: "€" },
        { label: "2 osoby", price: 470, unit: "€ (235 €/os.)" },
        { label: "3 osoby", price: 500, unit: "€ (167 €/os.)" },
      ],
      longDescription: [
        "Ze szczytu otwiera się przepiękny widok na Gierlach, Rysy, Końcystą oraz okoliczne doliny tatrzańskie.",
        "Te wejścia prowadzą wyłącznie licencjonowani przewodnicy wysokogórscy (IVBV/UIAGM/IFMGA), którzy doskonale znają teren, pogodę i aktualne warunki. Cały dzień poświęcamy jednej grupie — tempo i drogę dopasujemy do Twojego doświadczenia, kondycji i warunków w górach.",
        "Bezpieczeństwo jest u nas na pierwszym miejscu. Przed wejściem wspólnie omawiamy plan, technikę i potrzebny sprzęt, a w trudniejszych pasażach jesteś asekurowany liną i pod nadzorem przewodnika. Wysoka oferuje dokładnie to, co człowiek wyobraża sobie pod hasłem prawdziwej tatrzańskiej przygody — długi górski dzień, wspinaczkę, ekspozycję i szczyt, na który droga prowadzi z dala od szlaków turystycznych.",
      ],
      routes: [
        { name: "Droga klasyczna", duration: "8 h", maxGroup: 3 },
        { name: "Korona Wysokiej", duration: "10 h", maxGroup: 2 },
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA wraz z jego kosztami",
        "Wypożyczenie sprzętu (uprząż, kask, czekan, raki)",
      ],
      excluded: [
        "Transport przystanek TEŽ Popradské pleso – Hotel Popradské pleso: 10 €/os.",
      ],
    },

    /* ===== LATO — Alpy ===== */
    {
      id: "montblanc",
      slug: "mont-blanc",
      name: "Mont Blanc",
      location: "4808 m n.p.m.",
      duration: "5 dni",
      difficulty: 3,
      priceFrom: 1700,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Mont blanc.webp",
      imageAlt: "Wejście na Mont Blanc, najwyższy szczyt Alp",
      description: "Dołącz do nas na niezapomnianą przygodę na szczyt Mont Blanc – legendarny „dach Europy”. W towarzystwie doświadczonego, certyfikowanego przewodnika wysokogórskiego bezpiecznie i pewnie przejdziesz przez lodowce, skaliste granie i zapierającą dech w piersiach alpejską scenerię.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-mont-blanc-4808m/",
      meetingPoint: "Chamonix / Nid d'Aigle, Francja",
      pricingDetail: [
        { label: "Wejście dwudniowe, 2 osoby", price: 1700, unit: "€" },
        { label: "Wycieczka aklimatyzacyjna (Francja)", price: 600, unit: "€/dzień" },
        { label: "Wycieczka aklimatyzacyjna (Szwajcaria)", price: 800, unit: "€/dzień" },
      ],
      pricingNote: "Program bywa podawany także jako „od 2 900 €” za cały 5-dniowy program wraz z aklimatyzacją.",
      requirements: [
        "Pewne poruszanie się w trudnym, eksponowanym terenie",
        "Pewne posługiwanie się rakami i czekanem na lodzie i firnie",
        "Wspinaczka o trudności II (UIAA)",
        "Doskonała kondycja fizyczna",
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA",
        "Wypożyczenie sprzętu (czekan, raki)",
      ],
      excluded: [
        "Noclegi i wyżywienie w schroniskach, przejazdy kolejkami",
      ],
    },
    {
      id: "monterosa",
      slug: "monte-rosa",
      name: "Monte Rosa",
      location: "4634 m n.p.m.",
      duration: "3 dni",
      difficulty: 4,
      priceFrom: 950,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/monte-rosa-leto.webp",
      imageAlt: "Wejście na Dufourspitze w masywie Monte Rosa",
      description: "Najwyższy masyw górski Szwajcarii i jedna z największych wysokogórskich przygód w Alpach. Celem jest Dufourspitze (4 634 m) — najwyższy wierzchołek masywu Monte Rosa i drugi najwyższy szczyt Alp. Wejście prowadzi światem lodowców, ogromnych śnieżnych połaci i wysokich czterotysięczników, z panoramą Matterhornu i znacznej części Alp Zachodnich.",
      meetingPoint: "Zermatt, Szwajcaria",
      pricingDetail: [
        { label: "1 osoba", price: 1700, unit: "€" },
        { label: "2 osoby", price: 950, unit: "€/os. (razem 1900 €)" },
      ],
      longDescription: [
        "W odróżnieniu od jednodniowych wejść tatrzańskich Monte Rosa to prawdziwa wyprawa wysokogórska. Wejście poprzedza aklimatyzacja i noc w schronisku. Sam dzień szczytowy zaczyna się jeszcze przed świtem i prowadzi przez rozległy lodowiec aż do końcowej, eksponowanej grani Dufourspitze, gdzie łączy się poruszanie w rakach, asekurację liną i łatwą wspinaczkę skalną.",
        "Wejście prowadzą licencjonowani przewodnicy wysokogórscy IVBV/UIAGM/IFMGA. Przez całą wyprawę jesteś związany liną, a przewodnik decyduje o drodze w zależności od aktualnych warunków na lodowcu, pogody i Twojej kondycji. Tempo i program dopasujemy tak, abyś miał jak najlepszą szansę bezpiecznie osiągnąć szczyt.",
        "Monte Rosa to nie tylko wysokość 4 634 metrów. To pierwszy krok w świat wielkich wejść alpejskich — lodowce, świt na wysokości 4 000 metrów i uczucie stania w jednym z najwyższych miejsc Europy.",
      ],
      requirements: [
        "Pewne poruszanie się w trudnym, eksponowanym terenie",
        "Pewne posługiwanie się rakami i czekanem na lodzie i firnie",
        "Wspinaczka o trudności II (UIAA)",
        "Doskonała kondycja fizyczna",
      ],
    },

    {
      id: "ortler",
      slug: "ortler-hintergrat",
      name: "Ortler - Hintergrat",
      location: "3905 m n.p.m.",
      duration: "2 dni",
      difficulty: 4,
      priceFrom: 500,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Ortler - HINTERGRAT.webp",
      imageAlt: "Wejście na Ortler granią Hintergrat",
      description: "Najwyższy szczyt Południowego Tyrolu, majestatyczny lodowo-skalny kolos owiany starą legendą. Dwudniowe wejście prowadzi legendarną granią Hintergrat, jedną z klasyk Alp Wschodnich, ze zmieniającym się firnem i skałą. Wielka wyprawa dla doświadczonych, której się nie zapomina.",
      link: "https://www.mountainsafari.sk/kurzy/ortler-hintergtat/",
      meetingPoint: "Schronisko Hintergrathütte (parking Langenstein, ok. 1 h podejścia szlakiem nr 3)",
      meetingTime: "Przyjście do schroniska najpóźniej do 17:30",
      pricingDetail: [
        { label: "1 osoba", price: 1000, unit: "€" },
        { label: "2 osoby", price: 500, unit: "€/os. (łącznie 1000 €)" },
      ],
      longDescription: [
        "Pierwszego dnia po południu docierasz do schroniska Hintergrathütte, gdzie się zakwaterujesz, przygotujesz sprzęt i zjesz wspólną kolację. Drugiego dnia śniadanie o 3:30, a o 4:00 wyruszasz na szczyt.",
        "Wejście prowadzi legendarną granią Hintergrat (4–5 godzin), zejście drogą normalną (Normalweg) przez schronisko Payerhütte i dalej do Sulden (ok. 2,5 h). Cały dzień to nawet 12 godzin aktywności w środowisku wysokogórskim.",
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA wraz z jego kosztami",
        "Wypożyczenie sprzętu (czekan, raki)",
      ],
      requirements: [
        "Przewyższenie do 1200 m w 6 godzin, łącznie około 2000 m",
        "Odporność na ekspozycję (skała, lód)",
        "Wspinaczka o trudności III (UIAA)",
        "Pewne posługiwanie się rakami i czekanem",
      ],
    },

    /* ===== ZIMA — Tatry Wysokie (show all) ===== */
    {
      id: "zimny-lomnicky-stit",
      slug: "zimny-lomnicky-stit",
      name: "Łomnica zimą (Lomnický štít)",
      location: "2634 m n.p.m.",
      duration: "1 dzień",
      difficulty: 3,
      priceFrom: 370,
      currency: "€",
      season: "zima",
      region: "tatry",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Lomnický.webp",
      imageAlt: "Zimowe wejście na Łomnicę w Tatrach Wysokich",
      description: "Zimowe wejście na drugi najwyższy szczyt Tatr Wysokich. Droga klasyczna, droga Birkenmajera albo żleb Téryego — również tymi drogami możesz zimą wejść na Łomnicę.",
      link: "https://www.mountainsafari.sk/kurzy/zimny-lomnicak-2-634m/",
      pricingDetail: [
        { label: "1 osoba", price: 370, unit: "€" },
        { label: "2 osoby", price: 420, unit: "€" },
      ],
      meetingPoint: "Infocentrum ośrodka narciarskiego Tatranská Lomnica lub Starý Smokovec – Hrebienok (w zależności od trasy); indywidualnie możliwy także start od schronisk Skalnatá chata lub Zamkovského chata. Na przełęcz Lomnické sedlo kursuje też kolejka z Tatranskiej Lomnicy.",
      meetingTime: "8:00",
      routes: [
        { name: "Droga klasyczna z przełęczy Lomnické sedlo" },
        { name: "Droga Birkenmajera" },
        { name: "Żleb Téryego i droga Jordána" },
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem IVBV/UIAGM/IFMGA wraz z jego kosztami",
        "Wypożyczenie sprzętu wspinaczkowego (kask, raki, czekan, uprząż)",
        "Wypożyczenie sprzętu lawinowego (detektor, łopata, sonda)",
      ],
      note: "Przy dobrych warunkach śniegowych możliwa jest łączona wyprawa skiturowo-wspinaczkowa z podejściem z doliny Skalnatá dolina lub Malá Studená dolina i zjazdem na nartach różnymi wariantami, dopasowanymi do poziomu i umiejętności narciarskich.",
    },
  ],

  process: {
    eyebrow: "Jak to przebiega",
    heading: "Jak to przebiega?",
    steps: [
      { number: 1, title: "Wybierz swój szczyt", description: "Wybierz wymarzony szczyt i napisz do nas przez formularz albo zadzwoń.", icon: "icon-pin" },
      { number: 2, title: "Konsultacja", description: "Wspólnie omówimy Twoje doświadczenie i kondycję. Ustalimy termin i doradzimy, czego będziesz potrzebować.", icon: "icon-mail" },
      { number: 3, title: "Jesteśmy w stałym kontakcie", description: "Aż do dnia wejścia odpowiadamy na Twoje pytania i śledzimy warunki.", icon: "icon-route" },
      { number: 4, title: "Wyprawa", description: "Spotykamy się w umówionym miejscu i ruszamy.", icon: "icon-clock" },
    ],
    ctaLabel: "Zarezerwuj termin",
  },

  testimonialsSection: {
    heading: "Słowa naszych klientów",
    ctaLabel: "Zarezerwuj",
    // PLACEHOLDER — mirrors the Slovak draft quotes; real quotes pending.
    items: [
      {
        id: "t1",
        quote: "[Najlepsze przeżycie w górach, jakie kiedykolwiek mieliśmy.]",
        name: "Andrea",
        wistiaId: "76mzm8drx9",
        avatarImage: "https://placehold.co/120x120/1a2234/7b96c9?text=Foto",
      },
      {
        id: "t2",
        quote: "[Czuliśmy się bezpiecznie od pierwszej minuty.]",
        name: "Marek",
        wistiaId: "9i0tnerz8t",
        avatarImage: "https://placehold.co/120x120/1a2234/7b96c9?text=Foto",
      },
      {
        id: "t3",
        quote: "[Profesjonalizm i ludzkie podejście jednocześnie.]",
        name: "Miška",
        wistiaId: "lzcq83z32w",
        avatarImage: "https://placehold.co/120x120/1a2234/7b96c9?text=Foto",
      },
    ],
  },

  gallerySection: {
    eyebrow: "Chwile z gór",
    heading: "Przeżycia na całe życie",
    bgImage: "brand_assets/Background.webp",
    bgImageAlt: "",
    ctaLabel: "Zarezerwuj",
    images: [
      { src: "brand_assets/Gallery 1.webp", alt: "[Fotografia z wyprawy 1]" },
      { src: "brand_assets/Gallery2.webp", alt: "[Fotografia z wyprawy 2]" },
      { src: "brand_assets/GALLERY3.webp", alt: "[Fotografia z wyprawy 3]" },
      { src: "brand_assets/Gallery4.webp", alt: "[Fotografia z wyprawy 4]" },
      { src: "brand_assets/gallery5.webp", alt: "[Fotografia z wyprawy 5]" },
      { src: "brand_assets/Gallery6.webp", alt: "[Fotografia z wyprawy 6]" },
    ],
  },

  faqSection: {
    heading: "Częste pytania",
    morePrompt: "Nie znajdujesz odpowiedzi na swoje pytanie?",
    moreLinkLabel: "Zobacz wszystkie częste pytania",
    // OPEN ITEM — points to the Slovak FAQ page; no Polish equivalent exists yet.
    moreLinkHref: "https://www.mountainsafari.sk/faq/",
    items: [
      { question: "Co dokładnie jest w cenie?", answer: "W cenie jest przewodnik wysokogórski z licencją IVBV/UIAGM/IFMGA — jego prowadzenie i asekuracja podczas całego wejścia, ocena warunków i zaplanowanie wyprawy. Specjalistyczny sprzęt w razie potrzeby Ci wypożyczymy, wystarczy dać znać wcześniej. O pozostałych kosztach, takich jak nocleg w schronisku czy parking, zawsze mówimy z góry, żebyś miał pełny obraz jeszcze przed rezerwacją." },
      { question: "Jakiej kondycji potrzebuję?", answer: "Wyprawę dobieramy do Twojej kondycji i doświadczenia, nie odwrotnie. Przed wejściem zapytamy Cię o kilka rzeczy i polecimy szczyt, który zdobędziesz. Od łatwiejszych wypraw dla zupełnie początkujących po wymagające wejścia. Tempo dopasowujemy do Ciebie, nikogo nie poganiamy i nikt nie zostaje z tyłu. Wielu naszych klientów zdobyło swój pierwszy szczyt bez żadnego doświadczenia z liną." },
      { question: "Co jeśli w dniu wejścia zepsuje się pogoda?", answer: "Jeśli warunki nie są odpowiednie, nigdzie Cię nie ciągniemy. Zwrócimy Ci pieniądze w pełnej wysokości albo — jeśli chcesz — umówimy termin zastępczy. Decyzja należy do Ciebie." },
      { question: "Jadę sam. Czy to problem?", answer: "Absolutnie nie, wielu klientów przyjeżdża bez ekipy. Chodzimy w małych grupach i uważamy na każdego. A jeśli chcesz prywatne wejście tylko dla siebie albo swoich bliskich, też to zorganizujemy." },
      // PLACEHOLDER — mirrors the Slovak draft; real insurance policy pending confirmation.
      { question: "Czy ubezpieczenie jest w cenie?", answer: "Ubezpieczenie nie jest automatycznie częścią ceny — przed wejściem doradzimy Ci, jakie ubezpieczenie wykupić, a w razie potrzeby pomożemy je załatwić." },
      { question: "Kiedy można iść?", answer: "Wyprawy letnie organizujemy mniej więcej od czerwca do października, zimowe od grudnia do kwietnia. Dokładny termin ustalimy telefonicznie albo przez formularz — zwykle w ciągu 24 godzin." },
    ],
  },

  finalCta: {
    line1: "Jeśli chcesz przekroczyć swoje granice i przeżyć coś na całe życie…",
    line2: "Zarezerwuj drogę na szczyt z przewodnikiem wysokogórskim, któremu możesz zaufać.",
    ctaLabel: "Zarezerwuj drogę na szczyt",
    cutoutImage: "brand_assets/Gallery6.webp",
    cutoutAlt: "Anton Sedlák i Štefan Krasňan podczas wejścia w górach",
    trustHeading: "Z kim współpracujemy",
    // IVBV/UIAGM/IFMGA sem nepatrí — je to kvalifikácia vodcov, nie partner.
    // Žije ako trust badge v hero sekcii.
    partnerLogos: [
      { src: "brand_assets/Partner 2.webp", alt: "Fjällräven" },
      { src: "brand_assets/SKIBA Partner.jpg", alt: "SKIBA" },
    ],
  },

  footer: {
    logoText: "Mountain Safari",
    linksHeading: "Nawigacja",
    guidesHeading: "Przewodnicy",
    guides: [
      { name: "Anton Sedlák", phone: "+421903624085", phoneDisplay: "+421 903 624 085" },
      { name: "Štefan Krasňan", phone: "+421904295135", phoneDisplay: "+421 904 295 135" },
    ],
    email: "info@mountainsafari.sk",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/mtn_safari/?hl=en" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61568565786611" },
    ],
    credentialsNote: "IVBV/UIAGM/IFMGA licencjonowani przewodnicy · członkowie NAHVSR",
    legalLinks: [
      { label: "Ochrona danych osobowych", href: "ochrana-osobnych-udajov.html" },
      { label: "Informacje o administratorze", href: "impressum.html" },
      // Patrz content.js — otwiera ponownie baner zgody.
      { label: "Ustawienia plików cookie", consent: true },
    ],
    copyrightName: "Mountain Safari",
  },

  /* ===== LEGAL — mirrors content.js. DRAFT TRANSLATION, needs native review
     together with the rest of the PL copy. Same empty company fields apply. ===== */
  legal: {
    company: {
      name: "Mountain Safari",
      address: "",
      ico: "57 001 898",
      dic: "2122531961",
      vat: "",
      register: "",
      email: "info@mountainsafari.sk",
      phone: "+421 903 624 085",
    },
    backLabel: "Powrót na stronę główną",
    updatedLabel: "Ostatnia aktualizacja",
    updated: "26 sierpnia 2026",

    privacy: {
      slug: "ochrana-osobnych-udajov.html",
      title: "Ochrona danych osobowych",
      intro: "Twoja prywatność jest dla nas ważna. Ten dokument wyjaśnia, jakie dane osobowe przetwarzamy, w jakim celu i jakie prawa Ci przysługują.",
      sections: [
        {
          heading: "1. Kto przetwarza Twoje dane",
          body: ["Administratorem, który określa cele i sposoby przetwarzania Twoich danych osobowych, jest:"],
          list: [
            "{company}",
            "Siedziba: {address}",
            "IČO: {ico} · DIČ: {dic}",
            "E-mail: {email} · Telefon: {phone}",
          ],
        },
        {
          heading: "2. Jakie dane przetwarzamy",
          body: ["Przetwarzamy wyłącznie dane, które sam nam przekażesz przez formularz rezerwacyjny, oraz podstawowe dane techniczne o wizycie na stronie."],
          list: [
            "Dane z formularza: imię, numer telefonu, adres e-mail, wybrana wyprawa, preferowany termin i treść wiadomości.",
            "Dane techniczne: adres IP, typ przeglądarki i urządzenia, czas wizyty oraz strona, z której przyszedłeś.",
          ],
        },
        {
          heading: "3. Dlaczego przetwarzamy dane i na jakiej podstawie prawnej",
          list: [
            "Obsługa rezerwacji lub zapytania i kontakt z Tobą — podstawą prawną są działania przed zawarciem umowy na Twoje żądanie zgodnie z art. 6 ust. 1 lit. b) RODO.",
            "Bezpieczeństwo i działanie strony — podstawą prawną jest nasz prawnie uzasadniony interes zgodnie z art. 6 ust. 1 lit. f) RODO.",
            "Pomiar ruchu i reklama — wyłącznie na podstawie Twojej zgody zgodnie z art. 6 ust. 1 lit. a) RODO, którą możesz w każdej chwili wycofać.",
          ],
        },
        {
          heading: "4. Jak długo przechowujemy dane",
          body: ["Dane z formularza przechowujemy przez czas obsługi Twojego zgłoszenia, a następnie przez 3 lata, aby móc odpowiedzieć na ewentualne pytania lub reklamacje. Jeśli chcesz wcześniejszego usunięcia, napisz na {email} — usuniemy dane niezwłocznie, o ile ich przechowywanie nie wynika z przepisów prawa."],
        },
        {
          heading: "5. Komu udostępniamy Twoje dane",
          body: ["Nie sprzedajemy Twoich danych ani nie przekazujemy ich stronom trzecim w celach marketingowych. Korzystamy jednak ze sprawdzonych dostawców, którzy przetwarzają dane w naszym imieniu:"],
          list: [
            "Google Ireland Ltd. / Google LLC — przechowywanie rezerwacji (Google Sheets) i wysyłka e-maili potwierdzających (Gmail).",
            "Netlify, Inc. — hosting tej strony wraz z technicznymi logami serwera.",
            "Wistia, Inc. — odtwarzanie wideo z opiniami osadzonych na stronie.",
            "Przewodnicy wysokogórscy współpracujący z administratorem — w zakresie niezbędnym do realizacji wyprawy.",
          ],
        },
        {
          heading: "6. Przekazywanie danych poza UE",
          body: ["Część wymienionych dostawców ma siedzibę w Stanach Zjednoczonych. Przekazanie danych jest w takim przypadku zabezpieczone standardowymi klauzulami umownymi zatwierdzonymi przez Komisję Europejską lub uczestnictwem dostawcy w programie EU–US Data Privacy Framework."],
        },
        {
          heading: "7. Pliki cookie i pomiar ruchu",
          body: ["Strona używa technicznie niezbędnych plików cookie zapewniających jej prawidłowe działanie. Cookies analityczne i reklamowe (Google Analytics, Google Ads) stosujemy wyłącznie za Twoją zgodą. Osadzone wideo dostawcy Wistia może zapisać własne pliki cookie — ich ustawienia znajdziesz w polityce tego dostawcy. Zgodę możesz w każdej chwili wycofać, usuwając pliki cookie w przeglądarce."],
        },
        {
          heading: "8. Jakie masz prawa",
          body: ["W związku z przetwarzaniem Twoich danych osobowych przysługują Ci zgodnie z RODO następujące prawa:"],
          list: [
            "prawo dostępu do danych i uzyskania ich kopii,",
            "prawo do sprostowania nieprawidłowych lub niekompletnych danych,",
            "prawo do usunięcia danych („prawo do bycia zapomnianym“),",
            "prawo do ograniczenia przetwarzania,",
            "prawo do przenoszenia danych,",
            "prawo do sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,",
            "prawo do wycofania zgody w dowolnym momencie.",
          ],
        },
        {
          heading: "9. Gdzie możesz się zwrócić",
          body: [
            "Każde z wymienionych praw możesz zrealizować, pisząc na {email}. Odpowiemy najpóźniej w ciągu miesiąca.",
            "Jeśli uważasz, że przetwarzając Twoje dane naruszamy przepisy, masz prawo wnieść skargę do organu nadzorczego: Úrad na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratysława, dataprotection.gov.sk.",
          ],
        },
      ],
    },

    imprint: {
      slug: "impressum.html",
      title: "Informacje o administratorze",
      intro: "Dane publikowane zgodnie ze słowacką ustawą nr 22/2004 Z. z. o handlu elektronicznym oraz ustawą nr 250/2007 Z. z. o ochronie konsumenta.",
      sections: [
        {
          heading: "Administrator",
          list: [
            "{company}",
            "Siedziba: {address}",
            "IČO: {ico}",
            "DIČ: {dic}",
            "Numer VAT: {vat}",
            "Wpis: {register}",
          ],
        },
        {
          heading: "Kontakt",
          list: [
            "E-mail: {email}",
            "Telefon: {phone}",
            "Anton Sedlák — przewodnik wysokogórski IVBV/UIAGM/IFMGA, +421 903 624 085",
            "Štefan Krasňan — przewodnik wysokogórski IVBV/UIAGM/IFMGA, +421 904 295 135",
          ],
        },
        {
          heading: "Kwalifikacje",
          body: ["Wyprawy prowadzą przewodnicy wysokogórscy z ważną międzynarodową licencją IVBV/UIAGM/IFMGA, członkowie Narodowego Stowarzyszenia Przewodników Wysokogórskich Republiki Słowackiej (NAHVSR)."],
        },
        {
          heading: "Organ nadzoru",
          body: ["Slovenská obchodná inšpekcia (SOI), Inšpektorát SOI pre Prešovský kraj, Obrancov mieru 6, 080 01 Prešov — wydział nadzoru. Kontrolę przestrzegania przepisów o ochronie konsumenta prowadzi SOI właściwa dla siedziby administratora."],
        },
        {
          heading: "Rozwiązywanie sporów",
          body: ["Konsument ma prawo zwrócić się do sprzedawcy z wnioskiem o naprawę na {email}. Jeśli sprzedawca odpowie odmownie lub nie odpowie w ciągu 30 dni, konsument ma prawo złożyć wniosek o wszczęcie alternatywnego rozwiązywania sporów zgodnie z ustawą nr 391/2015 Z. z. Wniosek można złożyć również przez platformę ec.europa.eu/consumers/odr."],
        },
        {
          heading: "Odpowiedzialność za treść",
          body: ["Treść tej strony, w tym ceny i opisy wypraw, ma charakter informacyjny. O realizacji wyprawy i ostatecznej trasie decyduje przewodnik wysokogórski na podstawie aktualnych warunków w górach. Wiążące warunki potwierdzimy przy rezerwacji."],
        },
      ],
    },
  },

  modal: {
    title: "Zarezerwuj wejście",
    fields: {
      name: { label: "Imię i nazwisko", placeholder: "Jan Kowalski", required: true },
      phone: { label: "Telefon", placeholder: "+48 888 888 888", required: true },
      email: { label: "E-mail", placeholder: "jan@gmail.com", required: true },
      tour: { label: "Które wejście", placeholderOption: "Wybierz wejście", otherOptionLabel: "Inne / nie wiem", required: true },
      date: { label: "Preferowany termin", placeholder: "1.1.2026", required: false },
      message: { label: "Wiadomość", placeholder: "", required: false },
    },
    submitLabel: "Wyślij zapytanie",
    submitLoadingLabel: "Wysyłanie…",
    errorMessage: "Coś poszło nie tak. Spróbuj proszę ponownie albo napisz do nas na WhatsApp.",
    whatsappFallbackLabel: "Wolisz WhatsApp?",
    closeLabel: "Zamknij",
    errors: {
      required: "To pole jest wymagane.",
      invalidEmail: "Podaj prawidłowy adres e-mail.",
      invalidPhone: "Podaj prawidłowy numer telefonu.",
    },
  },

  whatsapp: {
    phone: "421903624085",
    prefilledMessage: "Dzień dobry, jestem zainteresowany wyprawą z Mountain Safari.",
    fabAriaLabel: "Skontaktuj się przez WhatsApp",
  },

  thankYou: {
    eyebrow: "Rezerwacja przyjęta",
    title: "Dziękujemy!",
    greeting: "Dziękujemy, {name}!",
    summaryWithDate: "Twoja rezerwacja wejścia {tour} w terminie {date} została pomyślnie przyjęta.",
    summaryNoDate: "Twoja rezerwacja wejścia {tour} została pomyślnie przyjęta.",
    reassurance: "Odezwiemy się jak najszybciej — zwykle w ciągu 24 godzin.",
    guidesNote: "Nasi przewodnicy wysokogórscy mają licencje IVBV/UIAGM/IFMGA — Twoje góry będą w najpewniejszych rękach.",
    whatsappIntro: "Chcesz coś ustalić wcześniej?",
    whatsappLabel: "Napisz na WhatsApp",
    backHomeLabel: "Wróć na stronę główną",
  },

  tracking: {
    ga4MeasurementId: "G-2L4FCK798G",
    googleAdsId: "AW-XXXXXXXXX",
    convLabelLead: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
    convLabelWhatsapp: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
    // PLACEHOLDER — mirrors content.js; Polish campaign may get its own conversion labels.
    convLabelPhone: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
  },

  appsScriptUrl: "https://script.google.com/macros/s/AKfycby7nJ-gsmA9LbRnbzQWlRQk8Hj9jegqebFdp9T1L6TqKmxht92PCVRwdAVvyRVitvcmAw/exec",

  devMode: false,

  /* ===== SITE — absolute URLs for SEO. Same baseUrl as SK; the /pl/ prefix is
     added by the build script. Must stay identical to content.js. ===== */
  site: {
    baseUrl: "https://lp.mountainsafari.sk",
    name: "Mountain Safari",
    defaultOgImage: "brand_assets/Gerlachovský.webp",
    ogLocale: "pl_PL",
  },

  /* ===== TOUR DETAIL PAGES — Polish UI labels for /pl/tury/<slug>.html ===== */
  tourDetail: {
    breadcrumbHome: "Start",
    breadcrumbTours: "Wyprawy",
    backToTours: "Wszystkie wyprawy",
    overviewHeading: "O wejściu",
    pricingHeading: "Cennik",
    pricingSeasonSummer: "Lato",
    pricingSeasonWinter: "Zima",
    routesHeading: "Drogi wejścia",
    routeColName: "Droga",
    routeColDuration: "Czas",
    routeColGroup: "Maks. grupa",
    routeGroupUnit: "os.",
    inclusionHeading: "Co jest w cenie",
    includedHeading: "Cena obejmuje",
    excludedHeading: "Cena nie obejmuje",
    requirementsHeading: "Trudność i wymagania",
    logisticsHeading: "Miejsce i czas spotkania",
    meetingPointLabel: "Miejsce spotkania",
    meetingTimeLabel: "Czas spotkania",
    meetingTbd: "Dokładne miejsce i czas spotkania potwierdzimy przy rezerwacji.",
    meetingDisclaimerTitle: "Ważne — punktualność:",
    meetingDisclaimer: "Na miejsce spotkania przyjdź proszę dokładnie o umówionej godzinie. Wejście jest wymagające czasowo i pogodowo — nawet małe spóźnienie może zagrozić bezpieczeństwu, właściwemu rozplanowaniu wyprawy albo całkowicie uniemożliwić jej realizację.",
    galleryHeading: "Galeria",
    policiesHeading: "Warunki i anulowanie",
    faqHeading: "Częste pytania",
    relatedHeading: "Inne wejścia, które mogą Cię zainteresować",
    // Sidebar / booking card
    quickFactsHeading: "Szybki przegląd",
    durationLabel: "Czas trwania",
    difficultyLabel: "Trudność",
    guideRatioLabel: "Osób na przewodnika",
    meetingLabel: "Start",
    priceFromLabel: "od",
    priceOnRequestLabel: "Cena na zapytanie",
    bookCtaLabel: "Zarezerwuj wejście",
    callCtaLabel: "Zadzwoń do nas",
    whatsappCtaLabel: "Napisz na WhatsApp",
    reassurance: "Niezobowiązujące zapytanie • odpowiadamy w ciągu 24 godzin",
  },

  /* ===== TOUR DEFAULTS — placeholder scaffolding, mirrors content.js ===== */
  tourDefaults: {
    longDescription: [
      "To wejście prowadzą wyłącznie licencjonowani przewodnicy wysokogórscy (IVBV/UIAGM/IFMGA), którzy znają teren, pogodę i warunki jak mało kto. Cały dzień poświęcamy jednej grupie — tempo i trasę dopasowujemy do Twojego doświadczenia i aktualnych warunków w górach.",
      "Bezpieczeństwo jest u nas na pierwszym miejscu. Przed wejściem wspólnie omówimy plan, technikę i sprzęt, a podczas całej wyprawy jesteś pod opieką przewodnika. Celem nie jest tylko szczyt — ale przeżycie, które będziesz wspominać całe życie.",
    ],
    requirements: [
      "Dobra kondycja fizyczna odpowiednia do długości i przewyższenia trasy",
      "Odporność na ekspozycję",
      "Gotowość do stosowania się do poleceń przewodnika",
      "Odpowiednia odzież i buty w góry (sprzęt możemy wypożyczyć)",
    ],
    gallery: [
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+1", alt: "Placeholder — fotografia z wyprawy" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+2", alt: "Placeholder — fotografia z wyprawy" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+3", alt: "Placeholder — fotografia z wyprawy" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+4", alt: "Placeholder — fotografia z wyprawy" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+5", alt: "Placeholder — fotografia z wyprawy" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+6", alt: "Placeholder — fotografia z wyprawy" },
    ],
    policies: [
      { title: "Pogoda i bezpieczeństwo", body: "O ostatecznym terminie i realizacji decyduje przewodnik wysokogórski na podstawie aktualnych warunków. Przy niesprzyjającej pogodzie szukamy terminu zastępczego — Twoje bezpieczeństwo jest ważniejsze niż szczyt." },
      { title: "Warunki anulowania", body: "Termin można bezpłatnie przełożyć po wcześniejszym uzgodnieniu. Szczegółowe warunki anulowania potwierdzimy przy rezerwacji." },
      { title: "Ubezpieczenie", body: "Zalecamy indywidualne ubezpieczenie podróżne i wypadkowe w góry, obejmujące ratownictwo w terenie górskim. Ubezpieczenie nie jest wliczone w cenę." },
    ],
  },
};
