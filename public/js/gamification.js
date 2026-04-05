/* gamification.js — Levels, badges, XP bar & leaderboard */

const LEVELS = [
  { key: 'egg',          name: 'Yumurta R\u0259ssam',       emoji: '\uD83E\uDD5A', min: 0,   max: 10 },
  { key: 'beginner',     name: 'Ba\u015Flan\u011F\u0131c R\u0259ssam',    emoji: '\uD83C\uDFA8', min: 11,  max: 30 },
  { key: 'developing',   name: '\u0130nki\u015Faf ed\u0259n R\u0259ssam',  emoji: '\u2B50',       min: 31,  max: 60 },
  { key: 'systematic',   name: 'Sistemli R\u0259ssam',      emoji: '\uD83D\uDD25', min: 61,  max: 100 },
  { key: 'intellectual', name: '\u0130ntellektual R\u0259ssam', emoji: '\uD83D\uDC8E', min: 101, max: Infinity }
];

const POINT_RULES = {
  derse_geldi: 2,
  tapshiriq_tamamladi: 3,
  ela_rey: 5,
  eser_yuklendi: 2,
  ayin_telebesi: 10
};

const BADGE_INFO = {
  derse_geldi:          { emoji: '\u2705', name: 'D\u0259rs\u0259 g\u0259ldi',           desc: 'D\u0259rs\u0259 i\u015Ftirak etdi' },
  tapshiriq_tamamladi:  { emoji: '\uD83D\uDCDD', name: 'Tap\u015F\u0131r\u0131q tamamland\u0131',   desc: 'Tap\u015F\u0131r\u0131\u011F\u0131 u\u011Furla tamamlad\u0131' },
  ela_rey:              { emoji: '\uD83C\uDF1F', name: '\u018Fla r\u0259y',               desc: 'M\u00FC\u0259llimd\u0259n \u0259la r\u0259y ald\u0131' },
  eser_yuklendi:        { emoji: '\uD83D\uDDBC\uFE0F', name: '\u018Fs\u0259r y\u00FCkl\u0259ndi',         desc: 'Qalereyaya \u0259s\u0259r y\u00FCkl\u0259di' },
  ayin_telebesi:        { emoji: '\uD83C\uDFC6', name: 'Ay\u0131n t\u0259l\u0259b\u0259si',         desc: 'Ay\u0131n \u0259n yax\u015F\u0131 t\u0259l\u0259b\u0259si se\u00E7ildi' },
  first_login:          { emoji: '\uD83D\uDE80', name: '\u0130lk giri\u015F',              desc: 'Kabinet\u0259 ilk d\u0259f\u0259 daxil oldu' },
  streak_7:             { emoji: '\uD83D\uDD25', name: '7 g\u00FCn ard\u0131c\u0131l',        desc: '7 g\u00FCn ard\u0131c\u0131l d\u0259rs\u0259 g\u0259ldi' }
};

function getLevelInfo(points) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].min) return LEVELS[i];
  }
  return LEVELS[0];
}

function getLevelProgress(points) {
  const level = getLevelInfo(points);
  if (level.max === Infinity) return 100;
  const range = level.max - level.min;
  const progress = points - level.min;
  return Math.min(100, Math.round((progress / range) * 100));
}

function getNextLevelPoints(points) {
  const level = getLevelInfo(points);
  if (level.max === Infinity) return 0;
  return level.max - points + 1;
}

function renderXPBar(points) {
  const level = getLevelInfo(points);
  const progress = getLevelProgress(points);
  const next = getNextLevelPoints(points);

  let nextInfo = '';
  if (level.max !== Infinity) {
    const idx = LEVELS.indexOf(level);
    const nextLevel = LEVELS[idx + 1];
    nextInfo = `<div class="xp-next">N\u00F6vb\u0259ti s\u0259viyy\u0259y\u0259 <strong>${next}</strong> XP qal\u0131b \u2192 ${nextLevel.emoji} ${nextLevel.name}</div>`;
  } else {
    nextInfo = '<div class="xp-next">Maksimum s\u0259viyy\u0259y\u0259 \u00E7atd\u0131n\u0131z!</div>';
  }

  return `
    <div class="xp-bar-container">
      <div class="xp-header">
        <span class="xp-level">${level.emoji} ${level.name}</span>
        <span class="xp-count">${points} XP</span>
      </div>
      <div class="xp-track">
        <div class="xp-fill" style="width:${progress}%"></div>
      </div>
      ${nextInfo}
    </div>`;
}

function renderBadges(badges) {
  if (!badges || badges.length === 0) {
    return '<div class="badges-empty">H\u0259l\u0259lik badge yoxdur</div>';
  }

  const cards = badges.map(b => {
    const info = BADGE_INFO[b.type] || { emoji: '\uD83C\uDFC5', name: b.type, desc: '' };
    return `
      <div class="badge-card">
        <div class="badge-emoji">${info.emoji}</div>
        <div class="badge-name">${info.name}</div>
        <div class="badge-desc">${info.desc}</div>
      </div>`;
  }).join('');

  return `<div class="badges-grid">${cards}</div>`;
}

function renderLeaderboard(students, currentUserId) {
  if (!students || students.length === 0) {
    return '<div class="leaderboard-empty">M\u0259lumat yoxdur</div>';
  }

  const sorted = [...students].sort((a, b) => (b.points || 0) - (a.points || 0));

  const rows = sorted.map((s, i) => {
    const rank = i + 1;
    const medal = rank === 1 ? '\uD83E\uDD47' : rank === 2 ? '\uD83E\uDD48' : rank === 3 ? '\uD83E\uDD49' : rank;
    const level = getLevelInfo(s.points || 0);
    const isCurrent = s.user_id === currentUserId;
    const cls = isCurrent ? ' class="lb-current"' : '';

    return `<tr${cls}>
      <td>${medal}</td>
      <td>${s.full_name || 'Anonim'}</td>
      <td>${level.emoji} ${level.name}</td>
      <td><strong>${s.points || 0}</strong> XP</td>
    </tr>`;
  }).join('');

  return `
    <table class="leaderboard-table">
      <thead>
        <tr>
          <th>#</th>
          <th>T\u0259l\u0259b\u0259</th>
          <th>S\u0259viyy\u0259</th>
          <th>XP</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}
