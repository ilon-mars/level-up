// скролл по ссылкам
const scrolling = () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');

    const smoothScroll = (e) => {
        e.preventDefault();

        let target = e.target;

        let id = target.getAttribute('href').substr(1); 
            document.getElementById(id).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
    };

    scrollLinks.forEach(elem => {
        elem.addEventListener('click', smoothScroll);
    });
};
scrolling();

// слайдер
const slider = () =>{
        const slider = document.querySelector('.reviews__carousel'),
            slides = slider.querySelectorAll('.reviews__slide');

            let currentSlide = 0;

            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };

            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };


            slider.addEventListener('click', (e) => {
                e.preventDefault();

                let target = e.target;

                if (!target.closest('a').matches('.reviews__btn')) { 
                    return;
                }
                // убираем активный класс у текущего слайда
                prevSlide(slides, currentSlide, 'reviews__slide--active');

                
                if (target.closest('a').matches('.reviews__next-btn')) { 
                    
                    currentSlide++;
                } else if (target.closest('a').matches('.reviews__prev-btn')) { 
                    currentSlide--;
                } 

                // если слайд был последний, то переходит к первому
                if (currentSlide >= slides.length){
                    currentSlide = 0;
                } 
                // если слайд был первый, то переходит к последнему
                if (currentSlide < 0) {
                    currentSlide = slides.length-1;
                }

                // добавляем активный класс слайду, у которого выполняется условие
                nextSlide(slides, currentSlide, 'reviews__slide--active');
            });

};
slider();

// таймер, deadline - время, до которого идет отсчет
const countTimer = (deadline) => {
    const timerHours = document.querySelector('.order__hours'),
        timerMinutes = document.querySelector('.order__minutes'),
        timerSeconds = document.querySelector('.order__seconds'),
        timerDays = document.querySelector('.order__days--number'),
        daysLeft = document.querySelector('.order__days--left');


        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(), 
            dateNow = new Date().getTime(), 
            timeRemaining = (dateStop - dateNow) / 1000, 
            seconds = Math.floor(timeRemaining % 60), 
            minutes = Math.floor((timeRemaining / 60) % 60), 
            hours = Math.floor(timeRemaining / 60 / 60 % 24),
            days = Math.floor(timeRemaining / 60 / 60 / 24);

            return {timeRemaining, hours, minutes, seconds, days};
        }   

        const formatTime = (data) => {
            return (data < 10) ? '0' + data : data;
        };

        const formatDays = (number) => {
            if (number.toString().slice(-1) === '1' 
            && number.toString().slice(-2) !== '11'){
                return 'день';
            } else if ((number.toString().slice(-1) === '2'
            && number.toString().slice(-2) !== '12') 
            || (number.toString().slice(-1) === '3'
            && number.toString().slice(-2) !== '13')
            || (number.toString().slice(-1) === '4'
            && number.toString().slice(-2) !== '14')){
                return 'дня';
            } else {
                return 'дней';
            }
        };


        function updateTimer() {  
            let timer = getTimeRemaining();

            timerHours.textContent = formatTime(timer.hours);
            timerMinutes.textContent = formatTime(timer.minutes);
            timerSeconds.textContent = formatTime(timer.seconds);
            timerDays.textContent = timer.days;
            daysLeft.textContent = formatDays(timer.days);

            if (timer.timeRemaining > 0) {
                setInterval(updateTimer, 1000);
            } else {
                timerHours.textContent = '00';
                timerHours.style.color = 'crimson';
                timerMinutes.textContent = '00';
                timerMinutes.style.color = 'crimson';
                timerSeconds.textContent = '00';
                timerSeconds.style.color = 'crimson';
            }
        }
    
        updateTimer();
}
countTimer('22 march 2021');

//ввод только цифр телефона
const checkPhone = () => {
    const phoneInput = document.querySelector('.order__user-phone');

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^\d]/, '');
    });

};
checkPhone();
