# samba.lv – Pre-Launch & SEO Portāls

Mūsdienīga, zibenīgi ātra un SEO optimizēta pirmsatvēršanas lapa Latvijas sludinājumu platformai **samba.lv**.

Paredzēta domēna sildīšanai, atslēgvārdu un kategoriju koka indeksēšanai Google meklētājā un oficiālās informācijas sniegšanai par platformas izstrādes gaitu.

---

## 🚀 Tehnoloģijas un Arhitektūra

- **Tīrs Web Stack:** HTML5, CSS3, JavaScript (Vaniļa) – maksimālam ātrumam un 100/100 Google PageSpeed rādītājiem.
- **Tīkla serveris:** Nginx Alpine Docker konteinerā ar Gzip kompresiju un kešošanu.
- **SEO & Meklētāji:**
  - Strukturētie dati (Schema.org JSON-LD: `WebSite`, `Organization`, `FAQPage`).
  - OpenGraph sociālo tīklu priekšskatījumiem.
  - `sitemap.xml` un `robots.txt`.
  - Google Analytics 4 (GA4) un Google Search Console verifikācijas gatavība.
- **Kategoriju koks:** Transports, Nekustamais īpašums, Darbs, Tehnika, Būvniecība un Bizness ar reāllaika filtra meklēšanu.

---

## 🐳 Palaišana ar Docker (Lokāli fonā)

Projekts ir nokonfigurēts darbam ar Docker fona režīmā (*detached mode*), tāpēc terminālis nav jātur atvērts:

### 1. Palaist konteineru:
```bash
docker compose up -d
```
Lapa ir pieejama: **[http://localhost:3000](http://localhost:3000)**

### 2. Apturēt konteineru:
```bash
docker compose down
```

### 3. Apskatīt žurnālus (logs):
```bash
docker compose logs -f
```

> **Piezīme:** Izmaiņas failos (`index.html`, `styles.css`, `app.js`) atjaunojas pārlūkprogrammā uzreiz bez konteinera pārstartēšanas (*live volume mount*).

---

## 📁 Failu Struktūra

```text
├── index.html            # Galvenā SEO lapa ar kategorijām un informāciju
├── styles.css            # Tīrs, profesionāls biznesa dizains
├── app.js                # Kategoriju filtra meklēšana un FAQ akordeons
├── favicon.svg           # Samba.lv vektora logotips
├── robots.txt            # Meklētājprogrammu robotiem atļaujošais fails
├── sitemap.xml           # Vietnes karte
├── Dockerfile            # Nginx bāzēts Docker attēls
├── docker-compose.yml    # Fona palaišanas konfigurācija (ports 3000)
├── nginx.conf            # Nginx tīkla servera konfigurācija
└── README.md             # Dokumentācija
```

---

## ⚙️ Iestatījumi pirms publicēšanas uz samba.lv

1. **Google Analytics 4 (GA4):**
   Failā `index.html` aizstāj `G-XXXXXXXXXX` ar savu reālo Measurement ID.
2. **Google Search Console:**
   Failā `index.html` aizstāj `IEVIETO_SAVU_SEARCH_CONSOLE_KODU` ar savu meta verifikācijas tagu vai verificē caur DNS TXT ierakstu.
