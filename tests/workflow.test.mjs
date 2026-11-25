import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { assertCleanRepo, assertExpectedOrigin } from '../scripts/workflow.mjs';
import { checkAssets } from '../scripts/check-assets.mjs';

test('sync rejects uncommitted work and leaves it unchanged', () => {
  const root = mkdtempSync(join(tmpdir(), 'cv-workflow-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    writeFileSync(join(root, 'user-work.txt'), 'Keep this exact content.');
    assert.throws(() => assertCleanRepo(root), /local changes exist/);
    assert.equal(readFileSync(join(root, 'user-work.txt'), 'utf8'), 'Keep this exact content.');
  } finally { rmSync(root, { recursive: true }); }
});

test('sync refuses the legacy or an unexpected repository', () => {
  const root = mkdtempSync(join(tmpdir(), 'cv-origin-'));
  try {
    execFileSync('git', ['init', '-q', root]);
    execFileSync('git', ['remote', 'add', 'origin', 'https://github.com/sblekher/elevenlabs-interactive-cv.git'], { cwd: root });
    assert.throws(() => assertExpectedOrigin(root), /Unexpected origin/);
  } finally { rmSync(root, { recursive: true }); }
});

test('asset check catches a referenced recording missing from the source', () => {
  const root = mkdtempSync(join(tmpdir(), 'cv-assets-'));
  try {
    mkdirSync(join(root, 'src')); mkdirSync(join(root, 'public'));
    writeFileSync(join(root, 'src/config.ts'), "export const audio = '/assets/missing.mp3';");
    assert.throws(() => checkAssets(root, false), /Missing referenced asset/);
    mkdirSync(join(root, 'public/assets'));
    writeFileSync(join(root, 'public/assets/missing.mp3'), 'fixture');
    assert.equal(checkAssets(root, false), 1);
  } finally { rmSync(root, { recursive: true }); }
});
