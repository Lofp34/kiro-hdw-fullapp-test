# LinkedIn Prospect Downloader

Une application web moderne pour télécharger facilement les profils LinkedIn de vos prospects en utilisant l'API Horizon Data Wave.

## 🚀 Fonctionnalités

- **Recherche par profil** : URL LinkedIn ou nom d'utilisateur
- **Recherche par email** : Trouvez un profil à partir d'une adresse email
- **Recherche avancée** : Recherche par mots-clés
- **Téléchargement JSON** : Exportez toutes les données récupérées
- **Interface moderne** : Design responsive avec Tailwind CSS
- **API sécurisée** : Communication directe avec l'API Horizon Data Wave

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd linkedin-prospect-downloader
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**

Créez un fichier `.env.local` (ou modifiez le `.env` existant) :

```env
# Configuration pour l'API Horizon Data Wave LinkedIn
HDW_ACCESS_TOKEN=votre_token_hdw_ici
HDW_ACCOUNT_ID=votre_account_id_ici

# Configuration Next.js
NEXTAUTH_SECRET=votre-secret-key-ici
NEXTAUTH_URL=http://localhost:3000
```

4. **Lancer en développement**
```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## 🌐 Déploiement sur Vercel (Recommandé)

**Pour éviter les problèmes CORS et tester en conditions réelles, déployez directement sur Vercel :**

### Déploiement rapide

1. **Créer un repository GitHub** avec ce code
2. **Aller sur [vercel.com](https://vercel.com)** et se connecter avec GitHub
3. **Importer votre repository** - Vercel détectera automatiquement Next.js
4. **Configurer les variables d'environnement** (voir section ci-dessous)
5. **Déployer** - Votre app sera disponible sur une URL Vercel

### Variables d'environnement Vercel

Dans **Settings > Environment Variables**, ajouter :
- `HDW_ACCESS_TOKEN` : Votre token HDW
- `HDW_ACCOUNT_ID` : Votre account ID HDW  
- `NEXTAUTH_SECRET` : Clé secrète (générez-en une avec `node generate-secret.js`)

📖 **Guide détaillé** : Voir [DEPLOY.md](./DEPLOY.md)

## 📋 Configuration requise

### Variables d'environnement obligatoires

- **HDW_ACCESS_TOKEN** : Votre token d'accès à l'API Horizon Data Wave
- **HDW_ACCOUNT_ID** : Votre ID de compte Horizon Data Wave

### Variables d'environnement optionnelles

- **NEXTAUTH_SECRET** : Clé secrète pour la sécurité (générez-en une aléatoire)
- **NEXTAUTH_URL** : URL de votre application (automatique sur Vercel)

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Linting
npm run lint

# Scripts MCP (si vous voulez utiliser le serveur MCP directement)
npm run mcp:build
npm run mcp:watch
npm run mcp:inspector
```

## 📱 Utilisation

1. **Choisissez votre type de recherche** :
   - Profil : URL LinkedIn ou nom d'utilisateur
   - Email : Adresse email du prospect
   - Recherche avancée : Mots-clés

2. **Saisissez votre recherche** et cliquez sur "Rechercher"

3. **Consultez les résultats** affichés avec :
   - Informations du profil
   - Publications récentes
   - Données de connexion

4. **Téléchargez les données** au format JSON pour vos analyses

## 🔒 Sécurité

- Les tokens API ne sont jamais exposés côté client
- Toutes les requêtes passent par l'API route sécurisée
- Variables d'environnement chiffrées sur Vercel

## 🐛 Dépannage

### Erreur "HDW_ACCESS_TOKEN non configuré"
- Vérifiez que votre token est bien configuré dans les variables d'environnement
- Sur Vercel, vérifiez dans Settings > Environment Variables

### Erreur "API LinkedIn error: 401"
- Votre token HDW_ACCESS_TOKEN est invalide ou expiré
- Contactez Horizon Data Wave pour renouveler votre accès

### Erreur "API LinkedIn error: 429"
- Vous avez atteint la limite de requêtes
- Attendez quelques minutes avant de réessayer

## 📞 Support

Pour toute question concernant :
- **L'API Horizon Data Wave** : Contactez le support HDW
- **Cette application** : Créez une issue sur le repository

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.