<?php

namespace Tests\Unit;

use Database\Seeders\SitePageContent;
use PHPUnit\Framework\TestCase;

class SitePageContentTest extends TestCase
{
    public function test_seeded_content_matches_the_sections_in_the_existing_pages(): void
    {
        $this->assertSame([
            'home_header',
            'home_hero',
            'benefits',
            'services',
            'about_teaser',
            'partners',
            'news',
            'contact_section',
            'newsletter',
            'site_footer',
        ], $this->typesFor('home'));

        $this->assertSame([
            'inner_header',
            'about_hero',
            'about_overview',
            'achievements',
            'team',
            'history',
            'partners',
            'contact_section',
            'newsletter',
            'site_footer',
        ], $this->typesFor('about'));

        $this->assertSame([
            'inner_header',
            'contact_hero',
            'office',
            'map',
            'faq',
            'contact_form',
            'newsletter',
            'site_footer',
        ], $this->typesFor('contact'));

        $this->assertSame(['inner_header', 'not_found', 'site_footer'], $this->typesFor('404'));

        $this->assertSame([
            'inner_header',
            'price_hero',
            'price_list',
            'newsletter',
            'site_footer',
        ], $this->typesFor('price'));
    }

    /** @return array<int, string> */
    private function typesFor(string $slug): array
    {
        return array_column(SitePageContent::for($slug), 'type');
    }
}
