function toggleTheme(){
  // Light theme by default; function kept for compatibility
  document.body.classList.toggle('alt');
}

function toggleMenu(){
  document.getElementById('nav').classList.toggle('open');
}

function fakeSend(e){
  e.preventDefault();
  const formMsg = document.getElementById('form-msg');
  if(formMsg){ formMsg.textContent = 'Сообщение отправлено (демо).'; }
  return false;
}

// Checklist persistence
(function initChecklist(){
  const list = document.getElementById('checklist');
  if(!list) return;
  const boxes = list.querySelectorAll('input[type="checkbox"]');
  boxes.forEach(box => {
    const key = 'checklist:' + box.dataset.key;
    const saved = localStorage.getItem(key);
    if(saved === '1'){ box.checked = true; }
    box.addEventListener('change', () => {
      localStorage.setItem(key, box.checked ? '1' : '0');
      updateProgress();
    });
  });
  updateProgress();
})();

function updateProgress(){
  const list = document.getElementById('checklist');
  if(!list) return;
  const boxes = list.querySelectorAll('input[type="checkbox"]');
  const done = Array.from(boxes).filter(b => b.checked).length;
  const total = boxes.length;
  const el = document.getElementById('progress');
  if(el) el.textContent = `${done}/${total}`;
}
