const loaderContainer = document.querySelector('.loader-container');

const displayLoading = () => {
  loaderContainer.style.display = 'block';
};

const hideLoading = () => {
  loaderContainer.style.display = 'none';
};

export { displayLoading, hideLoading };
