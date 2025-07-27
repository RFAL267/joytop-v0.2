// page.main.jsx
import { useState } from "react";
import "../../css/panel/panel.wallet.css";
import PanelLayout from "../../components/panel/panel.layout";
import { Wallet } from "lucide-react";

// Logos
import LogoPayme from "../../assets/img/logo.payme.png";
import LogoClick from "../../assets/img/logo.click.png";
import LogoStripe from "../../assets/img/logo.stripe.png";
import LogoPaypal from "../../assets/img/logo.paypal.png";

// Constants
const balances = [
  { currency: "сум", value: 0 },
  { currency: "руб", value: 0 },
  { currency: "usd", value: 0 },
];

const paymentOptions = [
  { name: "Payme", logo: LogoPayme },
  { name: "Click", logo: LogoClick },
  { name: "Stripe", logo: LogoStripe },
  { name: "PayPal", logo: LogoPaypal },
];

const transactions = [
  {
    id: 1,
    date: "20.06.2025",
    type: "Пополнение",
    kind: "accession",
    amount: "20 000 UZS",
  },
  {
    id: 2,
    date: "20.06.2025",
    type: "Покупка",
    kind: "purchase",
    amount: "55 000 UZS",
  },
  {
    id: 2,
    date: "20.06.2025",
    type: "Покупка",
    kind: "accession",
    amount: "125 000 UZS",
  },
];

// Components
const WalletCard = ({ currency, value }) => (
  <div className="wallet_card">
    <div className="wallet_card_head">
      <Wallet />
      <span>Баланс</span>
    </div>
    <h2 className="balance_value">
      {value} {currency}
    </h2>
  </div>
);

const PaymentOption = ({ name, logo, selected, onSelect }) => (
  <button
    className={`payment_option ${selected ? "selected" : ""}`}
    onClick={() => onSelect(name)}
  >
    <img src={logo} alt={`Платёжная система ${name}`} />
  </button>
);

const TransactionRow = ({ date, type, kind, amount }) => (
  <div className="row">
    <div className="date">{date}</div>
    <div className="type">
      <span className={kind}>{type}</span>
    </div>
    <div className="amount">{amount}</div>
  </div>
);

// Page Component
const PanelWallet = () => {
  const [selectedService, setSelectedService] = useState("Payme");
  const [amount, setAmount] = useState("");

  const handleTopUp = () => {
    const parsed = parseFloat(amount.replace(",", "."));
    if (isNaN(parsed) || parsed <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    // TODO: Send to API
    alert(`Пополнение через ${selectedService} на ${parsed}`);
  };

  return (
    <PanelLayout>
      <section className="panel_page panel_wallet">
        <h1>Мой кошелек</h1>

        <div className="wallet_bar">
          {balances.map((b, idx) => (
            <WalletCard key={idx} {...b} />
          ))}
        </div>

        <div className="payment_form">
          <h2>Пополнить баланс</h2>
          <div className="payment_services">
            {paymentOptions.map((p) => (
              <PaymentOption
                key={p.name}
                {...p}
                selected={selectedService === p.name}
                onSelect={setSelectedService}
              />
            ))}
          </div>

          <div className="payment_amount">
            <input
              type="text"
              placeholder="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTopUp}>Пополнить</button>
          </div>
        </div>

        <div className="panel_wallet_history">
          <h2>История</h2>
          <div className="table">
            {transactions.map((t) => (
              <TransactionRow key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default PanelWallet;
