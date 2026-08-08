<?php

namespace App\Filament\Resources\PageTranslations\Schemas;

use App\Filament\Forms\ContentBlockBuilder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PageTranslationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Языковая версия')
                    ->columns(2)
                    ->schema([
                        Select::make('page_id')
                            ->label('Страница')
                            ->relationship('page', 'name')
                            ->disabledOn('edit')
                            ->required(),
                        Select::make('locale_id')
                            ->label('Язык')
                            ->relationship('locale', 'native_name')
                            ->disabledOn('edit')
                            ->required(),
                        TextInput::make('title')
                            ->label('Заголовок страницы')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ]),
                Section::make('SEO')
                    ->columns(2)
                    ->collapsed()
                    ->schema([
                        TextInput::make('meta_title')
                            ->label('SEO-заголовок')
                            ->maxLength(255),
                        Textarea::make('meta_description')
                            ->label('SEO-описание')
                            ->rows(3)
                            ->maxLength(500),
                    ]),
                ContentBlockBuilder::make('content'),
            ]);
    }
}
