#Dokumentáció

##Kollégiumi jelentkező felület külföldi hallgatók számára

__1. Követelményanalízis__

1.1. Célkitűzés, projektindító dokumentum

A külföldi hallgatók kollégiumi jelentkezését megkkönyítő felület elkészítése.
Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó a kollégiumokat megtekintheti, valamint azokba jelentkezhet.
Legyen egy adminisztrációra szolgáló felhasználó aki új kollégiumot tud felvenni valamint azt tudja módosítani és törölni, illetve új vezetetőt tud felvenni vagy törölni. 
Az adminisztrátor user adatai: email:"admin@admin.hu" jelszó: "admin"

__Szakterületi fogalomjegyzék:__
*Kollégiumi jelentkezés: Olyan folyamat amelyben egy egyetem hallgatója vehet részt, szubjektív elbírálás alapján történik, ezekhez az adatoakt a regisztráció során kérjük el a regisztrálótól.
*Kollégium: Olyan épület amelyben hallgatók lakhatnak. Egy kollégiumnak van egy vezetője és egy leírása ami összefoglalja a kollégium tulajdonságait.
*Kollégiumi vezető: Az a kiement személy aki felel a kollégiumért. Egy vezetőhöz több kollégium is tartozhat.
*Külföldi egyetemi hallgató: Olyan személy aki egy külföldi egyetemen tanul, így részt vehet az eljárásban. Egy hallgató több kollégiumba is tud jelentkezni egyszerre.
*Adminisztrátor: Az a személy aki feltudja venni a redszerbe a kollégiumokat és a kollégiumi vezetőket.

__Funkcionális követelmények:__

- Regisztráció
- Bejelentkezés
- Csak bejelentkezett felhasználók által elérhető funkciók:
 * Kollégiumok böngészése
 * Kollégiumok leírásának megtekintése
 * Kollégiumba való jelentkezeés
 * Meglévő jelentkezés törlése
- Csak adminisztrátor felhasználó által elérhető funkciók:
* Kollégium létrehozása
* Kollégium törlése
* Kollégium módosítása
* Vezető Létrehozása
* Vezető Törlése


__Nem funkcionális követelmények:__

- Könnyű áttekinthetőség: Kollégiumok blokkonkénti elkülönítése
- Használhatóság: Könnyű áttekinthetőség, ésszerű elrendezés, könnyű kezelhetőség
- Megbízhatóság: jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan emelje ki a hibás beviteli mezőket, ilyen esetben a jól bevitt adatok maradjanak az űrlapban.
- Karbantarthatóság: könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

__1.3 Használatieset-modell, funkcionális követelmények__

_Vendég:_ Csak a publikus oldalakat éri el
- Főoldal
- Bejelentkezés
- Regisztráció

__Bejelentkezett felhasználó:__ A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.
- Kollégiumi jelentkezés leadása
- Kollégiumi jelentkezés törlése

__Bejelentkezett adminisztrátor felhasználó:__ Az eddigi oldalak elérésén felül egyéb funkciókhoz is hozzáfér.
* Kollégium létrehozása
* Kollégium törlése
* Kollégium módosítása
* Vezető Létrehozása
* Vezető Törlése


__Példa folyamat:__

__Kollégiumba való jelentkezés majd annak lemondása:__
1. A felhasználó az oldalra érkezve, bejelentkezik vagy regisztrál
2. Regisztráció után megtekintheti a kollégiumokat listázó oldalt, ahol kiválaszthatja azt a kollégiumot ahová jelentkezni kíván.
3. Megnyomja a "Applications" gombot, így kollégiumba jelentkezik
4. A jelentkezett kollégium alatt elérhetővé válik a "Cancel Applications" gomb
5. Megnyomja a "Cancel Applications" gombot, így törli a jelentkezését



__2. Tervezés__

2.1.1 adatmodellkapcsolat:

![Adatbazis_terv](/images/adatbazisterv.JPG)

2.1.2. Oldaltérkép:

__Publikus:__
* Főoldal
* Bejelentkezés
* Regisztráció

__Bejelentkezett:__
* Főoldal
  * Jelentkezés kollégiumba
  * Jelentkezés törlése

__Adminisztrátori nézet:__
* Kollégium felvétele
* Kollégium módosítása és törlése
* Vezető felvéte és törlése

2.1.3 Végpontok:
* GET /: Főoldal
* GET /login: Bejelentkezés
* POST /login: Bejelentkezéses űrlap feldolgozása
* GET /registration: Regisztráció
* POST /registration: Regisztrációs űrlap feldolgozása
* GET /logout: Kijelentkezés
* GET /applications: A jelentkezések listázása
* GET /dormitory: Kollégium létrehozása
* POST /dormitory: Kollégiumot létrehozó ürlap feldolgozása 
* POST /dormitory/?/delete: Kollégium törlése
* POST /dormedit/?/edit: Kollégium szerkesztése
* POST /dormedit/?edit: Kollégium szerkesztő ürlap feldolgozozása 
* POST /dormitory/?/apply Kollégiumi jelentkezés feldolgozása
* POST /dormitory/?/cancel Kollgiumi jelenetkezés visszamondásának feldolgozása
* GET /leader : Kollégiumi vezető létrehozása
* POST /leader : Kollégiumi vezetőt létrehozó ürlap feldolgozása
* POST /leader/?/delete : Kollégiumi vezető törlése

__2.1.3 Fejlesztői környezet:

Lokális környezetnek a Visual Studio Code-t használtam ami megkönnyítette a mappa kezelést, debuggolást és a git használatát. 
A szoftver AdonisJS nevezetű keretrendszerrel történt. Az AdonisJS egy MVC keretrendszer a Node.js-hez. Eléggé magaszintű megvalósítás ezért nagyban leegyszerűsítette a fejlesztést. Rengeteg olyan megoldást tartalmaz amivel pár sor kódra lehet redukálni egyes dolgokat.

__A mappaszerkezett bemutatása:__

A fejlesztés alatt a következő mappákat használtam:
* http/Controllers -- Itt van meghatározva, hogy az egyes hívásokra mit csináljon az adott controller.
 * ApplicationController.js
 * DormitoryController.js
 * LeaderController.js
 * UserController.js
* http/routes.js -- Itt vannak meghatározva a végpontok
* Model -- Itt vannak meghatározva a modellek közötti kapcsolatok
 * Dormitory.js
 * Leader.js
 * Token.js
 * User.js
* Database/migration -- Itt van felépítve az adott táblastruktúra
 * 1481161115826_create_users_table.js
 * 1481161115828_create_tokens_table
 * 1481161197358_create_dormitories_table
 * 1481164479919_create_leaders_table
 * 1481892484163_create_dormitory_user_table
* Resources/views -- Itt vannak a megjelenítésrt felelős fájlok 
 * applications.njk
 * dormedit.njk
 * layout.njk
 * leader.njk
 * login.njk
 * main.njk
 * master.njk
 * registration.njk
 * welcome.njk

__2.1.4 Felületi tervek:__

Főoldal vendég nézet:
![vendég_nézet](/images/vendég_nézet.JPG)

Regisztráció:
![regisztráció](/images/regisztráció.JPG)

Bejelentkezés:
![Login](/images/bejelentkezés.JPG)

Főoldal nézet normál felhasználóval:
![normal_user_nezet](/images/normal user.JPG)

Főoldla nézet admin felhasználóval:
![Admin_user_nezet](/images/admin_nézet.JPG)

Kollégium létrehozása:
![Kollegium letrehozása](/images/Kollégium létrehozása.JPG)

Kollégium módosítása:
![Kollegium_modositasa](/images/kollégium_modositasa.JPG)

Vezető törlése vagy hozzáadása:
![Vezeto_torlese_hozzadasa](/images/vezető_torlese.JPG)

__3. Felhasználói Dokumentáció:__
Futtatáshoz szükséges operációs rendszer: Tetszőleges operációs rendszer.
Futtatáshoz szükséges hardver: Bármely olyan hardver amely olyan operációs rendszert tud futtatni amely vizuális böngésző futtatására alkalmas. 
Egyéb követelmények: Internet böngésző telepítése, JavaScript ajánlott.

__3.1 A program telepítése és indítása:__
* Mappa létrehoza
* Githubról zipként letöltjük és kitömörítjük a mappába vagy klónozzuk a mappába a repository-t
* "npm install" parancs kiadása 
*.env.example fájl átnevezése .env-re
* npm start paranccsal futtatni
* localhost:3333 megnyitása

__3.2. A program használata:__

Átlag felhasználónak:
* A böngészőben a főoldal megnyitása
* Bejelentkezés vagy regisztráció
* Kollégiuba jelentkezni az "Application" gomb megnyovásával lehetséges.
* A kollégiumi jelentkezés visszavonását a "Cancel Application" gombbal tehetjük meg.

Adminisztrátorként:
* Az adminisztrátor felhasználóval való bejelentkezés után érhetjük el az adminisztrátori funkciókat
* Kollégium felvétele menüpontnál az adatok feltöltése után tudok kollégiumot felvenni
* Az Applications menüpontnál láthatjuk a jelentkezők listáját.
* Egy kollégiumi vezető törlését a "Kollegiumi vezető felvétele és törlése" mepüpont alatt a vezető neve melletti gombra kattintva tehetjük meg.
* Egy új vezetőt a "Kollegiumi vezető felvétele és törlése" alatt a "Kollégiumi vezető neve" mezőt kitöltve majd a mentés gombra kattinva tehetjük meg.

__4. Kliens oldali JavaScript__

__4.1 Új funkciók:__
 1. Belépés felugró ablakban. (popup_login.js)
 2. Regisztráció felugró ablakban.popup_login (popup_register.js)
 3. A törlés funkció csak a felugró ablak megerősítése után hajtódik végre (delete.js)
 4. A kollégiumba való jelentkezés. (apply_cancel.js)
 5. Korábbi jelentkezés törlése. (apply_cancel.js)

__4.2. Új funkciók leírása__
1. Belépés
   - A popup_login -bekapcsolt javascript mellett- bejelentkezéskor csak a kitöltött form elküldése után tölti újra az oldal.
   - A UserController-ben új funkcióként megjelenik az ajaxLogin, ennek működésükben a normál loginhoz hasonló.
2. Regisztráció
   - A popup_register segítségével -bekapcsolt javascript mellett- a regisztrációkor csak a kitöltött form elküldése után tölti újra az oldal. 
   - A UserController-ben új funkcióként megjelenik az ajaxRegister ennek működésükben a normál regisztrációhoz hasonló.
3. törlés
   - A felugró ablakon a megerősítés gomb megnyomása után DELETE ajax/leader/:id/delete útvonalon a 
     Leadercontroller ajaxDelete metódusa hívódik meg.
4. Jelentkezés:
   - Az "application" gomb megnyomása után a "POST ajax/dormitory/:id/apply" útvonalon az
     ApplicationController ajaxApply metódusa hívódik meg.
5. Jelentkezés törlése:
   - A "Cancel application" gomb megnyomása után a "POST ajax/dormitory/:id/ajaxCancel" útvonalon az
     ApplicationController ajaxCancel metódusa hívódik meg.

   
__4.3. Szekvenciadiagram:__
Felhasználó regisztrál, bejelentkezik majd kollégimba jelentkezik.
![Felhasználó kollégiumba jelentkezik](/images/Szekvenciadiagram.JPG)

   
__5. Tesztelés__
A tesztelés a Selenium IDE nevezetű Firefox pluginnal végeztem. 
* Telepítése: A firefox addon oldaláról telepíthető 
* Használata: 
  * Megnyitjuk a tesztelni kívánt oldalt 
  * A böngésző menüsávjánál megjelenik a Selenium ikonja 
  * A tesztelőben küldönböző folyamatokat lehet "felvenni" majd ezeket automatán "visszajátszani".
