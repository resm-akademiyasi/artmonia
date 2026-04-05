/* auth-kabinet.js — Authentication & role helpers for Kabinet */

function go(path) {
  window.location.replace(window.location.origin + path);
}

async function getUser() {
  try {
    const { data: { user }, error } = await sb.auth.getUser();
    if (error || !user) return null;
    return user;
  } catch (e) {
    console.error('getUser error:', e);
    return null;
  }
}

async function getRole() {
  const user = await getUser();
  if (!user) return null;
  try {
    const { data, error } = await sb
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();
    if (error || !data) return null;
    return data.role;
  } catch (e) {
    console.error('getRole error:', e);
    return null;
  }
}

async function getStudent() {
  const user = await getUser();
  if (!user) return null;
  try {
    const { data, error } = await sb
      .from('students')
      .select('*, groups(*)')
      .eq('id', user.id)
      .maybeSingle();
    if (error || !data) return null;
    return data;
  } catch (e) {
    console.error('getStudent error:', e);
    return null;
  }
}

async function requireAuth() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    go('/kabinet/');
    return false;
  }
  return true;
}

async function requireRole(...allowedRoles) {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    go('/kabinet/');
    return false;
  }

  const role = await getRole();
  if (!role || !allowedRoles.includes(role)) {
    if (!role) {
      go('/kabinet/');
    } else if (role === 'student' && allowedRoles.some(r => ['super_admin', 'manager', 'teacher'].includes(r))) {
      go('/kabinet/dashboard.html');
    } else if (['super_admin', 'manager', 'teacher'].includes(role) && allowedRoles.includes('student')) {
      go('/admin/index.html');
    } else {
      redirectByRole(role);
    }
    return false;
  }
  return true;
}

function redirectByRole(role) {
  switch (role) {
    case 'student':
      go('/kabinet/dashboard.html');
      break;
    case 'teacher':
      go('/admin/muellim-qrup.html');
      break;
    case 'manager':
      go('/admin/telebeler.html');
      break;
    case 'super_admin':
      go('/admin/dashboard.html');
      break;
    default:
      go('/kabinet/');
  }
}

async function logout() {
  await sb.auth.signOut();
  go('/kabinet/');
}

sb.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_OUT') {
    go('/kabinet/');
  }
});
