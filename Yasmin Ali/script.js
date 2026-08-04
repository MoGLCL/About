const experienceBtn = document.getElementById("experienceBtn");
const experienceBox = document.getElementById("experienceBox");

experienceBtn.addEventListener("click", () => {
    if (experienceBox.style.display === "block") {  
        experienceBox.style.display = "none";  
        experienceBtn.textContent = "Show Experience";  
    } else {  
        experienceBox.style.display = "block";  
        experienceBtn.textContent = "Hide Experience";  
    }
});