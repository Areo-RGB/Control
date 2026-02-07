
import { Component, ChangeDetectionStrategy, signal, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LogEntry, LogLevel } from '../../types';

@Component({
  selector: 'app-live-logs',
  imports: [CommonModule, DatePipe],
  templateUrl: './live-logs.component.html',
  styleUrls: ['./live-logs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveLogsComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('logContainer') private logContainer!: ElementRef;

  logs = signal<LogEntry[]>([]);
  isPaused = signal(false);
  throughput = signal(141);
  storage = signal(82.62);

  private intervalId: any;
  private shouldScrollDown = true;

  private mockMessages = [
    { level: 'INFO', msg: '[Process: AuthProvider] User session validated for ID: <span class="text-cyan-400">USR-88219</span>. Latency: <span class="text-primary">12ms</span>' },
    { level: 'WARN', msg: '[Node: EU-West-1] Elevated memory consumption detected on instance <span class="text-yellow-400">i-04f2x7</span>. Threshold: 85%' },
    { level: 'ERROR', msg: '[DB: Postgres-Primary] Connection refused at port 5432. Retrying in 5 seconds...', details: { raw: 'at lib/postgres.js:144:22 <br/> at internal/process/task_queues.js:97:5' } },
    { level: 'INFO', msg: '[Queue: TaskRunner] Completed scheduled maintenance task <span class="text-cyan-400">CLN_OLD_RECORDS</span> successfully.' },
    { level: 'INFO', msg: '[API: Gateway] New client handshake initiated. Remote addr: <span class="text-cyan-400">192.168.1.44</span>' },
    { level: 'DEBUG', msg: '[DEBUG] Payload received from client.'},
  ];

  ngOnInit() {
    console.log('LiveLogsComponent Initialized');
    this.logs.set([
        { timestamp: new Date(Date.now() - 11000), level: 'INFO', message: '[Process: AuthProvider] User session validated for ID: <span class="text-cyan-400">USR-88219</span>. Latency: <span class="text-primary">12ms</span>' },
        { timestamp: new Date(Date.now() - 9341), level: 'WARN', message: '[Node: EU-West-1] Elevated memory consumption detected on instance <span class="text-yellow-400">i-04f2x7</span>. Threshold: 85%' },
        { timestamp: new Date(Date.now() - 7629), level: 'ERROR', message: '[DB: Postgres-Primary] Connection refused at port 5432. Retrying in 5 seconds...', details: { raw: 'at lib/postgres.js:144:22 <br/> at internal/process/task_queues.js:97:5' } },
        { timestamp: new Date(Date.now() - 4449), level: 'INFO', message: '[Queue: TaskRunner] Completed scheduled maintenance task <span class="text-cyan-400">CLN_OLD_RECORDS</span> successfully.' },
        { timestamp: new Date(Date.now() - 1035), level: 'INFO', message: '[API: Gateway] New client handshake initiated. Remote addr: <span class="text-cyan-400">192.168.1.44</span>' },
    ]);

    this.startLogStream();
  }
  
  ngAfterViewChecked() {
    if (this.shouldScrollDown) {
      this.scrollToBottom();
      this.shouldScrollDown = false;
    }
  }

  startLogStream() {
     this.intervalId = setInterval(() => {
      if (this.isPaused()) return;

      const randomEntry = this.mockMessages[Math.floor(Math.random() * this.mockMessages.length)];
      if (randomEntry.level === 'DEBUG') return; // skip debug for this view

      this.logs.update(currentLogs => {
        const newLogs = [...currentLogs, {
          timestamp: new Date(),
          level: randomEntry.level as LogLevel,
          message: randomEntry.msg,
          details: randomEntry.details
        }];
        if (newLogs.length > 100) {
            return newLogs.slice(newLogs.length - 100);
        }
        return newLogs;
      });

      this.throughput.update(t => Math.max(20, Math.min(300, t + Math.floor(Math.random() * 20) - 10)));
      this.storage.update(s => parseFloat((s + Math.random() * 0.01).toFixed(2)));
      this.shouldScrollDown = true;

    }, 1500 + Math.random() * 1000);
  }

  getLogLevelClasses(level: LogLevel): string {
    switch (level) {
      case 'INFO':
        return 'bg-primary text-white';
      case 'WARN':
        return 'bg-yellow-500 text-white';
      case 'ERROR':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  getLogHoverBorderClass(level: LogLevel): string {
    switch(level) {
      case 'INFO': return 'hover:border-primary';
      case 'WARN': return 'hover:border-yellow-500';
      case 'ERROR': return 'hover:border-red-500';
      default: return 'hover:border-gray-500';
    }
  }
  
  togglePause() {
    this.isPaused.update(p => !p);
  }

  clearLogs() {
    this.logs.set([]);
  }

  private scrollToBottom(): void {
    try {
      this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnDestroy() {
    console.log('LiveLogsComponent Destroyed');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}