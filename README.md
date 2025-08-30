# Rozlučka pro kluky – aplikace

Tento repozitář obsahuje jednoduchou webovou aplikaci pro **rozlučku se svobodou** pro kluky.  
Aplikace zobrazuje seznam úkolů, umožňuje zaznamenat splněné úkoly jednotlivými hráči a zobrazuje průběžný žebříček.

## Součásti

* **index.html** – hlavní stránka aplikace.  
  Načítá seznam úkolů a povzbuzujících vět ze souborů `tasks.json` a `messages.json`, zobrazuje je a umožňuje přidělovat body hráčům.  
  V souboru je připravený kód pro propojení s Firebase Realtime Database; před nasazením je potřeba doplnit `firebaseConfig`.
* **tasks.json** – seznam úkolů včetně bodového ohodnocení a případných podúkolů.  
  Úkoly můžete upravit nebo přidávat nové, body slouží k výpočtu žebříčku.
* **messages.json** – seznam povzbuzujících vět, které se náhodně zobrazují po splnění úkolu.
* **README.md** – tento popis a návod k použití.

## Lokální spuštění

Aplikaci můžete otevřít přímo z disku: stačí otevřít soubor `index.html` v libovolném moderním prohlížeči.  
Seznam úkolů a hlášek se načte ze souborů `tasks.json` a `messages.json` v kořenovém adresáři.

## Nasazení na GitHub Pages

1. Vytvořte nový repozitář na GitHubu (např. `rozlucka-kluci`).
2. Nahrajte soubory `index.html`, `tasks.json`, `messages.json` a `README.md` do kořene repozitáře.  
   Nejjednodušší je použít tlačítko **Add files → Upload files** v GitHub rozhraní.
3. Ve vašem repozitáři otevřete **Settings → Pages**.  
   Nastavte zdroj na **Deploy from a branch** a vyberte větev `main` a složku `/` (root).  
   Uložte nastavení; GitHub za chvíli vygeneruje stránku, která bude dostupná na adrese `https://<vaše_uživatelské_jméno>.github.io/<název_repozitáře>/`.

## Konfigurace Firebase

Pokud chcete sdílený žebříček napříč zařízeními, použijte [Firebase Realtime Database](https://firebase.google.com/).  
V souboru `index.html` je již připravený kód pro zápis splněných úkolů do Firebase; stačí doplnit vlastní konfiguraci.

### Vytvoření projektu

1. Přihlaste se na [console.firebase.google.com](https://console.firebase.google.com/).
2. Klikněte na **Add project** (Přidat projekt) a projděte průvodcem.  
   Můžete vypnout Google Analytics (není potřeba pro tuto aplikaci).
3. Po vytvoření projektu v postranním menu vyberte **Realtime Database** a klikněte na **Create database**.  
   Zvolte režim **Start in test mode** (testovací režim) a umístění (např. `europe-west`).

### Přidání webové aplikace

1. V přehledu projektu klikněte na ikonu webu **</>** (Add app) a zvolte **Web**.
2. Zadejte libovolný název aplikace (např. `rozlucka-kluci`) a nechte volbu hostingu vypnutou (není potřeba).  
   Po potvrzení se zobrazí konfigurační objekt `firebaseConfig`.
3. Zkopírujte celý obsah objektu a nahraďte jím placeholder `firebaseConfig` v souboru `index.html`.

### Práce s databází

Aplikace zapisuje každý splněný úkol do cesty `completions`.  
V databázi tak vzniknou záznamy se jménem hráče, ID úkolu, počtem bodů a časovou značkou.  
V případě potřeby můžete v kódu implementovat i čtení z databáze a sdílený žebříček pro více zařízení.

## Přizpůsobení

* **Seznam hráčů** – v souboru `index.html` je pole `players` s výchozími jmény.  
  Upravte jej podle skutečných účastníků (bez diakritiky).
* **Styling** – barvy, fonty nebo rozložení můžete upravit v hlavičce souboru `index.html` v rámci `<style>`.
* **Úkoly a hlášky** – editujte soubory `tasks.json` a `messages.json` pro vlastní obsah.

Přejeme hodně zábavy a co nejméně trapasů! 😉
