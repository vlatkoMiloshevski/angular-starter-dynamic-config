
export class NavigationService {
    constructor() {
        if (window.location.hash) {
            window.sessionStorage.setItem('insuranceType', window.location.hash);
        }
        if (!window.sessionStorage.getItem('insuranceType')) {
            const insuranceType = window.location.hash || window['esure-env'].DEFAULT_INSURANCE_TYPE;
            window.sessionStorage.setItem('insuranceType', insuranceType);
        }
    }

    getRoutes() {
        const strategy = getStrategy(window.sessionStorage.getItem('insuranceType'));
        const navigationContext = new NavigationContext(strategy);
        return navigationContext.routes;
    }
}

const getStrategy = (strategyType): NavigationStrategy => {
    let strategyInstance;

    switch (strategyType) {
        case '#home':
            strategyInstance = new HomeStrategy();
            break;
        case '#car':
            strategyInstance = new MotorStrategy();
            break;
        case '#multicar':
            strategyInstance = new MulticarStrategy();
            break;
        default:
            strategyInstance = new HomeStrategy();
            break;
    }
    window.location.hash = '';
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

class HomeStrategy implements NavigationStrategy {
    getRoutes() {
        return [
            {
                path: '',
                loadChildren: () => import('../home/landing/landing.module').then(m => m.LandingModule),
            },
            {
                path: 'review',
                loadChildren: () => import('../home/review/review.module').then(m => m.ReviewModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('../home/payment/payment.module').then(m => m.PaymentModule),
            },
            {
                path: 'showcase',
                loadChildren: () => import('../showcase/showcase.module').then(m => m.ShowcaseModule),
            },
        ];
    }
}

class MotorStrategy implements NavigationStrategy {
    getRoutes() {
        return [
            {
                path: '',
                loadChildren: () => import('../motor/landing/landing.module').then(m => m.LandingModule),
            },
            {
                path: 'review',
                loadChildren: () => import('../motor/review/review.module').then(m => m.ReviewModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('../motor/payment/payment.module').then(m => m.PaymentModule),
            },
        ];
    }
}

class MulticarStrategy implements NavigationStrategy {
    getRoutes() {
        return [
            {
                path: '',
                loadChildren: () => import('../multicar/landing/landing.module').then(m => m.LandingModule),
            },
            {
                path: 'review',
                loadChildren: () => import('../multicar/review/review.module').then(m => m.ReviewModule),
            },
            {
                path: 'payment',
                loadChildren: () => import('../multicar/payment/payment.module').then(m => m.PaymentModule),
            },
        ];
    }
}
