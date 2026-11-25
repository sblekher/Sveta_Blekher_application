import { createHash } from 'node:crypto';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import net from 'node:net';

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const expectedOrigin = 'https://github.com/sblekher/Sveta_Blekher_application.git';
const git = (root, ...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

function run(command, args, root = projectRoot) {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} exited with ${result.status}`);
}

export function assertCleanRepo(root) {
  if (git(root, 'status', '--porcelain').length) {
    throw new Error('Sync stopped: local changes exist. Preserve and review them first. No stash, reset, or overwrite was performed.');
  }
}

export function assertExpectedOrigin(root) {
  if (git(root, 'remote', 'get-url', 'origin') !== expectedOrigin) {
    throw new Error('Unexpected origin. Stop and inspect the repository before synchronization.');
  }
}

function setup() {
  if (Number(process.versions.node.split('.')[0]) !== 24) throw new Error('Use Node 24 for this project (see .nvmrc).');
  const npmVersion = execFileSync('npm', ['--version'], { encoding: 'utf8' }).trim();
  if (npmVersion.split('.')[0] !== '11') throw new Error('Use npm 11 with Node 24.');
  const fingerprint = createHash('sha256')
    .update(readFileSync(resolve(projectRoot, 'package.json')))
    .update(readFileSync(resolve(projectRoot, 'package-lock.json')))
    .update(`${process.platform}:${process.arch}:24:${npmVersion}`)
    .digest('hex');
  const stamp = resolve(projectRoot, '.local-runtime/dependencies.sha256');
  const toolsPresent = ['typescript/bin/tsc', 'vite/bin/vite.js'].every(p => existsSync(resolve(projectRoot, 'node_modules', p)));
  if (toolsPresent && existsSync(stamp) && readFileSync(stamp, 'utf8').trim() === fingerprint) {
    console.log('Dependencies are ready. Reusing this installation.');
    return;
  }
  run('npm', ['ci', '--no-audit', '--no-fund']);
  mkdirSync(dirname(stamp), { recursive: true });
  writeFileSync(stamp, fingerprint + '\n');
  console.log('Locked dependencies installed and recorded for reuse.');
}

function sync() {
  assertCleanRepo(projectRoot);
  assertExpectedOrigin(projectRoot);
  const branch = git(projectRoot, 'branch', '--show-current');
  if (!branch) throw new Error('Detached checkout. Stop and choose a branch before syncing.');
  run('git', ['fetch', 'origin']);
  // Never auto-stash, merge divergent histories, rebase, or force-update files.
  run('git', ['merge', '--ff-only', 'origin/main']);
  setup();
  console.log(`Synchronized ${branch} safely with origin/main. Nothing was pushed.`);
}

async function dev() {
  setup();
  const occupied = await new Promise((done, reject) => {
    const server = net.createServer();
    server.once('error', error => error.code === 'EADDRINUSE' ? done(true) : reject(error));
    server.listen(3000, '127.0.0.1', () => server.close(() => done(false)));
  });
  if (occupied) {
    // Reuse only a server whose process cwd is this exact checkout.
    if (process.platform === 'darwin') {
      try {
        const pids = execFileSync('lsof', ['-nP', '-iTCP:3000', '-sTCP:LISTEN', '-t'], { encoding: 'utf8' }).trim().split('\n');
        const matches = pids.length > 0 && pids.every(pid =>
          execFileSync('lsof', ['-a', '-p', pid, '-d', 'cwd', '-Fn'], { encoding: 'utf8' }).split('\n').includes('n' + projectRoot));
        if (matches) {
          const response = await fetch('http://127.0.0.1:3000/', { signal: AbortSignal.timeout(3000) });
          const html = await response.text();
          if (!response.ok || !html.includes('<div id="root">')) throw new Error('Existing server failed its health check.');
          console.log('Existing healthy project server: http://127.0.0.1:3000/');
          return;
        }
      } catch { /* Report an occupied port instead of killing an unknown process. */ }
    }
    throw new Error('Port 3000 is occupied and could not be verified as a healthy project server. No process was stopped and no alternate port was selected.');
  }
  run(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '3000', '--strictPort']);
}

async function main() {
  const action = process.argv[2];
  if (action === 'setup') return setup();
  if (action === 'sync') return sync();
  if (action === 'dev') return dev();
  if (action === 'release') {
    assertCleanRepo(projectRoot);
    assertExpectedOrigin(projectRoot);
    run('npm', ['run', 'verify']);
    console.log('Release candidate:', git(projectRoot, 'rev-parse', 'HEAD'));
    console.log('Branch:', git(projectRoot, 'branch', '--show-current'));
    console.log('Destination:', expectedOrigin);
    console.log('STOP: obtain explicit user approval before pushing, merging, deploying, or changing Vercel settings.');
    console.log('This action only prepares a release. It never publishes.');
    return;
  }
  throw new Error('Choose setup, sync, dev, or release.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
