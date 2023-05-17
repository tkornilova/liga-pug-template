import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

export const initIntroAnimation = () => {
  const intro = document.querySelector('.intro');

  if (!intro) {
    return;
  }

  ScrollTrigger.create({
    trigger: intro,
    start: 'top top',
    pin: true,
    pinSpacing: false,
    fastScrollEnd: true,
    preventOverlaps: true,
  });
};
