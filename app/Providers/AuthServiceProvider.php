<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
         'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Gate::define('user-create',function (){
          return true;
        });
        Gate::define('user-edit',function (){
            return true;
        });
        Gate::define('user-delete',function (){
            return true;
        });
        Gate::define('user-view',function (){
            return true;
        });

        Gate::define('userGroup-create',function (){
            return true;
        });
        Gate::define('userGroup-edit',function (){
            return true;
        });
        Gate::define('userGroup-delete',function (){
            return true;
        });
        Gate::define('userGroup-view',function (){
            return true;
        });
        Gate::define('userGroup-detail',function (){
            return true;
        });

        Gate::define('category-create',function (){
            return true;
        });
        Gate::define('category-edit',function (){
            return true;
        });
        Gate::define('category-delete',function (){
            return true;
        });
        Gate::define('category-view',function (){
            return true;
        });

        Gate::define('dashboard',function (){
            return true;
        });
        Gate::define('setting',function (){
            return true;
        });







    }
}
