// src/services/api.js
export const API_BASE_URL = "http://localhost/gabinete-api";

/* --- SOLICITAÇÕES --- */
export async function fetchRequests() {
  const res = await fetch(`${API_BASE_URL}/get_requests.php`);
  return await res.json();
}

export async function fetchRequestById(id) {
  const res = await fetch(`${API_BASE_URL}/get_request_by_id.php?id=${id}`);
  return await res.json();
}

export async function updateRequest(data) {
  const res = await fetch(`${API_BASE_URL}/update_request.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function fetchRequestHistory(requestId) {
  const res = await fetch(`${API_BASE_URL}/get_request_history.php?request_id=${requestId}`);
  return await res.json();
}

/* --- BLOG / NOTÍCIAS --- */
export async function fetchNews() {
  const res = await fetch(`${API_BASE_URL}/get_news.php`);
  return await res.json();
}

export async function fetchNewsById(id) {
  const res = await fetch(`${API_BASE_URL}/get_news_by_id.php?id=${id}`);
  return await res.json();
}

export async function updateNews(data) {
  const res = await fetch(`${API_BASE_URL}/update_news.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function fetchNewsHistory(newsId) {
  const res = await fetch(`${API_BASE_URL}/get_news_history.php?news_id=${newsId}`);
  return await res.json();
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE_URL}/upload_image.php`, {
    method: "POST",
    body: formData, // Envia multipart/form-data automaticamente
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Erro ao realizar upload da imagem.");
  }

  return result.url; // Retorna a URL final da imagem no servidor PHP
}
// Adicione em src/services/api.js

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao realizar autenticação.");
  }

  return data;
}

// Adicione em src/services/api.js

export async function fetchDashboardStats() {
  const response = await fetch(`${API_BASE_URL}/get_stats.php`);
  if (!response.ok) {
    throw new Error("Erro ao carregar métricas do dashboard.");
  }
  return await response.json();
}

export async function fetchSettings() {
  const response = await fetch(`${API_BASE_URL}/settings.php`);
  if (!response.ok) throw new Error("Erro ao carregar configurações.");
  return await response.json();
}

export async function saveSettings(settingsData) {
  const response = await fetch(`${API_BASE_URL}/settings.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settingsData),
  });
  if (!response.ok) throw new Error("Erro ao salvar configurações.");
  return await response.json();
}