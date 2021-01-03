(function() {

    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar')
    let maxScrollValue;
    
    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }


    window.addEventListener('scroll', function() {
    // pageYOffset/maxScrollValue = 전체 스크롤 범위에서 현재 스크롤된 비율
        const scrollPer = pageYOffset/maxScrollValue;
        const zMove =  scrollPer * 980 - 490; //translateZ의 값
        houseElem.style.transform = 'translateZ('+ zMove +'vw)'

        //progress bar
        barElem.style.width =  scrollPer * 100 + '%'

    });

    window.addEventListener('resize', resizeHandler);
    resizeHandler(); //load되면 한번 초기화
})(); 