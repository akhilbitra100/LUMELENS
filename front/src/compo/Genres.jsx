import React from 'react';
import { useNavigate } from 'react-router-dom';

function Genres() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Portrait Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744085150/photo-uploads/tbf83wjsthb64peggbnv.jpg', route: '/portrait' },
    { name: 'Landscape Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744351469/photo-uploads/at0qqrr4ksnbvhro7jqx.jpg', route: '/landscape' },
    { name: 'Wildlife Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744352523/photo-uploads/p0dk1nq2ffeoogzeyaim.jpg', route: '/wildlife' },
    { name: 'Fashion Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744352900/photo-uploads/fgd7ln50ob5y8funfnpj.jpg', route: '/fashion' },
    { name: 'Street Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744353641/photo-uploads/ippcpraxcfcdl8zbecwg.jpg', route: '/street' },
    { name: 'Sports Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744354181/photo-uploads/xye9eo4gl8kexfosvaze.jpg', route: '/sport' },
    { name: 'Architectural Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744373738/photo-uploads/uee3fjpplvvspmx5eez9.jpg', route: '/architecture' },
    { name: 'Event Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744374329/photo-uploads/om2vm4olufaaymaazoqn.jpg', route: '/event' },
    { name: 'Macro Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744375212/photo-uploads/qw0bhyvem97jbdicjogz.jpg', route: '/macro' },
    { name: 'Astrophotography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744375702/photo-uploads/nt1lltiil6najyarnbze.jpg', route: '/astro' },
    { name: 'Black & White Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744376155/photo-uploads/fichzyuehxrfhw9v3l9e.jpg', route: '/bw' },
    { name: 'Fine Art Photography', image: 'https://res.cloudinary.com/dp2vpmcac/image/upload/v1744376325/photo-uploads/t0chekqfm7wbid5qq84x.jpg', route: '/fine' },
  ];
  
  return (
    <div className="my-20 container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Photography Styles</h1>
      <p className="text-lg text-center mb-12 text-gray-600">
        Discover various photography styles from professionals worldwide.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div 
            key={category.name} 
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-64"
            onClick={() => category.route && navigate(category.route)}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-xl font-semibold text-center px-4">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Genres;