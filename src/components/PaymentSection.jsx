import React from "react";

export default function PaymentSection({ payments, addPayment, updatePayment }) {
  return (
    <section className="bg-white  p-4 rounded shadow mb-6">
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold mb-3">Payment Plan</h2>
        <button onClick={addPayment} className="bg-blue-600 text-white px-3 py-1 rounded">+ Add Payment</button>
      </div>
      {payments.map((p, i) => (
        <div key={i} className="grid md:grid-cols-3 gap-2 mb-2">
          <div>
            <label className="block font-medium">Installments</label>
            <div className="p-2 border rounded w-2/3">Installment {p.installment}</div>
          </div>
          <div>
            <label className="block font-medium">Amount</label>
            <input type="number" className="p-2 border rounded w-2/3" placeholder="Amount" value={p.amount} onChange={(e) => updatePayment(i, "amount", Number(e.target.value) || 0)} />
          </div>
          <div>
            <label className="block font-medium">Due Date</label>
            <input type="text" className="p-2 border rounded w-2/3" value={p.dueDate} onChange={(e) => updatePayment(i, "dueDate", e.target.value)} />
          </div>
          
        </div>
      ))}
      
    </section>
  );
}
