# Лиенсу — Голодный Рой · Редизайн внешности + промпты для генерации

Имена остаются человеческими полевыми кличками: люди называют чужое по знакомой функции («паук» — потому что ловит сетью, а не потому что похож). Анатомия при этом полностью чужая. Силуэт может рифмоваться с функцией (туннельщик вытянут — это конвергенция), но детали строения не должны быть земными.

---

## Библия чужой анатомии

1. **Симметрия.** Никакой земной билатеральности «морда-спина-хвост». Трёхлучевая, пятилучевая или намеренно нарушенная симметрия.
2. **Конечности.** Не 4 (звери/ящеры), не 6 (насекомые), не 8 (пауки). Три, пять, семь или переменное число. Не суставчатые лапы, а гидростатические «колонны», хлысты-опоры, выдавливаемые временные шипы, мускульные «подошвы» и реснички.
3. **Ни лиц, ни парных глаз.** Сенсорные полосы, венцы пор, светящиеся трещины, решётки. Пасти — радиальные сфинктеры, зубные спирали, кольца-жернова; могут открываться где угодно на теле.
4. **Кремнийорганика.** Броня Биотанка из лора распространяется на всю расу: стеклокерамические наросты, глазурованные плиты, минеральная корка поверх мокрой плоти. Не хитин и не чешуя.
5. **Полёт без крыльев.** Газовые пузыри, мембранные паруса на радиальных рёбрах, реактивные сифоны. Никаких крыльев летучей мыши или стрекозы.
6. **Швы и симбиоз.** Рой выращивает и сращивает: видимые рубцы-стыки между сросшимися организмами, ткани разных фактур на одном теле.

Одна правка текста на постере: у **16. Рой** «Боевые насекомые» → «Боевые организмы». Остальные подписи не конфликтуют с новой анатомией.

---

## Общий стиль-блок

Добавлять в конец каждого промпта (сохраняет вид исходного постера):

```
dark biopunk bestiary concept art, grimdark painterly digital illustration, wet glistening alien flesh fused with glassy silicon-ceramic growths, dripping yellow-green ichor, muted olive-brown-crimson palette, murky dark background, dramatic rim light, ultra detailed, horror atmosphere, full body view
```

## Общий негатив

```
spider, arachnid, scorpion, insect, beetle, centipede, lizard, reptile, dinosaur, dragon, snake, crocodile, bat, bird, mammal, dog, cat, humanoid, human face, earth animal, quadruped, bat wings, feathered wings, fur, scales
```

- **Midjourney:** приписать `--no spider, arachnid, insect, ...` (списком через запятую).
- **Stable Diffusion / SDXL / Flux:** вставить в поле Negative prompt.
- **DALL-E и аналоги без негатива:** добавить в сам промпт фразу `no earth-animal anatomy, non-terrestrial body plan`.

---

## Юниты

### 1. Дрон
**Облик:** низкий клин из налегающих минеральных пластин, скользит на одной мускульной «подошве». Головы нет — брюшная пасть-щель и три тусклые сенсорные световые полосы вдоль спины.
**Prompt:** small expendable alien drone creature: low wedge of overlapping mineral shell plates gliding on a single muscular sled-foot, headless, ventral feeding slit, three dim sensory light-strips along the back, several identical drones in the murk behind

### 2. Охранник
**Облик:** бронированный купол на трёх толстых гидростатических колоннах-опорах, венец сенсорных пор по окружности, выдвижные костяно-керамические шипы. Стоит, вкоренившись в грунт, над пульсирующими инкубаторами.
**Prompt:** alien sentinel organism: heavy armored dome body on three thick hydrostatic pillar-limbs, crown ring of sensory pores, rows of retractable bone-ceramic spikes, rooted into the ground in a defensive stance, pulsating incubator sacs glowing behind it

### 3. Берсерк
**Облик:** асимметричный сгусток витых мышечных жгутов; один бок зарос гроздьями стеклокерамических лезвий, пять разновеликих хлыстов-опор. Глаз нет; радиальная зубная спираль открывается прямо на «плече».
**Prompt:** asymmetric alien assault beast mid-lunge: body of knotted muscle bands, one flank overgrown with clusters of jagged glass-ceramic blades, five uneven whip-strut limbs of different lengths, eyeless, a radial tooth-spiral maw opening on its shoulder

### 4. Червь
**Облик:** цепь вложенных «колоколов»: каждый сегмент — вращающееся кольцо керамических зубов-жерновов, между сегментами сочатся кислотные железы. Сечение тела треугольное, глаз нет. Вытянутый силуэт — конвергенция функции туннельщика, не земная анатомия.
**Prompt:** subterranean alien tunneler bursting from cracked ground: a chain of nested bell-shaped segments, each segment a rotating ring of ceramic grinding teeth, acid glands weeping between segments, triangular body cross-section, eyeless, steam and dissolving rock

### 5. Комбо
**Облик:** два сросшихся организма с видимым швом: нижнее быстрое «шасси» из пяти хлыстов-опор несёт верхнюю гроздь полупрозрачных кислотных пузырей с гарпунами-когтями. Фактуры кожи симбионтов заметно различаются.
**Prompt:** symbiotic alien predator, two fused organisms with a visible scar-seam: a fast lower chassis of five whip-strut limbs carrying an upper cluster of translucent acid bladders armed with venom-dripping bone-ceramic claw-harpoons, mismatched skin textures of the two symbionts

### 6. Вампир
**Облик:** парит на грозди полупрозрачных газовых пузырей; под ссохшимся ядром — вуали мембран и десятки полых нитей-гарпунов, по которым вверх течёт светящаяся жидкость жертвы. Никаких крыльев.
**Prompt:** levitating alien parasite: a cluster of translucent gas bladders holding a shriveled core aloft, trailing veil membranes and dozens of hollow harpoon filaments draining glowing fluid upward from a husk below, crimson light pulsing inside the bladders, wingless

### 7. Огр
**Облик:** асимметричная глыба из сросшихся минеральных плит и рубцовой ткани на трёх ногах-колоннах; вместо рук — два монолитных тарана из кости-керамики. Лица нет — светящаяся сенсорная трещина поперёк фронта.
**Prompt:** alien siege brute: asymmetric boulder of fused mineral plates and scar tissue standing on three columnar legs, two arms ending in solid bone-ceramic ram-hammers, faceless — only a glowing sensory fissure across the front, cracked armor leaking ichor, smashed barricade debris around

### 8. Неофант
**Облик:** полупрозрачный колокол, внутри которого светится решётка нервных волокон; стоит на тонких стеклянных ходулях, вниз спадает юбка из тысяч волосяных светящихся нитей — не щупальца, а живое оптоволокно.
**Prompt:** alien psionic organism: translucent bell-shaped body revealing a glowing lattice of neural filaments inside, standing on thin glassy stilts, a skirt of thousands of hair-thin luminous fiber threads hanging beneath, eerie inner light, subtle distortion halo in the air

### 9. Инфильтратор
**Облик:** полужидкое тело тёмной «хамелеоновой» плоти перетекает сквозь щель; поверхность мимикрирует под ржавый металл, для опоры выдавливаются временные шипы.
**Prompt:** amorphous alien infiltrator: semi-liquid body of dark chameleon flesh flowing through a narrow breach in a wall, surface mimicking rusted metal texture, extruding temporary spike-limbs, barely visible outline, glinting sensory pores, moody backlight

### 10. Бегемот
**Облик:** исполинский купол из налегающих шестиугольных плит — «шагающий риф». Ног не видно: движется на скрытой перистальтической мышечной юбке. По бортам — костяные турели-наросты и сфинктеры-порты.
**Prompt:** alien living fortress: colossal dome of overlapping hexagonal armor plates like a walking reef, no visible legs — moving on a hidden peristaltic muscle-skirt, bone turret-growths and sphincter gun-ports along the flanks, tiny drone creatures crawling over its armor, dwarfing wrecked vehicles

### 11. Паук
**Облик:** центральный мешок-прядильня, поднятый на трёх очень длинных гладких бесшарнирных ходулях. Батарея сопел выстреливает клейкую стеклонить сетями; внизу — коконы в глянцевой смоле. Ровно три ноги, ничего паучьего.
**Prompt:** alien snare-caster: a single central spinneret sac raised high on exactly three very long smooth jointless stilt-limbs, a battery of nozzle-spigots firing sprays of adhesive glass-fiber netting, cocooned prey in glossy resin below, elegant and deeply wrong

### 12. Биотанк
**Облик:** низкий гранёный клин из слоёной стеклокерамики; едет на двух перистальтических мышечных гусеницах. Слеп: линии сенсорных ямок читают вибрации грунта. Фронтальное жерло биопушки.
**Prompt:** grown alien war machine: low angular wedge of layered silicon-organic glass-ceramic armor, moving on two peristaltic living muscle-treads like organic tank tracks, eyeless with sensor pit-lines reading ground vibration, a massive frontal bio-cannon orifice glowing

### 13. Саранча
**Облик:** гроздь тугих пузырей-разрывников со светящимися спорами; прыгает на единственной пружинной ноге-спирали. Без крыльев. В кадре — залп: облако спор въедается в металл.
**Prompt:** alien spore artillery creature: a bulbous cluster of taut rupture-bladders filled with glowing spores, launching itself on a single coiled spring-foot, wingless, caught mid-burst releasing a corrosive spore cloud that pits and eats into metal plates

### 14. Ядозавр
**Облик:** приземистая тренога, чьё тело — одна огромная напорная железа; вместо морды — ламельное керамическое сопло-глотка. Шкура — растрескавшаяся от жара глазурь. Ни хвоста, ни чешуи, ни ящериной посадки.
**Prompt:** alien acid mortar beast: squat three-legged body that is mostly one huge pressurized gland, a lamellar ceramic nozzle-throat instead of a face, skin of heat-crazed glazed ceramic, spitting a hissing arc of acid that melts through tank armor, no tail

### 15. Левиафан
**Облик:** полый корпус-организм, идущий на сотнях столбчатых ресничек; вдоль бортов — сфинктеры-ангары, из которых выходят твари, на хребте — мачты сенсорной решётки. Силуэт скорее архитектуры, чем зверя.
**Prompt:** alien living transport barge: colossal hollow hull-organism advancing on hundreds of pillar-cilia, flanks lined with sphincter hangar-gates disgorging smaller creatures, dorsal masts of sensory lattice, architectural silhouette rather than animal, escort swarm streaming around it

### 16. Рой
**Облик:** туча стеклянных «семян-дротиков»: оперённые иглы с газовым пузырьком, летят реактивными импульсами. Ни крыльев, ни лапок. (Подпись на постере: «Боевые организмы».)
**Prompt:** alien attack swarm: a cloud of hundreds of glassy seed-darts, each a finned needle with a small gas bladder, propelled by jet-pulses, no wings, no legs, streaming like tracer fire toward a breached hull, glowing venom trails

### 17. Киборг
**Облик:** трёхконечный чужой организм, усиленный грубым человеческим железом: сервоприводы прикручены сквозь живую ткань, кабели вросли в плоть, одна конечность заменена промышленной клешнёй. Контраст двух технологий — суть образа.
**Prompt:** alien flesh grafted with salvaged human machinery: a tri-limbed alien organism reinforced with crude servo-armor, hydraulic pistons bolted through living tissue, cable bundles fused into flesh, one limb replaced by an industrial claw, uneasy fusion, sparks and ichor

### 18. Монстр
**Облик:** колосс из двух неидеально сросшихся полуорганизмов: рубец-шов через весь корпус, две независимые сенсорные «короны» вместо голов, семь разнокалиберных конечностей.
**Prompt:** colossal twin-fused alien titan: two half-organisms imperfectly merged along a massive scar-seam, two independent sensory crown-clusters instead of heads, seven mismatched limbs, raw hybrid muscle and mineral plating, smashing through wreckage

### 19. Опустошитель
**Облик:** летающий «кольцевой зев»: само тело — исполинское кольцо-челюсть с режущими керамическими зубами. На радиальных рёбрах натянуты мембранные паруса, сзади бьют реактивные сифоны. Смыкается вокруг корпусов кораблей.
**Prompt:** flying alien ship-breaker: its body is one enormous ring-shaped jaw lined with shearing ceramic teeth, membrane sails stretched on radial ribs, rear jet-siphons firing, closing its ring-maw around a ship hull in midair

### 20. Химера
**Облик:** собранный ужас, видимо сшитый из тканей других юнитов: плиты Биотанка, пузыри Вампира, сопло Ядозавра — всё держится на рубцах и швах-наростах. Асимметричный «ходячий арсенал». Химера здесь — термин генетики, не греческий зверь.
**Prompt:** assembled alien war-chimera: visibly grafted from parts of other swarm organisms — layered glass-ceramic plates, translucent acid bladders, harpoon filaments, a ceramic nozzle-throat — held together by scar tissue and suture-growths, asymmetric walking arsenal, surgical horror

### 21. Бридер
**Облик:** вертикальное веретено-башня, обвитое полупрозрачными родильными мешками со светящимися эмбрионами; сотни тонких нитей-манипуляторов ухаживают за ними. Венец — сенсорная решётка, вдоль ствола — жерла, выдыхающие горящий газ.
**Prompt:** alien brood-spire: tall vertical spindle organism wrapped in translucent birthing sacs with glowing embryos inside, hundreds of fine manipulator filaments tending them, crowned by a sensory lattice, vents along the trunk exhaling burning gas

### 22. Песчаный червь
**Облик:** титанический «поезд» из кольцевых сегментов, каждое кольцо — самостоятельная пасть-жёрнов; между сегментами — сёдла-плато затвердевшего панциря, на которые грузят контейнеры. Глаз нет, корка минералов.
**Prompt:** titanic alien deep-hauler rising from a collapsing dune: a train of colossal ring-segments, each ring an independent grinding mouth-wheel, saddle-plateaus of hardened shell between segments loaded with cargo containers, eyeless, crusted in minerals, tiny figures for scale

---

## Как удержать единый стиль

- Один и тот же стиль-блок и негатив во всех генерациях; менять только описание юнита.
- **Midjourney:** возьмите 2–3 самых удачных арта исходного постера как `--sref <url>` (сила `--sw 150–250`) — новые твари лягут в ту же живопись; держите одинаковый `--s` и `--v`.
- **Stable Diffusion:** зафиксируйте чекпоинт, сэмплер и близкие сиды; стиль-блок в начало промпта.
- Соотношение кадра — под ячейку постера (примерно 4:3 у крупных, 1:1 у мелких).
- Сначала прогоните 3–4 пробных юнита (Паук, Ядозавр, Вампир, Бегемот — самые «земные» в оригинале), утвердите стиль, потом остальные.
- Если генератор всё равно лепит морду ящера — усильте в начале промпта `headless, eyeless, non-terrestrial body plan` и добавьте проблемное животное в негатив.
