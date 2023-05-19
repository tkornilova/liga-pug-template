import {gsap} from '../vendor/gsap.min';
import {ScrollTrigger} from '../vendor/ScrollTrigger.min.js';

gsap.registerPlugin(ScrollTrigger);

export const initShowBlockAnimation = () => {
  const animals = document.querySelectorAll('[data-animation] img');

  if (!animals) {
    return;
  }

  ScrollTrigger.batch(animals, {
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.5)',
        stagger: 1,
      });
    },
  });
};
