
import { Component, ChangeDetectionStrategy, signal, output, input, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  navItems = signal(['Dashboard', 'Logs', 'Metrics', 'Security']);
  activeView = input.required<string>();
  hasNotification = signal(true);
  navChange = output<string>();

  activeNavItem = computed(() => {
    const currentView = this.activeView();
    const logViews = ['Logs', 'Live Logs', 'History', 'Nodes'];
    if (logViews.includes(currentView)) {
        return 'Logs';
    }
    if (this.navItems().includes(currentView)) {
        return currentView;
    }
    return '';
  });

  ngOnInit() {
    console.log('HeaderComponent Initialized');
  }

  ngOnDestroy() {
    console.log('HeaderComponent Destroyed');
  }

  setActive(item: string) {
    this.navChange.emit(item);
  }
}