/*
  IQ Labyrinth — script.js
  Dark Red / INTJ logic for the step-by-step quiz.
  - Expects questions.js to provide: easyQuestions, mediumQuestions, hardQuestions
  - Works with index.html DOM (single DOM, update by classes/text)
  - Saves nickname to localStorage, supports i18n (en / uz / ru)
  - Functions exported/defined as requested
*/

/* =======================
   Utility / State
   ======================= */
const APP = {
  state: {
    step: 1,
    nickname: '',
    lang: 'en',
    difficulty: 'easy',
    timerSec: 0,          // 0 = none
    questionCount: 10,    // number or 'endless'
    questions: [],        // current question pool
    currentIndex: 0,
    answeredCount: 0,
    correctCount: 0,
    timer: null,
    timerRemaining: 0,
    isEndless: false,
    isAnswered: false,
  },

  // i18n dictionary (keys correspond to data-i18n attributes used in index.html)
  i18n: {
    en: {
      brand: "IQ Labyrinth",
      tagline: "Minimal. Focused. Smart.",
      mode: "INTJ Mode",
      step1_title: "Welcome, strategist",
      step1_sub: "Enter a nickname to begin.",
      nickname_label: "Nickname",
      next: "Next",
      back: "Back",
      step2_title: "Choose language",
      step2_sub: "All UI will adapt to your choice.",
      step3_title: "Choose difficulty",
      step3_sub: "Easy / Medium / Hard — intelligence, measured.",
      step4_title: "Timer",
      step4_sub: "No timer or choose a challenge pace.",
      timer_none: "No timer",
      step5_title: "How many questions?",
      step5_sub: "Pick a testing length or go Endless.",
      endless: "Endless",
      endless_info: "Endless mode: questions continue until you stop — perfect for practice.",
      start: "Start Test",
      player_meta: "Ready",
      skip: "Skip",
      next_q: "Next",
      results_title: "Results",
      iq_label: "IQ Score",
      retry: "Retry",
      share: "Share",
      footer: "Built for focus — INTJ aesthetic.",
      noscript: "JavaScript is required for IQ Labyrinth to function. Please enable JavaScript.",
      motivate_1: "Tiny focus. Big clarity.",
      motivate_2: "Language shapes thought — pick one.",
      motivate_3: "Challenge chosen — optimize your approach.",
      motivate_4: "Time is a constraint — use it or not.",
      motivate_5: "Consistency beats speed. Keep steady.",
      motivate_result: "You optimized. Well done."
    },
    uz: {
      brand: "IQ Labyrinth",
      tagline: "Minimal. Fokuslangan. Aqlli.",
      mode: "INTJ Rejim",
      step1_title: "Xush kelibsiz, strateg",
      step1_sub: "Boshlash uchun nickname kiriting.",
      nickname_label: "Nickname",
      next: "Keyingi",
      back: "Orqaga",
      step2_title: "Tilni tanlang",
      step2_sub: "Barcha interfeys tanlangan tilga moslashadi.",
      step3_title: "Qiyinchilikni tanlang",
      step3_sub: "Oson / O'rtacha / Qiyin — aqlingizni sinang.",
      step4_title: "Vaqt",
      step4_sub: "Taymerni ishlatmaslik yoki sinov tezligini tanlash.",
      timer_none: "Taymer yo'q",
      step5_title: "Necha savol?",
      step5_sub: "Sinov uzunligini tanlang yoki Endless rejimga o'ting.",
      endless: "Cheksiz",
      endless_info: "Endless rejim: savollar to'xtamaguncha davom etadi — mashq uchun ideal.",
      start: "Testni boshlash",
      player_meta: "Tayyor",
      skip: "O'tkazish",
      next_q: "Keyingi",
      results_title: "Natijalar",
      iq_label: "IQ Ball",
      retry: "Qayta urinib ko'rish",
      share: "Ulashish",
      footer: "Diqqat uchun yaratilgan — INTJ estetika.",
      noscript: "IQ Labyrinth ishlashi uchun JavaScript kerak. Iltimos, JavaScriptni yoqing.",
      motivate_1: "Kichik fokus. Katta aniqlik.",
      motivate_2: "Til fikrni shakllantiradi — birini tanlang.",
      motivate_3: "Qiyinchilik tanlandi — uslubingizni optimallashtiring.",
      motivate_4: "Vaqt cheklov — foydalaning yoki yo'q.",
      motivate_5: "Tizimlilik tezlikdan ustun. Barqaror bo'ling.",
      motivate_result: "Siz optimallashtirdingiz. Zo'r natija."
    },
    ru: {
      brand: "IQ Labyrinth",
      tagline: "Минималистично. Сфокусировано. Умно.",
      mode: "Режим INTJ",
      step1_title: "Добро пожаловать, стратег",
      step1_sub: "Введите никнейм для начала.",
      nickname_label: "Никнейм",
      next: "Далее",
      back: "Назад",
      step2_title: "Выберите язык",
      step2_sub: "Весь интерфейс адаптируется под выбор.",
      step3_title: "Выберите сложность",
      step3_sub: "Легко / Средне / Сложно — проверьте интеллект.",
      step4_title: "Таймер",
      step4_sub: "Без таймера или выберите темп.",
      timer_none: "Без таймера",
      step5_title: "Сколько вопросов?",
      step5_sub: "Выберите длину теста или Endless.",
      endless: "Бесконечно",
      endless_info: "Endless режим: вопросы до тех пор, пока вы не остановитесь — отлично для практики.",
      start: "Начать тест",
      player_meta: "Готов",
      skip: "Пропустить",
      next_q: "Далее",
      results_title: "Результаты",
      iq_label: "IQ Оценка",
      retry: "Повторить",
      share: "Поделиться",
      footer: "Сделано для фокуса — эстетика INTJ.",
      noscript: "Для работы IQ Labyrinth требуется JavaScript. Пожалуйста, включите JavaScript.",
      motivate_1: "Маленький фокус. Большая ясность.",
      motivate_2: "Язык формирует мысль — выберите один.",
      motivate_3: "Вызов выбран — оптимизируйте подход.",
      motivate_4: "Время — ограничение. Используйте или нет.",
      motivate_5: "Постоянство лучше скорости. Держитесь.",
      motivate_result: "Вы оптимизировали. Отличная работа."
    }
  }
};

/* =======================
   DOM Queries (cached)
   ======================= */
const DOM = {
  app: document.getElementById('app'),
  steps: [...document.querySelectorAll('.step')],
  nicknameInput: document.getElementById('nickname'),
  playerNickname: document.getElementById('player-nickname'),
  playerMeta: document.getElementById('player-meta'),
  btnNextAll: [...document.querySelectorAll('.btn-next, .btn-start')],
  optionBtns: [...document.querySelectorAll('.option-btn')],
  answers: [...document.querySelectorAll('.answer-btn')],
  questionText: document.getElementById('question-text'),
  progressBar: document.getElementById('progress-bar'),
  progressCount: document.getElementById('progress-count'),
  progressPercent: document.getElementById('progress-percent'),
  timerEl: document.getElementById('timer'),
  testControls: document.querySelector('.test-controls'),
  btnSkip: document.querySelector('.btn-skip'),
  btnNextQuestion: document.querySelector('.btn-next-question'),
  resultsIQ: document.getElementById('iq-score'),
  resultsSummary: document.getElementById('results-summary'),
  btnRetry: document.querySelector('.btn-retry'),
  // i18n elements (any element with data-i18n attribute)
  i18nNodes: [...document.querySelectorAll('[data-i18n]')]
};

/* =======================
   Helper functions
   ======================= */
function _(key) {
  const lang = APP.state.lang || 'en';
  return (APP.i18n[lang] && APP.i18n[lang][key]) || (APP.i18n['en'][key] || key);
}
function q(selector, parent = document) { return parent.querySelector(selector); }
function qs(selector, parent = document) { return [...parent.querySelectorAll(selector)]; }
function shuffle(arr) {
  // Fisher-Yates
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function safeParseInt(val, fallback = 0) {
  const n = parseInt(val, 10);
  return Number.isNaN(n) ? fallback : n;
}

/* =======================
   Primary functions (entry points)
   ======================= */
function startApp() {
  // Load nickname from localStorage
  const stored = localStorage.getItem('iq_lab_nickname');
  if (stored) {
    APP.state.nickname = stored;
    if (DOM.nicknameInput) DOM.nicknameInput.value = stored;
    if (DOM.playerNickname) DOM.playerNickname.textContent = stored;
  }

  // Initialize i18n (render any static texts)
  applyI18n();

  // Attach event listeners for UI interactions
  attachUI();

  // Ensure correct initial step visible
  showStep(1);
}

function saveNickname(nick) {
  APP.state.nickname = (nick || '').trim().slice(0, 24);
  if (APP.state.nickname) {
    localStorage.setItem('iq_lab_nickname', APP.state.nickname);
    if (DOM.playerNickname) DOM.playerNickname.textContent = APP.state.nickname;
  }
}

function selectLanguage(lang) {
  if (!['en', 'uz', 'ru'].includes(lang)) return;
  APP.state.lang = lang;
  // update UI texts
  applyI18n();
}

function selectDifficulty(diff) {
  if (!['easy', 'medium', 'hard'].includes(diff)) return;
  APP.state.difficulty = diff;
}

function selectTimer(timerVal) {
  // timerVal can be 'none' or number as string
  if (timerVal === 'none' || timerVal === '0') {
    APP.state.timerSec = 0;
  } else {
    APP.state.timerSec = Math.max(0, safeParseInt(timerVal, 0));
  }
}

function selectQuestionCount(countVal) {
  if (countVal === 'endless') {
    APP.state.isEndless = true;
    APP.state.questionCount = 'endless';
  } else {
    APP.state.isEndless = false;
    APP.state.questionCount = Math.max(1, safeParseInt(countVal, 10));
  }
}

/* =======================
   Quiz lifecycle
   ======================= */
function startTest() {
  // Prepare questions pool based on difficulty
  const diff = APP.state.difficulty || 'easy';
  let pool = [];
  try {
    if (diff === 'easy' && typeof easyQuestions !== 'undefined') pool = easyQuestions.slice();
    if (diff === 'medium' && typeof mediumQuestions !== 'undefined') pool = mediumQuestions.slice();
    if (diff === 'hard' && typeof hardQuestions !== 'undefined') pool = hardQuestions.slice();
  } catch (e) {
    console.warn('questions.js arrays missing or error reading them.', e);
  }

  // Fallback: if pool empty, combine any available arrays
  if (!pool || pool.length === 0) {
    pool = [];
    if (typeof easyQuestions !== 'undefined') pool = pool.concat(easyQuestions);
    if (typeof mediumQuestions !== 'undefined') pool = pool.concat(mediumQuestions);
    if (typeof hardQuestions !== 'undefined') pool = pool.concat(hardQuestions);
  }

  // Shuffle pool & choose count
  pool = shuffle(pool || []);

  if (APP.state.isEndless) {
    // For endless we will keep pool and draw randomly each time (allow repeats across very long sessions)
    APP.state.questions = pool.length ? pool : generatePlaceholderQuestions();
  } else {
    const required = APP.state.questionCount || 10;
    // If not enough in pool, allow reuse by repeating shuffled pool segments
    if (pool.length >= required) {
      APP.state.questions = pool.slice(0, required);
    } else {
      const result = [];
      while (result.length < required) {
        result.push(...shuffle(pool));
        if (pool.length === 0) break; // avoid infinite loop
      }
      APP.state.questions = result.slice(0, required);
    }
  }

  // Reset stats
  APP.state.currentIndex = 0;
  APP.state.answeredCount = 0;
  APP.state.correctCount = 0;
  APP.state.isAnswered = false;

  // Update player UI
  if (DOM.playerNickname) DOM.playerNickname.textContent = APP.state.nickname || '—';
  if (DOM.playerMeta) DOM.playerMeta.textContent = _('player_meta');

  // Render first question
  showQuestion();
}

function showQuestion() {
  // Clear timer if any
  stopTimer();

  // For endless mode, choose a random question each time (non-destructive)
  let qData;
  if (APP.state.isEndless) {
    const pool = APP.state.questions;
    if (!pool || pool.length === 0) {
      qData = generatePlaceholderQuestions(1)[0];
    } else {
      qData = pool[Math.floor(Math.random() * pool.length)];
    }
  } else {
    qData = APP.state.questions[APP.state.currentIndex];
  }

  if (!qData) {
    // No questions loaded — show results
    showResult();
    return;
  }

  // Fill question text & answers
  if (DOM.questionText) DOM.questionText.textContent = qData.question || '—';
  // Expect qData.answers = array of choices, qData.correct = index of correct answer
  const answers = qData.answers || [];
  DOM.answers.forEach((btn, idx) => {
    const txt = answers[idx] !== undefined ? answers[idx] : '';
    btn.textContent = txt;
    btn.dataset.correct = (qData.correct === idx) ? 'true' : 'false';
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
    btn.setAttribute('aria-pressed', 'false');
  });

  // Reset controls visibility
  hideNextQuestionBtn();

  // Update progress (for non-endless show counts and percent)
  updateProgress();

  APP.state.isAnswered = false;

  // Start timer if defined
  if (APP.state.timerSec && APP.state.timerSec > 0) {
    startTimer(APP.state.timerSec);
  } else {
    DOM.timerEl && (DOM.timerEl.textContent = formatTime(0));
    DOM.timerEl && DOM.timerEl.classList.remove('counting');
  }
}

/* checkAnswer invoked when user clicks an answer */
function checkAnswer(selectedBtn) {
  if (APP.state.isAnswered) return; // prevent double answers
  APP.state.isAnswered = true;

  // Stop timer if running
  stopTimer();

  // Identify correct button
  const correctIndex = APP.state.isEndless
    ? (selectedBtn ? selectedBtn.dataset.correct === 'true' : false)
    : false; // placeholder; we'll actually check attributes below

  let chosenIndex = Number(selectedBtn?.dataset?.answerIndex ?? selectedBtn?.getAttribute('data-answer-index') ?? -1);

  // Mark buttons
  DOM.answers.forEach((btn) => {
    btn.disabled = true;
    const isCorrect = btn.dataset.correct === 'true';
    if (isCorrect) {
      btn.classList.add('correct');
    }
    // highlight wrong selection
    if (btn === selectedBtn && btn.dataset.correct !== 'true') {
      btn.classList.add('wrong');
    }
  });

  // Stats
  APP.state.answeredCount++;
  const selectedCorrect = selectedBtn && selectedBtn.dataset.correct === 'true';
  if (selectedCorrect) APP.state.correctCount++;

  // Update progress
  updateProgress();

  // Show next question button after 800ms delay (fade-in handled by CSS .visible with transition-delay)
  setTimeout(() => {
    showNextQuestionBtn();
  }, 0); // we will use the CSS transition-delay to show fade after 0.8s; but add class asap for animation timing
}

/* Called when user clicks Next (during steps) or Next Question during test */
function nextQuestion() {
  // If endless, just increment answered count and load next (index not used)
  if (APP.state.isEndless) {
    APP.state.currentIndex = (APP.state.currentIndex + 1); // just increment for stats
    showQuestion();
    return;
  }

  // Non-endless: move to next or finish
  if (APP.state.currentIndex + 1 < APP.state.questions.length) {
    APP.state.currentIndex++;
    showQuestion();
  } else {
    // Finished test
    showResult();
  }
}

/* Timer helpers */
function startTimer(seconds = 30) {
  stopTimer();
  APP.state.timerRemaining = seconds;
  updateTimerDisplay();
  DOM.timerEl && DOM.timerEl.classList.add('counting');

  APP.state.timer = setInterval(() => {
    APP.state.timerRemaining--;
    if (APP.state.timerRemaining < 0) {
      // Time's up: treat as unanswered (skip), reveal correct answer and show next
      stopTimer();
      handleTimeUp();
      return;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (APP.state.timer) {
    clearInterval(APP.state.timer);
    APP.state.timer = null;
  }
  DOM.timerEl && DOM.timerEl.classList.remove('counting');
}

function updateTimerDisplay() {
  if (!DOM.timerEl) return;
  DOM.timerEl.textContent = formatTime(APP.state.timerRemaining);
}

function formatTime(sec) {
  if (!sec || sec <= 0) return '00:00';
  const mm = Math.floor(sec / 60).toString().padStart(2, '0');
  const ss = (sec % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

function handleTimeUp() {
  // If user didn't answer, mark as answered and reveal correct (do not count as correct)
  APP.state.isAnswered = true;
  // reveal correct button
  DOM.answers.forEach((btn) => {
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    }
    btn.disabled = true;
  });

  APP.state.answeredCount++;
  updateProgress();

  // Show next button
  showNextQuestionBtn();
}

/* Progress & UI update */
function updateProgress() {
  const total = APP.state.isEndless ? (APP.state.questionCount === 'endless' ? '∞' : APP.state.questionCount) : APP.state.questions.length;
  const answered = APP.state.answeredCount;
  const percent = APP.state.isEndless ? null : Math.round((answered / (total || 1)) * 100);

  if (DOM.progressCount) {
    DOM.progressCount.textContent = APP.state.isEndless ? `${answered}/${total}` : `${answered}/${total}`;
  }
  if (DOM.progressPercent) {
    DOM.progressPercent.textContent = percent === null ? '—' : `${percent}%`;
  }
  if (DOM.progressBar) {
    const width = percent === null ? 0 : percent;
    DOM.progressBar.style.width = `${width}%`;
    DOM.progressBar.setAttribute('aria-valuenow', percent === null ? 0 : width);
  }
}

/* Results calculation & display */
function showResult() {
  stopTimer();

  // Calculate performance
  const correct = APP.state.correctCount;
  const total = APP.state.isEndless ? APP.state.answeredCount : (APP.state.questions.length || 1);
  const ratio = total ? (correct / total) : 0;

  // Estimate IQ:
  // base by difficulty, then add ratio-based offset
  const baseByDifficulty = { easy: 90, medium: 100, hard: 110 };
  const base = baseByDifficulty[APP.state.difficulty] || 100;
  const estimatedIQ = Math.round(base + (ratio - 0.5) * 40); // scale around base
  const clampedIQ = Math.max(60, Math.min(160, estimatedIQ));

  // Render results
  if (DOM.resultsIQ) DOM.resultsIQ.textContent = `${clampedIQ}`;
  if (DOM.resultsSummary) {
    DOM.resultsSummary.textContent =
      `${_('results_title')}: ${correct}/${total} — ${Math.round(ratio * 100)}% ` +
      `(${_('iq_label')}: ${clampedIQ})`;
  }

  // Show results step
  showStep(7);
}

/* Restart quiz */
function restartQuiz() {
  // Reset state but keep nickname and language
  APP.state.timer = null;
  APP.state.currentIndex = 0;
  APP.state.answeredCount = 0;
  APP.state.correctCount = 0;
  APP.state.isAnswered = false;
  APP.state.questions = [];
  APP.state.isEndless = false;
  APP.state.questionCount = 10;
  APP.state.timerSec = 0;
  APP.state.difficulty = 'easy';

  // Reset some UI
  if (DOM.nicknameInput) DOM.nicknameInput.value = APP.state.nickname || '';

  showStep(1);
}

/* =======================
   UI helpers & wiring
   ======================= */
function attachUI() {
  // Nickname input
  if (DOM.nicknameInput) {
    DOM.nicknameInput.addEventListener('input', (e) => {
      const v = e.target.value;
      if (v.trim().length > 0) {
        // enable Next in step 1
        enableNextInStep(1, true);
      } else {
        enableNextInStep(1, false);
      }
      // Save as user types (debounced lightly)
      saveNickname(v);
    });

    // pre-check enable
    if (DOM.nicknameInput.value && DOM.nicknameInput.value.trim().length > 0) {
      enableNextInStep(1, true);
    } else {
      enableNextInStep(1, false);
    }
  }

  // Generic next and prev for steps
  document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.btn-next, .btn-start');
    if (nextBtn && nextBtn.dataset && nextBtn.dataset.stepTarget) {
      const target = Number(nextBtn.dataset.stepTarget);
      // If starting test (step 6), prepare test
      if (target === 6) {
        // ensure we have saved selection states
        showStep(target);
        // start test after small delay to allow DOM to settle
        setTimeout(() => startTest(), 120);
      } else {
        showStep(target);
      }
      return;
    }

    const prevBtn = e.target.closest('.btn-prev');
    if (prevBtn && prevBtn.dataset && prevBtn.dataset.stepTarget) {
      const target = Number(prevBtn.dataset.stepTarget);
      showStep(target);
      return;
    }
  });

  // Option buttons (language, difficulty, timer, count)
  DOM.optionBtns.forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const b = ev.currentTarget;
      // Clear group siblings' active states (they are grouped by parent)
      const group = b.parentElement;
      if (group) {
        [...group.children].forEach(ch => {
          ch.classList.remove('active');
          ch.setAttribute('aria-pressed', 'false');
        });
      }
      b.classList.add('active');
      b.setAttribute('aria-pressed', 'true');

      // Handle specific data attributes
      if (b.dataset.lang) {
        selectLanguage(b.dataset.lang);
      }
      if (b.dataset.difficulty) {
        selectDifficulty(b.dataset.difficulty);
      }
      if (b.dataset.timer) {
        selectTimer(b.dataset.timer);
      }
      if (b.dataset.count) {
        selectQuestionCount(b.dataset.count);
      }

      // Enable next button in current step
      const stepEl = b.closest('.step');
      if (stepEl && stepEl.dataset && stepEl.dataset.step) {
        enableNextInStep(Number(stepEl.dataset.step), true);
      }
    });
  });

  // Answer buttons during test
  DOM.answers.forEach((btn, idx) => {
    // set a consistent attribute for easier access
    btn.setAttribute('data-answer-index', String(idx));
    btn.addEventListener('click', (ev) => {
      checkAnswer(ev.currentTarget);
    });
  });

  // Test control buttons: skip and next-question
  if (DOM.btnSkip) {
    DOM.btnSkip.addEventListener('click', () => {
      // immediate skip: reveal correct and mark as not-correct
      if (APP.state.isAnswered) return; // already handled
      handleTimeUp(); // time-up flow works like skip
    });
  }
  if (DOM.btnNextQuestion) {
    DOM.btnNextQuestion.addEventListener('click', () => {
      nextQuestion();
    });
  }

  // Retry
  if (DOM.btnRetry) {
    DOM.btnRetry.addEventListener('click', () => {
      restartQuiz();
    });
  }

  // Ensure any .btn-next in steps have initial visibility toggles according to data-delay (0.8s)
  // We will add .visible when step shown (in showStep)
}

/* Show/Hide Next in step control */
function enableNextInStep(stepNumber, enable = true) {
  const stepEl = document.querySelector(`.step[data-step="${stepNumber}"]`);
  if (!stepEl) return;
  const nextBtn = stepEl.querySelector('.btn-next, .btn-start');
  if (!nextBtn) return;
  if (enable) {
    nextBtn.removeAttribute('aria-disabled');
    // Add visible after delay: CSS has transition-delay set to 0.8s for .visible
    setTimeout(() => nextBtn.classList.add('visible'), 10);
  } else {
    nextBtn.setAttribute('aria-disabled', 'true');
    nextBtn.classList.remove('visible');
  }
}

/* Step navigation (only updates classes & text — single DOM) */
function showStep(stepNumber) {
  APP.state.step = Number(stepNumber);
  DOM.steps.forEach(s => {
    const num = Number(s.dataset.step);
    if (num === APP.state.step) {
      s.classList.add('step--active');
      s.setAttribute('aria-hidden', 'false');

      // Show next button with delay when entering a step (if it's enabled)
      const nextBtn = s.querySelector('.btn-next, .btn-start');
      if (nextBtn) {
        // If aria-disabled present and true, do not show
        const disabled = nextBtn.getAttribute('aria-disabled') === 'true';
        if (!disabled) {
          // Add visible; CSS transition includes the 0.8s
          nextBtn.classList.add('visible');
        } else {
          nextBtn.classList.remove('visible');
        }
      }

      // When arriving at step 6 (test), sync displayed nickname & player info
      if (num === 6) {
        if (DOM.playerNickname) DOM.playerNickname.textContent = APP.state.nickname || '—';
        if (DOM.playerMeta) DOM.playerMeta.textContent = _('player_meta');
      }

    } else {
      s.classList.remove('step--active');
      s.setAttribute('aria-hidden', 'true');
      const nextB = s.querySelector('.btn-next, .btn-start');
      if (nextB) nextB.classList.remove('visible');
    }
  });

  // If we moved into settings steps, ensure next buttons are enabled appropriately:
  if (APP.state.step === 2) {
    // language step: if something already selected, ensure next visible
    const selected = document.querySelector('.options--lang .option-btn.active');
    enableNextInStep(2, !!selected);
  }
  if (APP.state.step === 3) {
    const selected = document.querySelector('.options--difficulty .option-btn.active');
    enableNextInStep(3, !!selected);
  }
  if (APP.state.step === 4) {
    const selected = document.querySelector('.options--timer .option-btn.active');
    enableNextInStep(4, !!selected);
  }
  if (APP.state.step === 5) {
    const selected = document.querySelector('.options--count .option-btn.active');
    enableNextInStep(5, !!selected);
  }
}

/* Next question button visibility helpers (test controls) */
function showNextQuestionBtn() {
  if (!DOM.btnNextQuestion) return;
  DOM.btnNextQuestion.removeAttribute('aria-disabled');
  DOM.btnNextQuestion.classList.add('visible');
}

function hideNextQuestionBtn() {
  if (!DOM.btnNextQuestion) return;
  DOM.btnNextQuestion.setAttribute('aria-disabled', 'true');
  DOM.btnNextQuestion.classList.remove('visible');
}

/* i18n apply */
function applyI18n() {
  DOM.i18nNodes.forEach(node => {
    const key = node.dataset.i18n;
    if (!key) return;
    const text = _(key);
    // Only update text content for nodes that are not inputs/buttons with value attribute
    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
      node.placeholder = text;
    } else {
      node.textContent = text;
    }
  });
}

/* Fallback generator for placeholder questions (if questions.js missing) */
function generatePlaceholderQuestions(n = 10) {
  const placeholders = [];
  for (let i = 0; i < n; i++) {
    placeholders.push({
      question: `Placeholder question ${i + 1}`,
      answers: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: Math.floor(Math.random() * 4)
    });
  }
  return placeholders;
}

/* When the user navigates away / closes, save nickname (already saved on input) */
window.addEventListener('beforeunload', () => {
  if (APP.state.nickname) localStorage.setItem('iq_lab_nickname', APP.state.nickname);
});

/* DOMContentLoaded -> startApp */
document.addEventListener('DOMContentLoaded', () => {
  // small delay to allow CSS to settle & show initial next button if needed
  startApp();
});