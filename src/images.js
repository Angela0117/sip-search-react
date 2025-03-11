
const images = import.meta.glob('/assets/images/*.{jpg,png,gif,svg}', { eager: true });

const imagePaths = Object.fromEntries(
  Object.entries(images).map(([key, value]) => {
    const filename = key.split('/').pop().replace(/\.[^/.]+$/, ""); // 取得純檔名
    return [filename, value.default]; // 設定 key-value
  })
);

export default imagePaths; // 匯出處理好的圖片物件
