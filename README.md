# KÉK-HÍD Egyesület — Weboldal

Modern, CMS-vezérelt weboldal a KÉK-HÍD Egyesület számára.  
**Stack:** Next.js 16 (App Router) + Payload CMS 3 + SQLite (fejlesztés) / PostgreSQL (éles)

---

## Gyors indítás (fejlesztői)

```bash
# 1. Függőségek telepítése
npm install

# 2. Környezeti változók másolása
cp .env.example .env
# Szerkeszd a .env fájlt (PAYLOAD_SECRET legenerálható: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# 3. Kezdő tartalom betöltése (első alkalommal)
npm run seed

# 4. Fejlesztői szerver indítása
npm run dev
# → http://localhost:3000       (weboldal)
# → http://localhost:3000/admin (CMS admin)
```

**Első admin belépési adatok (seed után):**
- E-mail: `admin@kekhid.hu`
- Jelszó: `KekHid!2026` — **belépés után azonnal változtasd meg!**

---

## Szkriptek

| Parancs | Leírás |
|---|---|
| `npm run dev` | Fejlesztői szerver (Turbopack) |
| `npm run build` | Éles build |
| `npm run start` | Éles szerver indítása |
| `npm run seed` | Kezdő tartalom betöltése |
| `npm run generate:types` | Payload TypeScript típusok regenerálása |
| `npm run generate:importmap` | Admin import-map regenerálása |

---

## Könyvtárszerkezet

```
src/
├── access/          Payload hozzáférési szabályok
├── app/
│   ├── (frontend)/  Nyilvános weboldalak (Next.js App Router)
│   ├── (payload)/   Payload admin + API route-ok
│   └── actions/     Server Actions (form-beküldés)
├── collections/     Payload kollekciók (oldalak, hírek, programok…)
├── components/      React komponensek
│   ├── home/        Főoldal szekciók
│   └── forms/       Kapcsolat / Csatlakozás formok
├── fields/          Újrahasználható Payload mezők
├── globals/         Payload globalok (főmenü, lábléc, főoldal…)
├── lib/             Segédprogramok (Payload API, utils)
└── seed/            Kezdő tartalom script
```

---

## Éles üzembe helyezés

Részletes leírás: **[TELEPITES.md](./TELEPITES.md)**

Röviden:
1. PostgreSQL adatbázis létrehozása (Neon, Supabase, Railway stb.)
2. `.env` feltöltése az éles értékekkel
3. `npm run build && npm run start`
4. Reverse proxy (Nginx/Caddy) + SSL beállítása

---

## Jogi oldalak (FONTOS)

A következő oldalak tartalmát a szervezet adatvédelmi felelőse kell hogy jóváhagyja, mielőtt az oldal élesbe megy:

- `/adatvedelem` — Adatvédelmi tájékoztató (GDPR)
- `/impresszum` — Impresszum (Ekertv.)
- `/csatlakozasi-feltetelek` — Tagság feltételei
- `/beszamolok` — Éves beszámolók (Civil tv. 30. §)

Ezek szerkeszthetők az adminban: **Tartalom → Oldalak**.
