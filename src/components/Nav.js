import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav({ lang, setLang, user, onLogout, backTo }) {
  const navigate = useNavigate();
  return (
    <nav className="nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {backTo && (
          <button onClick={() => navigate(backTo)} style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.7)',
            padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13,
            fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: 4,
          }}>← {lang === 'uz' ? 'Orqaga' : 'Back'}</button>
        )}
        <div className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="nav-logo">10X</div>
          <div>
            <div className="nav-title">{lang === 'uz' ? '10 Barobar Tezroq O\'rgan' : 'Learn 10X Faster'}</div>
            <div className="nav-sub">Vodiy Ta'lim</div>
          </div>
        </div>
      </div>
      <div className="nav-right">
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === 'uz' ? 'active' : ''}`} onClick={() => setLang('uz')}>UZ</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
        </div>
        <div className="nav-user">
          <div className="nav-avatar">{user.initials}</div>
          <div>
            <div className="nav-name">{user.name}</div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            {lang === 'uz' ? 'Chiqish' : 'Logout'}
          </button>
        </div>
      </div>
    </nav>
  );
}
