import { Injectable } from '@angular/core';
import { roomExtensionsModel } from './Entities/ExtensionsModel/roomExtensions';
import { hotelExtensionsModel } from './Entities/ExtensionsModel/hotelExtensions';



@Injectable({
  providedIn: 'root' // Servisin tüm uygulamada kullanılabilir olması için root'a eklenir
})
export class ExtensionsRepository {
  
  roomExtensions: roomExtensionsModel[] = [
    { name: '100 Metrekare ferah oda', iconUrl: '/assets/img/roomEx/width.png' },
    { name: 'Ücretsiz Kahvaltı', iconUrl: '/assets/img/roomEx/breakfast.png' },
    { name: 'Ücretsiz Alacarte', iconUrl: '/assets/img/roomEx/dinner.png' },
    { name: 'Gelince Öde', iconUrl: '/assets/img/roomEx/tick.png' },
    { name: 'Ücretsiz Wifi', iconUrl: '/assets/img/roomEx/wifi.png' },
    { name: 'Ücretsiz Wifi 2 ', iconUrl: '/assets/img/roomEx/wifi.png' },
    { name: 'Ücretsiz Wifi 3', iconUrl: '/assets/img/roomEx/wifi.png' },
  ];

  hotelExtensions: hotelExtensionsModel[] = [
    { name: 'Kaliteli Hotel', iconUrl: '/assets/img/roomEx/width.png' },
    { name: 'Ücretsiz Yol', iconUrl: '/assets/img/roomEx/breakfast.png' },
    { name: 'Herşey dahil sistem', iconUrl: '/assets/img/roomEx/dinner.png' },
    { name: 'Gelince Öde', iconUrl: '/assets/img/roomEx/tick.png' },
    { name: 'Test 112321312', iconUrl: '/assets/img/roomEx/wifi.png' },
    { name: 'Test 112321312 ', iconUrl: '/assets/img/roomEx/wifi.png' },
    { name: 'Test 112321312', iconUrl: '/assets/img/roomEx/wifi.png' },
  ];

}