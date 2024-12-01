const contacts = [
	{
		name: "Vizinhos Solidários",
		description:
			"O projeto Vizinhos Solidários é um instituto dedicado a fornecer refeições e cestas básicas na região do grande Recife e Olinda.",
		contact:
			"Link: <a href='https://vizinhossolidarios.ong.br/' target='_blank'>https://vizinhossolidarios.ong.br/</a>",
		image: "../src/logo.png",
	},

	{
		name: "Armazém do Campo do Recife",
		description:
			"o Armazém do Campo do Recife, mantido pelo Movimento dos Trabalhadores Sem Terra (MST) iniciou a produção de marmitas solidárias na cozinha do estabelecimento para alimentar pessoas que vivem em situação de rua.",
		contact: "Instagram: @armazemdocamporecife",
		image: "../src/logo_cabecalho.png",
	},
	{
		name: "Central Única das Favelas",
		description:
			"A Central Única das Favelas (Cufa) promove ações de mobilização e apoio aos moradores de favelas de todo o Brasil. A organização atua em mais de 5 mil favelas do paístrabalho de doaos e donativos com a chegada da pandemia.",
		contact: "Instagram: @cufape",
		image: "../src/cufa300.webp",
	},
	{
		name: "Sintraci",
		description:
			"O Sindicato dos Trabalhadores e Trabalhadoras do Comércio Informal do Recife (Sintraci) está promovendo a doação de cestas básicas para camelôs e ambulantes da cidade.",
		contact: "Instagram: @sintraci.sindicato",
		image: "../src/sintraci.jpg",
	},
	{
		name: "Coração Quentinho Recife ",
		description:
			"O Coração Quentinho Recife, nasceu durante a pandemia, onde ajudam com alimentos prontos, as pessoas em situação de vulnerabilidade como também, assistem várias famílias com Cestas Básicas em 5 comunidade de Recife",
		contact: "Instagram: @ongcoracaoquentinhorecife",
		image: "../src/coracao_quentinho.jpeg",
	},
];

function loadContacts() {
	const contactsList = document.getElementById("contactsList");
	contacts.forEach((contact) => {
		const contactCard = document.createElement("div");
		contactCard.className = "contact-card";
		contactCard.innerHTML = `
            <h2>${contact.name}</h2>
			<img src="${contact.image}" alt="Imagem de ${contact.name}" class="contact-image" />
            <p>${contact.description}</p>
            <p class="contact-info">${contact.contact}</p>
        `;
		contactsList.appendChild(contactCard);
	});
}

window.onload = loadContacts;

window.onscroll = function () {
	const backToTopButton = document.querySelector(".back-to-top");
	if (
		document.body.scrollTop > 100 ||
		document.documentElement.scrollTop > 100
	) {
		backToTopButton.style.display = "block";
	} else {
		backToTopButton.style.display = "none";
	}
};

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}
