'use strict';

window.addEventListener('DOMContentLoaded', function () {

const btnListNumbers =  document.getElementsByClassName('phone-JS');
// number pagination from slider
// == home slider
const homeNumAllSliders = document.getElementById('home-num-all-slide');
const homeNumActiveSlide = document.getElementById('home-num-acitve');
// == btns
const nextBtn = document.getElementById('home-next-btn');
const prevBtn = document.getElementById('home-prev-btn');
// drop menu
const carTypeBtn = document.getElementsByClassName('drop-menu-trigger-JS');
//

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

// ========= video control panel  =========
// ======= first code ======
// const playBtn = document.getElementsByClassName('video-play-JS');

// for ( let btn of playBtn ) {
    
//     btn.addEventListener('click', function(e) {
//         e.preventDefault();

//         const videoId = btn.parentElement.getAttribute('data-video');

//         const video = document.getElementById(videoId);        
        
//         console.log(video);

//     });
// }
// ======= second code ======

const videoControlPanels = document.getElementsByClassName('video-controls-JS');

for ( let panel of videoControlPanels ) {

    panel.addEventListener('click', function (e) {

        let videoId = panel.getAttribute('data-video');
        let video = document.getElementById(videoId);

        
        
        // ======= toggle video ======
        if ( e.target.classList.contains('video-toggle-JS') ) {
            switchPlayPause( video, e.target );
        }
    

    });
    panel.addEventListener('mouseover', function (e) {
        let videoId = panel.getAttribute('data-video');
        let video = document.getElementById(videoId);

         // ======= volume video ======
         if ( e.target.classList.contains('video-volume-btn-JS') ) {
        
            switchVolume( video, e.target );
        
        }

    });

}

// check mouseDown 




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
    let number = document.getElementById('active-num');
    
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

function switchPlayPause( video, btn ) {

    if ( video.paused ) {
        video.play();
        btn.textContent = 'play';

    } else {

        video.pause();
        btn.textContent = 'pause';

    }
    

}

function switchVolume (video, btn) {


    btn.addEventListener('mousedown', function(event) {
        // event.stopPropagation();
        
        let volumeLine = event.target.classList.contains('video-volume-JS') ? event.target : false;

        let mouseDown = false;

        document.body.onmousedown = function () {
            mouseDown = true;
        };
        document.body.onmouseup = function () {
            mouseDown = false;
        };
        
        let oldPosX = event.screenX;

        let width = volumeLine.offsetWidth;

        volumeLine.style.width = `${width + 1}px`;

        btn.addEventListener('mousemove', function (e) {
            if ( mouseDown ) {
                
                // width px
                let newPosX = e.screenX;

                width = volumeLine.offsetWidth;
                
                let percentVolume = (width / btn.offsetWidth) * 100; 

                if ( newPosX > oldPosX && percentVolume < 100 ) {
                    
                    volumeLine.style.width = `${width + 1}px`;
                    
                } else {
                    volumeLine.style.width = `${width - 1}px`;
                }

                

                oldPosX = newPosX;
                
            }
        });
    });

}



// ======= DOMContentLoaded ======
});