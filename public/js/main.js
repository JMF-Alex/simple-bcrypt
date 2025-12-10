document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('encrypt-form');
  const textInput = document.getElementById('text');
  const resultSection = document.getElementById('result');
  const hashOutput = document.getElementById('hash-output');
  const copyBtn = document.getElementById('copy-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const text = textInput.value.trim();
    if (!text) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Encrypting...';

    try {
      const response = await fetch('/api/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error('Encryption failed');
      }

      const data = await response.json();
      hashOutput.textContent = data.hash;
      resultSection.classList.remove('hidden');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Encrypt';
    }
  });

  copyBtn.addEventListener('click', async () => {
    const hash = hashOutput.textContent;
    
    try {
      await navigator.clipboard.writeText(hash);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    } catch {
      alert('Failed to copy to clipboard');
    }
  });
});
