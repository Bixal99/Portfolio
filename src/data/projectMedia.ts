export type ProjectMedia = { slug: string; name: string; label: string; video?: string; note?: string; artwork?: "learning" };
// Real captures; origins and measurements are documented in public/demos/sources.json.
export const projectMedia: ProjectMedia[] = [
  { slug: 'hms', name: 'Hospital Management', label: 'Site tour', video: '/demos/hms.mp4', note: 'Public website tour. Admin workflows require sign-in.' },
  { slug: 'churn', name: 'Churn Prediction', label: 'Prediction demo', video: '/demos/churn.mp4', note: 'XGBoost prediction demo. The AI retention service is currently unavailable.' },
  { slug: 'eye-blink', name: 'Eye Blink Morse', label: 'Recorded demo', video: '/demos/eye-blink.mp4' },
  { slug: 'ai-book', name: 'AI Book Assistant', label: 'Site tour', video: '/demos/ai-book.mp4', note: 'Public website tour. Reading tools require sign-in.' },
  { slug: 'retroverse', name: 'RetroVerse', label: 'Gameplay', video: '/demos/retroverse.mp4' },
  { slug: 'scrapper', name: 'Scrapper', label: 'Site tour', video: '/demos/scrapper.mp4' },
  { slug: 'ghoomora', name: 'Ghoomora', label: 'Site tour', video: '/demos/ghoomora.mp4', note: 'Public website tour. The trip planner needs its database connected.' },
  { slug: 'pentagram', name: 'Pentagram', label: 'Interface tour', video: '/demos/pentagram.mp4', note: 'Console tour. Image generation needs the local SDXL backend.' },
  { slug: "interview-help", name: "Interview Help", label: "Learning platform", artwork: "learning" },
  { slug: "falcon-trading", name: "Falcon Trading", label: "Trading desk", note: "Dashboard access requires sign-in." },
];
