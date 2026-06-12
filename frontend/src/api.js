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

// --- DANS src/api.js ---

export async function createTransaction(payload) {
  return apiRequest('/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchClientTransactions(clientId) {
  return apiRequest(`/transactions/client/${clientId}`);
}

export async function fetchEmployeTransactions() {
  return apiRequest('/transactions/employe/attente');
}

export async function accepterTransaction(id) {
  return apiRequest(`/transactions/${id}/accepter`, { method: 'PUT' });
}

export async function refuserTransaction(id) {
  return apiRequest(`/transactions/${id}`, { method: 'DELETE' });
}

export async function fetchAgences() {
  return apiRequest('/agences/');
}