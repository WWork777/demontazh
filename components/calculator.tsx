'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Title } from './ui/title';

interface Props {
  className?: string;
}

/* =======================
   PRICE CONFIG
======================= */
const priceConfig = {
  floors: {
    label: 'Демонтаж полов',
    materials: {
      concrete: { label: 'Бетонная стяжка', rate: 1200 },
      tile: { label: 'Плитка / керамогранит', rate: 680 },
      wood: { label: 'Деревянный пол / лаги', rate: 800 },
      laminate: { label: 'Ламинат / паркет', rate: 400 },
    },
  },
  walls: {
    label: 'Демонтаж стен и перегородок',
    materials: {
      gkl: { label: 'ГКЛ / легкие перегородки', rate: 500 },
      blocks: { label: 'Газобетон / ПГП', rate: 700 },
      brick_half: { label: 'Кирпич 1/2', rate: 1800 },
      brick_full: { label: 'Кирпич 1', rate: 3000 },
      concrete: { label: 'Бетон / ЖБ', rate: 4000 },
    },
  },
  ceilings: {
    label: 'Демонтаж потолков',
    materials: {
      gkl: { label: 'ГКЛ', rate: 480 },
      armstrong: { label: 'Армстронг / рейка', rate: 220 },
      plaster: { label: 'Штукатурка / краска', rate: 500 },
      stretch: { label: 'Натяжной потолок', rate: 170 },
    },
  },
  sanitary: { label: 'Демонтаж сантехники', rate: 2200 },
  electric: { label: 'Демонтаж электрики', rate: 600 },
  openings: { label: 'Демонтаж окон, дверей', rate: 850 },
  full: { label: 'Комплексный демонтаж', rate: 1900 },
};

type WorkType = keyof typeof priceConfig;

const objectTypes = [
  { id: 'apartment', label: 'Квартира' },
  { id: 'house', label: 'Дом' },
  { id: 'commercial', label: 'Коммерческое помещение' },
  { id: 'industrial', label: 'Производственное помещение' },
] as const;

type ObjectType = (typeof objectTypes)[number]['id'];

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
   COMPONENT
======================= */
export const Calculator: React.FC<Props> = ({ className }) => {
  const [workType, setWorkType] = useState<WorkType>('floors');
  const [objectType, setObjectType] = useState<ObjectType>('apartment');
  const [area, setArea] = useState(80);
  const [needGarbage, setNeedGarbage] = useState(false);

  const currentConfig = priceConfig[workType];

  // Состояние выбранного материала
  const materialKeys =
    'materials' in currentConfig
      ? (Object.keys(currentConfig.materials) as Array<
          keyof typeof currentConfig.materials
        >)
      : [];

  const [material, setMaterial] = useState<string | null>(
    materialKeys[0] ?? null
  );

  // Обновляем материал при смене типа работы
  useEffect(() => {
    if (materialKeys.length > 0) {
      setMaterial(materialKeys[0]);
    } else {
      setMaterial(null);
    }
  }, [workType]);

  /* =======================
     CALCULATION
  ======================= */
  const handleSendOrder = async () => {
    const materialLabel =
      material && 'materials' in currentConfig
        ? (
            currentConfig.materials as Record<
              string,
              { label: string; rate: number }
            >
          )[material]?.label
        : undefined;

    const message = `📋 Новая заявка на расчет

🏠 Объект: ${
      objectTypes.find((o) => o.id === objectType)?.label || 'Не указано'
    }
📏 Площадь: ${area} м²
🔨 Тип работ: ${currentConfig.label}
${
  materialLabel ? `🧱 Материал: ${materialLabel}\n` : ''
}💰 Стоимость: ${total.toLocaleString('ru-RU')} ₽
${
  needGarbage ? '🗑️ Вывоз мусора: Да (~ + 7 000 ₽)\n' : '🗑️ Вывоз мусора: Нет\n'
}
📅 ${new Date().toLocaleString('ru-RU')}`;

    try {
      const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка отправки');
      }

      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    } catch (error) {
      console.error('Error sending order:', error);
      alert(
        'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.'
      );
    }
  };

  const { total, steps } = useMemo(() => {
    let baseRate = 0;

    // Проверяем, что currentConfig имеет материалы
    if ('materials' in currentConfig && currentConfig.materials) {
      const materials = currentConfig.materials as Record<
        string,
        { label: string; rate: number }
      >;

      if (material && material in materials) {
        baseRate = materials[material].rate;
      } else {
        // Если material не выбран или устарел, берем первый доступный
        const firstKey = Object.keys(materials)[0];
        baseRate = materials[firstKey].rate;
        setMaterial(firstKey); // обновляем состояние
      }
    } else if ('rate' in currentConfig) {
      baseRate = currentConfig.rate;
    }

    let sum = baseRate * area;
    const breakdown: string[] = [];
    breakdown.push(`${baseRate} ₽/м² × ${area} м²`);

    // Коэффициент объекта
    const objK = objectCoeff[objectType];
    if (objK !== 1) {
      const adjustment = sum * (objK - 1);
      sum *= objK;
      breakdown.push(
        `Коэф. объекта (${objK.toFixed(1)}): ${adjustment.toLocaleString(
          'ru-RU'
        )} ₽`
      );
    }

    // Коэффициент площади
    const areaK = areaCoeff.find((r) => area >= r.min && area <= r.max)?.k ?? 1;
    if (areaK !== 1) {
      const adjustment = sum * (areaK - 1);
      sum *= areaK;
      breakdown.push(
        `Коэф. площади (${areaK.toFixed(1)}): ${adjustment.toLocaleString(
          'ru-RU'
        )} ₽`
      );
    }

    // Вывоз мусора больше не добавляется динамически - показывается отдельно

    // Минимальная стоимость
    if (sum < 5000) {
      sum = 5000;
      breakdown.push('Минимальная стоимость работ: 5 000 ₽');
    }

    sum = Math.ceil(sum / 100) * 100;

    return { total: sum, steps: breakdown };
  }, [workType, objectType, area, needGarbage, material, currentConfig]);

  /* =======================
     RENDER
  ======================= */
  return (
    <section id='calc' className={cn(className)}>
      <div className='sm:container mx-auto py-5 px-3'>
        <Title
          title='Рассчитайте стоимость работ!'
          className='text-[36px] sm:text-[50px] md:text-[56px] font-semibold mb-5'
        />

        <div className='border border-black rounded-[20px] p-[30px]'>
          {/* Основные поля: Тип работ, Материал, Объект */}
          <div className='grid grid-cols-1 lg:grid-cols-12 mb-6 gap-6'>
            {/* Тип работ */}
            <div className='lg:col-span-4'>
              <p className='text-2xl font-bold mb-4'>Тип работ</p>
              <div className='space-y-3'>
                {Object.entries(priceConfig).map(([id, cfg]) => (
                  <label
                    key={id}
                    className='flex items-center gap-3 cursor-pointer group'
                  >
                    <input
                      type='radio'
                      className='sr-only peer'
                      checked={workType === id}
                      onChange={() => setWorkType(id as WorkType)}
                    />
                    <div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
                      {workType === id && (
                        <div className='w-2.5 h-2.5 rounded-full bg-white' />
                      )}
                    </div>
                    <span className='group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
                      {cfg.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Материал */}
            {'materials' in currentConfig && materialKeys.length > 0 && (
              <div className='lg:col-span-4'>
                <p className='text-2xl font-bold mb-4'>Материал</p>
                <div className='space-y-3'>
                  {(materialKeys as string[]).map((id) => {
                    // Приведение currentConfig.materials к известному типу
                    const materials = currentConfig.materials as Record<
                      string,
                      { label: string; rate: number }
                    >;
                    return (
                      <label
                        key={id}
                        className='flex items-center gap-3 cursor-pointer group'
                      >
                        <input
                          type='radio'
                          className='sr-only peer'
                          checked={material === id}
                          onChange={() => setMaterial(id)}
                        />
                        <div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
                          {material === id && (
                            <div className='w-2.5 h-2.5 rounded-full bg-white' />
                          )}
                        </div>
                        <span className='group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
                          {materials[id].label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Объект */}
            <div className='lg:col-span-4'>
              <p className='text-2xl font-bold mb-4'>Объект</p>
              <div className='space-y-3'>
                {objectTypes.map((o) => (
                  <label
                    key={o.id}
                    className='flex items-center gap-3 cursor-pointer group'
                  >
                    <input
                      type='radio'
                      className='sr-only peer'
                      checked={objectType === o.id}
                      onChange={() => setObjectType(o.id)}
                    />
                    <div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
                      {objectType === o.id && (
                        <div className='w-2.5 h-2.5 rounded-full bg-white' />
                      )}
                    </div>
                    <span className='group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Площадь — всегда внизу */}
          <div className='mb-8 flex flex-col lg:flex-row gap-6'>
            {/* Площадь */}

            <div className='flex-2'>
              <p className='text-2xl font-bold mb-4'>Площадь</p>
              <div className='space-y-4'>
                <input
                  type='range'
                  min={5}
                  max={500}
                  step={5}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-(--accent-color1)'
                />
                <div className='rounded-[13px] bg-(--layer-color) p-6 text-center'>
                  <span className='text-2xl font-bold'>
                    {area} <small>м²</small>
                  </span>
                </div>
              </div>
            </div>

            <div className='flex-1'>
              <p className='text-2xl font-bold mb-4'>Вывоз мусора</p>
              <div className='flex gap-4'>
                {[false, true].map((v) => (
                  <label
                    key={String(v)}
                    className='flex items-center gap-3 cursor-pointer group'
                  >
                    <input
                      type='radio'
                      className='sr-only peer'
                      checked={needGarbage === v}
                      onChange={() => setNeedGarbage(v)}
                    />
                    <div className='w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-(--accent-color1) peer-checked:bg-(--accent-color1)'>
                      {needGarbage === v && (
                        <div className='w-2.5 h-2.5 rounded-full bg-white' />
                      )}
                    </div>
                    <span className='group-hover:text-(--accent-color1) transition-colors peer-checked:text-(--accent-color1)'>
                      {v ? 'Да' : 'Нет'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Вывоз мусора */}
          </div>

          {/* Результаты */}
          <div className='grid grid-cols-1 lg:grid-cols-14 gap-6'>
            <div className='lg:col-span-5 bg-(--layer-color) rounded-[20px] px-5 py-8'>
              <div className='mt-4'>
                <span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
                  {area} м²
                </span>
                <span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
                  {objectTypes.find((o) => o.id === objectType)?.label}
                </span>
                <span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
                  {currentConfig.label}
                </span>
                {material &&
                  'materials' in currentConfig &&
                  material in currentConfig.materials && (
                    <span className='text-xl xl:text-2xl text-(--accent-color1) font-semibold block'>
                      {
                        (
                          currentConfig.materials as Record<
                            string,
                            { label: string; rate: number }
                          >
                        )[material].label
                      }
                    </span>
                  )}
                <div className='mt-6 p-4 bg-white/50 rounded-lg'>
                  <p className='text-lg font-semibold mb-2'>Состав расчета:</p>
                  <ul className='text-sm space-y-1'>
                    {steps.map((s, i) => (
                      <li key={i} className='text-gray-700'>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className='lg:col-span-9 bg-(--layer-color) rounded-[20px] grid grid-cols-1 md:grid-cols-2 px-5 py-8 gap-6 md:gap-0'>
              <div className='flex flex-col items-center md:items-start gap-2 justify-center md:justify-start lg:justify-center'>
                <div className='flex items-center gap-2'>
                  <span className='text-7xl xl:text-9xl font-bebas font-medium text-(--accent-color1)'>
                    {total.toLocaleString('ru-RU')}
                  </span>
                  <img
                    className='w-12 lg:w-[67px]'
                    src='/svg/rub.svg'
                    alt='руб'
                  />
                </div>
                {needGarbage && (
                  <div className='text-lg xl:text-xl font-semibold text-gray-700 mt-1'>
                    ~ + 7 000 ₽ вывоз мусора
                  </div>
                )}
                <p className='text-gray-600 text-lg mt-2'>
                  Итоговая стоимость работ
                </p>
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  onClick={handleSendOrder}
                  className='rounded-[15px] py-6 px-8 lg:px-11 bg-(--accent-color1) text-white text-xl xl:text-2xl font-semibold hover:bg-(--accent-color2) transition-colors cursor-pointer'
                  text='Отправить заявку'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
