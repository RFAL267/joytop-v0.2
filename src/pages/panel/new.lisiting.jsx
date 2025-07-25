import { useState } from "react";
import "../../css/panel/panel.new.listing.css";
import {
  Button,
  Form,
  message,
} from "antd";
import PanelLayout from "../../components/panel/panel.layout";
import Step1Basic from "./create_steps/step1.basic";
import Step2Specs from "./create_steps/step2.specs";
import Step3Features from "./create_steps/step3.features";
import Step4Location from "./create_steps/step4.location";
import Step5Price from "./create_steps/step5.price";
import Step6Media from "./create_steps/step6.media";
import Step7Publish from "./create_steps/step7.publish";

import { POST_NewListing } from "../../services/api.listing.service";

const STEPS = [
  "Основное",
  "Характеристики",
  "Удобства",
  "Локация",
  "Цена",
  "Медиа",
  "Публикация",
];

const PanelNewListing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const getFieldsByStep = (step) => {
    switch (step) {
      case 0:
        // category — строка id, type — массив строк
        return [
          "title",
          "description",
          "category",
          "transaction_type",
          "types",
        ];
      case 1:
        return [
          ["specs", "area"],
          ["specs", "living_area"],
          ["specs", "lot_area"],
          ["specs", "ceiling_height"],
          ["specs", "age"],
          ["specs", "renovation"],
          ["specs", "rooms"],
          ["specs", "bedrooms"],
          ["specs", "bathrooms"],
          ["specs", "toilets"],
          ["specs", "balconies"],
          ["specs", "floor"],
          ["specs", "total_floors"],
          ["specs", "furnished"],
          ["specs", "built_in_kitchen"],
          ["specs", "air_conditioning"],
          ["specs", "heating"],
          ["specs", "hot_water"],
          ["specs", "parking"],
          ["specs", "garage"],
          ["specs", "elevator"],
          ["specs", "security"],
          ["specs", "energy_efficiency"],
          ["specs", "noise_level"]
        ];
      case 2:
        return [
          "features",
          "mortgage_available",
          "nearby_list"
        ];
      case 3:
        return [
          ["location", "city_id"],
          ["location", "district_id"],
          ["coordinates", "lat"],
          ["coordinates", "lng"]
        ];
      case 4:
        return [
          ["price", "currency"],
          ["price", "amount"]
        ];
      case 5:
        return ["photos", "video"];
      case 6:
        return ["status"];
      default:
        return [];
    }
  };

  const nextStep = async () => {
    try {
      const stepFields = getFieldsByStep(currentStep);
      await form.validateFields(stepFields);
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      // Валидация покажет ошибки автоматически
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

const onFinish = async () => {
  
  const values = form.getFieldsValue(true);
  console.log("OBJ", values);
  
  // Создаём FormData для отправки multipart/form-data
  const formData = new FormData();

  // Добавляем обычные поля
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("transaction_type", values.transaction_type);
  formData.append("types", values.types);
  formData.append("category", values.category); // если id - строка или число

  // Добавляем вложенные объекты — нужно сериализовать в JSON или по ключам
  formData.append("specs", JSON.stringify(values.specs || {}));
  formData.append("features", JSON.stringify(values.features || []));
  formData.append("mortgage_available", values.mortgage_available);
  formData.append("nearby_list", JSON.stringify(values.nearby_list || []));
  
  formData.append("location", JSON.stringify(values.location || {}));
  formData.append("coordinates", JSON.stringify(values.coordinates || {}));
  formData.append("price", JSON.stringify(values.price || {}));
  formData.append("status", values.status);

  // Добавляем файлы из массива photos, если они есть
  if (values.photos && values.photos.length > 0) {
    values.photos.forEach((file, index) => {
      // file может быть объектом из Upload, например file.originFileObj
      formData.append(`photos`, file.originFileObj || file);
    });
  }

  // Аналогично для видео
  if (values.video && values.video.length > 0) {
    values.video.forEach((file, index) => {
      formData.append(`video`, file.originFileObj || file);
    });
  }

  try {
    // POST-запрос с formData, например через fetch
    await POST_NewListing(formData);

    message.success("Объявление успешно создано");
  } catch (err) {
    console.error("Ошибка при создании объявления:", err);
    message.error("Не удалось создать объявление. Попробуйте ещё раз.");
  }
};




const renderStepContent = (step) => {
  switch (step) {
    case 0:
      return <Step1Basic form={form} />;
    case 1:
      return <Step2Specs form={form} />;
    case 2:
      return <Step3Features form={form} />;  // <-- важно
    case 3:
      return <Step4Location form={form} />;
    case 4:
      return <Step5Price form={form} />;
    case 5:
      return <Step6Media form={form} />;
    case 6:
      return <Step7Publish form={form} />;
    default:
      return null;
  }
};

  return (
    <PanelLayout>
      <section className="panel_page panel_new_listing">
        <h1>
          {currentStep + 1}/{STEPS.length} {STEPS[currentStep]}
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            specs: {
              furnished: false,
              air_conditioning: false,
              parking: false,
              built_in_kitchen: false,
              garage: false,
              elevator: false,
              security: false,
              smart_home: false,
            },
            features: [],
            mortgage_available: false,
            status: true,
            types: null, // по умолчанию пустой массив
          }}
          scrollToFirstError
        >
          {renderStepContent(currentStep)}

          <div className="step_btns" style={{ marginTop: 24 }}>
            {currentStep > 0 && (
              <Button onClick={prevStep} type="default" size="large" style={{ marginRight: 8 }}>
                Назад
              </Button>
            )}
            {currentStep < STEPS.length - 1 && (
              <Button type="primary" onClick={nextStep} size="large">
                Далее
              </Button>
            )}
            {currentStep === STEPS.length - 1 && (
              <Button type="primary" htmlType="submit" size="large">
                Отправить
              </Button>
            )}
          </div>
        </Form>
      </section>
    </PanelLayout>
  );
};

export default PanelNewListing;
