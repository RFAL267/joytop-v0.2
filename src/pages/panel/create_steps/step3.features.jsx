import { Form, Divider, Row, Col, Select, Checkbox } from "antd";

const FEATURES_LIST = [
  { name: "kitchen", label: "Кухня" },
  { name: "garage", label: "Гараж" },
  { name: "garden", label: "Сад" },
  { name: "pool", label: "Бассейн" },
  { name: "terrace", label: "Терраса / Балкон" },
  { name: "security", label: "Охрана" },
  { name: "elevator", label: "Лифт" },
  { name: "fireplace", label: "Камин" },
  { name: "storage", label: "Кладовая" },
  { name: "laundry", label: "Прачечная" },
  { name: "playground", label: "Детская площадка" },
  { name: "internet", label: "Интернет" },
  { name: "solar_panels", label: "Солнечные панели" },
  { name: "wheelchair_access", label: "Доступ для инвалидов" },
  { name: "pet_friendly", label: "Можно с животными" }
];

const NEARBY_OPTIONS = [
  { value: "school", label: "Школа" },
  { value: "kindergarten", label: "Детский сад" },
  { value: "university", label: "Университет / ВУЗ" },
  { value: "mall", label: "Торговый центр" },
  { value: "supermarket", label: "Супермаркет" },
  { value: "hospital", label: "Больница / Поликлиника" },
  { value: "pharmacy", label: "Аптека" },
  { value: "bus_stop", label: "Остановка общественного транспорта" },
  { value: "metro_station", label: "Станция метро" },
  { value: "train_station", label: "Железнодорожная станция" },
  { value: "airport", label: "Аэропорт" },
  { value: "park", label: "Парк / Сквер" },
  { value: "playground", label: "Детская площадка" },
  { value: "sports_complex", label: "Спортивный комплекс / Стадион" },
  { value: "gym", label: "Тренажёрный зал" },
  { value: "restaurant", label: "Ресторан / Кафе" },
  { value: "mosque", label: "Мечеть" },
  { value: "church", label: "Церковь / Храм" },
  { value: "police_station", label: "Полицейский участок" },
  { value: "fire_station", label: "Пожарная часть" },
  { value: "bank", label: "Банк / Банкомат" },
  { value: "post_office", label: "Почта" },
  { value: "library", label: "Библиотека" },
  { value: "cinema", label: "Кинотеатр" },
  { value: "museum", label: "Музей" },
  { value: "theater", label: "Театр" },
  { value: "pet_store", label: "Зоомагазин" },
  { value: "car_service", label: "Автосервис" },
  { value: "parking_lot", label: "Парковка" },
  { value: "gas_station", label: "Заправка" }
];

const Step3Features = () => (
  <>
    <Divider orientation="left">Удобства</Divider>

    <Form.Item
      name="features"
      preserve
    >
      <Checkbox.Group style={{ width: "100%" }}>
        <Row gutter={[16, 8]}>
          {FEATURES_LIST.map((feature) => (
            <Col xs={24} sm={12} md={8} key={feature.name}>
              <Checkbox value={feature.name}>{feature.label}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Form.Item>

    <Form.Item
      name="mortgage_available"
      valuePropName="checked"
      preserve
    >
      <Checkbox>Возможна ипотека</Checkbox>
    </Form.Item>

    <Divider orientation="left">Объекты поблизости</Divider>

    <Form.Item
      label="Что находится рядом"
      name="nearby_list"
      preserve
      tooltip="Отметьте, какие объекты есть рядом с недвижимостью"
    >
      <Select
        mode="multiple"
        placeholder="Выберите объекты рядом"
        size="large"
        options={NEARBY_OPTIONS}
        allowClear
      />
    </Form.Item>
  </>
);

export default Step3Features;