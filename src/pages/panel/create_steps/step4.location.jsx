import { useEffect, useState } from "react";
import { Form, Input, Select, InputNumber, Spin } from "antd";
import { GET_Locations } from "../../../services/api.listing.service";

const { Option } = Select;

const Step4Location = ({ form }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedCityId = Form.useWatch(["location", "city_id"], form);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await GET_Locations();
        setLocations(data.data || []);
      } catch (error) {
        console.error("Ошибка при загрузке локаций:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Сброс района при смене города
  useEffect(() => {
    form.setFieldsValue({ location: { district_id: undefined } });
  }, [selectedCityId, form]);

  const selectedCityObj = locations.find((city) => city.id === selectedCityId);

  return (
    <>
      <Form.Item
        label="Город"
        name={["location", "city_id"]}
        rules={[{ required: true, message: "Выберите город" }]}
        hasFeedback
      >
        {loading ? (
          <Spin />
        ) : (
          <Select placeholder="Выберите город" size="large" allowClear>
            {locations.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.city}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        label="Район"
        name={["location", "district_id"]}
        rules={[{ required: true, message: "Выберите район" }]}
        hasFeedback
      >
        <Select
          placeholder="Выберите район"
          size="large"
          allowClear
          disabled={!selectedCityObj}
        >
          {(selectedCityObj?.districts || []).map((district) => (
            <Option key={district.id} value={district.id}>
              {district.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Номер здания"
        name={["location", "building_number"]}
      >
        <Input placeholder="Номер здания" size="large" allowClear />
      </Form.Item>

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
