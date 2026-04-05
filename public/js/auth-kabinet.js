/* auth-kabinet.js — Artmonia Kabinet Auth Helpers */

function go(path) {
  window.location.replace(window.location.origin + path);
}

async function getSession() {
  try {
    const { data } = await sb.auth.getSession();
    return data.session;
  } catch (e) {
    console.error('getSession error:', e);
    return null;
  }
}

async function getRole() {
  const session = await getSession();
  if (!session) return null;
  try {
    const { data, error } = await sb
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();
    if (error || !data) return null;
    return data.role;
  } catch (e) {
    console.error('getRole error:', e);
    return null;
  }
}

async function getStudent() {
  const session = await getSession();
  if (!session) return null;
  try {
    const { data, error } = await sb
      .from('students')
      .select('*, groups(*)')
      .eq('id', session.user.id)
      .maybeSingle();
    if (error || !data) return null;
    return data;
  } catch (e) {
    console.error('getStudent error:', e);
    return null;
  }
}

/**
 * Səhifə girişini yoxlayır.
 * @param {string[]} allowedRoles - icazə verilən rollar
 * @param {string} redirectTo - icazəsiz olduqda hara yönləndir
 * @returns {Promise<boolean>} - icazə varsa true
 */
async function requireAuth(allowedRoles, redirectTo) {
  const session = await getSession();
  if (!session) {
    go(redirectTo);
    return false;
  }
  const role = await getRole();
  if (!role || !allowedRoles.includes(role)) {
    go(redirectTo);
    return false;
  }
  return true;
}

async function logout() {
  await sb.auth.signOut();
  go('/admin/index.html');
}

async function logoutStudent() {
  await sb.auth.signOut();
  go('/kabinet/index.html');
}
