<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use \File;
use Illuminate\Support\ServiceProvider;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->loadModule();
        Sanctum::ignoreMigrations();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    private function loadModule()
    {
        $listModule = array_map('basename', File::directories(base_path('Modules')));
        foreach ($listModule as $module) {
            if (file_exists(base_path('Modules/'.$module . '/routes.php'))) {
                $this->loadRoutesFrom(base_path('Modules/'.$module . '/routes.php'));
            }

            $this->loadMigrationsFrom(base_path('Modules/'.$module . '/migrations'));
            $configPath = base_path( 'Modules/'. $module . '/config/' . \Str::slug($module, '-')) . '.php';
            if (file_exists($configPath))
                $this->mergeConfigFrom($configPath, \Str::snake($module));
        }
    }
}
