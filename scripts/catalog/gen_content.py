#!/usr/bin/env python3
"""Generate the locks content collection from the iLock catalogue data."""
import os, textwrap

OUT = os.environ.get("OUT_DIR", os.path.join(os.path.dirname(__file__), "../../src/content/locks"))

# slug: dict of spec + prose. Prices/specs transcribed from "iLock Каталог Замков.pdf".
P = {}

def add(slug, **kw): P[slug] = kw

# ── iLock ────────────────────────────────────────────────────────────────────
add("il-8", title="iL-8", brand="ilock", price=180000, order=1, featured=True,
    kazakhBrand=True, material="aluminum",
    access=["fingerprint","pin","face","palm","card","key","app"],
    limits={"fingerprint":100,"pin":20,"card":2,"key":2},
    features=["wifi","doorbell","emergency-charge","two-way-audio","rechargeable","video-peephole","auto"],
    temp=(-20,50), power="li-4200", battery="4-6", app="Tuya Smart", warranty=2,
    interface=["ru"], colors=["black"],
    ru=("Флагман казахстанского бренда iLock: распознавание лица и вен ладони, видеоглазок и полностью автоматический замок.",
        "iL-8 — флагман собственного бренда iLock. Помимо отпечатка и пин-кода он открывается по лицу и по венам ладони, а встроенный видеоглазок с двусторонней аудиосвязью позволяет говорить с гостем со смартфона. Аккумулятор на 4200 мАч держит до 4–6 месяцев, а при полной разрядке замок можно запитать через аварийную зарядку."),
    kk=("iLock қазақстандық брендінің флагманы: бет пен алақан тамырын тану, бейнекөзше және толық автоматты құлып.",
        "iL-8 — iLock меншікті брендінің флагманы. Саусақ ізі мен пин-кодтан бөлек ол бет және алақан тамыры арқылы ашылады, ал кірістірілген бейнекөзше екіжақты аудиобайланыспен қонақпен смартфон арқылы сөйлесуге мүмкіндік береді. 4200 мАсағ аккумуляторы 4–6 айға жетеді, толық отырып қалса, құлыпты авариялық қуаттандыру арқылы қосуға болады."),
    en=("The flagship of the Kazakhstani iLock brand: face and palm-vein recognition, a video peephole and a fully automatic lock.",
        "iL-8 is the flagship of our own iLock brand. Beyond fingerprint and PIN it opens by face and by palm vein, while the built-in video peephole with two-way audio lets you speak to a guest from your phone. The 4200 mAh battery lasts 4–6 months, and emergency charging gets you in if it ever runs flat."))

add("s90", title="S90", brand="ilock", price=220000, order=2, featured=True,
    kazakhBrand=True, material="aluminum",
    access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":20,"card":2,"key":2},
    features=["wifi","doorbell","dual-camera","emergency-charge","two-way-audio","rechargeable","video-peephole","auto"],
    temp=(-20,60), power="li-4200", battery="4-6", app="iCseeHome", warranty=2,
    interface=["ru"], colors=["black"],
    ru=("Двусторонняя камера и большой экран: видно и того, кто у двери, и того, кто подошёл изнутри.",
        "S90 — старшая модель iLock с двусторонней камерой: она снимает и снаружи, и со стороны квартиры. Face ID открывает дверь за доли секунды, а экран на внешней панели и двусторонняя аудиосвязь превращают замок в полноценный видеодомофон."),
    kk=("Екіжақты камера және үлкен экран: есік алдындағы адам да, іштен келген адам да көрінеді.",
        "S90 — екіжақты камерасы бар iLock-тың жоғарғы моделі: ол сырттан да, пәтер жағынан да түсіреді. Face ID есікті секундтың үлесінде ашады, ал сыртқы панельдегі экран мен екіжақты аудиобайланыс құлыпты толыққанды бейнедомофонға айналдырады."),
    en=("A dual camera and a large screen: you see who is at the door and who approached from inside.",
        "S90 is the senior iLock model with a dual camera that films both outside and from the apartment side. Face ID opens the door in a fraction of a second, while the screen on the outer panel and two-way audio turn the lock into a full video intercom."))

# ── Philips ──────────────────────────────────────────────────────────────────
add("ddl-608", title="DDL 608", brand="philips", price=128000, order=1,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":20,"card":2,"key":2},
    features=["slim-door","ip67","mute"],
    temp=(-20,60), power="aa4", battery="10", app="PhilipsEasyKey", warranty=2,
    interface=["ru","en"], colors=["matte-black"],
    ru=("Philips для узкопрофильных дверей: защита от пыли и воды IP67 и до 10 месяцев на батарейках.",
        "DDL 608 рассчитан на узкопрофильные двери, куда обычный замок просто не встанет. Корпус защищён по стандарту IP67 от пыли и воды, а четырёх батареек AA хватает примерно на 10 месяцев."),
    kk=("Тар профильді есіктерге арналған Philips: IP67 шаң мен судан қорғау және батареяда 10 айға дейін.",
        "DDL 608 кәдімгі құлып сыймайтын тар профильді есіктерге есептелген. Корпус IP67 стандарты бойынша шаң мен судан қорғалған, ал төрт AA батареясы шамамен 10 айға жетеді."),
    en=("A Philips lock for narrow-profile doors: IP67 dust and water protection and up to 10 months on batteries.",
        "DDL 608 is built for narrow-profile doors where a standard lock simply will not fit. The body is IP67-rated against dust and water, and four AA batteries last around 10 months."))

add("ddl-603e", title="DDL 603E", brand="philips", price=142000, order=2,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":20,"card":2,"key":2},
    features=["double-check","c-cylinder","mute"],
    temp=(-20,60), power="aa4", battery="10", app="PhilipsEasyKey", warranty=2,
    interface=["ru","en"], colors=["black"],
    ru=("Базовый Philips с цилиндром С-класса и режимом двойной проверки — надёжная замена обычному замку.",
        "DDL 603E — точка входа в линейку Philips. Механическая часть построена вокруг цилиндра С-класса, а режим двойной проверки требует два разных способа доступа подряд. Питание — четыре батарейки AA примерно на 10 месяцев."),
    kk=("С-класты цилиндрі және қос тексеру режимі бар базалық Philips — кәдімгі құлыпқа сенімді балама.",
        "DDL 603E — Philips желісіне кіру нүктесі. Механикалық бөлігі С-класты цилиндр айналасында құрылған, ал қос тексеру режимі қатарынан екі түрлі қол жеткізу тәсілін талап етеді. Қуаты — шамамен 10 айға төрт AA батареясы."),
    en=("An entry-level Philips with a C-class cylinder and dual-verification mode — a solid replacement for an ordinary lock.",
        "DDL 603E is the entry point into the Philips range. The mechanical side is built around a C-class cylinder, and dual-verification mode demands two different access methods in a row. Four AA batteries power it for about 10 months."))

add("ddl-610", title="DDL 610", brand="philips", price=159000, order=3,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":20,"card":2,"key":2},
    features=["bluetooth","double-check","c-cylinder","mute","anti-pry"],
    temp=(-20,60), power="aa4", battery="10", app="HomeAccess", warranty=2,
    interface=["ru","en"], colors=["black"],
    ru=("Защита от взлома и демонтажа плюс Bluetooth-управление через приложение HomeAccess.",
        "DDL 610 добавляет к надёжной механике Philips защиту от взлома и демонтажа: снять замок с двери незаметно не выйдет. Управление и выдача кодов — через Bluetooth в приложении HomeAccess."),
    kk=("Бұзу мен бөлшектеуден қорғау және HomeAccess қосымшасы арқылы Bluetooth басқару.",
        "DDL 610 сенімді Philips механикасына бұзу мен бөлшектеуден қорғауды қосады: құлыпты есіктен байқатпай шешу мүмкін емес. Басқару және код беру — HomeAccess қосымшасындағы Bluetooth арқылы."),
    en=("Anti-pry and anti-removal protection plus Bluetooth control through the HomeAccess app.",
        "DDL 610 adds tamper and removal protection to the dependable Philips mechanics — the lock cannot be quietly taken off the door. Control and code sharing run over Bluetooth in the HomeAccess app."))

add("ddl-7300", title="DDL 7300", brand="philips", price=221000, order=4,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":10,"card":2,"key":2},
    features=["bluetooth","auto-lock","double-check","c-cylinder"],
    temp=(-20,60), power="aa4", battery="10", app="PhilipsEasyKey", warranty=2,
    interface=["ru","en"], colors=["black","copper","gold"],
    ru=("Автоматическая блокировка и три цвета корпуса: чёрный, медный и золотой.",
        "DDL 7300 закрывается сам — автоматическая блокировка срабатывает, как только дверь закрыта, и забыть запереть квартиру уже не получится. Единственная модель в каталоге, доступная в трёх цветах: чёрном, медном и золотом."),
    kk=("Автоматты бұғаттау және корпустың үш түсі: қара, мыс және алтын.",
        "DDL 7300 өзі жабылады — есік жабылған сәтте автоматты бұғаттау іске қосылады, енді пәтерді құлыптауды ұмыту мүмкін емес. Каталогтағы үш түсте қолжетімді жалғыз модель: қара, мыс және алтын."),
    en=("Automatic locking and three body colours: black, copper and gold.",
        "DDL 7300 locks itself — auto-lock engages the moment the door closes, so forgetting to secure the flat is no longer possible. It is the only model in the catalogue offered in three colours: black, copper and gold."))

add("alpha", title="Alpha", brand="philips", price=240000, order=5,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":10,"card":2,"key":2},
    features=["double-check","c-cylinder","auto","waterproof"],
    temp=(-20,60), power="aa4", battery="10", app="PhilipsEasyKey", warranty=2,
    interface=["ru","en"], colors=["black"],
    ru=("Полностью автоматический Philips с влагостойким корпусом и до 10 месяцев работы на батарейках.",
        "Alpha — полностью автоматический замок: ригели уходят и выходят сами, без ручки. Влагостойкий корпус спокойно переносит перепады погоды, а питание от батареек AA даёт около 10 месяцев работы вместо ежемесячной подзарядки."),
    kk=("Ылғалға төзімді корпусы бар толық автоматты Philips, батареяда 10 айға дейін жұмыс істейді.",
        "Alpha — толық автоматты құлып: ригельдер тұтқасыз өздігінен шығып-кіреді. Ылғалға төзімді корпус ауа райының өзгеруіне төзеді, ал AA батареяларынан қуат алу ай сайын зарядтаудың орнына шамамен 10 ай жұмыс береді."),
    en=("A fully automatic Philips with a moisture-resistant body and up to 10 months on batteries.",
        "Alpha is a fully automatic lock — the bolts extend and retract on their own, with no handle. The moisture-resistant body shrugs off weather swings, and AA batteries deliver about 10 months of use instead of monthly recharging."))

add("303-vp", title="303-VP", brand="philips", price=248000, order=6,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":20,"card":2,"key":2},
    features=["wifi","doorbell","auto","emergency-charge","rechargeable","video-peephole"],
    temp=(-20,60), power="li-5000", battery="4-6", app="Tuya Smart", warranty=2,
    interface=["en","zh"], colors=["charcoal"],
    ru=("Видеоглазок и Wi-Fi в угольно-чёрном корпусе. Интерфейс — английский и китайский.",
        "303-VP — полностью автоматический замок с видеоглазком и Wi-Fi: уведомление о госте приходит на телефон в Tuya Smart. Аккумулятор на 5000 мАч работает 4–6 месяцев. Обратите внимание: интерфейс замка только английский и китайский."),
    kk=("Көмір-қара корпустағы бейнекөзше және Wi-Fi. Интерфейс — ағылшын және қытай тілінде.",
        "303-VP — бейнекөзшесі және Wi-Fi бар толық автоматты құлып: қонақ туралы хабарлама телефонға Tuya Smart арқылы келеді. 5000 мАсағ аккумуляторы 4–6 ай жұмыс істейді. Назар аударыңыз: құлып интерфейсі тек ағылшын және қытай тілінде."),
    en=("A video peephole and Wi-Fi in a charcoal-black body. Interface in English and Chinese.",
        "303-VP is a fully automatic lock with a video peephole and Wi-Fi — guest alerts arrive on your phone in Tuya Smart. The 5000 mAh battery runs 4–6 months. Note that the lock interface is English and Chinese only."))

add("alpha-vp", title="Alpha VP", brand="philips", price=348000, order=7,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":10,"card":2,"key":2},
    features=["realtime","c-cylinder","push-pull","pir"],
    temp=(-20,60), power="li-5000", battery="4-6", app="HomeAccess", warranty=2,
    interface=["ru","en"], colors=["black"],
    ru=("Режим «толкни-потяни» и PIR-датчик, который будит замок при приближении.",
        "Alpha VP открывается движением «толкни-потяни» — без поворота ручки. PIR-датчик замечает человека у двери и заранее выводит замок из сна, поэтому отпечаток считывается мгновенно. Аккумулятор 5000 мАч рассчитан на 4–6 месяцев."),
    kk=("«Итер-тарт» режимі және жақындағанда құлыпты оятатын PIR-датчигі.",
        "Alpha VP «итер-тарт» қозғалысымен ашылады — тұтқаны бұрамай-ақ. PIR-датчигі есік алдындағы адамды байқап, құлыпты алдын ала ұйқыдан шығарады, сондықтан саусақ ізі бірден оқылады. 5000 мАсағ аккумуляторы 4–6 айға есептелген."),
    en=("A push-pull action and a PIR sensor that wakes the lock as you approach.",
        "Alpha VP opens with a push-pull motion — no handle to turn. The PIR sensor spots someone at the door and wakes the lock in advance, so the fingerprint reads instantly. The 5000 mAh battery is rated for 4–6 months."))

add("702-fvp", title="702 FVP", brand="philips", price=350000, order=8, featured=True,
    material="aluminum", access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":20,"face":50,"card":2,"key":2},
    features=["wifi","doorbell","double-check","emergency-charge","two-way-audio","rechargeable","video-peephole","auto"],
    temp=(-20,60), power="li-5000", battery="4-6", app="HomeAccess", warranty=2,
    interface=["ru","en"], colors=["charcoal"],
    ru=("Распознавание лица до 50 человек, видеоглазок и два аккумулятора вместо одного.",
        "702 FVP открывает дверь по лицу — до 50 профилей, — и делает это на ходу, пока вы подходите. Видеоглазок с двусторонней аудиосвязью показывает гостя на телефоне, а два аккумулятора вместо одного заметно увеличивают запас хода."),
    kk=("50 адамға дейін бет тану, бейнекөзше және бір емес, екі аккумулятор.",
        "702 FVP есікті бет арқылы ашады — 50 профильге дейін — және мұны сіз жақындап келе жатқанда жүріп бара жатып істейді. Екіжақты аудиобайланысы бар бейнекөзше қонақты телефонда көрсетеді, ал бір емес, екі аккумулятор жұмыс қорын айтарлықтай арттырады."),
    en=("Face recognition for up to 50 people, a video peephole and two batteries instead of one.",
        "702 FVP opens by face — up to 50 profiles — and does it on the move as you walk up. The video peephole with two-way audio shows the guest on your phone, and a second battery meaningfully extends the runtime."))

add("709-fvp", title="709 FVP", brand="philips", price=452000, order=9, featured=True,
    material="aluminum", access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":20,"face":50,"card":2,"key":2},
    features=["wifi","doorbell","pir","emergency-charge","two-way-audio","rechargeable","video-peephole","auto"],
    temp=(-20,60), power="li-5000", battery="4-6", app="HomeAccess", warranty=2,
    interface=["ru","en"], colors=["charcoal","bronze"],
    ru=("Face ID, PIR-датчик и видеоглазок в угольно-чёрном или медно-бронзовом корпусе.",
        "709 FVP — верхняя ступень линейки Philips до флагмана: распознавание лица, PIR-датчик приближения и видеоглазок с двусторонней связью. Единственная модель, где к угольно-чёрному добавлен медно-бронзовый корпус."),
    kk=("Face ID, PIR-датчик және бейнекөзше — көмір-қара немесе мыс-қола корпуста.",
        "709 FVP — флагманға дейінгі Philips желісінің жоғарғы сатысы: бет тану, PIR жақындау датчигі және екіжақты байланысы бар бейнекөзше. Көмір-қараға мыс-қола корпус қосылған жалғыз модель."),
    en=("Face ID, a PIR sensor and a video peephole in charcoal black or copper bronze.",
        "709 FVP sits just below the flagship in the Philips range: face recognition, a PIR proximity sensor and a video peephole with two-way audio. It is the only model that adds a copper-bronze body to the charcoal black."))

add("902-mvp", title="902 MVP", brand="philips", price=582000, order=10, featured=True,
    comingSoon=True, material="zinc-glass",
    access=["fingerprint","pin","face","palm","card","key","app"],
    limits={"fingerprint":100,"pin":60,"face":50,"palm":50,"card":2,"key":2},
    features=["wifi","doorbell","pir","voice-change","wireless-charge","two-way-audio","triple-camera","rechargeable","video-peephole","auto"],
    temp=(-20,60), power="li-5000", battery="3-6", app="HomeAccess", warranty=2,
    interface=["ru","en"], colors=["obsidian","gold"],
    ru=("Флагман Philips: три камеры, вены ладони, беспроводная подзарядка и изменение голоса по видеосвязи.",
        "902 MVP — самый оснащённый замок каталога. Три камеры закрывают подход к двери целиком, открытие возможно по лицу и венам ладони, а во время видеозвонка голос можно изменить — полезно, когда дома ребёнок. Корпус — цинковый сплав с закалённым стеклом."),
    kk=("Philips флагманы: үш камера, алақан тамыры, сымсыз қуаттандыру және бейнебайланыста дауысты өзгерту.",
        "902 MVP — каталогтағы ең жабдықталған құлып. Үш камера есікке жақындауды толық қамтиды, ашу бет және алақан тамыры арқылы мүмкін, ал бейнеқоңырау кезінде дауысты өзгертуге болады — үйде бала болғанда пайдалы. Корпус — шыңдалған шынысы бар мырыш қорытпасы."),
    en=("The Philips flagship: three cameras, palm-vein entry, wireless charging and voice changing on video calls.",
        "902 MVP is the most equipped lock in the catalogue. Three cameras cover the whole approach to the door, entry works by face and palm vein, and your voice can be altered during a video call — useful when a child is home alone. The body is zinc alloy with tempered glass."))

# ── Smartlock ────────────────────────────────────────────────────────────────
add("s819", title="S819", brand="smartlock", price=70000, order=1,
    material="aluminum-glass", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":50,"card":2,"key":2},
    features=["tamper-alarm","low-battery","emergency-charge"],
    temp=(-25,70), power="aa4", battery="10", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Самый доступный замок каталога: биометрия, сигнализация о вскрытии и работа до −25 °C.",
        "S819 — самый доступный вход в умные замки. Отпечаток, пин-код, карта и ключ, сигнализация при попытке вскрытия и предупреждение о низком заряде. Рабочий диапазон до −25 °C — с запасом для казахстанской зимы."),
    kk=("Каталогтағы ең қолжетімді құлып: биометрия, бұзу дабылы және −25 °C дейін жұмыс.",
        "S819 — ақылды құлыптарға ең қолжетімді кіру нүктесі. Саусақ ізі, пин-код, карта және кілт, бұзуға әрекет жасағанда дабыл және заряд төмендегені туралы ескерту. Жұмыс диапазоны −25 °C дейін — қазақстандық қысқа қормен."),
    en=("The most affordable lock in the catalogue: biometrics, a tamper alarm and operation down to −25 °C.",
        "S819 is the most affordable way into smart locks. Fingerprint, PIN, card and key, an alarm on tampering attempts and a low-battery warning. It works down to −25 °C — with margin for a Kazakhstani winter."))

add("g18", title="G18", brand="smartlock", price=85000, order=2, kazakhBrand=True,
    material="aluminum-glass", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":100,"card":2,"key":2},
    features=["tamper-alarm","low-battery","emergency-charge"],
    temp=(-20,60), power="aa4", battery="10", app="TTLock", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Замок под маркой iLock: до 100 отпечатков и 100 пин-кодов, управление через TTLock.",
        "G18 продаётся под маркой iLock и рассчитан на квартиры, где ключи нужны многим: до 100 отпечатков и до 100 пин-кодов. Приложение TTLock позволяет выдать временный код гостю или бригаде и отозвать его в любой момент."),
    kk=("iLock маркасымен шығатын құлып: 100 саусақ ізі және 100 пин-кодқа дейін, TTLock арқылы басқару.",
        "G18 iLock маркасымен сатылады және кілт көп адамға қажет пәтерлерге есептелген: 100 саусақ ізіне және 100 пин-кодқа дейін. TTLock қосымшасы қонаққа немесе бригадаға уақытша код беріп, оны кез келген сәтте қайтарып алуға мүмкіндік береді."),
    en=("A lock sold under the iLock badge: up to 100 fingerprints and 100 PINs, managed through TTLock.",
        "G18 is sold under the iLock badge and suits homes where many people need access: up to 100 fingerprints and 100 PINs. The TTLock app lets you issue a temporary code to a guest or a work crew and revoke it at any moment."))

add("s819-2max", title="S819-2Max", brand="smartlock", price=90000, order=3,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":100,"pin":100,"card":2,"key":2},
    features=["wifi","video-peephole","doorbell","tamper-alarm","emergency-charge"],
    temp=(-20,60), power="aa4", battery="10", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Экран, видеоглазок и Wi-Fi — но всё ещё на батарейках AA с запасом на 10 месяцев.",
        "S819-2Max добавляет к обычному замку экран и видеоглазок: видно, кто за дверью, не открывая её. При этом модель работает от батареек AA — около 10 месяцев без обслуживания, тогда как большинство замков с экраном требуют подзарядки каждые 4–6 месяцев."),
    kk=("Экран, бейнекөзше және Wi-Fi — бірақ әлі де 10 айға жететін AA батареяларында.",
        "S819-2Max кәдімгі құлыпқа экран мен бейнекөзше қосады: есікті ашпай-ақ, ар жағында кім тұрғанын көресіз. Сонымен қатар модель AA батареяларынан жұмыс істейді — қызмет көрсетусіз шамамен 10 ай, ал экраны бар құлыптардың көбі әр 4–6 айда зарядтауды талап етеді."),
    en=("A screen, a video peephole and Wi-Fi — still running on AA batteries for about 10 months.",
        "S819-2Max adds a screen and a video peephole to an ordinary lock, so you can see who is outside without opening it. It still runs on AA batteries — roughly 10 months hands-off, where most screen-equipped locks need recharging every 4–6 months."))

add("q28s", title="Q28S", brand="smartlock", price=120000, order=4,
    material="aluminum", access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":100,"face":50,"card":2,"key":2},
    features=["wifi","doorbell","tamper-alarm","emergency-charge","two-way-audio","rechargeable","video-peephole","semi-auto"],
    temp=(-20,60), power="li-4200", battery="4-6", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Распознавание лица и видеоглазок дешевле, чем у Philips, — в фактурном корпусе с изгибом.",
        "Q28S даёт распознавание лица, видеоглазок и двустороннюю аудиосвязь заметно дешевле, чем сопоставимые Philips. Заметный изогнутый корпус выделяет модель среди прямых панелей, а аккумулятор 4200 мАч держит 4–6 месяцев."),
    kk=("Бет тану және бейнекөзше Philips-ке қарағанда арзан — иілген, ерекше корпуста.",
        "Q28S бет тануды, бейнекөзшені және екіжақты аудиобайланысты салыстырмалы Philips модельдеріне қарағанда әлдеқайда арзан ұсынады. Ерекше иілген корпус модельді түзу панельдерден бөліп тұрады, ал 4200 мАсағ аккумуляторы 4–6 айға жетеді."),
    en=("Face recognition and a video peephole for less than Philips — in a distinctive curved body.",
        "Q28S delivers face recognition, a video peephole and two-way audio for noticeably less than comparable Philips models. The curved body sets it apart from flat panels, and the 4200 mAh battery lasts 4–6 months."))

add("s959-max", title="S959 Max", brand="smartlock", price=125000, order=5,
    material="aluminum", access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":100,"face":50,"card":2,"key":2},
    features=["wifi","doorbell","tamper-alarm","emergency-charge","two-way-audio","rechargeable","video-peephole","semi-auto"],
    temp=(-20,60), power="li-4200", battery="4-6", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Face ID, экран и охранная сигнализация в узком вертикальном корпусе.",
        "S959 Max собирает всё нужное для квартиры: распознавание лица до 50 профилей, экран с видеоглазком, двусторонняя связь и охранная сигнализация. Узкий вертикальный корпус подходит для стандартных металлических дверей."),
    kk=("Face ID, экран және күзет дабылы — тар тік корпуста.",
        "S959 Max пәтерге қажеттінің бәрін жинайды: 50 профильге дейін бет тану, бейнекөзшесі бар экран, екіжақты байланыс және күзет дабылы. Тар тік корпус стандартты темір есіктерге келеді."),
    en=("Face ID, a screen and a security alarm in a slim vertical body.",
        "S959 Max gathers what a flat needs: face recognition for up to 50 profiles, a screen with a video peephole, two-way audio and a security alarm. The slim vertical body fits standard steel doors."))

add("s940-max", title="S940 Max", brand="smartlock", price=130000, order=6,
    material="aluminum", access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":100,"face":50,"card":2,"key":2},
    features=["wifi","doorbell","realtime","emergency-charge","two-way-audio","rechargeable","video-peephole","semi-auto"],
    temp=(-20,60), power="li-4200", battery="4-6", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Мониторинг в реальном времени: можно подключиться к камере замка в любой момент.",
        "S940 Max отличает мониторинг в реальном времени — камеру замка можно открыть из Tuya Smart когда угодно, а не только по звонку в дверь. Плюс распознавание лица, экран и двусторонняя аудиосвязь."),
    kk=("Нақты уақыттағы мониторинг: құлып камерасына кез келген сәтте қосылуға болады.",
        "S940 Max нақты уақыттағы мониторингімен ерекшеленеді — құлып камерасын Tuya Smart арқылы қоңырау шалынғанда ғана емес, кез келген уақытта ашуға болады. Оған қоса бет тану, экран және екіжақты аудиобайланыс."),
    en=("Real-time monitoring: you can open the lock's camera at any moment.",
        "S940 Max stands out for real-time monitoring — the lock's camera can be opened from Tuya Smart whenever you like, not only when someone rings. Face recognition, a screen and two-way audio round it out."))

add("v6j", title="V6J", brand="smartlock", price=150000, order=7, featured=True,
    material="aluminum", access=["fingerprint","pin","face","card","key","app"],
    limits={"fingerprint":100,"pin":100,"face":50,"card":2,"key":2},
    features=["wifi","doorbell","tamper-alarm","emergency-charge","two-way-audio","rechargeable","video-peephole","semi-auto"],
    temp=(-20,60), power="li-4200", battery="4-6", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Старший Smartlock: большой AI-экран, Face ID и видеоглазок в едином стеклянном корпусе.",
        "V6J — верх линейки Smartlock. Крупный экран с AI-камерой занимает всю внешнюю панель, распознавание лица работает до 50 профилей, а видеоглазок с двусторонней связью выводит гостя на телефон."),
    kk=("Smartlock желісінің үлкені: үлкен AI-экран, Face ID және бейнекөзше біртұтас шыны корпуста.",
        "V6J — Smartlock желісінің шыңы. AI-камерасы бар ірі экран сыртқы панельді толық алып жатыр, бет тану 50 профильге дейін жұмыс істейді, ал екіжақты байланысы бар бейнекөзше қонақты телефонға шығарады."),
    en=("The top Smartlock: a large AI screen, Face ID and a video peephole in one glass body.",
        "V6J tops the Smartlock range. A large screen with an AI camera fills the outer panel, face recognition handles up to 50 profiles, and the video peephole with two-way audio puts the guest on your phone."))

add("s31b", title="S31B", brand="smartlock", price=90000, order=8,
    material="steel", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":200,"pin":150,"card":2,"key":2},
    features=["slim-door","waterproof","bluetooth","anti-pry"],
    temp=(-25,60), power="aa4", battery="10", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["gold","silver","titanium","black"],
    ru=("Нержавеющая сталь, до 200 отпечатков и четыре цвета — для узкопрофильных дверей.",
        "S31B рассчитан на узкопрофильные двери и вмещает больше пользователей, чем любая другая модель каталога: до 200 отпечатков и 150 пин-кодов. Корпус из нержавеющей стали доступен в золотом, серебристом, титаново-сером и чёрном."),
    kk=("Тот баспайтын болат, 200 саусақ ізіне дейін және төрт түс — тар профильді есіктерге.",
        "S31B тар профильді есіктерге есептелген және каталогтағы кез келген модельден көп пайдаланушыны сыйдырады: 200 саусақ ізіне және 150 пин-кодқа дейін. Тот баспайтын болат корпус алтын, күміс, титан-сұр және қара түсте қолжетімді."),
    en=("Stainless steel, up to 200 fingerprints and four colours — for narrow-profile doors.",
        "S31B is built for narrow-profile doors and holds more users than any other model in the catalogue: up to 200 fingerprints and 150 PINs. The stainless-steel body comes in gold, silver, titanium grey and black."))

add("g10s", title="G10S", brand="smartlock", price=60000, order=9,
    material="aluminum", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":50,"pin":100,"card":2,"key":2},
    features=["glass-door","anti-pry"],
    temp=(-20,65), power="aa4", battery="10", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Для стеклянных дверей: офисы, салоны и шоурумы — без сверления полотна.",
        "G10S ставится на стеклянные двери — офис, салон, шоурум — и не требует сверлить полотно. Отпечаток, пин-код, карта и приложение Tuya Smart, питание от батареек AA примерно на 10 месяцев."),
    kk=("Шыны есіктерге: кеңселер, салондар және шоурумдар — есікті бұрғылаусыз.",
        "G10S шыны есіктерге орнатылады — кеңсе, салон, шоурум — және есікті бұрғылауды қажет етпейді. Саусақ ізі, пин-код, карта және Tuya Smart қосымшасы, AA батареяларынан шамамен 10 ай қуат."),
    en=("For glass doors: offices, salons and showrooms — no drilling of the panel.",
        "G10S mounts on glass doors — office, salon, showroom — without drilling the panel. Fingerprint, PIN, card and the Tuya Smart app, powered by AA batteries for about 10 months."))

add("s604l", title="S604L", brand="smartlock", price=50000, order=10,
    material="zinc", access=["fingerprint","pin","card","key","app"],
    limits={"fingerprint":50,"pin":100,"card":2,"key":2},
    features=["anti-pry","waterproof","bluetooth"],
    temp=(-20,70), power="aa4", battery="10", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["black"],
    ru=("Врезной замок-ручка для межкомнатных и офисных дверей — биометрия за 50 000 ₸.",
        "S604L — компактный замок-ручка для межкомнатных, офисных и внутренних дверей, где полноценная панель избыточна. Сканер отпечатка встроен прямо в ручку, до 50 отпечатков и 100 пин-кодов."),
    kk=("Бөлмеаралық және кеңсе есіктеріне арналған кіріктірме тұтқа-құлып — 50 000 ₸ биометрия.",
        "S604L — толыққанды панель артық болатын бөлмеаралық, кеңсе және ішкі есіктерге арналған ықшам тұтқа-құлып. Саусақ ізі сканері тікелей тұтқаға кіріктірілген, 50 саусақ ізіне және 100 пин-кодқа дейін."),
    en=("A mortise handle-lock for interior and office doors — biometrics for 50,000 ₸.",
        "S604L is a compact handle-lock for interior, office and internal doors where a full panel is overkill. The fingerprint reader sits in the handle itself, holding up to 50 prints and 100 PINs."))

add("hotel", title="Гостиничный замок", brand="smartlock", price=50000, order=11,
    material="steel", access=["card","master-card"], limits={"card":1},
    features=["software","programmer"],
    temp=(-20,70), power="aa4", battery="10", warranty=1,
    interface=["ru"], colors=["black"],
    ru=("Карточный замок для гостиниц и хостелов: мастер-карта для персонала и программатор в комплекте.",
        "Замок для гостиниц, хостелов и апарт-отелей: гость открывает номер картой, персонал — мастер-картой. Программатор и общая программа позволяют перевыпускать карты на стойке за секунды, без перенастройки самого замка."),
    kk=("Қонақүйлер мен хостелдерге арналған карта-құлып: қызметкерлерге мастер-карта және бағдарламалағыш жинақта.",
        "Қонақүйлерге, хостелдерге және апарт-отельдерге арналған құлып: қонақ нөмірді картамен ашады, қызметкер — мастер-картамен. Бағдарламалағыш пен ортақ бағдарлама карталарды тіркеу орнында секундтарда қайта шығаруға мүмкіндік береді, құлыптың өзін қайта баптамай-ақ."),
    en=("A card lock for hotels and hostels: a staff master card and a programmer included.",
        "A lock for hotels, hostels and apart-hotels: guests open the room with a card, staff with a master card. The programmer and shared software let the front desk reissue cards in seconds without reconfiguring the lock itself."))

add("cabinet", title="Электронный замок для шкафа", brand="smartlock", price=15000, priceTo=25000,
    order=12, material="zinc", access=["pin","card","master-card"], limits={"pin":100,"card":1},
    features=["software","programmer"],
    temp=(-10,50), power="aa4", battery="10", app="Tuya Smart", warranty=1,
    interface=["ru","kk"], colors=["silver","coffee"],
    ru=("Для шкафчиков в спортзалах, бассейнах и раздевалках — пин-код или карта, два цвета.",
        "Компактный замок для шкафчиков в спортзалах, бассейнах, банях и раздевалках. Открывается пин-кодом или картой, мастер-карта персонала вскрывает любой шкафчик. Доступен в серебристом и кофейном цвете."),
    kk=("Спортзалдардағы, бассейндердегі және киім ауыстыратын бөлмелердегі шкафтарға — пин-код немесе карта, екі түс.",
        "Спортзалдардағы, бассейндердегі, моншалардағы және киім ауыстыратын бөлмелердегі шкафтарға арналған ықшам құлып. Пин-код немесе картамен ашылады, қызметкердің мастер-картасы кез келген шкафты ашады. Күміс және кофе түстерінде қолжетімді."),
    en=("For lockers in gyms, pools and changing rooms — PIN or card, two colours.",
        "A compact lock for lockers in gyms, pools, saunas and changing rooms. It opens by PIN or card, and a staff master card opens any locker. Available in silver and coffee."))

add("d501", title="D501", brand="smartlock", price=30000, order=13,
    material="zinc", access=["fingerprint","key","app"], limits={"fingerprint":100,"key":2},
    features=["ip67","rechargeable","bluetooth","emergency-charge"],
    temp=(-20,70), power="li-ion", battery="4-6", app="TTLock", warranty=1,
    interface=["ru"], colors=["black"],
    ru=("Навесной замок с отпечатком и IP67: склады, ворота, контейнеры и гаражи.",
        "D501 — навесной замок для склада, ворот, контейнера или гаража. Открывается отпечатком или приложением TTLock, механический ключ остаётся как резерв. Защита IP67 позволяет держать его под открытым небом."),
    kk=("Саусақ ізі және IP67 бар аспалы құлып: қоймалар, қақпалар, контейнерлер және гараждар.",
        "D501 — қойма, қақпа, контейнер немесе гаражға арналған аспалы құлып. Саусақ ізімен немесе TTLock қосымшасымен ашылады, механикалық кілт қор ретінде қалады. IP67 қорғанысы оны ашық аспан астында ұстауға мүмкіндік береді."),
    en=("A padlock with fingerprint entry and IP67: warehouses, gates, containers and garages.",
        "D501 is a padlock for a warehouse, gate, container or garage. It opens by fingerprint or the TTLock app, with a mechanical key kept as backup. IP67 protection lets it live outdoors."))

add("101t", title="101T", brand="smartlock", price=28800, order=14,
    material="zinc", access=["fingerprint"], limits={"fingerprint":50},
    features=["ip67","rechargeable","bluetooth","emergency-charge"],
    temp=(-10,45), power="li", battery="4-6", warranty=1,
    interface=["ru"], colors=["black"],
    ru=("Компактный навесной замок, который открывается одним касанием пальца.",
        "101T открывается прикосновением пальца — ни ключа, ни кода. Подходит для шкафчиков, кладовых, чемоданов и велосипедов. Заряда хватает на 4–6 месяцев, корпус защищён по IP67."),
    kk=("Саусақтың бір тиюімен ашылатын ықшам аспалы құлып.",
        "101T саусақтың тиюімен ашылады — кілт те, код та керек емес. Шкафтарға, қоймаларға, чемодандарға және велосипедтерге келеді. Заряды 4–6 айға жетеді, корпус IP67 бойынша қорғалған."),
    en=("A compact padlock that opens with a single touch of a finger.",
        "101T opens at the touch of a finger — no key, no code. It suits lockers, storerooms, suitcases and bicycles. A charge lasts 4–6 months and the body is IP67-rated."))

add("101p", title="101P", brand="smartlock", price=17000, order=15,
    material="zinc", access=["pin"], limits={"pin":10},
    features=["ip67","rechargeable"],
    temp=(-10,45), power="li", battery="4-6", warranty=1,
    interface=["ru"], colors=["black"],
    ru=("Самый доступный замок каталога: навесной, на пин-коде, с защитой IP67.",
        "101P — навесной замок на пин-коде и самая доступная позиция каталога. Ключи не нужны совсем: код набирается на кнопках. Защита IP67 и заряд на 4–6 месяцев."),
    kk=("Каталогтағы ең қолжетімді құлып: аспалы, пин-кодпен, IP67 қорғанысымен.",
        "101P — пин-кодпен жұмыс істейтін аспалы құлып және каталогтың ең қолжетімді позициясы. Кілт мүлдем қажет емес: код түймелерде теріледі. IP67 қорғанысы және 4–6 айға заряд."),
    en=("The most affordable lock in the catalogue: a padlock with a PIN and IP67 protection.",
        "101P is a PIN-operated padlock and the most affordable item in the catalogue. Keys are not needed at all — the code is entered on the buttons. IP67 protection and a 4–6 month charge."))

BRAND_NAME = {"ilock":"iLock","philips":"Philips","smartlock":"Smartlock"}
SEO = {
 "ru": lambda t,b: (f"{t} — купить умный замок {b} в Казахстане | iLOCK",),
 "kk": lambda t,b: (f"{t} — Қазақстанда {b} ақылды құлыпты сатып алу | iLOCK",),
 "en": lambda t,b: (f"{t} — buy {'an' if b[0] in 'iaeou' else 'a'} {b} smart lock in Kazakhstan | iLOCK",),
}

def esc(s): return s.replace('"', '\\"')

def block(lang, title, brandname, desc, body):
    seo_t = SEO[lang](title, brandname)[0]
    seo_d = desc if len(desc) <= 158 else desc[:155].rstrip() + "…"
    return (f'{lang}:\n'
            f'  description: "{esc(desc)}"\n'
            f'  seoTitle: "{esc(seo_t)}"\n'
            f'  seoDescription: "{esc(seo_d)}"\n'
            f'  body: >-\n' + textwrap.indent(textwrap.fill(body, 96), "    ") + "\n")

os.makedirs(OUT, exist_ok=True)
for f in os.listdir(OUT):
    if f.endswith(".md"): os.remove(os.path.join(OUT, f))

for slug, d in P.items():
    bn = BRAND_NAME[d["brand"]]
    lines = ["---", f'title: "{d["title"]}"', f'brand: "{d["brand"]}"']
    if d.get("kazakhBrand"): lines.append("kazakhBrand: true")
    if d.get("comingSoon"):  lines.append("comingSoon: true")
    lines.append(f'price: {d["price"]}')
    if d.get("priceTo"): lines.append(f'priceTo: {d["priceTo"]}')
    lines.append(f'image: "../../assets/images/locks/{slug}.png"')
    lines.append(f'order: {d["order"]}')
    if d.get("featured"): lines.append("featured: true")
    lines.append(f'material: "{d["material"]}"')
    lines.append("access:")
    lines += [f'  - "{a}"' for a in d["access"]]
    if d.get("limits"):
        lines.append("limits:")
        lines += [f'  {k}: {v}' for k, v in d["limits"].items()]
    if d.get("features"):
        lines.append("features:")
        lines += [f'  - "{f}"' for f in d["features"]]
    lines.append(f'temp:\n  min: {d["temp"][0]}\n  max: {d["temp"][1]}')
    lines.append(f'power: "{d["power"]}"')
    lines.append(f'battery: "{d["battery"]}"')
    if d.get("app"): lines.append(f'app: "{d["app"]}"')
    lines.append(f'warranty: {d["warranty"]}')
    lines.append("interface:")
    lines += [f'  - "{i}"' for i in d["interface"]]
    lines.append("colors:")
    lines += [f'  - "{c}"' for c in d["colors"]]
    for lang in ("ru", "kk", "en"):
        desc, body = d[lang]
        lines.append(block(lang, d["title"], bn, desc, body))
    lines.append("---")
    lines.append("")
    open(os.path.join(OUT, f"{slug}.md"), "w").write("\n".join(lines))

print(f"wrote {len(P)} files")
by = {}
for s, d in P.items(): by.setdefault(d["brand"], []).append(s)
for b, v in by.items(): print(f"  {b:10s} {len(v):2d}  {' '.join(sorted(v))}")
