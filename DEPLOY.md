# 🚀 Guide de déploiement rapide sur Vercel

## Étapes de déploiement

### 1. Préparer le repository GitHub

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: LinkedIn Prospect Downloader"

# Ajouter votre repository GitHub
git remote add origin https://github.com/VOTRE-USERNAME/linkedin-prospect-downloader.git

# Pousser le code
git push -u origin main
```

### 2. Déployer sur Vercel

1. **Aller sur [vercel.com](https://vercel.com)**
2. **Se connecter avec GitHub**
3. **Cliquer sur "New Project"**
4. **Importer votre repository**
5. **Vercel détectera automatiquement Next.js**

### 3. Configurer les variables d'environnement

Dans l'interface Vercel, aller dans **Settings > Environment Variables** et ajouter :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `HDW_ACCESS_TOKEN` | Votre token HDW | Production, Preview, Development |
| `HDW_ACCOUNT_ID` | Votre account ID HDW | Production, Preview, Development |
| `NEXTAUTH_SECRET` | Clé secrète aléatoire | Production, Preview, Development |

### 4. Redéployer

Après avoir ajouté les variables d'environnement :
- Aller dans l'onglet **Deployments**
- Cliquer sur les 3 points du dernier déploiement
- Cliquer sur **Redeploy**

## ✅ Test de l'application

Une fois déployée, votre application sera disponible sur une URL comme :
`https://linkedin-prospect-downloader-xxx.vercel.app`

### Tests à effectuer :

1. **Interface utilisateur** : Vérifier que la page se charge correctement
2. **Recherche par profil** : Tester avec une URL LinkedIn
3. **Recherche par email** : Tester avec un email
4. **Téléchargement JSON** : Vérifier que le téléchargement fonctionne

## 🔧 Dépannage

### Erreur 500 sur l'API
- Vérifier que `HDW_ACCESS_TOKEN` est bien configuré
- Vérifier que le token n'est pas expiré

### Variables d'environnement non prises en compte
- S'assurer qu'elles sont configurées pour tous les environnements
- Redéployer après les avoir ajoutées

## 🔄 Mises à jour

Pour mettre à jour l'application :
```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel redéploiera automatiquement !

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans l'onglet **Functions** de Vercel
2. Consultez la documentation HDW pour l'API
3. Vérifiez que vos tokens sont valides