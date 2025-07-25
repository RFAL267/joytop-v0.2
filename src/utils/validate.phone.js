// utils/validate.phone.js
export const validateUzbekPhone = (phone) => {
  const digits = phone.replace(/\D/g, ""); // только цифры

  if (!digits) return "Номер телефона обязателен";

  if (!/^998\d{9}$/.test(digits)) {
    return "Введите корректный номер Узбекистана (например: 998901234567)";
  }

  return null;
};

/**
 * Приведение номера к нужному формату — только цифры, без +
 * @example +998 (90) 123-45-67 → 998901234567
 */
export const normalizePhone = (phone) => {
  return phone.replace(/\D/g, ""); // удалить всё кроме цифр
};