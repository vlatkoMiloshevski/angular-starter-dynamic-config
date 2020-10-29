
export class NavigationService {
    constructor() { }
    getRoutes() {
        const strategy = getStrategy(window['esure-env'].NAVIGATION_STRATEGY);
        const navigationContext = new NavigationContext(strategy);
        return navigationContext.routes;
    }
}

const getStrategy = (strategyType): NavigationStrategy => {
    let strategyInstance;

    switch (strategyType) {
        case '1':
            strategyInstance = new Strategy1();
            break;
        case '2':
            strategyInstance = new Strategy2();
            break;
        case '3':
            strategyInstance = new Strategy3();
            break;
    }

    return strategyInstance;
};

class NavigationContext {
    routes;
    constructor(private navigationStrategy: NavigationStrategy) {
        this.routes = navigationStrategy.getRoutes();
    }
}

interface NavigationStrategy {
    getRoutes();
}

class Strategy1 implements NavigationStrategy {
    getRoutes() {
        return [
            {
                path: '',
                loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule),
                data: { preload: true },
            },
            {
                path: 'review',
                loadChildren: () => import('../review/review.module').then(m => m.ReviewModule),
                data: { preload: true },
            },
        ];
    }
}

class Strategy2 implements NavigationStrategy {
    getRoutes() {
        return [
            {
                path: '',
                loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule),
                data: { preload: true },
            },
            {
                path: 'review',
                loadChildren: () => import('../review/review.module').then(m => m.ReviewModule),
                data: { preload: true },
            },
            {
                path: 'payment',
                loadChildren: () => import('../payment/payment.module').then(m => m.PaymentModule),
                data: { preload: true },
            },
        ];
    }
}

class Strategy3 implements NavigationStrategy {
    getRoutes() {
        return [
            {
                path: '',
                loadChildren: () => import('../landing/landing.module').then(m => m.LandingModule),
                data: { preload: true },
            },
            {
                path: 'payment',
                loadChildren: () => import('../payment/payment.module').then(m => m.PaymentModule),
                data: { preload: true },
            },
        ];
    }
}
