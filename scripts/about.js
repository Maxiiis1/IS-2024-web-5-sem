document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');
    const dataContainer = document.getElementById('data-container');

    // Функция для отображения комментариев
    function renderComments(comments) {
        comments.forEach(comment => {
            const li = document.createElement('li');
            li.className = 'comment';
            li.innerHTML = `
                <strong>${comment.name}</strong> (${comment.email})<br>
                ${comment.body}
            `;
            dataContainer.appendChild(li);
        });
    }

    // Функция для отображения ошибки
    function showError(errorMessage) {
        const errorElement = document.createElement('div');
        errorElement.style.color = 'red';
        errorElement.textContent = `⚠ Ошибка: ${errorMessage}`;
        dataContainer.appendChild(errorElement);
    }

    // Функция для псевдо-случайной фильтрации
    function getRandomFilter() {
        const random = Math.random();
        if (random > 0.5) {
            return '?id_gte=100&_limit=10';
        } else {
            return '?id_lte=200&_limit=10';
        }
    }

    // Функция загрузки комментариев
    function loadComments() {
        preloader.style.display = 'block';
        const filter = getRandomFilter();
        fetch(`https://jsonplaceholder.typicode.com/comments${filter}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить данные');
                }
                return response.json();
            })
            .then(comments => {
                preloader.style.display = 'none';
                renderComments(comments);
            })
            .catch(error => {
                preloader.style.display = 'none';
                showError(error.message);
            });
    }

    loadComments();
});
