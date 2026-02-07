
import { Component, ChangeDetectionStrategy, signal, computed, OnInit, OnDestroy, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  name: string;
  icon: string;
  filledIcon?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  navItems = signal<NavItem[]>([
    { name: 'Overview', icon: 'grid_view' },
    { name: 'Live Logs', icon: 'terminal', filledIcon: true },
    { name: 'History', icon: 'history' },
    { name: 'Nodes', icon: 'database' },
  ]);
  activeView = input.required<string>();
  navChange = output<string>();

  activeNavItem = computed(() => {
    const currentView = this.activeView();
    if (currentView === 'Logs') {
      return 'Live Logs';
    }
    return currentView;
  });

  cpuUsage = signal(22.5);
  memoryUsage = signal(6.6);
  totalMemory = signal(16);
  memoryUsagePercentage = computed(() => (this.memoryUsage() / this.totalMemory()) * 100);

  private intervalId: any;

  ngOnInit() {
    console.log('SidebarComponent Initialized');
    this.intervalId = setInterval(() => {
      this.cpuUsage.update(val => {
        const change = (Math.random() - 0.5) * 2;
        const newVal = val + change;
        return Math.max(0, Math.min(100, parseFloat(newVal.toFixed(1))));
      });
       this.memoryUsage.update(val => {
        const change = (Math.random() - 0.5) * 0.2;
        const newVal = val + change;
        return Math.max(0, Math.min(this.totalMemory(), parseFloat(newVal.toFixed(2))));
      });
    }, 2000);
  }

  ngOnDestroy() {
    console.log('SidebarComponent Destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  setActive(item: string) {
    if (item === 'Overview') {
      this.navChange.emit('Dashboard');
    } else {
      this.navChange.emit(item);
    }
  }
}