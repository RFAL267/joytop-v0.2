import "../css/components/pc.support.req.css";
import { Input, Button } from "antd";

const { TextArea } = Input;

const PC_SupportReq = () => {
  return (
    <section className="pc-support-req">
      <div className="container">
        <div className="support_form">
          <header className="support_form_header">
            <h2>Возникли проблемы ?</h2>
            <p>Оставьте заявку в службу поддержки и ждите ответа</p>
          </header>

          <Input
            className="email"
            type="email"
            name="req_email"
            placeholder="email@gmail.com"
            size="large"
          />

          <TextArea
            className="req_text"
            name="support_req"
            placeholder="Ваша проблема/заявка"
            autoSize={{ minRows: 4, maxRows: 8 }}
          />

          <div className="btns">
            <Button
              type="primary"
              className="btn_req"
              size="large"
              block
            >
              Отправить Запрос
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PC_SupportReq;
