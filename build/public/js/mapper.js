const toProductData = (formValue) => {
  const hasImageUrl =
    formValue.imageUrl === undefined
      ? ""
      : googleDriveImageViewGenerator(formValue.imageUrl);
  return {
    brand: formValue.brand,
    type: formValue.type,
    category: formValue.category,
    size: stringToArray(formValue.size),
    configurations: stringToArray(formValue.configurations),
    details: formValue.details,
    model_no: formValue.modelNo,
    image_url: hasImageUrl,
  };
};
const stringToArray = (str) => {
  return str.split(",");
};
const googleDriveImageViewGenerator = (url) => {
  if (url === null || url === undefined) {
    return;
  }
  const mainUrl = "https://drive.google.com/uc?export=view&id=";
  const imageId = getImageIdFromPublicUrl(url);
  const mergedUrl = mainUrl + imageId;
  return mergedUrl;
};

const getImageIdFromPublicUrl = (publicUrl) => {
  const backSlashSplitedUrl = publicUrl.split("/");
  const imageId = backSlashSplitedUrl[5];
  return imageId;
};

export { toProductData };
