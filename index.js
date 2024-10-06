fetch('products.json')
    .then(response => response.json())
    .then(data => {
        const swiperWrapper = document.getElementById('swiper-wrapper');
        const swiperThumbs = document.getElementById('swiper-thumbs');

        data.forEach((product, index) => {
            // Створення HTML для кожного товару
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.style.background = product.background;

            slide.innerHTML = `

                <nav>
                    <a href="#" class="active">Men</a>
                    <a href="#"> Women </a>
                    <a href="#"> Customise </a>
                    <a href="#" style="margin-left: auto;"> <i class="ri-search-line"></i> Search </a>
                    <a href="#"> My Account </a>
                    <a href="#"> <i class="ri-shopping-bag-fill"></i> </a>
                </nav>
  
  
                <h2>${product.title}</h2>
                <div class="info">
                  <p>${product.season}</p>
                  <span>${product.description}</span>
                  <p>${product.collection}</p>
                  <span>${product.features}</span>
                </div>
                <div class="pricing">
                  <p>Color:</p>
                  <span>${product.color}</span>
                  <h3>${product.price}</h3>
                  <div class="btn-block">
                    <button class="light-btn">Buy Now</button>
                    <button class="btn">Add To Cart</button>
                  </div>
                </div>

                <img src="${product.image}" alt="${index}" class="main-img" style="opacity: 0;"> 
                
                <div class="scroll">Scroll Down <i class="ri-arrow-down-s-line"></i></div>
                <div class="social"><a href="#">IN</a> <a href="#">FB</a> <a href="#">TW</a></div>
               
            `;

            swiperWrapper.appendChild(slide);

            // Створення мініатюр для слайдера
            const thumb = document.createElement('li');
            thumb.classList.add('swiper-slide');
            thumb.style.background = product.background;
            thumb.innerHTML = `<img src="${product.image}" alt="Thumbnail ${index + 1}">`;
            swiperThumbs.appendChild(thumb);
        });

        // Ініціалізація Swiper
        const swiper = new Swiper('.swiper', {
            loop: true,
            spaceBetween: 0,
            mousewheel: true,
            speed: 1200,
            effect: 'coverflow',
            direction: 'vertical',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 10,
                modifier: 1,
                slideShadows: true,
            },
            thumbs: {
                swiper: {
                    el: '.swiper-thumbs',
                    slidesPerView: 2,
                    spaceBetween: 0,
                }
            },
            on: {
                slideChangeTransitionStart: function () {
                    // Відміняємо попередні анімації для активних елементів
                    gsap.killTweensOf('.swiper-slide-active h2, .info p, .info span, .pricing p, .pricing span, .pricing h3, .btn-block, .main-img, .swiper-thumbs');

                    // Отримуємо активний слайд і елементи для анімації
                    const activeSlide = document.querySelector('.swiper-slide-active');

                    if (activeSlide) {
                        const title = activeSlide.querySelector('h2');
                        const info = activeSlide.querySelectorAll('.info p, .info span');
                        const pricing = activeSlide.querySelectorAll('.pricing p, .pricing span, .pricing h3, .btn-block');
                        const img = activeSlide.querySelector('.main-img');
                        const thumbs = document.querySelector('.swiper-thumbs');

                        // Анімація для активного слайду
                        gsap.fromTo(title, {x: -500, opacity: 0}, {x: -200, opacity: 1, duration: 1, delay: 0.5});
                        gsap.fromTo(info, {y: 10, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1, delay: 0.5});
                        gsap.fromTo(pricing, {y: 10, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1, delay: 0.5});
                        gsap.fromTo(img, {y: 50, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.5});
                        gsap.fromTo(thumbs, {y: 20, opacity: 0}, {y: 0, opacity: 1, delay: 0.9});
                    }
                },
                slideChangeTransitionEnd: function() {
                    // Очищуємо GSAP анімації після завершення переходу
                    gsap.killTweensOf('.swiper-slide-active h2, .info p, .info span, .pricing p, .pricing span, .pricing h3, .btn-block, .main-img, .swiper-thumbs');
                }
            }
        });

        // Початкова анімація для першого слайду
        gsap.fromTo('.swiper-slide-active h2', {x: -500, y: '40vh', opacity: 0}, {x: -200, opacity: 1, duration: 1, delay: 0.5});
        gsap.fromTo('.swiper-slide-active .info p, .swiper-slide-active .info span', {y: 10, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1, delay: 0.5});
        gsap.fromTo('.swiper-slide-active .pricing p, .swiper-slide-active .pricing span, .swiper-slide-active .pricing h3, .swiper-slide-active .btn-block', {y: 10, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1, delay: 0.5});
        gsap.fromTo('.swiper-slide-active .main-img', {y: 100, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 1});
        gsap.fromTo('.swiper-thumbs', {y: 20, opacity: 0}, {y: 0, opacity: 1, delay: 0.5});
    })
    .catch(error => console.error('Error loading products:', error));
