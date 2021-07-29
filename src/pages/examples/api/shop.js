// get categories
// api/v2/admin/getshop', (req, res) => {

import axios from 'axios';

export const getshops = async () => {
  try {
    const data = await axios.get('https://www.khaymatapi.mvp-apps.ae/api/v2/admin/shop');
    return data;
  } catch (e) {
    console.log(e);
  }
};
