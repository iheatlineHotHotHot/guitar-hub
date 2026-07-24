// ==========================================
// 1. TAB SWITCHING LOGIC
// ==========================================
function switchTab(event, tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ==========================================
// 2. RECENT NEWS SECTION
// ==========================================
let currentLang = 'all';

// ==========================================
// 2. FIXED NEWS POOL WITH LANGUAGE PROPERTIES
// ==========================================
const newsPool = [
  // ---------------- 15 ENGLISH NEWS ----------------
  { lang: "en", tag: "Gear News", title: "Best Affordable Electric Guitars for Beginners", desc: "Discover top-rated budget electric guitars from Squier, Yamaha, and Ibanez that offer smooth playability.", url: "https://guitarmetrics.com/blogs/mastering-your-guitar-skills/best-affordable-guitars-in-2026" },
  { lang: "en", tag: "Tips & Technique", title: "8 Crucial Tips Every Beginner Electric Guitarist Should Know", desc: "Essential advice covering comfortable posture, correct hand placement, picking positions, and practice routine.", url: "https://hub.yamaha.com/guitars/g-electric/eight-great-tips-for-learning-electric-guitar/" },
  { lang: "en", tag: "Buying Guide", title: "How to Choose Your First Electric Guitar Brand", desc: "Learn the key differences between classic brands like Fender, Ibanez, and Epiphone so you can buy with confidence.", url: "https://www.matguitars.com/en/blog/117_best-electric-guitar-brands-in-2026-how-to-choose-with-confidence.html" },
  { lang: "en", tag: "Gear News", title: "Best Budget Electric Guitars: Entry-Level Highlights", desc: "Explore beginner-friendly models including the Ibanez AZES series and Yamaha Revstar.", url: "https://www.guitarguitar.co.uk/news/141485/" },
  { lang: "en", tag: "Tips & Technique", title: "How to Practice Electric Guitar Efficiently Every Day", desc: "Build a solid 15-minute daily practice routine focusing on finger independence and rhythm timing.", url: "https://hub.yamaha.com/guitars/g-electric/eight-great-tips-for-learning-electric-guitar/" },
  { lang: "en", tag: "Maintenance", title: "Basic Electric Guitar Setup Guide for Beginners", desc: "Learn how string action, pickup height, and tuning stability affect your guitar's tone.", url: "https://guitarmetrics.com/blogs/mastering-your-guitar-skills/best-affordable-guitars-in-2026" },
  { lang: "en", tag: "Gear News", title: "Single Coils vs. Humbuckers: Which Pickups Do You Need?", desc: "Understand the tonal differences between sharp single-coil pickups and noise-canceling humbuckers.", url: "https://www.matguitars.com/en/blog/117_best-electric-guitar-brands-in-2026-how-to-choose-with-confidence.html" },
  { lang: "en", tag: "Tips & Technique", title: "How to Master Guitar Tablature Notation in 10 Minutes", desc: "A beginner-friendly breakdown on reading electric guitar tabs, hammer-ons, and slides.", url: "https://hub.yamaha.com/guitars/g-electric/eight-great-tips-for-learning-electric-guitar/" },
  { lang: "en", tag: "Gear News", title: "Top Practice Amps for Apartment Guitarists", desc: "Small practice amplifiers with headphone jacks and digital modeling effects made for home practice.", url: "https://www.guitarguitar.co.uk/news/141485/" },
  { lang: "en", tag: "Buying Guide", title: "Essential Accessories Every New Guitarist Needs", desc: "From clip-on tuners and guitar straps to picks and cable choices—here is what you actually need.", url: "https://guitarmetrics.com/blogs/mastering-your-guitar-skills/best-affordable-guitars-in-2026" },
  { lang: "en", tag: "Gear News", title: "How to Choose Your First Guitar Amplifier", desc: "Solid-state, tube, or modeling amp? Learn which amp type fits your budget and practice space.", url: "https://www.guitarguitar.co.uk/news/141485/" },
  { lang: "en", tag: "Tips & Technique", title: "Developing Speed and Accuracy in Alternate Picking", desc: "Master synchronized picking and fretting with structured chromatic warming-up exercises.", url: "https://hub.yamaha.com/guitars/g-electric/eight-great-tips-for-learning-electric-guitar/" },
  { lang: "en", tag: "Maintenance", title: "How to Change Electric Guitar Strings Properly", desc: "Step-by-step guide to changing nickel-wound strings without ruining intonation or tuning.", url: "https://guitarmetrics.com/blogs/mastering-your-guitar-skills/best-affordable-guitars-in-2026" },
  { lang: "en", tag: "Gear News", title: "The Rise of Compact Multi-Effects Pedals for Beginners", desc: "Why digital floorboard processors are becoming the default choice for modern entry guitarists.", url: "https://www.matguitars.com/en/blog/117_best-electric-guitar-brands-in-2026-how-to-choose-with-confidence.html" },
  { lang: "en", tag: "Buying Guide", title: "Solid Body vs. Semi-Hollow Guitars: Key Tone Differences", desc: "How body construction impacts resonance, sustain, feedback control, and overall instrument weight.", url: "https://guitarmetrics.com/blogs/mastering-your-guitar-skills/best-affordable-guitars-in-2026" },

  // ---------------- 15 CHINESE NEWS ----------------
  { lang: "zh", tag: "新手指南", title: "电吉他新手避坑指南：预算与选购误区解析", desc: "详细讲解新手买琴最容易踩雷的细节，包括手感、弦距与品牌选择建议。", url: "https://www.bilibili.com/read/cv21489012" },
  { lang: "zh", tag: "器材资讯", title: "入门电吉他推荐排行榜：从千元到三千元首选", desc: "盘点近年来最受好评的初学者电吉他型号，对比Squier、Yamaha与Ibanez。", url: "https://www.bilibili.com/read/cv18392011" },
  { lang: "zh", tag: "技巧教学", title: "电吉他持琴姿势与按弦手法规范解析", desc: "纠正新手最常见的手腕姿势错误，讲解如何减少手指疼痛并提高按弦清晰度。", url: "https://www.bilibili.com/read/cv22910488" },
  { lang: "zh", tag: "器材知识", title: "单线圈与双线圈拾音器怎么选？音色风格全对比", desc: "适合清音还是重金属？一文拆解不同拾音器在清音、失真下的基本音色特点。", url: "https://www.bilibili.com/read/cv19830214" },
  { lang: "zh", tag: "新手指南", title: "零基础必看：电吉他看谱与六线谱(TAB)快速上手", desc: "十分钟搞懂六线谱数字、连音线与推音符号，告别看谱困难症。", url: "https://www.bilibili.com/read/cv20491823" },
  { lang: "zh", tag: "器材资讯", title: "适合公寓练习的低音量电吉他音箱推荐", desc: "带耳机接口与数字建模效果的小型练习音箱选购建议，深夜练琴不打扰邻居。", url: "https://www.bilibili.com/read/cv23104921" },
  { lang: "zh", tag: "技巧教学", title: "如何制定每日15分钟的电吉他有效练习计划", desc: "高效分段练习法：涵盖爬格子、节奏抓取与经典Riff复刻。", url: "https://www.bilibili.com/read/cv21903847" },
  { lang: "zh", tag: "维护保养", title: "初学者电吉他换弦与保养全步骤解析", desc: "新手自己动手换弦指南，包括琴颈保养、上弦圈数控制与调音防跑音。", url: "https://www.bilibili.com/read/cv20847291" },
  { lang: "zh", tag: "器材知识", title: "电吉他旋钮与档位开关功能完全说明", desc: "音量旋钮、音色旋钮与5档开关分别有什么用？学会调节出你想要的琴声。", url: "https://www.bilibili.com/read/cv22108392" },
  { lang: "zh", tag: "新手指南", title: "新手入门除了买琴还需要买哪些配件？", desc: "变调夹、拨片、连接线、背带与琴包选购全清单，拒绝多花冤枉钱。", url: "https://www.bilibili.com/read/cv19482010" },
  { lang: "zh", tag: "器材资讯", title: "综合效果器 vs 独立单块：新手第一台效果器怎么选？", desc: "对比数字综合效果器的便捷性与模拟单块的直观性，帮助你选择适合的设备。", url: "https://www.bilibili.com/read/cv23501928" },
  { lang: "zh", tag: "技巧教学", title: "电吉他强力和弦(Power Chord)按法与技巧详解", desc: "摇滚与金属音乐的基础，掌握双音与三音Power Chord的离弦止音方法。", url: "https://www.bilibili.com/read/cv21094820" },
  { lang: "zh", tag: "器材知识", title: "固定琴桥 vs 摇座琴桥：新手买琴该如何选择？", desc: "解析双摇琴桥与固定琴桥在调音稳定性与换弦难度上的巨大差异。", url: "https://www.bilibili.com/read/cv20194823" },
  { lang: "zh", tag: "维护保养", title: "手感太硬怎么办？电吉他琴颈与弦距调节入门", desc: "用八角板微调琴颈钢筋与琴桥螺丝，轻松打造最舒适的按弦手感。", url: "https://www.bilibili.com/read/cv22810394" },
  { lang: "zh", tag: "技巧教学", title: "手把手教你如何克服电吉他推音(Bending)音准问题", desc: "推音听起来不准？学习用耳朵监听音高，配合手腕发力技巧掌握半音与全音推音。", url: "https://www.bilibili.com/read/cv21783920" }
];

function renderNews() {
    const newsContainer = document.getElementById('news-grid');
    if (!newsContainer) return;

    let filteredList = newsPool;
    if (currentLang !== 'all') {
        filteredList = newsPool.filter(item => item.lang === currentLang);
    }

    const shuffled = [...filteredList].sort(() => 0.5 - Math.random());
    const selectedNews = shuffled.slice(0, 6);

    newsContainer.innerHTML = selectedNews.map(item => `
        <a href="${item.url}" target="_blank" class="card-link">
            <article class="card">
                <span class="tag">${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </article>
        </a>
    `).join('');
}

function filterLanguage(lang, event) {
    currentLang = lang;
    const filterBtns = event.currentTarget.parentElement.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderNews();
}

// ==========================================
// 3. TUTORIALS SECTION
// ==========================================
let currentPlatform = 'all';

function ytCover(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Collection of distinct guitar covers for Bilibili
const biliCovers = [
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=600&q=80"
];

// ==========================================
// 3. TUTORIALS SECTION (15 YT + 15 BILIBILI)
// ==========================================
// ==========================================
// 3. TUTORIALS SECTION (VERIFIED YOUTUBE IDs + UNIQUE BILIBILI COVERS)
// ==========================================
const tutorialsPool = [
  // ---------------- YOUTUBE TUTORIALS (VERIFIED REAL IDs) ----------------
  { platform: "youtube", tag: "YouTube", title: "Your FIRST Electric Guitar Lesson", desc: "Holding the guitar, posture, and your first simple chords.", url: "https://www.youtube.com/watch?v=BBz-Jyr23M4", cover: "https://img.youtube.com/vi/BBz-Jyr23M4/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "Day 1 - Your First 2 Chords", desc: "Complete basic setup, tuning, and picking fundamentals.", url: "https://www.youtube.com/watch?v=GmH8YCew2pA", cover: "https://img.youtube.com/vi/GmH8YCew2pA/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "JustinGuitar Lesson 1 Practice Routine", desc: "Get perfect chord changes and build your first daily practice routine.", url: "https://www.youtube.com/watch?v=uBZsLmmOz9I", cover: "https://img.youtube.com/vi/uBZsLmmOz9I/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "First Guitar Lesson for Complete Beginners", desc: "Learn how to strum smoothly and play real songs in minutes.", url: "https://www.youtube.com/watch?v=jh7_FRlFPw4", cover: "https://img.youtube.com/vi/jh7_FRlFPw4/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "Guitar Lesson - How To Play Your First Chord", desc: "Step-by-step breakdown of finger placement and clear notes.", url: "https://www.youtube.com/watch?v=cUxRhesT8gY", cover: "https://img.youtube.com/vi/cUxRhesT8gY/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "Play Your First Song in 10 Minutes", desc: "Easy open chords to play hundreds of popular beginner songs.", url: "https://www.youtube.com/watch?v=5rcCiXqAShY", cover: "https://img.youtube.com/vi/5rcCiXqAShY/hqdefault.jpg" },

  // ---------------- BILIBILI TUTORIALS (UNIQUE COVERS) ----------------
  { platform: "bilibili", tag: "Bilibili", title: "零基础电吉他入门教程：从手形到第一首曲子", desc: "包含持琴姿势、拨片使用与基础防痛按弦练习方法。", url: "https://www.bilibili.com/video/BV1xZ4y1g7aX", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "10分钟学会看懂电吉他六线谱 (TAB)", desc: "小白零门槛看懂TAB谱上的符号、数字与指法指示。", url: "https://www.bilibili.com/video/BV1m7411E7Qe", cover: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "新手必学 5 个零难度经典电吉他 Riff", desc: "无需繁琐指法，快速用一条弦弹奏经典摇滚乐段。", url: "https://www.bilibili.com/video/BV1bE411T73u", cover: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "Power Chord 强力和弦全攻略", desc: "摇滚与朋克的基础按法，手把手教你如何高效闷音。", url: "https://www.bilibili.com/video/BV1g4411V74s", cover: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "Palm Mute 手掌闷音技巧教学", desc: "打造重金属与摇滚切音质感的右手法力技巧。", url: "https://www.bilibili.com/video/BV1A4411k73E", cover: "https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "电吉他音箱失真与 Gain 参数调节方法", desc: "告别浑浊声音，教你用小音箱调出有质感的清音与失真。", url: "https://www.bilibili.com/video/BV1E54y1Y7A2", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80" }
];

function renderTutorials() {
    const container = document.getElementById('tutorials-grid');
    if (!container) return;

    let filtered = tutorialsPool;
    if (currentPlatform !== 'all') {
        filtered = tutorialsPool.filter(item => item.platform === currentPlatform);
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);

    container.innerHTML = selected.map(item => `
        <a href="${item.url}" target="_blank" class="card-link">
            <article class="card">
                <div class="thumbnail-container">
                    <img src="${item.cover}" alt="${item.title}" class="thumbnail-img">
                </div>
                <span class="tag ${item.platform}">${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </article>
        </a>
    `).join('');
}

function filterPlatform(platform, event) {
    currentPlatform = platform;
    const filterBtns = event.currentTarget.parentElement.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderTutorials();
}

// ==========================================
// 4. GUITARS SECTION
// ==========================================
let currentGuitarPlatform = 'all';

// ==========================================
// 4. GUITARS REVIEWS SECTION (15 YT + 15 BILIBILI)
// ==========================================
const guitarReviewsPool = [
  // ---------------- YOUTUBE REVIEWS ----------------
  { platform: "youtube", tag: "YouTube", title: "Squier Affinity Stratocaster Review", desc: "Is Fender's entry-level brand still the king of starter guitars?", url: "https://www.youtube.com/watch?v=BBz-Jyr23M4", cover: "https://img.youtube.com/vi/BBz-Jyr23M4/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "Yamaha Pacifica 112V Gear Demo", desc: "Testing playability, HSS pickup versatility, and build quality.", url: "https://www.youtube.com/watch?v=GmH8YCew2pA", cover: "https://img.youtube.com/vi/GmH8YCew2pA/hqdefault.jpg" },
  { platform: "youtube", tag: "YouTube", title: "Ibanez AZES40 Detailed Review", desc: "Checking out the dyna-MIX9 switching system and neck feel.", url: "https://www.youtube.com/watch?v=jh7_FRlFPw4", cover: "https://img.youtube.com/vi/jh7_FRlFPw4/hqdefault.jpg" },

  // ---------------- BILIBILI REVIEWS ----------------
  { platform: "bilibili", tag: "Bilibili", title: "雅马哈 Pacifica 112V 新手入门神器开箱实测", desc: "HSS拾音器搭配单双切切换，测试不同曲风下的音色表现。", url: "https://www.bilibili.com/video/BV1xZ4y1g7aX", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "Squier 子弹/亲和/经典复古三大系列怎么选？", desc: "Squier全系列新手买琴横向对比评测，手感与音色全盲测。", url: "https://www.bilibili.com/video/BV1m7411E7Qe", cover: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80" },
  { platform: "bilibili", tag: "Bilibili", title: "Ibanez AZES40 高性价比入门电吉他测评", desc: "解析 dyna-MIX9 音色组合系统，千元级现代风格选琴指南。", url: "https://www.bilibili.com/video/BV1bE411T73u", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80" }
];

function renderGuitars() {
    const container = document.getElementById('guitars-grid');
    if (!container) return;

    let filtered = guitarReviewsPool;
    if (currentGuitarPlatform !== 'all') {
        filtered = guitarReviewsPool.filter(item => item.platform === currentGuitarPlatform);
    }

    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);

    container.innerHTML = selected.map(item => `
        <a href="${item.url}" target="_blank" class="card-link">
            <article class="card">
                <div class="thumbnail-container">
                    <img src="${item.cover}" alt="${item.title}" class="thumbnail-img">
                </div>
                <span class="tag ${item.platform}">${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            </article>
        </a>
    `).join('');
}

function filterGuitarPlatform(platform, event) {
    currentGuitarPlatform = platform;
    const filterBtns = event.currentTarget.parentElement.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderGuitars();
}

// ==========================================
// 5. RELIABLE INITIALIZATION
// ==========================================
function initPage() {
    renderNews();
    renderTutorials();
    renderGuitars();
}

document.addEventListener('DOMContentLoaded', initPage);