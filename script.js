// ===========================
// MENU MOBILE
// ===========================

const menuMobile = document.getElementById("menu-mobile");
const menu = document.getElementById("menu");

menuMobile.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});


// ===========================
// HEADER AO ROLAR
// ===========================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }

});


// ===========================
// SCROLL SUAVE
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if (destino) {

            destino.scrollIntoView({
                behavior: "smooth"
            });

            menu.classList.remove("ativo");

        }

    });

});


// ===========================
// ANIMAÇÃO DAS SEÇÕES
// ===========================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");
        }

    });

}, {
    threshold: 0.2
});

sections.forEach(section => observer.observe(section));


// ===========================
// CONTADOR
// ===========================

const contadores = document.querySelectorAll(".contador");

const iniciarContador = () => {

    contadores.forEach(contador => {

        const numeroFinal = Number(contador.dataset.numero);

        let numeroAtual = 0;

        const incremento = Math.ceil(numeroFinal / 60);

        const atualizar = () => {

            numeroAtual += incremento;

            if (numeroAtual >= numeroFinal) {

                contador.textContent = numeroFinal + "+";

            } else {

                contador.textContent = numeroAtual;

                requestAnimationFrame(atualizar);

            }

        };

        atualizar();

    });

};

let contadorIniciado = false;

window.addEventListener("scroll", () => {

    const sobre = document.getElementById("sobre");

    if (!contadorIniciado && window.scrollY > sobre.offsetTop - 300) {

        iniciarContador();
        contadorIniciado = true;

    }

});


// ===========================
// FORMULÁRIO
// ===========================

const form = document.getElementById("formContato");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || email === "" || mensagem === "") {

        alert("Preencha todos os campos.");

        return;

    }

    alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);

    form.reset();

});


// ===========================
// BOTÃO VOLTAR AO TOPO
// ===========================

const voltarTopo = document.getElementById("voltarTopo");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        voltarTopo.style.display = "block";

    } else {

        voltarTopo.style.display = "none";

    }

});

voltarTopo.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


// ===========================
// ANO AUTOMÁTICO
// ===========================

document.getElementById("ano").textContent = new Date().getFullYear();

 // ===========================
// CARROSSEL DE DEPOIMENTOS
// ===========================

const depoimentos = document.querySelectorAll(".depoimento");
const dots = document.querySelectorAll(".dot");

let indice = 0;

function mostrarDepoimento(posicao){

    depoimentos.forEach(item=>{
        item.classList.remove("active");
    });

    dots.forEach(item=>{
        item.classList.remove("active");
    });

    depoimentos[posicao].classList.add("active");
    dots[posicao].classList.add("active");

}

function proximoDepoimento(){

    indice++;

    if(indice >= depoimentos.length){
        indice = 0;
    }

    mostrarDepoimento(indice);

}

setInterval(proximoDepoimento,4000);

dots.forEach((dot,i)=>{

    dot.addEventListener("click",()=>{

        indice = i;
        mostrarDepoimento(indice);

    });

});