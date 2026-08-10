/*
  Mountain Safari — content data (Slovak / sk)
  Every copy string, tour, testimonial, FAQ and process step used by index.html
  lives in this single object. To add Polish, clone this file to content.pl.js,
  translate the string VALUES only (keep every key identical), and swap the
  <script src="content.js"> tag in index.html for <script src="content.pl.js">.
  main.js never contains hard-coded copy — it only reads from window.MS_CONTENT.

  DRAFT-CONTENT FLAG: all 8 "leto" tours and the single "zima" tour
  (zimny-lomnicky-stit) are confirmed with real copy/pricing from the
  client. The rest of the winter catalogue (skialp + kurzy tours) was
  removed on request and is being re-added one tour at a time as the
  client sends real data — not a placeholder scaffold anymore. Still
  missing everywhere: real photography (using placehold.co for
  Matterhorn/Eiger/Lomnický štít). See README "Placeholder checklist".
*/
window.MS_CONTENT = {
  meta: {
    lang: "sk",
    siteTitle: "Mountain Safari — Horskí sprievodcovia Vysoké Tatry",
    metaDescription: "IFMGA/UIAGM licencovaní horskí sprievodcovia vo Vysokých Tatrách. Súkromné výstupy šité na mieru — od ľahkých túr po náročné štíty.",
  },

  nav: {
    logoText: "Mountain Safari",
    links: [
      { label: "Túry", href: "#tours" },
      { label: "O nás", href: "#about" },
      { label: "Proces", href: "#process" },
      { label: "Recenzie", href: "#testimonials" },
      { label: "Galéria", href: "#gallery" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Rezervovať",
    phone: "+421903624085",
    phoneDisplay: "+421 903 624 085",
    phoneDisplayShort: "0903 624 085",
    phoneAriaLabel: "Zavolať nám",
  },

  hero: {
    bgImage: "brand_assets/Background.jpg",
    bgImageAlt: "Panoráma zasneženého tatranského hrebeňa za úsvitu",
    badgeImage: "brand_assets/uiagm-1.webp",
    badgeImageAlt: "IFMGA / UIAGM / IVBV — certifikát horského sprievodcu",
    eyebrow: "Vysoké Tatry — zážitok na celý život",
    heading: "Dobrodružstvo, na ktoré budete spomínať celý život.",
    subheading: "Horskí vodcovia UIAGM/IFMGA do Vysokých Tatier a Álp",
    ctaLabel: "Vyberte si vrchol",
    ctaHref: "#tours",
    ctaSecondaryLabel: "Mám otázku",
  },

  about: {
    eyebrow: "Kto na vás dá pozor?",
    heading: "Kto na vás dá pozor?",
    paragraph: [
      "Voláme sa Anton Sedlák a Štefan Krasňan.",
      "Sme dvaja horskí vodcovia s medzinárodnou licenciou **UIAGM** a **IFMGA** a máme za sebou stovky úspešných výstupov vo Vysokých Tatrách a v Alpách.",
      "Tempo a trasu vám vždy nastavíme na mieru, aby ste to nielen zvládli, ale aj si to užili.",
      "Ak sú podmienky v deň výstupu nepriaznivé, nemáme problém **preložiť váš termín** alebo **vrátiť vám peniaze**.",
      "Váš zážitok z cesty na vrchol je pre nás priorita a urobíme všetko pre to, aby ste svoje limity prekonali tým najbezpečnejším spôsobom.",
      "Nie ste si istý, či by ste svoju túru zvládli?",
      "**Zavolajte nám.**",
    ],
    ctaPrimaryLabel: "Zavolajte nám",
    ctaSecondaryLabel: "Napíšte nám",
    photoAnton: "brand_assets/Anton.jpg",
    photoAntonAlt: "Anton Sedlák, horský vodca IFMGA/UIAGM",
    photoStefan: "brand_assets/stefan-krasnan.jpg",
    photoStefanAlt: "Štefan Krasňan, horský vodca IFMGA/UIAGM",
    nameAnton: "Anton",
    nameStefan: "Štefan",
  },

  toursSection: {
    eyebrow: "Výber túry",
    heading: "Ktorý je váš vysnívaný vrch?",
    difficultyLabel: "Obtiažnosť:",
    priceFromLabel: "Od",
    priceOnRequestLabel: "Cena na vyžiadanie",
    guideRatioPrefix: "Max",
    guideRatioSuffix: "na vodcu",
    guideRatioUnit: { one: "osoba", few: "osoby", many: "osôb" },
    ctaLabel: "Viac info",
    ctaReserveLabel: "Rezervovať",
    callCtaLabel: "Zavolajte nám",
    showAllLabel: "Zobraziť všetkých {count} túr",
    showLessLabel: "Zobraziť menej",
  },

  seasonToggle: {
    heading: "Ktorý je váš vysnívaný vrch?",
    options: [
      { id: "leto", label: "Letné túry" },
      { id: "zima", label: "Zimné túry" },
    ],
    defaultSeason: "leto",
    regionLabels: { tatry: "Vysoké Tatry", alpy: "Alpy", svet: "Svet" },
    emptyState: "Žiadne túry v tejto kategórii.",
    liveAnnounceTemplate: "Zobrazené: {season} — {count} túr",
  },

  tours: [
    /* ===== LETO — Vysoké Tatry (show all) ===== */
    {
      id: "gerlach",
      slug: "gerlachovsky-stit",
      name: "Gerlachovský štít",
      location: "2655 m.n.m.",
      duration: "1 deň",
      difficulty: 3,
      priceFrom: 430,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      featured: true,
      image: "brand_assets/Gerlachovský.jpeg",
      imageAlt: "Výstup na Gerlachovský štít, najvyšší vrch Slovenska",
      description: "Najvyšší vrch Slovenska, dostupný jedine s horským vodcom. Výstup vedie zo Sliezskeho domu cez Velickú dolinu a exponovanú Velickú próbu istenú lanom. Z vrcholu sa otvára výhľad na celé Tatry a kus Slovenska, aký zdola nikdy neuvidíte.",
      link: "https://www.mountainsafari.sk/kurzy/gerlachovsky-stit/",
      meetingPoint: "Tatranská Polianka, Vysoké Tatry",
      meetingTime: "cca 4:00 – 7:30 (podľa sezóny a počasia)",
      pricingDetail: [
        { label: "1 osoba", price: 430, unit: "€" },
        { label: "2 osoby", price: 450, unit: "€ (225 €/os.)" },
        { label: "3 osoby", price: 500, unit: "€ (167 €/os.)" },
      ],
      // Zimná cena (november – apríl) existuje, ale Gerlachovský štít nemá vlastnú zimnú kartu
      // na mountainsafari.sk/sezona/zima/ — pozri poznámku v odpovedi, treba ujasniť s klientom.
      winterPricingDetail: [
        { label: "1 osoba", price: 450, unit: "€" },
        { label: "2 osoby", price: 500, unit: "€ (250 €/os.)" },
      ],
      routes: [
        { name: "Klasická trasa", duration: "8 h", maxGroup: 3 },
        { name: "Tatarkova ferrata", duration: "9 h", maxGroup: 2 },
        { name: "Martinova cesta", duration: "10–12 h", maxGroup: 2 },
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM vrátane jeho nákladov",
        "Požičanie výstroje (sedačka, prilba, cepín, mačky)",
      ],
      excluded: [
        "Transport Tatranská Polianka – Sliezsky dom a späť: 20 €/osoba",
      ],
    },
    {
      id: "mnich",
      slug: "mnich-druhy-mnich",
      name: "Mnich a Druhý Mních",
      location: "Druhý Mních 2172 m.n.m.",
      duration: "1 deň",
      difficulty: 2,
      priceFrom: 440,
      currency: "€",
      season: "leto",
      region: "tatry", // technically Poľské Tatry — no separate bucket in the data model, see report
      guideRatio: "2:1",
      showOnLp: true,
      featured: true,
      image: "brand_assets/Mníchovia.jpg",
      imageAlt: "Výstup na Mnich a Druhý Mních v poľských Tatrách",
      description: "Výstup na Mnich je skvelou príležitosťou začať dobrodružstvo zdolávania náročných tatranských štítov, ktoré nie sú dostupné turistickými chodníkmi. Výstup je horolezeckého charakteru, ale technická náročnosť je prístupná každému zdatnému turistovi.",
      link: "https://www.mountainsafari.sk/kurzy/mnich-a-zadni-mnich-v-polskych-tatrach/",
      meetingPoint: "Parkovisko na hraničnom prechode Lysá Poľana",
      pricingDetail: [
        { label: "1 osoba", price: 440, unit: "€" },
        { label: "2 osoby", price: 470, unit: "€ (235 €/os.)" },
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM vrátane jeho nákladov",
        "Požičanie výstroje (prilba, sedačka)",
        "Doprava Lysá Poľana – Morské Oko",
      ],
    },

    /* ===== LETO — Alpy (flagship trio: Grossglockner, Matterhorn, Mont Blanc) ===== */
    {
      id: "grossglockner",
      slug: "letny-grossglockner",
      name: "Letný Grossglockner",
      location: "3798 m.n.m.",
      duration: "1 deň",
      difficulty: 2,
      priceFrom: 650,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Letný grossglockner.jpg",
      imageAlt: "Výstup na Grossglockner, najvyšší vrch Rakúska",
      description: "Najvyšší vrch Rakúska a kráľ Vysokých Taur, ktorý sa do neba týči ako skalno-ľadovcová pyramída. Z vrcholu sa pred vami otvorí jeden z najďalekejších výhľadov vo Východných Alpách.",
      link: "https://www.mountainsafari.sk/kurzy/letny-grossglockner-najvyssi-stit-rakuska/",
      pricingDetail: [
        { label: "1 osoba", price: 650, unit: "€" },
      ],
      longDescription: [
        "Grossglockner (3 798 m) je najvyšší vrch Rakúska a kráľ Vysokých Taur (Hohe Tauern). Jeho skalno-ľadovcová pyramída patrí k najvýraznejším štítom celých Álp — väčšie prevýšenie nad okolím má v Alpách už len Mont Blanc. Prvovýstup sa podaril v roku 1800.",
        "Sprievodcovský výstup vedie klasickou normálkou (obtiažnosť PD) cez ľadovec a záverečný skalnatý hrebeň ku Glocknerscharte a na vrchol. Východiskom býva najvyššie položená rakúska chata Erzherzog-Johann-Hütte (Adlersruhe). Pod vrcholom sa rozprestiera najväčší rakúsky ľadovec Pasterze.",
      ],
    },
    {
      id: "matterhorn",
      slug: "matterhorn",
      name: "Matterhorn",
      location: "4478 m.n.m.",
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
      imageAlt: "Výstup na Matterhorn nad Zermattom vo Švajčiarsku",
      description: "Ikona Álp a jeden z najfotografovanejších vrcholov na svete. Náročný, exponovaný výstup po hrebeni Hörnligrat, vedený jeden na jedného s IFMGA vodcom pre maximálnu bezpečnosť a tempo šité na mieru.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-matterhorn-4478m/",
      meetingPoint: "Zermatt, Švajčiarsko",
      route: "Hörnli hrebeň (Hörnligrat)",
      routeDuration: "cca 8 h (výstup 4 h, zostup 4 h)",
      pricingDetail: [
        { label: "1 osoba, bez aklimatizačnej túry", price: 1400, unit: "€/osoba" },
        { label: "1 osoba, s aklimatizačnou túrou", price: 1900, unit: "€/osoba" },
      ],
      requirements: [
        "Extrémne dobrá kondícia — prevýšenie 1500+ m, 10+ h aktivity",
        "Exponované hrebeňové úseky s rizikom pádu",
        "Nutná predchádzajúca aklimatizácia",
        "Zručnosť s mačkami a cepínom (sneh, ľad, skala)",
        "Exponovaný terén 3.–4. stupňa UIAA",
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM",
        "Požičanie výstroje (cepín, mačky, prilba, sedačka)",
      ],
      excluded: [
        "Ubytovanie a strava na chate Hörnli (cca 150 €/noc s polpenziou)",
      ],
    },
    {
      id: "montblanc",
      slug: "mont-blanc",
      name: "Mont Blanc",
      location: "4808 m.n.m.",
      duration: "5 dní",
      difficulty: 3,
      priceFrom: 1700,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Mont blanc.jpg",
      imageAlt: "Výstup na Mont Blanc, najvyšší vrch Álp",
      description: "Pridajte sa k nám na nezabudnuteľné dobrodružstvo na vrchol Mont Blancu – legendárnu „strechu Európy“. V sprievode skúseného a certifikovaného horského vodcu sa bezpečne a sebavedome vydáte cez ľadovce, skalnaté hrebene a dychberúcu alpskú scenériu.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-mont-blanc-4808m/",
      meetingPoint: "Chamonix / Nid d'Aigle, Francúzsko",
      pricingDetail: [
        { label: "Dvojdňový výstup, 2 osoby", price: 1700, unit: "€" },
        { label: "Aklimatizačná túra (Francúzsko)", price: 600, unit: "€/deň" },
        { label: "Aklimatizačná túra (Švajčiarsko)", price: 800, unit: "€/deň" },
      ],
      pricingNote: "Program sa uvádza aj ako „od 2 900 €“ za celý 5-dňový program vrátane aklimatizácie a nocľahu na chate.",
      requirements: [
        "Bezpečná chôdza v náročnom exponovanom teréne",
        "Isté používanie mačiek a cepínu na ľade a firne",
        "Lezenie v obtiažnosti II (UIAA)",
        "Výborná fyzická kondícia",
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM",
        "Požičanie výstroje (cepín, mačky)",
      ],
      excluded: [
        "Ubytovanie a polpenzia na chatách, doprava lanovkami",
      ],
    },

    /* ===== LETO — Alpy (zvyšné túry, zobrazené na žiadosť klienta) ===== */
    {
      id: "eiger",
      slug: "eiger",
      name: "Eiger",
      location: "3970 m.n.m.",
      duration: "2 dni",
      difficulty: 4,
      priceFrom: 1500,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "1:1",
      showOnLp: true,
      image: "brand_assets/Eiger.webp",
      imageAlt: "Výstup na Eiger v Bernských Alpách",
      description: "Výstup na Eiger znamená zaradiť sa medzi elitných horolezcov. Táto hora je známa svojou dramatickou severnou stenou (Nordwand), ktorá získala prezývku „Stena smrti“. Pre mnohých horolezcov je výstup na Eiger nielen technickou výzvou, ale aj cestou do histórie alpského horolezectva.",
      link: "https://www.mountainsafari.sk/kurzy/vystup-na-eiger-3970m/",
      pricingDetail: [{ label: "1 osoba", price: 1500, unit: "€/osoba" }],
      longDescription: [
        "Eiger (3 970 m) v Bernských Alpách patrí k najznámejším a najrešpektovanejším štítom Álp. Preslávila ho takmer 1 800 m vysoká severná stena (Nordwand), pre svoju smrteľnú povesť prezývaná aj Mordwand — jedna z najväčších stien v celých Alpách. Prvovýstup na vrchol sa uskutočnil v roku 1858.",
        "Sprievodcovský výstup nevedie stenou, ale klasickou cestou — najčastejšie po hrebeni Mittellegi (prvovýstup 1921), najdlhšom hrebeni Eigeru s exponovaným skalno-ľadovým terénom. Ide o technicky náročný výstup pre skúsených horolezcov s výbornou kondíciou.",
      ],
    },
    {
      id: "obergabelhorn",
      slug: "obergabelhorn-arbengrat",
      name: "Obergabelhorn",
      location: "4063 m.n.m.",
      duration: "3 dni",
      difficulty: 5,
      priceFrom: 1600,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "1:1",
      showOnLp: true,
      image: "brand_assets/Obergabelhorn.jpg",
      imageAlt: "Výstup na Obergabelhorn cez hrebeň Arbengrat",
      description: "Štvortisícovka vo Valaiských Alpách, považovaná za najkrajší vrch regiónu. Trojdňový výstup vedie cez slávny hrebeň Arbengrat, jednu z veľkých klasík Západných Álp, s pevnou skalou a nádhernou hrebeňovou traťou. Náročný zážitok pre skúsených, často korunovaný východom slnka priamo na hrebeni.",
      link: "https://www.mountainsafari.sk/kurzy/obergabelhorn-arbengrat/",
      meetingPoint: "Zermatt, pri železničnej stanici",
      pricingDetail: [
        { label: "1 osoba", price: 1600, unit: "€" },
      ],
      longDescription: [
        "Trojdňový program vychádza zo Zermattu. Prvý deň sa presuniete lanovkou na Schwarzsee a prejdete k biwaku Arbenbiwak (cca 4 hodiny, prípadne celým údolím 5–6 hodín). Druhý deň vedie výstup slávnym hrebeňom Arbengrat na vrchol Obergabelhornu, ďalej cez Wellenkuppe na chatu Rothornhütte. Tretí deň zostúpite späť do Zermattu.",
        "Arbengrat je jednou z veľkých klasík Západných Álp — pevná skala, exponovaná hrebeňová trať a nezabudnuteľné výhľady, často korunované východom slnka priamo na hrebeni.",
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM vrátane jeho nákladov",
        "Ubytovanie a polpenzia na chate Rothornhütte",
        "Požičanie výstroje (cepín, mačky)",
      ],
      requirements: [
        "Istá chôdza v náročnom exponovanom teréne (tráva, skala, sneh)",
        "Isté používanie mačiek a cepínu",
        "Lezenie v obtiažnosti III (UIAA)",
        "Výborná fyzická kondícia na dlhé výstupy",
      ],
    },
    {
      id: "ortler",
      slug: "ortler-hintergrat",
      name: "Ortler - Hintergrat",
      location: "3905 m.n.m.",
      duration: "2 dni",
      difficulty: 4,
      priceFrom: 500,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Ortler - HINTERGRAT.jpg",
      imageAlt: "Výstup na Ortler po hrebeni Hintergrat",
      description: "Najvyšší vrch Južného Tirolska, majestátny ľadovo-skalný kolos opradený starou legendou. Dvojdňový výstup vedie po legendárnom hrebeni Hintergrat, jednej z klasík Východných Álp, so striedaním firnu a skaly. Veľká túra pre skúsených, na ktorú sa nezabúda.",
      link: "https://www.mountainsafari.sk/kurzy/ortler-hintergtat/",
      meetingPoint: "Chata Hintergrathütte (parkovisko Langenstein, cca 1 h chôdze chodníkom č. 3)",
      meetingTime: "Príchod na chatu najneskôr do 17:30",
      pricingDetail: [
        { label: "1 osoba", price: 1000, unit: "€" },
        { label: "2 osoby", price: 500, unit: "€/os. (spolu 1000 €)" },
      ],
      longDescription: [
        "Prvý deň prídete poobede na chatu Hintergrathütte, kde sa ubytujete, pripravíte výstroj a spoločne navečeriate. Druhý deň sú raňajky o 3:30 a o 4:00 sa vydáte na vrchol.",
        "Výstup vedie po legendárnom hrebeni Hintergrat (4–5 hodín), zostup po normálnej ceste (Normalweg) cez chatu Payerhütte a ďalej do Suldenu (cca 2,5 h). Celý deň predstavuje až 12 hodín aktivity vo vysokohorskom prostredí.",
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM vrátane jeho nákladov",
        "Ubytovanie a polpenzia na chate Hintergrathütte",
        "Požičanie výstroje (cepín, mačky)",
      ],
      requirements: [
        "Prevýšenie až 1200 m za 6 hodín, spolu okolo 2000 m",
        "Bez závratov v exponovanom teréne (skala, ľad)",
        "Lezenie v obtiažnosti III (UIAA)",
        "Isté používanie mačiek a cepínu",
      ],
    },

    /* ===== ZIMA — Vysoké Tatry (show all) ===== */
    {
      id: "zimny-lomnicky-stit",
      slug: "zimny-lomnicky-stit",
      name: "Zimný Lomnický štít",
      location: "2634 m.n.m.",
      duration: "1 deň",
      difficulty: 3,
      priceFrom: 370,
      currency: "€",
      season: "zima",
      region: "tatry",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/Lomnický.jpg",
      imageAlt: "Zimný výstup na Lomnický štít vo Vysokých Tatrách",
      description: "Zimný výstup na druhý najvyšší vrchol Vysokých Tatier. Klasická cesta, Birkenmajer alebo Téryho kuloár — aj týmito cestami môžete v zime vystúpiť na Lomnický štít.",
      link: "https://www.mountainsafari.sk/kurzy/zimny-lomnicak-2-634m/",
      pricingDetail: [
        { label: "1 osoba", price: 370, unit: "€" },
        { label: "2 osoby", price: 420, unit: "€" },
      ],
      meetingPoint: "Infocentrum lyžiarske stredisko Tatranská Lomnica alebo Starý Smokovec – Hrebienok (podľa trasy); individuálne možný aj začiatok od Skalnatej alebo Zamkovského chaty. Na Lomnické sedlo vedie aj lanovka z Tatranskej Lomnice.",
      meetingTime: "8:00",
      routes: [
        { name: "Klasická cesta z Lomnického sedla" },
        { name: "Birkenmajerova hrana" },
        { name: "Téryho kuloár a Jordánová cesta" },
      ],
      included: [
        "Plánovanie a realizácia horským vodcom UIAGM vrátane jeho nákladov",
        "Požičanie horolezeckej výstroje (prilba, mačky, cepín, sedačka)",
        "Požičanie lavínovej výstroje (vyhľadávač, lopatka, sonda)",
      ],
      note: "Pri dobrých snehových podmienkach je možné uskutočniť kombinovanú skialpinisticko-horolezeckú túru s výstupom zo Skalnatej doliny alebo Malej Studenej doliny a lyžovaním viacerými variantami podľa lyžiarskej úrovne a schopností.",
    },
  ],

  process: {
    eyebrow: "Ako to prebieha",
    heading: "Ako to prebieha?",
    steps: [
      { number: 1, title: "Vyberte si vrchol", description: "Vyberte si svoj vysnívaný vrchol a napíšte nám cez formulár alebo nám zavolajte.", icon: "icon-pin" },
      { number: 2, title: "Konzultácia", description: "Spolu prejdeme vaše skúsenosti a kondíciu. Dohodneme termín a poradíme, čo všetko budete potrebovať.", icon: "icon-mail" },
      { number: 3, title: "Stále sme v kontakte", description: "Až do dňa výstupu vám odpovedáme na otázky a sledujeme podmienky.", icon: "icon-route" },
      { number: 4, title: "Túra", description: "Stretneme sa na dohodnutom mieste a vyrazíme.", icon: "icon-clock" },
    ],
    ctaLabel: "Rezervovať termín",
  },

  testimonialsSection: {
    heading: "Slová našich klientov",
    ctaLabel: "Rezervovať",
    // PLACEHOLDER — real quotes pending, see README "Placeholder checklist".
    // wistiaId is optional per item: card renders as a video testimonial when set,
    // or falls back to a text-only quote card (with avatarImage) when omitted.
    items: [
      {
        id: "t1",
        quote: "[Najlepší zážitok v horách, aký sme kedy mali.]",
        name: "Andrea",
        wistiaId: "76mzm8drx9",
        avatarImage: "https://placehold.co/120x120/1a2234/7b96c9?text=Foto",
      },
      {
        id: "t2",
        quote: "[Cítili sme sa v bezpečí od prvej minúty.]",
        name: "Marek",
        wistiaId: "9i0tnerz8t",
        avatarImage: "https://placehold.co/120x120/1a2234/7b96c9?text=Foto",
      },
      {
        id: "t3",
        quote: "[Profesionalita a ľudský prístup zároveň.]",
        name: "Miška",
        wistiaId: "lzcq83z32w",
        avatarImage: "https://placehold.co/120x120/1a2234/7b96c9?text=Foto",
      },
    ],
  },

  gallerySection: {
    eyebrow: "Momentky z hôr",
    heading: "Zážitky na celý život",
    bgImage: "brand_assets/Background.jpg",
    bgImageAlt: "",
    ctaLabel: "Rezervovať",
    images: [
      { src: "brand_assets/Gallery 1.jpg", alt: "[Fotografia z výstupu 1]" },
      { src: "brand_assets/Gallery2.jpg", alt: "[Fotografia z výstupu 2]" },
      { src: "brand_assets/GALLERY3.webp", alt: "[Fotografia z výstupu 3]" },
      { src: "brand_assets/Gallery4.jpg", alt: "[Fotografia z výstupu 4]" },
      { src: "brand_assets/gallery5.jpg", alt: "[Fotografia z výstupu 5]" },
      { src: "brand_assets/Gallery6.jpg", alt: "[Fotografia z výstupu 6]" },
    ],
  },

  faqSection: {
    heading: "Časté otázky",
    morePrompt: "Nenašli ste odpoveď na svoju otázku?",
    moreLinkLabel: "Pozrite si všetky časté otázky",
    moreLinkHref: "https://www.mountainsafari.sk/faq/",
    items: [
      { question: "Čo všetko je v cene?", answer: "V cene je horský vodca s licenciou UIAGM/IFMGA, jeho vedenie a istenie počas celého výstupu, posúdenie podmienok a naplánovanie túry. Špecializovaný výstroj vám v prípade potreby zapožičiame, stačí dať vedieť vopred. Ostatné náklady ako ubytovanie na chate či parkovanie vám vždy povieme dopredu, aby ste mali jasný prehľad ešte pred rezerváciou." },
      { question: "Akú kondíciu potrebujem?", answer: "Túru vyberáme podľa vašej kondície a skúseností, nie naopak. Pred výstupom sa vás opýtame na pár vecí a odporučíme vrchol, ktorý zvládnete. Od ľahších túr pre úplných začiatočníkov až po náročné výstupy. Tempo nastavíme na vás, nikoho neženieme a nikto nezostane pozadu. Veľa ľudí u nás vyšlo na svoj prvý vrchol aj bez akýchkoľvek skúseností s lanom." },
      { question: "Čo ak sa pokazí počasie v deň výstupu?", answer: "Ak podmienky nie sú vhodné, nikam vás netlačíme. Vrátime vám peniaze v plnej výške, alebo — ak chcete — dohodneme náhradný termín. Rozhodnutie je na vás." },
      { question: "Idem sám. Nie je to problém?", answer: "Vôbec nie, veľa klientov ide bez partie. Chodíme v malých skupinách a dávame pozor na každého. Ak chcete súkromný výstup len pre seba alebo svojich blízkych, aj to vieme zariadiť." },
      // PLACEHOLDER — real insurance policy pending confirmation, see README / Proposal Part 5, open question 2.
      { question: "Je poistka v cene?", answer: "Poistka nie je automaticky súčasťou ceny — pred výstupom vám vieme poradiť, akú poistku si zabezpečiť, prípadne vám ju pomôžeme dojednať." },
      { question: "Kedy sa dá ísť?", answer: "Letné túry organizujeme približne od júna do októbra, zimné od decembra do apríla. Presný termín si dohodneme telefonicky alebo cez formulár — zvyčajne do 24 hodín." },
    ],
  },

  finalCta: {
    line1: "Ak chcete prekonať svoje limity a mať zážitok na celý život…",
    line2: "Rezervujte si cestu na vrchol s horským vodcom, ktorému môžete veriť.",
    ctaLabel: "Rezervujte si cestu na vrchol",
    cutoutImage: "brand_assets/Gallery6.jpg",
    cutoutAlt: "Anton Sedlák a Štefan Krasňan pri výstupe v horách",
    trustHeading: "S kým spolupracujeme",
    partnerLogos: [
      { src: "brand_assets/uiagm-1.webp", alt: "IFMGA / UIAGM / IVBV" },
      { src: "brand_assets/Partner 2.jpg", alt: "Fjällräven" },
      { src: "brand_assets/SKIBA Partner.jpg", alt: "SKIBA" },
    ],
  },

  footer: {
    logoText: "Mountain Safari",
    linksHeading: "[Navigácia]",
    guidesHeading: "[Sprievodcovia]",
    guides: [
      { name: "Anton Sedlák", phone: "+421903624085", phoneDisplay: "+421 903 624 085" },
      { name: "Štefan Krasňan", phone: "+421904295135", phoneDisplay: "+421 904 295 135" },
    ],
    email: "info@mountainsafari.sk",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/mtn_safari/?hl=en" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61568565786611" },
    ],
    credentialsNote: "IFMGA · UIAGM · IVBV licencovaní sprievodcovia · členovia NAHVSR",
    copyrightName: "Mountain Safari",
  },

  modal: {
    title: "Rezervovať výstup",
    fields: {
      name: { label: "Meno a priezvisko", placeholder: "Ján Mandúch", required: true },
      phone: { label: "Telefón", placeholder: "+421 888 888 888", required: true },
      email: { label: "E-mail", placeholder: "jan@gmail.com", required: true },
      tour: { label: "Ktorý výstup", placeholderOption: "Vyberte výstup", otherOptionLabel: "Iné / neviem", required: true },
      date: { label: "Preferovaný termín", placeholder: "1.1.2026", required: false },
      message: { label: "Správa", placeholder: "", required: false },
    },
    submitLabel: "Odoslať dopyt",
    submitLoadingLabel: "Odosielam…",
    errorMessage: "Niečo sa pokazilo. Skúste to prosím znova, alebo nás kontaktujte cez WhatsApp.",
    whatsappFallbackLabel: "Radšej cez WhatsApp?",
    closeLabel: "Zavrieť",
    errors: {
      required: "Toto pole je povinné.",
      invalidEmail: "Zadajte platný e-mail.",
      invalidPhone: "Zadajte platné telefónne číslo.",
    },
  },

  whatsapp: {
    phone: "421903624085",
    prefilledMessage: "Dobrý deň, mám záujem o výstup s Mountain Safari.",
    fabAriaLabel: "Kontaktovať cez WhatsApp",
  },

  thankYou: {
    eyebrow: "Rezervácia prijatá",
    title: "Ďakujeme!",
    greeting: "Ďakujeme, {name}!",
    summaryWithDate: "Vaša rezervácia na výstup {tour} v termíne {date} bola úspešne prijatá.",
    summaryNoDate: "Vaša rezervácia na výstup {tour} bola úspešne prijatá.",
    reassurance: "Ozveme sa vám čo najskôr — zvyčajne do 24 hodín.",
    guidesNote: "Naši horskí sprievodcovia sú licencovaní IFMGA / UIAGM / IVBV — vaše hory budú v tých najistejších rukách.",
    whatsappIntro: "Potrebujete niečo doriešiť skôr?",
    whatsappLabel: "Napísať na WhatsApp",
    backHomeLabel: "Späť na hlavnú stránku",
  },

  tracking: {
    ga4MeasurementId: "G-XXXXXXXXXX",
    googleAdsId: "AW-XXXXXXXXX",
    convLabelLead: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
    convLabelWhatsapp: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
    // PLACEHOLDER — create a "Phone call" conversion action in Google Ads and paste its AW-.../label value here.
    convLabelPhone: "AW-XXXXXXXXX/XXXXXXXXXXXXXXXXXXXX",
  },

  appsScriptUrl: "https://script.google.com/macros/s/AKfycby7nJ-gsmA9LbRnbzQWlRQk8Hj9jegqebFdp9T1L6TqKmxht92PCVRwdAVvyRVitvcmAw/exec",

  devMode: false,

  /* ===== SITE — absolute URLs for SEO (canonical / Open Graph / JSON-LD / sitemap).
     PLACEHOLDER baseUrl — swap for the real production domain before launch. ===== */
  site: {
    baseUrl: "https://www.mountainsafari.sk",
    name: "Mountain Safari",
    defaultOgImage: "brand_assets/Gerlachovský.jpeg",
    ogLocale: "sk_SK",
  },

  /* ===== TOUR DETAIL PAGES — Slovak UI labels for the per-tour sub-pages (/tury/<slug>.html).
     Copy only; the page structure lives in assets/tour.js. ===== */
  tourDetail: {
    breadcrumbHome: "Domov",
    breadcrumbTours: "Túry",
    backToTours: "Všetky túry",
    overviewHeading: "O výstupe",
    pricingHeading: "Cenník",
    pricingSeasonSummer: "Leto",
    pricingSeasonWinter: "Zima",
    routesHeading: "Trasy výstupu",
    routeColName: "Trasa",
    routeColDuration: "Trvanie",
    routeColGroup: "Max. skupina",
    routeGroupUnit: "os.",
    inclusionHeading: "Čo je v cene",
    includedHeading: "Cena zahŕňa",
    excludedHeading: "Cena nezahŕňa",
    requirementsHeading: "Náročnosť a požiadavky",
    logisticsHeading: "Miesto a čas stretnutia",
    meetingPointLabel: "Miesto stretnutia",
    meetingTimeLabel: "Čas stretnutia",
    meetingTbd: "Presné miesto a čas stretnutia vám potvrdíme pri rezervácii.",
    meetingDisclaimerTitle: "Dôležité — dochvíľnosť:",
    meetingDisclaimer: "Na miesto stretnutia príďte, prosím, presne v dohodnutom čase. Výstup je časovo aj poveternostne náročný a už aj malé meškanie môže ohroziť bezpečnosť, správne načasovanie túry alebo úplne znemožniť jej uskutočnenie.",
    galleryHeading: "Galéria",
    policiesHeading: "Podmienky a storno",
    faqHeading: "Časté otázky",
    relatedHeading: "Ďalšie výstupy, ktoré by vás mohli zaujať",
    // Sidebar / booking card
    quickFactsHeading: "Rýchly prehľad",
    durationLabel: "Trvanie",
    difficultyLabel: "Náročnosť",
    guideRatioLabel: "Pomer vodcu",
    meetingLabel: "Nástup",
    priceFromLabel: "od",
    priceOnRequestLabel: "Cena na vyžiadanie",
    bookCtaLabel: "Rezervovať výstup",
    callCtaLabel: "Zavolajte nám",
    whatsappCtaLabel: "Napíšte na WhatsApp",
    reassurance: "Nezáväzný dopyt • odpovieme do 24 hodín",
  },

  /* ===== TOUR DEFAULTS — placeholder scaffolding used when a tour lacks its own
     gallery / requirements / policies / long copy. Client replaces per tour later.
     PLACEHOLDER: policy/disclaimer wording must be reviewed with the client/legal before launch. ===== */
  tourDefaults: {
    longDescription: [
      "Tento výstup vedú výhradne licencovaní horskí vodcovia (IFMGA/UIAGM), ktorí poznajú terén, počasie aj podmienky ako málokto. Celý deň sa venujeme jednej skupine — tempo aj trasu prispôsobíme vašim skúsenostiam a aktuálnym podmienkam v horách.",
      "Bezpečnosť je u nás na prvom mieste. Pred výstupom si spoločne prejdeme plán, techniku aj výstroj, a počas celej túry ste pod dohľadom vodcu. Cieľom nie je len vrchol — ale zážitok, na ktorý budete spomínať celý život.",
    ],
    requirements: [
      "Dobrá fyzická kondícia primeraná dĺžke a prevýšeniu túry",
      "Bez závratov v exponovanom teréne",
      "Ochota rešpektovať pokyny horského vodcu",
      "Vhodné oblečenie a obuv do hôr (výstroj vieme zapožičať)",
    ],
    gallery: [
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+1", alt: "Placeholder — fotografia z výstupu" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+2", alt: "Placeholder — fotografia z výstupu" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+3", alt: "Placeholder — fotografia z výstupu" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+4", alt: "Placeholder — fotografia z výstupu" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+5", alt: "Placeholder — fotografia z výstupu" },
      { src: "https://placehold.co/900x1200/1a2234/7b96c9?text=Foto+6", alt: "Placeholder — fotografia z výstupu" },
    ],
    policies: [
      { title: "Počasie a bezpečnosť", body: "O konečnom termíne a realizácii rozhoduje horský vodca podľa aktuálnych podmienok. Pri nevhodnom počasí hľadáme náhradný termín — vaša bezpečnosť je prednejšia než vrchol." },
      { title: "Storno podmienky", body: "Termín je možné bezplatne presunúť po dohode vopred. Konkrétne storno podmienky vám potvrdíme pri rezervácii. [PLACEHOLDER — doplniť reálne podmienky.]" },
      { title: "Poistenie", body: "Odporúčame individuálne cestovné a úrazové poistenie do hôr vrátane záchrany v horskom teréne. Poistenie nie je súčasťou ceny." },
    ],
  },
};
