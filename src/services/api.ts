import axios from 'axios';

const api = axios.create({
  baseURL: 'http://osu.ppy.sh/api/get_beatmaps',
});

export default api;
