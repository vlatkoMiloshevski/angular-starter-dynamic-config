import { Injectable } from '@angular/core';
import { DynamicComponent } from '../../dynamic-module-loader/dynamic.component';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';
import { WhatsCoveredComponent } from './whats-covered/whats-covered.component';
import { QuickCheckComponent } from './quick-check/quick-check.component';

@Injectable()
export class LandingService {
    getData() {
        const strategy = getStrategy(window['esure-env'].HOME_LANDING_STRATEGY);
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
            new DynamicComponent(QuickCheckComponent),
        ];
    }
}

class Strategy2 implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(QuickCheckComponent),
            new DynamicComponent(WhatsCoveredComponent),
        ];
    }
}

class Strategy3 implements LandingStrategy {
    getComponents() {
        return [
            new DynamicComponent(QuickCheckComponent),
            new DynamicComponent(KeepingYouInformedComponent),
            new DynamicComponent(WhatsCoveredComponent),
        ];
    }
}
