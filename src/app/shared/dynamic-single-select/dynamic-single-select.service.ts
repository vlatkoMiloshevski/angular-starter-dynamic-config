import { Injectable } from '@angular/core';
import { DynamicComponent } from 'src/app/shared/dynamic-module-loader/dynamic.component';
import { SelectedItemModel } from './dynamic-single-select.component';
import { SelectOptionStrategyComponent } from './strategy/select-option-stategy.component';
import { RadioButtonStrategyComponent } from './strategy/radio-button-strategy.component';
import { ButtonFieldStrategyComponent } from './strategy/button-field-strategy.component';


@Injectable()
export class DynamicSingleSelectService {
    getComponent(type: string, advancedList: SelectedItemModel[]) {
        const strategy = getStrategy(type);
        const dynamicSingleSelectContext = new DynamicSingleSelectContext(strategy, advancedList);
        return dynamicSingleSelectContext.component;
    }
}

const getStrategy = (strategyType: string): DynamicSingleSelectStrategy => {
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
        default:
            strategyInstance = new Strategy1();
            break;
    }

    return strategyInstance;
};

class DynamicSingleSelectContext {
    component;
    constructor(private dynamicSingleSelectStrategy: DynamicSingleSelectStrategy, advancedList: SelectedItemModel[]) {
        this.component = dynamicSingleSelectStrategy.getComponents(advancedList);
    }
}

interface DynamicSingleSelectStrategy {
    getComponents(advancedList: SelectedItemModel[]);
}

class Strategy1 implements DynamicSingleSelectStrategy {
    getComponents(advancedList: SelectedItemModel[]) {
        return new DynamicComponent(SelectOptionStrategyComponent, advancedList);
    }
}

class Strategy2 implements DynamicSingleSelectStrategy {
    getComponents(advancedList: SelectedItemModel[]) {
        return new DynamicComponent(RadioButtonStrategyComponent, advancedList);
    }
}

class Strategy3 implements DynamicSingleSelectStrategy {
    getComponents(advancedList: SelectedItemModel[]) {
        return new DynamicComponent(ButtonFieldStrategyComponent, advancedList);
    }
}

