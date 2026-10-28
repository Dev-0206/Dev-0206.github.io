/*
  All site content lives in this file.
  To add a project, copy one object in PROJECTS, change the fields, and drop its
  images in assets/img/. The layout code never needs to change.

  Block types used inside sections[].blocks:
    p        { text }
    list     { items: [string] }
    fig      { src, alt, caption, wide?, contain? }
    figs     { items: [{ src, alt, caption }], cols }
    quote    { text, cite }
    cards    { items: [{ title, text }], cols? }
    steps    { items: [{ title, text }] }
    table    { head: [string], rows: [[string]], caption? }
    stats    { items: [{ value, label }], note? }
    note     { title, text }
    links    { items: [{ label, href }] }
*/

window.SITE = {
  name: "Dev Gandhi",
  positioning: "UX + Physical Systems",
  ask: "Open to Summer 2027 design internships",
  focus: "Prototyping, Sustainability, Human-Centered Design",
  statement: "UX designer who researches first, then builds to test.",
  chips: [
    { text: "Vinyl reuse service, about 80% less CO2 (modeled)", href: "#/work/second-spin" },
    { text: "ADHD focus stand, co-designed with a student", href: "#/work/focus-phone-stand" },
    { text: "Seasonal-flavor redesign", href: "#/work/molly-moons" },
    { text: "Working trip-planner app", href: "#/work/vacation-helper" },
  ],
  status:
    "BFA UX Design at SCAD. Transferred from UW Human Centered Design & Engineering.",
  email: "gandhi.devv@gmail.com",
  linkedin: "https://www.linkedin.com/in/devgandhii",
  github: "https://github.com/Dev-0206",
  resume: "assets/Dev_Gandhi_Resume.pdf",
  about: {
    paragraphs: [
      "I'm a UX Design student at SCAD in Savannah, working toward a BFA (expected 2028). Before SCAD I studied Human Centered Design & Engineering at the University of Washington from 2023 to 2026, where I made the projects on this site.",
      "Before design school I founded a school solar program in India. It installed 50+ solar panels with about $10,000 in funding and ran workshops for 200+ students.",
      "My work starts with listening: interviews, journey maps, and critique. It ends in something people can react to, such as a storyboard, a prototype, or a working app. I'm drawn to products that sit between a screen and a physical setting, and to sustainability questions where a design change can shift a whole system.",
    ],
    facts: [
      { label: "Education", value: "SCAD, BFA UX Design (expected 2028). University of Washington, Human Centered Design & Engineering, 2023 to 2026." },
      { label: "Looking for", value: "A Summer 2027 design internship in UX or product design." },
      { label: "Research and design", value: "User interviews, journey mapping, heuristic evaluation, prototyping, Figma, brand identity." },
      { label: "Making", value: "Fusion 360, SolidWorks (basics), Rhino, KeyShot (learning), 3D printing." },
      { label: "Code", value: "Python, Flask, HTML/CSS, Git." },
      { label: "Languages", value: "English, Hindi, Gujarati." },
    ],
  },
};

window.PROJECTS = [
  /* ------------------------------------------------------------------ */
  {
    slug: "second-spin",
    title: "Second Spin",
    outcome: "Modeled about 80% less CO2 than pressing new vinyl. Service tested with six classmates; restamping itself is unproven.",
    decision: "I designed the service around reusing the record itself, not only recycling the material, because new PVC is the largest source of emissions in our assessment.",
    tag: "Sustainability",
    problem:
      "Damaged vinyl ends up in landfill while new records need new PVC. Second Spin turns old records back into playable ones through record stores.",
    role: "Research, design thinking, prototyping",
    timeline: "Autumn quarter 2025",
    tools: "Life cycle assessment, Wizard-of-Oz testing, Figma, Fusion 360, PrusaSlicer",
    team: "Ethan, Vivian, Reid, Dev",
    context: "HCDE 316 Sustainable Design, University of Washington",
    cover: "assets/img/ss-beforeafter.webp",
    coverAlt:
      "Two photos of a record on a turntable. The left record is labeled damaged and unwanted, the right is labeled restamped.",
    coverFit: "contain",
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            t: "p",
            text:
              "Second Spin is a service concept. Record stores collect damaged and unwanted records. We clean them, repair them, or restamp them with new music, and sell them in recycled paper sleeves. The aim is to keep records out of landfill and cut the need for new virgin PVC.",
          },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        blocks: [
          {
            t: "list",
            items: [
              "Records are made of PVC, which comes from petroleum, is hard to recycle, and takes hundreds of years to break down.",
              "Pressing plants use heat, pressure, and a lot of electricity.",
              "Vinyl is heavy and fragile, so packaging and shipping add more emissions.",
              "There is no easy way for a person to reuse a record they no longer want.",
            ],
          },
          {
            t: "p",
            text:
              "We started from a life cycle assessment of a 12-inch, 140 g record across five stages: extraction, manufacturing, transport and packaging, use, and end of life. Manufacturing and end of life gave us the biggest openings.",
          },
          { t: "stages" },
          {
            t: "fig",
            wide: true,
            contain: true,
            src: "assets/img/ss-lca.webp",
            alt: "Life cycle assessment diagram of a vinyl record with columns for extraction, manufacturing, transportation and packaging, use, and end of life, connected by sticky notes for inputs and outputs.",
            caption: "The full life cycle board, with every input and output on one page. Click to zoom and pan.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "Listeners", text: "Buyers mostly shop on artist websites or at independent record stores. They rarely throw records away, and they would use a reprint service only if it costs the same or less than a new record." },
              { title: "Local record store", text: "We spoke with Neptune Records. Stores already take in used records, so a collection program is realistic. They stock albums by popularity, quality, and demand, and they are open to sustainable records that work well." },
              { title: "Stakeholders", text: "The environment, musicians and listeners, record manufacturers, and music stores. Stores matter most, because the whole service depends on them." },
              { title: "Anticipated risks", text: "Unsold stock, training store staff to handle records without damaging them, and the chance that large labels would resist a process that lowers demand for new pressings." },
            ],
          },
        ],
      },
      {
        id: "process",
        title: "Process",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Quantify the impact", text: "Life cycle assessment and impact assessment showed where the emissions sit." },
              { title: "Interview listeners and stores", text: "Listener interviews and a record store conversation shaped the service." },
              { title: "Prototype the process", text: "We tried to restamp a record by hand. It did not work." },
              { title: "Pivot to a service prototype", text: "We changed the prototype to show the service experience instead of the factory step." },
              { title: "Wizard-of-Oz test", text: "Six peers walked through the service in a Wizard-of-Oz test." },
            ],
          },
          {
            t: "note",
            title: "Early attempt: restamping by hand",
            text:
              "Our plan was to melt the grooved layer of a record with a heat source and press it with a 3D-printed stamp. Melting PVC needs controlled heat, ventilation, and safety gear that we did not have, because it releases toxic fumes. Our 3D-printed stamps failed structurally or did not match the model, and the printers we could use were too small for a 12-inch record. Real stampers cost more than $100 secondhand. We could not test the physical process, so we prototyped the part we could: the service.",
          },
        ],
      },
      {
        id: "decisions",
        title: "Key decisions",
        blocks: [
          {
            t: "cards",
            cols: 3,
            items: [
              { title: "Reuse the record, not only the material", text: "Reusing existing records removes new PVC, the largest source of emissions in our assessment." },
              { title: "Three clear options", text: "An online intake form asks for the album and its condition, then offers donate, repair, or reprint to a different album." },
              { title: "Stores as the front door", text: "Stores provide staff and counter space. We provide tools, training, and marketing. Revenue splits 60% to us and 40% to the store." },
            ],
          },
          {
            t: "figs",
            cols: 2,
            items: [
              { src: "assets/img/ss-form-reprint.webp", alt: "Intake form step asking whether to donate, repair, or reprint a record, with reprint selected and fields for album name and artist.", caption: "Intake form, reprint path." },
              { src: "assets/img/ss-form-repair.webp", alt: "Intake form step with repair selected and options for scratch repair, warping correction, label restoration, and static removal.", caption: "Intake form, repair path." },
            ],
          },
          {
            t: "table",
            head: ["Service", "Price"],
            rows: [
              ["Simple cleaning", "$5"],
              ["Scratch repair and cleaning", "$10"],
              ["Warp and scratch repair with cleaning", "$15"],
              ["Reprint to a chosen album", "30% below current retail value"],
              ["Refurbished albums, normal / popular / rare", "$15 / $20 / $25, with a recycled paper cover"],
            ],
            caption: "Pricing from our final presentation.",
          },
        ],
      },
      {
        id: "design",
        title: "Prototype and test",
        blocks: [
          {
            t: "p",
            text:
              "We scratched cheap records on purpose and recorded how they sounded. We played the damaged audio, then a clean version for repair and a different track for reprint. Alongside the audio we built the intake form in Figma.",
          },
          {
            t: "fig",
            wide: true,
            src: "assets/img/ss-beforeafter.webp",
            alt: "Two photos of a record on a turntable. The left record is labeled damaged and unwanted, the right is labeled restamped.",
            caption: "A damaged record and the restamped version we used for the test. The audio difference carried the demonstration.",
          },
          {
            t: "p",
            text:
              "Six classmates tested the concept for about ten minutes each. They held a scratched record, heard the damaged audio, and chose to repair, donate, or reprint. What they told us:",
          },
          {
            t: "list",
            items: [
              "Price was the strongest driver. One tester suggested reprints should cost about 30% less than retail.",
              "People wanted control over the music. They preferred repairing the original or choosing the new audio.",
              "Clear, simple steps mattered. One person suggested a paper form for people less comfortable online.",
              "Testers worried a record could break in transit, and expected cleaning to be part of the service.",
              "Recycled packaging and an artistic touch would make refurbished records feel collectible.",
            ],
          },
        ],
      },
      {
        id: "impact",
        title: "Impact",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "360,161 kg", label: "CO2 per year, current production" },
              { value: "71,084 kg", label: "CO2 per year, Second Spin" },
              { value: "about 80%", label: "modeled reduction" },
            ],
            note:
              "A model for 705,549 records, the volume one pressing plant made in 2022 at 140 g each. This is an estimate, not a measurement.",
          },
          {
            t: "table",
            head: ["Variable", "Current", "Second Spin"],
            rows: [
              ["New PVC used", "84,948 kg", "0 kg"],
              ["CO2 from PVC compound", "233,862 kg", "1,623 kg"],
              ["CO2 from paper sleeve and cover", "126,293 kg", "69,461 kg"],
            ],
            caption: "Impact assessment for 705,549 records.",
          },
          { t: "sens" },
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "What the model assumes", text: "Reprinting uses about 2.3 g of CO2 per record. Sleeves and covers are 100% recycled paper. Scale is one plant's annual output, not what a store network would collect." },
              { title: "What collection adds", text: "A truck route across ten Seattle stores covers about 17 miles (27 km) and emits about 6.75 kg of CO2. Twice a week that is roughly 702 kg per year. It is a rough estimate at a much smaller scale, so I have not subtracted it from the figure above." },
            ],
          },
          {
            t: "note",
            title: "Limitations",
            text:
              "We never tested restamping, so the technical result, yield, and sound quality are unproven. The Wizard-of-Oz test showed that people want the service and what would stop them. It did not show that the process works. Six classmates is a small group.",
          },
          {
            t: "links",
            items: [
              { label: "705,549 record baseline: Vinyl Record Industry First Carbon Footprinting Report (VRMA, June 2024)", href: "https://vinylalliance.org/wp-content/uploads/2024/06/First-Carbon-Footprint-report_VRMA_VA_30-May-2024_final.pdf" },
            ],
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        blocks: [
          {
            t: "p",
            text:
              "This class changed how I look at a product. I now count the energy and material behind it, from making to disposal, and I notice impacts that rarely come up, such as running digital tools and the recycling process itself.",
          },
          {
            t: "p",
            text:
              "People said they liked sustainable products, but price came first. That shows how much of the pressure to be sustainable lands on the buyer, who is the person least able to absorb a higher price. Customization was a benefit we did not plan for. People liked keeping a record that meant something to them.",
          },
        ],
      },
      {
        id: "next",
        title: "Next steps",
        blocks: [
          {
            t: "list",
            items: [
              "Find a safe way to test restamping, with proper equipment and ventilation.",
              "Test the service with a larger and more varied group than six classmates.",
              "Pilot with one store to see how collection and handling work in practice.",
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "focus-phone-stand",
    title: "Focus Phone Stand",
    outcome: "One student with ADHD rated the concept 6 value, 8 usability, 10 feasibility, 8 desirability (out of 10).",
    decision: "I chose a physical cue over another app. Digital tools sit inside the phone that distracts, so a stand changes the desk instead of adding a layer to the phone.",
    tag: "Research",
    problem:
      "For a student with ADHD, starting work is the hard part, and the phone is usually the first thing in the way.",
    role: "Interview notes and transcripts, synthesis, concept sketches, presentations, final report",
    timeline: "Winter quarter 2026",
    tools: "Structured interview, co-journey mapping, co-ideation, storyboarding",
    team: "Theo Tzankov, Zayyan Ahmad, Dev Gandhi",
    context: "HCDE 315 Inclusive Design, University of Washington",
    cover: "assets/img/adhd-storyboard.webp",
    coverAlt:
      "Eight-panel hand-drawn storyboard of a student placing a phone on a stand, a light turning on, and a work session beginning.",
    coverFit: "contain",
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            t: "p",
            text:
              "Our team worked with one student with ADHD across the quarter to find a design that fit how they already work. The result is the Focus Phone Stand. It holds the phone upright and turns on a light when the phone is placed, so putting the phone down becomes the start of a work session.",
          },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        blocks: [
          {
            t: "p",
            text:
              "In our first interview, the hardest part of schoolwork was often getting started, not the work itself. Sitting down to work often turned into checking the phone first.",
          },
          {
            t: "p",
            text:
              "We reviewed four existing tools to see what was already on offer. Each one either keeps the phone in play or takes it away, and the participant did not want to lose access to their phone.",
          },
          {
            t: "table",
            head: ["Tool", "What it does well", "Where it falls short"],
            rows: [
              ["Forest app", "Builds motivation with visible progress.", "Lives on the phone, so the distraction stays within reach."],
              ["Pomodoro timers", "Give time structure.", "Do not change how reachable the phone is."],
              ["Phone lock boxes", "Remove the distraction completely.", "Feel rigid and punitive."],
              ["Apple Screen Time", "Raises awareness of phone habits.", "Works inside the same device that distracts."],
            ],
            caption: "Competitive analysis from our final report.",
          },
        ],
      },
      {
        id: "research",
        title: "Research and insights",
        blocks: [
          {
            t: "p",
            text:
              "We worked with the same participant through the whole quarter. Staying with one person gave us depth, and it also limits what we can claim.",
          },
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "Structured interview, 90 minutes", text: "We covered everyday environments, attention and interaction, and tools and workarounds. We let the participant jump between topics and kept their own wording." },
              { title: "Co-journey mapping, 30 minutes", text: "The participant drew and narrated a task, then marked the steps that felt intuitive and the steps that took extra effort." },
              { title: "Co-ideation, 60 minutes", text: "We reviewed the insights, then sketched design directions together on a day-to-day task. I took notes with Zayyan." },
              { title: "Final partner feedback", text: "A short session on the refined concept with open questions about what worked and what was unclear." },
            ],
          },
          { t: "p", text: "The first two sessions produced four insights." },
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "Productivity depends on state", text: "Energy and focus change across the day, so a tool cannot assume steady capacity." },
              { title: "Starting is hard when the task is vague", text: "Large or unclear tasks were hard to begin because it was not clear where to start." },
              { title: "Motivation is social and emotional", text: "Accountability and the sense of not letting someone down made it easier to engage." },
              { title: "Environments can help or hurt attention", text: "Some spaces made starting easier. The participant's main workspace was also where they rest, which pulled attention away." },
            ],
          },
          { t: "p", text: "From these we wrote three how-might-we questions." },
          {
            t: "list",
            items: [
              "How might we design for fluctuating capacity?",
              "How might we design clear entry points that make the first step of a task structured and intuitive, without oversimplifying the work?",
              "How might we design environments or systems that use social connection and shared responsibility to support engagement?",
            ],
          },
          {
            t: "p",
            text:
              "The participant chose the third question as the one to address and called the second one a strong option as well.",
          },
        ],
      },
      {
        id: "process",
        title: "Process",
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Interview and mapping", text: "Two sessions with the participant produced four insights." },
              { title: "Synthesis", text: "We turned the insights into three how-might-we questions and three design principles." },
              { title: "Co-ideation", text: "Together we sketched three directions: a phone stand, a Canvas integration with an AI helper, and a dynamic schedule builder. Our notes record that the participant liked the phone stand idea." },
              { title: "Concept and storyboard", text: "We developed the stand as a concept and drew it as an eight-panel storyboard." },
              { title: "Final feedback", text: "The participant reviewed the refined concept and rated it." },
            ],
          },
          {
            t: "figs",
            cols: 2,
            items: [
              { src: "assets/img/adhd-stand-sketch.webp", alt: "Pencil sketch of a tilted phone stand labeled Focus Mode On, with a small focus light at its base.", caption: "An early sketch of the stand and its focus light." },
              { src: "assets/img/adhd-desk-sketch.webp", alt: "Ink sketch of a desk with a lamp, plant, and monitor. Annotations point to a phone stand and to a button-triggered focus light.", caption: "A desk sketch showing where the stand and light would sit." },
            ],
          },
        ],
      },
      {
        id: "decisions",
        title: "Key decisions",
        blocks: [
          {
            t: "cards",
            cols: 3,
            items: [
              { title: "A cue, not a lock", text: "Lock boxes remove the phone and feel punitive. The stand keeps the phone reachable and marks the moment work begins." },
              { title: "An object, not another app", text: "Digital tools sit inside the device that distracts. A physical object changes the desk instead of adding a layer to the phone." },
              { title: "Keep it simple", text: "After the final session no major changes were suggested, so we added no features. The participant valued the simplicity." },
            ],
          },
          { t: "p", text: "Three design principles guided these choices." },
          {
            t: "cards",
            cols: 3,
            items: [
              { title: "Design for clear entry and momentum", text: "Make the first step visible, actionable, and finite." },
              { title: "Externalize regulation through visible cues", text: "Make the intention physically or visually present in the environment." },
              { title: "Leverage accountability and adaptability", text: "Adapt to changing energy, create shared or perceived accountability, and allow personalization." },
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Final concept",
        blocks: [
          {
            t: "p",
            text:
              "The stand is a desk accessory that holds a phone upright and lights up when the phone is placed on it. The light tells the user, and the room, that a focus session has started. It gives the phone a home, creates a visible start cue, and turns focus into a small physical ritual without taking the phone away.",
          },
          {
            t: "fig",
            wide: true,
            contain: true,
            src: "assets/img/adhd-storyboard.webp",
            alt: "Eight storyboard panels in order: distracted and stuck, meets the focus stand, the act of focus, light activation, work mode triggered, reduced distractions, steady progress, productive completion.",
            caption: "Storyboard. A student sits down distracted, places the phone on the stand, sees the light turn on, and works until the session ends.",
          },
          {
            t: "fig",
            src: "assets/img/adhd-render.webp",
            alt: "Rendered concept of a phone on a magnetic stand with a glowing LED ring at its base, with labels for the mount, lock-in sensor, charging, and light.",
            caption: "Concept render of the stand with a magnetic mount and an LED ring. My teammate Theo Tzankov made it in Figma from the idea we developed together. It is a visual concept, and we did not build a physical prototype.",
          },
        ],
      },
      {
        id: "results",
        title: "Participant feedback",
        blocks: [
          {
            t: "stats",
            items: [
              { value: "6", label: "Value" },
              { value: "8", label: "Usability" },
              { value: "10", label: "Feasibility" },
              { value: "8", label: "Desirability" },
            ],
            note:
              "Scores out of 10 from one participant after seeing the concept. This is early directional feedback, not a usability test of a built product.",
          },
          { t: "quote", text: "I like that it changes my environment instead of expecting me to just have more discipline.", cite: "Participant" },
          { t: "quote", text: "Placing my phone on it feels like a small ritual.", cite: "Participant" },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        blocks: [
          {
            t: "p",
            text:
              "I started the quarter believing inclusive design meant making something work for as many people as possible. Working with one participant changed that. People with ADHD do not all experience distraction the same way, so a design has to start from a specific person and a specific place.",
          },
          {
            t: "p",
            text:
              "The interviews also changed what I thought the problem was. I assumed it was motivation. It turned out to be more about knowing where to start, with the phone sitting right there when starting felt hard.",
          },
          {
            t: "note",
            title: "Limits",
            text:
              "One participant, one quarter, and no built prototype. Value was the lowest score at 6 out of 10, so the concept needs more testing before I would call it solved.",
          },
        ],
      },
      {
        id: "next",
        title: "Next steps",
        blocks: [
          {
            t: "list",
            items: [
              "Build a working version with a real light and a phone sensor.",
              "Test with more people with ADHD to see whether the ritual holds across different routines.",
              "Explore the social accountability direction the participant picked in the first session, since the stand answers a different question.",
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "molly-moons",
    title: "Molly Moon's Seasonal Flavors",
    outcome: "Concept redesign with dietary labels, photos, and a path to a nearby shop. Not user-tested.",
    decision: "I grouped flavors by dietary need (vegan, dairy-free, nut-free) so people with a restriction see their options without reading descriptions. The tradeoff: the columns are not filters, so someone who needs vegan and nut-free is not served yet.",
    tag: "UX + Visual",
    problem:
      "Seasonal flavors appear as a text list with no photos, no dietary labels, and no path to a nearby shop.",
    role: "Sole designer: research, wireframes, visual identity, final screen, design brief",
    timeline: "Autumn quarter 2025",
    tools: "Figma",
    team: "Individual",
    context: "HCDE 308, University of Washington. Student concept, not affiliated with Molly Moon's.",
    cover: "assets/img/mm-ui-final.webp",
    coverAlt:
      "Redesigned seasonal flavors page with three rounded cards for vegan, dairy-free, and nut-free flavors over a pink ice cream photo background.",
    coverFit: "cover",
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            t: "p",
            text:
              "Molly Moon's is a Seattle ice cream company known for local sourcing, seasonal flavors, and community work. I redesigned how its seasonal flavors are shown, and built a logo, color and type system, and an in-store poster to match.",
          },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        blocks: [
          {
            t: "p",
            text:
              "The current homepage does several things well. It states the brand quickly, lists shops and hours, and gives a clear path to order online. The seasonal section is where it falls short. Flavors are stacked as links with no photos or allergen icons, and there is no way to scan by dietary need or reach a shop that has the flavor.",
          },
          {
            t: "p",
            text:
              "My goal was a card-based layout that makes seasonal flavors quick to scan and connects each one to a nearby shop.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            t: "p",
            text:
              "I reviewed two other ice cream sites to see what was missing for seasonal flavors.",
          },
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "Salt & Straw", text: "Large editorial photos make each flavor feel like a moment with a story. The pages are text-heavy, which makes it slow to see what is available now." },
              { title: "Sweet Alchemy", text: "A calm, ingredient-first layout. Seasonal information is buried, and it is not clear where to get a flavor or how long it will last." },
            ],
          },
          {
            t: "p",
            text:
              "I wrote five visual references into the brief: hand-drawn doodles for a youthful tone, ingredient close-ups for appetite and transparency, kraft paper textures for a sustainability cue, Polaroid-style frames for a neighborhood feel, and simple outline icons for sourcing and allergen information.",
          },
          {
            t: "cards",
            cols: 3,
            items: [
              { title: "Browse", text: "A grid of seasonal flavors with an image, a short description, and allergen icons." },
              { title: "View one flavor", text: "A detail page with a larger image, a fuller description, and dietary information." },
              { title: "Find a shop", text: "Enter a ZIP code or use location to see nearby shops with distance and hours." },
            ],
          },
          {
            t: "fig",
            wide: true,
            src: "assets/img/mm-wireframes.webp",
            alt: "Three hand-drawn wireframes: a seasonal flavor overview with three columns, a flavor detail page, and a shop locator with a list and map.",
            caption: "Wireframes for the three key interactions. Header and footer stay the same on every screen.",
          },
        ],
      },
      {
        id: "process",
        title: "Process",
        blocks: [
          {
            t: "p",
            text:
              "I presented my work every week and got a group critique and a professor critique, then refined it. Two rounds changed the most.",
          },
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "Logo critique", text: "My first logo was a take-out cup, and the critique was that it did not work. I redrew it as a cone with a clearer swirl of ice cream, a crescent moon topping, and a bolder wordmark. I refined the logo three times in total." },
              { title: "Final screen critique", text: "Feedback said the colorway was not making the message clear. I revised the colors for the final design so the categories read faster." },
            ],
          },
          {
            t: "fig",
            wide: true,
            contain: true,
            src: "assets/img/mm-logo-drafts.webp",
            alt: "Two early logo drafts shaped like cups. The first has three plain scoops in a grey cup. The second has three scoops with a crescent moon and the text established since 2008.",
            caption: "Two cup drafts before the cone.",
          },
          {
            t: "figs",
            cols: 2,
            items: [
              { src: "assets/img/mm-ui-1.webp", alt: "First draft of the seasonal flavors page with grey placeholder images and flat colored columns.", caption: "Draft 1. Flat columns and placeholders." },
              { src: "assets/img/mm-ui-2.webp", alt: "Second draft with flavor photos in columns on a pink background and a cup logo.", caption: "Draft 2. Photos on pink." },
              { src: "assets/img/mm-ui-3.webp", alt: "Third draft with rounded cards, a blue header and footer, and an order online button.", caption: "Draft 3. Rounded cards and a blue header." },
              { src: "assets/img/mm-ui-final.webp", alt: "Final design with rounded cards over an ice cream photo background.", caption: "Final. Photo background and the new cone logo." },
            ],
          },
        ],
      },
      {
        id: "decisions",
        title: "Key decisions",
        blocks: [
          {
            t: "cards",
            cols: 3,
            items: [
              { title: "Group flavors by dietary need", text: "Vegan, dairy-free, and nut-free each get a labeled card, so people with a restriction can see their options without reading descriptions." },
              { title: "Cards instead of a list", text: "Each flavor gets a photo, a short line, and two actions, so flavors can be compared at a glance." },
              { title: "Color with a job", text: "Each color has a role in the system, so color helps people navigate and still feels like an ice cream shop." },
            ],
          },
          {
            t: "table",
            head: ["Color", "Role"],
            rows: [
              ["Aqua Board", "Dairy-free column and primary interface elements such as links and buttons."],
              ["Lemon Sorbet", "Nut-free column and areas that need extra attention."],
              ["Cone Brown", "Headings and accents."],
              ["Raspberry Pop", "Strong accents such as Find a shop and limited-time badges."],
              ["Black and white", "Black for body text and navigation, white for the page and card interiors."],
            ],
            caption: "Palette roles from the design brief.",
          },
          {
            t: "p",
            text:
              "Type uses two families. Encode Sans, a friendly geometric face with many weights, carries headings and interface labels. Open Sans carries body text because it stays readable at small sizes on menus and FAQs.",
          },
          {
            t: "figs",
            cols: 2,
            items: [
              { src: "assets/img/mm-logo-final.webp", alt: "Final Molly Moon's logo: a pink soft-serve swirl with a crescent moon on top, in a waffle cone, above the wordmark molly moon's.", caption: "Final logo. A swirl reads as ice cream even at sticker and icon sizes, and the crescent ties it to the name." },
              { src: "assets/img/mm-poster.webp", alt: "In-store poster titled Seasonal Flavors, Handmade in Seattle, with a pink scoop on a cone and a grid of four flavor cards with dietary icons.", caption: "In-store poster. A grid of flavor cards that can be swapped each season without changing the system." },
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Final design",
        blocks: [
          {
            t: "fig",
            wide: true,
            src: "assets/img/mm-ui-final.webp",
            alt: "Final seasonal flavors page with three cards labeled vegan, dairy free, and nut free, each with a photo, a short description, a View Flavors button, and a Find a Store link.",
            caption: "Final seasonal flavors screen, updated in Figma on 12/09/2025.",
          },
        ],
      },
      {
        id: "results",
        title: "Validation",
        blocks: [
          {
            t: "note",
            title: "No user testing",
            text:
              "I did not test this with users. The evidence is the weekly critique cycle described above, and the changes it led to.",
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        blocks: [
          {
            t: "p",
            text:
              "Good decisions came from naming a user need and checking each choice against it, instead of making the page look good first. My early habit was to finish the task. This project moved me toward asking what a person is trying to do.",
          },
          {
            t: "note",
            title: "Design gaps",
            text:
              "The cards group flavors into three columns, but they are not filters. Someone who wants a flavor that is both vegan and nut-free cannot ask for it. The grey View Flavors buttons also have weak contrast against the pastel cards.",
          },
        ],
      },
      {
        id: "next",
        title: "Next steps",
        blocks: [
          {
            t: "list",
            items: [
              "Test with people who have dietary restrictions.",
              "Replace the grouped columns with real filters that can combine.",
              "Raise button contrast.",
              "Design the flavor detail page and shop locator in high fidelity. They exist only as wireframes.",
            ],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "vacation-helper",
    title: "Vacation Helper",
    demo: "vacation-helper-demo/index.html",
    outcome: "Working Flask app that ranks destinations by budget and trip length. Redesigned after class with scenic destinations and a compare view. Live weather, estimated prices.",
    decision: "I made each result show why it fits, for example a $180 estimated flight plus a $420 hotel, so people can check the math instead of trusting a rank.",
    tag: "Development",
    problem:
      "A small Flask app that ranks destinations against a budget and trip length, and explains why each one fits.",
    role: "Sole designer and developer",
    timeline: "2 to 3 weeks",
    tools: "Python, Flask, Jinja2, HTML/CSS, OpenWeatherMap API, python-dotenv, Git",
    team: "Individual",
    context: "HCDE 310, University of Washington",
    cover: "assets/img/vh-results.webp",
    coverAlt:
      "Vacation Helper results page listing Las Vegas and Salt Lake City with flight cost, hotel cost, total cost, and a fits budget status.",
    coverFit: "contain",
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            t: "p",
            text:
              "Vacation Helper takes an origin airport, a budget, and a number of nights. It returns a ranked list of destinations with estimated total cost and a plain sentence on why each one fits. Each result opens a detail page with the current weather.",
          },
          { t: "links", items: [{ label: "Try the redesign (demo)", href: "vacation-helper-demo/index.html" }, { label: "Redesigned version on GitHub", href: "https://github.com/Dev-0206/Vacation-Helper" }, { label: "Original class version", href: "https://github.com/Dev-0206/Vacation-Helper/tree/class-submission" }] },
        ],
      },
      {
        id: "problem",
        title: "Problem",
        blocks: [
          {
            t: "p",
            text:
              "Choosing where to go on a fixed budget means adding up flights and hotel nights for every option. I wanted one list that does the math and shows its working.",
          },
          {
            t: "p",
            text:
              "This was a solo course project. I did no user research or testing, so the design choices below come from my own reasoning.",
          },
        ],
      },
      {
        id: "process",
        title: "How it works",
        open: true,
        blocks: [
          {
            t: "steps",
            items: [
              { title: "Input", text: "Three fields: origin airport, budget, and trip length in nights." },
              { title: "Calculate", text: "The app reads a CSV of destinations and adds the estimated flight cost to the nightly hotel price times the number of nights." },
              { title: "Rank", text: "Results are sorted by cost, and each one shows whether it fits the budget and why." },
              { title: "Detail", text: "Each result opens a page with what the place is best for, average hotel cost, a sample flight price, a short description, and the current weather from the OpenWeatherMap API." },
            ],
          },
          {
            t: "note",
            title: "Live data and estimates",
            text:
              "Flight and hotel prices are estimates stored in a CSV file in the repo. Only the weather comes from a live API. A real version would need live price data.",
          },
          {
            t: "table",
            head: ["Example", "Value"],
            rows: [
              ["Origin, budget, trip length", "SEA, $1,200, 5 nights"],
              ["Las Vegas flight", "$180"],
              ["Las Vegas hotel", "$700 (5 nights at $140)"],
              ["Las Vegas total", "$880, fits budget"],
            ],
            caption: "A worked example from the app.",
          },
        ],
      },
      {
        id: "decisions",
        title: "Key decisions",
        blocks: [
          {
            t: "cards",
            cols: 3,
            items: [
              { title: "Show the reasoning", text: "Each result says why it fits, for example that the estimated flight is $180 and the hotel is $420. People can check the math instead of trusting a rank." },
              { title: "Keep the form short", text: "Three inputs get a result. Everything else lives on the detail page one click away." },
              { title: "Label the place", text: "A Best For tag, such as nightlife, gives each destination a reason to be picked beyond price." },
            ],
          },
          {
            t: "p",
            text:
              "Two engineering fixes mattered as much as the screens.",
          },
          {
            t: "cards",
            cols: 2,
            items: [
              { title: "A CSV parsing bug", text: "Text fields with unquoted commas split rows in the wrong places and broke the data the app read. I found it and fixed it so each destination loads as one record." },
              { title: "A safer API key", text: "I moved the weather API key out of the code and into an environment variable loaded with python-dotenv, so it is not committed to the repository." },
            ],
          },
        ],
      },
      {
        id: "design",
        title: "Screens (class version)",
        blocks: [
          {
            t: "figs",
            cols: 2,
            items: [
              { src: "assets/img/vh-home.webp", alt: "Vacation Helper home screen with fields for origin airport, budget, and trip length and a Find Trips button.", caption: "Home. Three inputs." },
              { src: "assets/img/vh-detail.webp", alt: "Las Vegas detail page listing best for nightlife, average nightly hotel cost of $140, sample flight price of $180, and a description.", caption: "Destination detail." },
            ],
          },
          {
            t: "fig",
            wide: true,
            src: "assets/img/vh-results.webp",
            alt: "Results page for SEA with a $1,200 budget and 5 nights, showing Las Vegas and Salt Lake City with flight cost, hotel cost, total cost, status, and a reason sentence.",
            caption: "Results for SEA, $1,200, 5 nights.",
          },
        ],
      },
      {
        id: "after-class",
        title: "After the class: redesign",
        open: true,
        blocks: [
          {
            t: "p",
            text:
              "The class ended with a working app and a plain interface. I kept working on it afterward because the results page did not yet feel like planning a trip. The original version stays on its own branch, so you can compare the two.",
          },
          {
            t: "list",
            items: [
              "Each destination has its own illustrated scene as a background, so a result looks like a place instead of a row.",
              "The home form shows how many destinations fit as you change the budget or nights, before you submit.",
              "Results can be filtered by vibe (beach, food, outdoors), sorted, and compared side by side, up to three at a time.",
              "A nights slider on each destination recalculates the total and shows what is left of the budget.",
              "Fixes: bad input is clamped instead of breaking a page, the origin airport is removed from the list, and the weather loads separately so a slow API no longer blocks the page.",
              "Accessibility: keyboard focus, labelled controls, dark mode, and reduced-motion support.",
            ],
          },
          {
            t: "figs",
            cols: 2,
            items: [
              { src: "assets/img/vh2-home.webp", alt: "Redesigned Vacation Helper home screen over a night city scene, with airport, budget, nights, and vibe chips, and a line saying how many destinations fit.", caption: "Home, with live feedback." },
              { src: "assets/img/vh2-det.webp", alt: "Redesigned Las Vegas destination page with a neon city scene and a trip cost panel.", caption: "Destination, with a nights slider." },
            ],
          },
          {
            t: "fig",
            wide: true,
            src: "assets/img/vh2-res.webp",
            alt: "Redesigned results page with filter chips and cards that each show an illustrated scene, estimated total, flight and hotel split, and money left.",
            caption: "Results for SEA, $1,200, 5 nights.",
          },
          {
            t: "p",
            text:
              "The original app, its logic, and its data are my own work from class. After the class, I directed a redesign using Claude as a coding assistant. I set the goals and tested the result. I have not run a usability test on the redesign yet.",
          },
          {
            t: "p",
            text:
              "What did not change: prices are still estimates from a sample list, and the origin airport does not change them. The page now says so. The demo has no live weather, which needs the full Flask app.",
          },
        ],
      },
      {
        id: "reflection",
        title: "Reflection",
        blocks: [
          {
            t: "p",
            text:
              "Before this project I mostly wrote programs that ran in the terminal. Flask let me build something a person can use in a browser.",
          },
          {
            t: "p",
            text:
              "At first I was confused by how routes connect the pages, especially once I added the detail page. After some trial and error it started to make sense, and I could see how the back end and the screen depend on each other.",
          },
        ],
      },
      {
        id: "next",
        title: "Next steps",
        blocks: [
          {
            t: "list",
            items: [
              "Replace the estimates with live flight and hotel data.",
              "Go beyond vibe filters with preferences such as climate or pace.",
              "Test the redesigned results with real trip planners. It has not been tested yet.",
              "Deploy it so people can try it without running Python.",
            ],
          },
        ],
      },
    ],
  },
];

/* Second Spin life cycle data. Stickies come from our Miro board (LCA_Fall 2025). */
window.LCA = {
  legend: [
    { k: "mat", label: "Material or energy going in" },
    { k: "em", label: "Emission or waste" },
    { k: "prod", label: "Product or outcome" },
  ],
  stages: [
    {
      name: "Extraction",
      blurb: "The raw materials needed before a record can be made: salt, oil, gas, water, lead, calcium, and zinc.",
      inputs: [
        { t: "Electricity, machinery, labor, and fossil fuels", k: "mat" },
        { t: "Salt for chlorine in making PVC", k: "mat" },
        { t: "Oil to make ethylene", k: "mat" },
        { t: "Water for cooling and processing", k: "mat" },
        { t: "Lead, calcium, and zinc compounds", k: "mat" },
        { t: "Labor", k: "mat" },
      ],
      outputs: [
        { t: "Toxic chloride compounds", k: "em" },
        { t: "Wastewater and chemicals", k: "em" },
        { t: "PVC compound", k: "prod" },
        { t: "Stabilizers to preserve PVC", k: "mat" },
      ],
      change: "In the model, reprinted records need no new PVC. New PVC used goes from 84,948 kg to 0 kg.",
    },
    {
      name: "Manufacturing",
      focus: true,
      blurb: "Pressing a record needs PVC, pigments, paper, metal stampers, and a lot of electricity. This is where most of the emissions are.",
      inputs: [
        { t: "Electricity to power machinery", k: "mat" },
        { t: "PVC compound", k: "mat" },
        { t: "Pigments and dyes", k: "mat" },
        { t: "Metal stampers", k: "mat" },
        { t: "Paper or cardboard sticker", k: "mat" },
        { t: "Labor", k: "mat" },
      ],
      outputs: [
        { t: "Scope 2 electricity emissions: 182.295 tonnes CO2e (location-based) for 1,706,860 records, from the industry carbon report", k: "em" },
        { t: "93% is turned into records, 7% is reground", k: "prod" },
        { t: "Print and designs", k: "prod" },
        { t: "Finished vinyl", k: "prod" },
      ],
      change: "Reprinting collected records replaces making new PVC compound. CO2 from the PVC compound falls from 233,862 kg to 1,623 kg in the model.",
    },
    {
      name: "Transport and packaging",
      blurb: "Records must be packaged carefully, which uses more material than we first expected.",
      inputs: [
        { t: "Inner sleeve", k: "mat" },
        { t: "Paperboard outer sleeve", k: "mat" },
        { t: "Plastic shrinkwrap", k: "mat" },
        { t: "Transportation fuel", k: "mat" },
        { t: "Finished record", k: "mat" },
      ],
      outputs: [
        { t: "Waste and emissions: 21 g CO2e per paper sleeve or 24 g per poly sleeve", k: "em" },
        { t: "Wastage in trim and emissions: 158 g CO2e per outer sleeve", k: "em" },
        { t: "Waste and emissions: 7.7 g CO2e per record", k: "em" },
        { t: "Carbon emissions from transportation", k: "em" },
        { t: "Packaged album", k: "prod" },
      ],
      change: "Sleeves and covers switch to 100% recycled paper, so paper CO2 goes from 126,293 kg to 69,461 kg. Collecting records from stores adds about 702 kg a year, which the model does not subtract.",
    },
    {
      name: "Use",
      blurb: "Record players need electricity. It is not a big problem, but it is still part of the picture.",
      inputs: [
        { t: "Electricity to power a turntable, amplifier, and speaker. About 0.017 kWh for one hour of listening, using a system that draws 17 watts", k: "mat" },
        { t: "Labor", k: "mat" },
      ],
      outputs: [
        { t: "Scope 2 carbon emissions from electricity", k: "em" },
        { t: "Repaired vinyl", k: "prod" },
      ],
      change: "No change is modeled for this stage.",
    },
    {
      name: "End of life",
      focus: true,
      blurb: "A record ends up in one of two places: landfill or a second owner. This and manufacturing became our focus.",
      inputs: [
        { t: "Used record", k: "mat" },
        { t: "Packaging", k: "mat" },
      ],
      outputs: [
        { t: "Landfill", k: "em" },
        { t: "Sold secondhand", k: "prod" },
      ],
      change: "Damaged and unwanted records are collected through record stores and reprinted instead of going to landfill.",
    },
  ],
  model: { records: 705549, current: 360161, paper: 69461, assumedG: 2.3, transport: 702 },
};
