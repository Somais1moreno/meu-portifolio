// VALIDAÇÃO DE FORMULÁRIO

const form = document.getElementById("form-contato");

// VALIDAÇAO FORMULARIO
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // VARIAVEL PARA CONTROLAR FORMULARIO VALIDO OU NAO
  let valido = true;

  // VALIDAÇAO NOME
  if (nome === "") {
    mostrarErro("nome", "O nome é obrigatório.");
    valido = false;
  } else {
    limparErro("nome");
  }

  // VALIDAÇAO E-MAIL

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    mostrarErro("email", "O e-mail é obrigatório.");
    valido = false;
  } else if (!regexEmail.test(email)) {
    mostrarErro("email", "Informe um e-mail válido (ex: usuario@email.com).");
  } else {
    limparErro("email");
  }

  // VALIDAÇAO DE MENSAGEM
  if (mensagem === "") {
    mostrarErro("mensagem", "A mensagem é obrigatória.");
    valido = false;
  } else {
    limparErro("mensagem");
  }

  // CASO OK: LIMPAR O FORM E ABRE O MODAL

  if (valido) {
    const dados = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: dados,
      headers: { Accept: "application/json" },
    })
      .then((resposta) => {
        if (resposta.ok) {
          form.reset(); // LIMPA FORM
          abrirModal(); // MOSTRA CONFIRMAÇAO
        } else {
          alert("Erro ao enviar. Tente novamente.");
        }
      })
      .catch(() => {
        alert("Erro de conexão. Verifique sua internet.");
      });
  }
});

// EXIBIR ERRO
function mostrarErro(campo, mensagem) {
  const input = document.getElementById(campo);
  const erro = document.getElementById("erro-" + campo);
  input.classList.add("invalido");
  erro.textContent = mensagem;
}
// LIMPAR ERRO
function limparErro(campo) {
  const input = document.getElementById(campo);
  const erro = document.getElementById("erro-" + campo);
  input.classList.remove("invalido");
  erro.textContent = "";
}
// MODAL
function abrirModal() {
  document.getElementById("modal-sucesso").classList.add("visivel");
}

function fecharModal() {
  document.getElementById("modal-sucesso").classList.remove("visivel");
}

// ==================================

// TEMA CLARO / ESCURO

const temaBtn = document.getElementById("tema-btn");

// VERIFICANDO SE TEM TEMA SALVO

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "light") {
  document.body.classList.add("light");
  temaBtn.textContent = "☀️";
}

temaBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  temaBtn.textContent = isLight ? "☀️" : "🌙";

  localStorage.setItem("tema", isLight ? "light" : "dark");
});

//  ==================================
//  MENU HAMBURGUER (MOBILE)

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("aberto");
  menuBtn.textContent = navLinks.classList.contains("aberto") ? "x" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("aberto");
    menuBtn.textContent = "☰";
  });
});

// =====================================
//  LINK ATIVO NO MENU CONFORME SCROLL

const secoes = document.querySelectorAll("section[id]");
const links = document.querySelectorAll("nav a");

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        const id = entrada.target.id;

        links.forEach((l) => {
          l.classList.remove("ativo");
        });

        const linkAtivo = document.querySelector('nav a[href="#${id}"]');
        if (linkAtivo) linkAtivo.classList.add("ativo");
      }
    });
  },
  { threshold: 0.4 },
);

secoes.forEach((s) => {
  observador.observe(s);
});

// =============================
// ANIMAÇAO

const animaveis = document.querySelectorAll(".animar");

const animObserver = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
      }
    });
  },
  { threshold: 0.15 },
);

animaveis.forEach((el) => {
  animObserver.observe(el);
});
