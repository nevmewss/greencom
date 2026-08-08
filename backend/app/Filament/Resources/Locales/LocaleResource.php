<?php

namespace App\Filament\Resources\Locales;

use App\Filament\Resources\Locales\Pages\CreateLocale;
use App\Filament\Resources\Locales\Pages\EditLocale;
use App\Filament\Resources\Locales\Pages\ListLocales;
use App\Filament\Resources\Locales\Schemas\LocaleForm;
use App\Filament\Resources\Locales\Tables\LocalesTable;
use App\Models\Locale;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LocaleResource extends Resource
{
    protected static ?string $model = Locale::class;

    protected static ?string $recordTitleAttribute = 'native_name';

    protected static ?string $navigationLabel = 'Языки';

    protected static ?string $modelLabel = 'язык';

    protected static ?string $pluralModelLabel = 'языки';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedLanguage;

    public static function form(Schema $schema): Schema
    {
        return LocaleForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LocalesTable::configure($table);
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
            'index' => ListLocales::route('/'),
            'create' => CreateLocale::route('/create'),
            'edit' => EditLocale::route('/{record}/edit'),
        ];
    }
}
