# Konsole Analyzer

Application web qui analyse un site d'entreprise et génère une fiche enrichie :
nom, logo, secteur, taille, tech stack, signaux GTM et score de pertinence commerciale (0–100).

Projet réalisé dans le cadre du processus de recrutement chez **Youno** par **Claire Naudin**, développeuse.

À l'issue du test technique, j'ai continué à utiliser cet outil comme outil métier personnel — il me permet de mieux identifier les entreprises les plus adaptées à mon profil avant d'envoyer une candidature.

> **Merci à l'équipe Youno** pour leur autorisation de publication de ce projet. 🙏

**Stack :** React · Vercel Serverless · Groq (LLaMA 3.1) · Clearbit · Vite · Jest · Vitest

---

## Démo

🔗 [konsole-analyzer-gamma.vercel.app](https://konsole-analyzer-gamma.vercel.app)

---

## Fonctionnement

```

URL saisie → validation → scraping HTML → enrichissement Clearbit → analyse LLM Groq → scoring → fiche affichée

```

1. L'utilisateur saisit une URL (`youno.fr`, `stripe.com`…)
2. Le backend valide et normalise l'URL
3. Le HTML de la page est scrapé (head + début de body, 3 000 chars max)
4. Clearbit fournit le logo et le nom officiel
5. Groq (LLaMA 3.1 8B) extrait : secteur, taille, langue, tech stack, signaux GTM
6. Un score 0–100 est calculé selon 5 critères B2B
7. La fiche est affichée

---

## Structure du projet

```

konsole-analyzer/ ← 19 dossiers, 67 fichiers
│
├── api/
│ ├── analyze.js ← endpoint Vercel Serverless
│ └── package.json ← force CommonJS dans api/
│
├── functions/ ← modules backend + tests Jest
│ ├── src/
│ │ ├── validator.js ← validation et normalisation d'URL
│ │ ├── scraper.js ← scraping HTML (3 000 chars max)
│ │ ├── clearbit.js ← logo + nom via Clearbit Autocomplete
│ │ ├── groq.js ← analyse LLM via Groq API
│ │ ├── scoring.js ← score 0–100 (5 critères B2B)
│ │ └── analyzer.js ← orchestration des modules
│ └── **tests**/ ← 6 fichiers — 37 tests Jest
│
├── src/ ← frontend React
│ ├── components/
│ │ ├── SearchBar.jsx
│ │ ├── CompanyCard.jsx
│ │ ├── TechStack.jsx
│ │ ├── GtmSignals.jsx
│ │ ├── ScorePanel.jsx
│ │ └── Loader.jsx
│ ├── hooks/
│ │ └── useAnalyze.js ← appel API + états loading/error/result
│ ├── utils/
│ │ └── formatUrl.js ← formatUrl + extractDomain
│ ├── styles/ ← 7 fichiers CSS natif mobile-first
│ └── **tests**/ ← 8 fichiers — 29 tests Vitest
│
├── dist/ ← build de production
├── vercel.json ← routing API + SPA
└── .env.local ← non commité

```

---

## Prérequis

- Node.js 18+
- npm 9+
- Compte Vercel (gratuit)
- Clé API Groq → [console.groq.com](https://console.groq.com)

---

## Installation

```bash
# 1. Cloner
git clone https://github.com/Poca23/konsole-analyzer.git
cd konsole-analyzer

# 2. Dépendances frontend + racine
npm install

# 3. Dépendances backend
cd functions && npm install && cd ..
```

### Configurer `.env.local`

Créer `.env.local` à la racine :

```
VITE_API_URL=https://konsole-analyzer-gamma.vercel.app
```

> Ne jamais committer ce fichier — protégé par `.gitignore`.

---

## Développement local

```bash
# Frontend
npm run dev

# Test API en production
curl -X POST https://konsole-analyzer-gamma.vercel.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "youno.fr"}'
```

---

## Tests

```bash
# Backend (Jest) — 37 tests
cd functions && npx jest

# Frontend (Vitest) — 29 tests
npm run test
```

> Tous les tests sont écrits avant le code (TDD strict).

| Outil             | Suites | Tests  |
| ----------------- | ------ | ------ |
| Jest — backend    | 6      | 37     |
| Vitest — frontend | 8      | 29     |
| **Total**         | **14** | **66** |

---

## Scoring

Score de pertinence commerciale (0–100) calculé sur 5 critères :

| Critère         | Points max | Détail                                     |
| --------------- | ---------- | ------------------------------------------ |
| Secteur tech    | 30         | SaaS, Fintech, Agence, Consulting…         |
| Signaux B2B     | 30         | b2b, saas, crm, revops, outbound, gtm…     |
| Taille          | 20         | startup = 20, PME = 15                     |
| Langue anglaise | 10         | site en `en`                               |
| Stack tech      | 20         | React, Node, Docker… ← critère ajouté v1.1 |

| Score | Label               |
| ----- | ------------------- |
| ≥ 70  | 🔥 Excellent fit    |
| ≥ 40  | 👍 Bon potentiel    |
| ≥ 20  | 🤔 Potentiel modéré |
| < 20  | ❄️ Peu pertinent    |

---

## Tests live — Résultats

| URL         | Nom     | Secteur | Taille            | Score            |
| ----------- | ------- | ------- | ----------------- | ---------------- |
| youno.fr    | Youno   | Agence  | startup           | 70–80/100 🔥     |
| stripe.com  | Stripe  | Fintech | grande entreprise | 40/100           |
| notion.so   | Notion  | SaaS    | grande entreprise | 40/100           |
| lemlist.com | lemlist | SaaS    | startup           | 50/100           |
| localhost   | —       | —       | —                 | Erreur propre ✅ |

---

## Déploiement

L'app se déploie automatiquement sur Vercel à chaque push sur `main`.

Pour un nouveau déploiement manuel :

```bash
# 1. Ajouter GROQ_API_KEY dans Vercel Dashboard → Environment Variables
# 2. Rebuild
npm run build
# 3. Push sur main
git push origin main
```

---

## Sécurité

| Point                                | État                    |
| ------------------------------------ | ----------------------- |
| Clé Groq dans Vercel Dashboard       | ✅ jamais dans le code  |
| `.env.local` absent de GitHub        | ✅                      |
| CORS configuré dans `api/analyze.js` | ✅                      |
| Domaines locaux bloqués              | ✅ localhost, 127.0.0.1 |
| Validation + normalisation des URLs  | ✅                      |

---

## Choix techniques

| Choix                 | Raison                                                          |
| --------------------- | --------------------------------------------------------------- |
| Vercel Serverless     | Gratuit, sans carte bancaire, déploiement auto depuis GitHub    |
| Groq / LLaMA 3.1 8B   | Rapide, gratuit en dev, extraction structurée fiable            |
| Clearbit Autocomplete | API publique sans clé pour logo + nom                           |
| CSS natif             | Zéro dépendance, performances maximales, mobile-first           |
| Vitest                | Natif Vite, même config, pas de Jest séparé côté frontend       |
| TDD                   | Contrats définis avant le code — moins de bugs, refactoring sûr |

---

## Problèmes rencontrés

| Problème                                | Solution                                      |
| --------------------------------------- | --------------------------------------------- |
| Firebase exige carte bancaire (Blaze)   | Migration vers Vercel                         |
| Conflit CommonJS / ES Modules           | `api/package.json` avec `{"type":"commonjs"}` |
| `node-fetch` inaccessible depuis `api/` | `npm install node-fetch@2` à la racine        |
| Modèle `llama3-8b-8192` décommissionné  | Remplacement par `llama-3.1-8b-instant`       |
| `youno.fr` score trop bas (30/100)      | Ajout critère stack tech + listes élargies    |

---

## Limites connues

- Certains sites bloquent le scraping (Cloudflare, CAPTCHA) → fiche partielle
- Clearbit couvre principalement les entreprises anglophones connues
- Le score est basé sur des heuristiques, pas sur des données CRM réelles
- Pas d'authentification sur l'endpoint (usage interne assumé)

---

## Améliorations prioritaires en production

- Cache sur les domaines déjà analysés
- Score personnalisable selon le profil client cible de Konsole
- Historique des analyses par utilisateur
- Batch — analyser plusieurs URLs en une fois
- Webhook pour déclencher une analyse depuis un CRM

---

## Auteur

**Claire Naudin** — Développeuse

Projet réalisé dans le cadre du processus de recrutement chez [Youno](https://youno.fr), puis utilisé comme outil métier personnel pour identifier les entreprises les plus pertinentes lors de mes recherches d'emploi.

Merci à l'équipe Youno pour leur autorisation de publication. 🙏

Contact : [christian.lim@youno.fr](mailto:christian.lim@youno.fr)
