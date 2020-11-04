import { Injectable } from '@angular/core';
import { AboutYouComponent } from 'src/app/core/review/about-you/about-you.component';
import { FeesAndCancelationComponent } from 'src/app/core/review/fees-and-cancelation/fees-and-cancelation.component';
import { YourCarComponent } from 'src/app/core/review/your-car/your-car.component';
import { DynamicComponent } from '../../dynamic-module-loader/dynamic.component';

@Injectable()
export class ReviewService {
    getData() {
        const strategy = getStrategy(window['esure-env'].MOTOR_REVIEW_STRATEGY);
        const reviewContext = new ReviewContext(strategy);
        return reviewContext.components;
    }
}

const getStrategy = (strategyType): ReviewStrategy => {
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

class ReviewContext {
    components;
    constructor(private reviewStrategy: ReviewStrategy) {
        this.components = reviewStrategy.getComponents();
    }
}

interface ReviewStrategy {
    getComponents();
}

class Strategy1 implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(AboutYouComponent),
        ];
    }
}

class Strategy2 implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(AboutYouComponent),
            new DynamicComponent(FeesAndCancelationComponent),
        ];
    }
}

class Strategy3 implements ReviewStrategy {
    getComponents() {
        return [
            new DynamicComponent(AboutYouComponent),
            new DynamicComponent(YourCarComponent),
            new DynamicComponent(FeesAndCancelationComponent),
        ];
    }
}
