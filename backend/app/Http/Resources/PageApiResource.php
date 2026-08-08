<?php

namespace App\Http\Resources;

use App\Models\PageTranslation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PageApiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $translation = $this->resolveTranslation($request);

        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'locale' => $translation?->locale?->code,
            'available_locales' => $this->translations
                ->filter(fn (PageTranslation $item): bool => (bool) $item->locale?->is_active)
                ->sortBy(fn (PageTranslation $item): int => $item->locale->sort_order)
                ->map(fn (PageTranslation $item): array => [
                    'code' => $item->locale->code,
                    'name' => $item->locale->native_name,
                ])
                ->values(),
            'title' => $translation?->title,
            'seo' => [
                'title' => $translation?->meta_title,
                'description' => $translation?->meta_description,
            ],
            'blocks' => $this->normalizeMediaUrls($translation?->content ?? []),
            'published_at' => $this->published_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function resolveTranslation(Request $request): ?PageTranslation
    {
        $requestedCode = $request->query('locale');

        if ($requestedCode !== null) {
            $requestedTranslation = $this->translations->first(
                fn (PageTranslation $translation): bool => $translation->locale?->is_active
                    && $translation->locale->code === $requestedCode,
            );

            if ($requestedTranslation !== null) {
                return $requestedTranslation;
            }
        }

        return $this->translations->first(
            fn (PageTranslation $translation): bool => $translation->locale?->is_active
                && $translation->locale->is_default,
        ) ?? $this->translations->first(
            fn (PageTranslation $translation): bool => (bool) $translation->locale?->is_active,
        );
    }

    /**
     * @param  array<int, array<string, mixed>>  $blocks
     * @return array<int, array<string, mixed>>
     */
    private function normalizeMediaUrls(array $blocks): array
    {
        return $this->normalizeValue($blocks);
    }

    private function normalizeValue(mixed $value, ?string $key = null): mixed
    {
        if (is_array($value)) {
            foreach ($value as $itemKey => $itemValue) {
                $value[$itemKey] = $this->normalizeValue($itemValue, (string) $itemKey);
            }

            return $value;
        }

        if (is_string($value) && in_array($key, ['image', 'icon', 'sticker', 'left_image', 'right_image'], true)) {
            return url(Storage::disk('public')->url($value));
        }

        return $value;
    }
}
