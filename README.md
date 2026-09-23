# samba.lv – Pirmsatvēršanas (Pre-Launch) SEO un Gaidīšanas Rindas Portāls

Mūsdienīga, zibenīgi ātra un SEO optimizēta pirmsatvēršanas lapa Latvijas jaunajam sludinājumu portālam **samba.lv**.

Paredzēta domēna sildīšanai, atslēgvārdu un kategoriju koka tūlītējai indeksēšanai Google meklētājā, kā arī agrīno lietotāju (gaidīšanas rindas) piesaistei pirms pilnās sistēmas palaišanas.

---

## 🚀 Galvenās Iespējas

- ⚡ **Maksimāla veiktspēja:** Tīrs HTML5, CSS3 un vaniļas JavaScript bez smagām bibliotēkām (100/100 PageSpeed rādītājiem).
- 🔍 **SEO arhitektūra:**
  - Pilns Latvijas sludinājumu kategoriju koks (Transports, Nekustamais īpašums, Darbs, Tehnika, Būvniecība u.c.).
  - Strukturētie dati (Schema.org JSON-LD: `WebSite`, `Organization`, `FAQPage`, `BreadcrumbList`).
  - OpenGraph un Twitter Card sociālo tīklu priekšskatījuma metadati.
  - Gatavs `sitemap.xml` un `robots.txt`.
- 👥 **Gaidīšanas rinda (Waitlist):**
  - Interaktīva pieteikšanās forma ar e-pastu saglabāšanu un bonusa piedāvājumu (VIP statuss / bezmaksas sludinājumi).
  - Viegli pieslēdzams pie jebkura backend API, Formspree, Mailchimp, Webhook vai Google Sheets.
- 🎨 **Moderns un atsaucīgs dizains:**
  - Piemērots visiem ekrāniem (Mobile-first, planšetes, datori).
  - Tumšais un gaišais režīms (Dark / Light mode).
  - Dinamiska kategoriju reāllaika meklēšana un filtri.
- 📊 **Analītikas gatavība:**
  - Google Analytics 4 (GA4) gatava vieta ar iebūvētiem konversiju notikumiem (`waitlist_signup`, `category_click`).
  - Google Search Console verifikācijas meta tags.

---

## 📁 Failu Struktūra

```text
├── index.html        # Galvenā lapa ar pilnu SEO saturu, kategorijām un formām
├── styles.css        # Moderns dizains, tumšais/gaišais režīms un animācijas
├── app.js            # Interaktivitāte: meklēšana, waitlist, FAQ akordeons, tēmas maiņa
├── favicon.svg       # Samba.lv vektora logotips / ikona
├── robots.txt        # Meklētājprogrammu robotiem atļaujošais fails
├── sitemap.xml       # Vietnes karte ar visām sadaļām un prioritātēm
└── README.md         # Šis dokumentācijas fails
```

---

## ⚙️ Kā iestatīt savus datus

### 1. Google Analytics 4 (GA4)
Failā `index.html` atrodi rindiņu:
```html
<!-- Ievieto savu GA4 mērījumu ID šeit (piemēram: G-XXXXXXXXXX) -->
```
Aizstāj `G-XXXXXXXXXX` ar savu reālo Google Analytics ID.

### 2. Google Search Console
Failā `index.html` atrodi:
```html
<meta name="google-site-verification" content="IEVIETO_SAVU_SEARCH_CONSOLE_KODU" />
```
Aizstāj ar Search Console sniegto HTML tagu vai verificē domēnu caur DNS TXT ierakstu (ieteicams).

### 3. Gaidīšanas rindas pieteikumu saņemšana
Failā `app.js` funkcijā `handleWaitlistSubmit` pieteikumi tiek saglabāti pārlūkprogrammas `localStorage` un konsolē. Lai tos nosūtītu uz savu e-pastu vai datubāzi:
- Izmanto [Formspree](https://formspree.io), [Make.com](https://make.com), Zapier webhook vai savu API galapunktu (endpoint).

---

## 🌐 Publicēšana (Deployment)

Lapu var izvietot jebkurā hostingā:
- **GitHub Pages:** Ieslēdz `Settings` -> `Pages` -> `main` branch.
- **Cloudflare Pages / Vercel / Netlify:** Vienkārši importē šo repozitoriju — izvietošana notiks automātiski 30 sekundēs.
- **Klasiskais hostings (Apache / Nginx / cPanel):** Iekopē visus failus `public_html` vai `www` mapē.

---

Izstrādāts **samba.lv** izaugsmei!
