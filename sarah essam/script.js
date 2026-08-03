const roles = [
    "Front-End Developer",
    "React Developer",
    "JavaScript Enthusiast",
    "TypeScript Learner",
    "UI Developer"
];

let roleIndex = 0;
let charIndex = 0;

const typingElement = document.getElementById("typing");

function typeEffect() {

    if (charIndex < roles[roleIndex].length) {

        typingElement.textContent += roles[roleIndex].charAt(charIndex);

        charIndex++;

        setTimeout(typeEffect, 90);

    } else {

        setTimeout(deleteEffect, 1800);

    }

}

function deleteEffect() {

    if (charIndex > 0) {

        typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(deleteEffect, 50);

    } else {

        roleIndex++;

        if (roleIndex >= roles.length) {

            roleIndex = 0;

        }

        setTimeout(typeEffect, 300);

    }

}

typeEffect();


// ==========================
// Scroll Reveal Animation
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revealSection() {

    const trigger = window.innerHeight - 120;

    reveals.forEach((section) => {

        const top = section.getBoundingClientRect().top;

        if (top < trigger) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSection);

revealSection();


// ==========================
// Skills Hover Animation
// ==========================

const skills = document.querySelectorAll(".skill");

skills.forEach((skill) => {

    skill.addEventListener("mouseenter", () => {

        skill.style.transform = "translateY(-10px) scale(1.1) rotate(-2deg)";

    });

    skill.addEventListener("mouseleave", () => {

        skill.style.transform = "translateY(0) scale(1) rotate(0deg)";

    });

});


// ==========================
// Button Click Effect
// ==========================

const button = document.querySelector(".btn");

button.addEventListener("click", function (e) {

    e.preventDefault();

    button.textContent = "Thanks for visiting!";

    setTimeout(() => {

        button.textContent = "Let's Connect";

    }, 2000);

});