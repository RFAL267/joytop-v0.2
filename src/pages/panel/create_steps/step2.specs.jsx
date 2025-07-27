// Step2Specs.tsx
import { Form, InputNumber, Select, Checkbox } from "antd";

const { Option } = Select;

const numberFields = [
  { label: "Площадь (м²)", name: "area", required: true, message: "Введите площадь", min: 1 },
  { label: "Жилая площадь (м²)", name: "living_area" },
  { label: "Площадь участка (м²)", name: "lot_area" },
  { label: "Высота потолков (м)", name: "ceiling_height", step: 0.1 },
  { label: "Возраст (лет)", name: "age" },
  { label: "Количество комнат", name: "rooms" },
  { label: "Спальни", name: "bedrooms" },
  { label: "Ванные комнаты", name: "bathrooms" },
  { label: "Туалеты", name: "toilets" },
  { label: "Балконы", name: "balconies" },
  { label: "Этаж", name: "floor" },
  { label: "Этажей в здании", name: "total_floors" },
];

const selectFields = [
  {
    label: "Тип ремонта",
    name: "renovation",
    options: [
      { value: "none", label: "Без ремонта" },
      { value: "cosmetic", label: "Косметический" },
      { value: "capital", label: "Капитальный" },
      { value: "euro", label: "Евроремонт" },
      { value: "designer", label: "Дизайнерский" },
    ],
  },
  {
    label: "Отопление",
    name: "heating",
    options: [
      { value: "none", label: "Нет" },
      { value: "gas", label: "Газовое" },
      { value: "electric", label: "Электрическое" },
      { value: "central", label: "Центральное" },
      { value: "autonomous", label: "Автономное" },
    ],
  },
  {
    label: "Горячая вода",
    name: "hot_water",
    options: [
      { value: "central", label: "Центральная" },
      { value: "gas", label: "Газовый котел" },
      { value: "boiler", label: "Бойлер" },
      { value: "solar", label: "Солнечный нагрев" },
    ],
  },
  {
    label: "Класс энергоэффективности",
    name: "energy_efficiency",
    options: ["A++", "A+", "A", "B", "C", "D", "E", "F", "G"].map((value) => ({
      value,
      label: value,
    })),
  },

  {
    label: "Уровень шума",
    name: "noise_level",
    options: [
      { value: "low", label: "Низкий" },
      { value: "medium", label: "Средний" },
      { value: "high", label: "Высокий" },
    ],
  },
];

const booleanFields = [
  { name: "furnished", label: "Меблировка" },
  { name: "built_in_kitchen", label: "Встроенная кухня" },
  { name: "air_conditioning", label: "Кондиционер" },
  { name: "parking", label: "Парковка" },
  { name: "garage", label: "Гараж" },
  { name: "elevator", label: "Лифт" },
  { name: "security", label: "Охрана/Видеонаблюдение" },
];

const Step2Specs = () => (
  <>
    {numberFields.map(({ label, name, required, message, min = 0, step = 1 }) => (
      <Form.Item
        key={name}
        label={label}
        name={["specs", name]}
        rules={required ? [{ required: true, message }] : []}
      >
        <InputNumber min={min} step={step} style={{ width: "100%" }} size="large" />
      </Form.Item>
    ))}

    {selectFields.map(({ label, name, options }) => (
      <Form.Item key={name} label={label} name={["specs", name]}>
        <Select size="large" allowClear placeholder={`Выберите ${label.toLowerCase()}`}>
          {options.map(({ value, label }) => (
            <Option key={value} value={value}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    ))}

    {booleanFields.map(({ name, label }) => (
      <Form.Item
        key={name}
        name={["specs", name]}
        valuePropName="checked"
        style={{ marginBottom: 8 }}
      >
        <Checkbox>{label}</Checkbox>
      </Form.Item>
    ))}
  </>
);

export default Step2Specs;
