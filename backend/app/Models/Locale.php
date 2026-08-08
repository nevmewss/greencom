<?php

namespace App\Models;

use Database\Factories\LocaleFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Locale extends Model
{
    /** @use HasFactory<LocaleFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'native_name',
        'is_default',
        'is_active',
        'sort_order',
    ];

    protected static function booted(): void
    {
        static::saving(function (Locale $locale): void {
            if ($locale->is_default) {
                $locale->is_active = true;
            }
        });

        static::saved(function (Locale $locale): void {
            if ($locale->is_default) {
                static::query()
                    ->whereKeyNot($locale->getKey())
                    ->update(['is_default' => false]);
            }
        });
    }

    public function translations(): HasMany
    {
        return $this->hasMany(PageTranslation::class);
    }

    protected function casts(): array
    {
        return [
            'is_default' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
