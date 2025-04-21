export class Timer {
  private timerId: NodeJS.Timeout | null = null;
  private start: number = 0;
  private remaining: number;

  constructor(private callback: () => void, delay: number) {
    this.remaining = delay;
    this.resume();
  }

  pause() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
      this.remaining -= Date.now() - this.start;
    }
  }

  resume() {
    if (this.timerId) {
      return;
    }

    this.start = Date.now();
    this.timerId = setTimeout(this.callback, this.remaining);
  }
}
