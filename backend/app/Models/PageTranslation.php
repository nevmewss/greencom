<?php

namespace App\Models;

use Database\Factories\PageTranslationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageTranslation extends Model
{
    /** @use HasFactory<PageTranslationFactory> */
    use HasFactory;

    protected $fillable = [
        'locale_id',
        'title',
        'meta_title',
        'meta_description',
        'content',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    public function locale(): BelongsTo
    {
        return $this->belongsTo(Locale::class);
    }

    protected function casts(): array
    {
        return [
            'content' => 'array',
        ];
    }
}
