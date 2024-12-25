(function () {
    function displayPageLoadStats() {
        const performanceData = window.performance.timing;
        const pageLoadTime = performanceData.domContentLoadedEventEnd - performanceData.navigationStart;

        if (pageLoadTime > 0) {
            const statsElement = document.createElement("div");
            statsElement.style.fontSize = "14px";
            statsElement.style.color = "#333";
            statsElement.style.padding = "10px 0";
            statsElement.textContent = `Время загрузки страницы: ${pageLoadTime} мс`;

            const footer = document.querySelector(".footer");
            if (footer) {
                footer.appendChild(statsElement);
            } else {
                console.warn("Элемент футера не найден.");
            }
        } else {
            console.warn("Данные о времени загрузки страницы недоступны.");
        }
    }

    window.addEventListener("load", displayPageLoadStats);
})();
