export const getMusicPlayer = (audio) => `
  <div class="player-wrapper">
    <div class="player">
      <audio
        src="${audio.src}"
        preload="auto"></audio>
      <button class="player-control player-control--play"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;

export const bindPlayerEvents = (nodeList) => {
  const disableOthers = (elements, current) => {
    elements.forEach((it) => {
      it.disabled = true;
    });
    current.disabled = false;
  };
  const enableAll = (elements) => {
    elements.forEach((it) => {
      it.disabled = false;
    });
  };
  const buttons = [];
  nodeList.forEach((it) => {
    const track = it.querySelector(`audio`);
    const button = it.querySelector(`button`);
    buttons.push(button);
    button.onclick = (evt) => {
      const target = evt.target;
      evt.preventDefault();
      if (target.classList.contains(`player-control--play`)) {
        target.classList.remove(`player-control--play`);
        target.classList.add(`player-control--pause`);
        track.play();
        disableOthers(buttons, target);
      } else {
        target.classList.add(`player-control--play`);
        target.classList.remove(`player-control--pause`);
        track.pause();
        enableAll(buttons);
      }
    };
  });
};
