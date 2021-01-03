

function Character(info) {
    this.mainElem =  document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
    + '<div class="character-face-con character-head">'
        + '<div class="character-face character-head-face face-front"></div>'
        + '<div class="character-face character-head-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-torso">'
        + '<div class="character-face character-torso-face face-front"></div>'
        + '<div class="character-face character-torso-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-arm character-arm-right">'
        + '<div class="character-face character-arm-face face-front"></div>'
        + '<div class="character-face character-arm-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-arm character-arm-left">'
        + '<div class="character-face character-arm-face face-front"></div>'
        + '<div class="character-face character-arm-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-leg character-leg-right">'
        + '<div class="character-face character-leg-face face-front"></div>'
        + '<div class="character-face character-leg-face face-back"></div>'
    + '</div>'
    + '<div class="character-face-con character-leg character-leg-left">'
        + '<div class="character-face character-leg-face face-front"></div>'
        + '<div class="character-face character-leg-face face-back"></div>'
    + '</div>';
    document.querySelector('.stage').appendChild(this.mainElem);
    this.mainElem.style.left = info.xPos + '%'; 
    this.scrollState = false; //스크롤 중인지 아닌지 체크(만들어졌을 때는 스크롤되지 않았으니 false);
    this.lastScrollTop = 0; // 바로 이전 스크롤 위치
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    this.runningState = false; //좌우 이동키를 반복적으로 누르는지 확인
    this.rafId;
    this.init();

} 

Character.prototype = {
    constructor: Character,
    init: function () {
        const self = this;
       
        window.addEventListener('scroll', function() {
             // scroll은 계속 일어나는데 classList 이벤트는 1번만 일어나게 하는 방법
            clearTimeout(self.scrollState);

            if(!self.scrollState){
                self.mainElem.classList.add('running');
            }
            
            self.scrollState = setTimeout(function() {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            },500);



            //이전 스크롤 위치와 현재 스크롤 위치를 비교
            if(self.lastScrollTop > pageYOffset){
               // 이전 스크롤 위치가 크다면 : 스크롤 올림
                self.mainElem.setAttribute('data-direction','backward');

            } else{
                // 현재 스크롤 위치가 크다면 : 스크롤 내림
                self.mainElem.setAttribute('data-direction','forward');
            }

            self.lastScrollTop = pageYOffset;

        });

        window.addEventListener('keydown', function(e) {
            if(self.runningState) return;

            if(e.keyCode == 37){
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction','left');
                self.mainElem.classList.add('running');
                self.run(self);
                self.runningState = true;


            } else if(e.keyCode == 39) {
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction','right');
                self.mainElem.classList.add('running');
                self.run(self);
                self.runningState = true;
            }
        });

        window.addEventListener('keyup',function(e) {
            self.mainElem.classList.remove('running');
            cancelAnimationFrame(self.rafId);
            self.runningState = false; // false로 안바꾸면 js.79때문에 방향키관련 이벤트가 실행이 안됨
        });
    },
    run: function(self) {
        
        
        if (self.direction == 'left')  {
            self.xPos -= self.speed;
        } else if (self.direction == 'right') {
            self.xPos += self.speed;
        }
        if(self.xPos < 2){
            self.xPos = 2;
        }

        if(self.xPos > 88){
            self.xPos = 88;
        }
    
            self.mainElem.style.left = self.xPos + '%';

            self.rafId = requestAnimationFrame(function() {

                
                self.run(self);

            })
    }

};