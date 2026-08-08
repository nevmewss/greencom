<?php

namespace App\Filament\Resources\Pages\RelationManagers;

use App\Filament\Resources\PageTranslations\PageTranslationResource;
use App\Models\Locale;
use App\Models\PageTranslation;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class TranslationsRelationManager extends RelationManager
{
    protected static string $relationship = 'translations';

    protected static ?string $title = 'Языковые версии';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('locale_id')
                    ->label('Язык')
                    ->options(function (): array {
                        $usedLocaleIds = $this->getOwnerRecord()
                            ->translations()
                            ->pluck('locale_id');

                        return Locale::query()
                            ->where('is_active', true)
                            ->whereNotIn('id', $usedLocaleIds)
                            ->orderBy('sort_order')
                            ->pluck('native_name', 'id')
                            ->all();
                    })
                    ->required(),
                TextInput::make('title')
                    ->label('Заголовок страницы')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('locale.native_name')
                    ->label('Язык')
                    ->badge()
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Заголовок')
                    ->searchable(),
                TextColumn::make('blocks_count')
                    ->label('Секций')
                    ->state(fn (PageTranslation $record): int => count($record->content ?? [])),
                TextColumn::make('updated_at')
                    ->label('Обновлено')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                CreateAction::make()
                    ->label('Добавить язык'),
            ])
            ->recordActions([
                EditAction::make()
                    ->label('Редактировать')
                    ->url(fn (PageTranslation $record): string => PageTranslationResource::getUrl('edit', ['record' => $record])),
                DeleteAction::make()
                    ->label('Удалить язык'),
            ]);
    }
}
