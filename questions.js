// questions.js
// IQ Labyrinth — savollar to'plami (Uzbek)
// Har bir savol obyekti quyidagi formatni o'z ichiga oladi:
// { q: "...", a: ["...","...","...","..."], c: correctIndex, question: "...", answers: [...], correct: index }

const easyQuestions = [
  {
    q: "1, 2, 3, 5, 8, ? — Keyingi raqam nima?",
    a: ["11", "12", "13", "14"],
    c: 2,
    question: "1, 2, 3, 5, 8, ? — Keyingi raqam nima?",
    answers: ["11", "12", "13", "14"],
    correct: 2,
  },
  {
    q: "Agar 'F' harfi '6' bo'lsa, 'C' nechiga teng?",
    a: ["3", "2", "6", "9"],
    c: 0,
    question: "Agar 'F' harfi '6' bo'lsa, 'C' nechiga teng?",
    answers: ["3", "2", "6", "9"],
    correct: 0,
  },
  {
    q: "Qaysi so'z boshqa uchidan farq qiladi: 'olma', 'olcha', 'olxo'?",
    a: ["olma", "olcha", "olxo", "barchasi bir xil"],
    c: 2,
    question: "Qaysi so'z boshqa uchidan farq qiladi: 'olma', 'olcha', 'olxo'?",
    answers: ["olma", "olcha", "olxo", "barchasi bir xil"],
    correct: 2,
  },
  {
    q: "4*3 = 12, 12/4 = 3. 9*2 = ?",
    a: ["18", "11", "9", "6"],
    c: 0,
    question: "4*3 = 12, 12/4 = 3. 9*2 = ?",
    answers: ["18", "11", "9", "6"],
    correct: 0,
  },
  {
    q: "Qator: 2, 4, 8, 16, ? — nima bo'ladi?",
    a: ["18", "24", "32", "20"],
    c: 2,
    question: "Qator: 2, 4, 8, 16, ? — nima bo'ladi?",
    answers: ["18", "24", "32", "20"],
    correct: 2,
  },
  {
    q: "Agar 'P' so'zi 'Q' dan oldin keladi, 'Q' dan keyin 'R' bo'lsa, unda ketma-ketlik qanday?",
    a: ["P,Q,R", "R,Q,P", "Q,P,R", "P,R,Q"],
    c: 0,
    question:
      "Agar 'P' so'zi 'Q' dan oldin keladi, 'Q' dan keyin 'R' bo'lsa, unda ketma-ketlik qanday?",
    answers: ["P,Q,R", "R,Q,P", "Q,P,R", "P,R,Q"],
    correct: 0,
  },
  {
    q: "Bir soat necha daqiqa bor?",
    a: ["60", "100", "30", "120"],
    c: 0,
    question: "Bir soat necha daqiqa bor?",
    answers: ["60", "100", "30", "120"],
    correct: 0,
  },
  {
    q: "Agar x = 2 bo'lsa, 3x + 4 = ?",
    a: ["10", "8", "6", "12"],
    c: 0,
    question: "Agar x = 2 bo'lsa, 3x + 4 = ?",
    answers: ["10", "8", "6", "12"],
    correct: 0,
  },
  {
    q: "Qaysi raqam qatordan chiqadi: 5, 10, 15, 22, 25?",
    a: ["5", "10", "22", "25"],
    c: 2,
    question: "Qaysi raqam qatordan chiqadi: 5, 10, 15, 22, 25?",
    answers: ["5", "10", "22", "25"],
    correct: 2,
  },
  {
    q: "To'plamda 3 olma, 2 nok bor — jami nechta meva?",
    a: ["5", "6", "4", "3"],
    c: 0,
    question: "To'plamda 3 olma, 2 nok bor — jami nechta meva?",
    answers: ["5", "6", "4", "3"],
    correct: 0,
  },
];

const mediumQuestions = [
  {
    q: "Ketma-ketlik: 2, 6, 12, 20, 30, ? — qoidaga ko'ra keyingi nima?",
    a: ["42", "36", "40", "46"],
    c: 0,
    question: "Ketma-ketlik: 2, 6, 12, 20, 30, ? — qoidaga ko'ra keyingi nima?",
    answers: ["42", "36", "40", "46"],
    correct: 0,
  },
  {
    q: "Agar har bir kunga 3 ta vazifa va 5 kun bor bo'lsa, jami vazifalar nechta?",
    a: ["15", "8", "10", "20"],
    c: 0,
    question:
      "Agar har bir kunga 3 ta vazifa va 5 kun bor bo'lsa, jami vazifalar nechta?",
    answers: ["15", "8", "10", "20"],
    correct: 0,
  },
  {
    q: "Soatdagi sonlarni chapdan o'ngga qo'ysak: 1,2,3,... Qaysi son 6 ga mos kelmaydi?",
    a: ["3", "6", "9", "12"],
    c: 0,
    question:
      "Soatdagi sonlarni chapdan o'ngga qo'ysak: 1,2,3,... Qaysi son 6 ga mos kelmaydi?",
    answers: ["3", "6", "9", "12"],
    correct: 0,
  },
  {
    q: "Agar uchburchakning barcha burchaklari yig'indisi 180 bo'lsa, bir burchak 90 bo'lsa, qolganlari yig'indisi nechiga teng?",
    a: ["90", "100", "80", "60"],
    c: 0,
    question:
      "Agar uchburchakning barcha burchaklari yig'indisi 180 bo'lsa, bir burchak 90 bo'lsa, qolganlari yig'indisi nechiga teng?",
    answers: ["90", "100", "80", "60"],
    correct: 0,
  },
  {
    q: "Matnda A harfi 3 marta, B 2 marta. A va B toplam qancha?",
    a: ["5", "6", "3", "4"],
    c: 0,
    question: "Matnda A harfi 3 marta, B 2 marta. A va B toplam qancha?",
    answers: ["5", "6", "3", "4"],
    correct: 0,
  },
];

const hardQuestions = [
  {
    q: "Raqamli matritsa: Agar ketma-ketlikda har bosqichda oldingi ikkita yig'indisi olinadi: 2, 3, 5, 8, 13, ? — keyingi nima?",
    a: ["21", "20", "18", "22"],
    c: 0,
    question:
      "Raqamli matritsa: Agar ketma-ketlikda har bosqichda oldingi ikkita yig'indisi olinadi: 2, 3, 5, 8, 13, ? — keyingi nima?",
    answers: ["21", "20", "18", "22"],
    correct: 0,
  },
  {
    q: "Multi-step: Aylananing diametri 10 bo'lsa, uning yuzi (pi=3.14) taxminan nechchi?",
    a: ["78.5", "31.4", "50", "62.8"],
    c: 0,
    question:
      "Multi-step: Aylananing diametri 10 bo'lsa, uning yuzi (pi=3.14) taxminan nechchi?",
    answers: ["78.5", "31.4", "50", "62.8"],
    correct: 0,
  },
  {
    q: "Lo'g'ika: Agar P→Q va Q→R bo'lsa, P→R mantiqan to'g'ri, buni qanday atashadi?",
    a: ["Transitivlik", "Reflektivlik", "Symmetriya", "Distributivlik"],
    c: 0,
    question:
      "Lo'g'ika: Agar P→Q va Q→R bo'lsa, P→R mantiqan to'g'ri, buni qanday atashadi?",
    answers: ["Transitivlik", "Reflektivlik", "Symmetriya", "Distributivlik"],
    correct: 0,
  },
];

// Global o'zgaruvchilar - barcha fayllardan access qilish mumkin
window.easyQuestions = easyQuestions;
window.mediumQuestions = mediumQuestions;
window.hardQuestions = hardQuestions;
