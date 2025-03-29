import React, { useState } from 'react';

interface QuizStep {
  id: number;
  title: string;
}

const steps: QuizStep[] = [
  { id: 1, title: 'Бюджет' },
  { id: 2, title: 'Пожелания' },
  { id: 3, title: 'Контакты' },
];

const budgetOptions = [
  { id: '3000', label: 'До 3 000' },
  { id: '5000', label: 'До 5 000' },
  { id: '10000', label: 'До 10 000' },
];

const BouquetQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: '',
    wishes: '',
    name: '',
    phone: '',
  });

  // Проверяем, доступен ли шаг для перехода
  const isStepAvailable = (stepId: number) => {
    if (stepId === 1) return true;
    if (stepId === 2) return formData.budget !== '';
    if (stepId === 3) return formData.budget !== '' && formData.wishes !== '';
    return false;
  };

  // Обработчик клика по шагу
  const handleStepClick = (stepId: number) => {
    if (isStepAvailable(stepId) && stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  };

  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budget });
    setCurrentStep(2);
  };

  const handleWishesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Form submitted:', formData);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="quiz">
      <h2 className="quiz__title">Сложно определиться?</h2>
      <p>Укажите бюджет, повод или пожелания... и доверьтесь флористу!</p>
      <div className="quiz__steps">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`quiz__step ${currentStep === step.id ? 'quiz__step--active' : ''} ${
              isStepAvailable(step.id) ? 'quiz__step--available' : ''
            }`}
            onClick={() => handleStepClick(step.id)}
            role="button"
            tabIndex={isStepAvailable(step.id) ? 0 : -1}
            aria-current={currentStep === step.id}
            aria-disabled={!isStepAvailable(step.id)}
          >
            {step.title}
          </div>
        ))}
      </div>

      <div className="quiz__content">
        {currentStep === 1 && (
          <div className="quiz__budget">
            {budgetOptions.map((option) => (
              <button
                key={option.id}
                className="button button--primary product-card__button"
                onClick={() => handleBudgetSelect(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleWishesSubmit} className="quiz__wishes">
            <textarea
              className="quiz__textarea"
              placeholder="Опишите ваши пожелания..."
              value={formData.wishes}
              onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
              required
            />
            <div className="quiz__buttons">
              <button 
                type="button" 
                className="button button--outline"
                onClick={handlePrevStep}
              >
                Назад
              </button>
              <button type="submit" className="button button--primary">
                Далее
              </button>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleContactSubmit} className="quiz__contacts">
            <input
              type="text"
              className="quiz__input"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="tel"
              className="quiz__input"
              placeholder="Ваш телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
            <div className="quiz__buttons">
              <button 
                type="button" 
                className="button button--outline"
                onClick={handlePrevStep}
              >
                Назад
              </button>
              <button type="submit" className="button button--primary">
                Отправить
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BouquetQuiz; 