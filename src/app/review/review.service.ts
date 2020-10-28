import { Injectable } from '@angular/core';
import { DynamicComponent } from '../dynamic-module-loader/dynamic.component';
import { KeepingYouInformedComponent } from './keeping-you-informed/keeping-you-informed.component';
import { WhatsCoveredComponent } from './whats-covered/whats-covered.component';
import { QuickCheckComponent } from './quick-check/quick-check.component';

@Injectable()
export class ReviewService {
    getData() {
        const brand = getBrand('ES');
        const reviewContext = new ReviewContext(brand);
        return reviewContext.components;
    }
}

const getBrand = (brand): ReviewStrategy => {
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

class ReviewContext {
    components;
    constructor(private reviewStrategy: ReviewStrategy) {
        this.components = reviewStrategy.getComponents();
    }
}

interface ReviewStrategy {
    getComponents();
}

class ESbrand implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(QuickCheckComponent),
            new DynamicComponent(WhatsCoveredComponent),
            new DynamicComponent(KeepingYouInformedComponent),
        ];
    }
}

class SWbrand implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(WhatsCoveredComponent),
        ];
    }
}

class FAbrand implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(WhatsCoveredComponent),
            new DynamicComponent(KeepingYouInformedComponent),
        ];
    }
}
