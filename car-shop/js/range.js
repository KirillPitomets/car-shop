'use strict';
const rangePriceMin = document.getElementById('range-price-min');
const rangePriceMax = document.getElementById('range-price-max');
// range value 
const maxPriceValue = document.getElementById('max-price');
const minPriceValue = document.getElementById('min-price');
// range track
const rangePriceTrack = document.getElementById('range-price-track');
const rangePriceMaxValue = document.getElementById('range-price-max').max;

// range 
const minGap = 0;
// range min
rangePriceMin.addEventListener('input', function() {
    rangeMin( rangePriceMin, rangePriceMax );
    changePriceNumber( minPriceValue, rangePriceMin.value  );
});
changePriceNumber( minPriceValue, rangePriceMin.value  );
// range max
rangePriceMax.addEventListener('input', function() {

    rangeMax( rangePriceMin, rangePriceMax );
    changePriceNumber( maxPriceValue, rangePriceMax.value  );

});
changePriceNumber( maxPriceValue, rangePriceMax.value  );
fillColor(rangePriceMin, rangePriceMax, rangePriceMaxValue);


// ==============

maxPriceValue.addEventListener('change', function() {
    
    changePriceValue( this, rangePriceMax);
    
});

minPriceValue.addEventListener('change', function() {
    
    changePriceValue( this, rangePriceMin);
    
});

function rangeMin ( slideMin, slideMax  ) {
    
    if ( parseInt(slideMax.value) - parseInt( slideMin.value ) <= minGap ) {
        slideMin.value = parseInt( slideMax.value ) - minGap;
    }

    fillColor(slideMin, slideMax, rangePriceMaxValue);


}

function rangeMax ( slideMin, slideMax ) {
    if ( parseInt(slideMax.value) - parseInt(slideMin.value) <= minGap ) {
        slideMax.value = parseInt(slideMin.value) + minGap;
    }
    fillColor(slideMin, slideMax, rangePriceMaxValue);

}

function changePriceNumber ( element, value  ) {

    element.value = value;

}

function changePriceValue ( value, element ) {
    
    element.value = value;
    fillColor(rangePriceMin, rangePriceMax, rangePriceMaxValue);
}

function fillColor ( rangeMin, rangeMax, rangeMaxValue ) {

    let percentMin = ( rangeMin.value / rangeMaxValue ) * 100;
    
    let percentMax = ( rangeMax.value / rangeMaxValue ) * 100;

    rangePriceTrack.style.background = `linear-gradient( to right, #E0E1EB ${percentMin}%, #FF9E7B ${percentMin}%, #FF9E7B ${percentMax}%, #E0E1EB ${percentMax}% )`
}