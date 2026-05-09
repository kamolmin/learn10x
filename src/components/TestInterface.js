import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import { STUDENTS, SAMPLE_TEST_QUESTIONS } from '../data/sampleData';

const T = {
  uz: {
    title: 'Test Sessiyasi',
    question: 'Savol',
    of: 'dan',
    timeLeft: 'Qolgan vaqt',
    next: 'Keyingisi',
    finish: 'Testni Tugatish',
    results: 'Test Natijalari',
    correct: 'To\'g\'ri',
    incorrect: 'Noto\'g\'ri',
    score: 'Ball',
    avgTime: 'O\'rtacha Vaqt',
    backToDashboard: 'Panelga Qaytish',
    viewProfile: 'Profilni Ko\'rish',
    sec: 'son',
    wellDone: 'Yaxshi natija!',
    keepGoing: 'Davom eting!',
    needsWork: 'Ko\'proq mashq kerak',
    yourAnswer: 'Sizning javobingiz',
    correctAnswer: 'To\'g\'ri javob',
    summary: 'Xulosa',
    level: 'Daraja',
  },
  en: {
    title: 'Test Session',
    question: 'Question',
    of: 'of',
    timeLeft: 'Time Left',
    next: 'Next',
    finish: 'Finish Test',
    results: 'Test Results',
    correct: 'Correct',
    incorrect: 'Incorrect',
    score: 'Score',
    avgTime: 'Avg Time',
    backToDashboard: 'Back to Dashboard',
    viewProfile: 'View Profile',
    sec: 's',
    wellDone: 'Well done!',
    keepGoing: 'Keep going!',
    needsWork: 'Needs more practice',
    yourAnswer: 'Your answer',
    correctAnswer: 'Correct answer',
    summary: 'Summary',
    level: 'Level',
  }
};

export default function TestInterface({ lang, setLang, user, onLogout }) {
  const t = T[lang];
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = STUDENTS.find(s => s.id === Number(studentId));
  const questions = SAMPLE_TEST_QUESTIONS;

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(questions[0].timeLimit);
  const [questionTime, setQuestionTime] = useState(0);
  const [timeTaken, setTimeTaken] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleNext = useCallback(() => {
    const answer = {
      questionId: questions[current].id,
      selected,
      correct: selected === questions[current].correct,
      time: questions[current].timeLimit - timeLeft,
    };
    const newAnswers = [...answers, answer];
    const newTimes = [...timeTaken, questions[current].timeLimit - timeLeft];
    setAnswers(newAnswers);
    setTimeTaken(newTimes);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(questions[current + 1].timeLimit);
      setQuestionTime(0);
    } else {
      setFinished(true);
    }
  }, [current, selected, answers, timeTaken, timeLeft, questions]);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return 0;
        }
        return prev - 1;
      });
      setQuestionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [finished, handleNext]);

  if (!student) return <div>Student not found</div>;

  if (finished) {
    const correctCount = answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / questions.length) * 100);
    const avgTime = Math.round(answers.reduce((a, b) => a + b.time, 0) / answers.length);
    const feedback = score >= 80 ? t.wellDone : score >= 60 ? t.keepGoing : t.needsWork;
    const feedbackColor = score >= 80 ? '#16a34a' : score >= 60 ? 'var(--teal)' : 'var(--red)';

    return (
      <div>
        <Nav lang={lang} setLang={setLang} user={user} onLogout={onLogout} backTo={`/student/${student.id}`} />
        <div className="page" style={{ maxWidth: 720 }}>
          {/* Score hero */}
          <div className="animate-fade-up card" style={{
            marginBottom: 24, padding: '36px',
            background: `linear-gradient(135deg, ${feedbackColor}08, white)`,
            borderLeft: `4px solid ${feedbackColor}`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: feedbackColor, letterSpacing: -3, marginBottom: 8 }}>
              {score}%
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{feedback}</div>
            <div style={{ fontSize: 14, color: 'var(--text-2)' }}>
              {correctCount}/{questions.length} {lang === 'uz' ? 'to\'g\'ri' : 'correct'} · {lang === 'uz' ? 'O\'rtacha vaqt' : 'Avg time'}: {avgTime}{t.sec}
            </div>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
            {[
              { label: t.correct, value: correctCount, color: '#16a34a', icon: '✅' },
              { label: t.incorrect, value: questions.length - correctCount, color: 'var(--red)', icon: '❌' },
              { label: t.avgTime, value: avgTime + t.sec, color: avgTime > 60 ? 'var(--orange)' : 'var(--teal)', icon: '⏱️' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Answer review */}
          <div className="animate-fade-up-2 card" style={{ marginBottom: 24 }}>
            <div className="card-header"><span className="card-title">📋 {t.summary}</span></div>
            <div className="card-body" style={{ padding: 0 }}>
              {questions.map((q, i) => {
                const ans = answers[i];
                const isCorrect = ans?.correct;
                return (
                  <div key={q.id} style={{
                    padding: '16px 24px',
                    borderBottom: i < questions.length - 1 ? '1px solid var(--border)' : 'none',
                    background: isCorrect ? '#f0fdf4' : '#fef2f2',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                            {q.subject} · {q.level}-{t.level}
                          </span>
                          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{ans?.time || 0}{t.sec}</span>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>{q.question}</div>
                        {!isCorrect && (
                          <div style={{ fontSize: 12, color: 'var(--red)' }}>
                            {t.yourAnswer}: <strong>{q.options[ans?.selected ?? -1] || '—'}</strong>
                            {' → '}{t.correctAnswer}: <strong style={{ color: '#16a34a' }}>{q.options[q.correct]}</strong>
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: isCorrect ? '#dcfce7' : '#fee2e2',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, flexShrink: 0,
                      }}>{isCorrect ? '✓' : '✕'}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost" onClick={() => navigate('/')}>{t.backToDashboard}</button>
            <button className="btn btn-primary" onClick={() => navigate(`/student/${student.id}`)}>{t.viewProfile}</button>
          </div>
        </div>
      </div>
    );
  }

  // Active test
  const q = questions[current];
  const timerPct = (timeLeft / q.timeLimit) * 100;
  const timerColor = timeLeft > q.timeLimit * 0.5 ? '#16a34a' : timeLeft > q.timeLimit * 0.25 ? 'var(--orange)' : 'var(--red)';

  return (
    <div>
      <Nav lang={lang} setLang={setLang} user={user} onLogout={onLogout} backTo={`/student/${student.id}`} />
      <div className="page" style={{ maxWidth: 720 }}>

        {/* Header bar */}
        <div className="animate-fade-up card" style={{ marginBottom: 24, padding: '16px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)' }}>
                {student.name} · {t.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>
                {t.question} {current + 1} {t.of} {questions.length}
              </div>
            </div>
            {/* Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600 }}>{t.timeLeft}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: timerColor, fontFamily: 'var(--mono)' }}>{timeLeft}{t.sec}</div>
              </div>
              <svg width="48" height="48" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="none" stroke="var(--surface-2)" strokeWidth="4" />
                <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 * (1 - timerPct / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 24 24)"
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                />
              </svg>
            </div>
          </div>
          {/* Progress */}
          <div className="progress-track" style={{ marginTop: 12 }}>
            <div className="progress-fill" style={{
              width: `${((current) / questions.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--teal), var(--mint))',
            }} />
          </div>
        </div>

        {/* Question card */}
        <div className="animate-fade-up-2 card" style={{ marginBottom: 20, padding: '28px 32px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
            <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: 'var(--surface-2)', color: 'var(--text-2)' }}>
              {q.subject}
            </span>
            <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, background: 'var(--blue)20', color: 'var(--blue)' }}>
              {q.level}-{t.level}
            </span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 28, fontFamily: 'var(--mono)' }}>
            {q.question}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                width: '100%', padding: '14px 20px',
                border: selected === i ? '2px solid var(--teal)' : '2px solid var(--border)',
                borderRadius: 10,
                background: selected === i ? 'var(--teal)10' : 'white',
                textAlign: 'left', fontSize: 15, fontFamily: 'var(--font)',
                fontWeight: selected === i ? 700 : 400,
                color: selected === i ? 'var(--teal)' : 'var(--text)',
                cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: selected === i ? 'var(--teal)' : 'var(--surface-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: selected === i ? 'white' : 'var(--text-3)',
                  flexShrink: 0,
                }}>{['A', 'B', 'C', 'D'][i]}</div>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleNext} style={{ padding: '12px 28px', fontSize: 15 }}>
            {current < questions.length - 1 ? t.next + ' →' : '✓ ' + t.finish}
          </button>
        </div>

      </div>
    </div>
  );
}
