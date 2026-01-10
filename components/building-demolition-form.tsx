"use client";

import React, { useState, useEffect } from "react";

interface BuildingDemolitionFormProps {
  serviceName: string;
  className?: string;
}

export const BuildingDemolitionForm: React.FC<BuildingDemolitionFormProps> = ({
  serviceName,
  className,
}) => {
  const [formData, setFormData] = useState({
    buildingType: "",
    length: "",
    width: "",
    height: "",
    wallMaterial: "",
    otherMaterial: "",
    foundationDemolition: "",
    wasteRemoval: "",
    territoryClearing: "",
    district: "",
    otherDistrict: "",
    phone: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);

  const primaryColor = "#de7e48";
  const primaryHover = "#d26933";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const currentCount = photos.length;
      const remainingSlots = 10 - currentCount;
      
      if (remainingSlots <= 0) {
        alert("Максимум 10 фотографий");
        return;
      }

      const filesToAdd = files.slice(0, remainingSlots);
      const newFiles = [...photos, ...filesToAdd];
      setPhotos(newFiles);

      // Освобождаем старые URL
      photoPreview.forEach((url) => URL.revokeObjectURL(url));

      // Создаем превью для новых файлов
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreview(newPreviews);
    }
  };

  const removePhoto = (index: number) => {
    // Освобождаем URL удаляемого фото
    URL.revokeObjectURL(photoPreview[index]);
    
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreview.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPhotoPreview(newPreviews);
  };

  // Очистка URL при размонтировании компонента
  useEffect(() => {
    return () => {
      photoPreview.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateSquareMeters = () => {
    const length = parseFloat(formData.length) || 0;
    const width = parseFloat(formData.width) || 0;
    return length * width;
  };

  const formatFormData = () => {
    const area = calculateSquareMeters();
    const wallMaterialText =
      formData.wallMaterial === "другое"
        ? formData.otherMaterial
        : formData.wallMaterial;
    const districtText =
      formData.district === "другое"
        ? formData.otherDistrict
        : formData.district;

    return `🏗️ Заявка на демонтаж строения

📋 Тип здания: ${formData.buildingType || "Не указано"}

📐 Размеры здания:
   • Длина: ${formData.length || "Не указано"} м
   • Ширина: ${formData.width || "Не указано"} м
   • Высота: ${formData.height || "Не указано"} м
   • Площадь: ${area > 0 ? area.toFixed(2) : "Не указано"} м²

🧱 Материал стен: ${wallMaterialText || "Не указано"}

🔨 Демонтаж фундамента: ${formData.foundationDemolition || "Не указано"}

🚛 Вывоз строительного мусора: ${formData.wasteRemoval || "Не указано"}

🌱 Расчистка/планировка территории: ${formData.territoryClearing || "Не указано"}

📍 Район: ${districtText || "Не указано"}

📞 Телефон: ${formData.phone || "Не указано"}

📅 Дата обращения: ${new Date().toLocaleString("ru-RU")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.phone) {
      alert("Пожалуйста, укажите номер телефона для связи");
      return;
    }

    setIsSubmitting(true);

    try {
      const message = formatFormData();

      // Конвертируем фото в base64 для отправки (если есть)
      const photoBase64: string[] = [];
      if (photos.length > 0) {
        const photoPromises = photos.map((photo) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(photo);
          });
        });
        const results = await Promise.all(photoPromises);
        photoBase64.push(...results);
      }

      // Отправляем на сервер через API endpoint
      const response = await fetch("/api/send-building-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          photos: photoBase64,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка отправки");
      }

      // Показываем успешное сообщение
      alert(
        "Заявка успешно отправлена в Telegram! Мы свяжемся с вами в ближайшее время для уточнения деталей и расчета стоимости."
      );

      // Очищаем форму
      setFormData({
        buildingType: "",
        length: "",
        width: "",
        height: "",
        wallMaterial: "",
        otherMaterial: "",
        foundationDemolition: "",
        wasteRemoval: "",
        territoryClearing: "",
        district: "",
        otherDistrict: "",
        phone: "",
      });
      setPhotos([]);
      setPhotoPreview([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 ${className || ""}`}
    >
      <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Заявка на расчет стоимости
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Заполните форму, и мы свяжемся с вами для расчета стоимости демонтажа
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Тип здания */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1. Здание какого типа планируется демонтировать? <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="buildingType"
                value="Жилое"
                checked={formData.buildingType === "Жилое"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
                required
              />
              <span className="text-gray-700">Жилое</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="buildingType"
                value="Нежилое"
                checked={formData.buildingType === "Нежилое"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
                required
              />
              <span className="text-gray-700">Нежилое</span>
            </label>
          </div>
        </div>

        {/* 2. Размеры здания */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. Размеры здания (м)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleInputChange}
                placeholder="Длина"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleInputChange}
                placeholder="Ширина"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Высота"
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
          </div>
          {calculateSquareMeters() > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Площадь: <strong>{calculateSquareMeters().toFixed(2)} м²</strong>
            </p>
          )}
        </div>

        {/* 3. Материал стен */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            3. Из какого материала стены?
          </label>
          <select
            name="wallMaterial"
            value={formData.wallMaterial}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="">Выберите материал</option>
            <option value="кирпич">Кирпич</option>
            <option value="бетон">Бетон</option>
            <option value="дерево">Дерево</option>
            <option value="пеноблок">Пеноблок</option>
            <option value="шлакоблок">Шлакоблок</option>
            <option value="другое">Другое</option>
          </select>
          {formData.wallMaterial === "другое" && (
            <input
              type="text"
              name="otherMaterial"
              value={formData.otherMaterial}
              onChange={handleInputChange}
              placeholder="Укажите материал"
              className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          )}
        </div>

        {/* 4. Демонтаж фундамента */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            4. Требуется ли демонтаж фундамента?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="foundationDemolition"
                value="Да"
                checked={formData.foundationDemolition === "Да"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700">Да</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="foundationDemolition"
                value="Нет"
                checked={formData.foundationDemolition === "Нет"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700">Нет</span>
            </label>
          </div>
        </div>

        {/* 5. Вывоз мусора */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            5. Требуется ли вывоз строительного мусора?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="wasteRemoval"
                value="Да"
                checked={formData.wasteRemoval === "Да"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700">Да</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="wasteRemoval"
                value="Нет"
                checked={formData.wasteRemoval === "Нет"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700">Нет</span>
            </label>
          </div>
        </div>

        {/* 6. Расчистка территории */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            6. Требуется ли расчистка, планировка территории, участка?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="territoryClearing"
                value="Да"
                checked={formData.territoryClearing === "Да"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700">Да</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="territoryClearing"
                value="Нет"
                checked={formData.territoryClearing === "Нет"}
                onChange={handleInputChange}
                className="mr-2 w-4 h-4 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-gray-700">Нет</span>
            </label>
          </div>
        </div>

        {/* 7. Район */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            7. Район расположения объекта
          </label>
          <select
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          >
            <option value="">Выберите район</option>
            <option value="Центральный">Центральный</option>
            <option value="Заводский">Заводский</option>
            <option value="Рудничный">Рудничный</option>
            <option value="Кировский">Кировский</option>
            <option value="Ленинский">Ленинский</option>
            <option value="другое">Другое</option>
          </select>
          {formData.district === "другое" && (
            <input
              type="text"
              name="otherDistrict"
              value={formData.otherDistrict}
              onChange={handleInputChange}
              placeholder="Укажите район"
              className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          )}
        </div>

        {/* Загрузка фото */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Загрузить фото (до 10 фото)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          {photoPreview.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {photoPreview.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Телефон */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Номер телефона для обратной связи <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+7 (___) ___-__-__"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? "#ccc" : primaryColor,
          }}
          className="w-full py-3 px-6 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = primaryHover;
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = primaryColor;
            }
          }}
        >
          {isSubmitting ? "Отправка..." : "Отправить заявку"}
        </button>
      </form>
    </div>
  );
};

