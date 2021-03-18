window.addEventListener('DOMContentLoaded', () => {
    
    //logoAnimation - устраивает

    const
        logoBlock = document.querySelector('.header__logo'),
        logoIcons = document.querySelectorAll('.header__figure img');

    logoBlock.addEventListener('mouseover', () => {
        logoIcons[0].classList.add('bounce');
        logoIcons[1].classList.add('bounce__second');
        setTimeout( () => {
            logoIcons[0].classList.remove('bounce');
            logoIcons[1].classList.remove('bounce__second');
        }, 2000);
    });

    // toTop Button and order Button fade - пока не разобрался, но ок

    const scrollToTopButton = document.getElementById('to-top');
    const orderButton = document.getElementById('order');
    const scrollFunc = () => {
        let y = window.scrollY;
        if (y > 590) {
            scrollToTopButton.classList.add('show');
            scrollToTopButton.classList.remove('hide');
            orderButton.classList.add('show');
            orderButton.classList.remove('hide');

        } else {
            scrollToTopButton.classList.add('hide');
            scrollToTopButton.classList.remove('show');
            orderButton.classList.add('hide');
            orderButton.classList.remove('show');

        }
    };
    window.addEventListener("scroll", scrollFunc);

    // form - устраивает

    const
        formButton = document.getElementById('button_submit'),
        inputName = document.getElementById('name'),
        inputOrg = document.getElementById('org'),
        inputTel = document.getElementById('phone'),
        form = document.querySelector('.popup__form');

    form.addEventListener('input', (e) => {
        if (e.target.tagName == "INPUT" &&
            (inputName.value != "" && inputOrg.value != "" && inputTel.value != "")) {
                formButton.classList.remove('btn__popup_disabled');
                formButton.removeAttribute('disabled');
                formButton.classList.add('btn__hover');
        } else {
            formButton.classList.add('btn__popup_disabled');
            formButton.setAttribute('disabled', 'disabled');
            formButton.classList.remove('btn__hover');
        }
    });

    //popup - устраивает

    const
        orderButtons = document.querySelectorAll('.btn__order'),
        inputs = document.querySelectorAll('.popup__text'),
        popup = document.querySelector('.popup'),
        dialogFirst = document.getElementById('popup_first'),
        buttonSubmit = document.getElementById('button_submit'),
        scroll = calcScroll();

    let dialogSecond = {};

    orderButtons.forEach(item => {
        item.addEventListener('click', () => {
            popup.classList.remove('hide');
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;

        });
    });

    popup.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup__close') || 
        e.target.classList.contains('btn__popup_close')) {
            popup.style.opacity = 0;
            setTimeout(() => {
                popup.classList.add('hide');
                popup.classList.remove('show');
                document.body.style.marginRight = ``;
                document.body.style.overflow = '';    
                popup.style.opacity = '';
                dialogFirst.style.display = '';
                dialogFirst.style.opacity = '';
                dialogSecond.remove();
            }, 500);
            inputs.forEach(input => {
                input.value = '';
            });
        }
    });

    buttonSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        
        dialogFirst.style.opacity = 0;
        setTimeout( () => {
            dialogFirst.style.display = 'none';
            dialogSecond = document.createElement('div');
            dialogSecond.classList.add('popup__modal');
            dialogSecond.classList.add('show');
            dialogSecond.style.opacity = 0;
            dialogSecond.innerHTML = `
                <div class="popup__close"></div>
                <div class="popup__header">
                    Заказать монтаж
                </div>
                <hr class="mobile_hidden">
                <div class="popup__reply">Спасибо за ваш заказ!</div>
                <div class="popup__callback">
                    Наши специалисты скоро свяжутся с вами для уточнения деталй заказа
                </div>
                <button id="button_close" class="btn btn__popup btn__popup_close">
                    Закрыть
                </button>
            `;
            popup.append(dialogSecond);
            fadeIn(dialogSecond);
        }, 500);

    });

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    
    // slider - устсраивает

    const
        prevArrow = document.getElementById('prev'),
        nextArrow = document.getElementById('next'),
        dots = document.querySelectorAll('.slider__dot'),
        slides = document.querySelectorAll('.slider__frame'),
        infoBtns = document.querySelectorAll('.info');

    const slideStates = [
        ['slider__frame_first', 'slider__frame_second', 'slider__frame_third'],
        ['slider__frame_third', 'slider__frame_first', 'slider__frame_second'],
        ['slider__frame_second', 'slider__frame_third', 'slider__frame_first']
    ];
    
    
    let index = 0;
    activateDot(index);
    changeSlide();
    showButton();


    prevArrow.addEventListener('click', () => {
        if (index === 0) {
            index = 2;
        } else {
            index -= 1;
        }
        activateDot(index);
        changeSlide();
        showButton();
        console.log(index);
    });

    nextArrow.addEventListener('click', () => {
        if (index === 2) {
            index = 0;
        } else {
            index += 1;
        }
        activateDot(index);
        changeSlide();
        showButton();
        console.log(index);
    });

    dots.forEach((item, ind) => {
        item.addEventListener('click', () => {
            index = ind;
            activateDot(index);
            changeSlide();
            showButton();
            console.log(index);
        });
    });

    function activateDot(ind) {
        dots.forEach(item => {
            item.classList.remove('slider__dot_active');
        });
        dots[ind].classList.add('slider__dot_active');
    }
    
    function changeSlide() {
        slides.forEach((item) => {
            item.classList.remove('slider__frame_first', 'slider__frame_second', 'slider__frame_third');
            const data = item.getAttribute('data-slide');
            item.classList.add(slideStates[index][data]);
        });
    }
    
    function showButton() {
        infoBtns.forEach((item) => {
            item.classList.add('hide');
            if (item.parentElement.classList.contains('slider__frame_first')) {
                item.classList.remove('hide');
                item.classList.add('show-btn');
            }
        });
    }

    // fadeIn

    function fadeIn(element) {
        let opacity = 0.01;
        let timer = setInterval(function() {
            if(opacity >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = opacity;
            opacity += opacity * 0.8;
        }, 70);
    }

});