import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {
  return (
    <div className="w-full h-96 relative group overflow-hidden">
      <Link to={`/category${category.href}`} className="">
        <img
          src={category.imageUrl}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          alt="category image"
        />
      </Link>
      <div className="absolute bottom-4 left-4 z-20 text-white">
        <h3 className="text-xl font-bold">{category.name}</h3>
        <p>Explore {category.name}</p>
      </div>
    </div>
  )
}

export default CategoryItem
