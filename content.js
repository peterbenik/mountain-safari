/*
  Mountain Safari — content data (Slovak / sk)
  Every copy string, tour, testimonial, FAQ and process step used by index.html
  lives in this single object. To add Polish, clone this file to content.pl.js,
  translate the string VALUES only (keep every key identical), and swap the
  <script src="content.js"> tag in index.html for <script src="content.pl.js">.
  main.js never contains hard-coded copy — it only reads from window.MS_CONTENT.

  DRAFT-CONTENT FLAG: the client replaced the summer lineup on 2026-08-18.
  Mnich, Grossglockner, Matterhorn, Eiger and Obergabelhorn were dropped;
  Lomnický štít, Ľadový štít, Vysoká and Monte Rosa were added in their place.
  All 7 "leto" tours and the single "zima" tour (zimny-lomnicky-stit) now have
  real copy, pricing and photography. The rest of the winter catalogue (skialp
  + kurzy) was removed on request and is being re-added one tour at a time.
  OPEN: Monte Rosa has no `included` list, and the monte-rosa-leto source photo
  is only 800x400 — soft on the detail-page hero. Both need client input.
*/
window.MS_CONTENT = {
  meta: {
    lang: "sk",
    siteTitle: "Mountain Safari — Horskí vodcovia Vysoké Tatry",
    metaDescription: "IVBV/UIAGM/IFMGA licencovaní horskí vodcovia vo Vysokých Tatrách. Súkromné výstupy šité na mieru — od ľahkých túr po náročné štíty.",
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
    badgeImage: "brand_assets/ivbv-ifmga-uiagm.webp",
    badgeImageAlt: "IVBV/UIAGM/IFMGA — certifikát horského vodcu",
    eyebrow: "Vysoké Tatry — zážitok na celý život",
    heading: "Dobrodružstvo, na ktoré budete spomínať celý život.",
    subheading: "Horskí vodcovia IVBV/UIAGM/IFMGA do Vysokých Tatier a Álp",
    ctaLabel: "Vyberte si vrchol",
    ctaHref: "#tours",
    ctaSecondaryLabel: "Mám otázku",
  },

  about: {
    eyebrow: "Kto na vás dá pozor?",
    heading: "Kto na vás dá pozor?",
    paragraph: [
      "Voláme sa Anton Sedlák a Štefan Krasňan.",
      "Sme dvaja horskí vodcovia s medzinárodnou licenciou **IVBV/UIAGM/IFMGA** a máme za sebou stovky úspešných výstupov vo Vysokých Tatrách a v Alpách.",
      "Tempo a trasu vám vždy nastavíme na mieru, aby ste to nielen zvládli, ale aj si to užili.",
      "Ak sú podmienky v deň výstupu nepriaznivé, nemáme problém **preložiť váš termín** alebo **vrátiť vám peniaze**.",
      "Váš zážitok z cesty na vrchol je pre nás priorita a urobíme všetko pre to, aby ste svoje limity prekonali tým najbezpečnejším spôsobom.",
      "Nie ste si istý, či by ste svoju túru zvládli?",
      "**Zavolajte nám.**",
    ],
    ctaPrimaryLabel: "Zavolajte nám",
    ctaSecondaryLabel: "Napíšte nám",
    photoAnton: "brand_assets/Anton.jpg",
    photoAntonAlt: "Anton Sedlák, horský vodca IVBV/UIAGM/IFMGA",
    photoStefan: "brand_assets/stefan-krasnan.jpg",
    photoStefanAlt: "Štefan Krasňan, horský vodca IVBV/UIAGM/IFMGA",
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
      location: "2655 m n.m.",
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
      description: "Výstup vedie zo Sliezskeho domu cez Velickú dolinu a exponovanú Velickú próbu istenú lanom. Z vrcholu sa otvára výhľad na celé Tatry a kus Slovenska, aký zdola nikdy neuvidíte.",
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
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA vrátane jeho nákladov",
        "Požičanie výstroje (sedačka, prilba, cepín, mačky)",
      ],
      excluded: [
        "Transport Tatranská Polianka – Sliezsky dom a späť: 20 €/osoba",
      ],
    },
    {
      id: "lomnicky",
      slug: "lomnicky-stit",
      name: "Lomnický štít",
      location: "2634 m n.m.",
      duration: "1 deň",
      difficulty: 2,
      priceFrom: 390,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      image: "brand_assets/lomnicky-stit-leto.webp",
      imageAlt: "Letný výstup na Lomnický štít vo Vysokých Tatrách",
      description: "Jeden z najvyšších a najikonickejších vrcholov Slovenska. Výstup na Lomnický štít vedie divokým vysokohorským terénom, mimo značených turistických chodníkov, cez skalné pasáže a exponované úseky istené lanom. Odmenou je vrchol vo výške 2 634 m a jedinečný výhľad na Vysoké Tatry, Belianske Tatry aj hlboko do slovenského a poľského vnútrozemia.",
      meetingPoint: "Tatranská Lomnica, Vysoké Tatry",
      meetingTime: "8:00",
      pricingDetail: [
        { label: "1 osoba", price: 390, unit: "€" },
        { label: "2 osoby", price: 430, unit: "€ (215 €/os.)" },
        { label: "3 osoby", price: 450, unit: "€ (150 €/os.)" },
      ],
      longDescription: [
        "Tento výstup vedú výhradne licencovaní horskí vodcovia (IVBV/UIAGM/IFMGA), ktorí dokonale poznajú terén, počasie aj aktuálne podmienky. Celý deň sa venujeme jednej skupine — tempo aj konkrétnu trasu prispôsobíme vašim skúsenostiam, kondícii a podmienkam v horách.",
        "Bezpečnosť je u nás na prvom mieste. Pred výstupom si spoločne prejdeme plán, techniku aj potrebnú výstroj a počas náročných pasáží ste istení lanom a neustále pod dohľadom vodcu. Cieľom nie je len stáť na vrchole Lomnického štítu — ale zažiť Tatry z perspektívy, ktorú z turistického chodníka nikdy neuvidíte.",
      ],
      routes: [
        { name: "Klasická cesta", duration: "6 h", maxGroup: 3 },
        { name: "Téryho kuloár", duration: "7 h", maxGroup: 2 },
        { name: "Medené lávky", duration: "8 h", maxGroup: 2 },
        { name: "Birkenmajerova hrana", duration: "6 h", maxGroup: 2 },
      ],
      included: [
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA vrátane jeho nákladov",
        "Požičanie výstroje (sedačka, prilba, cepín, mačky)",
      ],
      excluded: [
        "Transport Tatranská Lomnica – Lomnické sedlo a späť: cca 40 €/osoba (www.vt.sk)",
      ],
    },
    {
      id: "ladovy",
      slug: "ladovy-stit",
      name: "Ľadový štít",
      location: "2627 m n.m.",
      duration: "1 deň",
      difficulty: 3,
      priceFrom: 430,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      image: "brand_assets/ladovy-stit-leto.webp",
      imageAlt: "Výstup na Ľadový štít, tretí najvyšší vrch Slovenska",
      description: "Tretí najvyšší vrch Slovenska a jeden z najmohutnejších tatranských štítov. Výstup na Ľadový štít (2 627 m) vedie nádherným vysokohorským prostredím Malej Studenej doliny, okolo Téryho chaty a ďalej mimo značených turistických chodníkov cez strmé skalné a exponované hrebene. Z vrcholu sa otvára fantastický výhľad na najvyššie štíty Vysokých Tatier a okolité doliny.",
      meetingPoint: "Hrebienok alebo Téryho chata",
      meetingTime: "Hrebienok 4:00 – 6:00, Téryho chata 7:00 – 8:00",
      pricingDetail: [
        { label: "1 osoba", price: 430, unit: "€" },
        { label: "2 osoby", price: 470, unit: "€ (235 €/os.)" },
        { label: "3 osoby", price: 500, unit: "€ (167 €/os.)" },
      ],
      longDescription: [
        "Tento výstup vedú výhradne licencovaní horskí vodcovia (IVBV/UIAGM/IFMGA), ktorí dokonale poznajú terén, počasie aj aktuálne podmienky. Celý deň sa venujeme jednej skupine — tempo aj priebeh výstupu prispôsobíme vašim skúsenostiam, kondícii a podmienkam v horách.",
        "Bezpečnosť je u nás na prvom mieste. Pred výstupom si spoločne prejdeme plán, techniku aj potrebnú výstroj a v exponovaných pasážach ste istení lanom a pod neustálym dohľadom vodcu. Ľadový štít nie je len ďalší vrchol — je to poctivý vysokohorský deň v srdci Tatier a zážitok, na ktorý sa nezabúda.",
      ],
      routes: [
        { name: "Cesta cez Ľadového koňa", duration: "6 h", maxGroup: 3 },
        { name: "Hrebeň Ľadových štítov", duration: "7 h", maxGroup: 2 },
      ],
      included: [
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA vrátane jeho nákladov",
        "Požičanie výstroje (sedačka, prilba, cepín, mačky)",
      ],
    },
    {
      id: "vysoka",
      slug: "vysoka",
      name: "Vysoká",
      location: "2547 m n.m.",
      duration: "1 deň",
      difficulty: 3,
      priceFrom: 430,
      currency: "€",
      season: "leto",
      region: "tatry",
      guideRatio: "3:1",
      showOnLp: true,
      image: "brand_assets/vysoka-leto.webp",
      imageAlt: "Výstup na Vysokú vo Vysokých Tatrách",
      description: "Jeden z najkrajších a najcharakteristickejších vrcholov Vysokých Tatier. Vysoká (2 547 m) so svojím typickým dvojvrcholom patrí medzi tatranské klasiky. Výstup vedie cez Mengusovskú dolinu, okolo Popradského plesa a ďalej divokým vysokohorským terénom mimo značených turistických chodníkov. Záverečné skalné a exponované pasáže absolvujete istení lanom.",
      meetingPoint: "Popradské pleso",
      meetingTime: "4:00 – 6:00",
      pricingDetail: [
        { label: "1 osoba", price: 430, unit: "€" },
        { label: "2 osoby", price: 470, unit: "€ (235 €/os.)" },
        { label: "3 osoby", price: 500, unit: "€ (167 €/os.)" },
      ],
      longDescription: [
        "Z vrcholu sa otvára nádherný výhľad na Gerlach, Rysy, Končistú aj okolité tatranské doliny.",
        "Tento výstup vedú výhradne licencovaní horskí vodcovia (IVBV/UIAGM/IFMGA), ktorí dokonale poznajú terén, počasie aj aktuálne podmienky. Celý deň sa venujeme jednej skupine — tempo aj trasu prispôsobíme vašim skúsenostiam, kondícii a podmienkam v horách.",
        "Bezpečnosť je u nás na prvom mieste. Pred výstupom si spoločne prejdeme plán, techniku aj potrebnú výstroj a počas náročnejších pasáží ste istení lanom a pod dohľadom vodcu. Vysoká ponúka presne to, čo si človek predstaví pod skutočným tatranským dobrodružstvom — dlhý horský deň, lezenie, expozíciu a vrchol, na ktorý vedie cesta ďaleko od turistických chodníkov.",
      ],
      routes: [
        { name: "Klasická cesta", duration: "8 h", maxGroup: 3 },
        { name: "Koruna Vysokej", duration: "10 h", maxGroup: 2 },
      ],
      included: [
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA vrátane jeho nákladov",
        "Požičanie výstroje (sedačka, prilba, cepín, mačky)",
      ],
      excluded: [
        "Transport Popradské Pleso zastávka TEŽ – Hotel Popradské pleso: 10 €/osoba",
      ],
    },

    /* ===== LETO — Alpy ===== */
    {
      id: "montblanc",
      slug: "mont-blanc",
      name: "Mont Blanc",
      location: "4808 m n.m.",
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
      pricingNote: "Program sa uvádza aj ako „od 2 900 €“ za celý 5-dňový program vrátane aklimatizácie.",
      requirements: [
        "Bezpečná chôdza v náročnom exponovanom teréne",
        "Isté používanie mačiek a cepínu na ľade a firne",
        "Lezenie v obtiažnosti II (UIAA)",
        "Výborná fyzická kondícia",
      ],
      included: [
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA",
        "Požičanie výstroje (cepín, mačky)",
      ],
      excluded: [
        "Ubytovanie a polpenzia na chatách, doprava lanovkami",
      ],
    },
    {
      id: "monterosa",
      slug: "monte-rosa",
      name: "Monte Rosa",
      location: "4634 m n.m.",
      duration: "3 dni",
      difficulty: 4,
      priceFrom: 950,
      currency: "€",
      season: "leto",
      region: "alpy",
      guideRatio: "2:1",
      showOnLp: true,
      image: "brand_assets/monte-rosa-leto.webp",
      imageAlt: "Výstup na Dufourspitze v masíve Monte Rosa",
      description: "Najvyšší horský masív Švajčiarska a jedno z najväčších vysokohorských dobrodružstiev Álp. Cieľom je Dufourspitze (4 634 m) — najvyšší vrchol masívu Monte Rosa a druhý najvyšší vrch Álp. Výstup vedie svetom ľadovcov, obrovských snehových plání a vysokých štvortisícoviek, s panorámou Matterhornu a veľkej časti Západných Álp.",
      meetingPoint: "Zermatt, Švajčiarsko",
      pricingDetail: [
        { label: "1 osoba", price: 1700, unit: "€" },
        { label: "2 osoby", price: 950, unit: "€/os. (spolu 1900 €)" },
      ],
      longDescription: [
        "Na rozdiel od jednodňových tatranských výstupov je Monte Rosa skutočná vysokohorská expedícia. Výstupu predchádza aklimatizácia a noc na horskej chate. Samotný vrcholový deň začína ešte za tmy a vedie cez rozsiahly ľadovec až k záverečnému exponovanému hrebeňu Dufourspitze, kde sa kombinuje pohyb v mačkách, istenie lanom a ľahké skalné lezenie.",
        "Výstup vedú licencovaní horskí vodcovia IVBV/UIAGM/IFMGA. Počas celej túry ste naviazaní na lane a vodca rozhoduje o trase podľa aktuálnych podmienok na ľadovci, počasia a vašej kondície. Tempo a program prispôsobíme tak, aby ste mali čo najlepšiu šancu bezpečne dosiahnuť vrchol.",
        "Monte Rosa nie je len o nadmorskej výške 4 634 metrov. Je to prvý krok do sveta veľkých alpských výstupov — ľadovce, svitanie vo výške 4 000 metrov a pocit stáť na jednom z najvyšších miest Európy.",
      ],
      requirements: [
        "Bezpečná chôdza v náročnom exponovanom teréne",
        "Isté používanie mačiek a cepínu na ľade a firne",
        "Lezenie v obtiažnosti II (UIAA)",
        "Výborná fyzická kondícia",
      ],
    },

    {
      id: "ortler",
      slug: "ortler-hintergrat",
      name: "Ortler - Hintergrat",
      location: "3905 m n.m.",
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
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA vrátane jeho nákladov",
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
      location: "2634 m n.m.",
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
        "Plánovanie a realizácia horským vodcom IVBV/UIAGM/IFMGA vrátane jeho nákladov",
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
      { question: "Čo všetko je v cene?", answer: "V cene je horský vodca s licenciou IVBV/UIAGM/IFMGA, jeho vedenie a istenie počas celého výstupu, posúdenie podmienok a naplánovanie túry. Špecializovaný výstroj vám v prípade potreby zapožičiame, stačí dať vedieť vopred. Ostatné náklady ako ubytovanie na chate či parkovanie vám vždy povieme dopredu, aby ste mali jasný prehľad ešte pred rezerváciou." },
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
    // IVBV/UIAGM/IFMGA sem nepatrí — je to kvalifikácia vodcov, nie partner.
    // Žije ako trust badge v hero sekcii.
    partnerLogos: [
      { src: "brand_assets/Partner 2.jpg", alt: "Fjällräven" },
      { src: "brand_assets/SKIBA Partner.jpg", alt: "SKIBA" },
    ],
  },

  footer: {
    logoText: "Mountain Safari",
    linksHeading: "[Navigácia]",
    guidesHeading: "[Vodcovia]",
    guides: [
      { name: "Anton Sedlák", phone: "+421903624085", phoneDisplay: "+421 903 624 085" },
      { name: "Štefan Krasňan", phone: "+421904295135", phoneDisplay: "+421 904 295 135" },
    ],
    email: "info@mountainsafari.sk",
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/mtn_safari/?hl=en" },
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61568565786611" },
    ],
    credentialsNote: "IVBV/UIAGM/IFMGA licencovaní vodcovia · členovia NAHVSR",
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
    guidesNote: "Naši horskí vodcovia sú licencovaní IVBV/UIAGM/IFMGA — vaše hory budú v tých najistejších rukách.",
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
      "Tento výstup vedú výhradne licencovaní horskí vodcovia (IVBV/UIAGM/IFMGA), ktorí poznajú terén, počasie aj podmienky ako málokto. Celý deň sa venujeme jednej skupine — tempo aj trasu prispôsobíme vašim skúsenostiam a aktuálnym podmienkam v horách.",
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
      // Zámerne bez konkrétnych termínov/percent — klient ich nemá určené, platba
      // často nejde vopred, takže storno sa rieši individuálne pri rezervácii.
      { title: "Storno podmienky", body: "Termín je možné bezplatne presunúť po dohode vopred. Konkrétne storno podmienky vám potvrdíme pri rezervácii." },
      { title: "Poistenie", body: "Odporúčame individuálne cestovné a úrazové poistenie do hôr vrátane záchrany v horskom teréne. Poistenie nie je súčasťou ceny." },
    ],
  },
};
