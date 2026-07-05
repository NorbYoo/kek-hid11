import type { GlobalConfig } from 'payload'

import { anyone, isLoggedIn } from '../access'

const iconOptions = [
  { label: 'Közösség (emberek)', value: 'users' },
  { label: 'Tudás (könyv)', value: 'book' },
  { label: 'Támogatás (kéz + szív)', value: 'hand-heart' },
  { label: 'Elfogadás (növény)', value: 'sprout' },
  { label: 'Agy (neurodivergencia)', value: 'brain' },
  { label: 'Szalag', value: 'ribbon' },
  { label: 'Személy', value: 'user' },
  { label: 'Szív', value: 'heart' },
  { label: 'Segítő kéz', value: 'helping-hand' },
  { label: 'Csillag', value: 'star' },
]

export const HomeContent: GlobalConfig = {
  slug: 'home',
  label: 'Főoldal tartalma',
  admin: {
    group: 'Tartalom',
    description: 'A főoldal összes szövege, gombja és képe itt szerkeszthető.',
  },
  access: {
    read: anyone,
    update: isLoggedIn,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero (fejrész)',
          fields: [
            { name: 'heroTitle', label: 'Cím', type: 'text', defaultValue: 'KÉK-HÍD' },
            { name: 'heroSubtitle', label: 'Alcím', type: 'text', defaultValue: 'Egyesület' },
            {
              name: 'heroLead',
              label: 'Vezérmondat',
              type: 'textarea',
              defaultValue: 'Hidat építünk az emberek között, hogy mindenki otthonra találhasson.',
            },
            {
              name: 'heroIntro',
              label: 'Bevezető szöveg',
              type: 'textarea',
              defaultValue:
                'Azért dolgozunk, hogy az autista, a Fragilis X szindrómával élő és más neurodivergens emberek, valamint családjaik valódi közösségre, támogatásra és elfogadásra találjanak.',
            },
            { name: 'heroImage', label: 'Háttérkép (híd)', type: 'upload', relationTo: 'media' },
            { name: 'heroPrimaryLabel', label: 'Elsődleges gomb felirata', type: 'text', defaultValue: 'Csatlakozom' },
            { name: 'heroPrimaryUrl', label: 'Elsődleges gomb URL', type: 'text', defaultValue: '/csatlakozas' },
            { name: 'heroSecondaryLabel', label: 'Másodlagos gomb felirata', type: 'text', defaultValue: 'Ismerj meg minket' },
            { name: 'heroSecondaryUrl', label: 'Másodlagos gomb URL', type: 'text', defaultValue: '/rolunk' },
          ],
        },
        {
          label: 'Értékek',
          fields: [
            {
              name: 'values',
              label: 'Értékek (4 ajánlott)',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'icon', label: 'Ikon', type: 'select', options: iconOptions, defaultValue: 'users' },
                { name: 'title', label: 'Cím', type: 'text', required: true },
                { name: 'text', label: 'Szöveg', type: 'text' },
              ],
              defaultValue: [
                { icon: 'users', title: 'KÖZÖSSÉG', text: 'Senki ne maradjon egyedül.' },
                { icon: 'book', title: 'TUDÁS', text: 'A megértés biztonságot ad.' },
                { icon: 'hand-heart', title: 'TÁMOGATÁS', text: 'Egymást segítve könnyebb.' },
                { icon: 'sprout', title: 'ELFOGADÁS', text: 'Nem ítélkezünk, elfogadással fordulunk egymáshoz.' },
              ],
            },
          ],
        },
        {
          label: 'Miért jött létre',
          fields: [
            { name: 'whyHeading', label: 'Cím', type: 'text', defaultValue: 'Miért jött létre a KÉK-HÍD?' },
            {
              name: 'whyParagraphs',
              label: 'Bekezdések',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [{ name: 'text', label: 'Bekezdés', type: 'textarea', required: true }],
              defaultValue: [
                { text: 'A KÉK-HÍD szülők, hozzátartozók és szakemberek összefogásából született, mert hittük: a megértés és az elfogadás közösen építhető.' },
                { text: 'Azért hoztuk létre, mert sok család magára maradt a mindennapi nehézségekkel, és úgy éreztük, ezen együtt változtatnunk kell.' },
                { text: 'Hiszünk abban, hogy a megértés, az elfogadás és a közösség mindenki életét jobbá teszi.' },
              ],
            },
            { name: 'whyImage', label: 'Kép', type: 'upload', relationTo: 'media' },
            { name: 'whyCtaLabel', label: 'Gomb felirata', type: 'text', defaultValue: 'Történetünk' },
            { name: 'whyCtaUrl', label: 'Gomb URL', type: 'text', defaultValue: '/rolunk' },
          ],
        },
        {
          label: 'Kiknek szólunk',
          fields: [
            { name: 'audiencesHeading', label: 'Cím', type: 'text', defaultValue: 'Kiknek szólunk?' },
            {
              name: 'audiences',
              label: 'Célcsoportok',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'icon', label: 'Ikon', type: 'select', options: iconOptions, defaultValue: 'user' },
                { name: 'title', label: 'Megnevezés', type: 'text', required: true },
              ],
              defaultValue: [
                { icon: 'user', title: 'Autista személyek' },
                { icon: 'ribbon', title: 'Fragilis X szindrómával élők' },
                { icon: 'brain', title: 'Más neurodivergens személyek' },
                { icon: 'users', title: 'Családtagok és segítők' },
              ],
            },
          ],
        },
        {
          label: 'Programok',
          fields: [
            { name: 'programsHeading', label: 'Cím', type: 'text', defaultValue: 'Közelgő programjaink' },
            { name: 'programsCtaLabel', label: 'Gomb felirata', type: 'text', defaultValue: 'További programok' },
            { name: 'programsCtaUrl', label: 'Gomb URL', type: 'text', defaultValue: '/programjaink' },
          ],
        },
        {
          label: 'Vélemények',
          fields: [
            { name: 'testimonialsImage', label: 'Kép (szív-kezek)', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Csatlakozz hozzánk',
          fields: [
            { name: 'joinHeading', label: 'Cím', type: 'text', defaultValue: 'Csatlakozz hozzánk!' },
            {
              name: 'joinWays',
              label: 'Csatlakozási módok',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'icon', label: 'Ikon', type: 'select', options: iconOptions, defaultValue: 'users' },
                { name: 'title', label: 'Cím', type: 'text', required: true },
                { name: 'text', label: 'Szöveg', type: 'textarea' },
              ],
              defaultValue: [
                { icon: 'users', title: 'Tagként', text: 'Csatlakozz hozzánk, és építsük együtt a hidat!' },
                { icon: 'heart', title: 'Önkéntesként', text: 'Segíts a programjaink megvalósításában!' },
                { icon: 'helping-hand', title: 'Támogatóként', text: 'Támogasd céljaink elérését — befektetés a közös jövőnkbe.' },
              ],
            },
            { name: 'joinCtaLabel', label: 'Gomb felirata', type: 'text', defaultValue: 'Csatlakozom' },
            { name: 'joinCtaUrl', label: 'Gomb URL', type: 'text', defaultValue: '/csatlakozas' },
            { name: 'joinImage', label: 'Kép (kék szívet tartó kezek)', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
