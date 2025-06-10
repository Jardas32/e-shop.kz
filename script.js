const product = document.querySelector('.products');
const countCart = document.querySelector('.countCart');

//fetch('http://localhost:3000/products')
//  .then(response => {
//    return response.json()
//  })
//  .then(data => {
//      localStorage.setItem('product', JSON.stringify(data));
//      const products = JSON.parse(localStorage.getItem('product')) || [];

//function renderProduct() {
//    product.innerHTML = '';
//    const cardStorege = localStorage.getItem('carts') || '[]';
//    let carts = JSON.parse(cardStorege);
//    countCart.textContent = carts.length;

//    products.forEach((item, index) => {
//        let {id, img, price, title, quantity = 1} = item;
//        let priceString = price.toLocaleString('kk-KZ') + ' ₸';
//        let card = document.createElement('div');
//        card.setAttribute('class', 'card');
//        card.setAttribute('id', id);
//        card.innerHTML = `
//        <div class="center-img">
//            <img src="${img}" alt="product" class="imgCard">
//            </div>
//            <p class="title">${title}</p>
//            <span class="price">${priceString}</span>
//            <p class="mpre-detaole">More details</p>
//            <button  data-index="${index}" class="btnAdd">+</button>
//        `;

//        product.appendChild(card);
        
//    })

//}

//renderProduct();

//product.addEventListener('click', (e) => {
//    if(e.target.classList.contains('btnAdd')) {
//        let card = e.target.closest('.card');
//        let id = card.id;
//        let img = card.querySelector('.imgCard').src;
//        let title = card.querySelector('.title').textContent;
//        let prices = card.querySelector('.price').textContent;
//        let priceNumb = parseInt(prices.replace(/\s/g, ''), 10);
//        let cart = {id, img, title, priceNumb, quantity: 1};
//        const cardStorege = localStorage.getItem('carts') || '[]';
//        let carts = JSON.parse(cardStorege);
//        const existId = carts.findIndex((item) => item.id === id);
//        if(existId !== -1) {
//            alert('Такой товар уже добавлен!');
//        }else {
//            carts.push(cart);
//        }

//        localStorage.setItem('carts', JSON.stringify(carts));
//        countCart.textContent  = carts.length;
//    }

//})

//});

const btnProduct = document.querySelector('.btnProduct');
const moreDetaile = document.querySelector('.mpre-detaole');
const popupBg = document.querySelector('.popupBg');

btnProduct.addEventListener('click', () => {
    document.querySelector('.section-products').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
});

                    // Локальный вывод

const setCard = document.querySelectorAll('.card');
const cardStorege = JSON.parse(localStorage.getItem('carts')) || [];

setCard.forEach(item => {
    let id = item.id;
    const itsCard = JSON.parse(localStorage.getItem('carts') || '[]');
    const itsCards = itsCard.some(item => item.id === id);

    if(itsCards) {
        const btn = item.querySelector('.btnAdd');
        btn.classList.add('active');
    }

});

function render() {
    const cardStorege = localStorage.getItem('carts') || '[]';
    let carts = JSON.parse(cardStorege);
    let totalCart = carts.reduce((pre, item) => {
        return pre + item.quantity;
    },0)

    countCart.textContent = totalCart;
};

render();

product.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnAdd')) {
        const card = e.target.closest('.card');
        const id = card.id;
        const img = card.querySelector('.imgCard').src;
        const title = card.querySelector('.title').textContent;
        const prices = card.querySelector('.price').textContent;
        const priceNumb = parseInt(prices.replace(/\s/g, ''), 10);
        const btnAdd = card.querySelector('.btnAdd');
        const cart = {id, img, title, priceNumb, quantity: 1};
                    //   Animation-Card
        let cardAnim = document.createElement('div');
        cardAnim.setAttribute('class', 'cardAnim');
        let imgcardAnim = document.createElement('img');
        imgcardAnim.setAttribute('class', 'imgcardAnim');
        imgcardAnim.setAttribute('src', img);

        card.appendChild(cardAnim);
        cardAnim.appendChild(imgcardAnim);
    
        const cardStorege = localStorage.getItem('carts') || '[]';
        let carts = JSON.parse(cardStorege);
        const existId = carts.findIndex((item) => item.id === id);
        if(existId !== -1) {
            alert('Такой товар уже добавлен!');
            cardAnim.classList.add('active');
        }else {
            carts.push(cart);
            btnAdd.classList.add('active');
        }
        
        localStorage.setItem('carts', JSON.stringify(carts));
        render();

    }else if(e.target.classList.contains('imgCard')) {
        const cart = e.target.closest('.card');
        const img = cart.querySelector('.imgCard').src;
        const title = cart.querySelector('.title').textContent;
        const price = cart.querySelector('.price').textContent;
        
        const imgPopup = document.querySelector('.imgPopup');
        const titlePopup = document.querySelector('.titlePopup');
        const pricePopup = document.querySelector('.pricePopup');

        imgPopup.src = img;
        titlePopup.textContent = title;
        pricePopup.textContent = price;

        popupBg.classList.add('active');
        document.querySelector('html').classList.add('noscroll');
    }else if(e.target.classList.contains('mpre-detaole')) {
        const cardElement = e.target.closest('.card');
        const id = cardElement.id;
        const img = cardElement.querySelector('.imgCard').src;
        const imges1 = cardElement.querySelector('.imges1').src;
        const imges2 = cardElement.querySelector('.imges2').src;
        const imges3 = cardElement.querySelector('.imges3').src;
        const imges4 = cardElement.querySelector('.imges4').src;
        console.log(imges4);

        const title = cardElement.querySelector('.title').textContent;
        const price = cardElement.querySelector('.price').textContent;
        const priceNumber = parseInt(price.replace(/\s/g, ''),10);
        let moredetaile = {id, img, imges1, imges2, imges3, imges4, title, priceNumber, quantity: 1};
        localStorage.setItem('moredetaile', JSON.stringify(moredetaile));
        location.href = 'moredetaile.html';
    }

});

document.querySelector('.btClosed').addEventListener('click', () => {
    popupBg.classList.remove('active');
    document.querySelector('html').classList.remove('noscroll');
});
