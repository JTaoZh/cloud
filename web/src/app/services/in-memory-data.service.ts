import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Device } from '../bean/device'

export class InMemoryDataService implements InMemoryDbService{
    createDb(){
        const devices:Device[] = [
            {id:'000101', temp:21.32, humi:14.23, lon:113.362771, lat:23.168254},
            {id:'000201', temp:21.32, humi:14.23, lon:113.352961, lat:23.160181},
            
        ]
        return {devices}
    }
}