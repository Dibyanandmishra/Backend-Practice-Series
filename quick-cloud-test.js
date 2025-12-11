import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
const localPath = path.resolve('public/temp/example.jpg');

cloudinary.config({
  cloud_name: 'PRACTICE01',           // paste exact from dashboard
  api_key: '391438383853782',
  api_secret: 'ppPU3cJrnrOvD-ODq46nWKKtn34'
});

(async () => {
  try {
    console.log('Using cloud:', cloudinary.config().cloud_name);
    const res = await cloudinary.uploader.upload(localPath, { resource_type: 'auto' });
    console.log('OK', res && res.url);
  } catch (e) {
    console.error('ERR', e && (e.stack || e));
  }
})();
