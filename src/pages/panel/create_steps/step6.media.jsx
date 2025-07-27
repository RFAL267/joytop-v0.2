// components/panel/steps/step6.media.jsx
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

// Нормализация fileList для Upload
const normFile = (e) => {
  if (Array.isArray(e)) return e;
  return e?.fileList || [];
};

const Step6Media = () => (
  <>
    <Form.Item
      label="Фотографии"
      name="photos"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      preserve
      rules={[{ required: true, message: "Загрузите хотя бы одну фотографию" }]}
    >
      <Upload
        multiple
        listType="picture"
        beforeUpload={() => false} // Файлы не загружаются автоматически
        accept="image/*"
        maxCount={10}
      >
        <Button type="primary" icon={<UploadOutlined />} size="large">
          Загрузить фото
        </Button>
      </Upload>
    </Form.Item>

    <Form.Item
      label="Видео"
      name="video"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      preserve
      rules={[{ required: false }]}
    >
      <Upload
        listType="text"
        beforeUpload={() => false}
        accept="video/*"
        maxCount={1}
      >
        <Button icon={<UploadOutlined />} size="large">
          Загрузить видео
        </Button>
      </Upload>
    </Form.Item>
  </>
);

export default Step6Media;
