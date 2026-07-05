/**
 * KÉK-HÍD — kezdő tartalom (seed).
 * Futtatás:  npm run seed
 * Létrehozza az első admin felhasználót, és feltölti a magyar kezdő tartalmat.
 * Újrafuttatható (idempotens): a meglévő elemeket nem duplikálja.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

const lex = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      textFormat: 0,
      children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    })),
  },
})

async function ensurePage(payload: any, slug: string, title: string, paragraphs: string[], subtitle?: string) {
  const ex = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
  if (ex.totalDocs > 0) {
    console.log(`• Oldal már létezik: /${slug}`)
    return
  }
  await payload.create({
    collection: 'pages',
    data: { title, slug, subtitle, content: lex(paragraphs), _status: 'published' } as any,
  })
  console.log(`✓ Oldal létrehozva: /${slug}`)
}

async function run() {
  const payload = await getPayload({ config })

  // 1) ELSŐ ADMIN FELHASZNÁLÓ
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@kekhid.hu'
    const password = process.env.SEED_ADMIN_PASSWORD || 'KekHid!2026'
    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Adminisztrátor', role: 'admin' } as any,
    })
    console.log('=============================================')
    console.log('  ✓ ADMIN LÉTREHOZVA — jelentkezz be: /admin')
    console.log(`     E-mail:  ${email}`)
    console.log(`     Jelszó:  ${password}`)
    console.log('  (Belépés után FELTÉTLENÜL változtasd meg!)')
    console.log('=============================================')
  } else {
    console.log('• Már van felhasználó — admin létrehozása kihagyva.')
  }

  // 2) ARCULAT
  await payload.updateGlobal({ slug: 'brand', data: { siteName: 'KÉK-HÍD', siteSubtitle: 'Egyesület' } as any })

  // 3) SZERVEZETI ADATOK (a [KITÖLTENDŐ] részeket a megrendelő pótolja)
  await payload.updateGlobal({
    slug: 'organization',
    data: {
      officialName: 'KÉK-HÍD Egyesület',
      shortName: 'KÉK-HÍD',
      legalForm: 'egyesulet',
      representative: '[KITÖLTENDŐ] Képviselő neve',
      seat: '[KITÖLTENDŐ] 1111 Budapest, Példa utca 1.',
      postalAddress: '[KITÖLTENDŐ] 1111 Budapest, Példa utca 1.',
      email: 'info@kekhid.hu',
      phone: '[KITÖLTENDŐ] +36 1 234 5678',
      taxNumber: '[KITÖLTENDŐ] 12345678-1-11',
      registrationNumber: '[KITÖLTENDŐ] 01-02-0001234',
      szja1Number: '[KITÖLTENDŐ] 12345678-1-11',
      bankAccount: '[KITÖLTENDŐ] 12345678-12345678-12345678',
      hostingProvider: '[KITÖLTENDŐ] Tárhelyszolgáltató neve és elérhetősége',
      facebookUrl: 'https://facebook.com',
    } as any,
  })

  // 4) FŐOLDAL TARTALMA
  await payload.updateGlobal({
    slug: 'home',
    data: {
      heroTitle: 'KÉK-HÍD',
      heroSubtitle: 'Egyesület',
      heroLead: 'Hidat építünk az emberek között, hogy mindenki otthonra találhasson.',
      heroIntro:
        'Azért dolgozunk, hogy az autista, a Fragilis X szindrómával élő és más neurodivergens emberek, valamint családjaik valódi közösségre, támogatásra és elfogadásra találjanak.',
      heroPrimaryLabel: 'Csatlakozom',
      heroPrimaryUrl: '/csatlakozas',
      heroSecondaryLabel: 'Ismerj meg minket',
      heroSecondaryUrl: '/rolunk',
      values: [
        { icon: 'users', title: 'KÖZÖSSÉG', text: 'Senki ne maradjon egyedül.' },
        { icon: 'book', title: 'TUDÁS', text: 'A megértés biztonságot ad.' },
        { icon: 'hand-heart', title: 'TÁMOGATÁS', text: 'Egymást segítve könnyebb.' },
        { icon: 'sprout', title: 'ELFOGADÁS', text: 'Nem ítélkezünk, elfogadással fordulunk egymáshoz.' },
      ],
      whyHeading: 'Miért jött létre a KÉK-HÍD?',
      whyParagraphs: [
        { text: 'A KÉK-HÍD szülők, hozzátartozók és szakemberek összefogásából született, mert hittük: a megértés és az elfogadás közösen építhető.' },
        { text: 'Azért hoztuk létre, mert sok család magára maradt a mindennapi nehézségekkel, és úgy éreztük, ezen együtt változtatnunk kell.' },
        { text: 'Hiszünk abban, hogy a megértés, az elfogadás és a közösség mindenki életét jobbá teszi.' },
      ],
      whyCtaLabel: 'Történetünk',
      whyCtaUrl: '/rolunk',
      audiencesHeading: 'Kiknek szólunk?',
      audiences: [
        { icon: 'user', title: 'Autista személyek' },
        { icon: 'ribbon', title: 'Fragilis X szindrómával élők' },
        { icon: 'brain', title: 'Más neurodivergens személyek' },
        { icon: 'users', title: 'Családtagok és segítők' },
      ],
      programsHeading: 'Közelgő programjaink',
      programsCtaLabel: 'További programok',
      programsCtaUrl: '/programjaink',
      joinHeading: 'Csatlakozz hozzánk!',
      joinWays: [
        { icon: 'users', title: 'Tagként', text: 'Csatlakozz hozzánk, és építsük együtt a hidat!' },
        { icon: 'heart', title: 'Önkéntesként', text: 'Segíts a programjaink megvalósításában!' },
        { icon: 'helping-hand', title: 'Támogatóként', text: 'Támogasd céljaink elérését — befektetés a közös jövőnkbe.' },
      ],
      joinCtaLabel: 'Csatlakozom',
      joinCtaUrl: '/csatlakozas',
    } as any,
  })

  // 5) FŐMENÜ
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      items: [
        { label: 'Főoldal', type: 'custom', url: '/' },
        { label: 'Rólunk', type: 'custom', url: '/rolunk' },
        { label: 'Programjaink', type: 'custom', url: '/programjaink' },
        { label: 'Tudástár', type: 'custom', url: '/tudastar' },
        { label: 'Közösség', type: 'custom', url: '/kozosseg' },
        { label: 'Hírek', type: 'custom', url: '/hirek' },
        { label: 'Kapcsolat', type: 'custom', url: '/kapcsolat' },
      ],
      cta: { label: 'Csatlakozom', url: '/csatlakozas', show: true },
    } as any,
  })

  // 6) LÁBLÉC
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: 'Hidat építünk az emberek között, hogy mindenki otthonra találhasson.',
      usefulLinks: [
        { label: 'Adatvédelmi tájékoztató', url: '/adatvedelem' },
        { label: 'Csatlakozási feltételek', url: '/csatlakozasi-feltetelek' },
        { label: 'Beszámolók', url: '/beszamolok' },
        { label: 'Impresszum', url: '/impresszum' },
      ],
    } as any,
  })

  // 7) PROGRAMOK
  const programs = [
    { title: 'Szülőklub', startDate: '2026-07-13T17:00:00.000Z', summary: 'Kötetlen beszélgetés és tapasztalatcsere szülőknek.' },
    { title: 'Családi Nap', startDate: '2026-07-12T10:00:00.000Z', summary: 'Közös élmények, játék és kapcsolódás az egész családnak.' },
    { title: 'Szakmai Előadás', startDate: '2026-07-03T18:00:00.000Z', summary: 'Szakértői előadás a neurodivergenciáról, kérdés-válasz résszel.' },
    { title: 'Érzékenyítő program', startDate: '2026-07-20T16:00:00.000Z', summary: 'Élményalapú program az elfogadás és a megértés jegyében.' },
  ]
  for (const p of programs) {
    const ex = await payload.find({ collection: 'programs', where: { title: { equals: p.title } }, limit: 1 })
    if (ex.totalDocs === 0) {
      await payload.create({
        collection: 'programs',
        data: { ...p, location: 'Budapest', featured: true, _status: 'published' } as any,
      })
      console.log(`✓ Program: ${p.title}`)
    }
  }

  // 8) VÉLEMÉNYEK
  const testimonials = [
    { quote: 'A közösség segített újra reményt találni. Itt végre megértettek minket.', author: 'Egy édesanya', featured: true },
    { quote: 'Végre olyan emberek között lehetünk, akik értik, amin nap mint nap keresztülmegyünk.', author: 'Egy édesapa', featured: true },
  ]
  for (const t of testimonials) {
    const ex = await payload.find({ collection: 'testimonials', where: { quote: { equals: t.quote } }, limit: 1 })
    if (ex.totalDocs === 0) {
      await payload.create({ collection: 'testimonials', data: t as any })
      console.log(`✓ Vélemény: ${t.author}`)
    }
  }

  // 9) HÍREK
  const posts = [
    { title: 'Elindult a KÉK-HÍD Egyesület új honlapja', category: 'kozlemeny', excerpt: 'Megújult, modern és akadálymentes felülettel várjuk a látogatókat.', body: ['Örömmel jelentjük be, hogy elindult az Egyesület új honlapja.', 'Az oldalon megtalálod programjainkat, híreinket és a csatlakozás lehetőségeit.'] },
    { title: 'Csatlakozz önkénteseink csapatához!', category: 'hir', excerpt: 'Keresünk lelkes önkénteseket programjaink támogatásához.', body: ['Az önkénteseink nélkül nem tudnánk megvalósítani céljainkat.', 'Ha szeretnél részt venni, vedd fel velünk a kapcsolatot!'] },
    { title: 'Visszatekintő: tavaszi Családi Nap', category: 'beszamolo', excerpt: 'Csodálatos napot töltöttünk együtt a családokkal.', body: ['Köszönjük mindenkinek, aki eljött a tavaszi Családi Napra.', 'Hamarosan újra találkozunk!'] },
  ]
  for (const post of posts) {
    const ex = await payload.find({ collection: 'posts', where: { title: { equals: post.title } }, limit: 1 })
    if (ex.totalDocs === 0) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          category: post.category,
          excerpt: post.excerpt,
          content: lex(post.body),
          publishedAt: new Date().toISOString(),
          _status: 'published',
        } as any,
      })
      console.log(`✓ Hír: ${post.title}`)
    }
  }

  // 10) OLDALAK
  await ensurePage(payload, 'rolunk', 'Rólunk', [
    'A KÉK-HÍD Egyesület célja, hogy közösséget, tudást, támogatást és elfogadást nyújtson a neurodivergens emberek és családjaik számára.',
    'Hiszünk abban, hogy a megértésen és az elfogadáson alapuló közösség mindenki életét jobbá teszi.',
    '[KITÖLTENDŐ] Itt mutathatjátok be részletesen a szervezet történetét, küldetését, csapatát és céljait.',
  ], 'Küldetésünk és történetünk')

  await ensurePage(payload, 'tudastar', 'Tudástár', [
    'Hasznos információk, útmutatók és anyagok a neurodivergencia témakörében.',
    '[KITÖLTENDŐ] Töltsétek fel a cikkeket és letölthető anyagokat.',
  ], 'Cikkek, útmutatók, gyakori kérdések')

  await ensurePage(payload, 'kozosseg', 'Közösség', [
    'Történetek, élménybeszámolók és bemutatkozás a KÉK-HÍD közösségéből.',
    '[KITÖLTENDŐ] Itt oszthattok meg közösségi élményeket és partnereket.',
  ], 'Együtt erősebbek vagyunk')

  await ensurePage(payload, 'csatlakozas', 'Csatlakozás', [
    'Csatlakozz hozzánk tagként, önkéntesként vagy támogatóként!',
    'Tagként: rendszeres programjainkon veszel részt és alakítod a közösséget.',
    'Önkéntesként: segítesz a programok megszervezésében és lebonyolításában.',
    'Támogatóként: anyagi hozzájárulásoddal segíted céljaink megvalósulását.',
    '[KITÖLTENDŐ] Add meg a tagdíjat, a jelentkezés menetét és az adományozási adatokat.',
  ], 'Légy a híd része')

  await ensurePage(payload, 'kapcsolat', 'Kapcsolat', [
    'Írj nekünk bizalommal! Az elérhetőségeinket a láblécben is megtalálod.',
    'E-mail: info@kekhid.hu',
    '[KITÖLTENDŐ] Cím, telefonszám, nyitvatartás és térkép.',
  ], 'Vedd fel velünk a kapcsolatot')

  await ensurePage(payload, 'impresszum', 'Impresszum', [
    'Üzemeltető: KÉK-HÍD Egyesület',
    'Székhely: [KITÖLTENDŐ]',
    'Képviselő: [KITÖLTENDŐ]',
    'Adószám: [KITÖLTENDŐ]',
    'Nyilvántartási szám: [KITÖLTENDŐ]',
    'E-mail: info@kekhid.hu · Telefon: [KITÖLTENDŐ]',
    'Tárhelyszolgáltató: [KITÖLTENDŐ] (név és elérhetőség)',
    'Jogi háttér: a 2001. évi CVIII. törvény (Ekertv.) szerinti kötelező adatok.',
  ], 'A weboldal üzemeltetőjének adatai')

  await ensurePage(payload, 'adatvedelem', 'Adatvédelmi tájékoztató', [
    'Az Egyesület tiszteletben tartja a látogatók személyes adatait, és azokat az EU 2016/679 (GDPR) rendelet és a 2011. évi CXII. törvény (Infotv.) szerint kezeli.',
    'Adatkezelő: KÉK-HÍD Egyesület — [KITÖLTENDŐ] elérhetőségek.',
    'Kezelt adatok és célok: kapcsolatfelvétel, csatlakozás és hírlevél során megadott adatok, az adott cél teljesítéséhez.',
    'Adatfeldolgozók: tárhelyszolgáltató, e-mail szolgáltató, esetleges analitika — [KITÖLTENDŐ].',
    'Érintetti jogok: tájékoztatás, helyesbítés, törlés, korlátozás, tiltakozás; panasz a NAIH-nál.',
    '[KITÖLTENDŐ] A végleges szöveget a szervezet adatvédelmi felelőse hagyja jóvá.',
  ], 'Hogyan kezeljük az adataidat')

  await ensurePage(payload, 'csatlakozasi-feltetelek', 'Csatlakozási feltételek', [
    'Az egyesületi tagság feltételeit és a tagok jogait, kötelezettségeit az Alapszabály rögzíti.',
    '[KITÖLTENDŐ] Tagdíj összege, a jelentkezés menete, a tagság megszűnésének esetei.',
  ], 'Tagság, jogok és kötelezettségek')

  await ensurePage(payload, 'beszamolok', 'Beszámolók és közhasznúsági jelentés', [
    'A civil szervezetek a 2011. évi CLXXV. törvény (Civil tv.) 30. §-a alapján kötelesek éves beszámolójukat (közhasznú szervezet esetén a közhasznúsági mellékletet is) a honlapjukon közzétenni, a tárgyévet követő május 31-ig.',
    '[KITÖLTENDŐ] Ide töltsétek fel évente a beszámolókat (a „Dokumentumtár”-ból), és itt jelenjenek meg letölthető PDF-ként.',
  ], 'Átláthatóság és nyilvánosság')

  console.log('\n✓ A kezdő tartalom feltöltése kész.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed hiba:', err)
  process.exit(1)
})
