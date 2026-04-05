// Auth helpers for Kabinet
async function getUser() {
  const { data: { user } } = await sb.auth.getUser();
  return user;
}

async function getStudent() {
  const user = await getUser();
  if (!user) return null;
  const { data } = await sb.from('students').select('*, groups(*)').eq('id', user.id).maybeSingle();
  return data;
}

function requireAuth() {
  sb.auth.getUser().then(({ data: { user } }) => {
    if (!user) window.location.href = '/kabinet/';
  });
}

async function logout() {
  await sb.auth.signOut();
  window.location.href = '/kabinet/';
}

// Session listener
sb.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    window.location.href = '/kabinet/';
  }
});
