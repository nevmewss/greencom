<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $this->replaceHeaderTypes(
            fn (string $type, string $slug): string => $type === 'site_header'
                ? ($slug === 'home' ? 'home_header' : 'inner_header')
                : $type,
        );
    }

    public function down(): void
    {
        $this->replaceHeaderTypes(
            fn (string $type): string => in_array($type, ['home_header', 'inner_header'], true)
                ? 'site_header'
                : $type,
        );
    }

    private function replaceHeaderTypes(Closure $replace): void
    {
        $translations = DB::table('page_translations')
            ->join('pages', 'pages.id', '=', 'page_translations.page_id')
            ->select('page_translations.id', 'page_translations.content', 'pages.slug')
            ->get();

        foreach ($translations as $translation) {
            $content = json_decode((string) $translation->content, true);

            if (! is_array($content)) {
                continue;
            }

            $changed = false;

            foreach ($content as &$block) {
                if (! is_array($block) || ! isset($block['type'])) {
                    continue;
                }

                $type = (string) $block['type'];
                $nextType = $replace($type, (string) $translation->slug);

                if ($type === $nextType) {
                    continue;
                }

                $block['type'] = $nextType;
                $changed = true;
            }
            unset($block);

            if ($changed) {
                DB::table('page_translations')
                    ->where('id', $translation->id)
                    ->update(['content' => json_encode($content, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
            }
        }
    }
};
