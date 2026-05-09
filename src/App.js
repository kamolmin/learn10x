import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import StudentProfile from './components/StudentProfile';
import TestInterface from './components/TestInterface';
import Login from './components/Login';
import './App.css';

export default function App() {
  const [lang, setLang] = useState('uz');
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} lang={lang} setLang={setLang} />;
  }

  // Student sees their own dashboard, teacher sees full dashboard
  if (user.role === 'student') {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<StudentDashboard lang={lang} setLang={setLang} user={user} onLogout={() => setUser(null)} />} />
          <Route path="/test/:studentId" element={<TestInterface lang={lang} setLang={setLang} user={user} onLogout={() => setUser(null)} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherDashboard lang={lang} setLang={setLang} user={user} onLogout={() => setUser(null)} />} />
        <Route path="/student/:id" element={<StudentProfile lang={lang} setLang={setLang} user={user} onLogout={() => setUser(null)} />} />
        <Route path="/test/:studentId" element={<TestInterface lang={lang} setLang={setLang} user={user} onLogout={() => setUser(null)} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
