function menu(name){
    var main = document.getElementsByClassName("main")

    for (let m of main){
        m.style.display = "none"
    }

    
    var ele = document.getElementById(name)
    ele.style.display = "block";

    var buttons = document.getElementsByClassName("active")
        for (let b of buttons){
            b.classList.replace("active","nonactive")
        }

    switch(name) {
    case "Chopin_article":
        document.getElementById("main_header").innerHTML = "Chopin";

        var button = document.querySelector("#Chopin");
        button.classList.replace("nonactive", "active");
        
    break;
    case "Liszt_article":
        document.getElementById("main_header").innerHTML = "Liszt";
        
        var button = document.querySelector("#Liszt");
        button.classList.replace("nonactive", "active");
    break;
    case "Rachmaninoff_article":
        document.getElementById("main_header").innerHTML = "Rachmaninoff";
        
        var button = document.querySelector("#Rachmaninoff");
        button.classList.replace("nonactive", "active");
    break;
    default:
        document.getElementById("main_header").innerHTML = "Wielcy kompozytorzy";
        
        var button = document.querySelector("#Strona_glowna");
        button.classList.replace("nonactive", "active");
    } 
}



menu("Main_article")
var bt1 = document.getElementById("Strona_glowna")
bt1.addEventListener("click", () => {menu("Main_article")})
var bt2 = document.getElementById("Liszt")
bt2.addEventListener("click", () => {menu("Liszt_article")})
var bt3 = document.getElementById("Chopin")
bt3.addEventListener("click", () => {menu("Chopin_article")})
var bt4 = document.getElementById("Rachmaninoff")
bt4.addEventListener("click", () => {menu("Rachmaninoff_article")})
;