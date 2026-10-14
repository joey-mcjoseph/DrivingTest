# Körkort Practice

A phone-friendly practice app for the Swedish B-licence theory test (in English).
It installs on an iPhone home screen and works offline.

## What it does

- **Full mock exams** like the real test: 70 questions, 50 minutes. 65 are scored
  (32 traffic rules, 16 traffic safety, 7 vehicle, 5 environment, 5 individual
  conditions), and 5 are hidden, unscored trial questions. You pass with 52/65.
- **Practice modes** with instant answers and explanations: Quick 20, Weak spots,
  My mistakes, and practice by topic.
- **Signs section** with about 60 Swedish road signs (warning, priority,
  prohibitory, mandatory and instruction signs) and parking signs with their
  extra panels (time limits, fees, parking disc, date parking, zones). Tap a sign
  to reveal its meaning, then take a road-sign or parking-sign quiz.
- **Study section** with revision notes for 28 topics, following the chapters of
  the *Theory Book 2026* (Körkortonline.se).
- **Progress tracking**: every attempt is saved on the phone. It shows a score
  chart, accuracy per area and topic (red when below 80%), and a history of past
  attempts. You can make a backup file and restore it.
- **Dog break** 🐶 every 5 questions: a random dog GIF from random.dog (or a
  photo from dog.ceo; an emoji when offline).

All 402 questions are original, written from the handbook's content. They are not
copies of the official Trafikverket questions.

## Run locally

```bash
npm install
npm run dev       # development server
npm run check     # sanity-check the question bank
npm run build     # production build in dist/
```

## Put it on an iPhone

1. Host the `dist/` folder over HTTPS. The included GitHub Actions workflow
   (`.github/workflows/deploy.yml`) publishes it to GitHub Pages on every
   push to `main`. Enable it once under **Settings → Pages → Source: GitHub
   Actions**.
2. Open the URL in **Safari** on the iPhone, tap **Share → Add to Home Screen**.
3. Open it from the home screen icon. It runs full-screen and keeps progress on
   the phone.

Signs are simplified SVG drawings in `src/components/Sign.jsx`. They are
recognisable versions of the real signs, not official artwork.

## Editing questions

Questions live in `src/data/questions.js`. Each one has a `topic` (from
`src/data/topics.js`), the correct answer `a`, wrong answers `w`, and an
explanation `why`. Sign questions are generated from `src/data/signs.js`. Answer order is shuffled automatically. Run `npm run check`
after editing.
