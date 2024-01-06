'use strict'

class Calculator{
    #allPic = {};

    constructor(wrap, isButton=false) {
        this.wrapper = document.querySelector(wrap);
        this.pic = this.wrapper.querySelector('.calculator__icon img');
        this.select = this.wrapper.querySelector('select');
        this.rows = this.wrapper.querySelector('.calculator__add');
        this.btn = this.wrapper.querySelector('.rooms__calculate');
        this.answer = this.wrapper.querySelector('.calculator__total p>span');
        
        this.allSquare = 0;
        this.price = 100;
        this.result = 0;
        this.isButton = isButton;
    }

    getAllPic(){
        [...this.select.children].forEach(elem => {
            this.#allPic[elem.value] = elem.dataset.pic;
        })
    }

    replacePicture(e){
        this.price = +e.target.value;
        this.pic.setAttribute('src',`pic/${this.#allPic[this.price]}`);
        this.defineSquare();
        this.calculateCost();
    }

    addDeleteRooms(e){
        if(this.rows.children.length <= 5) {
            if(e.target.matches('.rooms_add')){
                let t = e.target.parentElement.cloneNode(true);

                e.target.classList.replace('rooms__btn--show','rooms__btn--hidden');
                e.target.nextElementSibling.classList.replace('rooms__btn--hidden', 'rooms__btn--show');
                
                t.children[0].value = null;
                t.children[1].value = null;
                this.rows.append(t);

                this.defineSquare();
                this.calculateCost();
            }
        }

        if(e.target.matches('.rooms_del')){
            e.target.parentElement.remove();
            this.defineSquare();
            this.calculateCost();
        }
    }

    defineSquare() {
        let t = [...this.rows.querySelectorAll('.rooms__square')];
        let square = t.map(elem => +elem.value);
        this.allSquare = square.reduce((acc, curr) =>{return acc + curr}, 0)
            
    }

    calculateSquare(e) {
        if(e.target.matches('.rooms__square')){
            let reg = /\D/g;
            e.target.value = e.target.value.replace(reg, '');
            this.defineSquare();
            this.calculateCost();
        }
    }

    calculateCost() {
        this.result = this.allSquare * this.price;
        this.answer.innerText = this.result.toFixed(2);
    }

    createButton() {
        let str = `<span class="rooms__btn rooms__calculate">Розрахувати</span>`;
        this.wrapper.querySelector('.calculator__total').insertAdjacentHTML('afterbegin',str)
    }

    init(){
        this.getAllPic();
        this.select.addEventListener('change',this.replacePicture.bind(this));
        this.rows.addEventListener('click',this.addDeleteRooms.bind(this));
        this.rows.addEventListener('input',this.calculateSquare.bind(this));
        if(this.isButton) {
            this.createButton();
            this.btn.addEventListener('click',this.calculateCost.bind(this));
        }
    }
}