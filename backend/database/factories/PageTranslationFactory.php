<?php

namespace Database\Factories;

use App\Models\Locale;
use App\Models\Page;
use App\Models\PageTranslation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PageTranslation>
 */
class PageTranslationFactory extends Factory
{
    protected $model = PageTranslation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'page_id' => Page::factory(),
            'locale_id' => Locale::factory(),
            'title' => fake()->sentence(4),
            'meta_title' => fake()->sentence(4),
            'meta_description' => fake()->sentence(),
            'content' => [],
        ];
    }
}
