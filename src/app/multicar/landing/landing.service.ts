import { Injectable } from '@angular/core';
import { DynamicComponent } from '../../dynamic-module-loader/dynamic.component';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';

@Injectable()
export class LandingService {
    getData() {
        const strategy = getStrategy(window['esure-env'].MULTICAR_LANDING_STRATEGY);
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


