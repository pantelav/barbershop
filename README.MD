# Nuxt 3 + TailwindCSS + PrimeVue | Express + TS + MongoDb Barbershop лэндинг с админ-панелью

## О приложении

Данное приложение состоит из backend на Express js с использованием TS, БД MongoDb и frontend на Nuxt 3 с TailwindCSS и PrimeVue компонентами.

## Возможности

Приложение представляет из себя лэндинг, на котором клиент может ознакомиться с услугами барбершопа, оставить заявку на оказание услуги, зарегистрироваться, просматривать историю заказов в личном кабинете, а также админ-панель, в которой администратор / модератор может просматривать заявки, управлять услугами и сотрудниками

## Запуск backend (express)

### Dev сервер

    cd ./backend
    npm run dev

### Production

    cd ./backend
    npm run build
    npm run start

## Запуск frontend (nuxt)

### Dev сервер

    cd ./frontend
    npm run dev

### Production

    cd ./frontend
    npm run build
    node .output/server/index.mjs

## .env

### backend

    DB_URL="URL_MongoDb"
    PORT="port"
    AJWT="Access_token_secret_key"
    RJWT="Refresh_token_secret_key"
    DEFAULT_ADMIN_PASS="Дефолтный_пароль_админ_панели"

### frontend

    NUXT_PUBLIC_API_YANDEX="Yandex_api_key"
