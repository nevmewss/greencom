<?php

namespace App\Filament\Resources\Pages\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Настройки страницы')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Название страницы')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('slug')
                            ->label('Адрес страницы')
                            ->disabled()
                            ->dehydrated(),
                        Toggle::make('is_published')
                            ->label('Опубликовано')
                            ->inline(false),
                        DateTimePicker::make('published_at')
                            ->label('Дата публикации')
                            ->seconds(false),
                    ]),
                Section::make('Контент страницы')
                    ->description('Языковые версии вынесены ниже в отдельную таблицу. Открывается только выбранный язык, поэтому редактор работает заметно быстрее.'),
            ]);
    }
}
