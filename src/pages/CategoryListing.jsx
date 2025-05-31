import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import usePhotographerStore from '../store/usePhotographerStore';
import { Skeleton } from '../components/ui/skeleton';
import SearchBar from '../components/SearchBar';

const CategoryListing = () => {
  const { photographers, fetchPhotographers, loading } = usePhotographerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhotographers();
  }, []);

  const filteredPhotographers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return photographers.filter((p) => {
      const nameMatch = p.name?.toLowerCase().includes(query);
      const locationMatch = p.location?.toLowerCase().includes(query);
      const tagsMatch = p.tags?.some((tag) => tag.toLowerCase().includes(query));
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
      const ratingMatch = p.rating >= minRating;
      const styleMatch = selectedStyles.length === 0 || selectedStyles.some(style => p.tags?.includes(style));
      const cityMatch = !selectedCity || p.location === selectedCity;
      return (nameMatch || locationMatch || tagsMatch) && priceMatch && ratingMatch && styleMatch && cityMatch;
    });
  }, [photographers, searchQuery, priceRange, minRating, selectedStyles, selectedCity]);

  const sortedPhotographers = useMemo(() => {
    const sorted = [...filteredPhotographers];
    if (sortOption === 'priceLowToHigh') sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === 'ratingHighToLow') sorted.sort((a, b) => b.rating - a.rating);
    else if (sortOption === 'recentlyAdded') sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }, [filteredPhotographers, sortOption]);

  const topPhotographers = useMemo(() => sortedPhotographers.slice(0, 3), [sortedPhotographers]);
  const restPhotographers = useMemo(() => sortedPhotographers.slice(3), [sortedPhotographers]);
  const showSearchResultText = searchQuery !== '';

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Filters */}
      {!showSearchResultText && (
        <div className="mt-8 mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-6">
            {/* Price Range */}
            <div className="flex items-center gap-3 min-w-[260px]">
              <label className="font-medium whitespace-nowrap">
                Price Range: Up to ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-[160px]"
              />
            </div>

            {/* Rating Dropdown */}
            <div className="flex items-center gap-2 min-w-[180px]">
              <label className="font-medium whitespace-nowrap">Rating:</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="border px-3 py-2 rounded"
              >
                <option value={0}>All Ratings</option>
                <option value={4}>4+</option>
                <option value={3}>3+</option>
                <option value={2}>2+</option>
              </select>
            </div>

            {/* City Dropdown */}
            <div className="flex items-center gap-2 min-w-[200px]">
              <label className="font-medium whitespace-nowrap">City:</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">All Cities</option>
                {[...new Set(photographers.map((p) => p.location))].map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2">
              <label className="font-medium whitespace-nowrap">Sort By:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">Default</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="ratingHighToLow">Rating: High to Low</option>
                <option value="recentlyAdded">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Styles */}
          <div className="flex items-center gap-4 flex-wrap">
            <label className="font-medium whitespace-nowrap">Styles:</label>
            {['Traditional', 'Candid', 'Studio', 'Outdoor'].map((style) => (
              <label key={style} className="inline-flex items-center text-sm mr-2">
                <input
                  type="checkbox"
                  value={style}
                  checked={selectedStyles.includes(style)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStyles([...selectedStyles, style]);
                    } else {
                      setSelectedStyles(selectedStyles.filter((s) => s !== style));
                    }
                  }}
                  className="mr-1"
                />
                {style}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Search Result Message */}
      {showSearchResultText && (
        <div className="text-lg font-medium mt-6 mb-4">
          {sortedPhotographers.length > 0 ? (
            <>Showing results for "<span className="text-red-600">{searchQuery}</span>"</>
          ) : (
            <>No photographers found for "<span className="text-red-600">{searchQuery}</span>"</>
          )}
        </div>
      )}

      {/* Top 3 Photographers */}
      {!showSearchResultText && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Top 3 Rated Photographers</h2>
          <div className="flex flex-col md:flex-row gap-6">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 flex-1 border rounded-lg space-y-3 shadow">
                    <Skeleton className="h-48 w-full rounded-md" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              : topPhotographers.map((p) => (
                  <div
                    key={p.id}
                    className="flex-1 border rounded-xl p-4 bg-gradient-to-br from-pink-100 to-red-50 shadow"
                  >
                    <img
                      src={p.profilePic}
                      alt={p.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600">{p.bio || 'Top-rated photographer'}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">City:</span> {p.location || 'Location not specified'}
                    </p>
                    <p className="text-sm mt-1 font-medium">Rating: {p.rating}</p>
                    <p className="text-sm mt-1 text-gray-800">Price: ₹{p.price}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/photographer/${p.id}`)}
                      className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
          </div>
        </>
      )}

      {/* All or Search Results */}
      {sortedPhotographers.length > 0 && (
        <>
          {!showSearchResultText && (
            <h2 className="text-2xl font-bold mt-8 mb-4">All Photographers</h2>
          )}
          <div className="flex flex-col space-y-6 mt-8">
            {(showSearchResultText ? sortedPhotographers : restPhotographers).map((p) => (
              <div key={p.id} className="p-4 border rounded-xl bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <img src={p.profilePic} alt={p.name} className="w-32 h-32 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{p.bio || 'Photographer'}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">City:</span> {p.location || 'Location not specified'}
                    </p>
                    <p className="text-sm mt-1 font-medium">Rating: {p.rating}</p>
                    <p className="text-sm mt-1">Starting ₹{p.price}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigate(`/photographer/${p.id}`)}
                      className="mt-3 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryListing;




