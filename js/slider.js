const sliderSetup = () => {
    const SLIDETIME = 500; //ms
    const CHANGESLIDE = 2500 //ms

    const backButton = document.querySelector('.film-slider-back-btn');
    const forwardButton = document.querySelector('.film-slider-next-btn');
    const allSlides = [...document.querySelectorAll('.wbn-slide')];
    let clickable = true;
    let active = null;
    let newActive = null;

    function initSlider() {
        allSlides.forEach(slide =>
            slide.setAttribute(
                'style',
                `transition: transform ${SLIDETIME}ms ease;
                       animation-duration: ${SLIDETIME}ms`,
            ),
        );
    }

    function changeSlide(forward) {
        if (clickable) {
            clickable = false;
            active = document.querySelector('.active');
            const activeSlideIndex = allSlides.indexOf(active);

            if (forward) {

                newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
                active.classList.add('slideOutLeft');
                newActive.classList.add('slideInRight', 'active');
            } else {

                newActive =
                    allSlides[
                    (activeSlideIndex - 1 + allSlides.length) % allSlides.length
                    ];
                active.classList.add('slideOutRight');
                newActive.classList.add('slideInLeft', 'active');
            }
        }
    }

    allSlides.forEach(slide => {
        slide.addEventListener('transitionend', e => {
            if (slide === active && !clickable) {
                clickable = true;
                active.className = 'wbn-slide';
            }
        });
    });

    forwardButton.addEventListener('click', () => {
        changeSlide(true);
    });
    backButton.addEventListener('click', () => {
        changeSlide(false);
    });

    initSlider();

    setInterval(() => {
        changeSlide(true)
    }, CHANGESLIDE)
}