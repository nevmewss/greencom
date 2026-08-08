<?php

namespace App\Filament\Resources\Pages\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Сторінка')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label('Адрес')
                    ->badge(),
                TextColumn::make('translations_count')
                    ->label('Языков')
                    ->counts('translations'),
                IconColumn::make('is_published')
                    ->label('Опубліковано')
                    ->boolean(),
                TextColumn::make('updated_at')
                    ->label('Оновлено')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->defaultSort('id');
    }
}
