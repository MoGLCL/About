/*
   MoGlitch (Mohamed Wael) - Full GSAP 3.12.5 Engine & Interactive Sound Synth
   Features: Dynamic SVG Arrow Cursor, Glitchy Super-Fast Thief & Zero Gravity Mode
*/

document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    const root = document.documentElement;

    // ==========================================================================
    // 0. DYNAMIC SVG ARROW MOUSE CURSOR & BRAND COLOR MORPHING (GSAP QUICKTO)
    // ==========================================================================
    const cursorArrow = document.getElementById('cursorArrow');
    let cursorIsStolen = false;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    if (cursorArrow) {
        const xArrow = gsap.quickTo(cursorArrow, "left", { duration: 0.05, ease: "power2.out" });
        const yArrow = gsap.quickTo(cursorArrow, "top", { duration: 0.05, ease: "power2.out" });

        document.addEventListener('pointermove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!cursorIsStolen) {
                xArrow(mouseX);
                yArrow(mouseY);
            }
        });

        document.addEventListener('pointerdown', () => document.body.classList.add('cursor-active'));
        document.addEventListener('pointerup', () => document.body.classList.remove('cursor-active'));

        const skillCursorColors = {
            html5: '#E34F26', css3: '#1572B6', javascript: '#F7DF1E', react: '#61DAFB',
            nextjs: '#171816', nodejs: '#339933', php: '#777BB4', aspnet: '#512BD4',
            csharp: '#512BD4', cpp: '#00599C', python: '#3776AB', tailwind: '#06B6D4',
            bootstrap: '#7952B3', 'react-ui': '#E11D48', sql: '#4479A1', mongodb: '#47A248',
            supabase: '#3ECF8E', hosting: '#0070F3'
        };

        const socialCursorColors = {
            linkedin: '#0a66c2', github: '#9b8cff', facebook: '#1877f2', discord: '#5865f2'
        };

        function setCursorColor(color) {
            root.style.setProperty('--cursor-color', color || '#b7f35b');
        }

        document.querySelectorAll('.social-card').forEach(card => {
            const theme = card.dataset.theme;
            card.addEventListener('mouseenter', () => setCursorColor(socialCursorColors[theme]));
            card.addEventListener('mouseleave', () => setCursorColor('#b7f35b'));
        });

        document.querySelectorAll('.skill-card').forEach(card => {
            const skill = card.dataset.skill;
            card.addEventListener('mouseenter', () => setCursorColor(skillCursorColors[skill]));
            card.addEventListener('mouseleave', () => setCursorColor('#b7f35b'));
        });

        document.querySelectorAll('a, button, .service-card, .orbital, .filter-btn').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    }

    // ==========================================================================
    // 1. WEB AUDIO API SYNTHESIZER (SFX) WITH PITCH RAMP
    // ==========================================================================
    let audioCtx = null;
    let sfxEnabled = true;

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(freq = 440, type = 'sine', duration = 0.12) {
        if (!sfxEnabled) return;
        try {
            initAudio();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

            gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context fallback
        }
    }

    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            sfxEnabled = !sfxEnabled;
            const stateSpan = soundToggle.querySelector('.sfx-state');
            const icon = soundToggle.querySelector('i');
            if (sfxEnabled) {
                stateSpan.textContent = 'ON';
                icon.className = 'fa-solid fa-volume-high';
                playSound(600, 'sine', 0.1);
            } else {
                stateSpan.textContent = 'OFF';
                icon.className = 'fa-solid fa-volume-xmark';
            }
        });
    }

    // ==========================================================================
    // 2. GLITCHY SUPER-FAST MOUSE CHASE & INTERACTION-ONLY CHATTER
    // ==========================================================================
    const miniWalker = document.getElementById('miniWalker');
    const walkerBubble = document.getElementById('walkerBubble');
    const botEyes = document.getElementById('botEyes');

    let walkerX = 60;
    let walkerY = window.innerHeight * 0.75;
    let walkerTargetX = 60;
    let walkerTargetY = window.innerHeight * 0.75;

    let isBeingDragged = false;
    let isChasingMouse = false;
    let isStealingSequence = false;
    let isTrollingHover = false;

    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let pushCount = 0;

    function isMobileView() {
        return window.innerWidth <= 768 || 'ontouchstart' in window;
    }

    // SVG Dynamic Eye Expressions (`><`, `>_<`, `normal`)
    function setBotEyes(type) {
        if (!botEyes) return;
        if (type === 'squinched') {
            botEyes.innerHTML = `
                <path d="M11 17L17 23M17 17L11 23" stroke="#b7f35b" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M23 17L29 23M29 17L23 23" stroke="#b7f35b" stroke-width="2.5" stroke-linecap="round"/>
            `;
        } else if (type === 'annoyed') {
            botEyes.innerHTML = `
                <path d="M11 17L16 20L11 23" stroke="#b7f35b" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <path d="M29 17L24 20L29 23" stroke="#b7f35b" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            `;
        } else {
            botEyes.innerHTML = `
                <circle cx="15" cy="20" r="3" fill="#b7f35b" class="bot-eye-left"/>
                <circle cx="25" cy="20" r="3" fill="#b7f35b" class="bot-eye-right"/>
            `;
        }
    }

    // Funny Roasts Dictionary
    const funnyRoasts = {
        linkedin: "Oh, look at Mr. Professional over here! 💼",
        github: "Pushing bugs to main branch again? 🐛",
        facebook: "Stalking Mohamed's profile? I see you! 👀",
        discord: "Don't copy that Discord username! It's mine! 🤫",
        html5: "div inside div inside div... classic! 📦",
        css3: "Centering a div? Good luck with that! 🎯",
        javascript: "undefined is not a function! 🤪",
        react: "Re-rendering 10,000 times a second! ⚡",
        nextjs: "Server Side Rendering magic! 🚀",
        nodejs: "Event loop going BRRR! ⚙️",
        php: "PHP is not dead, I promise! 🐘",
        aspnet: "Enterprise level C# backend! 💼",
        csharp: "Enterprise level C# backend! 💼",
        cpp: "Pointers and memory leaks everywhere! ⚡",
        python: "import magic... code complete! 🐍",
        tailwind: "Writing 40 CSS utility classes! 🎨",
        bootstrap: "Classic col-md-4 grid layouts! 📐",
        'react-ui': "Copy pasting UI components! 🧩",
        sql: "SELECT * FROM secrets; 🗄️",
        mongodb: "NoSQL BSON document hype! 🍃",
        supabase: "Realtime cloud database power! ⚡",
        hosting: "Deploying straight to prod on Friday! ☁️"
    };

    if (miniWalker && walkerBubble) {

        // Drag & Drop Pointer Events
        miniWalker.addEventListener('pointerdown', (e) => {
            if (isStealingSequence) return;
            isBeingDragged = true;
            isChasingMouse = false;
            miniWalker.classList.add('is-dragged');
            setBotEyes('squinched'); // >< eyes!

            const rect = miniWalker.getBoundingClientRect();
            dragOffsetX = (e.clientX || e.touches?.[0]?.clientX || rect.left) - rect.left;
            dragOffsetY = (e.clientY || e.touches?.[0]?.clientY || rect.top) - rect.top;

            walkerBubble.textContent = "PUT ME DOWN! >< 💢";
            miniWalker.classList.add('show-bubble');
            playSound(780, 'sawtooth', 0.15);
        });

        window.addEventListener('pointermove', (e) => {
            if (!isBeingDragged || isStealingSequence) return;
            const clientX = e.clientX || e.touches?.[0]?.clientX || mouseX;
            const clientY = e.clientY || e.touches?.[0]?.clientY || mouseY;

            walkerX = clientX - dragOffsetX;
            walkerY = clientY - dragOffsetY;

            miniWalker.style.left = `${walkerX}px`;
            miniWalker.style.top = `${walkerY}px`;
        });

        window.addEventListener('pointerup', () => {
            if (!isBeingDragged || isStealingSequence) return;
            isBeingDragged = false;
            miniWalker.classList.remove('is-dragged');
            setBotEyes('annoyed'); // >_< eyes

            playSound(320, 'sine', 0.2);
            pushCount++;

            if (pushCount >= 3) {
                executeRandomRevenge();
                return;
            }

            walkerBubble.textContent = "WOAH! I'M DIZZY! >_<";

            if (!isMobileView()) {
                // RELENTLESS SUPER FAST CHASE MODE ON DESKTOP!
                setTimeout(() => {
                    isChasingMouse = true;
                    walkerBubble.textContent = "I'M COMING FOR YOU! 🏃‍♂️💨";
                    setBotEyes('normal');
                }, 600);
            } else {
                setTimeout(() => {
                    setBotEyes('normal');
                    miniWalker.classList.remove('show-bubble');
                }, 1800);
            }
        });

        // RANDOM 5-REVENGE PICKER ENGINE
        function executeRandomRevenge() {
            pushCount = 0;
            const revengTypes = ['steal', 'erase', 'gravity', 'confetti', 'flip'];
            const choice = revengTypes[Math.floor(Math.random() * revengTypes.length)];

            if (choice === 'steal' && !isMobileView()) {
                executeCursorSteal();
            } else if (choice === 'erase') {
                executeMobileSiteEraser();
            } else if (choice === 'gravity') {
                executeGravityRevenge();
            } else if (choice === 'confetti') {
                executeConfettiBombRevenge();
            } else {
                executeUpsideDownFlipRevenge();
            }
        }

        function executeGravityRevenge() {
            walkerBubble.textContent = "ZERO GRAVITY CHAOS! 🪐💥";
            miniWalker.classList.add('show-bubble');
            playSound(880, 'sine', 0.3);
            const btn = document.getElementById('zeroGravityBtn');
            if (btn) btn.click();
            setTimeout(() => miniWalker.classList.remove('show-bubble'), 3000);
        }

        function executeConfettiBombRevenge() {
            walkerBubble.textContent = "CONFETTI BOMB! 🎆🎉";
            miniWalker.classList.add('show-bubble');
            playSound(940, 'square', 0.3);
            if (typeof confetti === 'function') {
                confetti({ particleCount: 300, spread: 100, origin: { y: 0.5 } });
            }
            setTimeout(() => miniWalker.classList.remove('show-bubble'), 3000);
        }

        function executeUpsideDownFlipRevenge() {
            walkerBubble.textContent = "UPSIDE DOWN LAND! 🙃💥";
            miniWalker.classList.add('show-bubble');
            playSound(150, 'sawtooth', 0.4);
            document.body.classList.add('site-flipped');

            setTimeout(() => {
                document.body.classList.remove('site-flipped');
                miniWalker.classList.remove('show-bubble');
                showToast("🌍 Gravity Flipped Back!");
            }, 4500);
        }

        // SUPER-FAST & RELENTLESS MOUSE CHASING LOOP!
        function chaseAndPushLoop() {
            if (isStealingSequence || isBeingDragged || isMobileView()) {
                setTimeout(chaseAndPushLoop, 80);
                return;
            }

            if (isChasingMouse) {
                const dx = mouseX - (walkerX + 20);
                const dy = mouseY - (walkerY + 20);
                const dist = Math.hypot(dx, dy);

                if (dist < 48) {
                    pushCount++;

                    walkerX -= Math.sign(dx) * 85;
                    walkerY -= Math.sign(dy) * 85;
                    miniWalker.style.left = `${walkerX}px`;
                    miniWalker.style.top = `${walkerY}px`;

                    setBotEyes('annoyed');
                    playSound(420, 'sawtooth', 0.18);

                    if (pushCount >= 3) {
                        executeRandomRevenge();
                        return;
                    } else {
                        walkerBubble.textContent = "DON'T PUSH ME! 🥺💢";
                        miniWalker.classList.add('show-bubble');
                        setTimeout(() => {
                            setBotEyes('normal');
                            isChasingMouse = true;
                        }, 600);
                    }
                } else if (dist > 8) {
                    walkerX += (dx / dist) * 12.5;
                    walkerY += (dy / dist) * 12.5;
                    miniWalker.style.left = `${walkerX}px`;
                    miniWalker.style.top = `${walkerY}px`;
                    miniWalker.classList.add('walking');
                }
            }

            setTimeout(chaseAndPushLoop, 60);
        }

        setTimeout(chaseAndPushLoop, 1000);

        // Quiet & Calm 2D Viewport Random Wandering AI Loop (No Unprovoked Speech Chatter!)
        function wander2DLoop() {
            if (isStealingSequence || isTrollingHover || isBeingDragged || isChasingMouse) {
                setTimeout(wander2DLoop, 200);
                return;
            }

            if (Math.random() < 0.35) {
                walkerTargetX = Math.max(30, Math.min(window.innerWidth - 80, Math.random() * (window.innerWidth - 100)));
                walkerTargetY = Math.max(100, Math.min(window.innerHeight - 100, Math.random() * (window.innerHeight - 150)));
                miniWalker.classList.add('walking');
            } else {
                miniWalker.classList.remove('walking');
            }

            const dx = walkerTargetX - walkerX;
            const dy = walkerTargetY - walkerY;

            if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
                walkerX += Math.sign(dx) * 3.5;
                walkerY += Math.sign(dy) * 3.5;
                miniWalker.style.left = `${walkerX}px`;
                miniWalker.style.top = `${walkerY}px`;
            } else {
                miniWalker.classList.remove('walking');
            }

            setTimeout(wander2DLoop, 140);
        }

        setTimeout(wander2DLoop, 1000);

        // Interactive Hover Trolling for Socials & Tech Cards!
        function triggerGlitchyRoast(key, rect) {
            if (isStealingSequence || isBeingDragged) return;
            const joke = funnyRoasts[key];
            if (!joke) return;

            isTrollingHover = true;
            isChasingMouse = false;
            walkerBubble.textContent = joke;
            miniWalker.classList.add('show-bubble', 'walking');
            playSound(720, 'sine', 0.08);

            const targetX = Math.max(20, Math.min(window.innerWidth - 80, rect.left - 45));
            const targetY = Math.max(80, Math.min(window.innerHeight - 80, rect.top + 20));

            gsap.to(miniWalker, {
                duration: 0.45,
                left: targetX,
                top: targetY,
                ease: "power2.out",
                onComplete: () => {
                    miniWalker.classList.remove('walking');
                    setTimeout(() => {
                        miniWalker.classList.remove('show-bubble');
                        isTrollingHover = false;
                        wander2DLoop();
                    }, 2600);
                }
            });
        }

        document.querySelectorAll('.social-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const theme = card.dataset.theme;
                const rect = card.getBoundingClientRect();
                triggerGlitchyRoast(theme, rect);
            });
        });

        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const skill = card.dataset.skill;
                const rect = card.getBoundingClientRect();
                triggerGlitchyRoast(skill, rect);
            });
        });

        // DESKTOP CURSOR STEAL SCENE (AUTO DROPS CURSOR AFTER SPRINTING!)
        function executeCursorSteal() {
            isStealingSequence = true;
            isChasingMouse = false;
            pushCount = 0;

            document.body.classList.add('cursor-stolen');

            walkerBubble.textContent = "THAT'S IT! GIMME DAT! 💥";
            miniWalker.classList.add('show-bubble');
            setBotEyes('annoyed');
            playSound(800, 'sawtooth', 0.25);

            gsap.to(miniWalker, {
                duration: 0.5,
                left: mouseX - 20,
                top: mouseY - 20,
                ease: "back.out(2)",
                onComplete: () => {
                    cursorIsStolen = true;
                    walkerBubble.textContent = "HEHEHE! MY CURSOR NOW! 😈";
                    miniWalker.classList.add('stealing');
                    playSound(950, 'square', 0.3);

                    let stealTrackFrame = requestAnimationFrame(function trackCursorToWalker() {
                        if (cursorIsStolen && cursorArrow) {
                            const rect = miniWalker.getBoundingClientRect();
                            cursorArrow.style.left = `${rect.left + 15}px`;
                            cursorArrow.style.top = `${rect.top - 10}px`;
                            stealTrackFrame = requestAnimationFrame(trackCursorToWalker);
                        }
                    });

                    const runPath = [
                        { left: window.innerWidth * 0.8, top: window.innerHeight * 0.2 },
                        { left: window.innerWidth * 0.2, top: window.innerHeight * 0.4 },
                        { left: window.innerWidth * 0.7, top: window.innerHeight * 0.8 }
                    ];

                    const tlSteal = gsap.timeline({
                        onComplete: () => {
                            walkerBubble.textContent = "OOPS! 💥";
                            playSound(200, 'sawtooth', 0.3);
                            cursorIsStolen = false;
                            cancelAnimationFrame(stealTrackFrame);

                            document.body.classList.remove('cursor-stolen');

                            gsap.to(cursorArrow, {
                                duration: 0.65,
                                left: mouseX,
                                top: mouseY,
                                ease: "elastic.out(1, 0.5)",
                                onComplete: () => {
                                    showToast("🖱️ You recovered your cursor!");
                                }
                            });

                            gsap.to(miniWalker, {
                                duration: 0.9,
                                left: -100,
                                ease: "power2.in",
                                onComplete: () => {
                                    miniWalker.classList.remove('stealing', 'show-bubble');
                                    walkerBubble.textContent = "Hi there! 👋";
                                    setBotEyes('normal');
                                    walkerX = -100;
                                    setTimeout(() => {
                                        walkerX = 60;
                                        walkerY = window.innerHeight * 0.75;
                                        miniWalker.style.left = `${walkerX}px`;
                                        miniWalker.style.top = `${walkerY}px`;
                                        isStealingSequence = false;
                                        wander2DLoop();
                                    }, 6000);
                                }
                            });
                        }
                    });

                    runPath.forEach(pt => {
                        tlSteal.to(miniWalker, {
                            duration: 1.1,
                            left: pt.left,
                            top: pt.top,
                            ease: "power1.inOut"
                        });
                    });
                }
            });
        }

        // MOBILE WEBSITE ERASER ATTACK SEQUENCE!
        function executeMobileSiteEraser() {
            isStealingSequence = true;
            isChasingMouse = false;
            pushCount = 0;

            walkerBubble.textContent = "NO MOUSE TO STEAL? I'LL ERASE YOUR SITE! 🧹😈";
            miniWalker.classList.add('show-bubble', 'stealing');
            setBotEyes('annoyed');
            playSound(880, 'square', 0.3);

            const candidateElements = Array.from(document.querySelectorAll('.social-card, .skill-card, .service-card, .hero-education, .facts'));
            const targetsToErase = candidateElements.sort(() => 0.5 - Math.random()).slice(0, 3);

            let eraseTimeline = gsap.timeline({
                onComplete: () => {
                    walkerBubble.textContent = "REFRESH TO GET THEM BACK! 🤪📱";
                    playSound(900, 'sine', 0.3);
                    setTimeout(() => {
                        gsap.to(miniWalker, {
                            duration: 0.9,
                            left: -100,
                            ease: "power2.in",
                            onComplete: () => {
                                miniWalker.classList.remove('stealing', 'show-bubble');
                                walkerBubble.textContent = "Hi there! 👋";
                                setBotEyes('normal');
                                setTimeout(() => {
                                    walkerX = 60;
                                    walkerY = window.innerHeight * 0.75;
                                    miniWalker.style.left = `${walkerX}px`;
                                    miniWalker.style.top = `${walkerY}px`;
                                    isStealingSequence = false;
                                    wander2DLoop();
                                }, 7000);
                            }
                        });
                    }, 2500);
                }
            });

            targetsToErase.forEach((target, index) => {
                const rect = target.getBoundingClientRect();
                eraseTimeline.to(miniWalker, {
                    duration: 0.6,
                    left: Math.max(10, rect.left + rect.width / 2 - 20),
                    top: Math.max(60, rect.top - 30),
                    ease: "power2.out",
                    onStart: () => {
                        walkerBubble.textContent = `DELETING THIS! 🗑️ #${index + 1}`;
                        playSound(600 + index * 100, 'sawtooth', 0.15);
                    }
                })
                .to(target, {
                    duration: 0.4,
                    scale: 0,
                    opacity: 0,
                    rotation: 15,
                    ease: "back.in(1.7)",
                    onComplete: () => {
                        target.style.display = 'none';
                        target.remove();
                        playSound(180, 'sawtooth', 0.2);
                        walkerBubble.textContent = "POOF! GONE! 💥";
                    }
                }, "+=0.1");
            });
        }
    }

    // ==========================================================================
    // 3. ZERO GRAVITY PHYSICS MODE ENGINE (ASTRONAUT ICON TRIGGER)
    // ==========================================================================
    const zeroGravityBtn = document.getElementById('zeroGravityBtn');
    const skillCardsList = document.querySelectorAll('.skill-card');

    let zeroGravityActive = false;
    let physicsFrameId = null;
    let physicsBodies = [];

    if (zeroGravityBtn) {
        zeroGravityBtn.addEventListener('click', () => {
            zeroGravityActive = !zeroGravityActive;
            zeroGravityBtn.classList.toggle('active', zeroGravityActive);
            document.body.classList.toggle('zero-gravity-mode', zeroGravityActive);

            if (zeroGravityActive) {
                playSound(840, 'sine', 0.25);
                showToast("🪐 ZERO GRAVITY MODE: Drag & throw skill cards!");
                initZeroGravityPhysics();
            } else {
                playSound(420, 'sine', 0.2);
                showToast("🌍 Gravity Restored!");
                stopZeroGravityPhysics();
            }
        });
    }

    function initZeroGravityPhysics() {
        physicsBodies = [];

        skillCardsList.forEach((card) => {
            const body = {
                el: card,
                x: 0,
                y: 0,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5 - 1.5,
                rotation: 0,
                vRot: (Math.random() - 0.5) * 2,
                isDragging: false,
                lastMouseX: 0,
                lastMouseY: 0
            };

            const onPointerDown = (e) => {
                if (!zeroGravityActive) return;
                body.isDragging = true;
                body.lastMouseX = e.clientX || (e.touches && e.touches[0].clientX);
                body.lastMouseY = e.clientY || (e.touches && e.touches[0].clientY);
                body.vx = 0;
                body.vy = 0;
                playSound(620, 'triangle', 0.08);
            };

            const onPointerMove = (e) => {
                if (!zeroGravityActive || !body.isDragging) return;
                const clientX = e.clientX || (e.touches && e.touches[0].clientX);
                const clientY = e.clientY || (e.touches && e.touches[0].clientY);

                const dx = clientX - body.lastMouseX;
                const dy = clientY - body.lastMouseY;

                body.x += dx;
                body.y += dy;
                body.vx = dx * 0.8;
                body.vy = dy * 0.8;

                body.lastMouseX = clientX;
                body.lastMouseY = clientY;

                gsap.set(card, { x: body.x, y: body.y, rotation: body.rotation });
            };

            const onPointerUp = () => {
                if (!zeroGravityActive || !body.isDragging) return;
                body.isDragging = false;
                playSound(740, 'square', 0.1);
            };

            card.addEventListener('pointerdown', onPointerDown);
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);

            physicsBodies.push(body);
        });

        physicsLoop();
    }

    function physicsLoop() {
        if (!zeroGravityActive) return;

        physicsBodies.forEach(b => {
            if (!b.isDragging) {
                b.x += b.vx;
                b.y += b.vy;
                b.rotation += b.vRot;

                b.vx *= 0.985;
                b.vy *= 0.985;
                b.vRot *= 0.98;

                b.vy += (Math.random() - 0.5) * 0.15;
                b.vx += (Math.random() - 0.5) * 0.15;

                if (Math.abs(b.x) > 300) {
                    b.vx = -b.vx * 0.8;
                    b.vRot = (Math.random() - 0.5) * 3;
                    playSound(320, 'sine', 0.04);
                }
                if (Math.abs(b.y) > 250) {
                    b.vy = -b.vy * 0.8;
                    b.vRot = (Math.random() - 0.5) * 3;
                    playSound(340, 'sine', 0.04);
                }

                gsap.set(b.el, { x: b.x, y: b.y, rotation: b.rotation });
            }
        });

        physicsFrameId = requestAnimationFrame(physicsLoop);
    }

    function stopZeroGravityPhysics() {
        if (physicsFrameId) cancelAnimationFrame(physicsFrameId);

        skillCardsList.forEach(card => {
            gsap.to(card, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 0.85,
                ease: 'back.out(1.4)',
                clearProps: 'transform'
            });
        });
    }

    // ==========================================================================
    // 4. RETRO BREAKOUT SECRET EASTER EGG ENGINE ("CODE BREAKER")
    // ==========================================================================
    const arcadeModal = document.getElementById('arcadeModal');
    const closeArcadeModalBtn = document.getElementById('closeArcadeModal');
    const startGameBtn = document.getElementById('startGameBtn');
    const gameStartOverlay = document.getElementById('gameStartOverlay');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas ? gameCanvas.getContext('2d') : null;

    const gameScoreEl = document.getElementById('gameScore');
    const gameHighScoreEl = document.getElementById('gameHighScore');
    const gameLivesEl = document.getElementById('gameLives');

    let gameRunning = false;
    let score = 0;
    let lives = 3;
    let comboMultiplier = 0;
    let highScore = localStorage.getItem('moglitch_breakout_high_score') || 0;
    if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;

    let paddle = { x: 190, width: 100, height: 12, speed: 8 };
    let ball = { x: 240, y: 300, dx: 3.5, dy: -3.5, radius: 7 };
    let bricks = [];
    let particles = [];
    let keys = { left: false, right: false };
    let animationFrameId = null;

    const brickColors = [
        '#E34F26', '#1572B6', '#F7DF1E', '#61DAFB', '#512BD4', '#3ECF8E'
    ];

    function initBricks() {
        bricks = [];
        const rows = 5;
        const cols = 7;
        const brickWidth = 60;
        const brickHeight = 18;
        const padding = 6;
        const offsetLeft = 11;
        const offsetTop = 24;

        for (let r = 0; r < rows; r++) {
            bricks[r] = [];
            for (let c = 0; c < cols; c++) {
                bricks[r][c] = {
                    x: offsetLeft + c * (brickWidth + padding),
                    y: offsetTop + r * (brickHeight + padding),
                    width: brickWidth,
                    height: brickHeight,
                    color: brickColors[r % brickColors.length],
                    active: true
                };
            }
        }
    }

    function openArcade() {
        if (arcadeModal) {
            arcadeModal.classList.add('show');
            playSound(700, 'square', 0.15);
        }
    }

    function closeArcade() {
        if (arcadeModal) {
            arcadeModal.classList.remove('show');
            gameRunning = false;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
    }

    if (closeArcadeModalBtn) closeArcadeModalBtn.addEventListener('click', closeArcade);

    let secretKeyBuffer = '';
    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && (e.key === 'G' || e.key === 'g')) {
            openArcadeSecret();
            return;
        }

        secretKeyBuffer += e.key.toLowerCase();
        if (secretKeyBuffer.length > 20) {
            secretKeyBuffer = secretKeyBuffer.substring(secretKeyBuffer.length - 20);
        }

        if (secretKeyBuffer.includes('moglitch')) {
            secretKeyBuffer = '';
            openArcadeSecret();
        }
    });

    function openArcadeSecret() {
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
        }
        showToast("🎮 SECRET UNLOCKED: MoGlitch Arcade!");
        setTimeout(openArcade, 400);
    }

    if (gameCanvas) {
        gameCanvas.addEventListener('mousemove', (e) => {
            if (!gameRunning) return;
            const rect = gameCanvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            paddle.x = Math.max(0, Math.min(gameCanvas.width - paddle.width, mouseX - paddle.width / 2));
        });

        gameCanvas.addEventListener('touchmove', (e) => {
            if (!gameRunning) return;
            const rect = gameCanvas.getBoundingClientRect();
            const touchX = e.touches[0].clientX - rect.left;
            paddle.x = Math.max(0, Math.min(gameCanvas.width - paddle.width, touchX - paddle.width / 2));
        }, { passive: true });
    }

    const touchLeft = document.getElementById('touchLeft');
    const touchRight = document.getElementById('touchRight');

    if (touchLeft && touchRight) {
        touchLeft.addEventListener('pointerdown', () => keys.left = true);
        touchLeft.addEventListener('pointerup', () => keys.left = false);
        touchLeft.addEventListener('pointerleave', () => keys.left = false);

        touchRight.addEventListener('pointerdown', () => keys.right = true);
        touchRight.addEventListener('pointerup', () => keys.right = false);
        touchRight.addEventListener('pointerleave', () => keys.right = false);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
    });

    function spawnDebris(x, y, color) {
        for (let i = 0; i < 8; i++) {
            particles.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                size: Math.random() * 4 + 2,
                color: color,
                alpha: 1
            });
        }
    }

    function startMiniGame() {
        if (!ctx) return;
        score = 0;
        lives = 3;
        comboMultiplier = 0;
        paddle.x = gameCanvas.width / 2 - paddle.width / 2;
        resetBall();
        initBricks();
        particles = [];
        gameRunning = true;

        if (gameScoreEl) gameScoreEl.textContent = score;
        if (gameLivesEl) gameLivesEl.textContent = '❤️❤️❤️';
        if (gameStartOverlay) gameStartOverlay.style.display = 'none';

        playSound(880, 'square', 0.2);
        breakoutLoop();
    }

    function resetBall() {
        ball.x = paddle.x + paddle.width / 2;
        ball.y = 310;
        ball.dx = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 0.5);
        ball.dy = -3.8;
    }

    if (startGameBtn) startGameBtn.addEventListener('click', startMiniGame);

    function breakoutLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        ctx.strokeStyle = 'rgba(183, 243, 91, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < gameCanvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(gameCanvas.width, i);
            ctx.stroke();
        }

        if (keys.left && paddle.x > 0) paddle.x -= paddle.speed;
        if (keys.right && paddle.x < gameCanvas.width - paddle.width) paddle.x += paddle.speed;

        ctx.fillStyle = '#b7f35b';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#b7f35b';
        ctx.fillRect(paddle.x, gameCanvas.height - paddle.height - 10, paddle.width, paddle.height);
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > gameCanvas.width || ball.x - ball.radius < 0) {
            ball.dx = -ball.dx;
            playSound(380, 'sine', 0.05);
        }
        if (ball.y - ball.radius < 0) {
            ball.dy = -ball.dy;
            playSound(440, 'sine', 0.05);
        }

        const paddleY = gameCanvas.height - paddle.height - 10;
        if (
            ball.y + ball.radius >= paddleY &&
            ball.y - ball.radius <= paddleY + paddle.height &&
            ball.x >= paddle.x &&
            ball.x <= paddle.x + paddle.width
        ) {
            let hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
            ball.dx = hitPoint * 5.5;
            ball.dy = -Math.abs(ball.dy);
            comboMultiplier = 0;
            playSound(520, 'square', 0.08);
        }

        if (ball.y + ball.radius > gameCanvas.height) {
            lives--;
            playSound(220, 'sawtooth', 0.25);
            if (gameLivesEl) gameLivesEl.textContent = '❤️'.repeat(Math.max(0, lives));

            if (lives <= 0) {
                endBreakoutGame(false);
                return;
            } else {
                resetBall();
            }
        }

        let activeBricksCount = 0;
        for (let r = 0; r < bricks.length; r++) {
            for (let c = 0; c < bricks[r].length; c++) {
                const b = bricks[r][c];
                if (b.active) {
                    activeBricksCount++;

                    ctx.fillStyle = b.color;
                    ctx.fillRect(b.x, b.y, b.width, b.height);
                    ctx.strokeStyle = '#171816';
                    ctx.strokeRect(b.x, b.y, b.width, b.height);

                    if (
                        ball.x + ball.radius > b.x &&
                        ball.x - ball.radius < b.x + b.width &&
                        ball.y + ball.radius > b.y &&
                        ball.y - ball.radius < b.y + b.height
                    ) {
                        b.active = false;
                        ball.dy = -ball.dy;
                        comboMultiplier++;
                        score += 100 * comboMultiplier;

                        spawnDebris(b.x + b.width / 2, b.y + b.height / 2, b.color);
                        playSound(550 + (comboMultiplier * 70), 'triangle', 0.08);

                        if (gameScoreEl) gameScoreEl.textContent = score;

                        if (score > highScore) {
                            highScore = score;
                            localStorage.setItem('moglitch_breakout_high_score', highScore);
                            if (gameHighScoreEl) gameHighScoreEl.textContent = highScore;
                        }
                    }
                }
            }
        }

        if (activeBricksCount === 0) {
            endBreakoutGame(true);
            return;
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.03;

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.restore();

            if (p.alpha <= 0) particles.splice(i, 1);
        }

        animationFrameId = requestAnimationFrame(breakoutLoop);
    }

    function endBreakoutGame(isWin) {
        gameRunning = false;

        if (isWin) {
            playSound(880, 'sine', 0.4);
            if (typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            }
        } else {
            playSound(160, 'sawtooth', 0.35);
        }

        if (gameStartOverlay) {
            gameStartOverlay.style.display = 'flex';
            gameStartOverlay.querySelector('h3').textContent = isWin ? 'VICTORY! 🏆' : 'GAME OVER 🧱';
            gameStartOverlay.querySelector('p').textContent = `${isWin ? 'You smashed all code bricks!' : 'Out of balls!'} Score: ${score} Points | High Score: ${highScore}`;
            startGameBtn.textContent = 'Play Again 🔄';
        }
    }

    // ==========================================================================
    // 5. MOBILE BOTTOM DOCK ACTIVE HIGHLIGHT ON SCROLL
    // ==========================================================================
    const mobileDockItems = document.querySelectorAll('.mobile-dock-item');
    const sections = document.querySelectorAll('section[id]');

    function highlightMobileDock() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= bodyHeight - 70) {
            mobileDockItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#contact') {
                    item.classList.add('active');
                }
            });
            return;
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 180;
            const sectionId = current.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                mobileDockItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightMobileDock);
    highlightMobileDock();

    mobileDockItems.forEach(item => {
        item.addEventListener('click', () => {
            playSound(450, 'sine', 0.1);
        });
    });

    // ==========================================================================
    // 6. GSAP QUICKTO SMOOTH POINTER GLOW TRACKING
    // ==========================================================================
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
        const xGlow = gsap.quickTo(glow, "left", { duration: 0.35, ease: "power3.out" });
        const yGlow = gsap.quickTo(glow, "top", { duration: 0.35, ease: "power3.out" });

        document.addEventListener('pointermove', (e) => {
            xGlow(e.clientX);
            yGlow(e.clientY);
        });
    }

    // ==========================================================================
    // 7. GSAP DYNAMIC TEXT MORPHING (TEXTPLUGIN)
    // ==========================================================================
    const dynamicRole = document.getElementById('dynamicRole');
    if (dynamicRole) {
        const roles = [
            "Full-Stack Engineer",
            "Creative Interface Designer",
            "Mansoura University Student",
            "Backend & Database Specialist",
            "Cloud & Deployment Pro"
        ];

        let roleIndex = 0;

        function cycleRoleText() {
            roleIndex = (roleIndex + 1) % roles.length;
            
            gsap.to(dynamicRole, {
                duration: 0.4,
                opacity: 0,
                y: -10,
                ease: "power2.in",
                onComplete: () => {
                    dynamicRole.textContent = roles[roleIndex];
                    gsap.to(dynamicRole, {
                        duration: 0.6,
                        opacity: 1,
                        y: 0,
                        ease: "power2.out"
                    });
                }
            });
        }

        setInterval(cycleRoleText, 3200);
    }

    // ==========================================================================
    // 8. GSAP HERO TIMELINE
    // ==========================================================================
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl.from('.nav', { duration: 1, y: -50, opacity: 0 })
          .from('.hero-title', { duration: 1.2, y: 50, opacity: 0 }, "-=0.6")
          .from('.hero-intro', { duration: 0.9, y: 30, opacity: 0 }, "-=0.8")
          .from('.hero-education', { duration: 0.8, y: 20, opacity: 0 }, "-=0.6")
          .from('.hero-actions', { duration: 0.8, y: 20, opacity: 0 }, "-=0.6")
          .from('.orbital', { duration: 1.4, scale: 0.6, opacity: 0, ease: "back.out(1.7)" }, "-=1.2");

    // ==========================================================================
    // 9. GSAP SCROLLTRIGGER BATCH ANIMATIONS (EXCLUDING #STACK)
    // ==========================================================================
    
    gsap.from('.social-card', {
        scrollTrigger: {
            trigger: '.social-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,translate'
    });

    gsap.from('.about-grid', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%'
        },
        duration: 1,
        y: 60,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 85%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'transform,translate'
    });

    gsap.from('.contact-panel', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%'
        },
        duration: 1,
        scale: 0.95,
        opacity: 0,
        ease: 'power3.out'
    });

    // ==========================================================================
    // 10. PRESS-AND-HOLD LIQUID FILL NAVIGATION FOR MOBILE SOCIAL CARDS
    // ==========================================================================
    const themes = {
        linkedin: '#0a66c2',
        github: '#9b8cff',
        facebook: '#1877f2',
        discord: '#5865f2'
    };

    const bgTints = {
        facebook: '#eef4ff',
        linkedin: '#edf7fc',
        github: '#f4f2ff',
        discord: '#f3f0ff'
    };

    document.querySelectorAll('.social-card').forEach(card => {
        const themeKey = card.dataset.theme;
        const progressBar = card.querySelector('.hold-progress-bar');
        const targetUrl = card.getAttribute('href');

        let holdTimer = null;
        let holdStartTime = 0;
        const durationNeeded = 850;

        function isMobileView() {
            return window.innerWidth <= 768 || 'ontouchstart' in window;
        }

        const applyTheme = () => {
            if (themes[themeKey]) {
                root.style.setProperty('--theme', themes[themeKey]);
                root.style.setProperty('--bg', bgTints[themeKey] || '#f1efe8');
            }
        };

        const resetTheme = () => {
            root.style.setProperty('--theme', '#b7f35b');
            root.style.setProperty('--bg', '#f1efe8');
        };

        function startHold(e) {
            applyTheme();
            if (!isMobileView()) return;

            card.classList.add('holding');
            holdStartTime = Date.now();
            playSound(300, 'sine', 0.1);

            if (holdTimer) clearInterval(holdTimer);

            holdTimer = setInterval(() => {
                const elapsed = Date.now() - holdStartTime;
                const progress = Math.min(100, (elapsed / durationNeeded) * 100);

                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }

                playSound(320 + (progress * 3.8), 'sine', 0.04);

                if (progress >= 100) {
                    clearInterval(holdTimer);
                    holdTimer = null;
                    completeHold();
                }
            }, 30);
        }

        function cancelHold() {
            resetTheme();
            card.classList.remove('holding');
            if (holdTimer) {
                clearInterval(holdTimer);
                holdTimer = null;
            }
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }

        function completeHold() {
            playSound(780, 'square', 0.25);
            if (navigator.vibrate) {
                navigator.vibrate([50, 40, 50]);
            }

            if (progressBar) {
                progressBar.style.width = '100%';
            }

            if (card.id === 'discordCopyCard') {
                copyDiscord();
                setTimeout(cancelHold, 600);
            } else if (targetUrl) {
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 150);
            }
        }

        card.addEventListener('pointerdown', startHold);
        card.addEventListener('pointerup', cancelHold);
        card.addEventListener('pointercancel', cancelHold);
        card.addEventListener('pointerleave', cancelHold);

        card.addEventListener('mouseenter', applyTheme);
        card.addEventListener('mouseleave', resetTheme);

        card.addEventListener('click', (e) => {
            if (isMobileView()) {
                e.preventDefault();
            }
        });
    });

    document.querySelectorAll('.skill-card').forEach(card => {
        const triggerSound = () => playSound(520, 'sine', 0.08);

        card.addEventListener('mouseenter', triggerSound);
        card.addEventListener('touchstart', triggerSound, { passive: true });

        card.addEventListener('pointermove', (e) => {
            if (zeroGravityActive) return;
            const r = card.getBoundingClientRect();
            const rotateX = (e.clientY - r.top - r.height / 2) / 16;
            const rotateY = (e.clientX - r.left - r.width / 2) / -16;
            card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('pointerleave', () => {
            if (zeroGravityActive) return;
            card.style.transform = '';
        });
    });

    // ==========================================================================
    // 11. SKILLS CATEGORY FILTERING (PURE JS & CSS)
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            playSound(400, 'triangle', 0.12);
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            skillCardsList.forEach(card => {
                const category = card.dataset.category;
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // ==========================================================================
    // 12. DISCORD COPY & CONFETTI SECRET EASTER EGG ON ORBITAL CORE TAP/CLICK
    // ==========================================================================
    const discordCard = document.getElementById('discordCopyCard');
    const toast = document.getElementById('toast');

    function copyDiscord(e) {
        if (e) e.preventDefault();
        playSound(650, 'square', 0.15);
        const username = 'moglitch';

        navigator.clipboard.writeText(username).then(() => {
            showToast(`Discord username (${username}) copied! 🚀`);
        }).catch(() => {
            const input = document.createElement('input');
            input.value = username;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            showToast(`Discord username (${username}) copied! 🚀`);
        });
    }

    const orbitalCore = document.getElementById('orbitalCore');
    if (orbitalCore) {
        const triggerConfettiAndArcade = () => {
            playSound(880, 'sine', 0.25);
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.5 },
                    colors: ['#b7f35b', '#0a66c2', '#9b8cff', '#1877f2', '#5865f2']
                });
            }
            showToast("🎮 SECRET UNLOCKED: MoGlitch Arcade!");
            setTimeout(openArcade, 600);
        };

        orbitalCore.addEventListener('click', triggerConfettiAndArcade);
    }

    function showToast(msg) {
        if (!toast) return;
        toast.querySelector('.toast-msg').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3800);
    }

});
