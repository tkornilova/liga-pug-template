import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

export const initParalaxAnimation = () => {
  // Паралакс блоков вверх и вниз
  const paralaxBottom = document.querySelector('[data-paralax-direction="bottom"]');
  const paralaxTop = document.querySelector('[data-paralax-direction="top"]');

  gsap.to(paralaxBottom, {
    yPercent: 25,
    ease: 'none',
    scrollTrigger: {
      trigger: paralaxBottom,
      scrub: true,
    },
  });

  gsap.to(paralaxTop, {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: paralaxTop,
      scrub: true,
    },
  });

  // Паралакс с увеличением
  const paralaxScale = document.querySelectorAll('[data-paralax="scale"]');

  ScrollTrigger.batch(paralaxScale, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.5)',
        stagger: 0.5,
      });
    },
    onLeaveBack: (batch) => {
      gsap.to(batch, {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        ease: 'back.out(1.5)',
      });
    },
    start: 'top center',
    end: 'bottom center',
  });
};
