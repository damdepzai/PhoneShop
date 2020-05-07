<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $node = \Modules\CRM\Models\Category::create([
            'name' => 'MainForum 1',

            'children' => [
                [
                    'name' => 'Subforum 1.1',

                    'children' => [
                        [ 'name' => 'Subforum 1.1.1' ],
                        [ 'name' => 'Subforum 1.1.2' ],
                        [ 'name' => 'Subforum 1.1.3' ],
                    ],
                ],
                [
                    'name' => 'Subforum 1.2',

                    'children' => [
                        [ 'name' => 'Subforum 1.2.1' ],
                        [ 'name' => 'Subforum 1.2.2' ],
                        [ 'name' => 'Subforum 1.2.3' ],
                    ],
                ],
                [
                    'name' => 'Subforum 1.3',

                    'children' => [
                        [ 'name' => 'Subforum 1.3.1' ],
                        [ 'name' => 'Subforum 1.3.2' ],
                        [ 'name' => 'Subforum 1.3.3' ],
                    ],
                ],

            ],
        ]);
        $node = \Modules\CRM\Models\Category::create([
            'name' => 'MainForum 2',

            'children' => [
                [
                    'name' => 'Subforum 1.2',

                    'children' => [
                        [ 'name' => 'Subforum 2.1.1' ],
                        [ 'name' => 'Subforum 2.1.2' ],
                        [ 'name' => 'Subforum 2.1.3' ],
                    ],
                ],
                [
                    'name' => 'Subforum 2.2',

                    'children' => [
                        [ 'name' => 'Subforum 2.2.1' ],
                        [ 'name' => 'Subforum 2.2.2' ],
                        [ 'name' => 'Subforum 2.2.3' ],
                    ],
                ],
                [
                    'name' => 'Subforum 2.3',

                    'children' => [
                        [ 'name' => 'Subforum 2.3.1' ],
                        [ 'name' => 'Subforum 2.3.2' ],
                        [ 'name' => 'Subforum 2.3.3' ],
                    ],
                ],

            ],
        ]);
    }
}
