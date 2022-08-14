//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.querySelector("#root");
const head = document.createElement("div3");
rootElem.appendChild(head);

const episodeSearch = document.createElement("input");
episodeSearch.placeholder = "Episode search..";
let searchValue = "";
episodeSearch.addEventListener("keyup", episodeSearching);
head.appendChild(episodeSearch);

const displaySearchedEpisodes = document.createElement("p2");
displaySearchedEpisodes.innerHTML = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`
head.appendChild(displaySearchedEpisodes);

const allEpisodesContainer = document.createElement("div1");
rootElem.appendChild(allEpisodesContainer);

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function episodeSearching() {
  const allEpisodes = getAllEpisodes();
  searchValue = event.target.value.toLowerCase();
  allEpisodesContainer.innerHTML = "";

  let searchedEpisodes = allEpisodes.filter((episode) => {
    return `${episode.name} - S0${episode.season}E0${episode.number}${episode.summary}`.toLowerCase().includes(searchValue);
  });
  makePageForEpisodes(searchedEpisodes);
  displaySearchedEpisodes.innerHTML = `Displaying ${searchedEpisodes.length}/${allEpisodes.length} episodes`;
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
