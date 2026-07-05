# Admin kézikönyv — KÉK-HÍD weboldal

Az admin felület elérhető: **`/admin`**  
(Éles szerveren: `https://www.kekhid.hu/admin`)

---

## Belépés és jelszócsere

1. Nyisd meg az `/admin` oldalt.
2. Add meg az e-mail címedet és jelszavadat.
3. **Első belépés után azonnal változtasd meg a jelszót!**  
   (Jobb felső sarok → profil ikon → „Account")

---

## Az admin felület főbb részei

### Tartalom (bal oldali menü)

| Menüpont | Mit tartalmaz |
|---|---|
| **Főoldal tartalma** | Hero szöveg, értékek, „Miért?", célcsoportok, programok, csatlakozás |
| **Oldalak** | Statikus oldalak (Rólunk, Impresszum, Adatvédelem stb.) |
| **Hírek / Blog** | Hírek, közlemények, esemény-beszámolók |
| **Programok** | Események listája — kiemelt = főoldalon megjelenik |
| **GYIK** | Frequentely asked questions |
| **Vélemények** | Idézetek a főoldalhoz |
| **Dokumentumtár** | Letölthető PDF-ek (beszámolók, alapszabály) |
| **Médiatár** | Feltöltött képek és fájlok |

### Beállítások

| Menüpont | Mit tartalmaz |
|---|---|
| **Arculat** | Logó, favicon, OG kép |
| **Főmenü** | Navigációs menü pontjai és CTA gomb |
| **Lábléc** | Mottó, hasznos linkek |
| **Szervezeti adatok** | Jogi adatok, elérhetőség, közösségi média |

### Beérkezett

| Menüpont | Mit tartalmaz |
|---|---|
| **Űrlapbeküldések** | Kapcsolatfelvételi és csatlakozási jelentkezések |

---

## Hogyan adj hozzá új programot?

1. **Tartalom → Programok → Új program**
2. Töltsd ki: cím, kezdési időpont, helyszín, rövid leírás
3. Kapcsold be a **„Kiemelt a főoldalon"** kapcsolót, ha a főoldalon is meg kell jelennie
4. Kattints: **„Közzétenni"**

---

## Hogyan adj hozzá új hírt?

1. **Tartalom → Hírek / Blog → Új hír**
2. Töltsd ki: cím, borítókép, kategória, tartalom
3. A „Megjelenés dátuma" automatikusan beáll közzétételkor
4. Kattints: **„Közzétenni"**

---

## Logó cseréje

1. **Beállítások → Arculat**
2. Töltsd fel az új logót a **„Logó (világos háttérre)"** mezőbe (fejlécbe)  
   és a **„Logó (sötét háttérre)"** mezőbe (lábléc)
3. Ajánlott formátum: SVG vagy PNG, átlátszó háttérrel
4. Kattints: **„Mentés"**

---

## Szervezeti adatok frissítése

1. **Beállítások → Szervezeti és jogi adatok**
2. Frissítsd a szükséges mezőket (cím, telefon, bankszámlaszám stb.)
3. Kattints: **„Mentés"**

> ⚠️ Az impresszum és az adatvédelmi tájékoztató szövegét (**Tartalom → Oldalak**) is frissítsd, ha ezek változnak.

---

## Menü szerkesztése

1. **Beállítások → Főmenü**
2. Húzással rendezheted át a menüpontokat
3. Új menüpont: **„Menüpontok hozzáadása"**  
   - *Belső oldal*: válassz egy létező oldalt  
   - *Egyéni URL*: írj be bármilyen elérési utat (pl. `/programjaink`)
4. Kattints: **„Mentés"**

---

## Dokumentumok (PDF) feltöltése

1. **Tartalom → Dokumentumtár → Új dokumentum**
2. Töltsd fel a PDF-et, adj meg megnevezést, típust (pl. „Éves beszámoló") és évet
3. Kattints: **„Mentés"**

A feltöltött dokumentumok ezután a `/beszamolok` oldalon jelennek meg listázva.

---

## Beérkezett üzenetek kezelése

1. **Beérkezett → Űrlapbeküldések**
2. A táblázatban látod a beküldések dátumát, nevét, e-mail-ját és típusát
3. Kattints egy sorra a részletek megtekintéséhez
4. Elintézett üzeneteket törölheted (Törlés gomb)

---

## Képek feltöltése

1. **Médiatár → Feltöltés** (vagy bármely upload mezőnél közvetlenül)
2. Ajánlott méretek:
   - Hero / borítókép: min. 1600 × 900 px, JPEG/WebP
   - Kártya kép (program, hír): min. 800 × 600 px
   - Logó: SVG vagy átlátszó PNG
3. A rendszer automatikusan átméretezi és optimalizálja a képeket

---

## Vázlat (Piszkozat) és közzétenni

Minden oldal és tartalom kétállapotú:
- **Piszkozat** — csak bejelentkezve látható (előnézet), nyilvánosan nem
- **Közzétett** — nyilvánosan elérhető

A közzétett oldalak visszaállíthatók piszkozat állapotba szerkesztés közben.

---

## Segítség

Ha elakadtál, küldj e-mailt: **info@kekhid.hu**  
(Vagy a fejlesztőhöz — lásd a projekt README.md fájlját)
