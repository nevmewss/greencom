<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(LocaleSeeder::class);
        $this->call(PageSeeder::class);

        if (env('CMS_ADMIN_EMAIL') && env('CMS_ADMIN_PASSWORD')) {
            User::query()->firstOrCreate(
                ['email' => env('CMS_ADMIN_EMAIL')],
                [
                    'name' => env('CMS_ADMIN_NAME', 'GreenCom Admin'),
                    'password' => env('CMS_ADMIN_PASSWORD'),
                    'email_verified_at' => now(),
                ],
            );
        }
    }
}
