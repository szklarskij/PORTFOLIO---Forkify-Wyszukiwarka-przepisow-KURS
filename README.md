# FORKIFY PROJECT

## Aplikacja do wyszukiwania przepisów kulinarnych.

https://forkify-jszklarski.netlify.app/ - link do hostowanej aplikacji na portalu Netlify

Strona jest ulepszoną wersją projektu zawartego w kursie "The Complete JavaScript Course 2022: From Zero to Expert!". Autorem kursu jest Jonas Schmedtmann.
Jest to pierwsza większa aplikacja/strona mojego autorstwa.

#### Użyte technologie:

- vanilla javascript
- html
- sass
- forkify API
- Edamam API

### Funkcjonalność:

Elementy projektu zawarte w kursie:

- design strony
- wyszukiwarka przepisów po tagach dzięki zewnętrznemu API
- renderowanie przepisów na liście oraz paginacja
- ustawienie ilości porcji i składników
- możliwość dodawania własnych przepisów do API
- dodawanie potraw do ulubionych (bookmarks), wyświetlanie ich na liście oraz zapis w pamięci przeglądarki

### Elementy projektu dodane przeze mnie:

1. Plan przepisów:

- możliwość przypisania przepisów do następnych siedmiu dni
- wygenerowanie i skopiowanie planu do schowka
- dodanie wszystkich składników potraw z planu do listy zakupów

2. Lista zakupów:

- możliwość dodania składników z wybranego przepisu do listy z uwzględnieniem ilości porcji
- modyfikacja ilości porcji na liście oraz bieżące przeliczanie składników
- wygenerowanie i skopiowanie sformatowanej listy zakupów do schowka
- wyczyszczenie listy

3. Ulepszenie funkcji dodania nowych przepisów

- dodawanie oraz usuwanie nowych składników z tymczasowej listy przed wgraniem przepisu
- ulepszony formularz

4. Ulepszona paginacja

- nowe przyciski stron
- możliwość sortowania przepisów

5. Sprawdzenie ilości kalorii

- łączenie z zewnętrznym API EDAMAM w celu pobrania informacji o składnikach
- renderowanie wyników i sumowanie ilości kalorii zawartych w przepisie

6. Zapisanie stanu planu i listy zakupów w pamięci przeglądarki

#### Screenshots:

- strona główna

<p align="center">
  <img src="/src/screenshots/1.png" />
</p>

- dodawanie przepisu

<p align="center">
  <img src="/src/screenshots/2.png" />
</p>

- planowanie posiłków

<p align="center">
  <img src="/src/screenshots/3.png" />
</p>

- kalkulator kalorii

<p align="center">
  <img src="/src/screenshots/4.png" />
</p>

#### Komendy

```
npm build
npm start
```

### Przypisy

- Jakub Szklarski
- Jonas Schmedtmann
- EDAMAM

### Kontakt

jakubszklarski1@gmail.com
