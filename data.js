/* =====================================================================
   PROFILE DATA — the ONLY file you need to edit.
   ---------------------------------------------------------------------
   • Change any text between the quotes.
   • To remove a whole section, make its list empty:  papers: []
   • To remove a single field, set it to ""  (it will be hidden).
   • Links with an empty url: "" are hidden — fill the url to show them.
   • Links: "platform" picks the icon & colour. Supported:
       facebook, instagram, github, codeforces, linkedin, scholar,
       researchgate, orcid, youtube, x, website, email, whatsapp,
       telegram, leetcode, kaggle, medium, phone
     Anything else gets a generic link icon.
   • Keep commas between items, exactly like the examples.
   Source: https://cse.uiu.ac.bd/faculty/tarek/
   ===================================================================== */

window.PROFILE = {
  name: "MD TAREK HASAN",
  title: "Assistant Professor & Undergraduate Program Coordinator",
  department: "Department of Computer Science & Engineering",
  institution: "United International University",
  photo: "assets/photo.jpeg",          // put the photo in /assets; if missing, initials are shown
  photoPosition: "50% 15%",            // which part of the photo the circle centres on (x% y%)
  roles: [                             // cycles in the typing animation under the name
    "Educator",
    "Machine Learning Researcher",
    "Competitive Programmer",
    "Valedictorian & Gold Medalist"
  ],
  bio:
    "I am Md. Tarek Hasan, an Assistant Professor and Undergraduate Program Coordinator in the Department of Computer Science and Engineering at United International University, Bangladesh. " +
    "I completed my Bachelor of Science and Master of Science in Computer Science and Engineering with a perfect CGPA of 4.00 out of 4.00 from United International University (UIU). I was awarded the Valedictorian title and the Gold Medal at the 7th Convocation of UIU for my outstanding performance in the undergraduate program, and received another Gold Medal at the 8th Convocation for academic excellence in the graduate program. " +
    "My research interests focus on applied machine learning, with particular emphasis on computer vision, natural language processing, algorithm design, and reinforcement learning. As a research intern at the National University of Singapore (NUS), I worked on biometric authentication systems and deepfake synthesis and detection. My research has been presented at several international conferences and published in academic journals, contributing to the advancement of AI-driven technologies.",

  email: "tarek@cse.uiu.ac.bd",
  phone: "",                            // add a phone number if he wants it shown
  office: "Room 412, Dept. of CSE, United International University (PABX 3145)",
  location: "Dhaka, Bangladesh",
  website: "https://cse.uiu.ac.bd/faculty/tarek/",

  stats: [
    { label: "Publications", value: 12 },
    { label: "Gold Medals", value: 2 },
    { label: "Years Teaching", value: 4, suffix: "+" }
  ],

  links: [
    { platform: "email",        label: "Email",           handle: "tarek@cse.uiu.ac.bd",   url: "mailto:tarek@cse.uiu.ac.bd" },
    { platform: "website",      label: "UIU Faculty Profile", handle: "cse.uiu.ac.bd/faculty/tarek", url: "https://cse.uiu.ac.bd/faculty/tarek/" },
    { platform: "youtube",      label: "Valedictorian Speech", handle: "7th UIU Convocation", url: "https://youtu.be/1L9xpIR4lOs?si=9zgGufEB-PTUIzgM" },
    // ↓ Fill in the url to show these (empty url = hidden)
    { platform: "scholar",      label: "Google Scholar",  handle: "Citations",  url: "" },
    { platform: "github",       label: "GitHub",          handle: "",           url: "" },
    { platform: "codeforces",   label: "Codeforces",      handle: "",           url: "" },
    { platform: "linkedin",     label: "LinkedIn",        handle: "",           url: "" },
    { platform: "researchgate", label: "ResearchGate",    handle: "",           url: "" },
    { platform: "orcid",        label: "ORCID",           handle: "",           url: "" },
    { platform: "facebook",     label: "Facebook",        handle: "",           url: "" },
    { platform: "instagram",    label: "Instagram",       handle: "",           url: "" }
  ],

  documents: [
    // { label: "Curriculum Vitae", note: "PDF", url: "assets/cv.pdf" },
    { label: "Blockchain Olympiad Bangladesh 2021", note: "CERT", url: "https://drive.google.com/file/d/1n3E7soAfC0c2cugR4SyjmjZEBuhaPEFO/view?usp=sharing" },
    { label: "International Blockchain Olympiad 2021", note: "CERT", url: "https://drive.google.com/file/d/12-oPYMMuCvRNfF_OfP0EEaRSHey0hJHB/view?usp=sharing" }
  ],

  expertise: [
    "Algorithms", "Computer Vision", "Natural Language Processing",
    "Reinforcement Learning", "Applied Machine Learning", "Deepfake Detection",
    "Biometric Authentication", "Competitive Programming"
  ],

  // Experience timeline
  timeline: [
    { year: "Feb 2026 — Present",  text: "Assistant Professor & UG Program Coordinator, Dept. of CSE, UIU" },
    { year: "Apr 2024 — Feb 2026", text: "Moderator, UIU Computer Club" },
    { year: "Jun — Sep 2024",      text: "Summer Research Intern, School of Computing, National University of Singapore" },
    { year: "Jun 2022 — Feb 2026", text: "Lecturer, Dept. of CSE, UIU" },
    { year: "Feb — Jun 2022",      text: "Software Engineer, Samsung R&D Institute Bangladesh" },
    { year: "Nov 2021 — Feb 2022", text: "Undergraduate Assistant, Dept. of CSE, UIU" }
  ],

  education: [
    { degree: "M.Sc. in Computer Science & Engineering", school: "United International University", years: "2024 — 2025", result: "CGPA 4.00 / 4.00 · Gold Medal" },
    { degree: "B.Sc. in Computer Science & Engineering", school: "United International University", years: "2018 — 2022", result: "CGPA 4.00 / 4.00 · Valedictorian, Summa Cum Laude" },
    { degree: "HSC", school: "Engineering University School & College", years: "2015 — 2017", result: "GPA 5.00 / 5.00 · Dhaka Board" },
    { degree: "SSC", school: "Engineering University School & College", years: "2004 — 2015", result: "GPA 5.00 / 5.00 · Dhaka Board" }
  ],

  awards: [
    { title: "Valedictorian, Gold Medalist & Summa Cum Laude", detail: "7th UIU Convocation", url: "https://youtu.be/1L9xpIR4lOs?si=9zgGufEB-PTUIzgM" },
    { title: "Gold Medalist & Summa Cum Laude", detail: "8th UIU Convocation" },
    { title: "Dr. Fatema Rashid Best Paper Award — 2nd Position", detail: "ECCE 2023" },
    { title: "Theme Category Winner", detail: "Blockchain Olympiad Bangladesh 2021 · Represented Bangladesh at the International Blockchain Olympiad 2021 (e-Health)", url: "https://drive.google.com/file/d/1n3E7soAfC0c2cugR4SyjmjZEBuhaPEFO/view?usp=sharing" },
    { title: "Champion, Software Engineering Project", detail: "UIU CSE Project Show, Fall 2021" },
    { title: "1st Runner-up (OOP) & 2nd Runner-up (Electronics)", detail: "UIU CSE Project Show, Summer 2019" },
    { title: "1st Runner-up", detail: "UIU Coders Combat & Coders Combat 2.0 (Sophomore & Junior)" }
  ],

  papersShown: 6,   // how many papers show before "Show all"
  papers: [
    { title: "Many Dialects, Many Languages, One Cultural Lens", authors: "Sayeedi, N. L., et al.", venue: "Findings of ACL: EMNLP 2026", year: 2026, url: "https://doi.org/10.18653/2026.findings-emnlp.2129" },
    { title: "Architecture-oriented benchmarking and weighted ensemble learning for multi-class plant disease classification", authors: "Hasan, M. T., et al.", venue: "Array (Elsevier)", year: 2026, url: "https://doi.org/10.1016/j.array.2026.101348" },
    { title: "DPMT-Net: A Dual-Prompt Attention Multi-Task 3D Network for Joint Nodule Segmentation and Malignancy Prediction in Lung CT Scans", authors: "Sutradhar, D., et al.", venue: "Complex & Intelligent Systems (Springer)", year: 2026, url: "https://doi.org/10.1007/s40747-026-02337-w" },
    { title: "Tabular and Graph-Based Representations for Noise and Missing Data in Robust Machine Learning", authors: "Imran, G., et al.", venue: "Array (Elsevier)", year: 2026, url: "https://www.sciencedirect.com/science/article/pii/S2590005626000202" },
    { title: "AniFaceDiff: Animating Stylized Avatars via Parametric Conditioned Diffusion Models", authors: "Chen, K., et al.", venue: "Pattern Recognition (Elsevier)", year: 2025, url: "https://doi.org/10.1016/j.patcog.2025.112017" },
    { title: "RipeNet: A Deep Learning Framework for Exterior Image-Based Watermelon Ripeness Prediction", authors: "Shourav, S. A., et al.", venue: "ICCIT 2025", year: 2025, url: "https://doi.org/10.1109/ICCIT68739.2025.11490182" },
    { title: "Fitness Risk Analysis in Gym Training", authors: "Rahman, M., et al.", venue: "ICCIT 2025", year: 2025, url: "https://ieeexplore.ieee.org/document/11491741" },
    { title: "BnSFD: YOLOv12-Based Detection of Bangladeshi Street Foods for Cultural Heritage", authors: "Nafiz, A., et al.", venue: "ICCIT 2025", year: 2025, url: "https://doi.org/10.1109/ICCIT68739.2025.11490261" },
    { title: "Scaling Millions to Billions: CAIEFinder's Journey from Monolith to Microservices to Serverless", authors: "Islam, R. A., et al.", venue: "NoF 2025", year: 2025, url: "https://ieeexplore.ieee.org/document/11223309" },
    { title: "A Review on Deep-Learning-Based Cyberbullying Detection", authors: "Hasan, M. T., et al.", venue: "Future Internet (MDPI)", year: 2023, url: "https://www.mdpi.com/1999-5903/15/5/179" },
    { title: "Adaptive Tabu Dropout for Regularization of Deep Neural Networks", authors: "Hasan, M. T., et al.", venue: "ICONIP 2022 (Springer)", year: 2023, url: "https://link.springer.com/chapter/10.1007/978-3-031-30105-6_30" },
    { title: "KNNTree: A New Method to Ameliorate K-Nearest Neighbour Classification using Decision Tree", authors: "Islam, N., et al.", venue: "ECCE 2023", year: 2023, url: "https://ieeexplore.ieee.org/abstract/document/10101569" }
  ],

  dedication: "Crafted with gratitude by Md Nymur Reza, Arijit Saha and Imam Hasan (Batch - 242)",   // footer line ("" to hide)

  motion: "full",   // "full" = always animate · "auto" = turn animations off on devices set to "reduce motion"

  theme: {
    gold: "#d4af37"        // accent colour — try "#c9a227", "#e0b973", "#8fb3ff"
  }
};
