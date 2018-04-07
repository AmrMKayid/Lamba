import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
// import {ProfileModule} from './app/modules/profile/profile.module';
// import {ResourcesModule} from './app/modules/resources/resources.module';
// import {ScheduleModule} from './app/modules/schedule/schedule.module';
// import {StoreModule} from './app/modules/store/store.module';
// import {MyitemsModule} from './app/modules/store/myitems/myitems.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
//
// platformBrowserDynamic().bootstrapModule(ProfileModule)
//   .catch(err => console.log(err));
//
// platformBrowserDynamic().bootstrapModule(ResourcesModule)
//   .catch(err => console.log(err));
//
// platformBrowserDynamic().bootstrapModule(ScheduleModule)
//   .catch(err => console.log(err));
//
// platformBrowserDynamic().bootstrapModule(StoreModule)
//   .catch(err => console.log(err));
//
// platformBrowserDynamic().bootstrapModule(MyitemsModule)
//   .catch(err => console.log(err));
