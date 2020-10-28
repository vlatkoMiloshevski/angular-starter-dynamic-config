import { Injectable } from '@angular/core';
import { DynamicComponent } from '../dynamic-module-loader/dynamic.component';
import { AboutYouComponent } from './about-you/about-you.component';
import { FeesAndCancelationComponent } from './fees-and-cancelation/fees-and-cancelation.component';
import { YourCarComponent } from './your-car/your-carcomponent';

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
            new DynamicComponent(AboutYouComponent),
            new DynamicComponent(FeesAndCancelationComponent),
            new DynamicComponent(YourCarComponent),
        ];
    }
}

class SWbrand implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(YourCarComponent),
        ];
    }
}

class FAbrand implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(AboutYouComponent),
            new DynamicComponent(FeesAndCancelationComponent),
        ];
    }
}
