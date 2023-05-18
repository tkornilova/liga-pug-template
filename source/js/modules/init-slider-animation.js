import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

export const initSliderAnimation = () => {
  const slides = document.querySelectorAll('.slider__item');

  if (!slides) {
    return;
  }

  slides.forEach((slide, _i) => {
    ScrollTrigger.create({
      trigger: slide,
      start: 'top top',
      pin: true,
      pinSpacing: false,
      fastScrollEnd: true,
      preventOverlaps: true,
    });
  });
};
