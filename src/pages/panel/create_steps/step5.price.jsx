// components/panel/steps/step5.price.jsx
import { Form, InputNumber, Select } from "antd";

const { Option } = Select;

const CURRENCIES = [
  { value: "USD", label: "Доллар (USD)" },
  { value: "RUB", label: "Рубль (RUB)" },
  { value: "UZS", label: "Сум (UZS)" },
];

const Step5Price = () => (
  <>
    <Form.Item
      label="Валюта"
      name={["price", "currency"]}
      rules={[{ required: true, message: "Выберите валюту" }]}
      preserve
    >
      <Select placeholder="Выберите валюту" size="large" allowClear>
        {CURRENCIES.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item
      label="Цена"
      name={["price", "amount"]}
      rules={[
        { required: true, message: "Введите цену" },
        { type: "number", min: 0, message: "Цена должна быть неотрицательной" },
      ]}
      preserve
    >
      <InputNumber
        min={0}
        style={{ width: "100%" }}
        placeholder="Введите цену"
        size="large"
        controls={false}
      />
    </Form.Item>
  </>
);

export default Step5Price;
