// ==================================================
// MENU MOBILE
// ==================================================

const menuMobile = document.getElementById("menu-mobile");
const menu = document.getElementById("menu");

if (menuMobile && menu) {

    menuMobile.addEventListener("click", () => {

        menu.classList.toggle("header__nav--active");

    });

}


// ==================================================
// FECHAR MENU AO CLICAR EM UM LINK
// ==================================================

const linksMenu = document.querySelectorAll(".header__nav-link");

linksMenu.forEach(link => {

    link.addEventListener("click", () => {

        if (menu) {
            menu.classList.remove("header__nav--active");
        }

    });

});


// ==================================================
// HEADER AO ROLAR
// ==================================================

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("header--scroll");

    } else {

        header.classList.remove("header--scroll");

    }

});


// ==================================================
// SCROLL SUAVE
// ==================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const destinoID = this.getAttribute("href");

        const destino = document.querySelector(destinoID);

        if (destino) {

            event.preventDefault();

            destino.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


// ==================================================
// ANIMAÇÃO AO ENTRAR NA TELA
// ==================================================

const elementosAnimados = document.querySelectorAll(
    ".section__header, .about__image, .about__content, .services__card, .portfolio__item, .testimonials, .contact"
);

elementosAnimados.forEach(elemento => {

    elemento.classList.add("animate");

});


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("animate--visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


elementosAnimados.forEach(elemento => {

    observer.observe(elemento);

});


// ==================================================
// CONTADORES
// ==================================================

const contadores = document.querySelectorAll(".contador");

let contadorIniciado = false;


function iniciarContadores() {

    contadores.forEach(contador => {

        const numeroFinal = Number(
            contador.dataset.numero
        );

        let numeroAtual = 0;

        const duracao = 1500;

        const inicio = performance.now();


        function atualizarContador(tempoAtual) {

            const progresso =
                Math.min(
                    (tempoAtual - inicio) / duracao,
                    1
                );


            numeroAtual = Math.floor(
                progresso * numeroFinal
            );


            contador.textContent = numeroAtual + "+";


            if (progresso < 1) {

                requestAnimationFrame(
                    atualizarContador
                );

            } else {

                contador.textContent =
                    numeroFinal + "+";

            }

        }


        requestAnimationFrame(
            atualizarContador
        );

    });

}


const secaoSobre = document.getElementById("sobre");


if (secaoSobre && contadores.length > 0) {

    const contadorObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !contadorIniciado
                    ) {

                        iniciarContadores();

                        contadorIniciado = true;

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.4
            }
        );


    contadorObserver.observe(secaoSobre);

}


// ==================================================
// FORMULÁRIO DE CONTATO
// ==================================================

const form = document.getElementById("formContato");


if (form) {

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nome =
                document.getElementById("nome").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const mensagem =
                document.getElementById("mensagem").value.trim();


            if (
                nome === "" ||
                email === "" ||
                mensagem === ""
            ) {

                alert(
                    "Por favor, preencha todos os campos."
                );

                return;

            }


            alert(
                `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`
            );


            form.reset();

        }
    );

}


// ==================================================
// BOTÃO VOLTAR AO TOPO
// ==================================================

const voltarTopo =
    document.getElementById("voltarTopo");


if (voltarTopo) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            voltarTopo.classList.add(
                "back-top--visible"
            );

        } else {

            voltarTopo.classList.remove(
                "back-top--visible"
            );

        }

    });


    voltarTopo.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// ==================================================
// ANO AUTOMÁTICO
// ==================================================

const ano = document.getElementById("ano");


if (ano) {

    ano.textContent =
        new Date().getFullYear();

}


// ==================================================
// CARROSSEL DE DEPOIMENTOS
// ==================================================

const depoimentos =
    document.querySelectorAll(
        ".testimonials__card"
    );


const dots =
    document.querySelectorAll(
        ".testimonials__dot"
    );


let indice = 0;


function mostrarDepoimento(posicao) {

    depoimentos.forEach(depoimento => {

        depoimento.classList.remove(
            "testimonials__card--active"
        );

    });


    dots.forEach(dot => {

        dot.classList.remove(
            "testimonials__dot--active"
        );

    });


    if (depoimentos[posicao]) {

        depoimentos[posicao].classList.add(
            "testimonials__card--active"
        );

    }


    if (dots[posicao]) {

        dots[posicao].classList.add(
            "testimonials__dot--active"
        );

    }

}


function proximoDepoimento() {

    indice++;

    if (indice >= depoimentos.length) {

        indice = 0;

    }

    mostrarDepoimento(indice);

}


if (depoimentos.length > 0) {

    setInterval(
        proximoDepoimento,
        4000
    );

}


dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        indice = index;

        mostrarDepoimento(indice);

    });

});


// ==================================================
// PAUSAR CARROSSEL AO PASSAR O MOUSE
// ==================================================

const carrossel =
    document.querySelector(".testimonials");


let intervaloCarrossel;


function iniciarCarrossel() {

    if (depoimentos.length > 0) {

        intervaloCarrossel =
            setInterval(
                proximoDepoimento,
                4000
            );

    }

}


function pararCarrossel() {

    clearInterval(
        intervaloCarrossel
    );

}


if (carrossel && depoimentos.length > 0) {

    // Remove o intervalo criado anteriormente
    // para controlar a pausa corretamente.

    clearInterval(
        intervaloCarrossel
    );


    iniciarCarrossel();


    carrossel.addEventListener(
        "mouseenter",
        pararCarrossel
    );


    carrossel.addEventListener(
        "mouseleave",
        iniciarCarrossel
    );

}