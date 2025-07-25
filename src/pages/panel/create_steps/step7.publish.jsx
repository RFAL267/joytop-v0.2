import { Form, Button, Descriptions } from "antd";

const Step7Publish = ({ form }) => {
  const values = form.getFieldsValue(true);

  const activeFeatures = values.features
    ? Object.entries(values.features)
        .filter(([_, val]) => val)
        .map(([key]) => key)
    : [];

  return (
    <>
      <Descriptions
        title="Проверьте данные объявления"
        bordered
        column={1}
        size="middle"
        style={{ marginBottom: 20 }}
      >
        <Descriptions.Item label="Название">{values.title || "-"}</Descriptions.Item>
        <Descriptions.Item label="Описание">{values.description || "-"}</Descriptions.Item>
        <Descriptions.Item label="Тип сделки">{values.transaction_type || "-"}</Descriptions.Item>
        <Descriptions.Item label="Тип недвижимости">
          {values.types || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Категория">{values.category || "-"}</Descriptions.Item>

        <Descriptions.Item label="Характеристики">
          {values.specs
            ? Object.entries(values.specs).map(([key, val]) => (
                <div key={key}>
                  <b>{key}</b>: {String(val)}
                </div>
              ))
            : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Удобства">
          {activeFeatures.length ? activeFeatures.join(", ") : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Ипотека">
          {values.mortgage_available ? "Да" : "Нет"}
        </Descriptions.Item>

        <Descriptions.Item label="Объекты поблизости">
          {values.nearby_list?.length ? values.nearby_list.join(", ") : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Локация">
          {`${values.location?.city || "-"}, ${values.location?.district || "-"}`}
        </Descriptions.Item>

        <Descriptions.Item label="Координаты">
          {`Широта: ${values.coordinates?.lat ?? "-"}, Долгота: ${values.coordinates?.lng ?? "-"}`}
        </Descriptions.Item>

        <Descriptions.Item label="Цена">
          {values.price
            ? `${values.price.amount ?? "-"} ${values.price.currency ?? ""}`
            : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Фото">
          {values.photos && values.photos.length > 0
            ? values.photos.map((file) => file.name || file).join(", ")
            : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Видео">
          {values.video && values.video.length > 0
            ? values.video.map((file) => file.name || file).join(", ")
            : "-"}
        </Descriptions.Item>
      </Descriptions>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large">
          Создать объявление
        </Button>
      </Form.Item>
    </>
  );
};

export default Step7Publish;
