import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PhotographerProfile = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);

  useEffect(() => {
    axios.get(`https://my-json-server.typicode.com/satyampathak12/pixisphere-data/photographers/${id}`).then((res) => {
      setPhotographer(res.data);
    });
  }, [id]);

  if (!photographer) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{photographer.name}</h2>
      <p className="text-gray-600 mb-2">{photographer.bio}</p>
      <p className="text-sm text-gray-500">Price: ₹{photographer.price}</p>
      <p className="text-sm text-gray-500 mb-4">Styles: {photographer.styles.join(', ')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {photographer.portfolio.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-full h-32 sm:h-40 object-cover rounded-md shadow"
            alt={`Portfolio ${i}`}
          />
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Reviews</h4>
        {photographer.reviews.map((rev, i) => (
          <div key={i} className="border p-3 rounded-lg mb-3 bg-gray-50">
            <p className="font-semibold text-gray-800">{rev.name}</p>
            <p className="text-sm text-gray-700">{rev.comment}</p>
            <p className="text-xs text-gray-400">{rev.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotographerProfile;

