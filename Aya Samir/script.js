// ==========================
// Show More Button
// ==========================

const aboutBtn = document.getElementById("aboutBtn");
const aboutBox = document.getElementById("aboutBox");


aboutBtn.addEventListener("click", function(){

    if(aboutBox.style.display === "block"){

        aboutBox.style.display = "none";
        aboutBtn.textContent = "Show More";

    }else{

        aboutBox.style.display = "block";
        aboutBtn.textContent = "Show Less";

    }

});



// ==========================
// Smooth Page Animation
// ==========================

const hero = document.querySelector(".hero");

window.addEventListener("load",()=>{

    hero.style.opacity = "1";
    hero.style.transform = "translateY(0)";

});



// ==========================
// Skills Hover Effect
// ==========================

const skills = document.querySelectorAll("li");


skills.forEach((skill)=>{

    skill.addEventListener("mouseenter",()=>{

        skill.style.transform = "translateY(-8px) scale(1.1)";

    });


    skill.addEventListener("mouseleave",()=>{

        skill.style.transform = "translateY(0) scale(1)";

    });

});



// ==========================
// Button Click Effect
// ==========================

const button = document.querySelector("button");


button.addEventListener("click",()=>{

    button.style.background = "#6b21a8";

    setTimeout(()=>{

        button.style.background = "#9333ea";

    },1000);

});



// ==========================
// Scroll Animation
// ==========================

window.addEventListener("scroll",()=>{

    const box = document.getElementById("aboutBox");

    const position = box.getBoundingClientRect().top;

    const screen = window.innerHeight;


    if(position < screen - 100){

        box.style.opacity = "1";
        box.style.transform = "translateY(0)";

    }

});