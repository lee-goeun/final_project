import create from 'zustand';
import axios from 'axios';

export const postStore = create((set) => ({
  postLikeCount: 0,
  LikeIncrease: () =>
    set((state) => ({ postLikeCount: state.postLikeCount + 1 })),
  LikeDecrease: () =>
    set((state) => ({ postLikeCount: state.postLikeCount - 1 })),
  async getList() {
    const response = await axios.get('http://localhost:3001/board/');
  },
}));
