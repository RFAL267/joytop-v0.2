import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Upload,
  Typography,
  message,
} from "antd";
import { CameraOutlined, UploadOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/user.context";
import { USER_API } from "../../services/user.api";
import PanelLayout from "../../components/panel/panel.layout";
import userMockImg from "../../assets/img/user.png";
import "../../css/panel/panel.profile.css";

const { Title } = Typography;
const { TextArea } = Input;

const PanelProfile = () => {
  const { user, updateUser } = useContext(UserContext);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userMockImg);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        whatsapp: user.contacts?.whatsapp || "",
        telegram: user.contacts?.telegram || "",
        contactPhone: user.contacts?.contact_phone || "",
        bio: user.bio || "",
        phone: user.phone || "",
      });

      if (user.avatarUrl) {
        setAvatarUrl(user.avatarUrl);
      }
    }
  }, [user, form]);

const handleSave = async (values) => {
  try {
    setLoading(true);

    const payload = {
      name: values.name,
      bio: values.bio,
      contacts: {
        whatsapp: values.whatsapp,
        telegram: values.telegram,
        contact_phone: values.contactPhone,
      },
    };

    const response = await USER_API.editProfile(payload);
    console.log("Обновлённые данные профиля:", response?.data);

    if (response?.data) {
      updateUser(response.data); // Контекст + localStorage
      form.setFieldsValue({
        name: response.data.name || "",
        whatsapp: response.data.contacts?.whatsapp || "",
        telegram: response.data.contacts?.telegram || "",
        contactPhone: response.data.contacts?.contact_phone || "",
        bio: response.data.bio || "",
        phone: response.data.phone || "",
      });
      if (response.data.avatarUrl) {
        setAvatarUrl(response.data.avatarUrl);
      }
      message.success("Профиль успешно обновлён");
    }
  } catch (err) {
    console.error("Ошибка обновления профиля:", err);
    message.error("Не удалось сохранить изменения");
  } finally {
    setLoading(false);
  }
};


  const handleAvatarChange = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    try {
      setLoading(true);
      const previewUrl = URL.createObjectURL(file);
      setAvatarUrl(previewUrl);

      // ⚠️ Тут должна быть API-логика загрузки аватара
      const response = await USER_API.editProfile({ avatarFile: file });

      if (response?.data?.avatarUrl) {
        setAvatarUrl(response.data.avatarUrl);
        updateUser({ avatarUrl: response.data.avatarUrl });
        message.success("Аватар обновлён");
      }
    } catch (err) {
      console.error("Ошибка загрузки аватара:", err);
      message.error("Не удалось обновить аватар");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PanelLayout>
      <section className="panel_page panel_profile">
        <Title level={2}>Мой профиль</Title>
        <Card variant="bordered" style={{ maxWidth: 1200 }}>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSave}
            disabled={loading}
          >
            <Form.Item label="Аватар">
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
              >
                <div
                  className="upload_label"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <Avatar
                    src={avatarUrl}
                    size={200}
                    className="upload_label_crc"
                  />
                  <CameraOutlined className="icon" />
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Название профиля"
              name="name"
              rules={[{ required: true, message: "Введите имя" }]}
            >
              <Input placeholder="Например: Иван Иванов" size="large" />
            </Form.Item>

            <Form.Item label="Про вас" name="bio">
              <TextArea
                rows={3}
                placeholder="Кратко расскажите о себе"
                size="large"
              />
            </Form.Item>

            <Form.Item label="Whatsapp" name="whatsapp">
              <Input placeholder="Контакт в WhatsApp" size="large" />
            </Form.Item>

            <Form.Item label="Telegram" name="telegram">
              <Input placeholder="@username" size="large" />
            </Form.Item>

            <Form.Item label="Доп. номер телефона" name="contactPhone">
              <Input placeholder="+7 (999) 123-45-67" size="large" />
            </Form.Item>

            <Form.Item label="Основной номер" name="phone">
              <Input disabled size="large" />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<UploadOutlined />}
                loading={loading}
                size="large"
              >
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </section>
    </PanelLayout>
  );
};

export default PanelProfile;
