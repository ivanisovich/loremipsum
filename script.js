const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel__button--prev');
const nextButton = document.querySelector('.carousel__button--next');
const pagination = document.querySelector('.carousel__pagination');

let currentIndex = 0;

// Функция для расчета количества слайдов на странице
const calculateSlidesPerPage = () => {
    return window.innerWidth < 768 ? (window.innerWidth < 480 ? 1 : 2) : 3;
};

let slidesPerPage = calculateSlidesPerPage();  // Рассчитываем количество слайдов на странице при загрузке
const totalSlides = slides.length;

const updateCarousel = () => {
    const slideWidth = slides[0].offsetWidth;
    const maxIndex = totalSlides - slidesPerPage;  // Максимальный индекс
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const amountToMove = -slideWidth * currentIndex;
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${amountToMove}px)`;
    updatePagination();
};

const updatePagination = () => {
    const totalPages = 1 + (totalSlides - slidesPerPage);
    pagination.innerHTML = ''; // Очистка старых точек

    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel__dot');
        if (i === currentIndex) {
            dot.classList.add('carousel__dot--active');
        }
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        pagination.appendChild(dot);
    }
};

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - slidesPerPage) {
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', () => {
    slidesPerPage = calculateSlidesPerPage();
    updateCarousel();
    updatePagination(); // Пересчитываем пагинацию при изменении размера окна
});

// Инициализация
slidesPerPage = calculateSlidesPerPage();  // Рассчитываем количество слайдов на странице при загрузке
updatePagination();
updateCarousel();

function updateRangeValue(value) {
    document.getElementById('range_display').textContent = value + '%';
}