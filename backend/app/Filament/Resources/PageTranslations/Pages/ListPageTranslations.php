<?php

namespace App\Filament\Resources\PageTranslations\Pages;

use App\Filament\Resources\PageTranslations\PageTranslationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPageTranslations extends ListRecords
{
    protected static string $resource = PageTranslationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
