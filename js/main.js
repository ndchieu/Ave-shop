window.onload = () => {
    const navigation = {
        init: function() {
            this.fixedMenu();
            this.openCloseMenu();
            this.openSubMenu()
        },
        fixedMenu: function() {
            window.addEventListener("scroll", () => {
                const nav = document.querySelector(".nav");
                if (window.scrollY > 0) {
                    nav.classList.add("active");
                } else {
                    nav.classList.remove("active")
                }
            })
        },
        // tạo hiệu ứng scroll
        openCloseMenu: function() {
            const btnHambeger = document.querySelector(".button__hambeger");
            const navMenu = document.querySelector(".nav__menu");
            btnHambeger.addEventListener("click", () => {
                navMenu.classList.toggle("active");
            })
        },
        //đóng mở menu reponsive
        openSubMenu: function() {
            const btnSubMenu = document.querySelectorAll('.menu__item');

            btnSubMenu.forEach(btn => btn.addEventListener('click', (e) => {
                const menu = document.querySelectorAll('.js-menu');
                menu.forEach(item => item.classList.remove('active'));
                // tìm từng phần tử có thằng js--menu và xóa class active đi

                const self = e.target.parentNode; //tìm phần tử cha của phần tử được click
                const selfMenu = self.querySelector('.js-menu');

                selfMenu.classList.add('active');
            }))
        },
    }
    navigation.init();

    const banner = {
        init: function() {
            this.effect();
        },
        effect: function() {
            const item = document.querySelectorAll(".wrap span")
            let count = 0

            function auto() {
                count++
                count %= item.length
                item.forEach(i => i.classList.remove('active'))
                item[count].classList.add("active")
            }
            setInterval(auto, 2500)
        }
    }
    banner.init();

    const collection = {
        init: function() {
            this.hover1();
            this.hover2();
            this.slide()
        },
        hover1: function() {
            const link = document.querySelectorAll(".item__coll");

            aniLink = function(e) {
                    const thisLink = this;
                    var x = e.offsetX;
                    var y = e.offsetY;
                    var width = this.offsetWidth;
                    var height = this.offsetHeight;

                    move = 15;
                    xMove = x / width * move - move;
                    yMove = y / height * move - move;
                    thisLink.style.transform = "translate(" + xMove + "px," + yMove + "px)";
                    if (e.type === "mouseleave") {
                        thisLink.style.transform = "";
                    }
                },
                link.forEach(a => a.addEventListener("mousemove", aniLink));
            link.forEach(a => a.addEventListener("mouseleave", aniLink));
        },
        hover2: function() {
            const subLink = document.querySelectorAll(".right-item__coll .slide__item");
            aniSubLink = function(e) {
                    const thisSubLink = this; //lấy div hiện tại là right-item__coll .slide__item
                    var x = e.offsetX; // sét tọa độ x hiện tại của nó
                    var y = e.offsetY; // sét tọa độ y hiện tại của nó 
                    var width = this.offsetWidth; // sét chiều dài hiện tại của nó 
                    var height = this.offsetHeight; // sét chiều rộng hiện tải của nó
                    move = 15; // set tốc độ
                    xMove = x / width * move - move;
                    yMove = y / height * move + 1 - move;
                    thisSubLink.style.transform = "translate(" + xMove + "px," + yMove + "px)";
                    if (e.type === "mouseleave") {
                        thisSubLink.style.transform = "";
                    }
                },
                subLink.forEach(a => a.addEventListener("mousemove", aniSubLink));
            subLink.forEach(a => a.addEventListener("mouseleave", aniSubLink));
        },
        slide: function() {
                const slideButton = document.querySelectorAll('.slide__button');
                const slide = document.querySelector('.slide__items');
                const item = document.querySelectorAll('.slide__item');

                const size = item[0].offsetWidth; //lấy chiều rộng của mỗi phần tử

                slideButton.forEach(btn => btn.addEventListener('click', (e) => {
                    const self = e.target.parentNode; // lấy phần tử cha được click
                    slideButton.forEach(item => item.classList.remove('active'));
                    self.classList.add('active');
                    let index = self.dataset.count;
                    slide.style.transform = `translateX(${-size * index}px)`;
                    console.log(slideButton)
                }))
            } // Slide Collection
    }
    collection.init();
    const coWork = {
        init: function() {
            this.slide(".coWork")
        },
        slide: function(e) {
            const grabSlide = document.querySelector(e);
            const wrap = document.querySelector(".wrap__coW");
            const items = document.querySelectorAll(".item__coW");

            let isDown = false;
            let startX;
            let scrollLeft;
            let size = items[0].offsetWidth; //lấy chiều rộng của mỗi phần tử 
            function slideItem() {
                index = Math.round(wrap.scrollLeft / size);
                wrap.style.scrollBehavior = "smooth";
                wrap.scrollLeft = size * index;
            }
            wrap.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - wrap.offsetLeft; //this value will take x at first
                scrollLeft = wrap.scrollLeft; //this value will take scroll left at first
                wrap.style.scrollBehavior = 'unset';
            })
            wrap.addEventListener('mouseleave', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mouseup', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                //transfrom slide by grab and move left right
                const x = e.pageX - wrap.offsetLeft;
                const walk = x - startX;
                wrap.scrollLeft = scrollLeft - walk;
            })
        }

    }
    coWork.init();
    const footer = {
        init: function() {
            this.slide();
        },
        slide: function() {
            const slider = document.querySelector(".slider__items");
            const item = document.querySelectorAll(".slider__item");
            const prev = document.getElementById("prev");
            const next = document.getElementById("next");
            let count = 0;
            let size = item[0].offsetWidth;
            next.addEventListener('click', () => {
                if (count >= item.length - 1) {
                    return;
                };
                slider.style.transition = 'all 0.5s ease-in-out';
                count++;
                slider.style.transform = `translateX(${-size * count}px)`;
            });
            prev.addEventListener('click', () => {
                if (count <= 0) return;
                slider.style.transition = 'all 0.5s ease-in-out';
                count--;
                slider.style.transform = `translateX(${-size * count}px)`;
            });
        }
    }
    footer.init();
}