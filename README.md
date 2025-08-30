# Rozlučka pro kluky – multi‑page aplikace

Tento repozitář obsahuje více‑stránkovou webovou aplikaci pro **rozlučku se svobodou** pro kluky.  
Aplikace vychází z dívčí verze, ale používá tmavé barvy, jiné úkoly a hlášky, a pracuje se stejným principem bodovaného žebříčku.  
Každý účastník má vlastní stránku s úkoly a sdílený živý žebříček.

## Struktura projektu

| Soubor/Složka       | Účel |
|---------------------|------|
| **index.html**      | Úvodní stránka se seznamem účastníků. Každá karta vede na osobní stránku hráče. |
| **tom.html** … **marty.html** | Osobní stránky hráčů (Tom, Míra, Martin, Lukáš, Vláďa, Marty). Načítají úkoly a zobrazují žebříček. |
| **style.css**       | Sdílené styly (tmavá paleta, červené akcenty, vzhled karet, avatarů atd.). |
| **app.js**          | Logika aplikace: načítá úkoly a hlášky z JSON, inicializuje Firebase Realtime Database a aktualizuje skóre. |
| **tasks.json**      | Seznam úkolů s bodovým ohodnocením a volitelným podúkolem. |
| **messages.json**   | Povzbuzující hlášky, které se náhodně zobrazují po splnění úkolu. |
| **Obrázky účastníků** | Avatar obrázky hráčů jsou uloženy v kořenovém adresáři repozitáře a jejich názvy odpovídají klíčům v `app.js` (např. `Tom.png`, `mira-photo.png`, `Martin.png`, `Lukas.png`, `Vlada.png`, `Marty.png`). |

## Lokální spuštění

1. Zkontrolujte, že v kořenovém adresáři repozitáře se nacházejí avatar obrázky všech účastníků (`Tom.png`, `mira-photo.png`, `Martin.png`, `Lukas.png`, `Vlada.png`, `Marty.png`). Pokud obrázky nemáte, můžete použít zástupné obrázky nebo je nahradit později.
2. Otevřete soubor `index.html` v moderním webovém prohlížeči.  
3. Kliknutím na kartu hráče přejdete na jeho stránku. Úkoly a žebříček budou funkční i bez Firebase – body se však nebudou ukládat mezi relacemi.

## Nasazení na GitHub Pages

1. Vytvořte repozitář na GitHubu (např. `rozlucka-kluci-app`).  
2. Nahrajte všechny soubory a složky: `index.html`, `*.html` stránky hráčů, `style.css`, `app.js`, `tasks.json`, `messages.json` a složku `avatars/` s obrázky.  
3. V nastavení repozitáře (Settings → Pages) vyberte **Deploy from a branch**, zvolte větev `main` a složku `/` (root).  
4. Po uložení nastavení se během chvíle vygeneruje veřejná stránka, obvykle na adrese `https://<vaše_uživatelské_jméno>.github.io/<název_repozitáře>/`.

## Použití Firebase pro sdílený žebříček

Aby se body ukládaly a synchronizovaly mezi všemi zařízeními, je potřeba propojit aplikaci s [Firebase Realtime Database](https://firebase.google.com/).  
Kód v `app.js` již obsahuje inicializaci Firebase; stačí vložit vlastní konfiguraci.

### Vytvoření projektu

1. Přihlaste se do [Firebase Console](https://console.firebase.google.com/).  
2. Vytvořte nový projekt (bez Google Analytics).  
3. V části **Build → Realtime Database** klikněte na **Create database** a zvolte režim **Start in test mode**. Vyberte region (např. `europe-west1`).

### Přidání webové aplikace

1. V přehledu projektu klikněte na ikonu webu **</>** (Add app) a vyberte **Web app**.  
2. Zadejte název (např. `rozlucka-kluci-web`) a pokračujte bez hostingu.  
3. Na další stránce se zobrazí konfigurace `firebaseConfig`. Uložte si hodnoty `apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId` a `appId`.
4. Otevřete soubor `app.js` a v objektu `firebaseConfig` nahraďte placeholdery vašimi hodnotami.

Po této úpravě budou body přičítané v úkolu zapisovány do Firebase a sdílený žebříček bude aktualizován v reálném čase.

## Úpravy obsahu

* **Seznam hráčů** – v `app.js` jsou definovány tři konstanty: `players` (seznam zobrazovaných jmen), `nameKeyMap` (mapování jména na klíč bez diakritiky) a `playerImages` (cesta k avatarům). Upravte je podle skutečných účastníků.
* **Úkoly a body** – editujte `tasks.json`: pole objektů s `id`, `text`, `subtask` (nebo `null`) a `points`.  
  Podúkoly se zobrazují jako podřazené položky a udělují 5 bodů; hodnotu lze změnit v `app.js`.
* **Povzbuzující hlášky** – upravte `messages.json` podle vašich preferencí.
* **Styling** – barvy, písma a rozložení jsou definovány ve `style.css`. Můžete je přizpůsobit tak, aby seděly k vašemu tématu (např. elegantní, sportovní, fantasy...).

Přejeme hodně zábavy a co nejméně trapasů! 😉