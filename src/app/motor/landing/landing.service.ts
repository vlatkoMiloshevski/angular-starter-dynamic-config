import { Injectable } from '@angular/core';
import { KeepingYouInformedComponent } from 'src/app/core/landing/keeping-you-informed/keeping-you-informed.component';
import { QuickCheckComponent } from 'src/app/core/landing/quick-check/quick-check.component';
import { WhatsCoveredComponent } from 'src/app/core/landing/whats-covered/whats-covered.component';
import { DynamicComponent } from 'src/app/shared/dynamic-module-loader/dynamic.component';

@Injectable()
export class LandingService {
    getData() {
        const strategy = getStrategy(window['esure-env'].CAR_LANDING_STRATEGY);
        const landingContext = new LandingContext(strategy);
        return landingContext.components;
    }
}

const getStrategy = (strategyType): LandingStrategy => {
    let brandInstance;

    switch (strategyType) {
        case '1':
            brandInstance = new Strategy1();
            break;
        case '2':
            brandInstance = new Strategy2();
            break;
        case '3':
            brandInstance = new Strategy3();
            break;
        default:
            brandInstance = new Strategy1();
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

class Strategy1 implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(KeepingYouInformedComponent),
        ];
    }
}

class Strategy2 implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(WhatsCoveredComponent),
            new DynamicComponent(KeepingYouInformedComponent),
        ];
    }
}

class Strategy3 implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(WhatsCoveredComponent),
            new DynamicComponent(QuickCheckComponent),
            new DynamicComponent(KeepingYouInformedComponent),
        ];
    }
}
