import React, { useState } from 'react'
import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react";
import { motion } from 'framer-motion'
import ProductsList from '../components/admin/ProductsList';
import Analytics from '../components/admin/Analytics';
import CreateProduct from '../components/admin/createProduct';



const tabs = [
	{ name: "create", label: "Create Product", icon: PlusCircle },
	{ name: "products", label: "Products", icon: ShoppingBasket },
	{ name: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products')
  return (
    <div className=''>
      <motion.h1
					className='com-heading mb-5'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

        {/* Buttons */}
        <div className="flex items-center justify-center">
        {tabs.map((tab, index)=>
        <button onClick={()=> setActiveTab(tab.name)} key={index}
        className={`flex items-center mx-2 px-4 text-xl py-2 rounded-md transition-colors duration-200 cursor-pointer
                  ${activeTab===tab.name?"bg-emerald-600 text-white":"bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
          <tab.icon className='mx-2 h-5 w5' />
          {tab.label}
        </button>)}
        </div>
        {/* Components */}
        <div className="py-3 px-2 mt-12">
        {activeTab === "create" && <CreateProduct setActiveTab={setActiveTab}/>}
        {activeTab === "products" && <ProductsList/>}
        {activeTab === "analytics" && <Analytics/>}
        </div>
    </div>
  )
}

export default AdminPage