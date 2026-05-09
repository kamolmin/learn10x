import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { STUDENTS, CERTIFICATE_LEVELS } from '../data/sampleData';

const T = {
  uz: {
    welcome: 'Xush kelibsiz',
    yourLevel: 'Sizning darajangiz',
    achieved: 'Erishilgan',
    inProgress: 'Jarayonda',
    locked: 'Qulfli',
    yourProgram: 'Sizning dasturingiz',
    programProgress: 'Dastur Progressi',
    topicsToStudy: 'O\'rganish kerak bo\'lgan mavzular',
    yourJourney: 'Sizning yo\'lingiz',
    startTest: 'Test Boshlash',
    recentScores: 'So\'nggi Natijalar',
    weakAreas: 'Kuchaytirish kerak',
    nextLevel: 'Keyingi daraja uchun',
    requirementsTitle: 'Talablar',
    progressToNext: 'Keyingi darajagacha',
    score: 'Ball',
    time: 'Vaqt',
    date: 'Sana',
    avgScore: 'O\'rtacha ball',
    testsCompleted: 'Testlar bajarildi',
    examReady: 'Imtihonga tayyor!',
    keepPushing: 'Davom eting!',
    needsWork: 'Ko\'proq harakat kerak',
    topics: {
      math_easy: 'Matematika — Oson masalalar (1-12)',
      math_hard: 'Matematika — Qiyin masalalar (13-30)',
      eng_easy:  'Ingliz tili — Asosiy grammatika (1-6)',
      eng_hard:  'Ingliz tili — Murakkab grammatika (7-15)',
      logic:     'Mantiqiy fikrlash',
      mixed:     'Aralash testlar',
      speed:     'Tezlik mashqlari',
      level3:    '3-daraja masalalar',
    },
  },
  en: {
    welcome: 'Welcome',
    yourLevel: 'Your Level',
    achieved: 'Achieved',
    inProgress: 'In Progress',
    locked: 'Locked',
    yourProgram: 'Your Program',
    programProgress: 'Program Progress',
    topicsToStudy: 'Topics to Study',
    yourJourney: 'Your Journey',
    startTest: 'Start Test',
    recentScores: 'Recent Scores',
    weakAreas: 'Areas to Improve',
    nextLevel: 'To reach next level',
    requirementsTitle: 'Requirements',
    progressToNext: 'Progress to next level',
    score: 'Score',
    time: 'Time',
    date: 'Date',
    avgScore: 'Avg Score',
    testsCompleted: 'Tests Completed',
    examReady: 'Exam Ready!',
    keepPushing: 'Keep pushing!',
    needsWork: 'Needs more work',
    topics: {
      math_easy: 'Math — Easy Problems (1-12)',
      math_hard: 'Math — Hard Problems (13-30)',
      eng_easy:  'English — Basic Grammar (1-6)',
      eng_hard:  'English — Advanced Grammar (7-15)',
      logic:     'Logical Thinking',
      mixed:     'Mixed Tests',
      speed:     'Speed Drills',
      level3:    'Level 3 Problems',
    },
  }
};

// Program definitions — what each program focuses on
const PROGRAMS = {
  A: {
    name: { uz: "A Dastur — 3-darajaga o'tish", en: 'Program A — Advancing to Level 3' },
    color: '#059669',
    topics: ['math_hard', 'eng_hard', 'level3', 'mixed'],
    description: { uz: '3-daraja masalalariga tayyorlanish va aralash testlarni mukammallashtirish', en: 'Preparing for Level 3 problems and perfecting mixed tests' },
    requirements: { uz: '3 ta ketma-ket 90%+ natija va barcha mavzularda 85%+', en: '3 consecutive 90%+ scores and 85%+ in all subjects' },
  },
  B: {
    name: { uz: "B Dastur — Aralash testlarni mustahkamlash", en: 'Program B — Consolidating Mixed Tests' },
    color: '#0891b2',
    topics: ['math_easy', 'math_hard', 'eng_easy', 'mixed'],
    description: { uz: 'Matematika va ingliz tilini bir vaqtda qo\'llash ko\'nikmalarini rivojlantirish', en: 'Developing skills to apply math and English simultaneously' },
    requirements: { uz: '5 ta ketma-ket 85%+ aralash test natijasi', en: '5 consecutive 85%+ mixed test scores' },
  },
  C: {
    name: { uz: "C Dastur — 2-daraja va tezlikka e'tibor", en: 'Program C — Level 2 & Speed Focus' },
    color: '#06b6d4',
    topics: ['math_easy', 'eng_easy', 'speed', 'math_hard'],
    description: { uz: 'Javob berish tezligini oshirish va 2-daraja masalalarini mustahkamlash', en: 'Improving answer speed and consolidating Level 2 problems' },
    requirements: { uz: '45 soniyada har bir savolga javob va 80%+ natija', en: 'Answer each question in 45 seconds with 80%+ score' },
  },
  D: {
    name: { uz: "D Dastur — 1-darajani mustahkamlash", en: 'Program D — Consolidating Level 1' },
    color: '#3b82f6',
    topics: ['math_easy', 'eng_easy', 'logic', 'speed'],
    description: { uz: 'Asosiy tushunchalarni mustahkamlash va mantiqiy fikrlashni rivojlantirish', en: 'Strengthening fundamentals and developing logical thinking' },
    requirements: { uz: '1-daraja masalalarida barqaror 80%+ natija', en: 'Consistent 80%+ in Level 1 problems' },
  },
  E: {
    name: { uz: "E Dastur — Asoslardan boshlash", en: 'Program E — Starting from Basics' },
    color: '#64748b',
    topics: ['math_easy', 'eng_easy', 'logic', 'speed'],
    description: { uz: 'Matematika va ingliz tilining asosiy tushunchalarini o\'rganish', en: 'Learning fundamental concepts of math and English' },
    requirements: { uz: '1-daraja masalalarida 70%+ natijaga erishish', en: 'Achieve 70%+ in Level 1 problems' },
  },
};

function getProgramKey(programStr) {
  if (programStr.startsWith('A')) return 'A';
  if (programStr.startsWith('B')) return 'B';
  if (programStr.startsWith('C')) return 'C';
  if (programStr.startsWith('D')) return 'D';
  return 'E';
}

export default function StudentDashboard({ lang, setLang, user, onLogout }) {
  const t = T[lang];
  const navigate = useNavigate();

  // Find student by name match or default to first student
  const student = STUDENTS.find(s => s.name === user.name) || STUDENTS[14]; // Umarbek is index 14
  const avgScore = Math.round(student.scores.reduce((a, b) => a + b, 0) / student.scores.length);
  const lv = CERTIFICATE_LEVELS[student.levelIndex];
  const nextLv = CERTIFICATE_LEVELS[student.levelIndex + 1];
  const prevLv = student.levelIndex > 0 ? CERTIFICATE_LEVELS[student.levelIndex - 1] : null;

  const programKey = getProgramKey(student.program);
  const program = PROGRAMS[programKey];
  const programProgress = Math.round((student.examScores.total / 76.5) * 100);

  // Simulate topic completion based on scores
  const topicCompletion = {
    math_easy: Math.round((student.examScores.m1 / 12) * 100),
    math_hard: Math.round((student.examScores.m2 / 18) * 100),
    eng_easy:  Math.round((student.examScores.e1 / 6) * 100),
    eng_hard:  Math.round((student.examScores.e2 / 9) * 100),
    logic:     Math.round(avgScore * 0.85),
    mixed:     Math.round(avgScore * 0.9),
    speed:     student.timeAvg < 45 ? 85 : student.timeAvg < 60 ? 65 : 40,
    level3:    Math.round(avgScore * 0.7),
  };

  const topicStatus = (pct) => pct >= 80 ? 'done' : pct >= 50 ? 'progress' : 'todo';
  const topicColor  = (pct) => pct >= 80 ? '#16a34a' : pct >= 50 ? '#0891b2' : '#94a3b8';
  const topicBg     = (pct) => pct >= 80 ? '#f0fdf4' : pct >= 50 ? '#eff6ff' : '#f8fafc';

  return (
    <div>
      <Nav lang={lang} setLang={setLang} user={user} onLogout={onLogout} />
      <div className="page" style={{ maxWidth: 960 }}>

        {/* Welcome hero */}
        <div className="animate-fade-up" style={{
          background: `linear-gradient(135deg, #0a1628, #065A82)`,
          borderRadius: 16, padding: '28px 32px',
          marginBottom: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -20, top: -20,
            width: 180, height: 180, borderRadius: '50%',
            background: lv.color + '20',
          }} />
          <div style={{
            position: 'absolute', right: 40, bottom: -40,
            width: 120, height: 120, borderRadius: '50%',
            background: '#02C39A15',
          }} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{t.welcome} 👋</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: -0.5, marginBottom: 16 }}>
            {student.name}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: t.yourLevel, value: `${lang === 'uz' ? 'Daraja' : 'Level'} ${lv.id}`, color: lv.color },
              { label: t.avgScore,  value: avgScore + '%', color: avgScore >= 75 ? '#02C39A' : avgScore >= 55 ? '#f97316' : '#ef4444' },
              { label: t.testsCompleted, value: student.testsCompleted, color: '#3b82f6' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.08)', borderRadius: 10,
                padding: '10px 18px', backdropFilter: 'blur(4px)',
              }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            ))}
            <button className="btn" onClick={() => navigate(`/test/${student.id}`)} style={{
              marginLeft: 'auto', alignSelf: 'center',
              background: '#02C39A', color: '#0a1628',
              padding: '10px 24px', fontSize: 14, fontWeight: 800,
            }}>
              🎯 {t.startTest}
            </button>
          </div>
        </div>

        {/* Certificate Journey */}
        <div className="animate-fade-up-2 card" style={{ marginBottom: 24 }}>
          <div className="card-header">
            <span className="card-title">🏆 {t.yourJourney}</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
              {CERTIFICATE_LEVELS.map((level, i) => {
                const isAchieved  = i < student.levelIndex;
                const isCurrent   = i === student.levelIndex;
                const isNext      = i === student.levelIndex + 1;
                const isLocked    = i > student.levelIndex + 1;

                return (
                  <React.Fragment key={level.id}>
                    <div style={{ textAlign: 'center', minWidth: 90, flex: 1 }}>
                      {/* Badge */}
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <div style={{
                          width: isCurrent ? 64 : isNext ? 52 : 44,
                          height: isCurrent ? 64 : isNext ? 52 : 44,
                          borderRadius: '50%',
                          background: isAchieved ? level.color
                            : isCurrent ? level.color
                            : isNext ? level.color + '40'
                            : '#e2e8f0',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto',
                          fontSize: isCurrent ? 22 : isNext ? 16 : 14,
                          fontWeight: 800,
                          color: isAchieved || isCurrent ? 'white' : isNext ? level.color : '#94a3b8',
                          boxShadow: isCurrent ? `0 0 0 4px ${level.color}30, 0 8px 24px ${level.color}40` : 'none',
                          border: isNext ? `2px dashed ${level.color}` : 'none',
                          transition: 'all 0.3s',
                          position: 'relative',
                        }}>
                          {isLocked ? '🔒' : level.id}
                        </div>
                        {/* Achieved checkmark */}
                        {isAchieved && (
                          <div style={{
                            position: 'absolute', bottom: -2, right: -2,
                            width: 18, height: 18, borderRadius: '50%',
                            background: '#16a34a', border: '2px solid white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, color: 'white', fontWeight: 800,
                          }}>✓</div>
                        )}
                        {/* Current pulse ring */}
                        {isCurrent && (
                          <div style={{
                            position: 'absolute', inset: -6,
                            borderRadius: '50%',
                            border: `2px solid ${level.color}`,
                            animation: 'pulse 2s infinite',
                            opacity: 0.5,
                          }} />
                        )}
                      </div>

                      {/* Label */}
                      <div style={{
                        marginTop: 8, fontSize: 10, fontWeight: 700,
                        color: isCurrent ? level.color : isAchieved ? '#16a34a' : '#94a3b8',
                      }}>
                        {level.id === 'I' ? (lang === 'uz' ? 'TAYYOR' : 'READY') : level.label}
                      </div>

                      {/* Status chip */}
                      <div style={{
                        marginTop: 4, fontSize: 9, fontWeight: 700,
                        padding: '2px 6px', borderRadius: 99, display: 'inline-block',
                        background: isAchieved ? '#dcfce7' : isCurrent ? level.color + '20' : isNext ? '#fef9c3' : '#f1f5f9',
                        color: isAchieved ? '#16a34a' : isCurrent ? level.color : isNext ? '#854d0e' : '#94a3b8',
                      }}>
                        {isAchieved ? (lang === 'uz' ? '✓ Erishildi' : '✓ Done')
                          : isCurrent ? (lang === 'uz' ? '● Jarayonda' : '● Active')
                          : isNext ? (lang === 'uz' ? '→ Keyingi' : '→ Next')
                          : (lang === 'uz' ? '🔒 Qulfli' : '🔒 Locked')}
                      </div>
                    </div>

                    {/* Connector line */}
                    {i < 8 && (
                      <div style={{
                        height: 3, width: 24, flexShrink: 0,
                        marginTop: isCurrent ? 30 : 20,
                        background: i < student.levelIndex
                          ? `linear-gradient(90deg, ${CERTIFICATE_LEVELS[i].color}, ${CERTIFICATE_LEVELS[i+1].color})`
                          : '#e2e8f0',
                        borderRadius: 99,
                      }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Progress to next level */}
            {nextLv && (
              <div style={{ marginTop: 20, padding: '14px 18px', background: nextLv.color + '10', borderRadius: 10, border: `1px solid ${nextLv.color}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)' }}>
                    {t.progressToNext}: <span style={{ color: nextLv.color }}>{lang === 'uz' ? 'Daraja' : 'Level'} {nextLv.id}</span>
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: nextLv.color }}>{programProgress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${programProgress}%`, background: `linear-gradient(90deg, ${lv.color}, ${nextLv.color})` }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
                  📌 {t.nextLevel}: {
                    lang === 'uz'
                      ? `${nextLv.id} darajaga o'tish uchun 3 ta ketma-ket 90%+ natija kerak`
                      : `Score 90%+ three times in a row to reach Level ${nextLv.id}`
                  }
                </div>
              </div>
            )}
          </div>
        </div>

        {/* My Program */}
        <div className="animate-fade-up-2 card" style={{ marginBottom: 24, borderLeft: `4px solid ${program.color}` }}>
          <div className="card-header" style={{ background: program.color + '08' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: program.color, letterSpacing: 1, marginBottom: 4 }}>
                {t.yourProgram}
              </div>
              <span className="card-title" style={{ fontSize: 17 }}>{program.name[lang]}</span>
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: 99,
              background: program.color + '20', color: program.color,
              fontSize: 12, fontWeight: 700,
            }}>
              {programProgress}% {lang === 'uz' ? 'bajarildi' : 'complete'}
            </div>
          </div>
          <div className="card-body">
            {/* Program description */}
            <div style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 20, padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 8 }}>
              📋 {program.description[lang]}
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>
                <span>{t.programProgress}</span>
                <span style={{ fontWeight: 700, color: program.color }}>{programProgress}%</span>
              </div>
              <div className="progress-track" style={{ height: 10 }}>
                <div className="progress-fill" style={{ width: `${programProgress}%`, background: `linear-gradient(90deg, ${program.color}, ${program.color}99)` }} />
              </div>
            </div>

            {/* Requirements */}
            <div style={{ padding: '10px 14px', borderRadius: 8, background: '#fef9c3', border: '1px solid #fde68a', marginBottom: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#854d0e', marginBottom: 4 }}>🎯 {t.requirementsTitle}</div>
              <div style={{ fontSize: 13, color: '#78350f' }}>{program.requirements[lang]}</div>
            </div>

            {/* Topics */}
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 12 }}>
              📚 {t.topicsToStudy}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {program.topics.map((topicKey, i) => {
                const pct = topicCompletion[topicKey] || 0;
                const status = topicStatus(pct);
                return (
                  <div key={i} style={{
                    padding: '12px 16px', borderRadius: 10,
                    background: topicBg(pct),
                    border: `1px solid ${topicColor(pct)}30`,
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: topicColor(pct) + '20',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14,
                    }}>
                      {status === 'done' ? '✅' : status === 'progress' ? '📖' : '📌'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: topicColor(pct), marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.topics[topicKey]}
                      </div>
                      <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: topicColor(pct), borderRadius: 99, transition: 'width 0.6s ease' }} />
                      </div>
                      <div style={{ fontSize: 10, color: topicColor(pct), marginTop: 2, fontWeight: 700 }}>{pct}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent scores + weak areas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Recent test scores */}
          <div className="animate-fade-up-3 card">
            <div className="card-header"><span className="card-title">📊 {t.recentScores}</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              {student.recentTests.map((test, i) => (
                <div key={i} style={{
                  padding: '14px 20px',
                  borderBottom: i < student.recentTests.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{test.subject}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{test.date} · {test.level}-{lang === 'uz' ? 'daraja' : 'level'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: test.score >= 80 ? '#16a34a' : test.score >= 65 ? 'var(--teal)' : 'var(--red)' }}>
                      {test.score}%
                    </div>
                    <div style={{ fontSize: 11, color: test.time > 60 ? 'var(--orange)' : 'var(--text-3)' }}>
                      ⏱ {test.time}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak areas */}
          <div className="animate-fade-up-3 card">
            <div className="card-header"><span className="card-title">⚠️ {t.weakAreas}</span></div>
            <div className="card-body">
              {student.weakAreas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#16a34a', fontWeight: 700 }}>
                  🎉 {lang === 'uz' ? 'Barcha yo\'nalishlar yaxshi!' : 'All areas looking good!'}
                </div>
              ) : (
                student.weakAreas.map((area, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px', marginBottom: 8,
                    background: '#fef2f2', borderRadius: 8,
                    border: '1px solid #fecaca',
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#991b1b', fontWeight: 500 }}>{area}</span>
                  </div>
                ))
              )}
              <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', marginBottom: 4 }}>
                  💡 {lang === 'uz' ? 'Maslahat' : 'Tip'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)' }}>
                  {lang === 'uz'
                    ? 'Zaif joylarga har kuni 20-30 daqiqa ajrating. Kichik, izchil mashqlar katta natija beradi.'
                    : 'Spend 20-30 minutes daily on weak areas. Small, consistent practice gives big results.'}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
