// store/usePhotographerStore.js
import { create } from 'zustand';
import axios from 'axios';
import Fuse from 'fuse.js';

const usePhotographerStore = create((set) => ({
  photographers: [],
  featuredPhotographers: [], // ✅ Add featuredPhotographers
  loading: false,

  fetchPhotographers: async (query = '') => {
    set({ loading: true });

    try {
      const res = await axios.get('/api/photographers');
      let data = res.data;

      // 🔍 Filter if query exists
      if (query) {
        const fuse = new Fuse(data, {
          keys: ['name', 'location', 'tags', 'styles'],
          threshold: 0.3,
        });
        data = fuse.search(query).map(result => result.item);
      }

      // ✅ Pick top 3 by rating
      const featured = [...res.data]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);

      set({ photographers: data, featuredPhotographers: featured, loading: false });
    } catch (error) {
      console.error('Error fetching photographers:', error);
      set({ photographers: [], featuredPhotographers: [], loading: false });
    }
  },
}));

export default usePhotographerStore;


