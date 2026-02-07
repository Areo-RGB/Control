
import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  currentTime = signal(new Date());
  latency = signal(42);
  private intervalId: any;

  ngOnInit(): void {
    console.log('FooterComponent Initialized');
    this.intervalId = setInterval(() => {
      this.currentTime.set(new Date());
      this.latency.update(val => {
        const change = Math.floor((Math.random() - 0.4) * 10);
        return Math.max(15, val + change);
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    console.log('FooterComponent Destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}