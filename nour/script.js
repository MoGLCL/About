// ==========================================
// 🌸 Bilingual Language Content State
// ==========================================

let currentLang = "en"; // Default language is English

const i18n = {
    en: {
        badge: "Nourhan Tarek • 開発者",
        langBtn: "العربية",
        subtext: "ノールハン タレク",
        roleTitle: "✨ Front-End Developer ",
        roleSubtitle: "| UI/UX Enthusiast",
        about: "Hi! I'm Nourhan, a passionate Front-End Developer who enjoys building modern, responsive, and interactive websites with clean Japanese-inspired aesthetics using HTML, CSS, and JavaScript.",
        hobbiesTitle: 'My Hobbies <span class="jp-heading">・ 趣味</span>',
        hobby1Title: "Reading",
        hobby1Sub: "読書 Dokusho",
        hobby2Title: "Drawing",
        hobby2Sub: "描画 Kaiga",
        hobby3Title: "Anime",
        hobby3Sub: "アニメ Anime",
        hobby4Title: "Series",
        hobby4Sub: "ドラマ Drama",
        readMoreBtn: "Read More 🌸",
        modalTitle: "About Me 💜",
        modalClose: "Close",
        modalBody: `
            <p>Hi there! I'm <b>Nourhan Tarek</b>, a Front-End Developer dedicated to crafting creative web experiences.</p>
            <ul>
                <li>🚀 Skilled in constructing responsive, modern, and high-performance user interfaces.</li>
                <li>🎨 Lover of clean visual hierarchies, smooth micro-animations, and aesthetic design systems.</li>
                <li>📱 Focused on writing clean, modular code with seamless cross-device compatibility.</li>
                <li>🌸 Enthusiastic about continuous learning and bringing imaginative ideas to life on the web.</li>
            </ul>
        `
    },
    ar: {
        badge: "نورهان طارق • 開発者",
        langBtn: "English",
        subtext: "نورهان طارق",
        roleTitle: "✨ مطورة واجهات أماميّة ",
        roleSubtitle: "| مصممة تجارب تفاعلية",
        about: "أهلاً بك! أنا نورهان، مطورة واجهات إلكترونية شغوفة ببناء مواقع حديثة، متجاوبة وتفاعلية بلمسات جمالية ساحرة باستخدام HTML و CSS و JavaScript.",
        hobbiesTitle: 'هواياتي <span class="jp-heading">・ 趣味</span>',
        hobby1Title: "القراءة",
        hobby1Sub: "読書 Reading",
        hobby2Title: "الرسم",
        hobby2Sub: "描画 Drawing",
        hobby3Title: "الأنمي",
        hobby3Sub: "アニメ Anime",
        hobby4Title: "المسلسلات",
        hobby4Sub: "ドラマ Series",
        readMoreBtn: "اقرأ المزيد 🌸",
        modalTitle: "نبذة تفصيلية 💜",
        modalClose: "إغلاق",
        modalBody: `
            <p>أهلاً بك! أنا <b>نورهان طارق</b>، مطورة واجهات إلكترونية شغوفة بالابتكار والتصميم العصري.</p>
            <ul>
                <li>🚀 أتقن بناء التجارب التفاعلية السلسة والتصاميم المبتكرة.</li>
                <li>🎨 أحب التصاميم النظيفة والأنيقة مع حركة انسيابية تعزز تجربة المستخدم.</li>
                <li>📱 أضمن توافق المواقع تماماً مع جميع الشاشات والأجهزة الذكية.</li>
                <li>🌸 يسعدني دائماً تحويل الأفكار إلى مواقع ويب واقعية وجذابة.</li>
            </ul>
        `
    }
};

function toggleLanguage() {
    currentLang = currentLang === "en" ? "ar" : "en";
    const langData = i18n[currentLang];
    
    // Update HTML dir and lang attributes
    document.documentElement.setAttribute("lang", currentLang);
    document.documentElement.setAttribute("dir", currentLang === "ar" ? "rtl" : "ltr");

    // Update Elements Text
    document.getElementById("badge-text").textContent = langData.badge;
    document.getElementById("lang-btn-text").textContent = langData.langBtn;
    document.getElementById("hero-subtext").textContent = langData.subtext;
    
    const roleElem = document.getElementById("role-title");
    roleElem.childNodes[0].textContent = langData.roleTitle;
    document.getElementById("role-subtitle").textContent = langData.roleSubtitle;

    document.getElementById("about-text").textContent = langData.about;
    document.getElementById("hobbies-title").innerHTML = langData.hobbiesTitle;

    document.getElementById("hobby1-title").textContent = langData.hobby1Title;
    document.getElementById("hobby1-sub").textContent = langData.hobby1Sub;
    document.getElementById("hobby2-title").textContent = langData.hobby2Title;
    document.getElementById("hobby2-sub").textContent = langData.hobby2Sub;
    document.getElementById("hobby3-title").textContent = langData.hobby3Title;
    document.getElementById("hobby3-sub").textContent = langData.hobby3Sub;
    document.getElementById("hobby4-title").textContent = langData.hobby4Title;
    document.getElementById("hobby4-sub").textContent = langData.hobby4Sub;

    document.getElementById("read-more-btn-text").textContent = langData.readMoreBtn;
    document.getElementById("modal-title").textContent = langData.modalTitle;
    document.getElementById("modal-close-btn").textContent = langData.modalClose;
    document.getElementById("modal-body").innerHTML = langData.modalBody;
}


// ==========================================
// 🌸 Sakura Petals Particle Generator & Physics
// ==========================================

const sakuraContainer = document.getElementById("sakura-container");

function createSakuraPetal(xPos = null, yPos = null) {
    const petal = document.createElement("div");
    petal.classList.add("sakura-petal");

    // Randomize petal dimensions
    const size = Math.random() * 14 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;

    // Position
    if (xPos !== null) {
        petal.style.left = `${xPos}px`;
        petal.style.top = `${yPos}px`;
    } else {
        petal.style.left = `${Math.random() * 100}%`;
    }

    // Dynamic animation parameters
    const fallDuration = Math.random() * 5 + 4;
    const swayDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 5;

    petal.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    petal.style.animationDelay = `${delay}s, ${delay / 2}s`;
    petal.style.opacity = (Math.random() * 0.5 + 0.4).toString();

    // Random initial rotation angle
    const angle = Math.random() * 360;
    petal.style.transform = `rotate(${angle}deg)`;

    sakuraContainer.appendChild(petal);

    // Remove petal after animation cycle if created dynamically via click/touch
    if (xPos !== null) {
        setTimeout(() => {
            petal.remove();
        }, fallDuration * 1000);
    }
}

// Adjust initial petal density based on screen width
const isMobile = window.innerWidth < 600;
const PETAL_COUNT = isMobile ? 25 : 45;

for (let i = 0; i < PETAL_COUNT; i++) {
    createSakuraPetal();
}

// Click or Touch to burst extra Sakura petals!
function triggerPetalBurst(x, y, target) {
    if (target && (target.closest('.modal-content') || target.closest('button'))) return;

    for (let i = 0; i < 6; i++) {
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;
        createSakuraPetal(x + offsetX, y + offsetY);
    }
}

document.addEventListener("click", (e) => {
    triggerPetalBurst(e.clientX, e.clientY, e.target);
});

document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        triggerPetalBurst(touch.clientX, touch.clientY, e.target);
    }
}, { passive: true });


// ==========================================
// ✨ Stars Generator
// ==========================================

const starsContainer = document.getElementById("stars");
const STAR_COUNT = isMobile ? 45 : 75;

for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("span");
    star.classList.add("star");

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    starsContainer.appendChild(star);
}


// ==========================================
// 🎴 3D Card Parallax / Tilt Effect
// ==========================================

const card = document.querySelector(".card");

if (card) {
    card.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left - rect.width / 2;
        const cardY = e.clientY - rect.top - rect.height / 2;

        const xAxis = -(cardY / (rect.height / 2)) * 12;
        const yAxis = (cardX / (rect.width / 2)) * 12;

        card.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    });
}


// ==========================================
// 🌸 Modal Toggle & Backdrop Click
// ==========================================

function toggleReadMore() {
    const modal = document.getElementById("read-more-modal");
    if (modal) {
        modal.classList.toggle("active");
    }
}

function handleModalBackdropClick(event) {
    const modal = document.getElementById("read-more-modal");
    if (event.target === modal) {
        modal.classList.remove("active");
    }
}

// Close modal on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("read-more-modal");
        if (modal && modal.classList.contains("active")) {
            modal.classList.remove("active");
        }
    }
});