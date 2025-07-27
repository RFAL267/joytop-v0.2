import { useEffect, useState } from "react";
import { Form, Input, Select, Radio, Spin } from "antd";
const { TextArea } = Input;
const { Option } = Select;

import { GET_Categories, GET_Types } from "@/services/api.listing.service"; // скорректированный путь

const transactionTypes = [
  { label: "Аренда", value: "rent" },
  { label: "Продажа", value: "sale" },
];

const Step1Basic = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GET_Categories();
        setCategoryOptions(res.data || []);
      } catch (err) {
        console.error("Ошибка при загрузке категорий:", err);
        setCategoryOptions([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchTypes = async () => {
      try {
        const res = await GET_Types();
        setTypeOptions(res.data || []);
      } catch (err) {
        console.error("Ошибка при загрузке типов недвижимости:", err);
        setTypeOptions([]);
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchCategories();
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
        {loadingCategories ? (
          <Spin size="small" />
        ) : (
          <Select placeholder="Выберите категорию" size="large" allowClear>
            {categoryOptions.map(({ id, ru }) => (
              <Option key={id} value={id}>
                {ru}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        label="Тип недвижимости"
        name="types"
        rules={[{ required: true, message: "Выберите тип недвижимости" }]}
      >
        {loadingTypes ? (
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
