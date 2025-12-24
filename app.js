// === Константы и справочники ===
const STORAGE_KEY = "prev_family_pwa_plain_v1";
const DOCTOR_PIN = "2580";

// === Шаблоны анкет (4 типа) ===
const ANKETA_TEMPLATES = {
  child_u2: {
    title: "Анкета для детей до 2 лет",
    sections: [
      {
        title: "Основная причина обращения",
        fields: [
          { id: "reason", label: "Опишите жалобы, симптомы, ожидаемые изменения", type: "textarea", rows: 3 },
        ],
      },
      {
        title: "Анамнез текущего состояния",
        fields: [
          { id: "when_started", label: "Когда впервые возникли жалобы?", type: "textarea", rows: 2 },
          { id: "how_changed", label: "Как изменялось состояние со временем?", type: "textarea", rows: 2 },
          { id: "measures", label: "Какие меры предпринимались (лекарства/терапия/обследования)?", type: "textarea", rows: 2 },
        ],
      },
      {
        title: "Общий анамнез",
        fields: [
          { id: "pregnancy_birth", label: "Беременность и роды (протекание/родоразрешение/осложнения)", type: "textarea", rows: 2 },
          { id: "newborn_period", label: "Период новорождённости (кормление/развитие)", type: "textarea", rows: 2 },
          { id: "vaccines", label: "Прививки (по графику/отсрочки/отказ)", type: "textarea", rows: 2 },
          { id: "illness_hosp", label: "Перенесённые заболевания и госпитализации", type: "textarea", rows: 2 },
          { id: "surgery_trauma", label: "Операции и травмы", type: "textarea", rows: 2 },
          { id: "chronic", label: "Хронические заболевания (если есть)", type: "textarea", rows: 2 },
        ],
      },
      {
        title: "Питание",
        fields: [
          { id: "infant_feeding", label: "Тип питания в младенчестве (ГВ/ИВ/смешанное)", type: "textarea", rows: 2 },
          { id: "current_food", label: "Текущее питание (рацион/предпочтения/аллергены)", type: "textarea", rows: 2 },
          { id: "food_intolerance", label: "Пищевая чувствительность/непереносимость (если есть)", type: "textarea", rows: 2 },
        ],
      },
      {
        title: "Сон и восстановление",
        fields: [
          { id: "sleep_hours", label: "Сколько часов спит ребёнок?", type: "text", placeholder: "например: 10–12" },
          { id: "sleep_quality", label: "Качество сна (глубокий/прерывистый/бессонница и т.п.)", type: "textarea", rows: 2 },
          { id: "falls_asleep", label: "Легко ли засыпает?", type: "select", options: ["Да", "Нет", "Иногда"] },
        ],
      },
      {
        title: "Психоэмоциональное состояние",
        fields: [
          { id: "temper", label: "Характер ребёнка (спокойный/тревожный/активный и т.д.)", type: "textarea", rows: 2 },
          { id: "fears", label: "Есть ли страхи/тревожность/замкнутость?", type: "textarea", rows: 2 },
          { id: "stress_events", label: "Были ли стрессовые события в жизни ребёнка?", type: "textarea", rows: 2 },
        ],
      },
      {
        title: "ЖКТ",
        fields: [
          { id: "appetite", label: "Аппетит (стабильный/повышенный/сниженный)", type: "text" },
          { id: "belly_pain", label: "Боли в животе? Когда возникают?", type: "textarea", rows: 2 },
          { id: "stool", label: "Частота и характер стула", type: "textarea", rows: 2 },
          { id: "bloating", label: "Вздутие/отрыжка/срыгивание/тошнота/рвота?", type: "textarea", rows: 2 },
          { id: "gi_intolerance", label: "Непереносимость продуктов", type: "textarea", rows: 2 },
        ],
      },
      {
        title: "Кожа / Аллергии / Лекарства",
        fields: [
          { id: "skin", label: "Кожные проявления (высыпания/зуд/шелушение/экзема и т.п.)", type: "textarea", rows: 2 },
          { id: "allergy", label: "Аллергические реакции (пища/лекарства/пыль/химия и т.п.)", type: "textarea", rows: 2 },
          { id: "allergy_how", label: "Как проявляются?", type: "textarea", rows: 2 },
          { id: "meds", label: "Регулярные/периодические лекарства", type: "textarea", rows: 2 },
          { id: "supplements", label: "БАДы/витамины/травы", type: "textarea", rows: 2 },
          { id: "side_effects", label: "Побочные эффекты (если были)", type: "textarea", rows: 2 },
        ],
      },
      {
        title: "Семейный анамнез",
        fields: [
          { id: "family_diseases", label: "Заболевания в семье (ССЗ/онко/диабет/психические/кожные и т.д.)", type: "textarea", rows: 2 },
          { id: "genetic", label: "Наследственные патологии (если известны)", type: "textarea", rows: 2 },
        ],
      },
    ],
  },

  child: {
    title: "Анкета для детей",
    sections: [] // пока используем тот же набор, что child_u2
  },

  teen: {
    title: "Анкета для подростков",
    sections: [] // заполним тем же каркасом, позже уточним по твоей таблице
  },

  adult: {
    title: "Анкета для взрослых",
    sections: [] // заполним тем же каркасом, позже уточним по твоей таблице
  },
};

// Временно: чтобы прямо сейчас всё работало одинаково, копируем структуру child_u2
ANKETA_TEMPLATES.child.sections = JSON.parse(JSON.stringify(ANKETA_TEMPLATES.child_u2.sections));
ANKETA_TEMPLATES.teen.sections  = JSON.parse(JSON.stringify(ANKETA_TEMPLATES.child_u2.sections));
ANKETA_TEMPLATES.adult.sections = JSON.parse(JSON.stringify(ANKETA_TEMPLATES.child_u2.sections));

// Ключ анкеты по возрасту
function anketaKeyForDob(dob) {
  const a = ageFromDob(dob);
  if (a.totalMonths < 24) return "child_u2";
  if (a.years >= 7 && a.years < 18) return "teen";
  if (a.years >= 18) return "adult";
  return "child";
}

let state; // заполним чуть ниже
let toastTimeout = null;
let brandTapTimes = [];

// === Хелперы ===
function uid(prefix = "id") {
  return (
    prefix +
    "_" +
    Math.random().toString(16).slice(2) +
    "_" +
    Math.random().toString(16).slice(2)
  );
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  // для data-атрибутов
  return escapeHtml(str).replace(/"/g, "&quot;");
}

function ageFromDob(dob) {
  if (!dob) return { years: 0, months: 0, totalMonths: 0 };
  const now = new Date();
  const d = new Date(dob + "T00:00:00");
  let months =
    (now.getFullYear() - d.getFullYear()) * 12 +
    (now.getMonth() - d.getMonth());
  if (now.getDate() < d.getDate()) months -= 1;
  const totalMonths = Math.max(0, months);
  const years = Math.floor(totalMonths / 12);
  const rem = totalMonths % 12;
  return { years, months: rem, totalMonths };
}

function formTypeFor(dob) {
  const a = ageFromDob(dob);
  if (a.totalMonths < 24) return "Дети до 2 лет";
  if (a.years >= 7 && a.years < 18) return "Подростки";
  if (a.years >= 18) return "Взрослые";
  return "Дети";
}

function fmtMemberMeta(m) {
  const a = ageFromDob(m.dob);
  const ageStr =
    a.totalMonths < 24
      ? `${a.years} г ${a.months} мес`
      : `${a.years} лет`;
  return `${ageStr} • ${formTypeFor(m.dob)}`;
}

// === Доктор, пациенты, демо-данные ===
function defaultDoctorProfile() {
  return {
    name: "Имя Фамилия",
    title: "Врач превентивной медицины",
    subtitle:
      "Работаю с семьями: сон, питание, анализы и образ жизни в одной системе.",
    educationText:
      "• Медицинский вуз / педиатрия / терапия\n" +
      "• Курсы по превентивной медицине и нутрициологии\n" +
      "• Обучение по работе с семейными кейсами",
    aboutText:
      "Здесь вы можете рассказать, как вы работаете: без запугивания, с уважением к пациенту, шаг за шагом.",
    methodText:
      "1. Как подготовиться к первой консультации.\n" +
      "2. Какие анализы обычно нужны.\n" +
      "3. Как вести дневник самочувствия.",
    guidesText: "Сон, Питание, Кишечник, Гормоны, Дети",
    story1Title: "Сон ребенка",
    story1Text:
      "Как перевели семью с ночных просыпаний на стабильный сон.",
    story2Title: "Хроническая усталость",
    story2Text:
      "Кейс, где анализы и режим дня вернули энергию.",
    story3Title: "Кишечник",
    story3Text:
      "История про вздутие, питание и микробиоту.",
  };
}

function defaultMember({ name, dob, sex, relation }) {
  return {
    id: uid("m"),
    relation: relation || "член семьи",
    name,
    dob,
    sex,
    anketa: null,
    labs: {},
    chats: [
      {
        from: "doctor",
        text: "Здравствуйте! Заполните анкету и при необходимости напишите в чат.",
        ts: Date.now(),
      },
    ],
    consult: {
      urgent: "none",
      prev: "none",
    },
  };
}

function makeDemoPatients() {
  const p1 = {
    id: "p1",
    name: "Никита Прославенко",
    phone: "+79995550011",
    createdAt: new Date().toISOString(),
    members: [],
    selectedMemberId: null,
  };

  const m1 = defaultMember({
    name: "Никита Прославенко",
    dob: "1996-03-10",
    sex: "m",
    relation: "я",
  });
  const m2 = defaultMember({
    name: "Анна Прославенко",
    dob: "1998-11-02",
    sex: "f",
    relation: "жена",
  });
  const m3 = defaultMember({
    name: "Марк Прославенко",
    dob: "2021-08-18",
    sex: "m",
    relation: "ребёнок",
  });

  p1.members = [m1, m2, m3];
  p1.selectedMemberId = m1.id;

  const p2 = {
    id: "p2",
    name: "Амина Ахмедова",
    phone: "+79990000022",
    createdAt: new Date().toISOString(),
    members: [],
    selectedMemberId: null,
  };

  const m21 = defaultMember({
    name: "Амина Ахмедова",
    dob: "2001-05-01",
    sex: "f",
    relation: "я",
  });
  const m22 = defaultMember({
    name: "Али",
    dob: "2024-02-14",
    sex: "m",
    relation: "ребёнок",
  });

  p2.members = [m21, m22];
  p2.selectedMemberId = m21.id;

  return [p1, p2];
}

function ensureAnketaShape(anketa, member) {
  if (!anketa) return null;

  // Новый формат
  if (anketa.answers && typeof anketa.answers === "object") {
    return {
      templateKey: anketa.templateKey || anketaKeyForDob(member?.dob),
      answers: anketa.answers || {},
      updatedAt: anketa.updatedAt || new Date().toISOString(),
    };
  }

  // Старый формат (goal/complaints) — мягкая миграция
  if (typeof anketa === "object" && ("goal" in anketa || "complaints" in anketa)) {
    return {
      templateKey: anketaKeyForDob(member?.dob),
      answers: {
        reason: anketa.goal || "",
        measures: anketa.complaints || "",
      },
      updatedAt: anketa.updatedAt || new Date().toISOString(),
    };
  }

  return null;
}

function ensureMemberShape(m) {
  if (!m) return null;
  return {
    id: m.id || uid("m"),
    relation: m.relation || "член семьи",
    name: m.name || "Без имени",
    dob: m.dob || "2000-01-01",
    sex: m.sex || "f",
    anketa: ensureAnketaShape(m.anketa, m),
    labs: m.labs || {},
    chats:
      Array.isArray(m.chats) && m.chats.length
        ? m.chats
        : [
            {
              from: "doctor",
              text: "Здравствуйте! Заполните анкету и при необходимости напишите в чат.",
              ts: Date.now(),
            },
          ],
    consult: m.consult || { urgent: "none", prev: "none" },
  };
}

// === State ===
function initialState() {
  const patients = makeDemoPatients();
  return {
    page: "home", // home | family | member | doctor
    memberTab: "overview",
    doctorProfile: defaultDoctorProfile(),
    patients,
    activePatientId: patients[0]?.id || null,
    doctorActivePatientId: patients[0]?.id || null,

    doctorView: "patients", // "patients" | "patient"

    // НОВОЕ: кто сейчас сидит в приложении и какой статус у врача
    mode: "patient",          // "patient" | "doctor"
    doctorStatus: "offline",  // "online" | "offline"
    paymentRequests: [],
    notifications: [],

    toast: "",
    uiAddMemberOpen: false,
    uiAnketaOpen: false,
    uiRegisterOpen: false,
  };
}

function loadState() {
  let base = initialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return base;

    base = Object.assign(base, saved);

    if (!base.doctorView) base.doctorView = "patients";
    
        // НОВОЕ: дефолты для новых полей
    if (!base.mode) base.mode = "patient";
    if (!base.doctorStatus) base.doctorStatus = "offline";
    if (!Array.isArray(base.paymentRequests)) base.paymentRequests = [];
    if (!Array.isArray(base.notifications)) base.notifications = [];
    
    if (Array.isArray(base.patients)) {
      base.patients = base.patients.map((p) => {
        const pp = Object.assign({}, p);
        if (!Array.isArray(pp.members)) pp.members = [];
        pp.members = pp.members.map((m) => ensureMemberShape(m));
        if (!pp.selectedMemberId && pp.members[0]) {
          pp.selectedMemberId = pp.members[0].id;
        }
        return pp;
      });
    }

    if (!base.activePatientId && base.patients[0]) {
      base.activePatientId = base.patients[0].id;
    }
    if (!base.doctorActivePatientId && base.patients[0]) {
      base.doctorActivePatientId = base.patients[0].id;
    }

    base.toast = "";
    base.uiAddMemberOpen = false;
    base.uiAnketaOpen = false;
    base.uiRegisterOpen = false;

    return base;
  } catch (e) {
    console.warn("Ошибка загрузки состояния", e);
    return base;
  }
}

function saveState() {
  try {
    const {
      toast,
      uiAddMemberOpen,
      uiAnketaOpen,
       uiRegisterOpen, // ✅ добавь
      ...rest
    } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch (e) {
    console.warn("Ошибка сохранения состояния", e);
  }
}

function getActivePatient() {
  if (!Array.isArray(state.patients) || !state.patients.length) return null;
  return (
    state.patients.find((p) => p.id === state.activePatientId) ||
    state.patients[0]
  );
}

function getActiveMember() {
  const p = getActivePatient();
  if (!p || !Array.isArray(p.members) || !p.members.length) return null;
  const mid = p.selectedMemberId || p.members[0].id;
  return p.members.find((m) => m.id === mid) || p.members[0];
}

function showToast(msg) {
  state.toast = msg;
  render();
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    state.toast = "";
    render();
  }, 1700);
}

// === Рендер ===
function renderTopBar() {
  return `
    <div class="px-4 pt-4 pb-3 border-b border-gray-200 bg-white">
      <button data-action="brand-tap"
        class="flex items-center gap-3 text-left active:scale-95 transition">
        <div class="w-10 h-10 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-xl">🧬</div>
        <div>
          <div class="font-semibold text-gray-900 leading-tight">PREVENTIVE</div>
          <div class="text-xs text-gray-500 -mt-0.5">Анкеты семьи · light</div>
        </div>
      </button>
    </div>
  `;
}

function renderStoryCard(title, text) {
  if (!title && !text) return "";
  const t = (title || "").trim();
  const body = (text || "").trim();
  if (!t && !body) return "";
  return `
    <div class="min-w-[180px] max-w-[220px] bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs">
      <div class="font-semibold text-gray-900 mb-1">${escapeHtml(t)}</div>
      <div class="text-gray-700 whitespace-pre-line">${escapeHtml(body)}</div>
    </div>
  `;
}

function renderHome() {
  const d = state.doctorProfile;
  const guides = (d.guidesText || "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  return `
    <div class="p-4 space-y-4">
      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="flex gap-3">
          <div class="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-xl">🩺</div>
          <div class="flex-1">
            <div class="text-xs uppercase text-gray-500 tracking-wide">${escapeHtml(
              d.title
            )}</div>
            <div class="text-lg font-semibold text-gray-900 mt-1">${escapeHtml(
              d.name
            )}</div>
            ${
              d.subtitle
                ? `<div class="text-sm text-gray-600 mt-1">${escapeHtml(
                    d.subtitle
                  )}</div>`
                : ""
            }
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="font-semibold text-gray-900">Моё образование</div>
        <div class="mt-2 text-sm text-gray-700 whitespace-pre-line">${escapeHtml(
          d.educationText
        )}</div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="font-semibold text-gray-900">О себе</div>
        <div class="mt-2 text-sm text-gray-700 whitespace-pre-line">${escapeHtml(
          d.aboutText
        )}</div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="font-semibold text-gray-900">Методичка</div>
        <div class="mt-2 text-sm text-gray-700 whitespace-pre-line">${escapeHtml(
          d.methodText
        )}</div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="font-semibold text-gray-900">Гайды</div>
        <div class="mt-2 flex flex-wrap gap-2">
          ${guides
            .map(
              (g) =>
                `<span class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">${escapeHtml(
                  g
                )}</span>`
            )
            .join("")}
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div class="font-semibold text-gray-900 mb-2">Истории</div>
        <div class="flex gap-3 overflow-x-auto pb-1">
          ${renderStoryCard(d.story1Title, d.story1Text)}
          ${renderStoryCard(d.story2Title, d.story2Text)}
          ${renderStoryCard(d.story3Title, d.story3Text)}
        </div>
      </div>
    </div>
  `;
}

function renderFamily(activePatient) {
  if (!activePatient) {
    return `<div class="p-4 text-sm text-gray-700">Пациент не выбран</div>`;
  }

  const membersHtml = (activePatient.members || [])
    .map((m) => {
      const labsCount = Object.values(m.labs || {}).reduce(
        (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
        0
      );
      const ank = m.anketa ? "заполнена" : "нет";
      const cons =
        (m.consult?.urgent || "none") !== "none" ||
        (m.consult?.prev || "none") !== "none"
          ? "есть"
          : "нет";

      return `
        <button data-action="select-member" data-member-id="${m.id}"
          class="w-full text-left bg-white border border-gray-200 rounded-2xl p-4 hover:bg-gray-50 active:scale-95 transition">
          <div class="flex justify-between gap-3">
            <div>
              <div class="font-semibold text-gray-900 text-sm">
                ${escapeHtml(m.name)}
                <span class="ml-2 text-xs text-gray-500">
                  (${escapeHtml(m.relation || "член семьи")})
                </span>
              </div>
              <div class="text-xs text-gray-600 mt-0.5">${escapeHtml(fmtMemberMeta(m))}</div>
            </div>
            <div class="text-right text-[11px] text-gray-600 space-y-1">
              <div>Анкета: <b>${ank}</b></div>
              <div>Файлы: <b>${labsCount}</b></div>
              <div>Конс: <b>${cons}</b></div>
            </div>
          </div>
        </button>
      `;
    })
    .join("");

  const controls =
    state.mode === "patient"
      ? `
        <div class="flex gap-2">
          <button data-action="open-add-member"
            class="px-3 py-2 rounded-2xl bg-gray-900 text-white text-xs active:scale-95 transition">
            + Добавить
          </button>
          <button data-action="delete-account"
            class="px-3 py-2 rounded-2xl bg-red-50 text-red-700 text-xs active:scale-95 transition">
            Удалить аккаунт
          </button>
        </div>
      `
      : "";

  return `
    <div class="p-4 space-y-4">
      <div class="bg-white rounded-2xl border border-gray-200 p-4">
        <div class="flex items-center justify-between gap-3">
          <div>
            <div class="font-semibold text-gray-900">Профиль пациента</div>
            <div class="text-sm text-gray-600">Внутри — члены семьи и их анкеты</div>
          </div>
          ${controls}
        </div>
      </div>

      <div class="space-y-3">
        ${membersHtml}
      </div>
    </div>
  `;
}

function renderMemberOverview(member) {
  const labsCount = Object.values(member.labs || {}).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );
  const consLabels = [];
  if ((member.consult?.urgent || "none") !== "none")
    consLabels.push("Срочная");
  if ((member.consult?.prev || "none") !== "none")
    consLabels.push("Превентивная");
  const consLabel = consLabels.length ? consLabels.join(" · ") : "нет";

  return `
    <div class="space-y-3">
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl border border-gray-200 p-3 text-sm">
          <div class="text-xs text-gray-500">Анкета</div>
          <div class="mt-1 font-semibold text-gray-900">${
            member.anketa ? "Заполнена" : "Не заполнена"
          }</div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-3 text-sm">
          <div class="text-xs text-gray-500">Анализы</div>
          <div class="mt-1 font-semibold text-gray-900">${
            labsCount || "Нет"
          } файл(ов)</div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-3 text-sm">
          <div class="text-xs text-gray-500">Консультации</div>
          <div class="mt-1 font-semibold text-gray-900">${consLabel}</div>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-3 text-sm">
          <div class="text-xs text-gray-500">Тип анкеты</div>
          <div class="mt-1 font-semibold text-gray-900">${escapeHtml(
            formTypeFor(member.dob)
          )}</div>
        </div>
      </div>
    </div>
  `;
}

function renderMemberAnketa(member) {
  const tplKey = (member.anketa?.templateKey) || anketaKeyForDob(member.dob);
  const tpl = ANKETA_TEMPLATES[tplKey];
  const has = !!member.anketa;
  const a = member.anketa?.answers || {};

  // считаем, сколько полей заполнено
  let total = 2; // рост/вес
  let filled = 0;

  if (String(a.height_cm || "").trim()) filled++;
  if (String(a.weight_kg || "").trim()) filled++;

  (tpl?.sections || []).forEach(sec => {
    (sec.fields || []).forEach(f => {
      total++;
      if (String(a[f.id] || "").trim()) filled++;
    });
  });

  const percent = total ? Math.round((filled / total) * 100) : 0;
  const updatedAt = has ? new Date(member.anketa.updatedAt).toLocaleString() : "";

  // короткий предпросмотр ответов (для врача удобно)
  const previewHtml = has
    ? (tpl?.sections || []).map(sec => {
        const rows = (sec.fields || [])
          .map(f => {
            const val = String(a[f.id] || "").trim();
            if (!val) return "";
            const short = val.length > 140 ? val.slice(0, 140) + "…" : val;
            return `
              <div class="mt-2">
                <div class="text-[11px] text-gray-500 font-semibold">${escapeHtml(f.label)}</div>
                <div class="text-sm text-gray-800 whitespace-pre-line">${escapeHtml(short)}</div>
              </div>
            `;
          })
          .filter(Boolean)
          .join("");

        if (!rows) return "";
        return `
          <div class="bg-white border border-gray-200 rounded-2xl p-3">
            <div class="font-semibold text-gray-900 text-sm">${escapeHtml(sec.title)}</div>
            ${rows}
          </div>
        `;
      }).filter(Boolean).join("")
    : "";

  const buttons = `
    <div class="grid grid-cols-2 gap-2">
      ${
        state.mode === "patient"
          ? `<button data-action="open-anketa"
              class="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm active:scale-95 transition">
              ${has ? "Редактировать" : "Заполнить"}
            </button>`
          : `<div class="px-3 py-2 rounded-2xl bg-gray-100 text-gray-500 text-sm text-center">
              Режим врача
            </div>`
      }

      ${
        has && state.mode === "patient"
          ? `<button data-action="delete-anketa"
              class="px-3 py-2 rounded-2xl bg-red-50 text-red-700 text-sm active:scale-95 transition">
              Удалить
            </button>`
          : has && state.mode === "doctor"
            ? `<button data-action="export-anketa"
                class="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm active:scale-95 transition">
                Экспорт PDF
              </button>`
            : `<div class="px-3 py-2 rounded-2xl bg-gray-100 text-gray-500 text-sm text-center">
                —
              </div>`
      }
    </div>
  `;

  return `
    <div class="space-y-3">
      <div class="bg-white rounded-2xl border border-gray-200 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="font-semibold text-gray-900">${escapeHtml(tpl?.title || "Анкета")}</div>
            <div class="text-xs text-gray-600 mt-1">
              Статус: <b>${has ? "заполнена" : "не заполнена"}</b>
              ${has ? ` • Обновлено: ${escapeHtml(updatedAt)}` : ""}
            </div>
          </div>
          <div class="text-right text-xs text-gray-600">
            Заполнено: <b>${percent}%</b>
          </div>
        </div>

        <div class="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div class="h-2 bg-gray-900" style="width:${percent}%"></div>
        </div>

        <div class="mt-3">
          ${buttons}
        </div>
      </div>

      ${
        has
          ? `<div class="space-y-3">
              ${previewHtml || `<div class="bg-white rounded-2xl border border-gray-200 p-4 text-sm text-gray-600">Ответы есть, но все поля пустые.</div>`}
            </div>`
          : `<div class="bg-white rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
              Нажмите <b>«Заполнить»</b> — откроется форма анкеты.
            </div>`
      }
    </div>
  `;
}

function renderMemberLabs(member) {
  const labsCount = Object.values(member.labs || {}).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-4 text-sm text-gray-700">
      В этой вкладке позже можно будет загружать файлы анализов по категориям.
      <br/><br/>
      Сейчас у этого члена семьи сохранено файлов: <b>${labsCount}</b>.
    </div>
  `;
}

function renderMemberChat(member) {
  const msgs = member.chats || [];

  const statusLabel =
    state.doctorStatus === "online" ? "Врач онлайн" : "Врач оффлайн";
  const statusClass =
    state.doctorStatus === "online" ? "text-emerald-600" : "text-gray-400";

  const msgsHtml = msgs
    .map((msg) => {
      const isMine =
        (state.mode === "patient" && msg.from === "patient") ||
        (state.mode === "doctor" && msg.from === "doctor");

      let who;
      if (msg.from === "doctor") {
        who = state.mode === "doctor" ? "Вы (врач)" : "Врач";
      } else {
        // from: patient
        who = state.mode === "patient" ? "Вы" : "Пациент";
      }

      return `
        <div class="flex ${isMine ? "justify-end" : "justify-start"}">
          <div class="max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
            isMine
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900"
          }">
            <div class="text-[10px] opacity-70">
              ${who} · ${new Date(msg.ts).toLocaleString()}
            </div>
            <div class="mt-1 whitespace-pre-line">${escapeHtml(
              msg.text
            )}</div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
   <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col h-full min-h-0">
      <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div>
          <div class="font-semibold text-gray-900 text-sm">Чат с врачом</div>
          <div class="text-xs text-gray-600">По выбранному члену семьи</div>
          <div class="text-[11px] mt-0.5 ${statusClass}">
            ${statusLabel}
          </div>
        </div>
      </div>
<div id="chatList" class="flex-1 min-h-0 px-4 py-3 space-y-2 overflow-y-auto bg-white">
        ${msgsHtml}
      </div>
      <div class="px-3 py-3 border-t border-gray-200 bg-white flex gap-2">
        <input id="chatInput" type="text" placeholder="Напишите сообщение…"
          class="flex-1 rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none" />
        <button data-action="chat-send"
          class="rounded-2xl bg-gray-900 text-white text-sm px-4 py-2 active:scale-95 transition">
          →
        </button>
      </div>
    </div>
  `;
}

function renderMemberConsult(activePatient, member) {
  const urgentStatus = member.consult?.urgent || "none";
  const prevStatus = member.consult?.prev || "none";
  const isPatient = state.mode === "patient";

  function statusLabel(st) {
    if (st === "none") return "нет";
    if (st === "pending") return "ожидание";
    if (st === "active") return "активна";
    return st;
  }

  const phone = activePatient ? activePatient.phone : "";
  const baseUrgent = `URGENT • ${phone} • ${member.name}`;
  const basePrev = `PREV • ${phone} • ${member.name}`;

  function actionsBlock(text, type) {
    if (!isPatient) {
      return `
        <div class="mt-3 text-xs text-gray-500">
          В режиме врача здесь только просмотр. Подтверждение оплаты — в разделе «Заявки на оплату».
        </div>
      `;
    }
    return `
      <div class="mt-3 grid grid-cols-2 gap-2">
        <button data-action="copy-text" data-text="${escapeAttr(text)}"
          class="px-3 py-2 rounded-2xl bg-gray-100 text-sm active:scale-95 transition">
          Скопировать
        </button>
        <button data-action="consult-pay" data-type="${type}"
          class="px-3 py-2 rounded-2xl bg-gray-900 text-white text-sm active:scale-95 transition">
          Оплачено
        </button>
      </div>
    `;
  }

  return `
    <div class="space-y-3">
      <div class="bg-white rounded-2xl border border-gray-200 p-4 text-sm">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="font-semibold text-gray-900">💬 Срочная консультация</div>
            <div class="text-xs text-gray-600 mt-1">Приоритетный ответ</div>
          </div>
          <div class="text-xs text-gray-600">
            Статус: <b>${statusLabel(urgentStatus)}</b>
          </div>
        </div>

        <div class="mt-3 text-sm text-gray-700">
          Перевод на номер: <b>+7 (999) 000-00-00</b>
        </div>
        <div class="text-xs text-gray-600 mt-1">
          Комментарий: <b>${escapeHtml(baseUrgent)}</b>
        </div>

        ${actionsBlock(baseUrgent, "urgent")}
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4 text-sm">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="font-semibold text-gray-900">🧠 Превентивная консультация</div>
            <div class="text-xs text-gray-600 mt-1">Разбор анкеты + план</div>
          </div>
          <div class="text-xs text-gray-600">
            Статус: <b>${statusLabel(prevStatus)}</b>
          </div>
        </div>

        <div class="mt-3 text-sm text-gray-700">
          Перевод на номер: <b>+7 (999) 000-00-00</b>
        </div>
        <div class="text-xs text-gray-600 mt-1">
          Комментарий: <b>${escapeHtml(basePrev)}</b>
        </div>

        ${actionsBlock(basePrev, "prev")}
      </div>
    </div>
  `;
}

function renderMember(activePatient, member) {
  if (!activePatient || !member) {
    return `<div class="p-4 text-sm text-gray-700">Член семьи не найден</div>`;
  }

  const tabs = [
    { id: "overview", label: "Обзор" },
    { id: "anketa", label: "Анкета" },
    { id: "labs", label: "Анализы" },
    { id: "chat", label: "Чат" },
    { id: "consult", label: "Консультации" },
  ];

  const tabsHtml = tabs
    .map((t) => {
      const active = state.memberTab === t.id;
      return `
        <button data-action="change-member-tab" data-tab="${t.id}"
          class="px-3 py-1.5 rounded-2xl text-sm ${
            active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          } active:scale-95 transition">
          ${t.label}
        </button>
      `;
    })
    .join("");

  let content = "";
  if (state.memberTab === "overview") content = renderMemberOverview(member);
  else if (state.memberTab === "anketa") content = renderMemberAnketa(member);
  else if (state.memberTab === "labs") content = renderMemberLabs(member);
  else if (state.memberTab === "chat") content = renderMemberChat(member);
  else if (state.memberTab === "consult")
    content = renderMemberConsult(activePatient, member);

  const backBtn =
  state.mode === "doctor"
    ? `<button data-action="doctor-back-to-patient"
        class="px-3 py-1.5 rounded-2xl bg-gray-100 text-sm text-gray-800 active:scale-95 transition">
        ← Назад
      </button>`
    : "";

 const isChat = state.memberTab === "chat";

return `
  <div class="p-4 ${isChat ? "h-full flex flex-col min-h-0 space-y-4" : "space-y-4"}">
    <div class="${isChat ? "shrink-0 flex items-start justify-between gap-3" : "flex items-start justify-between gap-3"}">
      ${backBtn}
      <div class="text-right">
        <div class="font-semibold text-gray-900 text-sm">${escapeHtml(member.name)}</div>
        <div class="text-xs text-gray-600">
          ${escapeHtml(member.relation)} • ${escapeHtml(fmtMemberMeta(member))}
        </div>
        <div class="text-xs text-gray-500 mt-1">
          Режим: ${state.mode === "doctor" ? "врач" : "пациент"}
        </div>
      </div>
    </div>

    <div class="${isChat ? "shrink-0 flex gap-2 overflow-x-auto pb-1" : "flex gap-2 overflow-x-auto pb-1"}">
      ${tabsHtml}
    </div>

    <div class="${isChat ? "flex-1 min-h-0" : ""}">
      ${content}
    </div>
  </div>
`;
}

function renderDoctor() {
  const patients = state.patients || [];
  const selected =
    patients.find((p) => p.id === state.doctorActivePatientId) ||
    patients[0] ||
    null;

  const view = state.doctorView || "patients";

  const patientsHtml = patients
    .map((p) => {
      const active = selected && p.id === selected.id;
      return `
        <button data-action="doctor-select-patient" data-patient-id="${p.id}"
          class="w-full text-left px-3 py-2 rounded-2xl border ${
            active
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          } active:scale-95 transition">
          <div class="font-semibold text-sm">${escapeHtml(p.name)}</div>
          <div class="text-xs ${
            active ? "text-gray-200" : "text-gray-600"
          }">${escapeHtml(p.phone)}</div>
        </button>
      `;
    })
    .join("");

  // ✅ Режим 1: список пациентов
  if (view === "patients") {
    return `
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
          <button data-action="doctor-exit"
            class="px-3 py-1.5 rounded-2xl bg-gray-100 text-sm text-gray-800 active:scale-95 transition">
            ← Выйти
          </button>
          <div class="text-right text-xs text-gray-600">
            Кабинет врача • статус: <b>${state.doctorStatus === "online" ? "онлайн" : "оффлайн"}</b>
          </div>
        </div>

        <div class="bg-white rounded-2xl border border-gray-200 p-4">
          <div class="font-semibold text-gray-900 mb-2">Пациенты</div>
          <div class="space-y-2">
            ${patientsHtml}
          </div>
          <div class="text-xs text-gray-500 mt-2">
            Нажмите пациента — откроется семья/анкеты (остальные скроются)
          </div>
        </div>
      </div>
    `;
  }

  // ✅ Режим 2: выбранный пациент (скрываем остальных)
  const pending = (state.paymentRequests || []).filter(
    (r) => r.status === "pending" && r.patientId === selected?.id
  );

  const reqHtml =
    pending.length === 0
      ? `<div class="text-sm text-gray-600">Нет заявок</div>`
      : pending
          .map((r) => {
            const p = patients.find((x) => x.id === r.patientId);
            const m = p?.members?.find((x) => x.id === r.memberId);
            const label = r.type === "urgent" ? "Срочная" : "Превентивная";
            return `
              <div class="bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm">
                <div class="font-semibold text-gray-900">
                  ${escapeHtml(p?.name || "Пациент")} • ${label} • ${escapeHtml(m?.name || "")}
                </div>
                <div class="text-xs text-gray-600 mt-0.5">${escapeHtml(p?.phone || "")}</div>
                <div class="text-[11px] text-gray-500 mt-0.5">
                  ${new Date(r.createdAt).toLocaleString()}
                </div>
                <div class="mt-2 flex gap-2">
                  <button data-action="doctor-confirm-pay" data-id="${r.id}" data-ok="1"
                    class="px-3 py-1.5 rounded-2xl bg-gray-900 text-white text-xs active:scale-95 transition">
                    Подтв.
                  </button>
                  <button data-action="doctor-confirm-pay" data-id="${r.id}" data-ok="0"
                    class="px-3 py-1.5 rounded-2xl bg-gray-100 text-xs active:scale-95 transition">
                    Откл.
                  </button>
                </div>
              </div>
            `;
          })
          .join("");

  const family = selected?.members || [];
  const familyHtml = family
    .map((m) => {
      const labsCount = Object.values(m.labs || {}).reduce(
        (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
        0
      );
      const ank = m.anketa ? "есть" : "нет";
      return `
        <button data-action="doctor-open-member" data-member-id="${m.id}" data-patient-id="${selected.id}"
          class="w-full text-left px-3 py-2 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 active:scale-95 transition">
          <div class="flex justify-between gap-3">
            <div>
              <div class="font-semibold text-gray-900 text-sm">
                ${escapeHtml(m.name)}
                <span class="text-xs text-gray-500">(${escapeHtml(m.relation || "член семьи")})</span>
              </div>
              <div class="text-xs text-gray-600">${escapeHtml(fmtMemberMeta(m))}</div>
            </div>
            <div class="text-[11px] text-gray-600 text-right">
              Анкета: <b>${ank}</b><br/>
              Файлы: <b>${labsCount}</b>
            </div>
          </div>
        </button>
      `;
    })
    .join("");

  return `
    <div class="p-4 space-y-4">
      <div class="flex items-center justify-between">
        <button data-action="doctor-back-patients"
          class="px-3 py-1.5 rounded-2xl bg-gray-100 text-sm text-gray-800 active:scale-95 transition">
          ← Все пациенты
        </button>
        <div class="text-right text-xs text-gray-600">
          ${escapeHtml(selected?.name || "")} • ${escapeHtml(selected?.phone || "")}
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4">
        <div class="font-semibold text-gray-900 mb-2">Заявки на оплату</div>
        <div class="space-y-2">${reqHtml}</div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-4">
        <div class="font-semibold text-gray-900 mb-2">Семья пациента</div>
        <div class="space-y-2">${familyHtml}</div>
      </div>
    </div>
  `;
}

  function renderPage(activePatient, member) {
  if (state.page === "home") return renderHome();
  if (state.page === "family") return renderFamily(activePatient);
  if (state.page === "member") return renderMember(activePatient, member);
  if (state.page === "doctor") return renderDoctor();
  return `<div class="p-4 text-sm text-gray-700">Неизвестная страница</div>`;
}

function renderBottomNav() {
  const inDoctorMode = state.mode === "doctor";

  let label = "🏠 Главный экран";
  let target = "home";

  if (inDoctorMode) {
    if (state.page === "doctor") {
      label = "👤 В профиль пациента";
      target = "family";
    } else {
      label = "🛡️ Кабинет врача";
      target = "doctor";
    }
  } else {
    const onHome = state.page === "home";
    label = onHome ? "👤 Мой профиль" : "🏠 Главный экран";
    target = onHome ? "family" : "home";
  }

  return `
    <div class="border-t border-gray-200 bg-white px-4 pt-3"
         style="padding-bottom: calc(env(safe-area-inset-bottom) + 12px);">
      <button data-action="go-page" data-page="${target}"
        class="w-full rounded-2xl bg-gray-900 text-white text-sm py-3 active:scale-95 transition">
        ${label}
      </button>
    </div>
  `;
}

function renderModals(activePatient, member) {
  let html = "";
   // ✅ Модалка регистрации (создание профиля пациента)
  if (state.uiRegisterOpen && state.mode === "patient") {
    html += `
      <div class="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-end sm:items-center justify-center"
           style="height: calc(var(--vh, 1vh) * 100);">
        <div class="bg-white w-full max-w-md sm:rounded-3xl overflow-hidden shadow-2xl"
             style="max-height: calc(var(--vh, 1vh) * 100);">

          <div class="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div>
              <div class="font-semibold text-gray-900">Регистрация</div>
              <div class="text-xs text-gray-500">Создайте профиль пациента</div>
            </div>
            <button data-action="close-modal" data-modal="register"
              class="px-2 py-1 rounded-xl bg-gray-100 active:scale-95 transition">✕</button>
          </div>

          <div class="p-4 space-y-3">
            <div>
              <div class="text-xs text-gray-500">ФИО</div>
              <input id="regName" type="text"
                placeholder="Например: Иван Иванов"
                class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
            </div>

            <div>
              <div class="text-xs text-gray-500">Телефон</div>
              <input id="regPhone" type="tel"
                placeholder="+7 999 123-45-67"
                class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              <div class="text-[11px] text-gray-400 mt-1">Можно в любом формате — сохранится как ввели.</div>
            </div>

            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-3 text-sm text-gray-700">
              После создания профиля вы сможете добавить членов семьи и заполнить анкеты.
            </div>
          </div>

          <div class="p-4 border-t border-gray-200 bg-white">
            <button data-action="save-register"
              class="w-full rounded-2xl bg-gray-900 text-white text-sm py-2.5 active:scale-95 transition">
              Создать профиль
            </button>
          </div>

        </div>
      </div>
    `;
  }
  
  if (state.uiAddMemberOpen && state.mode === "patient") {
    html += `
      <div class="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-3xl w-full max-w-md mx-4 mb-4 sm:mb-0 p-4 space-y-3">
          <div class="flex items-center justify-between mb-1">
            <div>
              <div class="font-semibold text-gray-900">Добавить члена семьи</div>
              <div class="text-xs text-gray-500">Добавление внутри текущего пациента</div>
            </div>
            <button data-action="close-modal" data-modal="add-member"
              class="px-2 py-1 rounded-xl bg-gray-100">✕</button>
          </div>
          <div class="space-y-3 text-sm">
            <div>
              <div class="text-xs text-gray-500">Кто это?</div>
              <select id="addRelation"
                class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                <option value="я">Я</option>
                <option value="жена">Жена</option>
                <option value="муж">Муж</option>
                <option value="ребёнок">Ребёнок</option>
                <option value="мама">Мама</option>
                <option value="папа">Папа</option>
                <option value="другое">Другое</option>
              </select>
            </div>
            <div>
              <div class="text-xs text-gray-500">Имя</div>
              <input id="addName" type="text"
                class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                placeholder="Например: Марк" />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <div class="text-xs text-gray-500">Дата рождения</div>
                <input id="addDob" type="date"
                  class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
              </div>
              <div>
                <div class="text-xs text-gray-500">Пол</div>
                <select id="addSex"
                  class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                  <option value="f">Ж</option>
                  <option value="m">М</option>
                </select>
              </div>
            </div>
          </div>
          <button data-action="save-add-member"
            class="w-full mt-2 rounded-2xl bg-gray-900 text-white text-sm py-2.5 active:scale-95 transition">
            Сохранить
          </button>
        </div>
      </div>
    `;
  }

  if (state.uiAnketaOpen && member && state.mode === "patient") {
  const tplKey = (member.anketa?.templateKey) || anketaKeyForDob(member.dob);
  const tpl = ANKETA_TEMPLATES[tplKey];
  const answers = member.anketa?.answers || {};

  function fieldHtml(f) {
    const id = "ank_" + f.id;
    const val = answers[f.id] ?? "";
    const label = `<div class="text-xs text-gray-500">${escapeHtml(f.label)}</div>`;

    if (f.type === "textarea") {
      return `
        <div>
          ${label}
          <textarea id="${id}" rows="${f.rows || 3}"
            class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm">${escapeHtml(val)}</textarea>
        </div>
      `;
    }

    if (f.type === "select") {
      return `
        <div>
          ${label}
          <select id="${id}"
            class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
            ${(f.options || []).map(opt => `
              <option value="${escapeAttr(opt)}" ${String(val) === String(opt) ? "selected" : ""}>${escapeHtml(opt)}</option>
            `).join("")}
          </select>
        </div>
      `;
    }

    // text/number
    return `
      <div>
        ${label}
        <input id="${id}" type="${f.type === "number" ? "number" : "text"}"
          value="${escapeAttr(val)}"
          placeholder="${escapeAttr(f.placeholder || "")}"
          class="mt-1 w-full rounded-2xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
      </div>
    `;
  }

  const sectionsHtml = (tpl?.sections || []).map(sec => `
    <div class="border border-gray-200 rounded-2xl p-3 bg-white">
      <div class="font-semibold text-gray-900 text-sm mb-2">${escapeHtml(sec.title)}</div>
      <div class="space-y-3">
        ${(sec.fields || []).map(fieldHtml).join("")}
      </div>
    </div>
  `).join("");

  html += `
  <div class="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-stretch sm:items-center sm:justify-center">
    <div class="bg-white w-full h-full sm:h-auto sm:max-h-screen sm:max-w-md sm:rounded-3xl overflow-y-auto p-4 space-y-3">
        <div class="flex items-center justify-between mb-1">
          <div>
            <div class="font-semibold text-gray-900">${escapeHtml(tpl?.title || "Анкета")}</div>
            <div class="text-xs text-gray-500">
              ${escapeHtml(member.name)} · ${escapeHtml(member.dob)} · ${member.sex === "m" ? "М" : "Ж"}
            </div>
          </div>
          <button data-action="close-modal" data-modal="anketa"
            class="px-2 py-1 rounded-xl bg-gray-100">✕</button>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-3">
          <div class="font-semibold text-gray-900 text-sm mb-2">Общая информация</div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <div class="text-xs text-gray-500">Рост (см)</div>
              <input id="ank_height_cm" type="number"
                value="${escapeAttr(answers.height_cm || "")}"
                class="mt-1 w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm" />
            </div>
            <div>
              <div class="text-xs text-gray-500">Вес (кг)</div>
              <input id="ank_weight_kg" type="number"
                value="${escapeAttr(answers.weight_kg || "")}"
                class="mt-1 w-full rounded-2xl border border-gray-300 bg-white px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div class="space-y-3">
          ${sectionsHtml}
        </div>

        <button data-action="save-anketa"
          class="w-full mt-2 rounded-2xl bg-gray-900 text-white text-sm py-2.5 active:scale-95 transition">
          Сохранить
        </button>
      </div>
    </div>
  `;
}

  return html;
}

function renderToast() {
  if (!state.toast) return "";
  return `
    <div class="fixed inset-x-0 bottom-6 flex justify-center z-50 pointer-events-none">
      <div class="px-4 py-2 rounded-2xl bg-gray-900 text-white text-sm shadow-lg pointer-events-auto">
        ${escapeHtml(state.toast)}
      </div>
    </div>
  `;
}

function render() {
  const app = document.getElementById("app");
  if (!app) return;

  const activePatient = getActivePatient();
  const member = getActiveMember();

  // ✅ врач онлайн всегда, когда mode === doctor (а не только на странице doctor)
  state.doctorStatus = state.mode === "doctor" ? "online" : "offline";

  // ✅ запрещаем скролл body, чтобы не "уезжала" нижняя кнопка и чат
  document.documentElement.style.height = "100%";
  document.body.style.height = "100%";
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  app.innerHTML = `
    <div class="bg-gray-100 flex justify-center"
         style="height: calc(var(--vh, 1vh) * 100); overflow:hidden;">
      <div class="w-full max-w-md bg-white shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
           style="height: 100%;">
        ${renderTopBar()}

          <div class="flex-1 min-h-0 ${state.page === "member" && state.memberTab === "chat" ? "overflow-hidden" : "overflow-y-auto overscroll-contain"}">
          ${renderPage(activePatient, member)}
        </div>

        <div class="shrink-0">
          ${renderBottomNav()}
        </div>
      </div>

      ${renderModals(activePatient, member)}
      ${renderToast()}
    </div>
  `;
}

// === Логика действий ===
function handleSaveAddMember() {
    if (state.mode !== "patient") {
    showToast("Добавлять членов семьи может только пациент");
    return;
  }

  const relationEl = document.getElementById("addRelation");
  const nameEl = document.getElementById("addName");
  const dobEl = document.getElementById("addDob");
  const sexEl = document.getElementById("addSex");
  if (!relationEl || !nameEl || !dobEl || !sexEl) return;

  const name = nameEl.value.trim();
  const dob = dobEl.value;
  const sex = sexEl.value || "f";
  const relation = relationEl.value || "член семьи";

  if (!name || !dob) {
    showToast("Введите имя и дату рождения");
    return;
  }

  const patient = getActivePatient();
  if (!patient) return;

  const newM = defaultMember({ name, dob, sex, relation });
  patient.members.unshift(newM);
  patient.selectedMemberId = newM.id;

  state.memberTab = "anketa";
  state.uiAddMemberOpen = false;

  saveState();
  render();
  showToast("Член семьи добавлен");
}

function handleSaveRegister() {
    if (state.mode !== "patient") {
    showToast("Регистрация доступна только пациенту");
    return;
  }
  const nameEl = document.getElementById("regName");
  const phoneEl = document.getElementById("regPhone");
  if (!nameEl || !phoneEl) return;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  if (!name || !phone) {
    showToast("Введите ФИО и телефон");
    return;
  }

  const p = {
    id: uid("p"),
    name,
    phone,
    createdAt: new Date().toISOString(),
    members: [],
    selectedMemberId: null,
  };

  state.patients = [p];
  state.activePatientId = p.id;
  state.doctorActivePatientId = p.id;

  state.uiRegisterOpen = false;
  state.page = "family";

  saveState();
  render();
  showToast("Профиль создан");
}

function handleDeleteAccount() {
    if (state.mode !== "patient") {
    showToast("Удалять аккаунт может только пациент");
    return;
  }
  const ok = window.confirm("Удалить аккаунт пациента полностью? (члены семьи и анкеты тоже удалятся)");
  if (!ok) return;

  state.patients = [];
  state.activePatientId = null;
  state.doctorActivePatientId = null;

  state.page = "home";
  state.memberTab = "overview";

  state.uiAddMemberOpen = false;
  state.uiAnketaOpen = false;
  state.uiRegisterOpen = false;

  saveState();
  render();
  showToast("Аккаунт удалён");
}

function handleDeleteAnketa() {
    if (state.mode !== "patient") {
    showToast("Удаление анкеты доступно только пациенту");
    return;
  }
  const m = getActiveMember();
  if (!m) return;

  const ok = window.confirm("Удалить анкету? Данные анкеты будут очищены.");
  if (!ok) return;

  m.anketa = null;
  saveState();
  render();
  showToast("Анкета удалена");
}

function handleSaveAnketa() {
  if (state.mode !== "patient") {
    showToast("Анкету может заполнять только пациент");
    return;
  }

  const member = getActiveMember();
  if (!member) return;

  const tplKey = (member.anketa?.templateKey) || anketaKeyForDob(member.dob);
  const tpl = ANKETA_TEMPLATES[tplKey];
  if (!tpl) {
    showToast("Шаблон анкеты не найден");
    return;
  }

  const answers = {};

  // Общая инфа
  const h = document.getElementById("ank_height_cm");
  const w = document.getElementById("ank_weight_kg");
  answers.height_cm = h ? String(h.value || "").trim() : "";
  answers.weight_kg = w ? String(w.value || "").trim() : "";

  // Поля по шаблону
  (tpl.sections || []).forEach(sec => {
    (sec.fields || []).forEach(f => {
      const el = document.getElementById("ank_" + f.id);
      answers[f.id] = el ? String(el.value || "").trim() : "";
    });
  });

  member.anketa = {
    templateKey: tplKey,
    answers,
    updatedAt: new Date().toISOString(),
  };

  state.uiAnketaOpen = false;
  saveState();
  render();
  showToast("Анкета сохранена");
}

function buildAnketaPrintHtml(patient, member) {
  const tplKey = member.anketa?.templateKey || anketaKeyForDob(member.dob);
  const tpl = ANKETA_TEMPLATES[tplKey];
  const a = member.anketa?.answers || {};

  const head = `
  <html><head><meta charset="utf-8"/>
  <title>${escapeHtml(tpl?.title || "Анкета")}</title>
  <style>
    body{ font-family: Arial, sans-serif; padding:24px; }
    h1{ font-size:18px; margin:0 0 10px; }
    .meta{ font-size:12px; color:#444; margin-bottom:14px; }
    .sec{ margin-top:14px; padding-top:10px; border-top:1px solid #ddd; }
    .sec h2{ font-size:14px; margin:0 0 8px; }
    .row{ margin:6px 0; }
    .q{ font-size:12px; color:#111; font-weight:700; margin-bottom:2px; }
    .v{ font-size:12px; color:#111; white-space:pre-wrap; }
  </style></head><body>
  `;

  const meta = `
    <h1>${escapeHtml(tpl?.title || "Анкета")}</h1>
    <div class="meta">
      Пациент: <b>${escapeHtml(patient?.name || "—")}</b> (${escapeHtml(patient?.phone || "—")})<br/>
      Член семьи: <b>${escapeHtml(member.name)}</b>, ${escapeHtml(member.dob)}, ${member.sex === "m" ? "М" : "Ж"}<br/>
      Рост/вес: <b>${escapeHtml(a.height_cm || "—")}</b> см / <b>${escapeHtml(a.weight_kg || "—")}</b> кг<br/>
      Обновлено: ${escapeHtml(new Date(member.anketa.updatedAt).toLocaleString())}
    </div>
  `;

  const sections = (tpl?.sections || []).map(sec => {
    const rows = (sec.fields || []).map(f => `
      <div class="row">
        <div class="q">${escapeHtml(f.label)}</div>
        <div class="v">${escapeHtml(a[f.id] || "—")}</div>
      </div>
    `).join("");

    return `<div class="sec"><h2>${escapeHtml(sec.title)}</h2>${rows}</div>`;
  }).join("");

  const tail = `</body></html>`;
  return head + meta + sections + tail;
}

function handleExportAnketa() {
  const patient = getActivePatient();
  const member = getActiveMember();
  if (!patient || !member || !member.anketa) {
    showToast("Анкета не заполнена");
    return;
  }

  const html = buildAnketaPrintHtml(patient, member);
  const w = window.open("", "_blank");
  if (!w) {
    showToast("Разреши всплывающие окна для экспорта PDF");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.focus();
  w.print(); // в печати выбираешь "Save as PDF"
}

function handleChatSend() {
  const input = document.getElementById("chatInput");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const member = getActiveMember();
  if (!member) return;

  const author = state.mode === "doctor" ? "doctor" : "patient";

  member.chats = member.chats || [];
  member.chats.push({
    from: author,
    text,
    ts: Date.now(),
  });

  input.value = "";
  saveState();
  render();

    setTimeout(() => {
    const list = document.getElementById("chatList");
    if (list) list.scrollTop = list.scrollHeight;
  }, 0);
  
  // автоответ врача только если пишет пациент
  if (state.mode === "patient") {
    setTimeout(() => {
      const m2 = getActiveMember();
      if (!m2) return;
      m2.chats = m2.chats || [];
      m2.chats.push({
        from: "doctor",
        text: "Принял(а). Отвечу в ближайшее время 👌",
        ts: Date.now(),
      });
      saveState();
      render();
    }, 400);
  }
}

function handleConsultPay(type) {
    if (state.mode !== "patient") {
    showToast("Отметить оплату может только пациент");
    return;
  }
  const member = getActiveMember();
  const patient = getActivePatient();
  if (!member || !patient) return;

  const existing = (state.paymentRequests || []).find(
    (r) =>
      r.patientId === patient.id &&
      r.memberId === member.id &&
      r.type === type &&
      r.status === "pending"
  );
  if (existing) {
    showToast("Заявка уже отправлена");
    return;
  }

  member.consult = member.consult || { urgent: "none", prev: "none" };
  member.consult[type] = "pending";

  const req = {
    id: uid("pay"),
    patientId: patient.id,
    memberId: member.id,
    type,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  state.paymentRequests = [req, ...(state.paymentRequests || [])];

  saveState();
  render();
  showToast("Заявка отправлена врачу");
}

function handleDoctorConfirmPay(id, ok) {
    if (state.mode !== "doctor") {
    showToast("Доступно только врачу");
    return;
  }
  const r = (state.paymentRequests || []).find((x) => x.id === id);
  if (!r || r.status !== "pending") return;

  r.status = ok ? "confirmed" : "rejected";

  const patient = (state.patients || []).find((p) => p.id === r.patientId);
  const member = patient?.members?.find((m) => m.id === r.memberId);
  if (member) {
    member.consult = member.consult || { urgent: "none", prev: "none" };
    const label = r.type === "urgent" ? "Срочная" : "Превентивная";
    if (ok) {
      member.consult[r.type] = "active";
    } else {
      member.consult[r.type] = "none";
    }
    member.chats = member.chats || [];
    member.chats.push({
      from: "doctor",
      text: ok
        ? `Подтвердил(а) оплату: ${label} ✅ Доступ открыт.`
        : `Оплата не найдена. Заявка отклонена (${label}).`,
      ts: Date.now(),
    });
  }

  saveState();
  render();
  showToast(ok ? "Подтверждено" : "Отклонено");
}

function handleCopyText(text) {
  if (!navigator.clipboard) {
    showToast("Копирование недоступно");
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => showToast("Скопировано"))
    .catch(() => showToast("Не удалось скопировать"));
}

function openDoctorLogin() {
  const pin = window.prompt("PIN врача");
  if (!pin) return;
  if (pin === DOCTOR_PIN) {
    // включаем режим врача
    state.mode = "doctor";
    if (!state.doctorStatus) {
      state.doctorStatus = "online"; // по умолчанию онлайн
    }
    state.page = "doctor";
    saveState();
    render();
    showToast("Вход врача");
  } else {
    showToast("Неверный PIN");
  }
}

function handleBrandTap() {
  const now = Date.now();
  brandTapTimes = brandTapTimes.filter((t) => now - t < 900);
  brandTapTimes.push(now);
  if (brandTapTimes.length >= 4) {
    brandTapTimes = [];
    openDoctorLogin();
  }
}

function handleResetDemo() {
    if (state.mode !== "patient") {
    showToast("Сброс доступен только пациенту");
    return;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
  state = initialState();
  render();
  showToast("Демо данные сброшены");
}

function handleSelectMember(memberId) {
  const patient = getActivePatient();
  if (!patient) return;
  patient.selectedMemberId = memberId;
  state.page = "member";
  state.memberTab = "overview";
  saveState();
  render();
}

function handleChangeMemberTab(tab) {
  state.memberTab = tab;
  saveState();
  render();
  if (tab === "chat") {
  setTimeout(() => {
    const list = document.getElementById("chatList");
    if (list) list.scrollTop = list.scrollHeight;
  }, 0);
}
}

// === Глобальный обработчик кликов ===
document.addEventListener("click", function (e) {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const action = el.dataset.action;

  switch (action) {
      case "reset-demo":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  handleResetDemo();
  break;
    case "go-page": {
      const page = el.dataset.page;
      if (!page) return;

      // если профиля нет — вместо перехода в "family" открываем регистрацию
if (page === "family" && state.mode !== "doctor" && !getActivePatient()) {
  state.uiRegisterOpen = true;
  render();
  showToast("Создайте профиль (регистрация)");
  break;
}
      
      state.page = page;
      if (page === "family" && !getActivePatient() && state.patients[0]) {
        state.activePatientId = state.patients[0].id;
      }
      saveState();
      render();
      break;
    }
   case "open-add-member":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  state.uiAddMemberOpen = true;
  render();
  break;
    case "close-modal": {
      const modal = el.dataset.modal;
      if (modal === "add-member") state.uiAddMemberOpen = false;
      else if (modal === "anketa") state.uiAnketaOpen = false;
      else if (modal === "register") state.uiRegisterOpen = false;
      render();
      break;
    }
    case "save-add-member":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  handleSaveAddMember();
  break;
   case "save-register":
      handleSaveRegister();
      break;
    case "select-member":
      handleSelectMember(el.dataset.memberId);
      break;
    case "change-member-tab":
      handleChangeMemberTab(el.dataset.tab);
      break;
    case "open-anketa":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  state.uiAnketaOpen = true;
  render();
  break;
  state.uiAnketaOpen = true;
      case "delete-anketa":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  handleDeleteAnketa();
  break;
    case "save-anketa":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  handleSaveAnketa();
  break;
    case "chat-send":
      handleChatSend();
      break;
    case "consult-pay":
  if (state.mode !== "patient") {
    showToast("Оплата отмечается только пациентом");
    break;
  }
  handleConsultPay(el.dataset.type);
  break;
      case "export-anketa":
  if (state.mode !== "doctor") { showToast("Только врач"); break; }
  handleExportAnketa();
  break;
    case "copy-text":
      handleCopyText(el.dataset.text || "");
      break;
    case "brand-tap":
      handleBrandTap();
      break;
      case "delete-account":
  if (state.mode !== "patient") { showToast("Только пациент"); break; }
  handleDeleteAccount();
  break;
      
    case "doctor-select-patient":
  if (state.mode !== "doctor") { showToast("Только врач"); break; }
  state.doctorActivePatientId = el.dataset.patientId;
  state.doctorView = "patient";
  saveState();
  render();
  break;

      case "doctor-back-patients":
  if (state.mode !== "doctor") { showToast("Только врач"); break; }
  state.doctorView = "patients";
  saveState();
  render();
  break;

      case "doctor-back-to-patient":
  if (state.mode !== "doctor") { showToast("Только врач"); break; }
  state.page = "doctor";
  state.doctorView = "patient";
  saveState();
  render();
  break;

          case "doctor-open-member": {
      if (state.mode !== "doctor") { showToast("Только врач"); break; }
      const pid = el.dataset.patientId;
      const mid = el.dataset.memberId;
      const p = (state.patients || []).find((pp) => pp.id === pid);
      if (p) {
        p.selectedMemberId = mid;
        state.activePatientId = pid;
        state.page = "member";
        state.memberTab = "anketa";
        saveState();
        render();
        showToast("Открыт профиль члена семьи");
      }
      break;
    }
    case "doctor-confirm-pay": {
      if (state.mode !== "doctor") { showToast("Только врач"); break; }
      const id = el.dataset.id;
      const ok = el.dataset.ok === "1";
      handleDoctorConfirmPay(id, ok);
      break;
    }
          case "doctor-exit":
  if (state.mode !== "doctor") { showToast("Только врач"); break; }
  state.mode = "patient";
  state.page = "family";
  state.doctorView = "patients";
  if (!getActivePatient() && state.patients[0]) state.activePatientId = state.patients[0].id;
  saveState();
  render();
  showToast("Вы вышли из кабинета врача");
  break;

  }
});

function setAppVh() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
window.addEventListener("resize", setAppVh);
setAppVh();

// === Старт ===
setAppVh();

state = loadState();
const allowed = ["home", "family", "member", "doctor"];
if (!allowed.includes(state.page)) state.page = "home";

render();
