# Ditch Quiz

Quiz de personnalité créé pour l'événement **Ditch Cannes 2026**. À la fin du quiz, le participant se voit attribuer une carte de pouvoir (Yokai, Okami, Geisha, Samouraï Noir…) et peut laisser ses coordonnées pour un tirage au sort.

---

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19** + **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com)** pour le style
- **[Supabase](https://supabase.com)** (PostgreSQL) pour stocker les participations
- **[Vercel](https://vercel.com)** pour l'hébergement

---

## Prise en main locale

### 1. Cloner et installer

```bash
git clone https://github.com/jimbebe/ditch-quiz.git
cd ditch-quiz
npm install
```

### 2. Créer un projet Supabase

1. Crée un compte gratuit sur [supabase.com](https://supabase.com) et un nouveau projet.
2. Dans **SQL Editor**, exécute le contenu de [`supabase/migration.sql`](supabase/migration.sql) pour créer la table `entries`.
3. Récupère les identifiants dans **Project Settings → API** :
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key (⚠️ secrète, jamais côté client) → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurer les variables d'environnement

Copie `.env.example` en `.env.local` et remplis-le :

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_xxxxxxxxxxxx
ADMIN_PASSWORD=un-mot-de-passe-de-ton-choix
```

`ADMIN_PASSWORD` protège la page `/admin` (consultation et export des participations).

### 4. Lancer le serveur de dev

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

L'admin est accessible sur [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Déploiement (Vercel)

1. Crée un compte sur [vercel.com](https://vercel.com) et clique **Add New → Project**.
2. Importe le repo GitHub `ditch-quiz`.
3. Dans **Environment Variables**, ajoute les 3 variables ci-dessus (avec **tes** valeurs Supabase).
4. Clique **Deploy**. Vercel rebuild et déploie automatiquement à chaque `git push`.

> ⚠️ **Pause Supabase** : sur le plan gratuit, un projet inactif >1 semaine est mis en pause. Les requêtes échouent jusqu'à réactivation manuelle depuis le dashboard Supabase. Pendant ce temps, **les participations ne sont pas sauvegardées** (l'utilisateur voit un message d'erreur).

---

## Structure du projet

```
src/
├── app/
│   ├── page.tsx              # page d'accueil (rendu du quiz)
│   ├── admin/page.tsx        # interface admin (login + dashboard)
│   └── api/
│       ├── entries/          # POST: enregistrer une participation
│       │                     # GET:  lister (admin only)
│       ├── entries/export/   # export CSV (admin only)
│       ├── draw/             # tirage au sort (admin only)
│       └── stats/            # stats par carte (admin only)
├── components/
│   ├── WelcomeScreen.tsx     # écran d'accueil
│   ├── QuizScreen.tsx        # questions du quiz
│   ├── ResultScreen.tsx      # affichage de la carte gagnée
│   ├── EmailScreen.tsx       # formulaire nom + email
│   ├── AdminLogin.tsx        # login admin (mot de passe)
│   └── AdminDashboard.tsx    # liste / stats / export / tirage
├── hooks/
│   └── useQuiz.ts            # state machine du quiz (useReducer)
├── lib/
│   ├── quiz-data.ts          # questions et réponses
│   ├── quiz-logic.ts         # calcul des scores et carte gagnante
│   └── supabase-server.ts    # client Supabase (server-side uniquement)
└── types/
    └── index.ts              # types TypeScript

supabase/
└── migration.sql             # schéma de la table `entries`
```

### Modifier les questions

Les questions et les cartes sont dans [`src/lib/quiz-data.ts`](src/lib/quiz-data.ts). Chaque réponse incrémente le score d'une ou plusieurs cartes. La carte avec le score le plus élevé à la fin est attribuée au participant ([`src/lib/quiz-logic.ts`](src/lib/quiz-logic.ts)).

### Schéma BDD

Une seule table `entries` :

| colonne | type | description |
|---|---|---|
| `id` | UUID | clé primaire |
| `name` | TEXT | prénom du participant |
| `email` | TEXT | email (unique) |
| `card_key` | TEXT | identifiant technique de la carte |
| `card_name` | TEXT | nom affichable de la carte |
| `scores` | JSONB | scores détaillés par carte |
| `created_at` | TIMESTAMPTZ | date de participation |

Row Level Security est activée **sans policy** : l'accès se fait exclusivement via la `service_role` key côté serveur (les routes API).

---

## Scripts

| commande | effet |
|---|---|
| `npm run dev` | dev server local sur le port 3000 |
| `npm run build` | build de production |
| `npm run start` | lance le build de prod en local |
| `npm run lint` | ESLint |

---

## Branches

- `master` — branche active, déployée sur Vercel.
- `main` — initial commit vide (créé par `create-next-app`, peut être supprimée).
