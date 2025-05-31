import { Link } from 'react-router-dom';

const PhotographerCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col">
    <img
      src={data.profilePic}
      alt={data.name}
      className="w-full h-48 object-cover rounded-md mb-3"
    />
    <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>
    <p className="text-gray-500 text-sm">{data.location}</p>
    <p className="text-sm mt-1 text-gray-600">Starting ₹{data.price}</p>
    <p className="text-sm text-yellow-600">Rating: {data.rating}</p>
    <div className="flex flex-wrap gap-2 mt-2">
      {data.tags.map((tag, i) => (
        <span
          key={i}
          className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
        >
          {tag}
        </span>
      ))}
    </div>
    <Link
      to={`/photographer/${data.id}`}
      className="mt-3 text-sm font-medium text-indigo-600 hover:underline"
    >
      View Profile
    </Link>
  </div>
);

export default PhotographerCard;
