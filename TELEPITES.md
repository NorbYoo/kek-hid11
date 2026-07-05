# Telepítési útmutató — Éles szerver

## 1. Előfeltételek

- Node.js 20+
- PostgreSQL 14+ (pl. Neon, Supabase, Railway, saját szerver)
- Domain + SSL (Let's Encrypt Certbot vagy Cloudflare)

---

## 2. Szerver előkészítése (Ubuntu/Debian példa)

```bash
# Node.js 20 telepítése (nvm segítségével)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20 && nvm use 20

# PM2 (folyamatkezelő)
npm install -g pm2
```

---

## 3. Kód feltöltése

```bash
git clone <repo-url> /var/www/kekhid
cd /var/www/kekhid
npm install --production=false
```

---

## 4. Környezeti változók (.env)

Hozd létre a `/var/www/kekhid/.env` fájlt:

```env
# Payload titkos kulcs — MIN. 32 véletlenszerű karakter
PAYLOAD_SECRET=<node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">

# PostgreSQL kapcsolati string
DATABASE_URI=postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require

# Az oldal nyilvános URL-je (HTTPS!)
NEXT_PUBLIC_SERVER_URL=https://www.kekhid.hu

# Feltöltött fájlok elérési útja (ha helyi tárolást használsz)
PAYLOAD_PUBLIC_UPLOAD_PATH=/var/www/kekhid/public/uploads

# (Opcionális) E-mail küldés — pl. Resend, SendGrid
# SMTP_HOST=smtp.resend.com
# SMTP_PORT=465
# SMTP_USER=resend
# SMTP_PASS=<api-key>
# EMAIL_FROM=noreply@kekhid.hu
```

> ⚠️ A `.env` fájlt soha ne add Git alá!

---

## 5. SQLite → PostgreSQL váltás

A `src/payload.config.ts` fájlban cseréld ki az adaptert:

```bash
npm install @payloadcms/db-postgres
```

```typescript
// src/payload.config.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

// ...
db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URI },
}),
```

---

## 6. Build és indítás

```bash
npm run build
npm run seed  # csak egyszer, az első indítás előtt

# PM2-vel (ajánlott)
pm2 start npm --name "kekhid" -- start
pm2 save
pm2 startup
```

---

## 7. Nginx konfiguráció (példa)

```nginx
server {
    server_name kekhid.hu www.kekhid.hu;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Feltöltött fájlok közvetlen kiszolgálása
    location /uploads {
        alias /var/www/kekhid/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/kekhid.hu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/kekhid.hu/privkey.pem;
}

server {
    listen 80;
    server_name kekhid.hu www.kekhid.hu;
    return 301 https://$host$request_uri;
}
```

---

## 8. Frissítés (update)

```bash
cd /var/www/kekhid
git pull
npm install
npm run build
pm2 restart kekhid
```

---

## 9. Biztonsági mentés

```bash
# PostgreSQL napi dump (crontab -e):
0 3 * * * pg_dump $DATABASE_URL | gzip > /backups/kekhid_$(date +\%Y\%m\%d).sql.gz

# Feltöltött médiafájlok
rsync -av /var/www/kekhid/public/uploads/ /backups/uploads/
```
