import React from 'react';

const Checkout = () => {
  return (
    <div className="bg-[#F7FAFC] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Checkout Details</h2>
          
          <form className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500" required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500" required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
              <input type="text" placeholder="Street address, apartment, suite" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500" required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500" required />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2.5 outline-none focus:border-blue-500" required />
            </div>

            <div className="col-span-2 mt-4 pt-6 border-t border-gray-100">
              <h3 className="font-bold text-lg mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-blue-500 bg-blue-50 rounded-md cursor-pointer">
                  <input type="radio" name="pay" defaultChecked />
                  <span className="text-sm font-medium">Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                  <input type="radio" name="pay" />
                  <span className="text-sm font-medium">PayPal</span>
                </label>
              </div>
            </div>

            <button type="submit" className="col-span-2 bg-[#0D6EFD] text-white py-3 rounded-md font-bold text-lg mt-6 shadow-lg shadow-blue-100">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;