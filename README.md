# PHONESHOP
# Đàm Nguyễn

Web bán hàng của cửa hàng Đàm Nguyễn : **FaceBook => Đàm Nguyễn (fb.com/damdz98) **.

## Laravel setup

### Install composer dependencies

```

composer install
```


## Create a copy of your .env file
```
cp .env.example .env
```
### Database Migrations

After installing composer dependencies, add your database credentials in `.env` file and then run migrations.
```
php artisan migrate
```
```
php artisan db:seed
```

Now, in the terminal run `artisan serve` command. It will run the application at `http://127.0.0.1:8000` URL, and that URL path used in the Vue.js app.

```
php artisan serve
```



