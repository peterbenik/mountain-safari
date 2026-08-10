/*
  Mountain Safari — content data (Polish / pl)
  Key-for-key clone of content.js with all string VALUES translated to Polish.
  Deployed as /pl/content.js by scripts/build-tour-pages.mjs; the /pl/ pages load
  this file instead of /content.js. Keep every key identical to content.js —
  main.js and assets/tour.js read the same structure for both languages.

  DRAFT-TRANSLATION FLAG: translated by Claude (AI) as a precise, direct
  translation of the Slovak copy — MUST be reviewed by a native Polish speaker
  before the Polish campaign launches. Notes:
  - Peaks use Polish exonyms (Gierlach, Łomnica, Zadni Mnich, Morskie Oko);
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
    metaDescription: "Licencjonowani przewodnicy wysokogórscy IFMGA/UIAGM w Tatrach Wysokich. Prywatne wejścia szyte na miarę — od łatwych wypraw po wymagające szczyty.",
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
    bgImage: "brand_assets/Background.jpg",
    bgImageAlt: "Panorama ośnieżonej tatrzańskiej grani o świcie",
    badgeImage: "brand_assets/uiagm-1.webp",
    badgeImageAlt: "IFMGA / UIAGM / IVBV — certyfikat przewodnika wysokogórskiego",
    eyebrow: "Tatry Wysokie — przeżycie na całe życie",
    heading: "Przygoda, którą będziesz wspominać przez całe życie.",
    subheading: "Przewodnicy wysokogórscy UIAGM/IFMGA — Tatry Wysokie i Alpy",
    ctaLabel: "Wybierz swój szczyt",
    ctaHref: "#tours",
    ctaSecondaryLabel: "Mam pytanie",
  },

  about: {
    eyebrow: "Kto się Tobą zaopiekuje?",
    heading: "Kto się Tobą zaopiekuje?",
    paragraph: [
      "Nazywamy się Anton Sedlák i Štefan Krasňan.",
      "Jesteśmy dwoma przewodnikami wysokogórskimi z międzynarodową licencją **UIAGM** i **IFMGA** — mamy za sobą setki udanych wejść w Tatrach Wysokich i w Alpach.",
      "Tempo i trasę zawsze dopasowujemy do Ciebie, tak aby wejście było nie tylko wykonalne, ale i przyjemne.",
      "Jeśli warunki w dniu wejścia są niekorzystne, bez problemu **przełożymy Twój termin** albo **zwrócimy Ci pieniądze**.",
      "Twoje przeżycie z drogi na szczyt jest dla nas priorytetem — zrobimy wszystko, żebyś przekroczył swoje granice w najbezpieczniejszy możliwy sposób.",
      "Nie masz pewności, czy dasz radę na swojej wyprawie?",
      "**Zadzwoń do nas.**",
    ],
    ctaPrimaryLabel: "Zadzwoń do nas",
    ctaSecondaryLabel: "Napisz do nas",
    photoAnton: "brand_assets/Anton.jpg",
    photoAntonAlt: "Anton Sedlák, przewodnik wysokogórski IFMGA/UIAGM",
    photoStefan: "brand_assets/stefan-krasnan.jpg",
    photoStefanAlt: "Štefan Krasňan, przewodnik wysokogórski IFMGA/UIAGM",
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
      image: "brand_assets/Gerlachovský.jpeg",
      imageAlt: "Wejście na Gierlach, najwyższy szczyt Słowacji i całych Tatr",
      description: "Najwyższy szczyt Słowacji i całych Tatr, dostępny wyłącznie z przewodnikiem wysokogórskim. Wejście prowadzi od schroniska Sliezsky dom przez Dolinę Wielicką i eksponowaną, ubezpieczoną liną Wielicką Próbę. Ze szczytu otwiera się widok na całe Tatry, jakiego z dołu nigdy nie zobaczysz.",
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
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM wraz z jego kosztami",
        "Wypożyczenie sprzętu (uprząż, kask, czekan, raki)",
      ],
      excluded: [
        "Transport Tatranská Polianka – Sliezsky dom i z powrotem: 20 €/os.",
      ],
    },
    {
      id: "mnich",
      slug: "mnich-druhy-mnich",
      name: "Mnich i Zadni Mnich",
      location: "Zadni Mnich 2172 m n.p.m.",
      duration: "1 dzień",
      difficulty: 2,
      priceFrom: 440,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "2:1",
      showOnLp: true,
      featured: true,
      image: "brand_assets/Mníchovia.jpg",
      imageAlt: "Wejście na Mnicha i Zadniego Mnicha w polskich Tatrach",
      description: "Wejście na Mnicha to świetna okazja, by rozpocząć przygodę ze zdobywaniem trudniejszych tatrzańskich szczytów, niedostępnych szlakami turystycznymi. Wejście ma charakter wspinaczkowy, ale poziom trudności jest osiągalny dla każdego sprawnego turysty.",
      link: "https://www.mountainsafari.sk/kurzy/mnich-a-zadni-mnich-v-polskych-tatrach/",
      meetingPoint: "Parking przy przejściu granicznym Łysa Polana",
      pricingDetail: [
        { label: "1 osoba", price: 440, unit: "€" },
        { label: "2 osoby", price: 470, unit: "€ (235 €/os.)" },
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM wraz z jego kosztami",
        "Wypożyczenie sprzętu (kask, uprząż)",
        "Transport Łysa Polana – Morskie Oko",
      ],
    },

    /* ===== LATO — Alpy (flagowe trio: Grossglockner, Matterhorn, Mont Blanc) ===== */
    {
      id: "grossglockner",
      slug: "letny-grossglockner",
      name: "Letni Grossglockner",
      location: "3798 m n.p.m.",
      duration: "1 dzień",
      difficulty: 2,
      priceFrom: 650,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Letný grossglockner.jpg",
      imageAlt: "Wejście na Grossglockner, najwyższy szczyt Austrii",
      description: "Najwyższy szczyt Austrii i król Wysokich Taurów, który wznosi się ku niebu jak skalno-lodowa piramida. Ze szczytu otwiera się jeden z najrozleglejszych widoków we Wschodnich Alpach.",
      link: "https://www.mountainsafari.sk/kurzy/letny-grossglockner-najvyssi-stit-rakuska/",
      pricingDetail: [
        { label: "1 osoba", price: 650, unit: "€" },
      ],
      longDescription: [
        "Grossglockner (3 798 m) to najwyższy szczyt Austrii i król Wysokich Taurów (Hohe Tauern). Jego skalno-lodowa piramida należy do najbardziej wyrazistych szczytów całych Alp — większe przewyższenie nad okolicą ma w Alpach już tylko Mont Blanc. Pierwszego wejścia dokonano w roku 1800.",
        "Wejście z przewodnikiem prowadzi klasyczną drogą normalną (trudność PD) przez lodowiec i końcową skalistą grań ku Glocknerscharte i na szczyt. Punktem wyjścia jest zwykle najwyżej położone austriackie schronisko Erzherzog-Johann-Hütte (Adlersruhe). Pod szczytem rozciąga się największy austriacki lodowiec Pasterze.",
      ],
    },
    {
      id: "matterhorn",
      slug: "matterhorn",
      name: "Matterhorn",
      location: "4478 m n.p.m.",
      duration: "2 dni",
      difficulty: 5,
      priceFrom: 1400,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "1:1",
      showOnLp: true,
      featured: true,
      image: "brand_assets/Matterhorn.webp",
      imageAlt: "Wejście na Matterhorn nad Zermatt w Szwajcarii",
      description: "Ikona Alp i jeden z najczęściej fotografowanych szczytów świata. Trudne, eksponowane wejście granią Hörnligrat, prowadzone jeden na jeden z przewodnikiem IFMGA — dla maksymalnego bezpieczeństwa i tempa szytego na miarę.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-matterhorn-4478m/",
      meetingPoint: "Zermatt, Szwajcaria",
      route: "Grań Hörnli (Hörnligrat)",
      routeDuration: "ok. 8 h (wejście 4 h, zejście 4 h)",
      pricingDetail: [
        { label: "1 osoba, bez wycieczki aklimatyzacyjnej", price: 1400, unit: "€/os." },
        { label: "1 osoba, z wycieczką aklimatyzacyjną", price: 1900, unit: "€/os." },
      ],
      requirements: [
        "Doskonała kondycja — przewyższenie 1500+ m, ponad 10 h aktywności",
        "Eksponowane odcinki graniowe z ryzykiem upadku",
        "Konieczna wcześniejsza aklimatyzacja",
        "Umiejętność posługiwania się rakami i czekanem (śnieg, lód, skała)",
        "Eksponowany teren o trudności III–IV UIAA",
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM",
        "Wypożyczenie sprzętu (czekan, raki, kask, uprząż)",
      ],
      excluded: [
        "Nocleg i wyżywienie w schronisku Hörnli (ok. 150 €/noc ze śniadaniem i obiadokolacją)",
      ],
    },
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
      image: "brand_assets/Mont blanc.jpg",
      imageAlt: "Wejście na Mont Blanc, najwyższy szczyt Alp",
      description: "Dołącz do nas na niezapomnianą przygodę na szczyt Mont Blanc – legendarny „dach Europy”. W towarzystwie doświadczonego, certyfikowanego przewodnika wysokogórskiego bezpiecznie i pewnie przejdziesz przez lodowce, skaliste granie i zapierającą dech w piersiach alpejską scenerię.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-mont-blanc-4808m/",
      meetingPoint: "Chamonix / Nid d'Aigle, Francja",
      pricingDetail: [
        { label: "Wejście dwudniowe, 2 osoby", price: 1700, unit: "€" },
        { label: "Wycieczka aklimatyzacyjna (Francja)", price: 600, unit: "€/dzień" },
        { label: "Wycieczka aklimatyzacyjna (Szwajcaria)", price: 800, unit: "€/dzień" },
      ],
      pricingNote: "Program bywa podawany także jako „od 2 900 €” za cały 5-dniowy program wraz z aklimatyzacją i noclegiem w schronisku.",
      requirements: [
        "Pewne poruszanie się w trudnym, eksponowanym terenie",
        "Pewne posługiwanie się rakami i czekanem na lodzie i firnie",
        "Wspinaczka o trudności II (UIAA)",
        "Doskonała kondycja fizyczna",
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM",
        "Wypożyczenie sprzętu (czekan, raki)",
      ],
      excluded: [
        "Noclegi i wyżywienie w schroniskach, przejazdy kolejkami",
      ],
    },

    /* ===== LATO — Alpy (pozostałe wyprawy) ===== */
    {
      id: "eiger",
      slug: "eiger",
      name: "Eiger",
      location: "3970 m n.p.m.",
      duration: "2 dni",
      difficulty: 4,
      priceFrom: 1500,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "1:1",
      showOnLp: true,
      image: "brand_assets/Eiger.webp",
      imageAlt: "Wejście na Eiger w Alpach Berneńskich",
      description: "Wejście na Eiger oznacza dołączenie do grona elitarnych wspinaczy. Góra słynie z dramatycznej ściany północnej (Nordwand), która zyskała przydomek „Ściana Śmierci”. Dla wielu wspinaczy wejście na Eiger to nie tylko techniczne wyzwanie, ale i podróż do historii alpinizmu.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-eiger-3970m/",
      pricingDetail: [{ label: "1 osoba", price: 1500, unit: "€/os." }],
      longDescription: [
        "Eiger (3 970 m) w Alpach Berneńskich należy do najbardziej znanych i najbardziej respektowanych szczytów Alp. Rozsławiła go blisko 1 800-metrowa ściana północna (Nordwand), ze względu na swoją śmiertelną sławę nazywana też Mordwand — jedna z największych ścian w całych Alpach. Pierwszego wejścia na szczyt dokonano w roku 1858.",
        "Wejście z przewodnikiem nie prowadzi ścianą, lecz drogą klasyczną — najczęściej granią Mittellegi (pierwsze przejście 1921), najdłuższą granią Eigeru z eksponowanym skalno-lodowym terenem. To technicznie wymagające wejście dla doświadczonych wspinaczy z doskonałą kondycją.",
      ],
    },
    {
      id: "obergabelhorn",
      slug: "obergabelhorn-arbengrat",
      name: "Obergabelhorn",
      location: "4063 m n.p.m.",
      duration: "3 dni",
      difficulty: 5,
      priceFrom: 1600,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "1:1",
      showOnLp: true,
      image: "brand_assets/Obergabelhorn.jpg",
      imageAlt: "Wejście na Obergabelhorn granią Arbengrat",
      description: "Czterotysięcznik w Alpach Pennińskich, uważany za najpiękniejszy szczyt regionu. Trzydniowe wejście prowadzi słynną granią Arbengrat, jedną z wielkich klasyk Alp Zachodnich, z litą skałą i przepiękną graniową trasą. Wymagające przeżycie dla doświadczonych, często ukoronowane wschodem słońca wprost na grani.",
      link: "https://www.mountainsafari.sk/kurzy/obergabelhorn-arbengrat/",
      meetingPoint: "Zermatt, przy stacji kolejowej",
      pricingDetail: [
        { label: "1 osoba", price: 1600, unit: "€" },
      ],
      longDescription: [
        "Trzydniowy program zaczyna się w Zermatt. Pierwszego dnia wjeżdżasz kolejką na Schwarzsee i podchodzisz do biwaku Arbenbiwak (ok. 4 godziny, ewentualnie całą doliną 5–6 godzin). Drugiego dnia wejście prowadzi słynną granią Arbengrat na szczyt Obergabelhornu, dalej przez Wellenkuppe do schroniska Rothornhütte. Trzeciego dnia schodzisz z powrotem do Zermatt.",
        "Arbengrat to jedna z wielkich klasyk Alp Zachodnich — lita skała, eksponowana graniowa trasa i niezapomniane widoki, często ukoronowane wschodem słońca wprost na grani.",
      ],
      included: [
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM wraz z jego kosztami",
        "Nocleg i wyżywienie w schronisku Rothornhütte",
        "Wypożyczenie sprzętu (czekan, raki)",
      ],
      requirements: [
        "Pewne poruszanie się w trudnym, eksponowanym terenie (trawa, skała, śnieg)",
        "Pewne posługiwanie się rakami i czekanem",
        "Wspinaczka o trudności III (UIAA)",
        "Doskonała kondycja fizyczna na długie wejścia",
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
      image: "brand_assets/Ortler - HINTERGRAT.jpg",
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
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM wraz z jego kosztami",
        "Nocleg i wyżywienie w schronisku Hintergrathütte",
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
      image: "brand_assets/Lomnický.jpg",
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
        "Planowanie i realizacja wejścia z przewodnikiem UIAGM wraz z jego kosztami",
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
    bgImage: "brand_assets/Background.jpg",
    bgImageAlt: "",
    ctaLabel: "Zarezerwuj",
    images: [
      { src: "brand_assets/Gallery 1.jpg", alt: "[Fotografia z wyprawy 1]" },
      { src: "brand_assets/Gallery2.jpg", alt: "[Fotografia z wyprawy 2]" },
      { src: "brand_assets/GALLERY3.webp", alt: "[Fotografia z wyprawy 3]" },
      { src: "brand_assets/Gallery4.jpg", alt: "[Fotografia z wyprawy 4]" },
      { src: "brand_assets/gallery5.jpg", alt: "[Fotografia z wyprawy 5]" },
      { src: "brand_assets/Gallery6.jpg", alt: "[Fotografia z wyprawy 6]" },
    ],
  },

  faqSection: {
    heading: "Częste pytania",
    morePrompt: "Nie znajdujesz odpowiedzi na swoje pytanie?",
    moreLinkLabel: "Zobacz wszystkie częste pytania",
    // OPEN ITEM — points to the Slovak FAQ page; no Polish equivalent exists yet.
    moreLinkHref: "https://www.mountainsafari.sk/faq/",
    items: [
      { question: "Co dokładnie jest w cenie?", answer: "W cenie jest przewodnik wysokogórski z licencją UIAGM/IFMGA — jego prowadzenie i asekuracja podczas całego wejścia, ocena warunków i zaplanowanie wyprawy. Specjalistyczny sprzęt w razie potrzeby Ci wypożyczymy, wystarczy dać znać wcześniej. O pozostałych kosztach, takich jak nocleg w schronisku czy parking, zawsze mówimy z góry, żebyś miał pełny obraz jeszcze przed rezerwacją." },
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
    cutoutImage: "brand_assets/Gallery6.jpg",
    cutoutAlt: "Anton Sedlák i Štefan Krasňan podczas wejścia w górach",
    trustHeading: "Z kim współpracujemy",
    partnerLogos: [
      { src: "brand_assets/uiagm-1.webp", alt: "IFMGA / UIAGM / IVBV" },
      { src: "brand_assets/Partner 2.jpg", alt: "Fjällräven" },
      { src: "brand_assets/SKIBA Partner.jpg", alt: "SKIBA" },
    ],
  },

  footer: {
    logoText: "Mountain Safari",
    linksHeading: "[Nawigacja]",
    guidesHeading: "[Przewodnicy]",
    guides: [
      { name: "Anton Sedlák", phone: "+421903624085", phoneDisplay: "+421 903 624 085" },
      { name: "Štefan Krasňan", phone: "+421904295135", phoneDisplay: "+421 904 295 135" },
    ],
    email: "info@mountainsafari.sk",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/mtn_safari/?hl=en" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61568565786611" },
    ],
    credentialsNote: "IFMGA · UIAGM · IVBV licencjonowani przewodnicy · członkowie NAHVSR",
    copyrightName: "Mountain Safari",
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
    guidesNote: "Nasi przewodnicy wysokogórscy mają licencje IFMGA / UIAGM / IVBV — Twoje góry będą w najpewniejszych rękach.",
    whatsappIntro: "Chcesz coś ustalić wcześniej?",
    whatsappLabel: "Napisz na WhatsApp",
    backHomeLabel: "Wróć na stronę główną",
  },

  tracking: {
    ga4MeasurementId: "G-XXXXXXXXXX",
    googleAdsId: "AW-XXXXXXXXX",
    convLabelLead: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
    convLabelWhatsapp: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
    // PLACEHOLDER — mirrors content.js; Polish campaign may get its own conversion labels.
    convLabelPhone: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
  },

  appsScriptUrl: "https://script.google.com/macros/s/AKfycby7nJ-gsmA9LbRnbzQWlRQk8Hj9jegqebFdp9T1L6TqKmxht92PCVRwdAVvyRVitvcmAw/exec",

  devMode: false,

  /* ===== SITE — absolute URLs for SEO. Same baseUrl as SK; the /pl/ prefix is
     added by the build script. PLACEHOLDER baseUrl — swap before launch. ===== */
  site: {
    baseUrl: "https://www.mountainsafari.sk",
    name: "Mountain Safari",
    defaultOgImage: "brand_assets/Gerlachovský.jpeg",
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
      "To wejście prowadzą wyłącznie licencjonowani przewodnicy wysokogórscy (IFMGA/UIAGM), którzy znają teren, pogodę i warunki jak mało kto. Cały dzień poświęcamy jednej grupie — tempo i trasę dopasowujemy do Twojego doświadczenia i aktualnych warunków w górach.",
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
      { title: "Warunki anulowania", body: "Termin można bezpłatnie przełożyć po wcześniejszym uzgodnieniu. Szczegółowe warunki anulowania potwierdzimy przy rezerwacji. [PLACEHOLDER — uzupełnić rzeczywiste warunki.]" },
      { title: "Ubezpieczenie", body: "Zalecamy indywidualne ubezpieczenie podróżne i wypadkowe w góry, obejmujące ratownictwo w terenie górskim. Ubezpieczenie nie jest wliczone w cenę." },
    ],
  },
};
