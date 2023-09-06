import cliSpinners from 'cli-spinners';

export const createLoading = (): NodeJS.Timer => {
  const spinner = cliSpinners.dots;
  let i = 0;
  const loadingId = setInterval(() => {
    process.stdout.write(`\r${spinner.frames[i]} Loading...`);
    i = ++i % spinner.frames.length;
  }, 200);
  return loadingId;
};

export const stopLoading = (loadingId: NodeJS.Timer): void => {
  clearInterval(loadingId);
  process.stdout.write('\r' + ' '.repeat(50) + '\r');
};
