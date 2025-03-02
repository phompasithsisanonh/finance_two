
import './App.css';
import { Route, Routes } from "react-router-dom";
import FinanceLanding from "./page/FinanceLanding";
import LoanMoney from './components/LoanMoney';
import LoanMoneyfloating from './components/LoanMoneyfloating';
import ProfitSale from './components/ProfitSale';
import DailyBudget from './components/DailyBudget';
import Income from './components/Income';
function App() {
  return (
    <Routes>
      <Route path="/" element={<FinanceLanding />} />
      <Route path="/loanMoney" element={<LoanMoney />} />
      <Route path="/loanMoneyFloting" element={<LoanMoneyfloating />} />
      <Route path="/profitSale" element={<ProfitSale />} />
      <Route path="/daily" element={<DailyBudget />} />
      <Route path="/income" element={<Income />} />
      </Routes>
  );
}

export default App;
