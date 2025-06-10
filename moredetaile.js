const storege = JSON.parse(localStorage.getItem('moredetaile')) || [];
const cardStorege = JSON.parse(localStorage.getItem('carts')) || [];
const moredetaile = document.querySelector('.more-detaile');
const countCart = document.querySelector('.countCart');
const centerImg = document.querySelector('.center-img');
const box = document.querySelector('.box');
let arrCard = Array(storege);


function renderCard() {
    moredetaile.innerHTML = '';
    
    const cardStorege = localStorage.getItem('carts') || '[]';
            let carts = JSON.parse(cardStorege);
            let totalCart = carts.reduce((pre, item) => {
                return pre + item.quantity;
            },0)
    countCart.textContent = totalCart;

    if(cardStorege) {
        arrCard.forEach((item, index) => {
            console.log(item);

            let {id, img, imges1, imges2, imges3, imges4, title, priceNumber, quantity = 1} = item;
            let priceString = priceNumber.toLocaleString('kz') + ' ₸';
            let moreCard = document.createElement('div');
            moreCard.setAttribute('class', 'card');
            moreCard.setAttribute('id', id);
            moreCard.innerHTML = `
             <div class="center-img">
                <img src="${img}" alt="product" class="imgCard">
            </div>
            <div class="section">
                <h2 class="title">${title}</h2>
                <span class="price">${priceString}</span>
                <button class="btnadd">в корзину</button>
            </div>
            `;
            let boximg = document.createElement('div');
            boximg.setAttribute('class', 'box-img');
            boximg.innerHTML = `
            <div class="box-img">
                <div class="box">
                    <img class="imgcart" src="${imges1}" alt="">
                </div>
                <div class="box">
                    <img class="imgcart" src="${imges2}" alt="">
                </div>
                <div class="box">
                   <img class="imgcart" src="${imges4}" alt="">
                </div>
                <div class="box">
                    <img class="imgcart" src="${imges3}" alt="">
                </div>
            </div>
            `;
            moredetaile.append(moreCard);
            moredetaile.appendChild(boximg);

        });
    }

};

moredetaile.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnadd')) {
        const card = e.target.closest('.card');
        const id = card.id;
        const img = card.querySelector('.imgCard').src;
        const title = card.querySelector('.title').textContent;
        let price = card.querySelector('.price').textContent;
        let priceNumb = parseInt(price.replace(/\s/g, ''),10);
        let cart = {id, img, title, priceNumb, quantity: 1};
        const cardStorege = localStorage.getItem('carts') || '[]';
        let carts = JSON.parse(cardStorege);

        const existId = carts.findIndex((item) => item.id === id);
        if(existId !== -1) {
            alert('Такой товар уже добавлен!');
        }else {
            carts.push(cart);
        }

        localStorage.setItem('carts', JSON.stringify(carts));
        renderCard();

    }else if(e.target.classList.contains('imgcart')) {
            let cartElem = e.target.closest('.box');
            let imgcart = cartElem.querySelector('.imgcart').src;

            document.querySelector('.imgCard').src = imgcart;
    }

});

renderCard();
