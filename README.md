# Transphere

TranSphere is a web application that offers internal transfers on a half price. The application is formed by 2 modules: for users and for customers. Every user has its own profile page and has the ability to upload content on the platform. Every user is able to access this information for free.

TranSphere - "Be halfway there" е българско интернет приложение за динамични транспортни услуги, обслужващо потребители, имащи нужда от достъпен, изгоден и иновативен вътрешен транспорт.

## How it functions | Как работи

Pretty simple - the Anglar App is responsible for the front-end of the project. The MySQL Database and PHP (used to retrieve data from the DB) are on a remote server. The front-end makes AJAX Requests to that server when necessary and recieves the data in JSON format, which it then renders in the appropriate form.

Доста просто - Angular приложението е отговорно за частта от проекта, която клиента вижда. Базата данни в MySQL и PHP (използвано за да тегли данни от БД) са качени на отдалечен сървър. Клиентската част прави AJAX заявки, когато е нужно, и получава данните в JSON формат, което след това се показвна на страницата в подходяща форма.

## DEMO

If you do not want to install the app locally, the newest version of it is on (http://www.sth.gimdesign.eu).

Ако не желаете да инсталирате приложението локално, най-новата му версия е качена на (http://www.sth.gimdesign.eu).

## How to install and run tha app | Как да инсталираме и пуснем и приложението

1.  Open the folder in command prompt | Отворете папката през командния прозорец
2.  Type and execute `npm install` (downloads all dependencies needed) | Пускаме командата `npm install` (сваля всички добавки нужни)
    -- You have to have Node.js installed | Трябва да имате Node.js вече инсталиран
3.  Execute `npm start` to start dev server (see below) | Изпълняваме `npm start` за да пуснем сървър за разрабока (прочети надолу)

## How to use Angular | Как да използваме Angular

## Development server | Сървър за разрабока

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Изпълнете `ng serve` за работен сървър. Отидете на `http://localhost:4200/`. Приложението ще се рестартира автоматично при промени.

# Additional Info | Допълнителна информация

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
