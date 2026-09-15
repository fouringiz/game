# Ultimate Tower Defense

Мобильный sci-fi tower defense. Актуальный паспорт — **v2.9**, прототип — **v0.2**.

## Быстрый старт

Откройте [prototype/index.html](prototype/index.html) в браузере. Установка зависимостей и сборка не нужны.

Проверки игровой логики:

```sh
node tests/prototype-regression.cjs
```

## Структура

- [Паспорт проекта v2.9](docs/ultimate-td-passport-v2-9.md) — актуальные решения и текущая повестка.
- [Английский глоссарий v1.2](docs/ultimate-td-glossary-en.md).
- Лор: [RU](docs/ultimate-td-lore-ru.md), [EN](docs/ultimate-td-lore-en.md).
- [Внутриигровые документы](docs/ultimate-td-documents-en.md) — извлечены из исходного архива без изменения текста.
- [Визуальные материалы и промпты](docs/art/lienso-redesign-prompts.md).
- [Карта кампании](assets/campaign_ring_map.png).
- [Отчёты проверок](reports/) — исследования баланса и Координатора.
- `prototype/` — играбельный прототип; `tests/` — автоматические проверки; `tools/` — воспроизводимые исследовательские прогоны.

## Версионирование

Номера паспорта и прототипа независимы: паспорт v2.9 не означает игру v2.9.

| Ветка или метка | Назначение |
| --- | --- |
| `main` | Актуальный проект. Старые паспорта не дублируются в файлах. |
| `design/v…` | Сохранённый снимок соответствующей версии паспорта, не сборка игры. |
| `prototype/v0.2` | Метка текущего прототипа и сопутствующих материалов. |
| `v0.1` | Исходная ветка до наведения порядка; сохранена для восстановления. |

### История паспортов

Доступны ветки: [v1.1](https://github.com/fouringiz/game/tree/design/v1.1), [v1.2](https://github.com/fouringiz/game/tree/design/v1.2), [v1.3](https://github.com/fouringiz/game/tree/design/v1.3), [v1.4](https://github.com/fouringiz/game/tree/design/v1.4), [v1.6](https://github.com/fouringiz/game/tree/design/v1.6), [v1.7](https://github.com/fouringiz/game/tree/design/v1.7), [v1.8](https://github.com/fouringiz/game/tree/design/v1.8), [v1.9](https://github.com/fouringiz/game/tree/design/v1.9), [v2.0](https://github.com/fouringiz/game/tree/design/v2.0), [v2.1](https://github.com/fouringiz/game/tree/design/v2.1), [v2.3](https://github.com/fouringiz/game/tree/design/v2.3), [v2.4](https://github.com/fouringiz/game/tree/design/v2.4), [v2.6](https://github.com/fouringiz/game/tree/design/v2.6), [v2.7](https://github.com/fouringiz/game/tree/design/v2.7), [v2.8](https://github.com/fouringiz/game/tree/design/v2.8), [v2.9](https://github.com/fouringiz/game/tree/design/v2.9).

Снимки импортированы из сохранившихся файлов; v2.4 взят из `files.zip`. Даты коммитов отражают импорт. Отсутствующие версии не восстанавливались предположениями. В каждой исторической ветке оригинальный паспорт находится в `docs/passport.md`; его старые ссылки сохранены как часть исходного документа.

### Дальнейшая работа

1. Изменения вести в коротких рабочих ветках `codex/<тема>`, затем объединять с `main`.
2. При фиксации нового паспорта обновлять актуальный документ в `main` и сохранять его снимок в новой ветке `design/vX.Y`. Старые снимки не менять.
3. При выпуске прототипа запускать проверки и создавать новую метку `prototype/vX.Y`. Существующие метки не переносить.

Десять проверок покрывают движение Пиявки, генераторы, таргетинг и контрмеру против мутации Координатора. Они не заменяют визуальный плейтест и проверку баланса.
