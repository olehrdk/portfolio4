//header

let el = document.querySelector('header');

addEventListener('scroll', function(){
    if(window.pageYOffset > 100) {
        el.classList.add('fixed');
      } else {
        el.classList.remove('fixed');
      }
}) ;

let burger = document.querySelector('.burger');
let menu = document.querySelector('.header__menu');
burger.onclick = function(){
	burger.classList.toggle('burger-active');	
	menu.classList.toggle('menu-active');	
}

//sliders

new Swiper('.gallery', {
    slidesPerView: 4,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        576: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 4,
        },
    }
})

new Swiper('.slider',{
    autoplay: {
        delay: 5000,
      },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    }
});


//form

const selectSingle = document.querySelector('.form__select');
if(selectSingle){
    const selectSingle_title = selectSingle.querySelector('.form__select-title');
const selectSingle_labels = selectSingle.querySelectorAll('.form__select-label');

selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
    } else {
      selectSingle.setAttribute('data-state', 'active');
    }
  });

for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
    });
  }
}




//popup

// Получаем все ссылки которые ведут на попап( с класом popup-link)
const popupLinks = document.querySelectorAll('.popup-link');
// Для блокировки скрола страницы
const body = document.querySelector('body');
// Елемнты которые блокируются при открытии
const lockPadding = document.querySelectorAll('.lock-padding');
// чтобы не было двойных нажатий
let unlock = true;
// такое же как и в css transition. Связано с блокировкой скрола
const timeout = 500;

if(popupLinks.length > 0){
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault(); //Запрет перехода по ссылкам
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0){
    for(let index = 0; index < popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e){
            popupClose(el.closest('.popup')); //на клик закрыть ближайшый родитель с класом popup
            e.preventDefault();
        });
    }
} 

function popupOpen(curentPopup){
    if(curentPopup && unlock){
        const popupActive = document.querySelector('.popup.open'); //получить откритый попап
        if(popupActive){ //если существует откритый попап
            popupClose(popupActive, false); //закрыть его
        }else{
            bodyLock(); //усли нет - блокируем скрол
        }
        curentPopup.classList.add('open'); 
        curentPopup.addEventListener('click', function(e){
            if(!e.target.closest('.popup__content')){ //отсекаем контент попапа
                popupClose(e.target.closest('.popup')); //закрываем попап при клике где-то кроме контента
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true){
    if(unlock){
        popupActive.classList.remove('open');
        let video = document.querySelector('#my-video');
        document.querySelector('#my-video').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        if(doUnlock){
            bodyUnLock();
        }
    }
}

function bodyLock(){
    // получаем ширину скролбара
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if(lockPadding.length > 0){
        for(let index = 0; index < lockPadding.length; index++){
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
   
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock'); //по этому класу убираем скрол

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

function bodyUnLock(){
    setTimeout(function(){
        if(lockPadding.length > 0){
            for(let index = 0; index < lockPadding.length; index++){
                const el = lockPadding[index];
                el.style.paddingRight = '0px'; //убираем падинг
            }
        }
        
        body.style.paddingRight = '0px';
        body.classList.remove('lock'); //розблокируем скрол
    }, timeout); // через некоторое время. Скролл появляется только когда закончится анимация

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout)
}

// закрытие при нажатии на Esc
document.addEventListener('keydown', function(e){
    if(e.which === 27){
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

//Полифиллы для поддержки в браузерах
(function() {

    // проверяем поддержку
    if (!Element.prototype.closest) {
  
      // реализуем
      Element.prototype.closest = function(css) {
        var node = this;
  
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  
  })();

(function() {

    // проверяем поддержку
    if (!Element.prototype.matches) {
  
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
  
    }
  
  })();

 
//map

var basic = new Datamap({
    element: document.getElementById('map'),
    fills: {
        defaultFill: 'rgba(255,129,126,0.8)' // Any hex, color name or rgb/rgba value
    }
  });