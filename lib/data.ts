export const profile = {
  name: "Md Shafayat Hosan",
  shortName: "Shafayat",
  brand: "SHAFAYAT.",
  designation: "Full Stack Developer",
  tagline: "I build fast, real-time web products end to end.",
  location: "Chattogram, Bangladesh",
  email: "shafayat783@gmail.com",
  phone: "+8801610665069",
  whatsapp: "8801610665069",
  github: "https://github.com/shafayat783593",
  resumeUrl: "https://drive.google.com/file/d/1JnAZUpopFz6LqsTrLzPN9-ADa6PY6IUq/view?usp=sharing",

  
  // drop your resume.pdf inside /public when ready
};

export const socials = [
  { name: "GitHub", href: "https://github.com/shafayat783593", icon: "Github" },
  { name: "Email", href: "mailto:shafayat783@gmail.com", icon: "Mail" },
  { name: "WhatsApp", href: "https://wa.me/8801610665069", icon: "MessageCircle" },
  // add LinkedIn / Twitter / Facebook the same way once you have the links
  { name: "LinkedIn", href: "https://www.linkedin.com/in/md-shafayat-hosan", icon: "Linkedin" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "Crafting Digital Experiences",
  paragraphs: [
    "My journey into the digital realm began with curiosity during my computer science studies. From mastering HTML/CSS to building complex React and Next.js applications, I've embraced the digital evolution to create immersive web experiences.",
    "I specialize in developing cutting-edge digital solutions that combine innovative technology with user-centered design — real-time chat, live tracking, and payment systems included. Every line of code is crafted to deliver seamless, responsive, and engaging interactions.",
    "Beyond the digital world, I find balance in sports and physical activities. This harmony between digital creation and real-world movement fuels my creativity and keeps me sharp.",
  ],
};

export const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", level: "Advanced", icon: "Code2" },
      { name: "React", level: "Advanced", icon: "Atom" },
      { name: "Next.js", level: "Advanced", icon: "Layers" },
      { name: "TypeScript", level: "Intermediate", icon: "FileType2" },
      { name: "Tailwind CSS", level: "Advanced", icon: "Palette" },
      { name: "Redux", level: "Intermediate", icon: "Boxes" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: "Advanced", icon: "Server" },
      { name: "Express.js", level: "Advanced", icon: "Network" },
      { name: "Prisma", level: "Intermediate", icon: "Database" },
      { name: "PostgreSQL", level: "Intermediate", icon: "Cylinder" },
      { name: "MongoDB", level: "Advanced", icon: "Leaf" },
      { name: "Mongoose", level: "Intermediate", icon: "GitBranch" },
    ],
  },
];

export const levelToPercent: Record<string, number> = {
  Beginner: 40,
  Intermediate: 65,
  Advanced: 90,
};

export const education = [
  {
    degree: "Diploma in Computer Technology",
    institute: "Feni Polytechnic Institute",
    period: "2023 – Present",
    detail:
      "Currently pursuing a diploma with focus on modern web development, backend systems, and software solutions. Emphasis on practical knowledge and industry-ready skill development.",
  },
];

export const experience: {
  role: string;
  company: string;
  period: string;
  detail: string;
}[] = [
  // Add real roles here when available, e.g.:
  // { role: "Full Stack Developer (Freelance)", company: "Self-employed", period: "2024 – Present", detail: "Building production e-commerce and SaaS platforms for clients." },
];

export const projectsSeed = [
  {
    slug: "novashop",
    name: "NovaShop (Arinexa)",
    image: "/images/project-novashop.svg",
    summary:
      "Multi-role e-commerce platform with real-time chat, live delivery tracking, and local payment gateways.",
    description:
      "NovaShop is a full-featured e-commerce platform built for the Bangladeshi market. It supports multi-role access (customer, vendor, admin), a real-time customer-to-admin chat system built on Socket.IO, live order/delivery tracking, and integrated payments via bKash and SSLCommerz. The backend handles auth with Google OAuth alongside email/password, transactional email through Resend, and a Redis-backed session and caching layer.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Socket.IO", "Redis", "bKash", "SSLCommerz"],
    liveUrl: "https://your-novashop-live-link.example.com",
    githubUrl: "https://github.com/shafayat783593",
    challenges:
      "The hardest part was Google OAuth in production: SMTP was blocked on Render (fixed by moving to Resend's HTTP API), cross-origin cookies broke the session (fixed with Vercel rewrites so the backend is same-origin, plus sameSite=lax), and a race condition where the app fetched the user before the auth cookie had settled after redirect. I also had two separate Socket.IO instances silently created from split socket files, which meant chat messages needed a page reload to appear — consolidating into a single socket module fixed it for good.",
    improvements:
      "Next up: server-side pagination for the admin product catalog, a proper analytics dashboard for vendors, push notifications for delivery updates, and moving image uploads to a CDN with on-the-fly resizing.",
  },
  {
    slug: "salon-saas",
    name: "Salon Management SaaS",
    image: "/images/project-salon.svg",
    summary:
      "Super admin dashboard for a salon SaaS: subscription management, purchase request review, and earnings analytics.",
    description:
      "A super-admin dashboard for a multi-tenant salon management SaaS. Built with Mongoose aggregation pipelines for earnings summaries, paginated tables with skeleton loading states, and a review workflow for incoming purchase/subscription requests before they're approved and activated.",
    stack: ["Next.js", "MongoDB", "Mongoose", "Tailwind CSS", "Express"],
    liveUrl: "https://your-salon-saas-live-link.example.com",
    githubUrl: "https://github.com/shafayat783593",
    challenges:
      "Aggregating accurate earnings summaries across many tenants without slowing down the dashboard required carefully indexed Mongoose aggregation pipelines instead of pulling raw documents into memory.",
    improvements:
      "Planned: role-based permissions inside the super admin panel itself, exportable CSV/PDF earnings reports, and webhook-based subscription renewal reminders.",
  },
  {
    slug: "realtime-chat",
    name: "Realtime Customer-Admin Chat",
    image: "/images/project-chat.svg",
    summary:
      "Foundational real-time chat system between customers and admins with typing indicators and unread counts.",
    description:
      "A standalone real-time chat module built with Socket.IO, featuring in-memory conversation storage, live typing indicators, and unread message counts per conversation. It was later folded into NovaShop as its support-chat layer.",
    stack: ["Next.js", "Socket.IO", "Node.js", "Express"],
    liveUrl: "https://your-chat-demo-live-link.example.com",
    githubUrl: "https://github.com/shafayat783593",
    challenges:
      "Keeping the widget visually stable was tricky: Framer Motion's CSS transforms broke a position: fixed chat widget in Chrome and Firefox. Rendering it through a React portal straight onto document.body solved the positioning bug for good.",
    improvements:
      "Future plans: move conversation storage from memory to MongoDB for persistence across restarts, add file/image attachments, and add read receipts.",
  },
];
