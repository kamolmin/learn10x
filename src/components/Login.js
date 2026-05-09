import React, { useState } from 'react';

const T = {
  uz: {
    title: '10 Barobar Tezroq O\'rgan',
    sub: 'Vodiy Ta\'lim — O\'quv boshqaruv tizimi',
    teacher: 'O\'qituvchi sifatida kirish',
    student: 'O\'quvchi sifatida kirish',
    username: 'Foydalanuvchi nomi',
    password: 'Parol',
    login: 'Kirish',
    hint: 'Demo: teacher / 1234  yoki  student / 1234',
  },
  en: {
    title: 'Learn 10X Faster',
    sub: 'Vodiy Ta\'lim — Learning Management System',
    teacher: 'Login as Teacher',
    student: 'Login as Student',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    hint: 'Demo: teacher / 1234  or  student / 1234',
  }
};

export default function Login({ onLogin, lang, setLang }) {
  const t = T[lang];
  const [mode, setMode] = useState('teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (username === 'teacher' && password === '1234') {
      onLogin({ role: 'teacher', name: 'Mamurjon Akbarov', initials: 'MA' });
    } else if (username === 'student' && password === '1234') {
      onLogin({ role: 'student', name: 'Umarbek Rustamov', initials: 'UR', studentId: 1 });
    } else {
      setError(lang === 'uz' ? 'Noto\'g\'ri ma\'lumotlar' : 'Invalid credentials');
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #0f2040 50%, #065A82 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: 'var(--font)',
    }}>
      {/* Lang toggle */}
      <div style={{ position: 'absolute', top: 24, right: 24 }} className="lang-toggle">
        <button className={`lang-btn ${lang === 'uz' ? 'active' : ''}`} onClick={() => setLang('uz')}>UZ</button>
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
      </div>

      {/* Logo */}
      <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{
          width: 64, height: 64,
          background: 'linear-gradient(135deg, #028090, #02C39A)',
          borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', fontSize: 28,
        }}>🚀</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: -0.5 }}>{t.title}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{t.sub}</div>
      </div>

      {/* Card */}
      <div className="animate-fade-up-2 card" style={{ width: '100%', maxWidth: 400 }}>
        {/* Mode tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {['teacher', 'student'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, padding: '14px', border: 'none', background: 'none',
              fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700,
              color: mode === m ? 'var(--teal)' : 'var(--text-3)',
              borderBottom: mode === m ? '2px solid var(--teal)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all 0.15s',
            }}>
              {m === 'teacher' ? t.teacher : t.student}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} style={{ padding: 28 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
              {t.username}
            </label>
            <input
              value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder={mode === 'teacher' ? 'teacher' : 'student'}
              style={{
                width: '100%', padding: '10px 14px',
                border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'var(--font)',
                outline: 'none', color: 'var(--text)',
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
              {t.password}
            </label>
            <input
              type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="1234"
              style={{
                width: '100%', padding: '10px 14px',
                border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'var(--font)',
                outline: 'none', color: 'var(--text)',
              }}
            />
          </div>
          {error && <div style={{ color: 'var(--red)', fontSize: 13, marginBottom: 12 }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {t.login} →
          </button>
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--text-3)' }}>
            {t.hint}
          </div>
        </form>
      </div>
    </div>
  );
}
