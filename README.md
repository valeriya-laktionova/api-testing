# Autotests with Playwright

## Установка проекта

1. Клонировать репозиторий:

```bash
git clone https://github.com/AronAriel/AutoTest.git
cd ИМЯ-РЕПОЗИТОРИЯ
```

2. Установить зависимости:

npm install

3. Запуск тестов:

а) в режиме с браузером (headed):

npx playwright test --headed

б) В обычном (без окна браузера, headless):

npx playwright test

4. Описание проекта:

Проект использует Playwright для автотестов.
Блокировка рекламы реализована вручную через файл adblock.js без использования фреймворков.
Все тесты находятся в папке /tests.
Отчёты сохраняются в папку /playwright-report/.

Тесты в Firefox могут нестабильно обрабатывать 
события hover, особенно для тултипов. В Chrome 
и Chromium поведение корректное, все тултипы 
отображаются и тесты проходят.