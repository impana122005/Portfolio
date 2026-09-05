window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 900);
});

const words=[
"Crafting Digital Experiences",
"Building Meaningful Projects",
"Exploring AI & Technology",
"Turning Ideas into Reality"
];

let wordIndex=0;
let charIndex=0;
let deleting=false;

function typingEffect(){

const current=words[wordIndex];

charIndex=deleting?charIndex-1:charIndex+1;

document.getElementById("typing").textContent=current.substring(0,charIndex);

if(!deleting && charIndex===current.length){
deleting=true;
setTimeout(typingEffect,1000);
return;
}

if(deleting && charIndex===0){
deleting=false;
wordIndex=(wordIndex+1)%words.length;
}

setTimeout(typingEffect,deleting?60:120);
}

typingEffect();

// 3D Tilt Effect
document.querySelectorAll(".tilt,.card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

const rx=-(y-rect.height/2)/20;
const ry=(x-rect.width/2)/20;

card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0deg) rotateY(0deg) scale(1)";

});

});

const stack = document.getElementById("certificateStack");
const cards = [...stack.querySelectorAll(".stack-card")];
let current = 0;

function updateStack() {

    cards.forEach((card, i) => {
        card.classList.remove("front", "middle", "back");

        // Hide certificates that are already viewed
        card.style.display = i < current ? "none" : "block";
    });

    if (cards[current]) {
        cards[current].classList.add("front");
    }

    if (cards[current + 1]) {
        cards[current + 1].classList.add("middle");
    }

    if (cards[current + 2]) {
        cards[current + 2].classList.add("back");
    }
}

updateStack();

stack.addEventListener("click", (e) => {
    const rect = stack.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
        // Left side → Previous certificate
        if (current > 0) {
            current--;
            updateStack();
        }
    } else {
        // Right side → Next certificate
        if (current < cards.length - 1) {
            current++;
            updateStack();
        }
    }
});

const glow = document.querySelector(".cursor-glow");

if (glow) {
    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}

const reveals = document.querySelectorAll(".reveal");

function revealSections() {
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const bottom = section.getBoundingClientRect().bottom;

        if (top < window.innerHeight - 120 && bottom > 120) {
            section.classList.add("active");
        } else {
            section.classList.remove("active"); // Reset when leaving viewport
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, {
    threshold: 0.6
});

sections.forEach(section => observer.observe(section));

const topBtn = document.getElementById("topBtn");

if(topBtn){
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const projectGrid = document.getElementById("projectsGrid");
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");

projectNext.onclick = function () {
    projectGrid.scrollBy({
        left: 410,
        behavior: "smooth"
    });
};

projectPrev.onclick = function () {
    projectGrid.scrollBy({
        left: -410,
        behavior: "smooth"
    });
};

document.addEventListener("DOMContentLoaded", () => {

    const certModal = document.getElementById("certificateModal");
    const modalImage = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close-modal");

    document.querySelectorAll(".view-cert").forEach(icon => {
        icon.addEventListener("click", function(e) {
            e.stopPropagation();

            const img = this.closest(".stack-card").querySelector("img");

            modalImage.src = img.src;
            modalImage.alt = img.alt;

            certModal.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        certModal.style.display = "none";
    });

    certModal.addEventListener("click", (e) => {
        if (e.target === certModal) {
            certModal.style.display = "none";
        }
    });

});

const stackTooltip = document.getElementById("stackTooltip");
const certificateSection = document.getElementById("certificates");

if (stackTooltip && certificateSection) {

    const tooltipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                stackTooltip.classList.add("show");

                setTimeout(() => {
                    stackTooltip.classList.remove("show");
                }, 3000);

                tooltipObserver.disconnect(); // Show only once
            }
        });
    }, { threshold: 0.5 });

    tooltipObserver.observe(certificateSection);
}

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if(menuBtn && navMenu){

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });
}