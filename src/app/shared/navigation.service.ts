
export class NavigationService {
    constructor() { }
    getRoutes() {
        const brand = getBrand('SW');
        const navigationContext = new NavigationContext(brand);
        return navigationContext.routes;
    }
}

const getBrand = (brand): NavigationStrategy => {
    let brandInstance;

    switch (brand) {
        case 'ES':
            brandInstance = new ESbrand();
            break;
        case 'SW':
            brandInstance = new SWbrand();
            break;
        case 'FA':
            brandInstance = new FAbrand();
            break;
    }

    return brandInstance;
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

class ESbrand implements NavigationStrategy {
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

class SWbrand implements NavigationStrategy {
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

class FAbrand implements NavigationStrategy {
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
