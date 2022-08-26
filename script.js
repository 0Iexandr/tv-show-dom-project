//You can edit ALL of the code here
const allShows = getAllShows();
let allEpisodes = [];
const rootElem = document.querySelector("#root");
const head = document.createElement("div3");
const showSelector = document.createElement("select");
const pickShow = document.createElement("option");
const episodeSelector = document.createElement("select");
const allEpisodesOption = document.createElement("option");
const episodeSearch = document.createElement("input");
let searchValue = "";
const displaySearchedEpisodes = document.createElement("p2");
const allEpisodesContainer = document.createElement("div1");

pickShow.innerText = "Pick a show";
pickShow.selected = true;
pickShow.disabled = true;
allEpisodesOption.innerText = "All episodes";
allEpisodesOption.value = "All episodes";
episodeSearch.placeholder = "Episode search..";

episodeSearch.addEventListener("keyup", episodeSearching);
episodeSelector.addEventListener("change", episodeSelecting);
showSelector.addEventListener("change", showSelecting);

rootElem.appendChild(head);
head.appendChild(showSelector);
showSelector.appendChild(pickShow);
episodeSelector.appendChild(allEpisodesOption);
head.appendChild(episodeSelector);
head.appendChild(episodeSearch);
head.appendChild(displaySearchedEpisodes);
rootElem.appendChild(allEpisodesContainer);

function setup() {
  makePageForEpisodes(allEpisodes);
};

allShows.sort(function (a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

allShows.forEach(show => {
  let showSelectorOption = document.createElement("option");
  showSelectorOption.innerText = show.name;
  showSelectorOption.value = show.id;
  showSelector.appendChild(showSelectorOption);  
});

function showSelecting() {
  episodeSelector.replaceChildren(allEpisodesOption,[]);
  allEpisodesContainer.replaceChildren([]);
  fetch(`https://api.tvmaze.com/shows/${event.target.value}/episodes`)
  .then(response => response.json())
  .then(data => {
    allEpisodes = data;
    makePageForEpisodes(allEpisodes);
    displaySearchedEpisodes.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
    const historyOption = document.createElement("option");
    historyOption.innerText = "History";
    historyOption.disabled = true;
    episodeSelector.appendChild(historyOption);
  });
};

function episodeSelecting() {
  allEpisodesContainer.replaceChildren([]);
  if(event.target.value === "All episodes") {
    episodeSelector.replaceChildren(allEpisodesOption,[]);
    makePageForEpisodes(allEpisodes);
  } else {
    let selectedEpisode = allEpisodes.filter((episode) => {
      return event.target.value === episode.name;
    });
    makePageForEpisodes(selectedEpisode);
  };
};

function episodeSearching() {
  episodeSelector.replaceChildren(allEpisodesOption, []);
  searchValue = event.target.value.toLowerCase();
  allEpisodesContainer.replaceChildren([]);
  let searchedEpisodes = allEpisodes.filter((episode) => {
    return `${episode.name} - S0${episode.season}E0${episode.number}${episode.summary}`.toLowerCase().includes(searchValue);
  });
  makePageForEpisodes(searchedEpisodes);
  displaySearchedEpisodes.innerText = `Displaying ${searchedEpisodes.length}/${allEpisodes.length} episodes`;
};

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

    let episodeSelectorOption = document.createElement("option");
    episodeSelectorOption.innerText = `S0${episode.season}E0${episode.number} - ${episode.name}`;
    episodeSelectorOption.value = episode.name;
    
    episodeSelector.appendChild(episodeSelectorOption);
    oneEpisodeContainer.appendChild(episodesNameAndCode);
    oneEpisodeContainer.appendChild(episodesPicture);
    oneEpisodeContainer.appendChild(episodesSummaryText);
    allEpisodesContainer.appendChild(oneEpisodeContainer);
  });
};

const footerSeparator = document.createElement("hr");
rootElem.appendChild(footerSeparator);

const footerData = document.createElement("a");
footerData.innerText = "© TVmaze.com";
footerData.href = "https://www.tvmaze.com/";
rootElem.appendChild(footerData);

window.onload = setup;
