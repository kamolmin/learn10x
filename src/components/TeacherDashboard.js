import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { STUDENTS, CERTIFICATE_LEVELS } from '../data/sampleData';

const T = {
  uz: {
    title: 'O\'qituvchi Paneli',
    sub: 'Mamirjon Holmatov — Matematika, Mantiqiy fikrlash, Muammo hal etish',
    totalStudents: 'Jami o\'quvchilar',
    onTrack: 'Maqsadda',
    atRisk: 'Xavf ostida',
    behind: 'Orqada',
    allGroups: 'Barcha guruhlar',
    searchPlaceholder: 'O\'quvchi qidirish...',
    level: 'Daraja',
    status: 'Holat',
    program: 'Dastur',
    lastTest: 'Oxirgi test',
    viewProfile: 'Profilni ko\'rish',
    startTest: 'Test boshlash',
    statusLabels: { on_track: 'Maqsadda', at_risk: 'Xavf ostida', behind: 'Orqada' },
    avgScore: "O'rtacha ball",
    testsCompleted: "Testlar",
    certPath: "Sertifikat yo'li",
  },
  en: {
    title: 'Teacher Dashboard',
    sub: 'Mamirjon Holmatov — Mathematics, Critical Thinking, Problem Solving',
    totalStudents: 'Total Students',
    onTrack: 'On Track',
    atRisk: 'At Risk',
    behind: 'Behind',
    allGroups: 'All Groups',
    searchPlaceholder: 'Search students...',
    level: 'Level',
    status: 'Status',
    program: 'Program',
    lastTest: 'Last Test',
    viewProfile: 'View Profile',
    startTest: 'Start Test',
    statusLabels: { on_track: 'On Track', at_risk: 'At Risk', behind: 'Behind' },
    avgScore: 'Avg Score',
    testsCompleted: 'Tests',
    certPath: 'Certificate Path',
  }
};

function StatCard({ value, label, color, icon }) {
  return (
    <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: color + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: -1 }}>{value}</div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

function LevelBar({ levelIndex }) {
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {CERTIFICATE_LEVELS.map((lv, i) => (
        <div key={lv.id} style={{
          width: i === levelIndex ? 20 : 12,
          height: 8,
          borderRadius: 99,
          background: i <= levelIndex ? lv.color : 'var(--surface-2)',
          transition: 'all 0.3s',
        }} title={lv.id} />
      ))}
    </div>
  );
}

export default function TeacherDashboard({ lang, setLang, user, onLogout }) {
  const t = T[lang];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');

  const groups = ['all', ...new Set(STUDENTS.map(s => s.group))];
  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchGroup = group === 'all' || s.group === group;
    return matchSearch && matchGroup;
  });

  const counts = {
    total: STUDENTS.length,
    on_track: STUDENTS.filter(s => s.status === 'on_track').length,
    at_risk: STUDENTS.filter(s => s.status === 'at_risk').length,
    behind: STUDENTS.filter(s => s.status === 'behind').length,
  };

  const statusColor = { on_track: '#16a34a', at_risk: '#d97706', behind: '#dc2626' };
  const statusBg =    { on_track: '#dcfce7', at_risk: '#fef9c3', behind: '#fee2e2' };

  return (
    <div>
      <Nav lang={lang} setLang={setLang} user={user} onLogout={onLogout} />
      <div className="page">

        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, color: 'var(--text)' }}>{t.title}</h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>{t.sub}</p>
        </div>

        {/* Stat cards */}
        <div className="animate-fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          <StatCard value={counts.total}    label={t.totalStudents} color="#065A82" icon="👥" />
          <StatCard value={counts.on_track} label={t.onTrack}       color="#16a34a" icon="✅" />
          <StatCard value={counts.at_risk}  label={t.atRisk}        color="#d97706" icon="⚠️" />
          <StatCard value={counts.behind}   label={t.behind}        color="#dc2626" icon="🚨" />
        </div>

        {/* Certificate path visual */}
        <div className="animate-fade-up-2 card" style={{ marginBottom: 28, padding: '20px 24px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 14 }}>{t.certPath}</div>
          <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
            {CERTIFICATE_LEVELS.map((lv, i) => (
              <React.Fragment key={lv.id}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: lv.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 6px',
                    fontSize: 14, fontWeight: 800, color: 'white',
                    boxShadow: `0 0 0 3px ${lv.color}30`,
                  }}>{lv.id}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>
                    {lv.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>
                    {STUDENTS.filter(s => s.level === lv.id).length} o'q
                  </div>
                </div>
                {i < 8 && <div style={{ width: 24, height: 2, background: 'var(--border)', flexShrink: 0 }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="animate-fade-up-3" style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            style={{
              flex: 1, padding: '10px 16px',
              border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              fontSize: 14, fontFamily: 'var(--font)', outline: 'none', color: 'var(--text)',
            }}
          />
          {groups.map(g => (
            <button key={g} onClick={() => setGroup(g)} className={`btn ${group === g ? 'btn-primary' : 'btn-ghost'}`}>
              {g === 'all' ? (lang === 'uz' ? 'Barchasi' : 'All') : g}
            </button>
          ))}
        </div>

        {/* Students table */}
        <div className="animate-fade-up-3 card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['O\'quvchi', t.level, t.status, 'Avg Ball', 'Testlar', t.program, ''].map((h, i) => (
                    <th key={i} style={{
                      padding: '12px 16px', textAlign: 'left',
                      fontSize: 11, fontWeight: 700, color: 'var(--text-3)',
                      letterSpacing: 0.5, textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => {
                  const lv = CERTIFICATE_LEVELS[s.levelIndex];
                  const avgScore = Math.round(s.scores.reduce((a, b) => a + b, 0) / s.scores.length);
                  return (
                    <tr key={s.id} style={{
                      borderBottom: '1px solid var(--border)',
                      animation: `fadeUp 0.3s ${idx * 0.05}s ease both`,
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'white'}
                      onClick={() => navigate(`/student/${s.id}`)}
                    >
                      {/* Student */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: '50%',
                            background: `linear-gradient(135deg, ${lv.color}88, ${lv.color})`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                          }}>{s.avatar}</div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{s.name}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.grade} · {s.group}</div>
                          </div>
                        </div>
                      </td>
                      {/* Level */}
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div className="level-pill" style={{ background: lv.color, width: 30, height: 30, fontSize: 13 }}>
                            {lv.id}
                          </div>
                          <LevelBar levelIndex={s.levelIndex} />
                        </div>
                      </td>
                      {/* Status */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '3px 10px', borderRadius: 99,
                          fontSize: 11, fontWeight: 700,
                          background: statusBg[s.status],
                          color: statusColor[s.status],
                        }}>
                          {s.status === 'on_track' ? '●' : s.status === 'at_risk' ? '▲' : '✕'}
                          {' '}{t.statusLabels[s.status]}
                        </span>
                      </td>
                      {/* Avg score */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: 16, fontWeight: 800,
                          color: avgScore >= 80 ? '#16a34a' : avgScore >= 65 ? 'var(--teal)' : 'var(--red)',
                        }}>{avgScore}%</span>
                      </td>
                      {/* Tests */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-2)' }}>{s.testsCompleted}</span>
                      </td>
                      {/* Program */}
                      <td style={{ padding: '14px 16px', maxWidth: 180 }}>
                        <span style={{ fontSize: 12, color: 'var(--text-2)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {s.program}
                        </span>
                      </td>
                      {/* Actions */}
                      <td style={{ padding: '14px 16px' }} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={() => navigate(`/student/${s.id}`)}>
                            {lang === 'uz' ? 'Profil' : 'Profile'}
                          </button>
                          <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={() => navigate(`/test/${s.id}`)}>
                            Test →
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
