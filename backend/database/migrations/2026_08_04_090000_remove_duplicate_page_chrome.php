<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        foreach (DB::table('page_translations')->select('id', 'content')->get() as $translation) {
            $content = json_decode((string) $translation->content, true);

            if (! is_array($content)) {
                continue;
            }

            $seenHeader = false;
            $seenFooter = false;
            $filtered = [];

            foreach ($content as $block) {
                $type = is_array($block) ? ($block['type'] ?? null) : null;
                $isHeader = in_array($type, ['site_header', 'home_header', 'inner_header'], true);
                $isFooter = $type === 'site_footer';

                if (($isHeader && $seenHeader) || ($isFooter && $seenFooter)) {
                    continue;
                }

                $seenHeader = $seenHeader || $isHeader;
                $seenFooter = $seenFooter || $isFooter;
                $filtered[] = $block;
            }

            if (count($filtered) !== count($content)) {
                DB::table('page_translations')
                    ->where('id', $translation->id)
                    ->update(['content' => json_encode($filtered, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
            }
        }
    }

    public function down(): void
    {
        // Duplicate chrome blocks are invalid and are intentionally not restored.
    }
};
