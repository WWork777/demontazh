'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';

interface ContactFormProps {
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      alert('Необходимо дать согласие на обработку персональных данных');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `📞 Новая заявка на обратную связь

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}

📅 ${new Date().toLocaleString('ru-RU')}`;

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

      // Очищаем форму
      setFormData({
        name: '',
        phone: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error sending form:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className='space-y-4'>
        <div>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Ваше имя'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none'
          />
        </div>
        <div>
          <input
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Ваш телефон'
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-(--accent-color1) focus:border-(--accent-color1) outline-none'
          />
        </div>
        <div className='flex items-start gap-2'>
          <input
            type='checkbox'
            name='consent'
            id='consent'
            checked={formData.consent}
            onChange={handleChange}
            required
            className='mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500'
          />
          <label htmlFor='consent' className='text-sm text-gray-700'>
            Я даю согласие на{' '}
            <a
              href='/documents/privacy-policy.pdf'
              target='_blank'
              rel='noopener noreferrer'
              style={{ color: '#de7e48' }}
              className='hover:underline'
            >
              обработку персональных данных
            </a>
          </label>
        </div>
        <Button
          type='submit'
          disabled={isSubmitting || !formData.consent}
          text={isSubmitting ? 'Отправка...' : 'Отправить'}
          className='w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        />
      </div>
    </form>
  );
};

