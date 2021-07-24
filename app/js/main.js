'use strict';

window.addEventListener('DOMContentLoaded', function () {

const btnListNumbers =  document.getElementsByClassName('phone-JS');
// number pagination from slider
// == home slider
const homeNumAllSliders = document.getElementById('home-num-all-slide');
const homeNumActiveSlide = document.getElementById('home-num-acitve');
// == home slider btns
const nextBtn = document.getElementById('home-next-btn');
const prevBtn = document.getElementById('home-prev-btn');
// drop menu
const carTypeBtn = document.getElementsByClassName('drop-menu-trigger-JS');
// play video btns
const playVideoBtns = document.getElementsByClassName('play-video-JS');
// accordions
const accordions = document.getElementsByClassName('accordion-item-JS');
// call info btn
const callInfoBtns = document.getElementsByClassName('call-info-btn-JS');
// toggle head
const headToggleBtns = document.getElementsByClassName('head-toggle-JS');
const header = document.getElementById('header')

// number list
for ( let btn of btnListNumbers ) {
    
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        let listId = btn.getAttribute('data-list');
        let numberList = document.getElementById(listId); 
        
        changeNumber( btn, numberList );
    
    });
}
// ========= slider / splider =========

const home = new Splide( '#home', {
    type: 'fade',
    perPage: 1,
    autoplay: true,
} ).mount();

new Splide( '#auctions', {
    type: 'loop',
    perPage: 4,
    perMove: 1,
    gap: '2rem',
    breakpoints: {
        955: {
            perPage: 3,
        },
        755: {
            perPage: 2,
        },
        444: {
            perPage: 1,
        }
    }
} ).mount();

// custom pagination

checkForSmallNumber(home.length, homeNumAllSliders);

home.on('moved', function( index ) {
//  custom arrows
    checkingDisabledBtnSlider(prevBtn, nextBtn, 'slide__circles-arrow_active');

//  custom pagination
    checkForSmallNumber( index + 1, homeNumActiveSlide );

});

checkingDisabledBtnSlider(prevBtn, nextBtn, 'slide__circles-arrow_active');

// ======= drop menu ======

for ( let btn of carTypeBtn ) {

    btn.addEventListener('click', function(e) {
        e.preventDefault(e);

        dropDownSheet( btn );
    });

}

// ======= video ======

for (let btn of playVideoBtns ) {

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        startVideo(btn, 'btn-play__video_hide');
    
    });

}

// ======= accordions ======

for ( let accordion of accordions ) {
    accordion.addEventListener('click', function () {

        toggleAccordion( accordion );

    });
}
// ======= map settings ======

// optimizing map loading

let mapReady = false;

if ( !mapReady ) {
    
    window.addEventListener('scroll', checkMapLoading );
}

// ======= call info btns ======

for ( let btn of callInfoBtns ) {
    btn.addEventListener('click', function() {
    
        toggleCallInfo(btn, 'phones_active');

    });    
}

// ======= head toggle ======

for ( let btn of headToggleBtns ) {
    btn.addEventListener('click', () => {
        
        headToggle( btn );

    });
}

// ======= aos / animate ======

AOS.init();


// ======= functions

function checkForSmallNumber ( num, el  ) {

    if ( num < 10 ) {
        el.textContent = ('0' + num);
    } else {
        el.textContent =  num;
    }

}

function checkingDisabledBtnSlider(btnPrev, btnNext, activeClassName  ) {
    if ( btnPrev.disabled ) {
        btnPrev.classList.remove(activeClassName);
    } else {
        btnPrev.classList.add(activeClassName);
    }
    
    if ( btnNext.disabled ) {
        btnNext.classList.remove(activeClassName);
    } else {
        btnNext.classList.add(activeClassName);
    }
}

function changeNumber ( btn, numberList ) {
        // animation
    if ( numberList.classList.contains('phone__numbers_overflow-active') ) {
        setTimeout(() => {
            numberList.classList.remove('phone__numbers_overflow-active');
        }, 300);
        // 300 = transition transform .2s ease  
    }

    numberList.classList.add('phone__numbers_overflow-active');

    btn.classList.toggle('btn-arrow_rotate-180');    
    numberList.classList.toggle('phone__numbers-list_active');    

        // change number
        
    let numbers = numberList.querySelectorAll('[data-phone]');

    const parentWrapper = btn.closest('.phones');

    
    let number = parentWrapper.querySelector('.active-num-JS');
    
    numbers.forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            let callPhoneLinkId = numberList.getAttribute('data-call-phone');

            let callPhoneLink = document.getElementById(callPhoneLinkId);
            
            callPhoneLink.setAttribute('href', `tel:${el.getAttribute('data-phone')}"`) ;
            
            number.innerHTML = el.textContent;
            
            numberList.classList.remove('phone__numbers_overflow-active');
            btn.classList.remove('btn-arrow_rotate-180');    
            numberList.classList.remove('phone__numbers-list_active');    

        });
    });


}

function dropDownSheet ( btn ) {
    
    let sheetId = btn.getAttribute('data-sheet');
    let sheet = document.getElementById(sheetId);
    let sheetItems = sheet.getElementsByClassName('drop-sheet__item');
    
    let btnContent = btn.querySelector('.buttom-content-JS');
    let btnArrow = btn.querySelector('.arrow-JS');
    
    let carInputId = btn.getAttribute('data-car-input');
    let carInput = document.getElementById(carInputId);


    btnArrow.classList.toggle('btn-arrow_rotate-180')
    sheet.classList.toggle('drop-sheet_active');
    

    for ( let item of sheetItems ) {

        item.addEventListener('click', function() {

            let value = item.getAttribute('data-value');

            carInput.value = value;
            btnContent.textContent = item.textContent;

            btn.classList.remove('select-drop__trigger_placeholder');
            sheet.classList.remove('drop-sheet_active');
            btnArrow.classList.remove('btn-arrow_rotate-180')

        });
    }    

}

function startVideo ( btn, className ) {

    const videoId = btn.getAttribute('data-video');
    const video = document.getElementById(videoId);

    video.setAttribute('controls', '');

    video.play();
    
    btn.classList.add(className);

    popupVideoOpen(video);
    

}

function popupVideoOpen ( video ) {

    const videoParent = video.closest('.video');
    const closeBtn = videoParent.querySelector('.close-btn');
    
    lockScroll( true );

    closeBtn.classList.add('close-btn_active');

    videoParent.classList.add('video_active');

    // adding function on click

    popupVideoCloseOpen( video, 'btn-play__video_hide' );

}

function popupVideoCloseOpen ( video, playBtnClassName ) {

    const videoParent = video.closest('.video');
    const closeBtn = videoParent.querySelectorAll('.video-popup-close-JS');

    const playBtnId = videoParent.getAttribute('data-play-btn');
    const playBtn = document.getElementById( playBtnId );

    closeBtn.forEach(el => {
        el.addEventListener('click', () => {
            video.pause();
            lockScroll( false );
            videoParent.classList.remove('video_active');
            el.classList.remove('close-btn_active');
            playBtn.classList.remove(playBtnClassName);

        });
    });



}

function lockScroll ( lock ) {
    // checking for mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        return;
    
    } else {
        const body = document.body;
        const lockElements = document.getElementsByClassName('lock-JS');
        const main = document.getElementById('main');
        const lockPaddingValue = window.innerWidth - main.offsetWidth + 'px';
        // lock = true or false
        let lockBody = lock ;
    
        if ( lockBody ) {
            body.style.overflow = 'hidden';
            body.style.paddingRight = lockPaddingValue;

            for ( let el of lockElements ) {
                el.style.paddingRight = lockPaddingValue;
            }

        } else {
            body.style.overflow = 'unset';
            body.style.paddingRight = 0;
            
            for ( let el of lockElements ) {
                el.style.removeProperty('padding-right');
            }
        }
    }
}

function toggleAccordion ( accordion ) {

    const accordionTitle = accordion.querySelector('.accordion__title-JS');
    const accordionBtn = accordion.querySelector('.accordion__btn-JS');
    const accordionMain = accordion.querySelector('.accordion__main-JS');

    accordion.classList.toggle('accordion__item_active');
    accordionTitle.classList.toggle('accordion__title_active');
    accordionBtn.classList.toggle('accordion__btn_active');
    accordionMain.classList.toggle('accordion__main_active');


}

function checkMapLoading () {
    if ( window.scrollY > (document.documentElement.scrollHeight / 2) ) {
        mapReady = true;
        
        var map = L.map('map', {
            center: [50.46816136226533, 30.60708497124595],
            zoom: 13
        });

        // ======= marker ======
        var customIcon = L.icon({
            iconUrl: './images/map/marker.png',

            iconSize: [62, 79 ], // size of the icon
            iconAnchor: [31, 39.5], // point of the icon which will correspond to marker's location
            
        });

        // ======= map theme ======
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            foo: 'bar',
            
            maxZoom: 100,

            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',

        }).addTo(map);

        L.marker([50.46885670676126, 30.58918099065033], {icon: customIcon}).addTo(map);

    }
    // remove event 
    if ( mapReady  ) {
        window.removeEventListener('scroll', checkMapLoading );
    }
}

function toggleCallInfo( btn, blockClassName ) {

    const blockId = btn.getAttribute('data-phones');
    const block = document.getElementById(blockId);

    block.classList.toggle(blockClassName);

}

function headToggle ( btn ) {

    const headerId = btn.getAttribute('data-head');
    const headerElment =  document.getElementById(headerId);
    

    if ( btn.classList.contains('head-toggle_active') ) {
        animationToggleBtnSecondStep( btn );
        lockScroll(false);

    } else {
        animationToggleBtnFirstStep( btn );
        lockScroll(true);
    }

    headerElment.classList.toggle('header-main_active');
    header.classList.toggle('header_active');

}

function animationToggleBtnFirstStep ( toggleBtn  ) {

    const lines = toggleBtn.querySelector('.head-toggle__line');

    lines.classList.add('head-toggle__line_translate');

    setTimeout( () => {

        toggleBtn.classList.add('head-toggle_active');

    }, 200);

}

function animationToggleBtnSecondStep ( toggleBtn) {
    const lines = toggleBtn.querySelector('.head-toggle__line');

    toggleBtn.classList.remove('head-toggle_active');
    
    setTimeout( () => {

        lines.classList.remove('head-toggle__line_translate');


    }, 200);

}



// ======= DOMContentLoaded ======
});