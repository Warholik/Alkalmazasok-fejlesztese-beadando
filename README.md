#Dokumentáció

##Kollégiumi jelentkező felület külföldi hallgatók számára

__1. Követelményanalízis__

1.1. Célkitűzés, projektindító dokumentum

A külföldi hallgatók kollégiumi jelentkezését megkkönyítő felület elkészítése.
Az adatok védelme érdekében legyen lehetőség regisztrációra, majd bejelentkezésre. Bejelentkezett felhasználó a kollégiumokat megtekintheti, valamint azokba jelentkezhet.

__Funkcionális követelmények:__

- Regisztráció
- Bejelentkezés
- Csak bejelentkezett felhasználók által elérhető funkciók
 * Kollégiumok böngészése
 * Kollégium részletes adatainak megnézése
 * Kollégiumi jelentkezés
 * Meglévő jelentkezés törlése


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
- Kollégiumok közötti választás
- Kollégium adatainak megtekintése
- Kollégiumi jelentkezés
- Meglévő jelentkezés módosítása

Vegyünk példának egy egyszerű folyamatot:

__Meglévő jelentkezés lemondása:__
1. A felhasználó az oldalra érkezve, bejelentkezik vagy regisztrál
2. Regisztráció után megtekintheti a kollégiumokat listázó oldalt, ahol kiválaszthatja azt a kollégiumot ahová jelentkezni kíván.
3. Megnyomja a "Applications" gombot.
4. A "Applications" oldalon kiválasztja a jelentkezést és rákattint a "Delete application" gombra.
5. "Submit" gombra kattintva elmenti a változásokat

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
* Kollégiumok listaoldala
* Kollégium információs oldala
* Jelenektkezések listaoldala

2.1.3 Végpontok:

2.1.3 Oldalvázlatok:

Az oldalvázlatok a következő oldalon tekinthetőek meg:
http://lumzy.com/access/?id=0C85086DFE9724ECD416DD4A5C1F8B86



2.1.4 adatmodellkapcsolat:
[Dormitory] +-> 0..* [User]

[User]  +-> 0..* [Dormitory]

[User] -> 0..* [Applyment]
