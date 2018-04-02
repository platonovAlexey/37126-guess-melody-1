const app = document.querySelector(`.app`);

export default (el) => {
  const main = app.querySelector(`.main`);
  if (main && main.parentElement === app) {
    app.removeChild(main);
    app.appendChild(el);
  }
};
