import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { STUDENTS, CERTIFICATE_LEVELS } from '../data/sampleData';

const T = {
  uz: {
    notFound: 'O\'quvchi topilmadi',
    certLevel: 'Sertifikat Darajasi',
    program: 'Belgilangan Dastur',
    weakAreas: 'Bo\'sh Joylar',
    subjectBreakdown: 'Mavzular Bo\'yicha Tahlil',
    recentTests: 'So\'nggi Testlar',
    startTest: 'Test Boshlash',
    avgTime: 'O\'rtacha Vaqt',
    testsCompleted: 'Testlar Bajarildi',
    subject: 'Mavzu',
    score: 'Ball',
    time: 'Vaqt',
    date: 'Sana',
    l1: '1-daraja',
    l2: '2-daraja',
    l3: '3-daraja',
    statusLabels: { strong: 'Kuchli', good: 'Yaxshi', weak: 'Zaif', critical: 'Kritik' },
    certPath: 'Sertifikat Yo\'li',
    nextLevel: 'Keyingi daraja uchun:',
    sec: 'soniya',
  },
  en: {
    notFound: 'Student not found',
    certLevel: 'Certificate Level',
    program: 'Assigned Program',
    weakAreas: 'Weak Areas',
    subjectBreakdown: 'Subject Breakdown',
    recentTests: 'Recent Tests',
    startTest: 'Start Test',
    avgTime: 'Avg Time',
    testsCompleted: 'Tests Completed',
    subject: 'Subject',
    score: 'Score',
    time: 'Time',
    date: 'Date',
    l1: 'Level 1',
    l2: 'Level 2',
    l3: 'Level 3',
    statusLabels: { strong: 'Strong', good: 'Good', weak: 'Weak', critical: 'Critical' },
    certPath: 'Certificate Path',
    nextLevel: 'To reach next level:',
    sec: 's',
  }
};

function ScoreBar({ value, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: 'var(--surface-2)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color, width: 34, textAlign: 'right' }}>{value}%</span>
    </div>
  );
}

const statusColor = { strong: '#16a34a', good: '#028090', weak: '#f97316', critical: '#ef4444' };
const statusBg    = { strong: '#dcfce7', good: '#ccfbf1', weak: '#ffedd5', critical: '#fee2e2' };

export default function StudentProfile({ lang, setLang, user, onLogout }) {
  const t = T[lang];
  const { id } = useParams();
  const navigate = useNavigate();
  const student = STUDENTS.find(s => s.id === Number(id));

  if (!student) return (
    <div><Nav lang={lang} setLang={setLang} user={user} onLogout={onLogout} backTo="/" />
      <div className="page"><p>{t.notFound}</p></div>
    </div>
  );

  const lv = CERTIFICATE_LEVELS[student.levelIndex];
  const nextLv = CERTIFICATE_LEVELS[student.levelIndex + 1];
  const avgScore = Math.round(student.scores.reduce((a, b) => a + b, 0) / student.scores.length);
  const progress = ((student.levelIndex) / 8) * 100;

  return (
    <div>
      <Nav lang={lang} setLang={setLang} user={user} onLogout={onLogout} backTo="/" />
      <div className="page">

        {/* Hero card */}
        <div className="animate-fade-up card" style={{
          marginBottom: 24,
          background: `linear-gradient(135deg, ${lv.color}15, white)`,
          borderLeft: `4px solid ${lv.color}`,
        }}>
          <div style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `linear-gradient(135deg, ${lv.color}88, ${lv.color})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 800, color: 'white',
                boxShadow: `0 4px 16px ${lv.color}40`,
              }}>{student.avatar}</div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: -0.5 }}>{student.name}</h1>
                <div style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 3 }}>{student.grade} · {student.group}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: lv.color + '20', color: lv.color }}>
                    {lang === 'uz' ? 'Daraja' : 'Level'} {lv.id}
                  </span>
                  <span style={{
                    padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                    background: student.status === 'on_track' ? '#dcfce7' : student.status === 'at_risk' ? '#fef9c3' : '#fee2e2',
                    color: student.status === 'on_track' ? '#166534' : student.status === 'at_risk' ? '#854d0e' : '#991b1b',
                  }}>
                    {student.status === 'on_track' ? (lang === 'uz' ? 'Maqsadda' : 'On Track')
                      : student.status === 'at_risk' ? (lang === 'uz' ? 'Xavf ostida' : 'At Risk')
                      : (lang === 'uz' ? 'Orqada' : 'Behind')}
                  </span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => navigate(`/test/${student.id}`)}>
              🎯 {t.startTest}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="animate-fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: lang === 'uz' ? 'O\'rtacha Ball' : 'Avg Score', value: avgScore + '%', color: avgScore >= 80 ? '#16a34a' : avgScore >= 65 ? 'var(--teal)' : 'var(--red)', icon: '📊' },
            { label: t.avgTime, value: student.timeAvg + (lang === 'uz' ? ' son.' : 's'), color: student.timeAvg < 45 ? '#16a34a' : 'var(--orange)', icon: '⏱️' },
            { label: t.testsCompleted, value: student.testsCompleted, color: 'var(--blue)', icon: '📝' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color, letterSpacing: -1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

          {/* Certificate path */}
          <div className="animate-fade-up-2 card">
            <div className="card-header"><span className="card-title">{t.certPath}</span></div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: 6, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                {CERTIFICATE_LEVELS.map((level, i) => (
                  <React.Fragment key={level.id}>
                    <div style={{
                      width: i === student.levelIndex ? 44 : 32,
                      height: i === student.levelIndex ? 44 : 32,
                      borderRadius: '50%',
                      background: i <= student.levelIndex ? level.color : 'var(--surface-2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: i === student.levelIndex ? 15 : 11,
                      fontWeight: 800,
                      color: i <= student.levelIndex ? 'white' : 'var(--text-3)',
                      boxShadow: i === student.levelIndex ? `0 0 0 3px ${level.color}40, 0 4px 12px ${level.color}30` : 'none',
                      transition: 'all 0.3s',
                    }}>{level.id}</div>
                    {i < 8 && <div style={{ width: 8, height: 2, background: i < student.levelIndex ? level.color : 'var(--border)', borderRadius: 99 }} />}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-2)', marginBottom: 6 }}>
                  <span>{lv.labelUz}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, var(--teal), var(--mint))` }} />
                </div>
              </div>
              {nextLv && (
                <div style={{ padding: '10px 14px', background: nextLv.color + '12', borderRadius: 8, border: `1px solid ${nextLv.color}30` }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', marginBottom: 4 }}>{t.nextLevel}</div>
                  <div style={{ fontSize: 12, color: nextLv.color, fontWeight: 600 }}>
                    {lang === 'uz' ? `${nextLv.id} darajasiga o'tish uchun 3 ta ketma-ket 90%+ natija kerak` : `Score 90%+ three times in a row to reach Level ${nextLv.id}`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Weak areas + program */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="animate-fade-up-2 card" style={{ flex: 1 }}>
              <div className="card-header"><span className="card-title">🎯 {t.program}</span></div>
              <div className="card-body">
                <div style={{ padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 14 }}>
                  {student.program}
                </div>
                {student.weakAreas.length > 0 && (
                  <>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8 }}>⚠️ {t.weakAreas}</div>
                    {student.weakAreas.map((area, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{area}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subject breakdown */}
        <div className="animate-fade-up-3 card" style={{ marginBottom: 20 }}>
          <div className="card-header"><span className="card-title">📚 {t.subjectBreakdown}</span></div>
          <div className="card-body">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[t.subject, t.l1, t.l2, t.l3, lang === 'uz' ? 'Holat' : 'Status'].map((h, i) => (
                    <th key={i} style={{ padding: '8px 12px', textAlign: i === 0 ? 'left' : 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {student.subjects.map((subj, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{subj.name}</td>
                    <td style={{ padding: '10px 12px', width: 140 }}><ScoreBar value={subj.l1} color="#16a34a" /></td>
                    <td style={{ padding: '10px 12px', width: 140 }}><ScoreBar value={subj.l2} color="var(--teal)" /></td>
                    <td style={{ padding: '10px 12px', width: 140 }}><ScoreBar value={subj.l3} color={subj.l3 < 50 ? 'var(--red)' : 'var(--orange)'} /></td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: statusBg[subj.status], color: statusColor[subj.status] }}>
                        {t.statusLabels[subj.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent tests */}
        <div className="animate-fade-up-3 card">
          <div className="card-header"><span className="card-title">📋 {t.recentTests}</span></div>
          <div className="card-body">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[t.date, t.subject, lang === 'uz' ? 'Daraja' : 'Level', t.score, t.time].map((h, i) => (
                    <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: 0.5 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {student.recentTests.map((test, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 12px', fontSize: 12, color: 'var(--text-3)' }}>{test.date}</td>
                    <td style={{ padding: '10px 12px', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{test.subject}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                        {test.level}-{lang === 'uz' ? 'daraja' : 'level'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: test.score >= 80 ? '#16a34a' : test.score >= 65 ? 'var(--teal)' : 'var(--red)' }}>
                        {test.score}%
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', fontSize: 13, color: test.time > 60 ? 'var(--orange)' : 'var(--text-2)', fontWeight: test.time > 60 ? 700 : 400 }}>
                      {test.time}{t.sec} {test.time > 60 ? '⚠️' : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
