// =======================
// PREVENTIVE FAMILY PWA 2.1 (CLEAN EDITION)
// =======================

// -----------------------
// INITIAL STATE
// -----------------------
const STORAGE_KEY = "PREVENTIVE_FAMILY_PWA";
let state = loadState() || getDefaultState();

function getDefaultState() {
  return {
    mode: "patient", // 'patient' | 'doctor'
    page: "home", // 'home' | 'family' | 'member' | 'doctor'
    schemaVersion: "2.1",
    doctorPIN: "2468",
    doctorProfile: {
      name: "Имя Фамилия",
      title: "Врач превентивной медицины",
      subtitle: "Работаю с семьями: сон, питание, анализы и образ жизни в одной системе.",
      educationText: "• Медицинский вуз / педиатрия / терапия\n• Курсы по превентивной медицине и нутрициологии\n• Обучение по работе с семейными кейсами",
      aboutText: "Здесь вы можете рассказать, как вы работаете: без запугивания, с уважением к пациенту, шаг за шагом.",
      methodText: "1. Как подготовиться к первой консультации.\n2. Какие анализы обычно нужны.\n3. Как вести дневник самочувствия.",
      guidesText: "Сон, Питание, Кишечник, Гормоны, Дети",
      stories: [
        { title: "Сон ребёнка", text: "Как перевести семью с ночных просыпаний на стабильный сон." },
        { title: "Хроническая усталость", text: "Кейс, где анализы и режим дали энергию." },
        { title: "Кишечник", text: "История про питание, витамины и микробиоту." },
      ],
    },
    patient: {
      id: 1,
      name: "Никита Прославенко",
      phone: "+79995550011",
      members: [
        { id: 1, name: "Никита Прославенко", relation: "я", age: 29, sex: "м", anketa: null, labs: [], consult: {}, chat: [] },
        { id: 2, name: "Анна Прославенко", relation: "жена", age: 27, sex: "ж", anketa: null, labs: [], consult: {}, chat: [] },
        { id: 3, name: "Марк Прославенко", relation: "ребёнок", age: 4, sex: "м", anketa: null, labs: [], consult: {}, chat: [] },
      ],
    },
    selectedMemberId: null,
    ui: { doctorEditOpen: false, menuOpen: false },
  };
}

// -----------------------
// STORAGE
// -----------------------
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

// -----------------------
// HELPERS
// -----------------------
function qs(sel) {
  return document.querySelector(sel);
}
function render() {
  const app = qs("#app");
  if (!app) return;

  if (state.page === "home") renderHome(app);
  if (state.page === "family") renderFamily(app);
  if (state.page === "member") renderMember(app);
  if (state.page === "doctor") renderDoctor(app);

  updateBottomButton();
}

function goToHome() {
  state.page = "home";
  render();
}

function goToFamily() {
  state.page = "family";
  render();
}

function showToast(msg) {
  alert(msg); // для чистоты демо, можно заменить на тост
}
function renderHome(app) {
  const d = state.doctorProfile;
  app.innerHTML = `
  <div class="flex flex-col items-center p-4 pb-28">
    <div class="w-full max-w-md bg-white rounded-3xl shadow p-5 space-y-4">
      <div class="text-center">
        <h1 class="text-lg font-semibold">PREVENTIVE</h1>
        <p class="text-xs text-gray-500">Врач превентивной медицины</p>
      </div>

      <div class="border rounded-2xl p-4">
        <h2 class="font-semibold mb-1">${d.name}</h2>
        <p class="text-sm text-gray-600">${d.subtitle}</p>
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="font-semibold mb-2">Моё образование</h3>
        <p class="whitespace-pre-line text-sm text-gray-700">${d.educationText}</p>
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="font-semibold mb-2">О себе</h3>
        <p class="text-sm text-gray-700">${d.aboutText}</p>
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="font-semibold mb-2">Методичка</h3>
        <p class="whitespace-pre-line text-sm text-gray-700">${d.methodText}</p>
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="font-semibold mb-2">Гайды</h3>
        <div class="flex flex-wrap gap-2">
          ${d.guidesText.split(",").map(g => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${g.trim()}</span>`).join("")}
        </div>
      </div>

      <div class="border rounded-2xl p-4">
        <h3 class="font-semibold mb-2">Истории</h3>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
          ${d.stories.map(s => `
            <div class="border rounded-xl p-2 text-sm bg-gray-50">
              <p class="font-semibold">${s.title}</p>
              <p class="text-gray-600">${s.text}</p>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </div>
  `;
}
// -----------------------
// FAMILY PAGE (Профиль пациента)
// -----------------------
function renderFamily(app) {
  const p = state.patient;
  app.innerHTML = `
  <div class="p-4 pb-28 flex flex-col items-center">
    <div class="w-full max-w-md space-y-4">
      <div class="bg-white p-4 rounded-3xl shadow">
        <h2 class="font-semibold text-lg">Профиль пациента</h2>
        <p class="text-sm text-gray-600 mb-3">Внутри — члены семьи и их анкеты</p>
        <div class="flex gap-2">
          <button onclick="addFamilyMember()" class="flex-1 bg-gray-900 text-white py-2 rounded-2xl">➕ Добавить</button>
          <button onclick="deleteAccount()" class="flex-1 bg-red-100 text-red-700 py-2 rounded-2xl text-sm">Удалить аккаунт</button>
        </div>
      </div>

      ${p.members.map(m => `
        <div class="bg-white rounded-3xl shadow p-4">
          <div class="flex justify-between items-center mb-1">
            <p class="font-semibold">${m.name}</p>
            <p class="text-xs text-gray-500">${m.age} лет • ${m.relation}</p>
          </div>
          <p class="text-sm text-gray-700">
            Анкета: ${m.anketa ? "есть" : "нет"} · Файлы: ${m.labs.length} · Конс: ${m.consult?.status || "нет"}
          </p>
          <button onclick="openMember(${m.id})" class="mt-2 w-full bg-gray-900 text-white rounded-2xl py-2 text-sm">Открыть</button>
        </div>`).join("")}
    </div>
  </div>
  `;
}

function openMember(id) {
  state.selectedMemberId = id;
  state.page = "member";
  render();
}

function addFamilyMember() {
  showToast("Добавление члена семьи в демо не активно");
}

function deleteAccount() {
  if (confirm("Удалить аккаунт?")) {
    localStorage.removeItem(STORAGE_KEY);
    state = getDefaultState();
    render();
  }
}

// -----------------------
// MEMBER PAGE (Член семьи)
// -----------------------
function renderMember(app) {
  const member = state.patient.members.find(m => m.id === state.selectedMemberId);
  if (!member) return goToFamily();

  app.innerHTML = `
  <div class="p-4 pb-28 flex flex-col items-center">
    <div class="w-full max-w-md bg-white rounded-3xl shadow p-4">
      <button onclick="goToFamily()" class="text-sm text-gray-500 mb-2">← Профиль</button>
      <h2 class="font-semibold">${member.name}</h2>
      <p class="text-xs text-gray-500 mb-3">${member.age} лет • ${member.relation}</p>

      <div class="flex gap-2 mb-3">
        ${["Обзор", "Анкета", "Анализы", "Чат", "Консультации"].map(tab =>
          `<button class="flex-1 rounded-2xl py-2 text-sm ${tab==="Обзор"?"bg-gray-900 text-white":"bg-gray-100 text-gray-700"}">${tab}</button>`
        ).join("")}
      </div>

      <div class="grid gap-2 text-sm text-gray-700">
        <div class="border rounded-xl p-2">Анкета: ${member.anketa ? "заполнена" : "не заполнена"}</div>
        <div class="border rounded-xl p-2">Анализы: ${member.labs.length} файл(ов)</div>
        <div class="border rounded-xl p-2">Консультации: ${member.consult?.status || "нет"}</div>
        <div class="border rounded-xl p-2">Тип анкеты: ${member.age > 16 ? "взрослая" : "детская"}</div>
      </div>
    </div>
  </div>`;
}

// -----------------------
// DOCTOR PAGE (Кабинет врача)
// -----------------------
function renderDoctor(app) {
  const d = state.doctorProfile;
  app.innerHTML = `
  <div class="p-4 pb-28 flex flex-col items-center">
    <div class="w-full max-w-md bg-white rounded-3xl shadow p-5 space-y-4">
      <h2 class="text-lg font-semibold">Кабинет врача</h2>
      <p class="text-sm text-gray-500">Имя: ${d.name}</p>
      <p class="text-sm text-gray-500">${d.title}</p>
      <button onclick="openDoctorEditor()" class="w-full bg-gray-900 text-white py-2 rounded-2xl">🧩 Редактировать профиль</button>
    </div>
  </div>
  `;
}

// -----------------------
// DOCTOR EDITOR MODAL
// -----------------------
function openDoctorEditor() {
  state.ui.doctorEditOpen = true;
  renderDoctorEditor();
}

function closeDoctorEditor() {
  state.ui.doctorEditOpen = false;
  render();
}

function renderDoctorEditor() {
  const d = state.doctorProfile;
  const app = qs("#app");
  app.innerHTML = `
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-5 w-[90%] max-w-md space-y-3">
      <h2 class="font-semibold text-lg text-center">Редактирование профиля</h2>
      <input id="docName" class="w-full border rounded-xl p-2" placeholder="Имя" value="${d.name}">
      <input id="docTitle" class="w-full border rounded-xl p-2" placeholder="Титул" value="${d.title}">
      <textarea id="docAbout" class="w-full border rounded-xl p-2" rows="2" placeholder="О себе">${d.aboutText}</textarea>
      <textarea id="docEducation" class="w-full border rounded-xl p-2" rows="3" placeholder="Образование">${d.educationText}</textarea>
      <textarea id="docMethod" class="w-full border rounded-xl p-2" rows="3" placeholder="Методичка">${d.methodText}</textarea>
      <input id="docGuides" class="w-full border rounded-xl p-2" placeholder="Гайды через запятую" value="${d.guidesText}">
      <button onclick="saveDoctorProfile()" class="w-full bg-gray-900 text-white py-2 rounded-2xl">💾 Сохранить</button>
      <button onclick="closeDoctorEditor()" class="w-full bg-gray-200 py-2 rounded-2xl">Отмена</button>
    </div>
  </div>`;
}

function saveDoctorProfile() {
  state.doctorProfile = {
    ...state.doctorProfile,
    name: qs("#docName").value,
    title: qs("#docTitle").value,
    aboutText: qs("#docAbout").value,
    educationText: qs("#docEducation").value,
    methodText: qs("#docMethod").value,
    guidesText: qs("#docGuides").value,
  };
  saveState();
  state.ui.doctorEditOpen = false;
  render();
  showToast("Профиль врача обновлён");
}
// -----------------------
// FIXED BOTTOM BUTTON (МОЙ ПРОФИЛЬ / ГЛАВНЫЙ ЭКРАН)
// -----------------------
function setupBottomButton() {
  if (document.getElementById("bottomAction")) return;

  const div = document.createElement("div");
  div.id = "bottomAction";
  div.className = "fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50";

  div.innerHTML = `
    <button id="bottomButton"
      class="w-full py-3 bg-gray-900 text-white rounded-2xl shadow-lg text-base transition-all duration-200">
      👤 Мой профиль
    </button>`;
  document.body.appendChild(div);
}

function updateBottomButton() {
  const btn = document.getElementById("bottomButton");
  if (!btn) return;

  // Определяем, что показывать
  const onHome = state.page === "home" || state.page === "doctor";
  const newLabel = onHome ? "👤 Мой профиль" : "🏠 Главный экран";

  // Если текст тот же, не перерисовываем
  if (btn.innerText !== newLabel) {
    btn.classList.add("opacity-0");
    setTimeout(() => {
      btn.innerText = newLabel;
      btn.classList.remove("opacity-0");
    }, 150);
  }

  // Привязываем действие
  btn.onclick = () => {
    if (onHome) {
      goToFamily();
      state.page = "family";
      saveState();
      render();
      updateBottomButton();
    } else {
      goToHome();
      state.page = "home";
      saveState();
      render();
      updateBottomButton();
    }
  };
}

// -----------------------
// INIT
// -----------------------
document.addEventListener("DOMContentLoaded", () => {
  setupBottomButton();
  render();
});

// -----------------------
// END OF APP.JS
// -----------------------
