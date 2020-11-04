import { Injectable } from '@angular/core';

@Injectable()
export class YourCarService {
    getInsuranceType(insuranceType) {
        switch (insuranceType) {
            case '#motor': return 'MOTOR';
            case '#home': return 'HOME';
            case '#multicar': return 'MULTICAR';
            default: return 'HOME';
        }
    }
}
