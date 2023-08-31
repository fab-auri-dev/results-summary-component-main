const summuaryWrapper = document.getElementById( 'summuaryWrapper' );
const resultScore = document.getElementById( 'resultScore' );


// Result score effects
function constant( duration, range, current ) {
    //No easing
    return duration / range;
}; 
function linear( duration, range, current ) {
    //Linear easing
    return ( ( duration * 2 ) / Math.pow( range, 2 ) ) * current;
} 
function quadratic( duration, range, current ) {
    //Quadratic easing
    return ( ( duration * 3 ) / Math.pow( range, 3 ) ) * Math.pow( current, 2 );
};
function animateValue( id, start, duration, easing ) {
    document.getElementById( id ).removeAttribute( 'style' );
    document.querySelector( '.result-circle' ).classList.add( 'blob' );

    let end = parseInt( document.getElementById( id ).textContent, 10 );
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let obj = document.getElementById( id );
    let startTime = new Date();
    let offset = 1;
    let remainderTime = 0;

    let step = function() {
        current += increment;
        obj.innerHTML = current;
        
        if ( current != end ) {
            setTimeout( step, easing( duration, range, current ) );
        } else {
            document.querySelector( '.result-circle' ).classList.remove( 'blob' );

            console.log( 'Easing: ', easing );
            console.log( 'Elapsed time: ', new Date() - startTime );
        };
    };

    setTimeout( step, easing( duration, range, start ) );
};
// animateValue( "resultScore", 0, 3500, constant );
// animateValue( "resultScore", 0, 3500, linear );
// animateValue( "resultScore", 0, 3500, quadratic );


// Summary wrapper functions
const resultScoreAverage = arr => {
    const sum = arr.reduce( ( acc, cur ) => acc + cur );
    const average = sum / arr.length;
    return Math.round( average );
};

function generateSummaryTitle() {
    const summarySubtitle = document.createElement( 'h2' );
    summarySubtitle.className = 'summary-subtitle';
    summarySubtitle.textContent = 'Summary';
    summuaryWrapper.appendChild( summarySubtitle );
};

function generateSummaryBtn() {
    const summaryBtn = document.createElement( 'button' );
    summaryBtn.className = 'summary-btn';
    summaryBtn.textContent = 'Continue';
    summuaryWrapper.appendChild( summaryBtn );
};

function populateResultSummaryWrapper( data ) {

    generateSummaryTitle();

    let scores = [];

    data.forEach( scoreEl => {
        // console.log( scoreEl );

        summuaryWrapper.innerHTML += 
        `
        <div id="${ scoreEl.category.toLowerCase() }Stats" class="stats-wrapper">
            <div class="stats-name">
                <img class="stats-icon" src="${ scoreEl.icon }" alt="">
                <p id="${ scoreEl.category.toLowerCase() }Category">
                    <strong> ${ scoreEl.category } </strong> 
                </p>
            </div>

            <div class="stats-score">
                <p class="total-score">
                    <strong id="${ scoreEl.category.toLowerCase() }Score" class="current-score"> ${ scoreEl.score } </strong>
                    / 100
                </p>
            </div>
        </div>    
        `;

        scores.push( scoreEl.score );
    } );

    const reactionStats = document.getElementById( 'reactionStats' );
    reactionStats.classList.add( 'bg-light-red' );
    const reactionCategory = document.getElementById( 'reactionCategory' );
    reactionCategory.classList.add( 'text-light-red' );

    const memoryStats = document.getElementById( 'memoryStats' );
    memoryStats.classList.add( 'bg-orangey-yellow' );
    const memoryCategory = document.getElementById( 'memoryCategory' );
    memoryCategory.classList.add( 'text-orangey-yellow' );

    const verbalStats = document.getElementById( 'verbalStats' );
    verbalStats.classList.add( 'bg-green-teal' );
    const verbalCategory = document.getElementById( 'verbalCategory' );
    verbalCategory.classList.add( 'text-green-teal' );

    const visualStats = document.getElementById( 'visualStats' );
    visualStats.classList.add( 'bg-cobalt-blue' );
    const visualCategory = document.getElementById( 'visualCategory' );
    visualCategory.classList.add( 'text-cobalt-blue' );

    animateValue( "reactionScore", 0, 3000, quadratic );
    animateValue( "memoryScore", 0, 3000, quadratic );
    animateValue( "verbalScore", 0, 3000, quadratic );
    animateValue( "visualScore", 0, 3000, quadratic );

    generateSummaryBtn();

    // console.log( scores );
    resultScore.textContent = resultScoreAverage( scores );
    resultScore.style.display = 'none';
    animateValue( "resultScore", 0, 3000, quadratic );
};


fetch( './data.json' )
.then( response => response.json() )
.then( data => populateResultSummaryWrapper( data ) )
.catch( err => console.error( err ) );