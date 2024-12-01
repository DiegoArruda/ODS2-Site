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
