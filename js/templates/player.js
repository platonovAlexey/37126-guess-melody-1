export const player = (audio) => `
  <div class="player-wrapper">
    <div class="player">
      <audio
        src="${audio.src}"
        preload="auto"></audio>
      <button class="player-control player-control--pause"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;

export const bindPlayerEvents = (nodeList) => {
  nodeList.forEach((it) => {
    const track = it.querySelector(`audio`);
    const button = it.querySelector(`button`);
    button.onclick = (evt) =>{
      const target = evt.target;
      evt.preventDefault();
      if (target.classList.contains(`player-control--pause`)) {
        target.classList.remove(`player-control--pause`);
        track.play();
      } else {
        target.classList.add(`player-control--pause`);
        track.pause();
      }
    };
  });
};
