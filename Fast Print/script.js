class model {
    arrW = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    arrSym = ['!', '@', '$', '^', '"', '{', ')', '+', '>', '?', '(', '=', '*', '&', '%', '#', '/', '|', '[', ']', ';', '`', '~'];
    arrWord = ['Word', 'Phone', 'Monitor', 'Display', 'Watch', 'TV', 'Internet', 'Website', 'Technology', 'Design', 'Laptop', 'Job', 'Frontend', 'Backend', 'Fullstack'];
    arr = ['Frontend Developer', 'Hello World', 'Ruby on Rails', 'Fullstack Developer', 'Google Play', 'Youtube channel', 'Full HD', 'App Store'];
    arrWS = ['C++', 'C#', '<html>', '?php', '$variable', 'a.b', 'x+y', 'function()', 'i=0', 'x>=y'];
    wRand;
    randWord;
    mistakes = 0;
    corrects = 0;
    time = 0;
    started = false;
    curArr = this.arrW;
    curTime = 5;

    rand(){
        this.wRand = Math.floor(Math.random()* this.arrLen(this.curArr));
        this.randWord = this.curArr[this.wRand];
    }

    arrLen(arr) {
        return arr.length;
    }
}

class view {
    m = new model;
    h = document.getElementById('randWords');
    inp = document.getElementById('inp');
    mistake = document.getElementById('mistakes');
    correct = document.getElementById('corrects');
    timer = document.getElementById('timer');
    btn = document.getElementById('btnStart');
    li = document.getElementById('latestPress');
    btnRemove = document.getElementById('removeBtn');
    btns = document.querySelectorAll('.btn-header');
    btnsTime = document.querySelectorAll('.btn-time');
}

class controller {
    m = new model;
    v = new view;

    btsActiveLoop(cur, bool){

    }

    clearLi() {
        this.v.btnRemove.disabled = true;
        while(this.v.li.firstChild) {
            this.v.li.removeChild(this.v.li.firstChild);
        }
    }

    selectArr(obj, arr){
        this.m.curArr = arr;

        for(let i=0; i < this.v.btns.length; i++) {
            if(obj == this.v.btns[i]){
                this.v.btns[i].style.backgroundColor = 'lightgreen';                
            }
            else {
                this.v.btns[i].style.backgroundColor = 'rgb(236, 236, 236)';
            }
        }

    }

    selectTime(obj, time) {
        this.m.time = time;
        this.v.timer.innerHTML = this.m.time;
        this.m.curTime = time;

        for(let i=0; i < this.v.btnsTime.length; i++) {
            if(obj == this.v.btnsTime[i]){
                this.v.btnsTime[i].style.backgroundColor = 'lightgreen';                
            }
            else {
                this.v.btnsTime[i].style.backgroundColor = 'rgb(236, 236, 236)';
            }
        }
        
    }

    starting() {

        for(let i = 0; i < this.v.btns.length; i++) {
            this.v.btns[i].disabled = true;
        }

        for(let i = 0; i < this.v.btnsTime.length; i++) {
            this.v.btnsTime[i].disabled = true;
        }

        this.m.rand();
        
        this.v.btn.disabled = true;
        this.v.inp.disabled = false;
        this.v.h.innerHTML = this.m.randWord;

        this.m.mistakes = 0;
        this.m.corrects = 0;
        this.v.mistake.innerHTML = this.m.mistakes;
        this.v.correct.innerHTML = this.m.corrects;

        if(this.m.time == 0){
            this.m.time = this.m.curTime;
        }

        let myTime = setInterval(() => {
            this.m.time--;
            this.v.timer.innerHTML = this.m.time;
            if(this.m.time == 0){
                clearInterval(myTime);
                this.v.btn.disabled = false;
                this.v.inp.disabled = true;
                this.v.inp.value = '';
                let liLate = document.createElement('li');
                liLate.textContent = 'Ошибки: ' + this.m.mistakes + ' | Правильно: ' + this.m.corrects + ' - за ' + this.m.curTime + ' секунд';
                this.v.li.appendChild(liLate);
                this.v.h.innerHTML = 'Нажмите на кнопку начать...'
                if(this.v.li.firstChild){
                    this.v.btnRemove.disabled = false;
                }
                this.v.inp.style.border = '1px solid rgb(226, 226, 226)';

                for(let i = 0; i < this.v.btns.length; i++) {
                    this.v.btns[i].disabled = false;
                }

                for(let i = 0; i < this.v.btnsTime.length; i++) {
                    this.v.btnsTime[i].disabled = false;
                }
            }
        }, 1000);
    }

    inner() {
        this.v.mistake.innerHTML = this.m.mistakes;
        this.v.correct.innerHTML = this.m.corrects;
    }

    keyPress(){
        this.m.rand();
        this.v.timer.innerHTML = this.m.time;
        this.inner();

        document.addEventListener('keyup', (event) => {
            if(event.key === 'Enter' && this.v.inp.disabled == false){
                if(this.v.inp.value == this.m.randWord){
                    this.m.rand();
                    this.v.h.innerHTML = this.m.randWord;
                    this.v.inp.style.border = '1.5px solid lightgreen';
                    this.m.corrects++;
                }
                else {
                    this.m.mistakes++;
                    this.v.inp.style.border = '1.5px solid tomato';
                }
            this.v.inp.value = '';
            this.inner();
            }
                  
        }, false);
    }
}

var c = new controller;
c.keyPress();


