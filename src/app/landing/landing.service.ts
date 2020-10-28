import { Injectable } from '@angular/core';
import { DynamicComponent } from '../dynamic-module-loader/dynamic.component';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';
import { WhatsCoveredComponent } from './whats-covered/whats-covered.component';
import { QuickCheckComponent } from './quick-check/quick-check.component';

@Injectable()
export class LandingService {
    getData() {
        const brand = getBrand('SW');
        const landingContext = new LandingContext(brand);
        return landingContext.components;
    }
}

const getBrand = (brand): LandingStrategy => {
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

class LandingContext {
    components;
    constructor(private landingStrategy: LandingStrategy) {
        this.components = landingStrategy.getComponents();
    }
}

interface LandingStrategy {
    getComponents();
}

class ESbrand implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(WhatsCoveredComponent),
            new DynamicComponent(KeepingYouInformedComponent),
        ];
    }
}

class SWbrand implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(QuickCheckComponent),
            new DynamicComponent(KeepingYouInformedComponent),
            new DynamicComponent(WhatsCoveredComponent),
        ];
    }
}

class FAbrand implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(WhatsCoveredComponent),
        ];
    }
}
