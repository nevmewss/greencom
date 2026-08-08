<?php

namespace Database\Seeders;

use App\Models\Locale;
use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            ['slug' => 'home', 'name' => 'Головна', 'titles' => ['uk' => 'GreenCom', 'ru' => 'GreenCom', 'en' => 'GreenCom']],
            ['slug' => 'about', 'name' => 'Про нас', 'titles' => ['uk' => 'Про нас', 'ru' => 'О нас', 'en' => 'About us']],
            ['slug' => 'contact', 'name' => 'Контакти', 'titles' => ['uk' => 'Контакти', 'ru' => 'Контакты', 'en' => 'Contacts']],
            ['slug' => 'price', 'name' => 'Прайс', 'titles' => ['uk' => 'Прайс', 'ru' => 'Прайс', 'en' => 'Price']],
            ['slug' => '404', 'name' => 'Сторінка 404', 'titles' => ['uk' => 'Сторінку не знайдено', 'ru' => 'Страница не найдена', 'en' => 'Page not found']],
        ];

        foreach ($pages as $page) {
            $record = Page::query()->firstOrCreate(
                ['slug' => $page['slug']],
                [
                    'name' => $page['name'],
                    'title' => $page['titles']['uk'],
                    'content' => [],
                    'is_published' => true,
                    'published_at' => now(),
                ],
            );

            foreach (Locale::query()->get() as $locale) {
                $translation = $record->translations()->firstOrCreate(
                    ['locale_id' => $locale->id],
                    [
                        'title' => $page['titles'][$locale->code] ?? $page['titles']['uk'],
                        'meta_title' => $page['titles'][$locale->code] ?? $page['titles']['uk'],
                        'content' => [],
                    ],
                );

                if (empty($translation->content)) {
                    $translation->update([
                        'content' => SitePageContent::for($page['slug']),
                    ]);
                } else {
                    $content = $translation->content;
                    $types = array_column($content, 'type');

                    if (count(array_intersect(['site_header', 'home_header', 'inner_header'], $types)) === 0) {
                        array_unshift($content, SitePageContent::for($page['slug'])[0]);
                    }

                    if (! in_array('site_footer', $types, true)) {
                        $seededContent = SitePageContent::for($page['slug']);
                        $content[] = $seededContent[array_key_last($seededContent)];
                    }

                    $translation->update(['content' => $content]);
                }
            }
        }
    }
}
