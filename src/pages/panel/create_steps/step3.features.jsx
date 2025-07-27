import { useEffect, useState } from "react";
import { Form, Divider, Row, Col, Select, Checkbox, Spin } from "antd";
import { GET_NearbyList, GET_Features } from "@/services/api.listing.service";

const Step3Features = () => {
  const [nearbyOptions, setNearbyOptions] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);

  const [featuresList, setFeaturesList] = useState([]);
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  useEffect(() => {
    const fetchNearby = async () => {
      try {
        const res = await GET_NearbyList();
        const options = res.data.map((item) => ({
          value: item.id,
          label: item.ru,
        }));
        setNearbyOptions(options);
      } catch (err) {
        console.error("Ошибка при загрузке nearby:", err);
      } finally {
        setLoadingNearby(false);
      }
    };

    const fetchFeatures = async () => {
      try {
        const res = await GET_Features();
        const features = res.data.map((item) => ({
          id: item.id,       // используем `en` как значение
          label: item.ru       // отображаем `ru` для пользователя
        }));
        setFeaturesList(features);
      } catch (err) {
        console.error("Ошибка при загрузке features:", err);
      } finally {
        setLoadingFeatures(false);
      }
    };

    fetchNearby();
    fetchFeatures();
  }, []);

  return (
    <>
      <Divider orientation="left">Удобства</Divider>

      <Form.Item name="features" preserve>
        {loadingFeatures ? (
          <Spin />
        ) : (
          <Checkbox.Group style={{ width: "100%" }}>
            <Row gutter={[16, 8]}>
              {featuresList.map((feature) => (
                <Col xs={24} sm={12} md={8} key={feature.id}>
                  <Checkbox value={feature.id}>{feature.label}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        )}
      </Form.Item>

      <Form.Item name="mortgage_available" valuePropName="checked" preserve>
        <Checkbox>Возможна ипотека</Checkbox>
      </Form.Item>

      <Divider orientation="left">Объекты поблизости</Divider>

      <Form.Item
        label="Что находится рядом"
        name="nearby_list"
        preserve
        tooltip="Отметьте, какие объекты есть рядом с недвижимостью"
      >
        {loadingNearby ? (
          <Spin />
        ) : (
          <Select
            mode="multiple"
            placeholder="Выберите объекты рядом"
            size="large"
            options={nearbyOptions}
            allowClear
          />
        )}
      </Form.Item>
    </>
  );
};

export default Step3Features;
