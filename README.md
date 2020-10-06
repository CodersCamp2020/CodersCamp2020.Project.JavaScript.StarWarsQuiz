# Quiz Star Wars

Coders Camp (coderscamp.edu.pl) - Projekt JavaScript. Wykorzystanie asynchronicznego JavaScript oraz korzystanie z REST API.

## Prototyp interfejsu użytkownika:

https://www.figma.com/proto/L3XaDSR7whIjiZVw2HI0gO/CodersCamp2019_Projekt3_AsyncJS-and-REST?node-id=7%3A100&scaling=contain

Pokazany został tylko jeden tryb i jedno pytanie. Cała reszta działa analogicznie.

Projekt: https://www.figma.com/file/L3XaDSR7whIjiZVw2HI0gO/CodersCamp2019_Projekt3_AsyncJS-and-REST?node-id=0%3A1
Może się przydać do odczytania np. cieni i kolorów. Nie zwracajcie uwagi na jednostki w px, należy użyć jednostek responsywnych.

## Działanie aplikacji:

1. Wybór trybu quizu (People, Vehicles, Spaceships)
2. Opis zasad dla quizu. Obok zasad pokazuje się losowe zdjęcie z danego trybu (dostosowany opis, jeśli np. imię osoby ze zdjęcia jest w opisie zasad).
3. Po rozpoczęciu gry rozpoczyna się odliczanie czasu (2 minut).
4. Zadaniem gracza jest odpowiedzieć na jak najwięcej pytań w ciągu ustalonego czasu (dodatkowo gracz konkuruje także z Google Vision API!). W trakcie trwania quizu miecz świetlny pokazuje ile jeszcze czasu zostało. Po wybraniu odpowiedzi zostaje ukazane przez sekundę czy odpowiedź była dobra czy zła. Następnie pytanie zostaje zmienione na kolejne (prototyp pokazuje jedynie 1 pytanie) i tak do końca czasu.
5. Pytania są generowane w następujący sposób: 
- zostaje pobrany losowy zasób z danego trybu (np people o id 5)
- zostanie pobrane dla wylosowanego zasobu zdjęcie (z dysku)
- losowane są 3 odpowiedzi z calla do api (dla People) będzie to: https://swapi.co/api/people (jedna brana jest z wcześniej wylosowanego, musi być poprawna)
6. Odpowiedź Google Vision API generowana jest w następujący sposób
- zdjęcie jest przesyłane do GoogleVision API, z którego bierze się najwyższy wynik prawdopodobieństwa rozpoznania (albo kilka z nich, alorytm trzeba ustalić)
- przeszukiwane są wyniki działania GoogleVision dla zdjęcia, czy któryś z nich pokrywa się z odpowiedzią (ustalić stopień podobieństwa, np. odpowiedź to może być Jabba, a Google API zwróci "Jabba The Hutt")
7. Po ukończeniu czasu wynik gracza zapisywany jest w rankingu dla danej przeglądarki (LocalStorage) i pokazywany jest ranking 3 najlepszych wyników.

## Możliwe usprawnienia i dodatkowe funkcjonalności:
1. Wykorzystanie Speech Recognition API i wyszukiwanie odpowiedzi jaką gracz wypowiedział zamiast klikania w przycisk z odpowiedzią.


## Technologie do wykorzystania:
- JavaScript i/lub TypeScript
- HTML
- CSS / SCSS
- Star Wars API
- Google Vision API

## Opis kodu startowego:
1. Został dodany Jest w sposób opisany [TUTAJ](https://ryankubik.com/blog/parcel-and-jest/)


## Organizacja
https://www.atlassian.com/agile/project-management/user-stories
https://torre.me.uk/2019/03/28/using-github-as-project-management-platform/
https://zube.io/blog/agile-project-management-workflow-for-github-issues/
