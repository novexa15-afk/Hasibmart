# Hasib Mart

Hasib Mart-এর React + TypeScript + Vite অনলাইন স্টোর প্রজেক্ট।

## GitHub-এ আপলোড
1. এই ZIP ফাইলটি Extract করুন।
2. GitHub-এ নতুন repository তৈরি করুন, যেমন `hasib-mart`।
3. Extract করা ফোল্ডারের ভেতরের সব ফাইল ও ফোল্ডার repository-তে upload করুন। ZIP ফাইলটিকে একা upload করবেন না।
4. `src/App.tsx`, `src/main.tsx`, `package.json`, `index.html`—এগুলো repository-র root/`src`-এ ঠিক যেভাবে আছে সেভাবে রাখুন।

## চালানোর জন্য
Node.js ইনস্টল থাকা কম্পিউটার/টার্মিনালে:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Build output হবে `dist` ফোল্ডারে। Vercel/Cloudflare Pages-এ deploy করলে build command `npm run build` এবং output directory `dist` দিন।

## প্রকাশ করার আগে জরুরি
- প্রোডাক্টের নাম, দাম, ছবি, WhatsApp নম্বর ও যোগাযোগের তথ্য নিজের সঠিক তথ্য দিয়ে বদলান।
- বর্তমানে থাকা পণ্যগুলো demo/sample data হতে পারে।
- কার্ট/উইশলিস্ট/পণ্যের কিছু তথ্য ব্রাউজারের localStorage-এ থাকে; এটি নিজে থেকে নিরাপদ admin login, database, payment gateway বা server-side order system তৈরি করে না। বাস্তব অর্ডার চালুর আগে এগুলো সেটআপ ও পরীক্ষা করুন।
