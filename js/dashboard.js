// ダッシュボード: カレンダー・進捗・記録管理（ユーザーキー対応）

(function () {
  'use strict';

  const STORAGE_KEY = 'code-typing-records';
  const USER_KEY_STORAGE = 'code-typing-user-key';
  const SESSION_KEY = 'code-typing-last-session';

  // ===== ユーザーキー =====
  function getUserKey() {
    const input = document.getElementById('dash-user-key');
    return input ? input.value.trim() : '';
  }

  function saveUserKey(key) {
    try { localStorage.setItem(USER_KEY_STORAGE, key); } catch {}
  }

  function loadUserKey() {
    try { return localStorage.getItem(USER_KEY_STORAGE) || ''; } catch { return ''; }
  }

  // ===== 記録データ =====
  function loadAllRecords() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  }

  function saveAllRecords(all) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }

  function getRecords(userKey) {
    if (!userKey) return {};
    const all = loadAllRecords();
    return all[userKey] || {};
  }

  function recordSession() {
    const userKey = getUserKey();
    if (!userKey) return;

    const all = loadAllRecords();
    if (!all[userKey]) all[userKey] = {};

    const today = getDateKey(new Date());
    if (!all[userKey][today]) all[userKey][today] = { count: 0 };
    all[userKey][today].count++;
    saveAllRecords(all);
  }

  function getDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // ===== 最後のセッション保存・復元 =====
  // session: { type: 'normal', mode: 'javascript' }
  //       or { type: 'ruby-learning', chapterId: 3, stepIndex: 1 }
  function saveLastSession(session) {
    const userKey = getUserKey();
    if (!userKey) return;
    try {
      const all = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
      all[userKey] = { ...session, savedAt: new Date().toISOString() };
      localStorage.setItem(SESSION_KEY, JSON.stringify(all));
    } catch {}
  }

  function getLastSession() {
    const userKey = getUserKey();
    if (!userKey) return null;
    try {
      const all = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
      return all[userKey] || null;
    } catch { return null; }
  }

  // ===== 問題数 =====
  function getTotalQuestions() {
    let total = 0;
    if (typeof SNIPPETS !== 'undefined') {
      Object.keys(SNIPPETS).forEach(mode => {
        total += SNIPPETS[mode].snippets.length;
      });
    }
    if (typeof RUBY_LEARNING_DATA !== 'undefined') {
      Object.keys(RUBY_LEARNING_DATA).forEach(ch => {
        total += RUBY_LEARNING_DATA[ch].steps.length;
      });
    }
    return total;
  }

  function getTotalSessions(userKey) {
    const records = getRecords(userKey);
    let total = 0;
    Object.values(records).forEach(r => { total += r.count; });
    return total;
  }

  // ===== カレンダー =====
  let calYear, calMonth;

  function initDashboard() {
    const now = new Date();
    calYear = now.getFullYear();
    calMonth = now.getMonth();

    // ユーザーキーを復元
    const savedKey = loadUserKey();
    const input = document.getElementById('dash-user-key');
    if (input && savedKey) {
      input.value = savedKey;
    }

    // 入力時にリアルタイム更新
    if (input) {
      input.addEventListener('input', () => {
        const key = input.value.trim();
        saveUserKey(key);
        renderCalendar();
        renderProgress();
        renderResumeButton();
      });
    }

    renderCalendar();
    renderProgress();
    renderResumeButton();

    document.getElementById('dash-cal-prev').addEventListener('click', () => {
      calMonth--;
      if (calMonth < 0) { calMonth = 11; calYear--; }
      renderCalendar();
    });

    document.getElementById('dash-cal-next').addEventListener('click', () => {
      calMonth++;
      if (calMonth > 11) { calMonth = 0; calYear++; }
      renderCalendar();
    });

    document.getElementById('dash-start-btn').addEventListener('click', () => {
      const key = getUserKey();
      if (key) saveUserKey(key);
      document.getElementById('screen-dashboard').classList.remove('active');
      document.getElementById('screen-select').classList.add('active');
    });

    // 続きから再開ボタン
    const resumeBtn = document.getElementById('dash-resume-btn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', handleResume);
    }

    const totalQ = getTotalQuestions();
    document.getElementById('dash-total-info').textContent = `全 ${totalQ} 問`;
  }

  // ===== 続きから再開 =====
  function handleResume() {
    const session = getLastSession();
    if (!session) return;

    const key = getUserKey();
    if (key) saveUserKey(key);

    if (session.type === 'ruby-learning') {
      // Ruby学習モードの続き
      if (window.RubyLearning && window.RubyLearning.resumeAt) {
        window.RubyLearning.resumeAt(session.chapterId, session.stepIndex);
      }
    } else if (session.type === 'git-learning') {
      // Git演習モードの続き
      if (window.GitLearning && window.GitLearning.resumeAt) {
        window.GitLearning.resumeAt(session.chapterId, session.stepIndex);
      }
    } else if (session.type === 'rails-learning') {
      // Rails入門モードの続き
      if (window.RailsLearning && window.RailsLearning.resumeAt) {
        window.RailsLearning.resumeAt(session.chapterId, session.stepIndex);
      }
    } else if (session.type === 'normal' && session.mode) {
      // 通常モード → そのモードの待機画面へ
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('screen-select').classList.add('active');
      // モードボタンをクリックする代わりに直接selectModeを呼ぶ
      const btn = document.querySelector(`.mode-btn[data-mode="${session.mode}"]`);
      if (btn) btn.click();
    }
  }

  function renderResumeButton() {
    const resumeBtn = document.getElementById('dash-resume-btn');
    if (!resumeBtn) return;

    const session = getLastSession();
    if (!session) {
      resumeBtn.style.display = 'none';
      return;
    }

    let label = '前回の続きから再開';
    if (session.type === 'ruby-learning' && typeof RUBY_LEARNING_DATA !== 'undefined') {
      const ch = RUBY_LEARNING_DATA[session.chapterId];
      if (ch) {
        const step = ch.steps[session.stepIndex];
        label = `続きから再開: Ruby Ch.${session.chapterId} - ${step ? step.title : ''}`;
      }
    } else if (session.type === 'git-learning' && typeof GIT_LEARNING_DATA !== 'undefined') {
      const ch = GIT_LEARNING_DATA[session.chapterId];
      if (ch) {
        const step = ch.steps[session.stepIndex];
        label = `続きから再開: Git Ch.${session.chapterId} - ${step ? step.title : ''}`;
      }
    } else if (session.type === 'rails-learning' && typeof RAILS_LEARNING_DATA !== 'undefined') {
      const ch = RAILS_LEARNING_DATA[session.chapterId];
      if (ch) {
        const step = ch.steps[session.stepIndex];
        label = `続きから再開: Rails Ch.${session.chapterId} - ${step ? step.title : ''}`;
      }
    } else if (session.type === 'normal') {
      const modeNames = {
        symbols: '記号特訓',
        html_css: 'HTML / CSS',
        javascript: 'JavaScript',
        ruby: 'Ruby',
        mix: 'ミックス'
      };
      label = `続きから再開: ${modeNames[session.mode] || session.mode}`;
    }

    resumeBtn.textContent = label;
    resumeBtn.style.display = '';
  }

  function renderCalendar() {
    const container = document.getElementById('dash-calendar');
    const title = document.getElementById('dash-cal-title');
    const summary = document.getElementById('dash-cal-summary');
    const userKey = getUserKey();
    const records = getRecords(userKey);

    title.textContent = `📅 ${calYear}年 ${calMonth + 1}月 の学習記録`;

    const days = ['日', '月', '火', '水', '木', '金', '土'];
    let html = '<div class="dash-cal-row dash-cal-weekdays">';
    days.forEach(d => { html += `<div class="dash-cal-cell dash-cal-weekday">${d}</div>`; });
    html += '</div>';

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();
    const todayKey = getDateKey(today);

    let dayCount = 0;
    let monthSessions = 0;

    let row = '<div class="dash-cal-row">';
    for (let i = 0; i < firstDay; i++) {
      row += '<div class="dash-cal-cell dash-cal-empty"></div>';
      dayCount++;
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = key === todayKey;
      const hasRecord = records[key] && records[key].count > 0;

      if (hasRecord) monthSessions++;

      let cls = 'dash-cal-cell dash-cal-day';
      if (isToday) cls += ' dash-cal-today';
      if (hasRecord) cls += ' dash-cal-active';

      row += `<div class="${cls}">${d}</div>`;
      dayCount++;

      if (dayCount % 7 === 0) {
        row += '</div>';
        html += row;
        row = '<div class="dash-cal-row">';
      }
    }

    if (dayCount % 7 !== 0) {
      while (dayCount % 7 !== 0) {
        row += '<div class="dash-cal-cell dash-cal-empty"></div>';
        dayCount++;
      }
      row += '</div>';
      html += row;
    }

    container.innerHTML = html;
    summary.textContent = `今月 ${monthSessions} 日学習`;
  }

  function renderProgress() {
    const userKey = getUserKey();
    const totalQ = getTotalQuestions();
    const sessions = getTotalSessions(userKey);
    const pct = totalQ > 0 ? Math.min(Math.round((sessions / totalQ) * 100), 100) : 0;

    document.getElementById('dash-progress-fill').style.width = pct + '%';
    document.getElementById('dash-progress-text').textContent = `${sessions} / ${totalQ}`;
    document.getElementById('dash-progress-pct').textContent = `${pct}% 完了`;
  }

  // ===== 公開API =====
  window.Dashboard = {
    init: initDashboard,
    recordSession: recordSession,
    saveLastSession: saveLastSession,
    getLastSession: getLastSession,
    renderProgress: renderProgress,
    renderCalendar: renderCalendar,
    renderResumeButton: renderResumeButton,
    getUserKey: getUserKey,
    showDashboard: function () {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('screen-dashboard').classList.add('active');
      renderCalendar();
      renderProgress();
      renderResumeButton();
    }
  };
})();
