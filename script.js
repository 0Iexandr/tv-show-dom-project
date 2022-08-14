//You can edit ALL of the code here
const rootElem = document.querySelector("#root");

const allEpisodesContainer = document.createElement("div1");
rootElem.appendChild(allEpisodesContainer);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  episodeList.forEach(episode => {
    let episodesNameAndCode = document.createElement("h1");
    episodesNameAndCode.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`;

    let episodesPicture = document.createElement("img");
    episodesPicture.src = episode.image.medium;

    let episodesSummaryText = document.createElement("p1");
    episodesSummaryText.innerHTML = episode.summary;

    const oneEpisodeContainer = document.createElement("div2");
    oneEpisodeContainer.onclick = () => location.href = episode.url;

    oneEpisodeContainer.appendChild(episodesNameAndCode);
    oneEpisodeContainer.appendChild(episodesPicture);
    oneEpisodeContainer.appendChild(episodesSummaryText);
    allEpisodesContainer.appendChild(oneEpisodeContainer);
  });
}

let footerSeparator = document.createElement("hr");
rootElem.appendChild(footerSeparator);

let footerData = document.createElement("a");
footerData.innerHTML = "© TVmaze.com";
footerData.href = "https://www.tvmaze.com/";
rootElem.appendChild(footerData);

window.onload = setup;
