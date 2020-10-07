### Instrukcja dla mentora
Drogi mentorze, cały projekt jak i wytyczne traktuj jako "wskazówki". 
Pamiętaj, że nadrzędnym celem na CodersCamp jest przekazać wiedzę i nauczyć :) 
Wszystko co wg. Twojej najlepszej wiedzy będzie służyć do osiągnięcia tego celu możesz zastosować. 
Jednakże pamiętaj o trzymaniu się ogólnych wytycznych oceny i programu kursu (minimum musi zostać spełnione, abyśmy na na koniec kursu mogli potwierdzić uczestnikom opanowanie umiejętności stosownym dokumentem).

Aby przygotować TEN projekt do wykonania przez zespół.
1. Sklonuj repozytorium.
2. Usuń branch z proponowanym rozwiązaniem, aby nie hamować kreatywności zespołu. 
Możesz się nią zainspirować albo wykonać projekt zupełnie inaczej. 
Dostarczamy Ci ten kod dla ułatwienia mentorowania, ale nie traktuj go jako jakiegoś _wyznacznika_, czy dobrego, albo _jedynego poprawnego_ rozwiązania.
3. Usuń instrukcję dla mentora z README.md
4. Jeśli chcesz korzystać z utworzonych Issues skorzystaj z narzędzia.
https://www.atlassian.com/agile/project-management/user-stories
https://torre.me.uk/2019/03/28/using-github-as-project-management-platform/
https://zube.io/blog/agile-project-management-workflow-for-github-issues/

#### Opis przykładowego rozwiązania
1. Został dodany Jest w sposób opisany [TUTAJ](https://ryankubik.com/blog/parcel-and-jest/)

# CodersCamp 2020 - Projekt JavaScript
Coders Camp (coderscamp.edu.pl) - Projekt JavaScript. 
Wykorzystanie asynchronicznego JavaScript oraz korzystanie z REST API.

### Zasady wykonywania projektu (wspólne dla wszystkich grup i mentorów): 

##### W projekcie każdy z uczestników powinien zaprezentować praktyczną znajomość poniższych zagadnień związanych z JavaScript:
- zmienne
- operatory porównania
- pętle
- obiekty, propercje
- warunki
- funkcje
- operatory logiczne
- tablice
- iteracja vs rekurencja
- console
- return
- "===" vs "=="
- podłączenie do zewnętrznego REST API
- interakcja z domem
- łapanie elementów w JS
- zmiana stylów z poziomu JSa
- zmiana contentu html z poziomu JSa
- animacje
- zewnętrzne biblioteki (slidery, swipery, animacje, bootstrap)
- async await
- promisy i callbacki
- metody HTTP
- pisanie testów jednostkowych 

##### W trakcie trwania projektu należy wyznaczyć w zespole następujące role:
Najlepiej, gdyby uczestnicy po prostu się zgłosili. W przypadku braku chętnych mentor wyznacza "ochotników".
Oczywiście każda z ról wykonuje prace programistyczne, dodatkowo zajmując się wspomnianymi powyżej działaniami.
Role należy zmieniać następnie co projekt, aby każdy miał na jakąś szansę.
Szcególnie w pierwszym projekcie poproście mentora o pomoc w spełnianu swoich ról, podzieleniu się zadaniami.
Warto zorganizować spotkanie rozpoczynające prace, na którym wykonacie i/lub omówicie podstawowy setup projektu.

###### Klient
Zawsze jest to **Mentor**. Uważajcie! Ten klient ma też zdolności techniczne i lepiej z nim nie dyskutować jeśli "zaproponuje"
dodatkowe testy czy zmianę sposobu implementacji. Pamiętajcie też, że jedyną stałą w projektach informatycznych jest zmiana.
Wszelkie zmiany w projekcie jakie zaproponuje Klient powinny jak najbardziej zostać wzięte pod uwagę :) 
W sytuacjach krytycznych można też poprosić go o posłużenie radą. Będzie też przeglądał każdy wasz wykonany kod.

###### Tech Lead
Ma ostateczne zdanie w kwestiach związanych z technologiami — np. jakiej technologi użyć

###### Product Owner
Odpowiada za wizję produktu i kwestie związane z funkcjonalnoścami. 
Powinien podejmować ostateczne decyzje odnośnie wątpliwości związanych z wymaganiami.
Bardzo pożądane jest, aby często konsultował się z klientem i starał się, aby reszta zespołu mogła się skupić na swoich
zadaniach zamiast dogadywaniu wymagań.

###### Development Manager
Oczywiście Klientowi zależy najbardziej na tym, aby projekt zakończył się na czas. 
Dlatego zespoł bedzie nieustannie przez niego kontrolowany.
Jednakże, w trakcie pracy ważne jest, aby uzyskać zaufanie klienta i te kontrole nie były w ogóle potrzebne.
Project Manager będzie dbał odpowiednio o terminy, podział zadań, a także wywiązywanie się z obowiązków innych członków zespołu.
Jeśli spełni odpowiednio swoją rolę, to duża szansa że uda wam się uformować efektywny i zgrany zespół, a klienci nie będą wypatrywali tylko na wasze potknięcia :)

##### Sposób oceny projektu (i wszystkich kolejnych projektów na CodersCamp)
Zapewne interesuje Was, w jaki sposób projekt zostanie „zaliczony” i oceniony.
Ocenianie będzie miało kilka etapów.
- Spotkanie OnLine: 
    - Podczas spotkania zbierają się 2 lub 3 wcześniej wylosowane grupy z CodersCamp. Wzajemnie prezentujecie wykonane przez Was projekty.
    Forma prezentacji pozostaje dowolna. Możecie przygotować jakieś slajdy, ale niekoniecznie. Na pewno musi zostać pokazana działająca aplikacja, reszta wg uznania.
- Ocena zaangażowania przez Waszego mentora:
    - Mentor określa procentowo jakie było wasze zaangażowanie w projekt. Składa się na to: terminowość, spełnianie ról. Szczegóły mentorzy 
    dostaną w osobnym dokumencie. 
- Ocena dostarczonego kodu i działania aplikacji przez 2 mentorów (wasz mentor i jeden z obecnych na prezentacji):
    - Jako zespół otrzymacie liczbę punktów od obu mentorów (wg kryteriów //TODO podlinkować), która zostanie pomnożona przez procenty zaangażowania.
      Pamiętajcie, że im więcej pracy wykonacie, tym więcej praktycznych umiejętności opanujecie. 
- Punkty dodatkowe:
    - Każda osoba pełniąca w czasie trwania projektu jakąś rolę otrzyma dodatkowe 0-10% zaangażowania (wg. uznania mentora zespołu).

## Quiz Gwiezdne Wojny
Teraz przechodzimy do przykładowego projektu, który został przygotowany przez organizatorów kursu.
Proponowany projekt pozwala na zastosowania większości umiejętności jakie powinniście posiąśc w trakcie przerabiania działu.
Jednakże jeśli macie pomysł na projekt podobnej skali, który spełni opisane na górze wymagania i czujecie się na siłach
w zdefiniowaniu funkcjonalności, przygotowaniu ekranów i podzieleniu go na zadania - to nic nie stoi na przeszkodzie,
aby wykonać np. coś związanego z zainteresowaniami Waszej grupy :) Powodzenia!
 
Czas porzucić narrację CodersCamp i wcielić się w członka zespołu projektowego...

### Domena projektu
Jedna ze znanych marek płatków śniadaniowych prowadzi wieloletnią współpracę z wytwórnią filmów Disney, do której od niedawna należą także Gwiezdne Wojny.
W ramach kolejnej akcji promocyjnej wasz zespół został poproszony o przygotowanie Proof of Concept aplikacji związanej ze Star Wars.
Po wstępnym rozpoznaniu i analizie biznesowej podjęto decyzję o przygotowaniu quizu sprawdzającego znajomość uniwersum Gwiezdnych Wojen.
Ma to być aplikacja webowa działająca w przeglądarce, bez potrzeby instalacji.

Klient dostarczył prototyp interfejsu użytkownika dostosowany pod Desktop ([TUTAJ](https://www.figma.com/proto/L3XaDSR7whIjiZVw2HI0gO/CodersCamp2019_Projekt3_AsyncJS-and-REST?node-id=7%3A100&scaling=contain)).
Pokazany został tylko jeden tryb i jedno pytanie. Cała reszta działa analogicznie.
Projekt: https://www.figma.com/file/L3XaDSR7whIjiZVw2HI0gO/CodersCamp2019_Projekt3_AsyncJS-and-REST?node-id=0%3A1
Może się przydać do odczytania np. cieni i kolorów. Nie zwracajcie uwagi na jednostki w px, należy użyć jednostek responsywnych.
Dostarczona została także lista funkcjonalności. 

1. Wybór trybu quizu (People, Vehicles, Spaceships)
2. Opis zasad dla quizu. Obok zasad pokazuje się losowe zdjęcie z danego trybu (dostosowany opis, jeśli np. imię osoby ze zdjęcia jest w opisie zasad).
3. Po rozpoczęciu gry rozpoczyna się odliczanie czasu (2 minuty).
4. Zadaniem gracza jest odpowiedzieć na jak najwięcej pytań w ciągu ustalonego czasu (dodatkowo gracz konkuruje także z Google Vision API!). W trakcie trwania quizu miecz świetlny pokazuje ile jeszcze czasu zostało. Po wybraniu odpowiedzi zostaje ukazane przez sekundę czy odpowiedź była dobra czy zła. Następnie pytanie zostaje zmienione na kolejne (prototyp pokazuje jedynie 1 pytanie) i tak do końca czasu.
5. Pytania są generowane w następujący sposób: 
    - zostaje pobrany losowy zasób z danego trybu (np people o id 5)
    - zostanie pobrane dla wylosowanego zasobu zdjęcie (z dysku)
    - losowane są 3 odpowiedzi z calla do api (dla People) będzie to: https://swapi.co/api/people (jedna brana jest z wcześniej wylosowanego, musi być poprawna)
6. Odpowiedź Google Vision API generowana jest w następujący sposób
    - zdjęcie jest przesyłane do GoogleVision API, z którego bierze się najwyższy wynik prawdopodobieństwa rozpoznania (albo kilka z nich, alorytm trzeba ustalić)
    - przeszukiwane są wyniki działania GoogleVision dla zdjęcia, czy któryś z nich pokrywa się z odpowiedzią (ustalić stopień podobieństwa, np. odpowiedź to może być Jabba, a Google API zwróci "Jabba The Hutt")
7. Po ukończeniu czasu wynik gracza zapisywany jest w rankingu dla danej przeglądarki (LocalStorage) i pokazywany jest ranking 3 najlepszych wyników.

Jedno z wcześniejszych wykonań działającej aplikacji możecie zobaczyć TUTAJ. Jednakże nie należy się na nim 100% wzorować.
Niektóre wymagania mogły ulec zmianie, a przedstawiana aplikacja nie jest responsywna.

Waszym zadaniem będzie zaimplementować aplikację, aby działała wg wymagań klienta, a także przygotować i wykonać
wersję responsywną aplikacji (dostosowaną do wyświetlania na Tabletach i Telefonach — możecie przygotować najpierw projekt interfejsu, lub od razu przejść do implementacji).
W celu zaprezentowania działania aplikacja musi być możliwa do odwiedzenia w internecie.
Klient nie chce ponosić za to żadnych dodatkowych kosztów, dlatego należy wykorzystać jedną z usług oferujących darmowe
uruchomienie takiej aplikacji (np. GitHub Pages).
Klient wymaga także, aby aplikacja nie tylko działała, ale była odpowiednio pokryta testami.
Naprawdę macie szczęście co do klienta! Wielu uważa testy za niepotrzebne i jedynie stratę pieniędzy.
A co znaczy „odpowiednio pokryta" to już należy właśnie ustalić z samym Klientem :) 

## Możliwe usprawnienia i dodatkowe funkcjonalności:
1. Wykorzystanie Speech Recognition API i wyszukiwanie odpowiedzi, jaką gracz wypowiedział zamiast klikania w przycisk z odpowiedzią.

## Dodatkowe zadania (wykraczające poza zakres kursu):
1. Wykonanie testów E2E, przy użyciu odpowiedniego narzędzia. Proponujemy np. Cypress.

Wszelkie inne dodane przez Was funkcjonalności czy usprawnienia infrastrukturalne należy przedstawić w README.md projektu :)
Template znajdziecie [TUTAJ](./PROJECT_SHOWCASE_TEMPLATE.md). 

## Technologie do wykorzystania:
- JavaScript i/lub TypeScript
- HTML
- CSS / SCSS
- Star Wars API
- Google Vision API
Uwaga: Każda inna technologia / Biblioteka jak najbardziej mile widziana, jeśli pomoże Ci osiągnąć zamierzony cel :) 
Jednakże nie używaj żadnego frameworka JavaScript takiego jak Angular / React / Vue.js - w tym dziale chodzi o praktykę czystego JavaScripta :) 

## Porady odnośnie projektu
- Dzięki Jest, elementy widoku (DOM) można testować wg Guide: https://jestjs.io/docs/en/tutorial-jquery (w tym przykładzie jQuery, którego prawdopodobnie nie będziecie używać)
