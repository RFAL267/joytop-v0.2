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

// onFinish
 
const onFinish = async () => {
  const values = form.getFieldsValue(true);
  console.log("OBJ", values);

  const formData = new FormData();

  // Простые поля
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("transaction_type", values.transaction_type);
  formData.append("category", values.category);

  // ✅ Массив типов недвижимости (если это массив)
  if (Array.isArray(values.types)) {
    values.types.forEach((type) => formData.append("types[]", type));
  } else if (values.types) {
    formData.append("types[]", values.types);
  }

  // ✅ specs — передаем каждое поле по ключу: specs[area], specs[floor], ...
  if (values.specs) {
    Object.entries(values.specs).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(`specs[${key}]`, val);
      }
    });
  }

  // ✅ features — массив значений
  if (Array.isArray(values.features)) {
    values.features.forEach((id) => formData.append("features[]", id));
  }

  // ✅ mortgage_available — булево
  formData.append("mortgage_available", values.mortgage_available ? 1 : 0);

  // ✅ nearby_list — массив
  if (Array.isArray(values.nearby_list)) {
    values.nearby_list.forEach((id) => formData.append("nearby_list[]", id));
  }

  // ✅ location[city_id], location[district_id]
  if (values.location) {
    Object.entries(values.location).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(`location[${key}]`, val);
      }
    });
  }

  // ✅ coordinates[lat], coordinates[lng]
  if (values.coordinates) {
    Object.entries(values.coordinates).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(`coordinates[${key}]`, val);
      }
    });
  }

  // ✅ price[currency], price[amount]
  if (values.price) {
    Object.entries(values.price).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(`price[${key}]`, val);
      }
    });
  }

  // ✅ статус
  formData.append("status", values.status ? 1 : 0);

  // ✅ Фото
  if (Array.isArray(values.photos)) {
    values.photos.forEach((file) => {
      formData.append("photos", file.originFileObj || file);
    });
  }

  // ✅ Видео
  if (Array.isArray(values.video)) {
    values.video.forEach((file) => {
      formData.append("video", file.originFileObj || file);
    });
  }

  try {
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
            title: "",
            description: "",
            category: null,
            transaction_type: null,
            types: null,

            specs: {
              area: null,
              living_area: null,
              lot_area: null,
              ceiling_height: null,
              age: null,
              renovation: null,
              rooms: null,
              bedrooms: null,
              bathrooms: null,
              toilets: null,
              balconies: null,
              floor: null,
              total_floors: null,
              furnished: false,
              built_in_kitchen: false,
              air_conditioning: false,
              heating: null,
              hot_water: null,
              parking: false,
              garage: false,
              elevator: false,
              security: false,
              energy_efficiency: null,
              noise_level: null,
            },

            features: [],
            mortgage_available: false,
            nearby_list: [],

            location: {
              city_id: null,
              district_id: null,
            },

            coordinates: {
              lat: null,
              lng: null,
            },

            price: {
              currency: null,
              amount: null,
            },

            photos: [],
            video: [],

            status: true,
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
