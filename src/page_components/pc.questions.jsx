import React from "react";
import { Collapse } from "antd";
import "../css/components/pc.questions.css";

const { Panel } = Collapse;

const questions = [
  {
    id: "q1",
    question: "Как работает ваша платформа?",
    answer:
      "Наша платформа использует современные технологии для обеспечения надежной и безопасной работы.",
  },
  {
    id: "q2",
    question: "Какие способы оплаты доступны?",
    answer: "Мы принимаем кредитные карты, PayPal и банковские переводы.",
  },
  {
    id: "q3",
    question: "Могу ли я отменить подписку?",
    answer:
      "Да, вы можете отменить подписку в любой момент в настройках профиля.",
  },
  {
    id: "q4",
    question: "Как работает ваша платформа?",
    answer:
      "Наша платформа использует современные технологии для обеспечения надежной и безопасной работы.",
  },
  {
    id: "q5",
    question: "Какие способы оплаты доступны?",
    answer: "Мы принимаем кредитные карты, PayPal и банковские переводы.",
  },
  {
    id: "q6",
    question: "Могу ли я отменить подписку?",
    answer:
      "Да, вы можете отменить подписку в любой момент в настройках профиля.",
  },
  {
    id: "q7",
    question: "Как работает ваша платформа?",
    answer:
      "Наша платформа использует современные технологии для обеспечения надежной и безопасной работы.",
  },
  {
    id: "q8",
    question: "Какие способы оплаты доступны?",
    answer: "Мы принимаем кредитные карты, PayPal и банковские переводы.",
  },
  {
    id: "q9",
    question: "Могу ли я отменить подписку?",
    answer:
      "Да, вы можете отменить подписку в любой момент в настройках профиля.",
  },
];

const PC_Questions = () => {
  return (
    <section className="pc-questions">
      <div className="container">
        <h2>Часто задаваемые вопросы</h2>
        <Collapse accordion size="large">
          {questions.map(({ id, question, answer }) => (
            <Panel header={question} key={id}>
              <p>{answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  );
};

export default PC_Questions;
