import img1 from "../assets/PROJECTS/siecmigration.png";
import img2 from "../assets/PROJECTS/siecindia.png";
import img3 from "../assets/PROJECTS/ScholarTest.png";
import img4 from "../assets/PROJECTS/studyabroadloans.png";
import img5 from "../assets/PROJECTS/CRMportal.png";
import img6 from "../assets/PROJECTS/siec_organizer.png";
import img7 from "../assets/PROJECTS/sieclandingpage.png";
import img8 from "../assets/PROJECTS/socialmedia.JPG";
import img9 from "../assets/PROJECTS/Pine_n_teak_desktop.png";
import img10 from "../assets/PROJECTS/event_page.png";
import img11 from "../assets/PROJECTS/International_education_fair_2025.png";

import salHeroScr from "../assets/PROJECTS/sal_hero_screenshot.png";
import salServicesScr from "../assets/PROJECTS/sal_services_screenshot.png";
import salProfilesScr from "../assets/PROJECTS/sal_profiles_screenshot.png";
import salTestimonialsScr from "../assets/PROJECTS/sal_testimonials_screenshot.png";
import salFooterScr from "../assets/PROJECTS/sal_footer_screenshot.png";

import loanMockup1 from "../assets/project_mockups/Loan_mockup_1.png";
import loanMockup2 from "../assets/project_mockups/Loan_mockup_2.png";
import loanMockup3 from "../assets/project_mockups/Loan_mockup_3.png";

export const projects = [
  {
    id: 1,
    title: "SIEC Migration",
    category: "Web Design",
    description:
      "A premium food & restaurant brand experience with immersive visuals.",
    gradient: "linear-gradient(135deg, #059c00ff 0%, #4ba24eff 100%)",
    accent: "#8fd287ff",
    image: img1,
    liveUrl: "https://www.siecmigration.com/",
  },
  {
    id: 2,
    title: "SIEC India",
    category: "UI/UX Design",
    description:
      "A modern analytics dashboard with real-time data visualization.",
    gradient: "linear-gradient(135deg, #a1fb93ff 0%, #9bf557ff 100%)",
    accent: "#9deb8dff",
    image: img2,
    liveUrl: "https://www.siecindia.com/",
  },
  {
    id: 3,
    title: "Scholastic Testmasters",
    category: "Web Design",
    description:
      "Luxury fashion e-commerce platform with elegant product showcases.",
    gradient: "linear-gradient(135deg, #791f99ff 0%, #ced843ff 100%)",
    accent: "#6e00feff",
    image: img3,
    liveUrl: "https://www.siectestmasters.com/",
  },
  {
    id: 4,
    title: "Study Abroad Loans",
    category: "Web Design",
    description:
      "A fintech × edtech platform for SIEC Group — helping Indian students finance overseas education with 50+ lending partners.",
    gradient: "linear-gradient(135deg, #436fe9ff 0%, #5d76bbff 100%)",
    accent: "#f9e638ff",
    image: img4,
    // ─── Extended Showcase Data ───
    liveUrl: "https://studyabroadloans.in/",
    client: "SIEC Group",
    role: "UI/UX Design & Web Build",
    year: "2024",
    platform: "Responsive Web",
    sector: "Education Finance",
    mockups: [loanMockup1, loanMockup2, loanMockup3],
    showcaseImages: [
      {
        src: salHeroScr,
        label: "Hero Section Design",
        explanation:
          "Deep navy background establishes security and corporate trust instantly. Clean typography with a single primary yellow CTA focuses the user journey on conversion, complemented by floating quick-value badges and key partner logos immediately below.",
      },
      {
        src: salServicesScr,
        label: "Special Services Section",
        explanation:
          "A tabbed category layout that minimizes page length and clutter. Users can switch between Education Loans, Accommodation, and Forex. The active container integrates direct bulleted value propositions and verified social proof testimonial in a single card.",
      },
      {
        src: salProfilesScr,
        label: "Borrower Profiles Considered",
        explanation:
          "Color-coded headers and distinct typography for various applicant types (NRIs, Self-Employed, Salaried). This structured visual hierarchy allows different user personas to self-identify their path and eligibility immediately without reading dense text.",
      },
      {
        src: salTestimonialsScr,
        label: "Customer Testimonials",
        explanation:
          "A clean, high-contrast grid display of real student success stories. Star ratings and card container borders maintain readability on dark backgrounds, helping validate trust and remove anxiety associated with loan approval.",
      },
      {
        src: salFooterScr,
        label: "Lead Capture & Footer Integration",
        explanation:
          "A high-converting, focused contact card form asking for minimal details to connect with a loan advisor. Below it, a well-organized multi-column footer lists navigation links, legal information, and partner offices clearly.",
      },
    ],
    palette: [
      { name: "Ink Navy", hex: "#0B2A4A" },
      { name: "Deep Harbor", hex: "#123A63" },
      { name: "Seal Gold", hex: "#C6963A" },
      { name: "Runway Teal", hex: "#1E7268" },
      { name: "Visa Coral", hex: "#D9553A" },
      { name: "Paper", hex: "#EEF2F0" },
    ],
    features: [
      {
        title: "Competitive Interest Rates",
        desc: "Partnered with 50+ top Indian & international banks for the lowest ROI.",
      },
      {
        title: "100% Course Funding",
        desc: "Covers tuition, accommodation, and living expenses for 11 countries.",
      },
      {
        title: "Dedicated Loan Experts",
        desc: "Every applicant gets a personal loan advisor from start to finish.",
      },
      {
        title: "5 Borrower Profiles",
        desc: "NRIs, Salaried, Self-Employed, Business Owners & Agricultural — each with tailored eligibility.",
      },
      {
        title: "3-Step Apply Flow",
        desc: "Check eligibility → Get best rate → Submit documents. No hidden catches.",
      },
      {
        title: "End-to-End Assistance",
        desc: "From eligibility check through application to disbursement — fully guided.",
      },
    ],

    designHighlights: [
      'Single-CTA discipline — "Check Your Eligibility" repeated without competing actions',
      "Banking-grade navy & gold palette builds trust in the first 3 seconds",
      "Tabbed services section with 6 categories in a pill-nav UI",
      "Profile cards with color-coded headers for instant self-identification",
      'Radial "Why Choose Us" flowchart with brand at center',
      "Mobile-first design for Tier-2/3 India on mid-range Android devices",
    ],
  },
  {
    id: 5,
    title: "Gradlynk CRM",
    category: "Software Design",
    description:
      "Music streaming platform with immersive audio-visual experience.",
    gradient: "linear-gradient(135deg, #708bd5ff 0%, #79abc4ff 100%)",
    accent: "#fee140",
    image: img5,
    liveUrl: "#",
  },
  {
    id: 6,
    title: "SIEC Organizor",
    category: "App Design",
    description:
      "Interior design studio website with elegant portfolio layouts.",
    gradient: "linear-gradient(135deg, #1136b1ff 0%, #0d1c6eff 100%)",
    accent: "#15ef11ff",
    image: img6,
    liveUrl: "#",
  },
  {
    id: 7,
    title: "SIEC Landing Pages",
    category: "Web Design",
    description:
      "Interior design studio website with elegant portfolio layouts.",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    accent: "#fbc2eb",
    image: img7,
    liveUrl: "#",
  },
  {
    id: 8,
    title: "Social Media Posts",
    category: "Social Media Marketing",
    description:
      "Interior design studio website with elegant portfolio layouts.",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    accent: "#fbc2eb",
    image: img8,
    liveUrl:
      "https://www.instagram.com/siecmigration?igsh=eXl6dnIzejNqOXIw,https://www.instagram.com/siec.canada?igsh=MWU3bzQwNGRpeTVvNg==,https://www.instagram.com/siec.india?igsh=aWUxeDRrY2duZDdj,https://www.instagram.com/studyabroadloans?igsh=aWprbTQwbWxqZmJv",
  },
  {
    id: 9,
    title: "Pine n teak",
    category: "Web Design",
    description:
      "Interior design studio website with elegant portfolio layouts.",
    gradient: "linear-gradient(135deg, #ec873eff 0%, #df803dff 100%)",
    accent: "#ffbea9ff",
    image: img9,
    liveUrl: "#",
  },
  {
    id: 10,
    title: "Event landing page siec migration",
    category: "Web Design",
    description:
      "Interior design studio website with elegant portfolio layouts.",
    gradient: "linear-gradient(135deg, #ec873eff 0%, #df803dff 100%)",
    accent: "#ffbea9ff",
    image: img10,
    liveUrl: "#",
  },
  {
    id: 11,
    title: "International education fair 2025",
    category: "Web Design",
    description:
      "Interior design studio website with elegant portfolio layouts.",
    gradient: "linear-gradient(135deg, #ec873eff 0%, #df803dff 100%)",
    accent: "#ffbea9ff",
    image: img11,
    liveUrl: "#",
  },
];
