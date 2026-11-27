import './index.css';

// Vérifie la connexion Supabase côté serveur à chaque ouverture de la boutique.
// L'échec de cette vérification ne doit pas empêcher la boutique de s'afficher.
fetch('/health', { method: 'GET', cache: 'no-store', keepalive: true }).catch(() => {});
import('./bundle.js');
