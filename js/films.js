var recommendedFilms = [
    {
        name: 'The Mandalorian',
        image: 'images/the_mandalorian.jpg',
        imdb: '8.7',
        watchLink: '/'
    },
    {
        name: 'Tenet',
        image: 'images/tenet.jpg',
        imdb: '7.6',
        watchLink: '/'
    },
    {
        name: 'Breaking Bad',
        image: 'images/breaking_bad.jpg',
        imdb: '9.5',
        watchLink: '/'
    },
    {
        name: 'Bill & Ted: Face the Music',
        image: 'images/bill_and_ted_face_the_music.jpg',
        imdb: '6.1',
        watchLink: '/'
    }
]
var sliderFilms = [
    {
        name: 'Black Mirror',
        year: '2011 - ',
        image: 'images/black_mirror.jpg'
    },
    {
        name: 'The Queen\'s Gambit',
        year: '2020',
        image: 'images/queens_gambit.jpg'
    },
    {
        name: 'Colony',
        year: '2016 - 2018',
        image: 'images/colony.jpg'
    },
    {
        name: 'Vikings',
        year: '2013 - ',
        image: 'images/vikings.jpg'
    },
]
document.addEventListener('DOMContentLoaded', () => {
    var recommendedFilmTemplate = document.querySelector('#recommendedFilmTemplate')
    var sliderFilmTemplate = document.querySelector('#sliderFilmTemplate')
    var $filmCards = document.querySelector('.film-cards')
    var $filmSlider = document.querySelector('#film-slider')
    recommendedFilms.forEach(film => {
        var element = recommendedFilmTemplate.innerHTML
            .replace('{name}', film.name)
            .replaceAll('{image}', film.image)
            .replace('{imdb}', film.imdb)
        $filmCards.insertAdjacentHTML('beforeend', element)
    })
    if ($filmSlider) {
        sliderFilms.forEach(film => {
            var element = sliderFilmTemplate.innerHTML
                .replace('{name}', film.name)
                .replaceAll('{image}', film.image)
                .replace('{year}', film.year)
            $filmSlider.querySelector('.wbn-buttons').insertAdjacentHTML('beforebegin', element)
        })
        document.querySelectorAll('.wbn-slide')[0].classList.add('active')
        sliderSetup()
    }
})