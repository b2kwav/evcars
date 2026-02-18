// Conventions de fichiers (adapter les chemins si nécessaire)
// combos: assets/images/combos/{shape}_{color}.webp
// engine: assets/images/engine/{engine}.webp
// options: assets/images/options/{opt}.webp

const form = document.getElementById('configForm');
const comboImg = document.getElementById('comboImg');
const comboWrap = document.getElementById('comboWrap');

const engineImg = document.getElementById('engineImg');
const engineWrap = document.getElementById('engineWrap');

const optionsWrap = document.getElementById('optionsWrap');
const fallbackMsg = document.getElementById('fallbackMsg');

function getSelectedRadio(name) {
  const r = form.querySelector(`input[name="${name}"]:checked`);
  return r ? r.value : '';
}
function getSelectedOptions() {
  return Array.from(form.querySelectorAll('input[name="opt"]:checked')).map(i => i.value);
}
function comboPath(shape, color) {
  return `../assets/images/combos/${shape}_${color}.webp`;
}
function enginePath(engine) {
  return `../assets/images/engine/${engine}.webp`;
}
function optionPath(opt) {
  return `../assets/images/options/${opt}.webp`;
}

function renderCombo() {
  const shape = getSelectedRadio('shape');
  const color = getSelectedRadio('color');
  const path = comboPath(shape, color);
  const alt = `${shape} — ${color}`;

  fallbackMsg.hidden = true;
  comboImg.removeAttribute('hidden');

  comboImg.alt = alt;
  comboImg.src = path;

  comboImg.onerror = () => {
    comboImg.src = '../assets/images/combos/default.webp';
  };
}

function renderEngine() {
  const engine = getSelectedRadio('engine');
  if (!engine) {
    engineWrap.hidden = true;
    return;
  }
  engineWrap.hidden = false;
  engineImg.alt = `Moteur ${engine}`;
  engineImg.src = enginePath(engine);
  engineImg.onerror = () => {
    engineImg.src = '../assets/images/engine/default.webp';
  };
}

function renderOptions() {
  const selected = getSelectedOptions();
  const count = selected.length;

  optionsWrap.innerHTML = '';

  if (count === 0) {
    optionsWrap.className = 'options-wrap count-0';
    optionsWrap.textContent = 'Aucune option sélectionnée.';
    return;
  }

  optionsWrap.className = `options-wrap count-${Math.min(count, 3)}`;

  selected.forEach((opt) => {
    const pic = document.createElement('picture');
    pic.className = 'option-item';

    const img = document.createElement('img');
    img.src = optionPath(opt);
    img.alt = opt;
    img.loading = 'lazy';
    img.onerror = () => { img.src = '../assets/images/options/default.webp'; };

    pic.appendChild(img);
    optionsWrap.appendChild(pic);
  });
}

function renderAll() {
  renderCombo();
  renderEngine();
  renderOptions();
}

form.addEventListener('change', renderAll);
renderAll();
