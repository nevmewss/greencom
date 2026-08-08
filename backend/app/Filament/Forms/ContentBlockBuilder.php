<?php

namespace App\Filament\Forms;

use Filament\Actions\Action;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Fieldset;
use Filament\Support\Icons\Heroicon;

class ContentBlockBuilder
{
    public static function make(string $name): Builder
    {
        return Builder::make($name)
            ->label('Секции страницы')
            ->helperText('Здесь находятся только секции и компоненты, которые уже используются в вёрстке GreenCom.')
            ->blocks(self::blocks())
            ->addActionLabel('Добавить существующую секцию')
            ->blockPickerColumns(2)
            ->blockPickerWidth('3xl')
            ->blockIcons()
            ->blockNumbers(false)
            ->addBetweenAction(fn (Action $action): Action => $action->hidden())
            ->collapsible()
            ->collapsed()
            ->cloneable()
            ->reorderableWithButtons()
            ->extraFieldWrapperAttributes(['class' => 'cms-page-sections'])
            ->columnSpanFull();
    }

    /** @return array<int, Block> */
    private static function blocks(): array
    {
        return [
            self::homeHeader(),
            self::innerHeader(),
            self::homeHero(),
            self::aboutHero(),
            self::contactHero(),
            self::priceHero(),
            self::priceList(),
            self::notFound(),
            self::aboutOverview(),
            self::benefits(),
            self::services(),
            self::aboutTeaser(),
            self::achievements(),
            self::team(),
            self::history(),
            self::partners(),
            self::news(),
            self::office(),
            self::map(),
            self::faq(),
            self::contactSection(),
            self::contactFormSection(),
            self::newsletter(),
            self::siteFooter(),
        ];
    }

    private static function homeHeader(): Block
    {
        return self::header(
            'home_header',
            'Шапка — для главной страницы',
            'Используется вместе с Hero главной страницы.',
        );
    }

    private static function innerHeader(): Block
    {
        return self::header(
            'inner_header',
            'Шапка — для внутренних страниц',
            'Используется вместе с Hero внутренних страниц и страницей 404.',
        );
    }

    private static function header(string $name, string $label, string $description): Block
    {
        return self::block($name, $label, Heroicon::OutlinedBars3, [
            Placeholder::make('usage_note')
                ->label('Назначение')
                ->content($description)
                ->columnSpanFull(),
            self::assetPath('logo_url', 'Текущий логотип'),
            self::imageUpload('logo', 'Заменить логотип'),
            TextInput::make('email')->label('Электронная почта в верхней строке'),
            TextInput::make('phone')->label('Телефон в верхней строке'),
            self::items('top_links', 'Ссылки верхней строки', [
                TextInput::make('label')->label('Название'),
                TextInput::make('url')->label('Ссылка'),
            ]),
            self::items('nav_items', 'Главное меню и выпадающие пункты', [
                Select::make('group')
                    ->label('Раздел меню')
                    ->options([
                        'main' => 'Основное меню',
                        'services' => 'Выпадающее меню «Услуги»',
                        'equipment' => 'Выпадающее меню «Оборудование»',
                    ]),
                TextInput::make('label')->label('Название'),
                TextInput::make('url')->label('Ссылка'),
            ]),
            self::items('currencies', 'Валюты', [TextInput::make('value')->label('Обозначение валюты')]),
            self::items('languages', 'Языки в переключателе', [TextInput::make('value')->label('Обозначение языка')]),
            TextInput::make('search_label')->label('Текст кнопки поиска'),
            TextInput::make('login_label')->label('Текст кнопки входа'),
            TextInput::make('cart_label')->label('Название корзины'),
            self::enabledToggle(),
        ]);
    }

    private static function homeHero(): Block
    {
        return self::block('home_hero', 'Hero — главная страница со слайдером', Heroicon::OutlinedHome, [
            TextInput::make('pill')->label('Надпись над заголовком'),
            self::enabledToggle(),
            TextInput::make('title_prefix')->label('Заголовок: первая часть'),
            TextInput::make('title_highlight')->label('Заголовок: выделенная часть'),
            TextInput::make('title_main')->label('Главная крупная строка'),
            TextInput::make('title_suffix')->label('Последняя строка'),
            ...self::buttonFields('primary_button', 'Основная кнопка'),
            ...self::buttonFields('secondary_button', 'Вторая кнопка'),
            self::responsiveImages('Фон первого экрана'),
            self::items('stats', 'Карточки со статистикой', [
                TextInput::make('value')->label('Значение'),
                TextInput::make('text')->label('Подпись'),
                TextInput::make('url')->label('Ссылка'),
            ]),
            self::items('slides', 'Слайды карточки автоматизации', [
                TextInput::make('title')->label('Заголовок'),
                TextInput::make('accent')->label('Выделенная часть'),
                Textarea::make('text')->label('Описание')->rows(3),
                TextInput::make('button_label')->label('Текст ссылки'),
                TextInput::make('url')->label('Ссылка'),
            ]),
        ]);
    }

    private static function benefits(): Block
    {
        return self::block('benefits', 'Преимущества', Heroicon::OutlinedSparkles, [
            ...self::sectionHeading(),
            ...self::buttonFields(),
            self::items('items', 'Карточки преимуществ', [
                TextInput::make('title')->label('Заголовок'),
                Textarea::make('text')->label('Описание')->rows(3),
                self::assetPath('icon_url', 'Текущая иконка'),
                self::imageUpload('icon', 'Заменить иконку'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function services(): Block
    {
        return self::block('services', 'Услуги и оборудование', Heroicon::OutlinedSquares2x2, [
            ...self::sectionHeading(),
            self::assetPath('sticker_url', 'Текущий стикер'),
            self::imageUpload('sticker', 'Заменить стикер'),
            self::items('items', 'Карточки услуг', [
                TextInput::make('tag')->label('Категория'),
                TextInput::make('title')->label('Название'),
                Textarea::make('text')->label('Описание')->rows(3),
                TextInput::make('button_label')->label('Текст кнопки'),
                TextInput::make('url')->label('Ссылка'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function aboutTeaser(): Block
    {
        return self::block('about_teaser', 'Коротко о компании', Heroicon::OutlinedBuildingOffice2, [
            ...self::sectionHeading(),
            RichEditor::make('text')->label('Основной текст')->columnSpanFull(),
            self::assetPath('image_url', 'Текущее изображение'),
            self::imageUpload('image', 'Заменить изображение'),
            TextInput::make('clients_value')->label('Количество клиентов'),
            TextInput::make('clients_text')->label('Подпись клиентов'),
            self::items('advantages', 'Пункты преимуществ', [TextInput::make('text')->label('Текст')]),
            TextInput::make('experience_value')->label('Лет опыта'),
            TextInput::make('experience_text')->label('Подпись опыта'),
            TextInput::make('phone_label')->label('Подпись телефона'),
            TextInput::make('phone')->label('Телефон'),
            ...self::buttonFields(),
            self::enabledToggle(),
        ]);
    }

    private static function partners(): Block
    {
        return self::block('partners', 'Партнёры', Heroicon::OutlinedUserGroup, [
            ...self::sectionHeading(),
            ...self::buttonFields(),
            self::items('logos', 'Логотипы партнёров', [
                self::assetPath('image_url', 'Текущий логотип'),
                self::imageUpload('image', 'Заменить логотип'),
                TextInput::make('alt')->label('Название компании'),
                TextInput::make('url')->label('Ссылка'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function news(): Block
    {
        return self::block('news', 'Новости', Heroicon::OutlinedNewspaper, [
            ...self::sectionHeading(),
            ...self::buttonFields('all_news_button', 'Кнопка «Все новости»'),
            self::items('items', 'Карточки новостей', [
                self::assetPath('image_url', 'Текущее изображение'),
                self::imageUpload('image', 'Заменить изображение'),
                TextInput::make('author')->label('Автор'),
                TextInput::make('date')->label('Дата'),
                TextInput::make('category')->label('Категория'),
                TextInput::make('title')->label('Заголовок'),
                Textarea::make('text')->label('Краткий текст')->rows(3),
                TextInput::make('button_label')->label('Текст кнопки'),
                TextInput::make('url')->label('Ссылка'),
                Toggle::make('featured')->label('Большая карточка'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function contactSection(): Block
    {
        return self::block('contact_section', 'Контакты и форма', Heroicon::OutlinedPhone, [
            ...self::sectionHeading(),
            RichEditor::make('text')->label('Описание')->columnSpanFull(),
            self::contactMethods(),
            ...self::contactFormSchema(),
            self::enabledToggle(),
        ]);
    }

    private static function newsletter(): Block
    {
        return self::block('newsletter', 'Подписка на рассылку', Heroicon::OutlinedEnvelope, [
            TextInput::make('title')->label('Заголовок'),
            self::enabledToggle(),
            Textarea::make('text')->label('Описание')->rows(3)->columnSpanFull(),
            TextInput::make('email_placeholder')->label('Подсказка в поле Email'),
            TextInput::make('button_label')->label('Текст кнопки'),
            Textarea::make('consent')->label('Текст согласия')->rows(2)->columnSpanFull(),
            self::assetPath('left_image_url', 'Левая декорация'),
            self::imageUpload('left_image', 'Заменить левую декорацию'),
            self::assetPath('right_image_url', 'Правая декорация'),
            self::imageUpload('right_image', 'Заменить правую декорацию'),
        ]);
    }

    private static function aboutHero(): Block
    {
        return self::block('about_hero', 'Hero — внутренний расширенный', Heroicon::OutlinedPhoto, [
            TextInput::make('breadcrumb')->label('Название страницы в навигации'),
            TextInput::make('eyebrow')->label('Маленькая подпись над заголовком'),
            Textarea::make('title')->label('Главный заголовок')->rows(3)->columnSpanFull(),
            RichEditor::make('text')->label('Описание')->columnSpanFull(),
            ...self::buttonFields(),
            self::responsiveImages('Изображение первого экрана'),
            self::enabledToggle(),
        ]);
    }

    private static function aboutOverview(): Block
    {
        return self::block('about_overview', 'Текстовый блок', Heroicon::OutlinedDocumentText, [
            ...self::sectionHeading(),
            self::items('paragraphs', 'Абзацы', [RichEditor::make('text')->label('Текст')]),
            self::enabledToggle(),
        ]);
    }

    private static function achievements(): Block
    {
        return self::block('achievements', 'Достижения', Heroicon::OutlinedChartBar, [
            ...self::sectionHeading(),
            self::items('items', 'Показатели', [
                TextInput::make('value')->label('Значение'),
                Textarea::make('text')->label('Описание')->rows(2),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function team(): Block
    {
        return self::block('team', 'Команда', Heroicon::OutlinedUsers, [
            ...self::sectionHeading(),
            Textarea::make('text')->label('Описание')->rows(3)->columnSpanFull(),
            self::items('items', 'Сотрудники', [
                TextInput::make('role')->label('Должность / направление'),
                TextInput::make('name')->label('Имя'),
                self::assetPath('image_url', 'Текущее фото'),
                self::imageUpload('image', 'Заменить фото'),
                TextInput::make('alt')->label('Описание фотографии'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function history(): Block
    {
        return self::block('history', 'История компании', Heroicon::OutlinedClock, [
            ...self::sectionHeading(),
            self::assetPath('image_url', 'Текущее изображение'),
            self::imageUpload('image', 'Заменить изображение'),
            TextInput::make('image_alt')->label('Описание изображения'),
            self::items('items', 'Этапы истории', [
                TextInput::make('year')->label('Год'),
                TextInput::make('title')->label('Заголовок'),
                Textarea::make('text')->label('Описание')->rows(3),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function contactHero(): Block
    {
        return self::block('contact_hero', 'Hero — внутренний компактный', Heroicon::OutlinedPhoto, [
            TextInput::make('breadcrumb')->label('Название страницы в навигации'),
            TextInput::make('title')->label('Главный заголовок'),
            Textarea::make('text')->label('Описание')->rows(4)->columnSpanFull(),
            self::responsiveImages('Изображение первого экрана'),
            self::enabledToggle(),
        ]);
    }

    private static function priceHero(): Block
    {
        return self::block('price_hero', 'Hero — прайс', Heroicon::OutlinedPhoto, [
            TextInput::make('breadcrumb')->label('Название страницы в навигации'),
            TextInput::make('title')->label('Главный заголовок'),
            Textarea::make('text')->label('Описание')->rows(4)->columnSpanFull(),
            self::responsiveImages('Изображение первого экрана'),
            self::enabledToggle(),
        ]);
    }

    private static function priceList(): Block
    {
        return self::block('price_list', 'Прайс-лист', Heroicon::OutlinedCurrencyDollar, [
            TextInput::make('aria_label')->label('Подпись секции для доступности'),
            self::items('items', 'Позиции прайс-листа', [
                TextInput::make('title')->label('Название'),
                Textarea::make('text')->label('Описание')->rows(3),
                TextInput::make('price')->label('Цена'),
                self::assetPath('icon_url', 'Текущая иконка'),
                self::imageUpload('icon', 'Заменить иконку'),
                self::assetPath('effect_url', 'Текущий декоративный эффект'),
                self::imageUpload('effect', 'Заменить декоративный эффект'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function office(): Block
    {
        return self::block('office', 'Главный офис', Heroicon::OutlinedBuildingOffice, [
            ...self::sectionHeading(),
            self::assetPath('image_url', 'Текущее фото офиса'),
            self::imageUpload('image', 'Заменить фото офиса'),
            TextInput::make('image_alt')->label('Описание фотографии'),
            self::contactMethods(),
            self::enabledToggle(),
        ]);
    }

    private static function map(): Block
    {
        return self::block('map', 'Карта', Heroicon::OutlinedMap, [
            self::assetPath('image_url', 'Текущее изображение карты'),
            self::imageUpload('image', 'Заменить карту'),
            TextInput::make('image_alt')->label('Описание карты'),
            Textarea::make('address')->label('Адрес на карте')->rows(3),
            TextInput::make('map_url')->label('Ссылка на карту'),
            self::enabledToggle(),
        ]);
    }

    private static function faq(): Block
    {
        return self::block('faq', 'Частые вопросы', Heroicon::OutlinedQuestionMarkCircle, [
            ...self::sectionHeading(),
            Textarea::make('text')->label('Описание')->rows(3)->columnSpanFull(),
            ...self::buttonFields(),
            self::items('items', 'Вопросы и ответы', [
                TextInput::make('title')->label('Вопрос'),
                RichEditor::make('answer')->label('Ответ'),
            ]),
            self::enabledToggle(),
        ]);
    }

    private static function contactFormSection(): Block
    {
        return self::block('contact_form', 'Форма обратной связи', Heroicon::OutlinedChatBubbleLeftRight, [
            ...self::sectionHeading(),
            Textarea::make('text')->label('Описание')->rows(3)->columnSpanFull(),
            ...self::contactFormSchema(),
            self::enabledToggle(),
        ]);
    }

    private static function notFound(): Block
    {
        return self::block('not_found', 'Hero — страница 404', Heroicon::OutlinedExclamationTriangle, [
            TextInput::make('code')->label('Код ошибки'),
            TextInput::make('breadcrumb')->label('Название страницы в навигации'),
            Textarea::make('title')->label('Сообщение об ошибке')->rows(2)->columnSpanFull(),
            self::items('paragraphs', 'Абзацы', [RichEditor::make('text')->label('Текст')]),
            ...self::buttonFields(),
            self::assetPath('image_url', 'Текущее изображение'),
            self::imageUpload('image', 'Заменить изображение'),
            TextInput::make('image_alt')->label('Описание изображения'),
            self::enabledToggle(),
        ]);
    }

    private static function siteFooter(): Block
    {
        return self::block('site_footer', 'Подвал сайта', Heroicon::OutlinedBars3BottomLeft, [
            self::assetPath('logo_url', 'Текущий логотип'),
            self::imageUpload('logo', 'Заменить логотип'),
            TextInput::make('contact_title')->label('Заголовок контактов'),
            TextInput::make('email')->label('Электронная почта'),
            TextInput::make('phone')->label('Телефон'),
            TextInput::make('address_title')->label('Заголовок адреса'),
            Textarea::make('address')->label('Адрес')->rows(2),
            self::items('columns', 'Колонки ссылок', [
                TextInput::make('title')->label('Название колонки'),
                Repeater::make('links')
                    ->label('Ссылки')
                    ->schema([
                        TextInput::make('label')->label('Название'),
                        TextInput::make('url')->label('Ссылка'),
                    ])
                    ->reorderableWithButtons()
                    ->cloneable()
                    ->collapsible()
                    ->columnSpanFull(),
            ]),
            TextInput::make('copyright')->label('Текст об авторских правах'),
            self::items('socials', 'Социальные ссылки', [
                TextInput::make('label')->label('Название'),
                TextInput::make('url')->label('Ссылка'),
                self::assetPath('icon_url', 'Текущая иконка'),
                self::imageUpload('icon', 'Заменить иконку'),
            ]),
            self::enabledToggle(),
        ]);
    }

    /** @param array<int, mixed> $schema */
    private static function block(string $name, string $label, Heroicon $icon, array $schema): Block
    {
        return Block::make($name)
            ->label($label)
            ->icon($icon)
            ->schema($schema)
            ->columns(2);
    }

    /** @return array<int, mixed> */
    private static function sectionHeading(): array
    {
        return [
            TextInput::make('eyebrow')->label('Маленькая подпись над заголовком'),
            Textarea::make('title')->label('Заголовок секции')->rows(2),
        ];
    }

    /** @return array<int, mixed> */
    private static function buttonFields(string $prefix = 'button', string $label = 'Кнопка'): array
    {
        return [
            Fieldset::make($label)
                ->schema([
                    TextInput::make("{$prefix}_label")->label('Текст'),
                    TextInput::make("{$prefix}_url")->label('Ссылка'),
                ])
                ->columns(2)
                ->extraAttributes(['class' => 'cms-button-group'])
                ->columnSpanFull(),
        ];
    }

    private static function responsiveImages(string $label): Repeater
    {
        return self::items('images', $label, [
            Select::make('breakpoint')
                ->label('Для какого экрана')
                ->options([
                    'desktop' => 'Компьютер',
                    'tablet' => 'Планшет',
                    'mobile' => 'Телефон',
                ]),
            self::assetPath('image_url', 'Текущий файл'),
            self::imageUpload('image', 'Заменить файл'),
            TextInput::make('alt')->label('Описание изображения'),
        ]);
    }

    private static function contactMethods(): Repeater
    {
        return self::items('methods', 'Контактные способы', [
            Select::make('type')
                ->label('Вид контакта')
                ->options([
                    'email' => 'Электронная почта',
                    'phone' => 'Телефон',
                    'address' => 'Адрес',
                ]),
            TextInput::make('title')->label('Название'),
            Textarea::make('value')->label('Значение')->rows(2),
            TextInput::make('url')->label('Ссылка'),
        ]);
    }

    private static function contactFormFields(): Repeater
    {
        return self::items('form_fields', 'Поля контактной формы', [
            Hidden::make('name'),
            TextInput::make('label')->label('Название поля'),
            TextInput::make('placeholder')->label('Подсказка'),
            Select::make('type')
                ->label('Вид поля')
                ->options([
                    'text' => 'Короткий текст',
                    'email' => 'Электронная почта',
                    'tel' => 'Телефон',
                    'select' => 'Выбор из списка',
                    'textarea' => 'Большое текстовое поле',
                ]),
            TextInput::make('options')
                ->label('Варианты выбора')
                ->helperText('Перечислите варианты через запятую.'),
            Toggle::make('required')->label('Обязательное'),
        ]);
    }

    /** @return array<int, mixed> */
    private static function contactFormSchema(): array
    {
        return [
            self::contactFormFields(),
            Textarea::make('form_consent')->label('Текст согласия')->rows(2),
            TextInput::make('form_button_label')->label('Текст кнопки формы'),
            TextInput::make('form_success_label')->label('Сообщение после отправки'),
        ];
    }

    /** @param array<int, mixed> $schema */
    private static function items(string $name, string $label, array $schema): Repeater
    {
        return Repeater::make($name)
            ->label($label)
            ->schema($schema)
            ->addActionLabel('Добавить элемент')
            ->reorderableWithButtons()
            ->cloneable()
            ->collapsible()
            ->collapsed()
            ->columns(2)
            ->extraFieldWrapperAttributes(['class' => 'cms-content-group'])
            ->columnSpanFull();
    }

    private static function assetPath(string $name, string $label): Hidden
    {
        return Hidden::make($name);
    }

    private static function imageUpload(string $name, string $label): FileUpload
    {
        return FileUpload::make($name)
            ->label($label)
            ->disk('public')
            ->directory('page-content')
            ->visibility('public')
            ->image()
            ->imageEditor()
            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
            ->maxSize(10240)
            ->openable()
            ->downloadable();
    }

    private static function enabledToggle(): Toggle
    {
        return Toggle::make('enabled')
            ->label('Показывать на странице')
            ->default(true);
    }
}
