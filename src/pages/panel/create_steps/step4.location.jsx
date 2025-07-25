import { Form, Input, Select, InputNumber } from "antd";
import { useEffect } from "react";

import { CitiesData } from "../../../includes/cities.data";

const { Option } = Select;

const Step4Location = ({ form }) => {
  const selectedCity = Form.useWatch(["location", "city"], form);
  const selectedDistrict = Form.useWatch(["location", "district"], form);

  useEffect(() => {
    form.setFieldsValue({ location: { district: undefined } });
  }, [selectedCity, form]);

  const cityObj = CitiesData.find((c) => c.city === selectedCity);

  return (
    <>
      <Form.Item
        label="Город"
        name={["location", "city"]}
        rules={[{ required: true, message: "Выберите город" }]}
        hasFeedback
      >
        <Select
          placeholder="Выберите город"
          size="large"
          allowClear
        >
          {CitiesData.map((cityObj) => (
            <Option key={cityObj.city} value={cityObj.city}>
              {cityObj.city}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Район"
        name={["location", "district"]}
        rules={[{ required: true, message: "Выберите район" }]}
        hasFeedback
      >
        <Select
          placeholder="Выберите район"
          size="large"
          allowClear
          disabled={!selectedCity}
        >
          {(cityObj?.districts || []).map((districtName) => (
            <Option key={districtName} value={districtName}>
              {districtName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Номер здания"
        name={["location", "building_number"]}
        rules={[{ required: false }]}
      >
        <Input placeholder="Номер здания" size="large" allowClear />
      </Form.Item>

      {/* --- КООРДИНАТЫ --- */}
      <Form.Item
        label="Широта (Latitude)"
        name={["coordinates", "lat"]}
        rules={[{ required: true, message: "Введите широту" }]}
      >
        <InputNumber
          placeholder="Например: 41.3111"
          style={{ width: "100%" }}
          size="large"
          step={0.000001}
        />
      </Form.Item>

      <Form.Item
        label="Долгота (Longitude)"
        name={["coordinates", "lng"]}
        rules={[{ required: true, message: "Введите долготу" }]}
      >
        <InputNumber
          placeholder="Например: 69.2797"
          style={{ width: "100%" }}
          size="large"
          step={0.000001}
        />
      </Form.Item>
    </>
  );
};

export default Step4Location;
