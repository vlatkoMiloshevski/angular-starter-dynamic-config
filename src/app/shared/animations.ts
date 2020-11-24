import { trigger, animate, style, query, transition, animateChild, state } from '@angular/animations';

const halfASecondFadeTiming = '.5s ease-in-out';

export const fadeIn = trigger('fadeIn', [
    transition('* => *', [
        query('*', style({ opacity: 0 }), { optional: true }),
        query(
            '*', [
            animate('.6s 100ms ease-out', style({ opacity: 1 })),
        ],
            { optional: true }),
    ]),
]);

export const fadeInOnly = trigger('fadeInOnly', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s 100ms ease-in', style({ opacity: 1 })),
    ]),
]);

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(halfASecondFadeTiming, style({ opacity: 1 })),
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate(halfASecondFadeTiming, style({ opacity: 0 })),
    ]),
]);

export const drawerSlide = trigger('drawerSlide', [
    transition(':enter', [
        style({ right: '-100%' }),
        animate(halfASecondFadeTiming, style({ right: 0 })),
    ]),
    transition(':leave', [
        query('@slideUpDown', animateChild(), { optional: true }),
        animate(halfASecondFadeTiming, style({ right: '-100%' })),
    ]),
]);

export const menuSlide = trigger('menuSlide', [
    transition(':enter', [
        style({ left: '-100%' }),
        animate('.8s ease-in-out', style({ left: 0 })),
    ]),
    transition(':leave', [
        animate('.8s ease-in-out', style({ left: '-100%' })),
    ]),
]);

export const accordionToggle = trigger('slideUpDown', [
    state('false', style({ 'height': '0' })),
    state('true', style({ 'height': '*' })),
    transition('false <=> true', animate('700ms ease-in-out')),
    transition(':leave', [
        style({ 'height': '*' }),
        animate('700ms ease-in-out', style({ height: '0' })),
    ]),
]);

