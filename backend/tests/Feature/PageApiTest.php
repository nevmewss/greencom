<?php

namespace Tests\Feature;

use App\Filament\Resources\PageTranslations\PageTranslationResource;
use App\Models\Locale;
use App\Models\Page;
use App\Models\PageTranslation;
use App\Models\User;
use Database\Seeders\SitePageContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PageApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_a_published_page_by_slug(): void
    {
        $locale = Locale::factory()->create(['code' => 'ru', 'is_default' => true]);
        $page = Page::factory()->create(['slug' => 'home']);

        PageTranslation::factory()->create([
            'page_id' => $page->id,
            'locale_id' => $locale->id,
            'title' => 'GreenCom',
            'content' => [
                ['type' => 'heading', 'data' => ['text' => 'GreenCom']],
            ],
        ]);

        $this->getJson('/api/pages/home')
            ->assertOk()
            ->assertJsonPath('data.slug', 'home')
            ->assertJsonPath('data.locale', 'ru')
            ->assertJsonPath('data.blocks.0.data.text', 'GreenCom');
    }

    public function test_it_returns_the_requested_translation(): void
    {
        $uk = Locale::factory()->create([
            'code' => 'uk',
            'is_default' => true,
            'sort_order' => 10,
        ]);
        $en = Locale::factory()->create([
            'code' => 'en',
            'is_default' => false,
            'sort_order' => 20,
        ]);
        $page = Page::factory()->create(['slug' => 'about']);

        PageTranslation::factory()->create([
            'page_id' => $page->id,
            'locale_id' => $uk->id,
            'title' => 'Про нас',
        ]);
        PageTranslation::factory()->create([
            'page_id' => $page->id,
            'locale_id' => $en->id,
            'title' => 'About us',
        ]);

        $this->getJson('/api/pages/about?locale=en')
            ->assertOk()
            ->assertJsonPath('data.locale', 'en')
            ->assertJsonPath('data.title', 'About us')
            ->assertJsonCount(2, 'data.available_locales');
    }

    public function test_it_returns_uploaded_media_as_an_absolute_cms_url(): void
    {
        Storage::fake('public');
        $locale = Locale::factory()->create(['code' => 'uk', 'is_default' => true]);
        $page = Page::factory()->create(['slug' => 'about']);

        PageTranslation::factory()->create([
            'page_id' => $page->id,
            'locale_id' => $locale->id,
            'content' => [[
                'type' => 'about_hero',
                'data' => [
                    'images' => [[
                        'breakpoint' => 'desktop',
                        'image' => 'page-content/hero.webp',
                    ]],
                ],
            ]],
        ]);

        $this->getJson('/api/pages/about')
            ->assertOk()
            ->assertJsonPath('data.blocks.0.data.images.0.image', url('/storage/page-content/hero.webp'));
    }

    public function test_it_rejects_an_unknown_locale(): void
    {
        Locale::factory()->create(['code' => 'ru', 'is_default' => true]);
        Page::factory()->create(['slug' => 'home']);

        $this->getJson('/api/pages/home?locale=de')->assertNotFound();
    }

    public function test_it_lists_active_locales_only(): void
    {
        Locale::factory()->create(['code' => 'ru', 'is_default' => true]);
        Locale::factory()->create(['code' => 'en', 'is_default' => false, 'is_active' => false]);

        $this->getJson('/api/locales')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.code', 'ru');
    }

    public function test_it_hides_unpublished_pages(): void
    {
        Page::factory()->create([
            'slug' => 'draft',
            'is_published' => false,
            'published_at' => null,
        ]);

        $this->getJson('/api/pages/draft')->assertNotFound();
    }

    public function test_an_authenticated_admin_can_open_the_pages_screen(): void
    {
        $this->actingAs(User::factory()->create())
            ->get('/admin/pages')
            ->assertOk();
    }

    public function test_an_authenticated_admin_can_open_the_page_builder_and_locales(): void
    {
        $page = Page::factory()->create();
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get("/admin/pages/{$page->id}/edit")
            ->assertOk();

        $this->actingAs($user)
            ->get('/admin/locales')
            ->assertOk();
    }

    public function test_an_authenticated_admin_loads_only_one_language_builder_at_a_time(): void
    {
        $locale = Locale::factory()->create(['code' => 'uk', 'is_default' => true]);
        $page = Page::factory()->create(['slug' => 'about']);
        $translation = PageTranslation::factory()->create([
            'page_id' => $page->id,
            'locale_id' => $locale->id,
            'content' => SitePageContent::for('about'),
        ]);

        $this->actingAs(User::factory()->create())
            ->get(PageTranslationResource::getUrl('edit', ['record' => $translation]))
            ->assertOk()
            ->assertSee('Hero — главная страница со слайдером')
            ->assertSee('Hero — внутренний расширенный')
            ->assertSee('Hero — внутренний компактный')
            ->assertSee('Hero — страница 404')
            ->assertSee('Шапка — для главной страницы')
            ->assertSee('Шапка — для внутренних страниц')
            ->assertSee('Текстовый блок')
            ->assertSee('Карта')
            ->assertSee('Партнёры')
            ->assertDontSee('Вставить между')
            ->assertDontSee('Хлебная крошка')
            ->assertDontSee('Alt-текст');
    }
}
