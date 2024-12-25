(function () {
    function currentPage () {
        const currentPage = document.location.pathname.split('/').pop();

        const pages = document.querySelectorAll('.header__nav .header__link');

        pages.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('header__link--active');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', currentPage);
})();
