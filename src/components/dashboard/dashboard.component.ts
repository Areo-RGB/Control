
import { Component, ChangeDetectionStrategy, input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="p-8 text-text-muted flex items-center justify-center h-full">
      <div class="text-center">
        <span class="material-symbols-outlined text-6xl text-text-dim">space_dashboard</span>
        <h1 class="text-2xl font-bold text-white mt-4">{{ viewName() }}</h1>
        <p>This is a placeholder for the {{ viewName() }} view.</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  viewName = input.required<string>();

  ngOnInit() {
    console.log(`DashboardComponent Initialized for view: ${this.viewName()}`);
  }

  ngOnDestroy() {
    console.log(`DashboardComponent Destroyed (was view: ${this.viewName()})`);
  }
}