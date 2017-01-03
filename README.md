#Dokumentáció

##Kollégiumi jelentkező felület külföldi hallgatók számára

__1. Követelményanalízis__

1.1. Célkitűzés, projektindító dokumentum

A külföldi hallgatók kollégiumi jelentkezését megkkönyítő felület elkészítése.
Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó a kollégiumokat megtekintheti, valamint azokba jelentkezhet.
Legyen egy adminisztrációra szolgáló felhasználó aki új kollégiumot tud felvenni valamint azt tudja módosítani és törölni, illetve új vezetetőt tud felvenni vagy törölni. 
Az adminisztrátor user adatai: email:"admin@admin.hu" jelszó: "admin"

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

2.1. Architektúra terv

2.1.1. Komponensdiagram


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



__2.1.3 Felületi tervek:__


2.1.4 adatmodellkapcsolat:
[Dormitory] +-> 0..* [User]

[User]  +-> 0..* [Dormitory]

[User] -> 0..* [Applyment]
