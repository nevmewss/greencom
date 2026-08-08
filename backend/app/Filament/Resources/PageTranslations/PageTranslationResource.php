<?php

namespace App\Filament\Resources\PageTranslations;

use App\Filament\Resources\PageTranslations\Pages\EditPageTranslation;
use App\Filament\Resources\PageTranslations\Pages\ListPageTranslations;
use App\Filament\Resources\PageTranslations\Schemas\PageTranslationForm;
use App\Filament\Resources\PageTranslations\Tables\PageTranslationsTable;
use App\Models\PageTranslation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PageTranslationResource extends Resource
{
    protected static ?string $model = PageTranslation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static bool $shouldRegisterNavigation = false;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $modelLabel = 'языковая версия';

    protected static ?string $pluralModelLabel = 'языковые версии';

    public static function form(Schema $schema): Schema
    {
        return PageTranslationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PageTranslationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPageTranslations::route('/'),
            'edit' => EditPageTranslation::route('/{record}/edit'),
        ];
    }
}
