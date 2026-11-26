import './index.css';

if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
  document.body.classList.remove('solena-storefront');
  import('./AdminApp').then(async ({ default: AdminApp }) => {
    const { createRoot } = await import('react-dom/client');
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error('Élément #root introuvable.');
    createRoot(rootElement).render(<AdminApp />);
  }).catch((error) => {
    console.error('[Solena Admin] Impossible de charger l’espace gérante.', error);
    const rootElement = document.getElementById('root');
    if (rootElement) { rootElement.classList.add('solena-admin'); rootElement.textContent = 'Impossible de charger l’espace gérante. Recharge la page.'; }
  });
} else {
  document.body.classList.add('solena-storefront');
  // Vérifie la connexion Supabase côté serveur à chaque ouverture de la boutique.
  // L'échec de cette vérification ne doit pas empêcher la boutique de s'afficher.
  fetch('/health', { method: 'GET', cache: 'no-store', keepalive: true }).catch(() => {});
  import('./bundle.js');
}
