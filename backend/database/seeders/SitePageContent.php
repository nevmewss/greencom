<?php

namespace Database\Seeders;

class SitePageContent
{
    /** @return array<int, array<string, mixed>> */
    public static function for(string $slug): array
    {
        return match ($slug) {
            'home' => self::home(),
            'about' => self::about(),
            'contact' => self::contact(),
            'price' => self::price(),
            '404' => self::notFound(),
            default => [],
        };
    }

    /** @return array<int, array<string, mixed>> */
    private static function home(): array
    {
        $services = [
            ['Послуги', 'Програмне забезпечення'],
            ['Послуги', 'Системна інтеграція'],
            ['Обладнання', 'Торгове обладнання'],
            ['Обладнання', 'Касові рішення'],
            ['Послуги', 'Послуги ІТС'],
            ['Обладнання', 'Витратні матеріали'],
            ['Послуги', 'ІТ-інфраструктура'],
            ['Послуги', 'Автоматизація бізнесу'],
        ];

        return [
            self::headerBlock('home_header'),
            self::block('home_hero', [
                'pill' => 'Технологічні рішення для розвитку бізнесу',
                'title_prefix' => 'Індивідуальні',
                'title_highlight' => 'РІШЕННЯ',
                'title_main' => 'АВТОМАТИЗАЦІЇ',
                'title_suffix' => 'бізнесу',
                'primary_button_label' => 'Дізнатися більше',
                'primary_button_url' => '#services',
                'secondary_button_label' => 'Консультація',
                'secondary_button_url' => '#contact',
                'images' => self::responsiveImages('/assets/home-hero-desktop.png', '/assets/home-hero-tablet.png', '/assets/home-hero-mobile.png', 'Цифровий лист над мікросхемою'),
                'stats' => [
                    ['value' => '50+', 'text' => 'Рішень для автоматизації та розвитку бізнесу', 'url' => ''],
                    ['value' => '1000+', 'text' => 'Задоволених клієнтів', 'url' => '#partners'],
                ],
                'slides' => array_map(fn (string $text): array => [
                    'title' => 'Автоматизація',
                    'accent' => 'бізнес-процесів',
                    'text' => $text,
                    'button_label' => 'Детальніше',
                    'url' => '#services',
                ], [
                    'Налаштовуємо сучасні системи для ефективної роботи підприємств.',
                    'Поєднуємо обладнання, дані та процеси в єдину систему.',
                    'Допомагаємо бізнесу зростати завдяки технологіям.',
                ]),
            ]),
            self::block('benefits', [
                'eyebrow' => 'Переваги',
                'title' => 'Чому обирають нас — якість, якій довіряють',
                'button_label' => 'Дізнатися більше',
                'button_url' => '#about-detail',
                'items' => array_fill(0, 5, [
                    'title' => 'Досвідчені фахівці',
                    'text' => 'Lorem ipsum dolor sit amet consectetur. Nulla aliquam ultricies facilisi habitasse cursus diam aliquam vitae. Sed aliquet nisi morbi nisi.',
                    'icon_url' => '/assets/benefit-icon-exact.svg',
                ]),
            ]),
            self::block('services', [
                'eyebrow' => 'Наші пропозиції',
                'title' => 'Пропонуємо найкращі рішення автоматизації бізнесу',
                'sticker_url' => '/assets/service-sticker-4x.png',
                'items' => array_map(fn (array $item): array => [
                    'tag' => $item[0],
                    'title' => $item[1],
                    'text' => 'Коротенький опис послуги для каталогу. В два рядки, може в один.',
                    'button_label' => 'Дізнатися більше',
                    'url' => '#contact',
                ], $services),
            ]),
            self::block('about_teaser', [
                'eyebrow' => 'Про нас',
                'title' => 'Розкрийте потенціал бізнесу з інноваційними рішеннями автоматизації',
                'text' => 'Трансформуйте свій бізнес за допомогою наших інноваційних ІТ-рішень, створених для вирішення ваших унікальних викликів і стимулювання зростання в сучасному цифровому середовищі.',
                'image_url' => '/developer-tech.jpg',
                'clients_value' => '120k+',
                'clients_text' => 'Задоволених клієнтів',
                'advantages' => array_map(fn (string $text): array => ['text' => $text], [
                    'Індивідуальні рішення для кожного бізнесу',
                    'Покращена безпека та захист даних',
                    'Індивідуальні рішення для кожного бізнесу',
                    'Покращена безпека та захист даних',
                ]),
                'experience_value' => '25',
                'experience_text' => 'Роки досвіду',
                'phone_label' => 'Зателефонуйте нам',
                'phone' => '+12 (123) 456 78900',
                'button_label' => 'Дізнатися більше',
                'button_url' => './about/',
            ]),
            self::partnersBlock(),
            self::block('news', [
                'eyebrow' => 'Новини',
                'title' => 'Ділимося останніми новинами у сфері автоматизації',
                'all_news_button_label' => 'Всі новини',
                'all_news_button_url' => '#news-list',
                'items' => array_map(fn (string $image, int $index): array => [
                    'image_url' => $image,
                    'author' => 'Jane Cooper',
                    'date' => '26.04.2026',
                    'category' => 'Категорія',
                    'title' => 'Посібник з цифрової трансформації 2026 року',
                    'text' => 'Перемога в цифровій гонці: Дорожня карта трансформації 2025 року. Цифрова трансформація наступного покоління',
                    'button_label' => 'Дізнатися більше',
                    'url' => '#news',
                    'featured' => $index === 0,
                ], ['/retail-tech.jpg', '/assets/news-leaf.png', '/developer-tech.jpg', '/assets/news-leaf.png'], array_keys(range(0, 3))),
            ]),
            self::contactBlock(),
            self::newsletterBlock(),
            self::footerBlock(),
        ];
    }

    /** @return array<int, array<string, mixed>> */
    private static function about(): array
    {
        $achievementValues = [
            ['24/7', 'успішно реалізованих проєктів для бізнесу різних масштабів'],
            ['100+', 'клієнтів, які довіряють нашим технологічним рішенням'],
            ['5+', 'років досвіду у сфері автоматизації та IT-рішень'],
            ['99%', 'клієнтів залишаються задоволені співпрацею з нами'],
            ['24/7', 'клієнтів залишаються задоволені співпрацею з нами'],
            ['20+', 'технічна підтримка та консультації для наших клієнтів'],
        ];

        return [
            self::headerBlock('inner_header'),
            self::block('about_hero', [
                'breadcrumb' => 'Про компанію',
                'eyebrow' => 'Про компанію',
                'title' => 'Технології, які створюють ефективний бізнес',
                'text' => 'GreenCore — це команда експертів, яка з 2019 року допомагає компаніям оптимізувати процеси, підвищувати ефективність та масштабувати свій бізнес за допомогою сучасних технологічних рішень.',
                'button_label' => 'Зв’язатися з нами',
                'button_url' => '#contact',
                'images' => self::responsiveImages('/assets/about-hero.png', '/assets/about-hero-tablet.png', '/assets/about-hero-mobile.png', 'Сучасний офіс GreenCom із серверним обладнанням'),
            ]),
            self::block('about_overview', [
                'eyebrow' => 'Текст',
                'title' => 'Великий оглядовий текст про компанію',
                'paragraphs' => array_map(fn (string $text): array => ['text' => $text], [
                    'Lorem ipsum dolor sit amet consectetur. Tristique pulvinar feugiat id ipsum sodales nam arcu fringilla in. Ipsum quam id venenatis sem elit faucibus diam eu. Lorem ut mattis amet ac.',
                    'Quis diam pulvinar nunc tellus duis pulvinar pellentesque elit purus. Leo quis eros quisque a convallis. Sed mi sagittis gravida risus aliquam magna augue neque.',
                    'Tincidunt quam purus quis netus porta tristique. Aliquet aliquam rutrum eget quis in mi quis posuere. Pulvinar luctus pharetra elit elementum sed sagittis elit vitae.',
                    'Quis diam pulvinar nunc tellus duis pulvinar pellentesque elit purus. Leo quis eros quisque a convallis.',
                    'Tincidunt quam purus quis netus porta tristique. Porttitor nunc sit ante pellentesque sed lectus lectus dolor praesent.',
                ]),
            ]),
            self::block('achievements', [
                'eyebrow' => 'Наші досягнення',
                'title' => 'Результати, які говорять за нас',
                'items' => array_map(fn (array $item): array => ['value' => $item[0], 'text' => $item[1]], $achievementValues),
            ]),
            self::block('team', [
                'eyebrow' => 'Наша команда',
                'title' => 'Експерти створюють майбутнє разом з вами',
                'text' => 'Ми — команда професіоналів із досвідом у IT, автоматизації, інженерії та бізнес-експертизі, об’єднані спільною метою — допомагати бізнесу зростати через технології.',
                'items' => array_map(fn (array $member): array => [
                    'role' => $member[0],
                    'name' => $member[1],
                    'image_url' => '/assets/about-team.png',
                    'alt' => 'Спеціалістка GreenCom',
                ], [['Посада', 'Ім’я спеціаліста'], ['Обладнання', 'Ім’я спеціаліста'], ['Обладнання', 'Ім’я спеціаліста']]),
            ]),
            self::block('history', [
                'eyebrow' => 'Історія розвитку',
                'title' => 'Шлях розвитку та технологічних досягнень',
                'image_url' => '/assets/about-history.png',
                'image_alt' => 'Графік технологічного розвитку GreenCom',
                'items' => array_fill(0, 6, [
                    'year' => '2000',
                    'title' => 'Заснування компанії',
                    'text' => 'Розпочали діяльність у сфері автоматизації та IT-рішень для бізнесу.',
                ]),
            ]),
            self::partnersBlock(),
            self::contactBlock(),
            self::newsletterBlock(),
            self::footerBlock(),
        ];
    }

    /** @return array<int, array<string, mixed>> */
    private static function contact(): array
    {
        return [
            self::headerBlock('inner_header'),
            self::block('contact_hero', [
                'breadcrumb' => 'Контакти',
                'title' => 'Контакти',
                'text' => 'Зв’яжіться з нами для консультації, підтримки або обговорення вашого проєкту. Ми завжди готові допомогти з автоматизацією, IT-рішеннями та технологіями для бізнесу.',
                'images' => self::responsiveImages('/assets/contact-hero-desktop-exact.png', '/assets/contact-hero-tablet-exact.png', '/assets/contact-hero-mobile-exact.png', ''),
            ]),
            self::block('office', [
                'eyebrow' => 'Контакти',
                'title' => 'Головний офіс',
                'image_url' => '/assets/contact-office.png',
                'image_alt' => 'Головний офіс GreenCom',
                'methods' => self::methods(),
            ]),
            self::block('map', [
                'image_url' => '/assets/contact-map.png',
                'image_alt' => 'Мапа з розташуванням офісу GreenCom',
                'address' => 'Одеська обл., м. Біляївка, вул. Тіниста, 42а',
                'map_url' => '#map',
            ]),
            self::block('faq', [
                'eyebrow' => 'Часті запитання',
                'title' => 'Відповіді на важливі питання для вашого бізнесу',
                'text' => 'Ми зібрали найпоширеніші запитання щодо автоматизації, програмного забезпечення, обладнання та IT-рішень, щоб допомогти вам швидко знайти необхідну інформацію.',
                'button_label' => 'Запитати',
                'button_url' => '#contact-form',
                'items' => array_fill(0, 6, [
                    'title' => 'Як отримати кредит?',
                    'answer' => 'Ми піклуємося про вашу безпеку: підтвердіть, що банківський рахунок належить вам. Ви можете зробити це, швидко перевіривши з нашим постачальником або переказавши символічну суму.',
                ]),
            ]),
            self::block('contact_form', [
                'eyebrow' => 'Форма захвату',
                'title' => 'Ми завжди на зв’язку',
                'text' => 'Ми завжди готові допомогти. Якщо у вас є запитання, потрібна консультація або ви хочете підібрати рішення для бізнесу — зв’яжіться з нами у зручний для вас спосіб.',
                ...self::formData(),
            ]),
            self::newsletterBlock(),
            self::footerBlock(),
        ];
    }

    /** @return array<int, array<string, mixed>> */
    private static function price(): array
    {
        $equipment = [
            'title' => 'Торгове обладнання',
            'text' => 'Актуальні ціни на POS-системи, сканери, ваги, принтери чеків, фіскальне обладнання та інші рішення для автоматизації торгівлі й обслуговування клієнтів.',
            'price' => '217 000 ₴',
            'icon_url' => '/assets/benefit-icon-exact.svg',
            'effect_url' => '/assets/benefit-effect-exact.svg',
        ];
        $software = [
            'title' => 'Програмне забезпечення',
            'text' => 'Прайс-листи на CRM-системи, облікові програми, програмне забезпечення для автоматизації бізнес-процесів та сучасні цифрові рішення для компаній.',
            'price' => '217 000 ₴',
            'icon_url' => '/assets/benefit-icon-exact.svg',
            'effect_url' => '/assets/benefit-effect-exact.svg',
        ];

        return [
            self::headerBlock('inner_header'),
            self::block('price_hero', [
                'breadcrumb' => 'Прайс',
                'title' => 'Прайс',
                'text' => 'Ознайомтесь із вартістю послуг, обладнання та рішень для автоматизації бізнесу. Оберіть оптимальний варіант для ваших потреб та масштабу компанії.',
                'images' => self::responsiveImages('/assets/contact-hero-desktop-exact.png', '/assets/contact-hero-tablet-exact.png', '/assets/contact-hero-mobile-exact.png', ''),
            ]),
            self::block('price_list', [
                'aria_label' => 'Прайс-лист GreenCom',
                'items' => [$equipment, $software, $equipment, $software, $equipment, $software],
            ]),
            self::newsletterBlock(),
            self::footerBlock(),
        ];
    }

    /** @return array<int, array<string, mixed>> */
    private static function notFound(): array
    {
        return [
            self::headerBlock('inner_header'),
            self::block('not_found', [
                'code' => '404',
                'breadcrumb' => '404',
                'title' => 'Х’юстон, щось пішло не так...',
                'paragraphs' => [
                    ['text' => 'Схоже, ви потрапили на неіснуючу сторінку.'],
                    ['text' => 'Але не хвилюйтеся, навіть найкращі дослідники іноді збиваються з курсу.'],
                ],
                'button_label' => 'Повернутися на головну',
                'button_url' => '../',
                'image_url' => '/assets/not-found-art.png',
                'image_alt' => 'Астронавт і повідомлення про помилку 404',
            ]),
            self::footerBlock(),
        ];
    }

    /** @return array<string, mixed> */
    private static function block(string $type, array $data): array
    {
        return ['type' => $type, 'data' => ['enabled' => true, ...$data]];
    }

    /** @return array<string, mixed> */
    private static function partnersBlock(): array
    {
        $logos = ['natgeo', 'walmart', 'slack', 'natgeo', 'natgeo', 'linkedin', 'natgeo'];

        return self::block('partners', [
            'eyebrow' => 'Наші партнери',
            'title' => 'Компанії, які довіряють нам',
            'button_label' => 'Дізнатися більше',
            'button_url' => '#contact',
            'logos' => array_map(fn (string $logo): array => [
                'image_url' => "/assets/partner-{$logo}.svg",
                'alt' => $logo,
                'url' => '',
            ], $logos),
        ]);
    }

    /** @return array<string, mixed> */
    private static function headerBlock(string $type): array
    {
        return self::block($type, [
            'logo_url' => '/icons/logo.png',
            'email' => 'example@domain.com',
            'phone' => '+12 (123) 456 78900',
            'top_links' => [
                ['label' => 'Про компанію', 'url' => './about/'],
                ['label' => 'Партнери', 'url' => '#partners'],
                ['label' => 'Вакансії', 'url' => '#news'],
                ['label' => 'База знань', 'url' => '#news'],
            ],
            'nav_items' => [
                ['group' => 'main', 'label' => 'Головна', 'url' => './'],
                ['group' => 'services', 'label' => 'Програмне забезпечення', 'url' => '#services'],
                ['group' => 'services', 'label' => 'Інтеграція систем', 'url' => '#services'],
                ['group' => 'services', 'label' => 'Послуги ІТС', 'url' => '#services'],
                ['group' => 'equipment', 'label' => 'Торгове обладнання', 'url' => '#services'],
                ['group' => 'equipment', 'label' => 'Касові рішення', 'url' => '#services'],
                ['group' => 'equipment', 'label' => 'Витратні матеріали', 'url' => '#services'],
                ['group' => 'main', 'label' => 'Кейси', 'url' => '#news'],
                ['group' => 'main', 'label' => 'Контакти', 'url' => '#contact'],
                ['group' => 'main', 'label' => 'Ціни', 'url' => '#services'],
            ],
            'currencies' => [['value' => 'USD'], ['value' => 'EUR'], ['value' => 'UAH']],
            'languages' => [['value' => 'UA'], ['value' => 'EN'], ['value' => 'PL']],
            'search_label' => 'пошук',
            'login_label' => 'Вхід',
            'cart_label' => 'Кошик',
        ]);
    }

    /** @return array<string, mixed> */
    private static function footerBlock(): array
    {
        $information = [
            ['label' => 'Про компанію', 'url' => './about/'],
            ['label' => 'Контакти', 'url' => '#contact'],
            ['label' => 'Ціни', 'url' => '#services'],
            ['label' => 'Партнери', 'url' => '#partners'],
            ['label' => 'Вакансії', 'url' => '#news'],
            ['label' => 'FAQ', 'url' => '#news'],
        ];

        return self::block('site_footer', [
            'logo_url' => '/icons/logo.png',
            'contact_title' => 'Контактна інформація',
            'email' => 'office@greencom.od.ua',
            'phone' => '+12 (123) 456 78900',
            'address_title' => 'Адреса',
            'address' => 'Одеська обл., м. Біляївка, вул. Тіниста, 42а',
            'columns' => [
                ['title' => 'Інформація', 'links' => $information],
                ['title' => 'Підтримка', 'links' => $information],
                ['title' => 'Сервіси', 'links' => [
                    ['label' => 'Програмне забезпечення', 'url' => '#services'],
                    ['label' => 'Торгове обладнання', 'url' => '#services'],
                    ['label' => 'Послуги ІТС', 'url' => '#services'],
                    ['label' => 'Витратні матеріали', 'url' => '#services'],
                ]],
            ],
            'copyright' => '© 2026. All rights reserved',
            'socials' => [
                ['label' => 'Instagram', 'url' => '#', 'icon_url' => '/icons/instagram.svg'],
                ['label' => 'Instagram', 'url' => '#', 'icon_url' => '/icons/instagram.svg'],
            ],
        ]);
    }

    /** @return array<string, mixed> */
    private static function contactBlock(): array
    {
        return self::block('contact_section', [
            'eyebrow' => 'Контакти',
            'title' => 'Зв’яжіться з нами — ми завжди на зв’язку',
            'text' => 'Ми завжди готові допомогти. Якщо у вас є запитання, потрібна консультація або ви хочете підібрати рішення для бізнесу — зв’яжіться з нами у зручний для вас спосіб.',
            'methods' => self::methods(),
            ...self::formData(),
        ]);
    }

    /** @return array<string, mixed> */
    private static function newsletterBlock(): array
    {
        return self::block('newsletter', [
            'title' => 'Підпишіться на нашу розсилку',
            'text' => 'Отримуйте новини, оновлення та корисні рішення для автоматизації бізнесу прямо на вашу електронну пошту.',
            'email_placeholder' => 'Email',
            'button_label' => 'Підписатися',
            'consent' => 'Підписуючись, ви приймаєте політику конфіденційності.',
            'left_image_url' => '/assets/newsletter-left.png',
            'right_image_url' => '/assets/newsletter-right.png',
        ]);
    }

    /** @return array<int, array<string, mixed>> */
    private static function methods(): array
    {
        return [
            ['type' => 'address', 'title' => 'Адреса', 'value' => 'Одеська обл., м. Біляївка, вул. Тіниста, 42а', 'url' => '#map'],
            ['type' => 'email', 'title' => 'Електронна пошта', 'value' => 'office@greencom.od.ua', 'url' => 'mailto:office@greencom.od.ua'],
            ['type' => 'phone', 'title' => 'Телефон', 'value' => '+12 (123) 456 78900', 'url' => 'tel:+1212345678900'],
        ];
    }

    /** @return array<string, mixed> */
    private static function formData(): array
    {
        return [
            'form_fields' => [
                ['name' => 'name', 'label' => 'Ім’я та прізвище', 'placeholder' => 'Іван Іванов', 'type' => 'text', 'options' => '', 'required' => true],
                ['name' => 'email', 'label' => 'Електронна пошта', 'placeholder' => 'Email', 'type' => 'email', 'options' => '', 'required' => true],
                ['name' => 'phone', 'label' => 'Номер телефону', 'placeholder' => '+12 (123) 456 78900', 'type' => 'tel', 'options' => '', 'required' => false],
                ['name' => 'subject', 'label' => 'Тема звернення', 'placeholder' => 'Введіть назву', 'type' => 'select', 'options' => 'Консультація, Обладнання, Послуги ІТС', 'required' => false],
                ['name' => 'message', 'label' => 'Ваше повідомлення', 'placeholder' => 'Напишіть ваше повідомлення', 'type' => 'textarea', 'options' => '', 'required' => true],
            ],
            'form_consent' => 'Відправивши це повідомлення, ви приймаєте політику конфіденційності.',
            'form_button_label' => 'Відправити',
            'form_success_label' => 'Надіслано ✓',
        ];
    }

    /** @return array<int, array<string, string>> */
    private static function responsiveImages(string $desktop, string $tablet, string $mobile, string $alt): array
    {
        return [
            ['breakpoint' => 'desktop', 'image_url' => $desktop, 'alt' => $alt],
            ['breakpoint' => 'tablet', 'image_url' => $tablet, 'alt' => $alt],
            ['breakpoint' => 'mobile', 'image_url' => $mobile, 'alt' => $alt],
        ];
    }
}
