<?php

use Illuminate\Database\Seeder;

use App\Models\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'name'=>'Admin',
            'name_slug'=>'admin',
            'permissions'=>["user-create","user-edit","user-delete","user-view","userGroup-create","userGroup-edit","userGroup-delete","userGroup-view","userGroup-detail","category-create","category-edit","category-delete","category-view","dashboard","setting"],
            'created_by'=>'1'
        ]);
    }
}
