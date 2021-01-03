(function() {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar')
    const mousePos = { x: 0, y: 0};
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

    window.addEventListener('mousemove', function( e ) {
       // e.clientX,e.clientY mouse의 위치 좌표
       // e.clientX / window.innerWidth 화면의 x축에서 마우스의 이동 비율
       mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
       mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
       stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) +'deg) rotateY(' + (mousePos.x * 5) +'deg)'

    })

    window.addEventListener('resize', resizeHandler);
    resizeHandler(); //load되면 한번 초기화

   stageElem.addEventListener('click', function(e) {
       console.log();
       new Character({
           xPos: e.clientX / window.innerWidth * 100,
           speed: Math.random() * 0.4 + 0.2
       });
   });

})(); 