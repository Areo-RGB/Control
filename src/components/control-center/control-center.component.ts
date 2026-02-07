
import { Component, ChangeDetectionStrategy, signal, output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-control-center',
  imports: [CommonModule],
  templateUrl: './control-center.component.html',
  styleUrls: ['./control-center.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlCenterComponent implements OnInit, OnDestroy {
  navItems = signal(['OVERVIEW', 'LOGS', 'SECURITY', 'SETTINGS']);
  activeNavItem = signal('OVERVIEW');
  navChange = output<string>();

  ngOnInit() {
    console.log('ControlCenterComponent Initialized');
  }

  ngOnDestroy() {
    console.log('ControlCenterComponent Destroyed');
  }

  setActive(item: string) {
    if (item === 'LOGS') {
      this.navChange.emit('Logs');
    } else {
      this.activeNavItem.set(item);
    }
  }
}