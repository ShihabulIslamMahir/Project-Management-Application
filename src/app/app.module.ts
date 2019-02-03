import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SharedModule} from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplateModule } from './template/template.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { EmployeeService } from './employees/services/employee.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FlexLayoutModule,
    TemplateModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
   
    
    
  ],
  providers: [EmployeeService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
