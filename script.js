//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
const rootElem = document.querySelector("#root");
const head = document.createElement("div3");
const episodeSelector = document.createElement("select");
const allEpisodesOption = document.createElement("option");
const episodeSearch = document.createElement("input");
let searchValue = "";
const displaySearchedEpisodes = document.createElement("p2");
const allEpisodesContainer = document.createElement("div1");

allEpisodesOption.innerText = "All episodes";
allEpisodesOption.value = "All episodes";
episodeSearch.placeholder = "Episode search..";
displaySearchedEpisodes.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;

episodeSearch.addEventListener("keyup", episodeSearching);
episodeSelector.addEventListener("change", episodeSelecting)

rootElem.appendChild(head);
episodeSelector.appendChild(allEpisodesOption);
head.appendChild(episodeSelector);
head.appendChild(episodeSearch);
head.appendChild(displaySearchedEpisodes);
rootElem.appendChild(allEpisodesContainer);

function setup() {
  makePageForEpisodes(allEpisodes);
}

function episodeSearching() {
  searchValue = event.target.value.toLowerCase();
  allEpisodesContainer.replaceChildren([]);
  let searchedEpisodes = allEpisodes.filter((episode) => {
    return `${episode.name} - S0${episode.season}E0${episode.number}${episode.summary}`.toLowerCase().includes(searchValue);
  });
  makePageForEpisodes(searchedEpisodes);
  displaySearchedEpisodes.innerText = `Displaying ${searchedEpisodes.length}/${allEpisodes.length} episodes`;
}

function episodeSelecting() {
  allEpisodesContainer.replaceChildren([]);
  if(event.target.value === "All episodes") {
    makePageForEpisodes(allEpisodes);
  } else {
    let selectedEpisode = allEpisodes.filter((episode) => {
      return event.target.value === episode.name;
    });
    makePageForEpisodes(selectedEpisode);
  };
}

function makePageForEpisodes(allEpisodes) {
  allEpisodes.forEach(episode => {
    let episodesNameAndCode = document.createElement("h1");
    episodesNameAndCode.innerText = `${episode.name} - S0${episode.season}E0${episode.number}`;

    let episodesPicture = document.createElement("img");
    episodesPicture.src = episode.image.medium;

    let episodesSummaryText = document.createElement("p1");
    episodesSummaryText.innerHTML = episode.summary;

    const oneEpisodeContainer = document.createElement("div2");
    oneEpisodeContainer.onclick = () => location.href = episode.url;

    let selectorOption = document.createElement("option");
    selectorOption.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    selectorOption.value = episode.name;
    episodeSelector.appendChild(selectorOption);

    oneEpisodeContainer.appendChild(episodesNameAndCode);
    oneEpisodeContainer.appendChild(episodesPicture);
    oneEpisodeContainer.appendChild(episodesSummaryText);
    allEpisodesContainer.appendChild(oneEpisodeContainer);
  });
}

const footerSeparator = document.createElement("hr");
rootElem.appendChild(footerSeparator);

const footerData = document.createElement("a");
footerData.innerText = "© TVmaze.com";
footerData.href = "https://www.tvmaze.com/";
rootElem.appendChild(footerData);

window.onload = setup;
