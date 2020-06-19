export interface ProgressBarOptions {
  total: number;
  width: number;
  completedChar: string;
  incompletedChar: string;
  headChar: string;
}

const defaults = {
  total: 100,
  width: 30,
  completedChar: '=',
  incompletedChar: '-',
  headChar: '=',
};

export class ProgressBar {
  private readonly _options: ProgressBarOptions;
  private _current = 0;

  constructor(private readonly _format: string, options: Partial<ProgressBarOptions>) {
    this._options = { ...defaults, ...options };
  }

  public update(percentage: number, customTokens?: Record<string, string>): string {
    const { total } = this._options;
    const goal = Math.floor(percentage * total);
    const delta = goal - this._current;
    return this.tick(delta, customTokens);
  }

  public tick(delta: number, customTokens?: Record<string, string>): string {
    if (delta === 0) {
      return this.render(customTokens);
    }

    this._current += delta;
    return this.render(customTokens);
  }

  private render(customTokens?: Record<string, string>): string {
    const { total, width, completedChar, incompletedChar, headChar } = this._options;
    const progress = Math.min(Math.max(this._current / total), 1);
    const percentage = Math.floor(progress * 100);

    const completedLength = Math.round(width * progress);
    const completedChars = Array(completedLength + 1).fill(completedChar);
    const incompletedChars = Array(width - completedLength + 1).fill(incompletedChar);

    if (completedLength > 0 && completedLength !== width) {
      // Add head character
      completedChars[completedChars.length - 1] = headChar;
    }

    // Populate bar template
    let output = this._format
      .replace(':current', String(this._current))
      .replace(':total', String(total))
      .replace(':percent', `${percentage.toFixed(0)}%`)
      .replace(':bar', completedChars.join() + incompletedChars.join());

    // Replace customTokens
    if (customTokens != null) {
      Object.keys(customTokens).forEach((token) => {
        const value = customTokens[token];
        output = output.replace(`:${token}`, value);
      });
    }

    return output;
  }
}
