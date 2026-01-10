"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Title } from "./ui/title";

interface Props {
  className?: string;
}

/* =======================
   TYPES
======================= */
type MaterialItem = { label: string; rate: number };

type AreaConfig = {
  kind: "area";
  label: string;
  rate?: number; // для full
  materials?: Record<string, MaterialItem>; // floors/walls/ceilings
};

type CountConfig = {
  kind: "count";
  label: string;
  unitLabel: string;
  qtyLabel: string;
  rate: number;
};

type PriceConfigItem = AreaConfig | CountConfig;

/* =======================
   PRICE CONFIG
   kind:
   - "area"  => rate * area(m²) + areaCoeff
   - "count" => rate * qty(шт)  (areaCoeff НЕ применяется)
======================= */
const priceConfig = {
  floors: {
    kind: "area",
    label: "Демонтаж полов",
    materials: {
      concrete: { label: "Бетонная стяжка", rate: 1200 },
      tile: { label: "Плитка / керамогранит", rate: 680 },
      wood: { label: "Деревянный пол / лаги", rate: 800 },
      laminate: { label: "Ламинат / паркет", rate: 400 },
    },
  },
  walls: {
    kind: "area",
    label: "Демонтаж стен и перегородок",
    materials: {
      gkl: { label: "ГКЛ / легкие перегородки", rate: 500 },
      blocks: { label: "Газобетон / ПГП", rate: 700 },
      brick_half: { label: "Кирпич 1/2", rate: 1800 },
      brick_full: { label: "Кирпич 1", rate: 3000 },
      concrete: { label: "Бетон / ЖБ", rate: 4000 },
    },
  },
  ceilings: {
    kind: "area",
    label: "Демонтаж потолков",
    materials: {
      gkl: { label: "ГКЛ", rate: 480 },
      armstrong: { label: "Армстронг / рейка", rate: 220 },
      plaster: { label: "Штукатурка / краска", rate: 500 },
      stretch: { label: "Натяжной потолок", rate: 170 },
    },
  },

  // считаем по штукам
  openings: {
    kind: "count",
    label: "Демонтаж окон, дверей",
    unitLabel: "шт",
    qtyLabel: "Количество (шт)",
    rate: 850,
  },
  sanitary: {
    kind: "count",
    label: "Демонтаж сантехники",
    unitLabel: "шт",
    qtyLabel: "Количество (шт)",
    rate: 2200,
  },
  electric: {
    kind: "count",
    label: "Демонтаж электрики",
    unitLabel: "шт",
    qtyLabel: "Количество (шт)",
    rate: 600,
  },

  full: {
    kind: "area",
    label: "Комплексный демонтаж",
    rate: 1900,
  },
} satisfies Record<string, PriceConfigItem>;

type WorkType = keyof typeof priceConfig;

const objectTypes = [
  { id: "apartment", label: "Квартира" },
  { id: "house", label: "Дом" },
  { id: "commercial", label: "Коммерческое помещение" },
  { id: "industrial", label: "Производственное помещение" },
] as const;

type ObjectType = (typeof objectTypes)[number]["id"];

const objectCoeff: Record<ObjectType, number> = {
  apartment: 1,
  house: 1,
  commercial: 1.3,
  industrial: 1.3,
};

const areaCoeff = [
  { min: 5, max: 50, k: 1.3 },
  { min: 51, max: 100, k: 1 },
  { min: 101, max: 200, k: 0.9 },
  { min: 201, max: 500, k: 0.8 },
];

/* =======================
   GARBAGE CONFIG
======================= */
const GARBAGE_BASE = 7000;
const BAG_RATE = 60;

/* =======================
   TYPE GUARDS
======================= */
function hasMaterials(cfg: PriceConfigItem): cfg is AreaConfig & {
  materials: Record<string, MaterialItem>;
} {
  return cfg.kind === "area" && !!cfg.materials;
}

function isCount(cfg: PriceConfigItem): cfg is CountConfig {
  return cfg.kind === "count";
}

/* =======================
   COMPONENT
======================= */
export const Calculator: React.FC<Props> = ({ className }) => {
  const [workType, setWorkType] = useState<WorkType>("floors");
  const [objectType, setObjectType] = useState<ObjectType>("apartment");

  // area
  const [area, setArea] = useState(80);

  // count (шт)
  const [qty, setQty] = useState(1);
  const [qtyDraft, setQtyDraft] = useState<string>("1");

  // garbage
  const [needGarbage, setNeedGarbage] = useState(false);
  const [garbageBagsService, setGarbageBagsService] = useState(false);
  const [garbageFloorDraft, setGarbageFloorDraft] = useState<string>("1");
  const [garbageBagsDraft, setGarbageBagsDraft] = useState<string>("10");

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactData, setContactData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const currentConfig: PriceConfigItem = priceConfig[workType];

  const materialKeys = useMemo(() => {
    if (hasMaterials(currentConfig))
      return Object.keys(currentConfig.materials);
    return [];
  }, [currentConfig]);

  const [material, setMaterial] = useState<string | null>(
    materialKeys[0] ?? null
  );

  // при смене workType — выбрать первый материал (если есть)
  useEffect(() => {
    if (hasMaterials(currentConfig)) {
      const keys = Object.keys(currentConfig.materials);
      setMaterial(keys[0] ?? null);
    } else {
      setMaterial(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workType]);

  // если count — поддерживаем draft
  useEffect(() => {
    if (currentConfig.kind === "count") {
      setQty((p) => (p < 1 ? 1 : p));
      setQtyDraft((p) => (p === "" ? "1" : p));
    }
  }, [currentConfig.kind]);

  // если мусор выключили — сброс допов
  useEffect(() => {
    if (!needGarbage) {
      setGarbageBagsService(false);
      setGarbageFloorDraft("1");
      setGarbageBagsDraft("10");
    }
  }, [needGarbage]);

  // autofocus
  useEffect(() => {
    if (isModalOpen) {
      const t = setTimeout(() => nameInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [isModalOpen]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContactData({ name: "", phone: "" });
    setPolicyAccepted(false);
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      let formatted = cleaned;

      if (cleaned.length > 0) {
        formatted = "+7 ";
        if (cleaned.length > 1) formatted += "(" + cleaned.substring(1, 4);
        if (cleaned.length >= 5) formatted += ") " + cleaned.substring(4, 7);
        if (cleaned.length >= 8) formatted += "-" + cleaned.substring(7, 9);
        if (cleaned.length >= 10) formatted += "-" + cleaned.substring(9, 11);
      }

      setContactData((prev) => ({ ...prev, phone: formatted }));
      return;
    }

    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    if (e.currentTarget.name === "name") {
      phoneInputRef.current?.focus();
      return;
    }
    if (e.currentTarget.name === "phone") {
      void handleSendOrder();
      return;
    }
  };

  // qty +/-
  const incQty = () => {
    const next = qty + 1;
    setQty(next);
    setQtyDraft(String(next));
  };
  const decQty = () => {
    const next = Math.max(1, qty - 1);
    setQty(next);
    setQtyDraft(String(next));
  };

  const { total, steps, garbageExtra, materialLabelForUi } = useMemo(() => {
    let baseRate = 0;
    let matLabel: string | undefined;

    if (hasMaterials(currentConfig)) {
      const materials = currentConfig.materials;
      const key =
        material && material in materials
          ? material
          : Object.keys(materials)[0];

      if (key) {
        baseRate = materials[key].rate;
        matLabel = materials[key].label;
      }
    } else {
      if (currentConfig.kind === "count") {
        baseRate = currentConfig.rate;
      } else {
        baseRate = currentConfig.rate ?? 0;
      }
    }

    const breakdown: string[] = [];
    let sum = 0;

    if (currentConfig.kind === "area") {
      sum = baseRate * area;
      breakdown.push(`${baseRate} ₽/м² × ${area} м²`);
    } else {
      const q = Math.max(1, qty);
      sum = baseRate * q;
      breakdown.push(`${baseRate} ₽/${currentConfig.unitLabel} × ${q}`);
    }

    // коэф объекта
    const objK = objectCoeff[objectType];
    if (objK !== 1) {
      const adjustment = sum * (objK - 1);
      sum *= objK;
      breakdown.push(
        `Коэф. объекта (${objK.toFixed(1)}): ${adjustment.toLocaleString(
          "ru-RU"
        )} ₽`
      );
    }

    // коэф площади — только area
    if (currentConfig.kind === "area") {
      const areaK =
        areaCoeff.find((r) => area >= r.min && area <= r.max)?.k ?? 1;
      if (areaK !== 1) {
        const adjustment = sum * (areaK - 1);
        sum *= areaK;
        breakdown.push(
          `Коэф. площади (${areaK.toFixed(1)}): ${adjustment.toLocaleString(
            "ru-RU"
          )} ₽`
        );
      }
    }

    // мусор
    let garbageAdd = 0;

    if (needGarbage) {
      sum += GARBAGE_BASE;
      garbageAdd += GARBAGE_BASE;
      breakdown.push(
        `Вывоз мусора: + ${GARBAGE_BASE.toLocaleString("ru-RU")} ₽`
      );
    }

    if (needGarbage && garbageBagsService) {
      const bags = Math.max(1, Number(garbageBagsDraft || "1"));
      const floor = Math.max(1, Number(garbageFloorDraft || "1"));
      const bagsCost = bags * BAG_RATE;

      sum += bagsCost;
      garbageAdd += bagsCost;

      breakdown.push(
        `Сбор/спуск/погрузка: ${bags} меш. × ${BAG_RATE} ₽ = ${bagsCost.toLocaleString(
          "ru-RU"
        )} ₽ (этаж ${floor})`
      );
    }

    // минимум
    // if (sum < 5000) {
    //   sum = 5000;
    //   breakdown.push("Минимальная стоимость работ: 5 000 ₽");
    // }

    // округление
    sum = Math.ceil(sum / 100) * 100;

    return {
      total: sum,
      steps: breakdown,
      garbageExtra: garbageAdd,
      materialLabelForUi: matLabel,
    };
  }, [
    currentConfig,
    material,
    area,
    qty,
    objectType,
    needGarbage,
    garbageBagsService,
    garbageFloorDraft,
    garbageBagsDraft,
  ]);

  const handleSendOrder = async () => {
    if (!contactData.name.trim()) {
      alert("Пожалуйста, введите ваше имя");
      nameInputRef.current?.focus();
      return;
    }

    if (!contactData.phone.trim()) {
      alert("Пожалуйста, введите ваш номер телефона");
      phoneInputRef.current?.focus();
      return;
    }

    if (!policyAccepted) {
      alert("Пожалуйста, подтвердите согласие с политикой обработки данных");
      return;
    }

    const phoneDigits = contactData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      alert("Введите корректный номер телефона (10 цифр после +7)");
      phoneInputRef.current?.focus();
      return;
    }

    if (needGarbage && garbageBagsService) {
      const floor = Number(garbageFloorDraft);
      const bags = Number(garbageBagsDraft);
      if (!floor || floor < 1) return alert("Укажите этаж (минимум 1)");
      if (!bags || bags < 1)
        return alert("Укажите количество мешков (минимум 1)");
    }

    setIsSubmitting(true);

    const objectLabel =
      objectTypes.find((o) => o.id === objectType)?.label || "Не указано";

    const sizeLine =
      currentConfig.kind === "area"
        ? `📏 Площадь: ${area} м²\n`
        : `🔢 Количество: ${Math.max(1, qty)} ${currentConfig.unitLabel}\n`;

    const garbageText = needGarbage
      ? `🗑️ Вывоз мусора: Да (+ ${GARBAGE_BASE.toLocaleString("ru-RU")} ₽)\n` +
        (garbageBagsService
          ? `📦 Сбор/спуск/погрузка: Да\n🏢 Этаж: ${Math.max(
              1,
              Number(garbageFloorDraft || "1")
            )}\n🧺 Мешков: ${Math.max(
              1,
              Number(garbageBagsDraft || "1")
            )} × ${BAG_RATE} ₽ = ${(
              Math.max(1, Number(garbageBagsDraft || "1")) * BAG_RATE
            ).toLocaleString("ru-RU")} ₽\n`
          : `📦 Сбор/спуск/погрузка: Нет\n`)
      : `🗑️ Вывоз мусора: Нет\n`;

    const message = `📋 Новая заявка на расчет

👤 Имя: ${contactData.name}
📞 Телефон: ${contactData.phone}

🏠 Объект: ${objectLabel}
🔨 Тип работ: ${currentConfig.label}
${
  materialLabelForUi ? `🧱 Материал: ${materialLabelForUi}\n` : ""
}${sizeLine}${garbageText}
💰 Итоговая стоимость: ${total.toLocaleString("ru-RU")} ₽

📅 ${new Date().toLocaleString("ru-RU")}`;

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Ошибка отправки");

      alert("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
      handleCloseModal();
    } catch (error) {
      console.error("Error sending order:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <section id="calc" className={cn(className)}>
      {/* MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="bg-white rounded-[20px] max-w-md w-full p-8 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              disabled={isSubmitting}
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center">
              Отправить заявку
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ваше имя *
                </label>
                <input
                  ref={nameInputRef}
                  type="text"
                  name="name"
                  value={contactData.name}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--accent-color1) disabled:bg-gray-100"
                  placeholder="Введите ваше имя"
                  disabled={isSubmitting}
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Номер телефона *
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  name="phone"
                  value={contactData.phone}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--accent-color1) disabled:bg-gray-100"
                  placeholder="+7 (XXX) XXX-XX-XX"
                  disabled={isSubmitting}
                  autoComplete="tel"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={policyAccepted}
                    onChange={(e) => setPolicyAccepted(e.target.checked)}
                    disabled={isSubmitting}
                    className="mt-1 h-4 w-4 rounded border-gray-300 accent-(--accent-color1) disabled:opacity-50"
                  />
                  <span className="text-sm text-gray-600 leading-snug">
                    Я соглашаюсь с обработкой персональных данных и принимаю{" "}
                    <a
                      href="/documents/privacy-policy.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="text-(--accent-color1) underline hover:opacity-80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      политику конфиденциальности
                    </a>
                    .
                  </span>
                </label>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleSendOrder}
                  disabled={isSubmitting || !policyAccepted}
                  className="w-full rounded-[15px] py-4 bg-(--accent-color1) text-white text-xl font-semibold hover:bg-(--accent-color2) transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="sm:container mx-auto py-5 px-3">
        <Title
          title="Рассчитайте стоимость работ!"
          className="text-[36px] sm:text-[50px] md:text-[56px] font-semibold mb-5"
        />

        <div className="border border-black rounded-[20px] p-[30px]">
          {/* Тип работ / Материал / Объект */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-6 gap-6">
            {/* Тип работ */}
            <div className="lg:col-span-4">
              <p className="text-2xl font-bold mb-4">Тип работ</p>
              <div className="space-y-3">
                {Object.entries(priceConfig).map(([id, cfg]) => (
                  <label
                    key={id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      className="sr-only peer"
                      checked={workType === (id as WorkType)}
                      onChange={() => setWorkType(id as WorkType)}
                    />
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)">
                      {workType === (id as WorkType) && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)">
                      {cfg.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Материал */}
            {hasMaterials(currentConfig) && materialKeys.length > 0 && (
              <div className="lg:col-span-4">
                <p className="text-2xl font-bold mb-4">Материал</p>
                <div className="space-y-3">
                  {materialKeys.map((id) => (
                    <label
                      key={id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        className="sr-only peer"
                        checked={material === id}
                        onChange={() => setMaterial(id)}
                      />
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)">
                        {material === id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)">
                        {currentConfig.materials[id].label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Объект */}
            <div className="lg:col-span-4">
              <p className="text-2xl font-bold mb-4">Объект</p>
              <div className="space-y-3">
                {objectTypes.map((o) => (
                  <label
                    key={o.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      className="sr-only peer"
                      checked={objectType === o.id}
                      onChange={() => setObjectType(o.id)}
                    />
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)">
                      {objectType === o.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)">
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Размер + мусор */}
          <div className="mb-8 flex flex-col lg:flex-row gap-6">
            {/* Площадь / Кол-во */}
            <div className="flex-2">
              {currentConfig.kind === "area" ? (
                <>
                  <p className="text-2xl font-bold mb-4">Площадь</p>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min={5}
                      max={500}
                      step={5}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--accent-color1)"
                    />
                    <div className="rounded-[13px] bg-(--layer-color) p-6 text-center">
                      <span className="text-2xl font-bold">
                        {area} <small>м²</small>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold mb-4">
                    {currentConfig.qtyLabel}
                  </p>

                  <div className="rounded-[13px] bg-(--layer-color) p-6">
                    <div className="flex items-center gap-3 justify-between">
                      <button
                        type="button"
                        onClick={decQty}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-white/60"
                      >
                        <span className="text-xl font-bold">-</span>
                      </button>

                      <div className="flex-1 max-w-[240px]">
                        <input
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={qtyDraft}
                          onChange={(e) => {
                            const raw = e.target.value;
                            setQtyDraft(raw);
                            if (raw === "") return;
                            const n = Number(raw);
                            if (!Number.isNaN(n)) setQty(Math.max(1, n));
                          }}
                          onBlur={() => {
                            if (qtyDraft === "") {
                              setQty(1);
                              setQtyDraft("1");
                              return;
                            }
                            const n = Number(qtyDraft);
                            const fixed = Number.isNaN(n) ? 1 : Math.max(1, n);
                            setQty(fixed);
                            setQtyDraft(String(fixed));
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none bg-white"
                        />
                        <div className="text-center text-sm text-gray-600 mt-2">
                          Ед.: <strong>{currentConfig.unitLabel}</strong>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={incQty}
                        className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-white/60"
                      >
                        <span className="text-xl font-bold">+</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Мусор */}
            <div className="flex-1">
              <p className="text-2xl font-bold mb-4">Вывоз мусора</p>

              <div className="flex gap-4">
                {[false, true].map((v) => (
                  <label
                    key={String(v)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      className="sr-only peer"
                      checked={needGarbage === v}
                      onChange={() => setNeedGarbage(v)}
                    />
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)">
                      {needGarbage === v && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)">
                      {v ? "Да" : "Нет"}
                    </span>
                  </label>
                ))}
              </div>

              {needGarbage && (
                <div className="mt-4 rounded-[13px] bg-(--layer-color) p-5">
                  <div className="text-sm text-gray-700">
                    Базово:{" "}
                    <strong>+ {GARBAGE_BASE.toLocaleString("ru-RU")} ₽</strong>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none mt-4">
                    <input
                      type="checkbox"
                      checked={garbageBagsService}
                      onChange={(e) => setGarbageBagsService(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-gray-300 accent-(--accent-color1)"
                    />
                    <span className="text-sm text-gray-700 leading-snug">
                      Нужен сбор / спуск / погрузка мусора в мешках
                      <span className="block text-xs text-gray-500 mt-1">
                        Расчет: {BAG_RATE} ₽ за 1 мешок
                      </span>
                    </span>
                  </label>

                  {garbageBagsService && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Этаж *
                        </label>
                        <input
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={garbageFloorDraft}
                          onChange={(e) => setGarbageFloorDraft(e.target.value)}
                          onBlur={() => {
                            const n = Number(garbageFloorDraft);
                            const fixed = !n || n < 1 ? 1 : Math.floor(n);
                            setGarbageFloorDraft(String(fixed));
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Кол-во мешков *
                        </label>
                        <input
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={garbageBagsDraft}
                          onChange={(e) => setGarbageBagsDraft(e.target.value)}
                          onBlur={() => {
                            const n = Number(garbageBagsDraft);
                            const fixed = !n || n < 1 ? 1 : Math.floor(n);
                            setGarbageBagsDraft(String(fixed));
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2 text-sm text-gray-600">
                        Доплата:{" "}
                        <strong>
                          {(
                            Math.max(1, Number(garbageBagsDraft || "1")) *
                            BAG_RATE
                          ).toLocaleString("ru-RU")}{" "}
                          ₽
                        </strong>{" "}
                        ({Math.max(1, Number(garbageBagsDraft || "1"))} ×{" "}
                        {BAG_RATE} ₽)
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Итог */}
          <div className="grid grid-cols-1 lg:grid-cols-14 gap-6">
            <div className="lg:col-span-5 bg-(--layer-color) rounded-[20px] px-5 py-8">
              <div className="mt-4">
                {currentConfig.kind === "area" ? (
                  <span className="text-xl xl:text-2xl text-(--accent-color1) font-semibold block">
                    {area} м²
                  </span>
                ) : (
                  <span className="text-xl xl:text-2xl text-(--accent-color1) font-semibold block">
                    {Math.max(1, qty)} {currentConfig.unitLabel}
                  </span>
                )}

                <span className="text-xl xl:text-2xl text-(--accent-color1) font-semibold block">
                  {objectTypes.find((o) => o.id === objectType)?.label}
                </span>

                <span className="text-xl xl:text-2xl text-(--accent-color1) font-semibold block">
                  {currentConfig.label}
                </span>

                {materialLabelForUi && (
                  <span className="text-xl xl:text-2xl text-(--accent-color1) font-semibold block">
                    {materialLabelForUi}
                  </span>
                )}

                <div className="mt-6 p-4 bg-white/50 rounded-lg">
                  <p className="text-lg font-semibold mb-2">Состав расчета:</p>
                  <ul className="text-sm space-y-1">
                    {steps.map((s, i) => (
                      <li key={i} className="text-gray-700">
                        {s}
                      </li>
                    ))}
                  </ul>

                  {needGarbage && (
                    <div className="mt-3 text-sm text-gray-700">
                      <strong>Мусор в расчете:</strong>{" "}
                      {garbageExtra.toLocaleString("ru-RU")} ₽
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 bg-(--layer-color) rounded-[20px] grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6 md:gap-0">
              <div className="flex flex-col items-center md:items-start gap-2 justify-center md:justify-start lg:justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-7xl xl:text-9xl font-bebas font-medium text-(--accent-color1)">
                    {total.toLocaleString("ru-RU")}
                  </span>
                  <img
                    className="w-12 lg:w-[67px]"
                    src="/svg/rub.svg"
                    alt="руб"
                  />
                </div>

                {needGarbage && (
                  <div className="text-lg xl:text-xl font-semibold text-gray-700 mt-1 text-center md:text-left">
                    + {GARBAGE_BASE.toLocaleString("ru-RU")} ₽ вывоз мусора (до
                    10м3)
                    {garbageBagsService && (
                      <span className="block text-base font-medium text-gray-600">
                        +{" "}
                        {(
                          Math.max(1, Number(garbageBagsDraft || "1")) *
                          BAG_RATE
                        ).toLocaleString("ru-RU")}{" "}
                        ₽ мешки (этаж{" "}
                        {Math.max(1, Number(garbageFloorDraft || "1"))})
                      </span>
                    )}
                  </div>
                )}

                <p className="text-gray-600 text-lg mt-2">
                  Итоговая стоимость работ
                </p>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  onClick={handleOpenModal}
                  className="rounded-[15px] py-6 px-8 lg:px-11 bg-(--accent-color1) text-white text-xl xl:text-2xl font-semibold hover:bg-(--accent-color2) transition-colors cursor-pointer"
                >
                  Отправить заявку
                </Button>
              </div>
            </div>
          </div>

          {/* Конец */}
        </div>
      </div>
    </section>
  );
};
