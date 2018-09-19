const btnmenu =document.querySelector('.btn-menu');
const menu =document.querySelector('.menu')

btnmenu.addEventListener('click',function() {
    menu.classList.toggle('menu-toggle');
    this.classList.toggle('close');
});

