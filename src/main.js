document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. ГЛОБАЛЬНЫЕ НАСТРОЙКИ
     ========================================= */

  // Инициализация иконок Lucide
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // Плавный скролл (Lenis)
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* =========================================
     2. МОБИЛЬНОЕ МЕНЮ
     ========================================= */
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const burgerLines = document.querySelectorAll('.burger__line');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          nav.classList.toggle('active');
          const isActive = nav.classList.contains('active');

          if (isActive) {
              burgerLines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
              burgerLines[1].style.opacity = '0';
              burgerLines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
              document.body.style.overflow = 'hidden';
          } else {
              burgerLines[0].style.transform = 'none';
              burgerLines[1].style.opacity = '1';
              burgerLines[2].style.transform = 'none';
              document.body.style.overflow = '';
          }
      });

      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              nav.classList.remove('active');
              burgerLines[0].style.transform = 'none';
              burgerLines[1].style.opacity = '1';
              burgerLines[2].style.transform = 'none';
              document.body.style.overflow = '';
          });
      });
  }

  // Обновление года
  const yearSpan = document.querySelector('.footer__bottom p');
  if (yearSpan) {
      const currentYear = new Date().getFullYear();
      if (!yearSpan.innerHTML.includes(currentYear)) {
           yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
      }
  }

  /* =========================================
     3. GSAP ANIMATIONS (SCROLL TRIGGER)
     ========================================= */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Timeline
      const heroTl = gsap.timeline();
      if(document.querySelector('.hero')) {
          heroTl.from('.hero__badge', { y: 20, autoAlpha: 0, duration: 0.8, ease: 'power3.out' })
              .from('.hero__title', { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.6')
              .from('.hero__subtitle', { y: 30, autoAlpha: 0, duration: 0.8 }, '-=0.6')
              .from('.hero__actions', { y: 20, autoAlpha: 0, duration: 0.8 }, '-=0.6')
              .from('.hero__stats', { autoAlpha: 0, duration: 1 }, '-=0.4')
              .from('.hero__visual', { x: 50, autoAlpha: 0, duration: 1, ease: 'back.out(1.7)' }, '-=0.8');
      }

      // Заголовки
      gsap.utils.toArray('.section-title').forEach(title => {
          gsap.from(title, {
              scrollTrigger: {
                  trigger: title,
                  start: "top 90%",
                  toggleActions: "play none none none"
              },
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power2.out"
          });
      });

      // Платформа (Steps)
      ScrollTrigger.batch(".step-card", {
          start: "top 85%",
          onEnter: batch => gsap.from(batch, {
              autoAlpha: 0,
              y: 50,
              stagger: 0.15,
              duration: 0.8,
              ease: "power2.out",
              overwrite: true
          })
      });

      // Преимущества
      ScrollTrigger.batch(".feature-card", {
          start: "top 85%",
          onEnter: batch => gsap.from(batch, {
              autoAlpha: 0,
              y: 30,
              stagger: 0.1,
              duration: 0.6,
              overwrite: true
          })
      });

      // Блог
      ScrollTrigger.batch(".blog-card", {
          start: "top 85%",
          onEnter: batch => gsap.from(batch, {
              autoAlpha: 0,
              y: 40,
              stagger: 0.15,
              duration: 0.8,
              overwrite: true
          })
      });

      window.addEventListener("load", () => ScrollTrigger.refresh());
  }

  /* =========================================
     4. ИНТЕРАКТИВ HERO (3D TILT & TYPEIT)
     ========================================= */
  const heroSection = document.querySelector('.hero');
  const chatCard = document.getElementById('chat-card');

  if (heroSection && chatCard) {
      heroSection.addEventListener('mousemove', (e) => {
          const x = (window.innerWidth - e.pageX * 2) / 70;
          const y = (window.innerHeight - e.pageY * 2) / 70;
          chatCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      });

      heroSection.addEventListener('mouseleave', () => {
          chatCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
          chatCard.style.transition = 'transform 0.6s ease';
      });

      heroSection.addEventListener('mouseenter', () => {
          chatCard.style.transition = 'none';
      });
  }

  if (typeof TypeIt !== 'undefined' && document.getElementById('typeit-element')) {
      new TypeIt("#typeit-element", {
          speed: 50,
          startDelay: 2000,
          waitUntilVisible: true,
          lifeLike: true,
          cursor: true
      })
      .type("Я проанализировал ваш проект.")
      .pause(500)
      .break()
      .type("Внедрение AI увеличит прибыль на <strong>35%</strong>.")
      .pause(700)
      .break()
      .type("Начинаем интеграцию?")
      .go();
  }

  /* =========================================
     5. SLIDER (SWIPER)
     ========================================= */
  if (typeof Swiper !== 'undefined' && document.querySelector('.cases-slider')) {
      new Swiper('.cases-slider', {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          speed: 800,
          pagination: { el: '.swiper-pagination', clickable: true },
          breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
          },
          autoplay: { delay: 4000, disableOnInteraction: false }
      });
  }

  /* =========================================
     6. KONTAKT FORM LOGIC
     ========================================= */
  const form = document.getElementById('lead-form');

  if (form) {
      const phoneInput = document.getElementById('phone');
      const captchaLabel = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha');
      const submitBtn = form.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('success-msg');

      // 6.1 Генерация капчи (Мат. пример)
      let captchaResult = 0;
      function generateCaptcha() {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          captchaResult = a + b;
          captchaLabel.textContent = `${a} + ${b}`;
          captchaInput.value = ''; // Очистка поля
      }
      generateCaptcha();

      // 6.2 Валидация телефона (Только цифры, +, пробелы, скобки)
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9+\s()-]/g, '');
      });

      // 6.3 Обработка отправки
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          let isValid = true;

          // Сброс ошибок
          form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

          // Проверка полей (простая)
          const requiredInputs = form.querySelectorAll('input[required]');
          requiredInputs.forEach(input => {
              if (!input.value.trim()) {
                  input.classList.add('error');
                  isValid = false;
              }
          });

          // Проверка капчи
          if (parseInt(captchaInput.value) !== captchaResult) {
              captchaInput.classList.add('error');
              isValid = false;
          }

          if (!isValid) return;

          // Имитация отправки (AJAX)
          submitBtn.classList.add('loading');
          submitBtn.disabled = true;

          setTimeout(() => {
              // Успех
              submitBtn.classList.remove('loading');
              submitBtn.disabled = false;
              form.reset();
              generateCaptcha(); // Новая капча

              // Показываем сообщение
              successMsg.style.display = 'flex';

              // Скрываем через 5 секунд
              setTimeout(() => {
                  successMsg.style.display = 'none';
              }, 5000);

          }, 2000); // 2 секунды задержка
      });
  }
});