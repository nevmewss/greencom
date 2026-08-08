<?php

namespace Database\Factories;

use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(),
            'name' => fake()->words(3, true),
            'title' => fake()->sentence(5),
            'meta_title' => fake()->sentence(5),
            'meta_description' => fake()->sentence(),
            'content' => [],
            'is_published' => true,
            'published_at' => now(),
        ];
    }
}
