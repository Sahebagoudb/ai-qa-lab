const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const model = process.env.OLLAMA_MODEL || 'qwen2.5-coder:7b';
const outputPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, '..', 'qa-plans', 'login-qa-plan-ollama.md');

const prompt = `You are a senior QA automation architect.

Given this feature requirement, produce:
1. Risk areas
2. Positive test cases
3. Negative test cases
4. Boundary cases
5. API checks
6. Visual checks
7. Accessibility checks
8. Playwright automation candidates
9. Required test data
10. Priority order for automation

Return the output as a PR-ready QA plan.

Feature requirement:
- User login with email and password on the Moniic Admin Portal.
- The flow includes an email field, a proceed button, CAPTCHA detection, OTP verification, and dashboard access.
- The solution must support accessibility, visual reliability, API validation, and automation stability.
`;

console.log(`Using Ollama model: ${model}`);
console.log(`Generating QA plan and saving to: ${outputPath}`);

const result = spawnSync('ollama', ['run', model, prompt, '--hidethinking', '--keepalive', '5m', '--nowordwrap'], {
  encoding: 'utf8',
  timeout: 600000,
});

if (result.error) {
  console.error('Ollama execution failed:', result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error('Ollama returned non-zero exit code:', result.status);
  console.error('stderr:', result.stderr);
  process.exit(1);
}

function cleanOutput(text) {
  return text
    .replace(/\x1b\[[0-9;]*[A-Za-z]/g, '')
    .replace(/\x08/g, '')
    .replace(/\x1b\([A-Za-z]/g, '')
    .replace(/\x1b\][0-9;]*.*?\x07/g, '');
}

const output = cleanOutput(result.stdout.trim());

if (!output) {
  console.error('Ollama returned empty output.');
  process.exit(1);
}

fs.writeFileSync(outputPath, output, 'utf8');
console.log('QA plan generated successfully.');
