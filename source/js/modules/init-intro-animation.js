import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

const intro = document.querySelector('.intro');

const initIntroAnimation = () => {
  if (!intro) {
    return;
  }

  gsap.utils.toArray('.intro').forEach((panel, _i) => {
    ScrollTrigger.create({
      trigger: panel,
      start: 'top top',
      pin: true,
      pinSpacing: false,
      fastScrollEnd: true,
      preventOverlaps: true,
    });
  });
};
