#!/bin/sh

set -eu

if [ ! -f .env ]; then
    cp .env.example .env
fi

if ! grep -Eq '^APP_KEY=base64:.+' .env; then
    php artisan key:generate --force
fi

php artisan migrate --force
php artisan db:seed --force

if [ ! -e public/storage ]; then
    php artisan storage:link
fi

php artisan optimize
php artisan filament:optimize

cd public
exec php -S 0.0.0.0:8000 ../vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php
