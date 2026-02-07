
import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LiveLogsComponent } from './components/live-logs/live-logs.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ControlCenterComponent } from './components/control-center/control-center.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LiveLogsComponent,
    DashboardComponent,
    ControlCenterComponent
  ]
})
export class AppComponent implements OnInit {
  activeView = signal('Live Logs');

  ngOnInit() {
    console.log('AppComponent Initialized');
  }

  onNavChange(view: string) {
    console.log(`[AppComponent] Navigation change from '${this.activeView()}' to '${view}'`);
    this.activeView.set(view);
  }
}