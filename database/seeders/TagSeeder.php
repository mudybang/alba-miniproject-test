<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'Back End',
                'slug' => \Str::slug('Back End'),
                'created_at' => now(),
            ],
            [
                'name' => 'Front End',
                'slug' => \Str::slug('Front End'),
                'created_at' => now(),
            ],
            [
                'name' => 'Dev Ops',
                'slug' => \Str::slug('Dev Ops'),
                'created_at' => now(),
            ],
            [
                'name' => 'Networking',
                'slug' => \Str::slug('Networking'),
                'created_at' => now(),
            ],
            [
                'name' => 'Troubleshoot',
                'slug' => \Str::slug('Troubleshoot'),
                'created_at' => now(),
            ],
        ];
        Tag::insert($data);
    }
}
