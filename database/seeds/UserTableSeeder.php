<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@phoneshop.com',
            'password' => \Illuminate\Support\Facades\Hash::make('123456'),
            'role_id'=>'1',
            'status' => 'active'
        ]);
    }
}
