import { NgModule } from '@angular/core';
import { SlugifyPipe } from './slugify.pipe';

@NgModule({
  declarations: [SlugifyPipe],
  exports: [SlugifyPipe],
  providers: [SlugifyPipe],
})
export class SharedModule {}
