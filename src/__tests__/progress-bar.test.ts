import { ProgressBar } from '../progress-bar';

describe('ProgressBar', () => {
  it('throws an error if :bar is not present', () => {
    expect(() => new ProgressBar('')).toThrow('At least a :bar token is required.');
  });

  it('renders all the tokens', () => {
    const bar = new ProgressBar(':current :total :percent :bar');
    expect(bar.lastRender).toEqual('0 100 0% ------------------------------');
  });

  it('updates the bar correctly', () => {
    const bar = new ProgressBar(':current :total :percent :bar');
    expect(bar.update(0.5)).toEqual('50 100 50% ===============---------------');
  });

  it('can go back', () => {
    const bar = new ProgressBar(':current :total :percent :bar');
    expect(bar.update(0.25)).toEqual('25 100 25% ========----------------------');
  });

  it('renders custom tokens', () => {
    const bar = new ProgressBar(':hello :bar');
    expect(bar.update(0.5, { hello: 'world' })).toEqual('world ===============---------------');
  });

  it('updates according to a delta when ticking', () => {
    const bar = new ProgressBar(':current :total :percent :bar');
    bar.update(0.25);
    expect(bar.tick(25)).toEqual('50 100 50% ===============---------------');
  });

  it('throws an error when specifying an invalid percentage', () => {
    const bar = new ProgressBar(':current :total :percent :bar');
    expect(() => bar.update(2)).toThrow(/Invalid percentage/);
  });

  it('throws an error when specifying an invalid delta', () => {
    const bar = new ProgressBar(':current :total :percent :bar');
    expect(() => bar.tick(120)).toThrow(/Invalid delta/);
  });
});
