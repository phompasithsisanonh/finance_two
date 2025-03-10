import "./App.css";
import { Route, Routes } from "react-router-dom"; // เพิ่ม BrowserRouter
import LoanMoney from "./components/LoanMoney";
import LoanMoneyfloating from "./components/LoanMoneyfloating";
import ProfitSale from "./components/ProfitSale";
import DailyBudget from "./components/DailyBudget";
import Income from "./components/Income";
import Portfolio from "./page/Portfolio";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/loanMoney" element={<LoanMoney />} />
      <Route path="/loanMoneyFloting" element={<LoanMoneyfloating />} />
      <Route path="/profitSale" element={<ProfitSale />} />
      <Route path="/daily" element={<DailyBudget />} />
      <Route path="/income" element={<Income />} />
    </Routes>
  );
}

export default App;
