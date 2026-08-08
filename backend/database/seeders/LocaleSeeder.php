<?php

namespace Database\Seeders;

use App\Models\Locale;
use Illuminate\Database\Seeder;

class LocaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locales = [
            ['code' => 'uk', 'name' => 'Ukrainian', 'native_name' => 'Українська', 'is_default' => true, 'sort_order' => 10],
            ['code' => 'ru', 'name' => 'Russian', 'native_name' => 'Русский', 'is_default' => false, 'sort_order' => 20],
            ['code' => 'en', 'name' => 'English', 'native_name' => 'English', 'is_default' => false, 'sort_order' => 30],
        ];

        foreach ($locales as $locale) {
            Locale::query()->firstOrCreate(
                ['code' => $locale['code']],
                [...$locale, 'is_active' => true],
            );
        }
    }
}
