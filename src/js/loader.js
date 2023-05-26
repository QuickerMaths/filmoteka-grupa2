const loaderContainer = document.querySelector('.loader-container');

const displayLoading = () => {
  loaderContainer.style.display = 'flex';
};

const hideLoading = () => {
  loaderContainer.style.display = 'none';
};

export { displayLoading, hideLoading };
