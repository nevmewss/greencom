<?php

namespace App\Filament\Resources\Locales\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LocaleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Язык сайта')
                    ->columns(2)
                    ->schema([
                        TextInput::make('code')
                            ->label('Код языка')
                            ->placeholder('uk')
                            ->alphaDash()
                            ->unique(ignoreRecord: true)
                            ->required()
                            ->maxLength(10),
                        TextInput::make('name')
                            ->label('Название на английском')
                            ->placeholder('Ukrainian')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('native_name')
                            ->label('Название на родном языке')
                            ->placeholder('Українська')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('sort_order')
                            ->label('Порядок в переключателе языков')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        Toggle::make('is_active')
                            ->label('Доступен на сайте')
                            ->default(true),
                        Toggle::make('is_default')
                            ->label('Язык по умолчанию')
                            ->helperText('При включении предыдущий язык по умолчанию будет отключён.')
                            ->default(false),
                    ]),
            ]);
    }
}
