<?php

namespace App\Filament\Resources\PageTranslations\Pages;

use App\Filament\Resources\PageTranslations\PageTranslationResource;
use Filament\Resources\Pages\EditRecord;

class EditPageTranslation extends EditRecord
{
    protected static string $resource = PageTranslationResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
