document.addEventListener("DOMContentLoaded", function () {
    // Obtém o nome do arquivo atual (sem o caminho completo)
    const currentPage = window.location.pathname.split("/").pop();

    // Seleciona todos os links da sidebar
    const sidebarLinks = document.querySelectorAll(".sidebar-item");

    // Itera pelos links para substituir o ícone correspondente
    sidebarLinks.forEach(link => {
        const img = link.querySelector("img"); // Seleciona a imagem dentro do link
        const iconSrc = img.getAttribute("src"); // Pega o caminho atual da imagem

        if (link.getAttribute("href") === currentPage) {
            // Substitui o ícone pelo ícone ativo (adiciona o sufixo "-ativo")
            const activeIconSrc = iconSrc.replace(".png", "-ativo.png");
            img.setAttribute("src", activeIconSrc);
        }
    });
});