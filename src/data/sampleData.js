// Learn10X — Real student data from Al-Xorazmiy exam results
// Teacher: Mamurjon Akbarov
// Max scores: Math 1-12: 12pts, Math 13-30: 18pts, English 1-6: 6pts, English 7-15: 9pts
// Total max: 76.5 pts

export const TEACHER = {
  name: 'Mamurjon Akbarov',
  initials: 'MA',
  subjects: 'Matematika, Mantiqiy fikrlash, Muammo hal etish',
  school: 'Al-Xorazmiy',
};

export const CERTIFICATE_LEVELS = [
  { id: 'A', label: 'Diagnostika', labelUz: 'Diagnostika Tugadi',       color: '#64748b' },
  { id: 'B', label: 'Asos',        labelUz: 'Asos Qurildi',             color: '#3b82f6' },
  { id: 'C', label: '1-Daraja',    labelUz: '1-Daraja O\'zlashtirildi', color: '#06b6d4' },
  { id: 'D', label: '2-Daraja',    labelUz: '2-Daraja Boshlandi',       color: '#0891b2' },
  { id: 'E', label: 'Aralash',     labelUz: 'Aralash Testlar',          color: '#10b981' },
  { id: 'F', label: '2-Daraja+',   labelUz: '2-Daraja O\'zlashtirildi', color: '#059669' },
  { id: 'G', label: '3-Daraja',    labelUz: '3-Daraja Boshlandi',       color: '#f59e0b' },
  { id: 'H', label: 'Izchillik',   labelUz: 'Izchillik Isbotlandi',     color: '#f97316' },
  { id: 'I', label: 'TAYYOR',      labelUz: 'Imtihonga Tayyor',         color: '#eab308' },
];

function getLevel(total) {
  if (total >= 70) return { level: 'H', levelIndex: 7 };
  if (total >= 62) return { level: 'G', levelIndex: 6 };
  if (total >= 55) return { level: 'F', levelIndex: 5 };
  if (total >= 50) return { level: 'E', levelIndex: 4 };
  if (total >= 45) return { level: 'D', levelIndex: 3 };
  if (total >= 40) return { level: 'C', levelIndex: 2 };
  if (total >= 32) return { level: 'B', levelIndex: 1 };
  return { level: 'A', levelIndex: 0 };
}

function getStatus(total) {
  if (total >= 55) return 'on_track';
  if (total >= 42) return 'at_risk';
  return 'behind';
}

function getAvatar(name) {
  const parts = name.split(' ');
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

function mathPct(score, max) { return Math.round((score / max) * 100); }

const RAW = [
  ["Solijonov Abdulaziz",         11, 14, 5, 8, 63.8],
  ["Abdumannopov Og'abek",        9,  15, 5, 8, 63.7],
  ["Abdullajonov Salohiddin",     11, 12, 5, 9, 61.7],
  ["Akramjonov Abdullo",          11, 14, 3, 7, 59.5],
  ["Mahmudjonov Muhammadzohir",   11, 14, 3, 6, 57.4],
  ["Normuhammadov Muhammadzoxid", 10,  9, 5, 9, 54.3],
  ["Bahtiyorjonov Abdurahmon",    11, 10, 5, 7, 53.3],
  ["Valijonova Muazzam",          10,  9, 4, 8, 51.1],
  ["Arabxo'jayeva Diyora",        12,  8, 4, 7, 49.1],
  ["Rasuljonov Zubair",           10, 10, 2, 7, 48.9],
  ["Ashuraliyev Abdullajon",       8, 13, 2, 5, 48.8],
  ["Qaxramonov Abror",             8,  9, 5, 7, 47.9],
  ["Akramjonov Azizbek",           9,  8, 4, 8, 47.9],
  ["Muhammadjov Asilzod",          8,  9, 6, 6, 46.9],
  ["Rustamov Umarbek",            11,  6, 5, 7, 44.9],
  ["Yashnarjonov Zikrillo",       11,  9, 3, 5, 44.8],
  ["Husanboyev Yaxyo",             9,  8, 2, 7, 43.6],
  ["Ummataliyeva Guljaxon",        9,  5, 4, 8, 41.6],
  ["Aliyorov Madina",             11,  7, 3, 5, 40.6],
  ["Hudoyberdiyev Muhammadin",     7,  7, 3, 7, 40.4],
  ["No'monova Pokiza",             5,  8, 3, 7, 40.3],
  ["Jalolova Husnora",            11,  7, 2, 5, 39.5],
  ["Rahimjonov Boburjon",          8,  4, 5, 8, 39.5],
  ["Ro'zinboyev Oyatullo",         8,  7, 3, 6, 39.4],
  ["Abdurasulov Asadbek",          7,  4, 3, 6, 32.0],
  ["Karimova Laylo",               6,  6, 1, 4, 28.7],
];

export const STUDENTS = RAW.map((r, i) => {
  const [name, m1, m2, e1, e2, total] = r;
  const { level, levelIndex } = getLevel(total);
  const status = getStatus(total);

  const mathEasy = mathPct(m1, 12);
  const mathHard = mathPct(m2, 18);
  const engEasy  = mathPct(e1, 6);
  const engHard  = mathPct(e2, 9);

  const subjectStatus = (pct) => pct >= 85 ? 'strong' : pct >= 70 ? 'good' : pct >= 50 ? 'weak' : 'critical';

  const base = Math.round((total / 76.5) * 100);
  const variance = (n) => Math.min(100, Math.max(10, Math.round(base + (Math.sin(i + n) * 12))));
  const scores = [1,2,3,4,5,6,7,8].map(n => variance(n));

  const weakAreas = [];
  if (mathEasy < 70) weakAreas.push('Matematika 1-12 (oson savollar)');
  if (mathHard < 60) weakAreas.push('Matematika 13-30 (qiyin savollar)');
  if (engEasy  < 70) weakAreas.push('Ingliz tili 1-6 (asosiy grammatika)');
  if (engHard  < 60) weakAreas.push('Ingliz tili 7-15 (murakkab grammatika)');

  let program = '';
  if (total >= 60)      program = "A Dastur — 3-darajaga o'tish";
  else if (total >= 50) program = "B Dastur — Aralash testlarni mustahkamlash";
  else if (total >= 42) program = "C Dastur — 2-daraja va tezlikka e'tibor";
  else if (total >= 35) program = "D Dastur — 1-darajani mustahkamlash";
  else                  program = "E Dastur — Asoslardan boshlash";

  const cap = (v) => Math.min(100, Math.max(0, v));

  return {
    id: i + 1,
    name,
    avatar: getAvatar(name),
    level,
    levelIndex,
    grade: '4-sinf',
    group: i < 13 ? 'A guruh' : 'B guruh',
    status,
    targetDate: '2025-09-01',
    scores,
    timeAvg: Math.round(35 + (76.5 - total) * 0.6),
    testsCompleted: Math.round(15 + levelIndex * 4),
    examScores: { m1, m2, e1, e2, total },
    subjects: [
      { id: 1, name: "Matematika 1-12 (oson)",   l1: mathEasy,          l2: cap(Math.round(mathEasy * 0.88)), l3: cap(Math.round(mathEasy * 0.72)), status: subjectStatus(mathEasy) },
      { id: 2, name: "Matematika 13-30 (qiyin)", l1: cap(Math.round(mathHard * 1.1)), l2: mathHard, l3: cap(Math.round(mathHard * 0.78)), status: subjectStatus(mathHard) },
      { id: 3, name: "Ingliz tili 1-6 (oson)",   l1: engEasy,           l2: cap(Math.round(engEasy * 0.85)),  l3: cap(Math.round(engEasy * 0.68)),  status: subjectStatus(engEasy) },
      { id: 4, name: "Ingliz tili 7-15 (qiyin)", l1: cap(Math.round(engHard * 1.1)), l2: engHard,  l3: cap(Math.round(engHard * 0.75)),  status: subjectStatus(engHard) },
    ],
    program,
    weakAreas,
    recentTests: [
      { date: '2025-01-20', subject: 'Matematika (aralash)', score: variance(1), time: Math.round(35 + (76.5 - total) * 0.5), level: 2 },
      { date: '2025-01-17', subject: 'Ingliz tili',          score: variance(2), time: Math.round(30 + (76.5 - total) * 0.4), level: 2 },
      { date: '2025-01-14', subject: 'Matematika (qiyin)',   score: variance(3), time: Math.round(40 + (76.5 - total) * 0.6), level: 3 },
    ],
  };
});

export const SAMPLE_TEST_QUESTIONS = [
  {
    id: 1,
    subject: 'Kasrlar',
    level: 2,
    question: '3/4 + 1/6 = ?',
    options: ['4/10', '11/12', '5/12', '4/12'],
    correct: 1,
    timeLimit: 90,
  },
  {
    id: 2,
    subject: "O'nli kasrlar",
    level: 1,
    question: '2.5 × 4 = ?',
    options: ['8', '9', '10', '10.5'],
    correct: 2,
    timeLimit: 60,
  },
  {
    id: 3,
    subject: 'Foizlar',
    level: 2,
    question: "120 ning 25% i nechaga teng?",
    options: ['25', '28', '30', '35'],
    correct: 2,
    timeLimit: 90,
  },
  {
    id: 4,
    subject: 'Mantiqiy masalalar',
    level: 2,
    question: 'Bir qator: 2, 6, 18, 54, ... Keyingi son qaysi?',
    options: ['108', '162', '216', '270'],
    correct: 1,
    timeLimit: 120,
  },
  {
    id: 5,
    subject: 'Nisbat va proporsiya',
    level: 3,
    question: "Agar 5 ta kitob 45 000 so'm bo'lsa, 8 ta kitob necha so'm?",
    options: ["68 000", "70 000", "72 000", "75 000"],
    correct: 2,
    timeLimit: 120,
  },
];
