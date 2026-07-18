/** Central image registry — curated Unsplash photography, consistent crop/quality params. */
function u(id, { w = 1600, q = 80 } = {}) {
  return `https://images.unsplash.com/${id}?q=${q}&w=${w}&auto=format&fit=crop`;
}

export const img = {
  villaExterior1: u("photo-1600596542815-ffad4c1539a9"),
  villaExterior2: u("photo-1613977257363-707ba9348227"),
  villaExterior3: u("photo-1580587771525-78b9dba3b914"),
  buildingModern1: u("photo-1512917774080-9991f1c4c750"),
  buildingModern2: u("photo-1600607687939-ce8a6c25118c"),
  buildingModern3: u("photo-1545324418-cc1a3fa10c00"),

  livingRoom1: u("photo-1600210492486-724fe5c67fb0"),
  livingRoom2: u("photo-1616486338812-3dadae4b4ace"),
  kitchen1: u("photo-1600585154340-be6161a56a0c"),
  bedroom1: u("photo-1616594039964-ae9021a400a0"),
  bathroom1: u("photo-1584622650111-993a426fbf0a"),
  diningRoom1: u("photo-1617806118233-18e1de247200"),

  skyline1: u("photo-1477959858617-67f85cf4f1df"),
  skylineAerial1: u("photo-1449844908441-8829872d2607"),
  skylineNight1: u("photo-1519501025264-65ba15a82390"),

  office1: u("photo-1497366216548-37526070297c"),
  office2: u("photo-1497366754035-f200968a6e72"),
  retail1: u("photo-1568992687947-868a62a9f521"),
  warehouse1: u("photo-1587293852726-70cdb56c2866"),

  landPlot1: u("photo-1500382017468-9049fed747ef"),
  landAerial1: u("photo-1500937386664-56d1dfef3854"),

  pool1: u("photo-1584735175315-9d5df23860e6"),
  gym1: u("photo-1571902943202-507ec2618e8f"),
  clubhouse1: u("photo-1519167758481-83f550bb49b3"),
  garden1: u("photo-1416879595882-3373a0480b5b"),

  blueprint1: u("photo-1503387762-592deb58ef4e"),

  heroDusk1: u("photo-1600585154526-990dced4db0d", { w: 2000 }),
  heroDusk2: u("photo-1613490493576-7fde63acd811", { w: 2000 }),
  heroSkyline: u("photo-1523217582562-09d0def993a6", { w: 2000 }),

  lobby1: u("photo-1497366811353-6870744d04b2"),
  balcony1: u("photo-1502672260266-1c1ef2d93688"),
  homeOffice1: u("photo-1524758631624-e2822e304c36"),
  aerialCommunity1: u("photo-1600585152220-90363fe7e115"),
};

export function avatar(seed) {
  return `https://i.pravatar.cc/256?img=${seed}`;
}
