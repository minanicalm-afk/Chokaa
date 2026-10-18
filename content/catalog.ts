import type {
  Insight,
  Project,
  Service,
  Testimonial,
} from "@/lib/types";

const at = (iso: string) => new Date(iso);

export const catalogProjects: Project[] = [
  {
    id: "01M58NNAPY21NF4ZAQS09SEGC4",
    slug: "house-on-mimosa-runda",
    name: "House on Mimosa",
    sector: "residential",
    location: "Runda, Nairobi",
    county: "Nairobi",
    year: 2024,
    duration: "11 months",
    role: "Main contractor",
    contractBand: "KSh 20–50M",
    status: "completed",
    summary:
      "A single-storey house on a quiet close in Runda. The clients wanted one long roof, a shaded arrival, and a drive that would take the long rains without turning to mud.\n\nWe were main contractor from setting out to handover. The frame is reinforced concrete, the walls are limestone-coloured render, and the soffit is lined in timber so the overhang reads as one plane. Windows sit back in the shade. The forecourt is interlocking pavers on a compacted base, falling to a soak pit at the low corner, where the red soil used to hold water.\n\nNairobi City County approvals were in hand before we broke ground. The programme ran eleven months, including a pause while ironmongery cleared the port. Handover was a snag list, as-built notes for the drainage, and one return visit to close it.",
    scope: [
      "Substructure and reinforced frame",
      "Limestone render and timber soffit",
      "Aluminium windows and hardwood doors",
      "Cabro forecourt and storm drainage",
      "Joinery, painting, and handover",
    ],
    coverImage: "/images/runda-house.jpg",
    gallery: [
      "/images/runda-house.jpg",
      "/images/timber-interior.jpg",
      "/images/masonry-detail.jpg",
    ],
    beforeImage: null,
    afterImage: null,
    latitude: -1.2084,
    longitude: 36.8122,
    featured: false,
    createdAt: at("2024-11-02T00:00:00.000Z"),
    updatedAt: at("2024-11-02T00:00:00.000Z"),
    deletedAt: null,
  },
  {
    id: "01M58NNAQ1JCJJ9GCNVDWM57C9",
    slug: "boundary-and-drive-karen",
    name: "Boundary and drive",
    sector: "civil",
    location: "Karen, Nairobi",
    county: "Nairobi",
    year: 2023,
    duration: "4 months",
    role: "Main contractor",
    contractBand: "KSh 5–20M",
    status: "completed",
    summary:
      "A dressed-stone boundary and a new drive for a house that already stood. The old chain-link and the murram entrance were both failing, and the gate posts had leaned after two heavy seasons.\n\nWe rebuilt the frontage in machine-cut stone on a proper footing, with a coping and weepholes, and laid charcoal and terracotta cabro from the gate to the garage. The base is hardcore and sand, not a skim over the old murram. Levels were set so water leaves the drive instead of sitting against the wall.\n\nThe final account stayed inside the band we issued at tender. The clients tell us the drain still clears through the long rains.",
    scope: [
      "Demolition of the old fence and entrance",
      "Footings, columns, and dressed stone wall",
      "Vehicle and pedestrian gates",
      "Cabro drive, edging, and drainage",
    ],
    coverImage: "/images/karen-drive.jpg",
    gallery: ["/images/karen-drive.jpg", "/images/cabro-detail.jpg", "/images/masonry-detail.jpg"],
    beforeImage: null,
    afterImage: null,
    latitude: -1.3197,
    longitude: 36.708,
    featured: true,
    createdAt: at("2023-09-14T00:00:00.000Z"),
    updatedAt: at("2023-09-14T00:00:00.000Z"),
    deletedAt: null,
  },
  {
    id: "01M58NNAQ1E07GBQ6KYP4ERW97",
    slug: "office-fit-out-westlands",
    name: "Office fit-out",
    sector: "commercial",
    location: "Westlands, Nairobi",
    county: "Nairobi",
    year: 2025,
    duration: "5 months",
    role: "Main contractor",
    contractBand: "KSh 5–20M",
    status: "completed",
    summary:
      "A floor of an existing Westlands block, stripped back to the slab and rebuilt as a quiet office. The landlord’s shell was sound. The brief was a reception that did not shout, meeting rooms that hold a conversation, and services that can be serviced.\n\nWe coordinated the landlord, the mechanical contractor, and the joinery shop. Walls are a pale limestone tile, the reception desk is one length of timber, and the floor is polished concrete left from the shell and brought level. Ceilings are high enough to hide the new air-conditioning without a heavy grid.\n\nWork happened around the occupied floors below, so noisy tasks were programmed early and deliveries used the service lift after hours. Practical completion was on the date in the programme.",
    scope: [
      "Strip-out and making good",
      "Partitions, doors, and joinery",
      "Electrical, data, and air-conditioning coordination",
      "Floor finishes, painting, and reception desk",
    ],
    coverImage: "/images/westlands-office.jpg",
    gallery: ["/images/westlands-office.jpg", "/images/timber-interior.jpg"],
    beforeImage: null,
    afterImage: null,
    latitude: -1.2674,
    longitude: 36.811,
    featured: true,
    createdAt: at("2025-06-20T00:00:00.000Z"),
    updatedAt: at("2025-06-20T00:00:00.000Z"),
    deletedAt: null,
  },
  {
    id: "01M58NNAQ1DNHM5TK5YC7GHN2K",
    slug: "house-renovation-kiambu",
    name: "House renovation",
    sector: "renovation",
    location: "Kiambu",
    county: "Kiambu",
    year: 2024,
    duration: "7 months",
    role: "Main contractor",
    contractBand: "KSh 5–20M",
    status: "completed",
    summary:
      "A single-storey family house on the edge of Kiambu town. The mabati roof had rusted through at the laps, the render had left the walls, and the path to the door was a line of broken concrete in red soil.\n\nWe kept the plan. The work was a new roof covering and battens, replaster and limewash, new timber windows, rebuilt steps, and a cabro path that a person can walk in the rain. Wiring and plumbing were replaced where the old runs were no longer safe. The garden was left to the family; we only made the ground against the walls fall away from the building.\n\nSeven months, lived around for the first half and empty for the finishes. The before and after photographs are of the same elevation, taken from the same spot.",
    scope: [
      "Roof repairs and new covering",
      "Hack off failed render, replaster, limewash",
      "New timber windows and doors",
      "Rewire and replumb of failed runs",
      "Cabro path and surface drainage",
    ],
    coverImage: "/images/kiambu-after.jpg",
    gallery: ["/images/kiambu-after.jpg", "/images/kiambu-before.jpg"],
    beforeImage: "/images/kiambu-before.jpg",
    afterImage: "/images/kiambu-after.jpg",
    latitude: -1.1714,
    longitude: 36.8356,
    featured: true,
    createdAt: at("2024-04-18T00:00:00.000Z"),
    updatedAt: at("2024-04-18T00:00:00.000Z"),
    deletedAt: null,
  },
  {
    id: "01M58NNAQ16Z2FEAK537Y2480F",
    slug: "garden-house-muthaiga",
    name: "Garden house",
    sector: "residential",
    location: "Muthaiga, Nairobi",
    county: "Nairobi",
    year: 2022,
    duration: "14 months",
    role: "Main contractor",
    contractBand: "KSh 20–50M",
    status: "completed",
    summary:
      "A two-storey house set into an established Muthaiga garden. The trees stayed. The building sits back from them, with a deep veranda and a stone terrace that takes the level change down to the lawn.\n\nWe built the shell, the roof in clay tiles, the veranda, and the internal fit-out, and we coordinated the landscape contractor so the terrace and the lawn met on a drawn line. Structure is a concrete frame. External walls are warm off-white render over block, with stone only where it is doing a job: the terrace, the steps, the plinth.\n\nFourteen months, including county approvals for the first-floor addition over an earlier cottage footing, which we tested and then abandoned. The new foundations are independent of that old work.",
    scope: [
      "New foundations clear of the old cottage",
      "Frame, roof, and veranda",
      "Render, stone terrace, and steps",
      "Internal fit-out and services",
      "Coordination with the garden contractor",
    ],
    coverImage: "/images/muthaiga-house.jpg",
    gallery: [
      "/images/muthaiga-house.jpg",
      "/images/timber-interior.jpg",
      "/images/masonry-detail.jpg",
    ],
    beforeImage: null,
    afterImage: null,
    latitude: -1.2506,
    longitude: 36.8384,
    featured: false,
    createdAt: at("2022-12-01T00:00:00.000Z"),
    updatedAt: at("2022-12-01T00:00:00.000Z"),
    deletedAt: null,
  },
  {
    id: "01M58NNAQ14AWK5B6PH7GEKBR0",
    slug: "access-road-nakuru",
    name: "Access road and drain",
    sector: "civil",
    location: "Nakuru",
    county: "Nakuru",
    year: 2023,
    duration: "3 months",
    role: "Subcontractor",
    contractBand: "KSh 5–20M",
    status: "completed",
    summary:
      "A short access road for a lodge site outside Nakuru. We were subcontractor for the pavement and the side drain, under a civil engineer who held the main contract.\n\nThe ground is murram over rock in places and soft in the hollows. We cut to formation, laid a stone-lined drain on the low side, and paved the carriageway in concrete blocks so the surface can be lifted and relaid if a service has to cross later. Shoulders were compacted and left as murram, which is the right finish on this road.\n\nThree months in the dry season, which was the point. We would not have paved this in April.",
    scope: [
      "Formation and compaction",
      "Stone-lined side drain",
      "Concrete block pavement",
      "Murram shoulders",
    ],
    coverImage: "/images/nakuru-road.jpg",
    gallery: ["/images/nakuru-road.jpg", "/images/site-foundation.jpg"],
    beforeImage: null,
    afterImage: null,
    latitude: -0.3031,
    longitude: 36.08,
    featured: false,
    createdAt: at("2023-02-11T00:00:00.000Z"),
    updatedAt: at("2023-02-11T00:00:00.000Z"),
    deletedAt: null,
  },
  {
    id: "01M58NNAQ1JK36FS5VHKHCRE9R",
    slug: "courtyard-house-nyali",
    name: "Courtyard house",
    sector: "residential",
    location: "Nyali, Mombasa",
    county: "Mombasa",
    year: 2026,
    duration: "In progress",
    role: "Main contractor",
    contractBand: "KSh 20–50M",
    status: "ongoing",
    summary:
      "A courtyard house a short walk from the beach in Nyali. The plan is a white coral-stone court, a shaded arcade, and rooms that open onto the court rather than onto the road.\n\nWe are main contractor. The ground floor shell and the arcade are up. Coral stone is used where it is seen and where it can breathe; the structure behind it is a concrete frame designed for the coastal exposure. The timber screen on the court wall is in, and the stone paving of the court is down. First fix for electrical and plumbing is underway.\n\nThe programme allows for the coast: salt, humidity, and the time it takes to get the right stone. Handover is set for the next dry season. This page will be updated with the finished court.",
    scope: [
      "Coastal foundations and frame",
      "Coral-stone walls and arcade",
      "Court paving and timber screen",
      "Services first fix, in progress",
    ],
    coverImage: "/images/nyali-court.jpg",
    gallery: ["/images/nyali-court.jpg", "/images/masonry-detail.jpg"],
    beforeImage: null,
    afterImage: null,
    latitude: -4.018,
    longitude: 39.713,
    featured: false,
    createdAt: at("2026-01-15T00:00:00.000Z"),
    updatedAt: at("2026-08-01T00:00:00.000Z"),
    deletedAt: null,
  },
];

export const catalogServices: Service[] = [
  {
    id: "01M58NNAQ1CBKGDRHMK5YC1PRM",
    slug: "boundary-wall-cost-kenya",
    name: "Boundary walls",
    description:
      "A boundary wall in Kenya is priced by the metre, and the metre is never just blocks.\n\nThe band most of our residential walls fall into is KSh 9,000–18,000 a metre for a 2.1 metre block wall with columns, a coping, and a footing suited to ordinary soil. Dressed stone, a taller wall, or black cotton that needs a deeper footing moves the figure up. Gates, electric fence, and rendering are separate lines, not a surprise at the end.\n\nWhat changes the price on a real plot: the ground (black cotton around Nairobi and parts of Kiambu is the usual culprit), the length of wall that is also a retaining wall, the number of gates, and whether the neighbour’s ground is higher than yours. We measure the perimeter, dig a trial hole where the soil looks doubtful, and issue a band before we ask you to sign.\n\nApprovals depend on the county and on how close the wall sits to a road reserve. We say so at the first visit if a wall you have in mind would need a setback. The article on wall costs walks through a worked example.",
    includes: [
      "Setting out and trial holes where the soil is doubtful",
      "Footings, columns, and walling",
      "Coping, weepholes, and drip",
      "Gates quoted as their own line",
      "Making good the ground along the wall",
    ],
    timeline: "A typical residential frontage is 6–14 weeks once materials are on site.",
    costRange: "KSh 9,000–18,000 per metre for a standard block wall. Stone costs more.",
    icon: "Fence",
    sortOrder: 1,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ1DVEHDC8MX5Q52BT0",
    slug: "cabro-paving-nairobi",
    name: "Cabro paving",
    description:
      "Cabro fails when the base fails. The blocks are the part you see; the money is in what is under them.\n\nFor a domestic drive in Nairobi we usually price KSh 2,800–4,500 a square metre, including excavation to formation, hardcore, sand bedding, 60 mm blocks, and edge restraints. A yard that will take a loaded canter, or a slope that needs steps and channels, sits at the top of that band or above it. 80 mm blocks are for heavier use and are priced apart.\n\nWe will not lay cabro on uncompacted murram and call it done. Edges need a kerb or a haunch, or the first row walks out after the rains. Falls should be drawn, not guessed, so water does not sit against the house or the boundary wall.\n\nAsk for the square metres, the block thickness, and whether drainage is in the figure. A rate with none of those is not a price.",
    includes: [
      "Excavation to formation and compaction",
      "Hardcore base and sand bedding",
      "60 mm or 80 mm interlocking blocks",
      "Edge restraints and surface falls",
      "Channels where the drive meets a wall or a door",
    ],
    timeline: "A house drive is often 2–5 weeks, weather allowing.",
    costRange: "KSh 2,800–4,500 per m² for a domestic drive on a prepared base.",
    icon: "Grid2x2",
    sortOrder: 2,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ14FKSEJA00TPM1NTR",
    slug: "home-renovation-nairobi",
    name: "Home renovation",
    description:
      "Renovation in Nairobi and Kiambu is usually a roof, a skin, and the services hiding in both. The plan of the house can stay.\n\nWe price by the room when the work is repetitive, and by a measured schedule when it is not. A straightforward room — hack off failed plaster, replaster, paint, and make good the floor — often falls between KSh 250,000 and KSh 700,000 depending on size, windows, and whether the wiring has to come out. A new roof over the whole house is its own figure. We do not fold it into a room rate and hope.\n\nThe useful first visit is with the ceiling boards down in one corner and a look at the roof from outside. Peeling paint is rarely the problem. Trapped water, a failed damp course, or a roof that has been patched with polythene usually is.\n\nWe write what is included and what is not. Discoveries in the fabric are variations, priced before we proceed, not after.",
    includes: [
      "Opening-up and a written schedule of what we found",
      "Roof, plaster, windows, and doors as scoped",
      "Replacement of unsafe wiring and plumbing",
      "Finishes and making good",
      "A snag visit after you have lived in it for a fortnight",
    ],
    timeline: "A single house is often 4–8 months, and you may need to move out for the finishes.",
    costRange: "KSh 250,000–700,000 per room for a typical internal renovation, roof excluded.",
    icon: "Hammer",
    sortOrder: 3,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ1KGSS7PWA66JPRBVC",
    slug: "commercial-fitout-nairobi",
    name: "Commercial fit-out",
    description:
      "A fit-out is a building inside someone else’s building. The programme belongs to the landlord as much as to you.\n\nIn Westlands, Upper Hill, and along Mombasa Road we usually see shell-and-core floors: a slab, a riser, and a date by which the landlord wants the hoist back. Our band for an office fit-out is KSh 45,000–95,000 a square metre of net floor, covering partitions, doors, basic services coordination, ceilings where needed, and finishes. Kitchens, server rooms, and landlord’s work outside the demise are extra.\n\nWe read the lease alongside the drawings. Working hours, the service lift, the fire strategy, and who owns the air-conditioning are not details to discover in week six. A fit-out that ignores them gets stopped, and a stopped site is the expensive kind.\n\nYou get a programme in weeks, a list of landlord approvals, and a cost band before we mobilise. The Westlands floor on the work page is the sort of job this is.",
    includes: [
      "Reading the lease and the landlord’s rules",
      "Strip-out and protection of common areas",
      "Partitions, doors, and joinery",
      "Coordination of mechanical and electrical trades",
      "Finishes, snagging, and as-built drawings",
    ],
    timeline: "A single floor is often 3–6 months from possession.",
    costRange: "KSh 45,000–95,000 per m² for an office fit-out. Specialist rooms cost more.",
    icon: "Sofa",
    sortOrder: 4,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ2E9EBKHE4GS1W5GM4",
    slug: "civil-works",
    name: "Civil works",
    description:
      "Drives, short access roads, drainage, and the external works that make a building usable after the roof is on.\n\nWe take this work as main contractor on small sites and as a subcontractor under an engineer on larger ones. The Nakuru access road was the second kind: formation, a stone drain, and a block pavement, built in the dry season because the programme said so.\n\nExternal works are where budgets quietly fail. A beautiful house with no fall away from the plinth, no hardstanding, and a drain that ends in the neighbour’s shamba is not finished. We draw the levels. If the plot cannot fall to a county drain or a soak pit, we say that before we price the paving.\n\nBands depend on length, axle load, and whether we are cutting rock. We do not publish a single rate for “civil works”. Bring the drawing, or let us measure.",
    includes: [
      "Setting out and levels",
      "Earthworks and compaction",
      "Drainage, culverts, and soak pits",
      "Pavements, kerbs, and shoulders",
      "External works against the building",
    ],
    timeline: "A house’s external works often run alongside the last third of the build, or 4–12 weeks on their own.",
    costRange: "Priced from the drawing. Domestic paving has its own band on the cabro page.",
    icon: "Route",
    sortOrder: 5,
    deletedAt: null,
  },
];

const boundaryArticle = `A boundary wall is sold by the metre, and the metre hides the footing.

On a straightforward Nairobi or Kiambu plot, a 2.1 metre block wall with concrete columns at sensible centres, a coping, and a footing in ordinary soil usually lands between KSh 9,000 and KSh 18,000 a metre. That is a band, not a quotation. It assumes you can reach the line with a pickup, the ground is not black cotton, and the wall is not also holding back a neighbour’s garden.

Black cotton changes the footing. If a trial hole shows the dark cracking soil that much of Nairobi sits on, the foundation gets deeper or wider, and sometimes both. That alone can move a wall from the bottom of the band to the top. A section that retains soil is a different piece of engineering from a fence, and it should be drawn and priced as one.

Stone is a finish and a structure. Machine-cut stone on a block backing costs more than rendered block and less than a fully load-bearing stone wall. Ask which one is in the rate. A rate that says “stone wall” and does not say is useless.

Gates are not free. A pedestrian gate is a small number. A 4.5 metre vehicle gate, with posts that will not lean, is a large one. Electric fence, razor wire, and render are lines of their own. If they are missing from the paper, they are missing from the price.

Measure the perimeter yourself with a tape before you compare quotations. Two contractors can both be honest and KSh 400,000 apart because one has measured 80 metres and the other has measured 110, or because one has allowed for two gates and the other for a gap.

County setbacks matter on road frontages. A wall in the road reserve will be a conversation with the county, and sometimes a wall you have to take down. We would rather have that conversation before the blocks arrive.

Use the estimator on the services page for a first band, then ask for a measured figure. The estimator does not know your soil. We do, once we have stood on it.`;

const ncaArticle = `The National Construction Authority registers contractors in categories, and the categories are not a medal. They are a statement of the size of work a firm is allowed to undertake.

NCA 1 is the top. The number goes up as the permitted contract value goes down, through to NCA 8. A firm registered for building works in a lower category should not be signing a contract above that category’s limit, however convincing the site agent. The register is public. Ask for the NCA number and look it up. A logo on a letterhead is not the register.

Category is also specific to a class of work. Building works, roads, water, and electrical are not the same certificate. A road contractor’s NCA 3 does not, by itself, qualify them to build your house. Read the class, not only the number.

Why it matters to you: a contract with a firm working outside its category is a problem if something goes wrong, and it is a problem for some lenders and insurers before anything goes wrong. Procurement teams already know this. Private clients often find out when a bank asks for the certificate.

There is a second, quieter point. Category is not the same as care. An NCA 1 firm can build you a careless boundary wall, and an NCA 5 firm can build you a careful house inside its limit. Match the category to the value of the job, then judge the firm on the work, the programme, and who will actually be on site.

Ask three things. What is the NCA number. What class and category does it cover. Who from the firm will attend the site weekly, by name. Write the answers into the contract. If the number cannot be found on the register, stop.

Our own number is printed on this site and is a placeholder until the firm’s real certificate is dropped in. Treat every other contractor’s number the same way: check it, do not admire it.`;

const contractArticle = `Most arguments on a Kenyan building site are already in the contract. They were just written vaguely, or not written at all.

First: who is the employer, and who are you actually paying. The name on the quotation, the name on the M-Pesa till, and the name on the NCA certificate should be the same organisation. If the till belongs to a person and the contract belongs to a company, ask why before you send a deposit. We take payment on the business shortcode for that reason.

Second: what is not included. A sum for “the house, as discussed” is not a scope. The document should say whether the septic tank, the drive, the boundary, the kitchen fittings, and statutory fees are in or out. Exclusions are more useful than a long list of inclusions. Read them.

Third: how a change is priced. You will change your mind, or the ground will. The contract should say that a variation is agreed in writing, with a cost, before the work is done. A contractor who says “we will sort the money at the end” is offering you an argument. We issue a figure for the change and wait.

Fourth: what the programme actually promises. “About eight months” is a hope. A programme with a start date, a weather assumption, and a date for practical completion is a promise you can manage. Ask what happens to that date if you delay a decision, and what happens if we do. Both should be written.

Fifth: when the retention comes back. Holding five or ten percent until defects are closed is normal. The contract should say how long that period is, what counts as a defect, and the date the balance is due if the list is clear. Retention that can be kept for an unnamed period is not retention. It is a discount the contractor hopes you forget, or a lever you hope they forget.

If those five answers are short and specific, the rest of the contract is easier to read. If they are missing, the price is not the thing to negotiate yet.`;

export const catalogInsights: Insight[] = [
  {
    id: "01M58NNAQ2T46S11Q4KCXJAKD2",
    slug: "boundary-wall-cost-kenya",
    title: "What a boundary wall actually costs in Kenya",
    excerpt:
      "A metre rate is only honest if it says what is under the wall, how tall it is, and whether the gates are included.",
    body: boundaryArticle,
    publishedAt: at("2026-02-12T00:00:00.000Z"),
    readingTime: 5,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ2RY2B0G7SZ9VJZJPA",
    slug: "how-to-read-an-nca-category",
    title: "How to read an NCA category (and why it matters)",
    excerpt:
      "The number is a limit on contract value, not a mark of taste. Check the class of work, then check the register.",
    body: ncaArticle,
    publishedAt: at("2026-03-03T00:00:00.000Z"),
    readingTime: 5,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ2AHD8DCBYQGRTH16D",
    slug: "questions-before-a-construction-contract",
    title: "Five questions to ask before signing a construction contract",
    excerpt:
      "Who you are paying, what is excluded, how changes are priced, what the programme promises, and when retention returns.",
    body: contractArticle,
    publishedAt: at("2026-04-21T00:00:00.000Z"),
    readingTime: 5,
    deletedAt: null,
  },
];

export const catalogTestimonials: Testimonial[] = [
  {
    id: "01M58NNAQ229QGHKBVZQETVMQY",
    quote:
      "They sent a programme, kept to it, and the drain still clears through the long rains.",
    clientName: "The Kariuki family",
    projectLocation: "Karen, Nairobi",
    projectId: "01M58NNAQ1JCJJ9GCNVDWM57C9",
    featured: true,
    deletedAt: null,
  },
  {
    id: "01M58NNAQ4H7SECONDQUOT0X",
    quote:
      "The house was priced as a band. The final account sat inside it, and the trees we asked them to keep are still there.",
    clientName: "J. and A. Shah",
    projectLocation: "Muthaiga, Nairobi",
    projectId: "01M58NNAQ16Z2FEAK537Y2480F",
    featured: false,
    deletedAt: null,
  },
];

export const budgetBands = [
  "Under KSh 5M",
  "KSh 5–20M",
  "KSh 20–50M",
  "Above KSh 50M",
  "Not sure yet",
] as const;

export const timelines = [
  "As soon as approvals allow",
  "Within three months",
  "This year",
  "I am still researching",
] as const;

export const projectTypes = [
  "Boundary wall",
  "Cabro paving",
  "Home renovation",
  "Commercial fit-out",
  "New house",
  "Civil or external works",
  "Something else",
] as const;
