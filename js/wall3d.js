(function() {

    const houseElem = document.querySelector('.house');
    let maxScrollValue;
    
    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }


    window.addEventListener('scroll', function() {
    // pageYOffset/maxScrollValue = 전체 스크롤 범위에서 현재 스크롤된 비율
        const zMove = pageYOffset/maxScrollValue * 980 - 490;
        houseElem.style.transform = 'translateZ('+ zMove +'vw)'
    });

    window.addEventListener('resize', resizeHandler);
    resizeHandler(); //load되면 한번 초기화
})(); 