import React from 'react'
import CategoryItem from '../components/CategoryItem';

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
  return (
    <div>
      <h1 className='com-heading'>Explore Our Categories</h1>
      <p className='text-center text-xl text-gray-300 mb-12'>Discover the latest trends in eco-friendly fashion</p>

      {/* Categories */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index)=>(
          <CategoryItem category={category} key={index}/>
        ))}
      </div>
      {/* Featured Products */}
    </div>
  )
}

export default HomePage