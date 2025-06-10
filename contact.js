const cardStorege = JSON.parse(localStorage.getItem('carts')) || [];

function renderCountCart() {
    let totalCart = cardStorege.reduce((pre, item) => {
        return pre + item.quantity;
    },0)
    document.querySelector('.countCart').textContent = totalCart;
};

renderCountCart();

const callback = function(entires, observer) {
          entires.forEach(enti => {
            if(enti.isIntersecting) {
                enti.target.classList.add('active');
            }
          })
};

const observer = new IntersectionObserver(callback);

const targets = document.querySelectorAll('.anim'); 
targets.forEach(targ => {
    observer.observe(targ);
});

const textMoreinfo = document.querySelector('.text-moreinfo');
const info = document.querySelector('.info');

textMoreinfo.addEventListener('click', () => {
    info.classList.toggle('active');
});
