// Gamification system
const LEVELS = [
  { name: 'Yumurta Rəssam', emoji: '🥚', min: 0, max: 10 },
  { name: 'Başlanğıc Rəssam', emoji: '🎨', min: 11, max: 30 },
  { name: 'İnkişaf edən', emoji: '⭐', min: 31, max: 60 },
  { name: 'Sistemli Rəssam', emoji: '🔥', min: 61, max: 100 },
  { name: 'İntellektual Rəssam', emoji: '💎', min: 101, max: Infinity }
];

const POINT_RULES = {
  derse_geldi: 2,
  tapshiriq_tamamladi: 3,
  ela_rey: 5,
  eser_yuklendi: 2,
  ayin_telebesi: 10
};

function getLevel(points) {
  return LEVELS.find(l => points >= l.min && points <= l.max) || LEVELS[0];
}

function getLevelProgress(points) {
  const level = getLevel(points);
  if (level.max === Infinity) return 100;
  const range = level.max - level.min;
  const progress = points - level.min;
  return Math.min(100, Math.round((progress / range) * 100));
}

function getNextLevelPoints(points) {
  const level = getLevel(points);
  if (level.max === Infinity) return 0;
  return level.max - points + 1;
}

async function addPoints(studentId, action, points) {
  await sb.from('point_log').insert({ student_id: studentId, action, points });
  await sb.rpc('increment_points', { sid: studentId, pts: points }).catch(() => {
    // fallback: manual update
    sb.from('students').select('total_points').eq('id', studentId).single().then(({ data }) => {
      if (data) sb.from('students').update({ total_points: data.total_points + points }).eq('id', studentId);
    });
  });
}

function renderLevelBadge(points) {
  const l = getLevel(points);
  return `<span class="level-badge level-${l.name.replace(/\s/g, '-').toLowerCase()}">${l.emoji} ${l.name}</span>`;
}

function renderXPBar(points) {
  const l = getLevel(points);
  const pct = getLevelProgress(points);
  const next = getNextLevelPoints(points);
  return `
    <div class="xp-section">
      <div class="xp-header">
        <span class="xp-level">${l.emoji} ${l.name}</span>
        <span class="xp-points">${points} XP</span>
      </div>
      <div class="xp-bar"><div class="xp-fill" style="width:${pct}%"></div></div>
      ${next > 0 ? `<div class="xp-next">Növbəti səviyyəyə ${next} xal qalır</div>` : '<div class="xp-next">Maksimum səviyyə! 🏆</div>'}
    </div>`;
}

const BADGE_INFO = {
  first_artwork: { emoji: '🖼️', name: 'İlk Əsər', desc: 'İlk əsərini yüklədin' },
  lesson_10: { emoji: '📚', name: '10 Dərs', desc: '10 dərs tamamladın' },
  homework_5: { emoji: '✅', name: '5 Tapşırıq', desc: '5 tapşırıq tamamladın' },
  streak_30: { emoji: '🔥', name: '30 Gün', desc: '30 gün ardıcıl aktiv' },
  monthly_star: { emoji: '🌟', name: 'Ayın Tələbəsi', desc: 'Ayın ən yaxşı tələbəsi seçildin' },
  perfect_week: { emoji: '💯', name: 'Mükəmməl Həftə', desc: '1 həftə bütün tapşırıqlar vaxtında' }
};

function renderBadges(badges) {
  if (!badges || !badges.length) return '<div class="no-badges">Hələ badge yoxdur. Tapşırıqları tamamla!</div>';
  return badges.map(b => {
    const info = BADGE_INFO[b.badge_type] || { emoji: '🏅', name: b.badge_type, desc: '' };
    return `<div class="badge-card">
      <div class="badge-emoji">${info.emoji}</div>
      <div class="badge-name">${info.name}</div>
      <div class="badge-desc">${info.desc}</div>
      <div class="badge-date">${new Date(b.earned_at).toLocaleDateString('az-AZ')}</div>
    </div>`;
  }).join('');
}
