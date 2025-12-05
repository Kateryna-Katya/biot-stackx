document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. ГЛОБАЛЬНЫЕ НАСТРОЙКИ (Lenis & Icons)
     ========================================= */

  // Инициализация иконок Lucide
  lucide.createIcons();

  // Плавный скролл (Lenis)
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      direction: 'vertical',
      smooth: true
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* =========================================
     2. МОБИЛЬНОЕ МЕНЮ (Burger)
     ========================================= */
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const burgerLines = document.querySelectorAll('.burger__line');

  if (burger && nav) {
      burger.addEventListener('click', () => {
          nav.classList.toggle('active');
          const isActive = nav.classList.contains('active');

          // Анимация иконки бургера
          if (isActive) {
              burgerLines[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
              burgerLines[1].style.opacity = '0';
              burgerLines[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
              document.body.style.overflow = 'hidden'; // Блокируем скролл
          } else {
              burgerLines[0].style.transform = 'none';
              burgerLines[1].style.opacity = '1';
              burgerLines[2].style.transform = 'none';
              document.body.style.overflow = '';
          }
      });

      // Закрытие меню при клике на ссылку
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

  /* =========================================
     3. ОБНОВЛЕНИЕ ГОДА В ФУТЕРЕ
     ========================================= */
  const yearSpan = document.querySelector('.footer__bottom p');
  if (yearSpan) {
      const currentYear = new Date().getFullYear();
      // Меняем 2025 на текущий год, если он изменится в будущем
      if (!yearSpan.innerHTML.includes(currentYear)) {
           yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
      }
  }

  /* =========================================
     4. HERO SECTION: GSAP АНИМАЦИИ
     ========================================= */
  // Проверяем, существует ли библиотека GSAP и секция Hero
  if (typeof gsap !== 'undefined' && document.querySelector('.hero')) {

      const tl = gsap.timeline();

      tl.from('.hero__badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero__title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__actions', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__stats', { opacity: 0, duration: 1 }, '-=0.4')
        .from('.hero__visual', { x: 50, opacity: 0, duration: 1, ease: 'back.out(1.7)' }, '-=0.8');
  }

  /* =========================================
     5. HERO SECTION: 3D TILT EFFECT
     ========================================= */
  const heroSection = document.querySelector('.hero');
  const chatCard = document.getElementById('chat-card');

  if (heroSection && chatCard) {
      // Эффект параллакса при движении мыши
      heroSection.addEventListener('mousemove', (e) => {
          const x = (window.innerWidth - e.pageX * 2) / 50;
          const y = (window.innerHeight - e.pageY * 2) / 50;

          chatCard.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
      });

      // Сброс при уходе мыши
      heroSection.addEventListener('mouseleave', () => {
          chatCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
          chatCard.style.transition = 'transform 0.5s ease';
      });

      // Убираем плавность при входе, чтобы реакция была мгновенной
      heroSection.addEventListener('mouseenter', () => {
          chatCard.style.transition = 'none';
      });
  }

  /* =========================================
     6. HERO SECTION: TYPEIT (ПЕЧАТАЮЩИЙ ТЕКСТ)
     ========================================= */
  if (typeof TypeIt !== 'undefined' && document.getElementById('typeit-element')) {
      new TypeIt("#typeit-element", {
          speed: 50,
          startDelay: 2500, // Задержка перед стартом (ждем окончания анимации GSAP)
          waitUntilVisible: true,
          lifeLike: true,
          cursor: true
      })
      .type("Я проанализировал ваш проект.")
      .pause(500)
      .break()
      .type("Внедрение AI-бота увеличит конверсию на <strong>35%</strong>.")
      .pause(700)
      .break()
      .type("Начинаем интеграцию?")
      .go();
  }

});