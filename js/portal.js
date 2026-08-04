/*
   Multiverse Portal Hub JS - English LTR Wooden Doors Edition & Creaky Door SFX
*/

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. WEB AUDIO API SYNTHESIZER (CREAKY WOODEN DOOR OPENING SFX)
    // ==========================================================================
    let audioCtx = null;
    let sfxEnabled = true;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // REALISTIC CREAKY WOODEN DOOR OPENING SFX SYNTH!
    function playCreakyDoorSound() {
        if (!sfxEnabled) return;
        try {
            initAudio();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const now = audioCtx.currentTime;

            // Low frequency wooden hinge friction creak
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sawtooth';
            
            // Pitch creaks up and down mimicking heavy wooden door hinges
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.linearRampToValueAtTime(90, now + 0.15);
            osc.frequency.linearRampToValueAtTime(220, now + 0.35);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.55);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.55);
        } catch (e) {
            // Audio Fallback
        }
    }

    function playWarpSound() {
        if (!sfxEnabled) return;
        try {
            initAudio();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }

            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(780, now + 0.4);

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + 0.4);
        } catch (e) {
            // Audio Fallback
        }
    }

    const sfxToggleBtn = document.getElementById('sfxToggleBtn');
    const sfxLabel = document.getElementById('sfxLabel');

    if (sfxToggleBtn) {
        sfxToggleBtn.addEventListener('click', () => {
            sfxEnabled = !sfxEnabled;
            const icon = sfxToggleBtn.querySelector('i');
            if (sfxEnabled) {
                sfxLabel.textContent = 'SFX: ON';
                icon.className = 'fa-solid fa-volume-high';
                playCreakyDoorSound();
            } else {
                sfxLabel.textContent = 'SFX: OFF';
                icon.className = 'fa-solid fa-volume-xmark';
            }
        });
    }

    // ==========================================================================
    // 2. 3D WOODEN DOOR HOVER CREAK & CLICK NAVIGATION
    // ==========================================================================
    const portalCards = document.querySelectorAll('.portal-card');
    const warpOverlay = document.getElementById('warpOverlay');
    const warpTargetName = document.getElementById('warpTargetName');

    portalCards.forEach(card => {
        const targetUrl = card.dataset.url;
        const name = card.querySelector('.door-engraving h3').textContent;

        card.addEventListener('mouseenter', () => {
            playCreakyDoorSound();
        });

        const triggerWarp = (e) => {
            e.preventDefault();
            playWarpSound();

            if (warpTargetName) warpTargetName.textContent = `Entering: ${name}`;
            if (warpOverlay) warpOverlay.classList.add('active');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        };

        const enterBtn = card.querySelector('.enter-btn');
        if (enterBtn) enterBtn.addEventListener('click', triggerWarp);
        card.querySelector('.card-inner').addEventListener('click', triggerWarp);
    });

    // ==========================================================================
    // 3. RANDOM PORTAL TELEPORTATION BUTTON
    // ==========================================================================
    const randomPortalBtn = document.getElementById('randomPortalBtn');
    if (randomPortalBtn) {
        randomPortalBtn.addEventListener('click', () => {
            const cardsArray = Array.from(portalCards).filter(c => c.style.display !== 'none');
            if (cardsArray.length === 0) return;

            const randomCard = cardsArray[Math.floor(Math.random() * cardsArray.length)];
            const targetUrl = randomCard.dataset.url;
            const name = randomCard.querySelector('.door-engraving h3').textContent;

            playWarpSound();

            if (warpTargetName) warpTargetName.textContent = `Random Door: ${name}`;
            if (warpOverlay) warpOverlay.classList.add('active');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    }

    // ==========================================================================
    // 4. LIVE SEARCH FILTERING (SEARCH BY CREATOR NAME)
    // ==========================================================================
    const portalSearch = document.getElementById('portalSearch');
    if (portalSearch) {
        portalSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            portalCards.forEach(card => {
                const searchKeywords = card.dataset.name.toLowerCase();
                if (query === '' || searchKeywords.includes(query)) {
                    card.style.display = 'flex';
                    gsap.to(card, { duration: 0.3, opacity: 1, scale: 1, ease: 'power2.out' });
                } else {
                    gsap.to(card, {
                        duration: 0.25,
                        opacity: 0,
                        scale: 0.9,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // ==========================================================================
    // 5. GSAP STAGGERED ENTRANCE ANIMATION FOR PORTAL DOORS
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        gsap.from('.portal-card', {
            duration: 0.7,
            y: 40,
            opacity: 0,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform'
        });
    }

});
