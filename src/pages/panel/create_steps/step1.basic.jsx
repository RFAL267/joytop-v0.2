import { useEffect, useState } from "react";
import { Form, Input, Select, Radio, Spin } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import { CategoriesData } from "../../../includes/categories.data";
import { GET_Types } from "../../../services/api.listing.service"; // путь подкорректируй если нужно

const transactionTypes = [
  { label: "Аренда", value: "rent" },
  { label: "Продажа", value: "sale" },
];

const Step1Basic = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await GET_Types();
        setTypeOptions(res.data || []);
        console.log(res.data);
        
      } catch (err) {
        console.error("Ошибка при загрузке типов недвижимости:", err);
        setTypeOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return (
    <>
      <Form.Item
        label="Заголовок"
        name="title"
        rules={[{ required: true, message: "Введите заголовок" }]}
      >
        <Input placeholder="Введите заголовок объявления" size="large" />
      </Form.Item>

      <Form.Item
        label="Описание"
        name="description"
        rules={[{ required: true, message: "Введите описание" }]}
      >
        <TextArea rows={4} placeholder="Описание объекта" size="large" />
      </Form.Item>

      <Form.Item
        label="Категория"
        name="category"
        rules={[{ required: true, message: "Выберите категорию" }]}
      >
        <Select placeholder="Выберите категорию" size="large" allowClear>
          {CategoriesData.map(({ id, ru }) => (
            <Option key={id} value={id}>
              {ru}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Тип недвижимости"
        name="types"
        rules={[{ required: true, message: "Выберите тип недвижимости" }]}
      >
        {loading ? (
          <Spin size="small" />
        ) : (
          <Select
            placeholder="Выберите тип недвижимости"
            size="large"
            allowClear
          >
            {typeOptions.map(({ id, ru }) => (
              <Option key={id} value={id}>
                {ru}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        label="Тип сделки"
        name="transaction_type"
        rules={[{ required: true, message: "Выберите тип сделки" }]}
      >
        <Radio.Group size="large">
          {transactionTypes.map(({ label, value }) => (
            <Radio key={value} value={value}>
              {label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default Step1Basic;
