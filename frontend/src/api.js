const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

async function apiRequest(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `API error ${res.status}`);
  }

  return res.json();
}

export async function registerUser({ nom, email, password, role }) {
  return apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify({ nom, email, password, role }),
  });
}

export async function loginUser({ email, password }) {
  return apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutUser(user_id) {
  return apiRequest('/users/logout', {
    method: 'POST',
    body: JSON.stringify({ user_id }),
  });
}

export async function fetchBiens() {
  return apiRequest('/biens');
}

export async function fetchBien(id) {
  return apiRequest(`/biens/${id}`);
}
