// ##1 Search and select
const searchBar = document.getElementById('searchBar');
let subjects = document.querySelector('#subjects');
let jsonData = [];
let subjectData = subjects.options[subjects.selectedIndex].text.toLowerCase();

// Results
const results = document.querySelector('#results');
let inputs = document.querySelector('input');

// fetch based on selection
// fetchData(subjectData);
// console.log(subjectData);

// Search Results
searchBar.addEventListener('keyup', (e) => {
  fetchData(subjectData);
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);

  if (subjectData === 'people') {
    const filteredPeople = jsonData.filter((peeps) => {
      return peeps.name.toLowerCase().includes(searchString);
    });
    displayPeople(filteredPeople);
  }

  if (subjectData === 'films') {
    const filteredFilms = jsonData.filter((film) => {
      return film.title.toLowerCase().includes(searchString);
    });
    displayFilms(filteredFilms);
  }

  if (searchString === '') {
    results.innerText = 'No results...';
  }
});

// Fetching data
async function fetchData(value) {
  try {
    const res = await fetch(`https://swapi.dev/api/${value}`);
    let data = await res.json();
    jsonData = data.results;
  } catch (error) {
    console.error(error);
  }
}

function displayPeople(people) {
  const htmlString = people.map((item) => {
    return `<li>
      <h3>${item.name}</h3>
        <p>Height: ${item.height} cm</p>
        <p>Birth Year: ${item.birth_year}</p>
        <p>Skin color: ${item.skin_color}</p>
      </li>
    `;
  });
  // .join('');
  results.innerHTML = htmlString;
}
function displayFilms(film) {
  const htmlString = film.map((item) => {
    return `<li>
      <h3>${item.title}</h2>
        <p>Producer: ${item.producer}</p>
        <p>Director: ${item.director}</p>
        <p>Release Date: ${item.release_date}</p>
      </li>
    `;
  });
  // .join('');
  results.innerHTML = htmlString;
}

// fetches data based on select field change
subjects.addEventListener('change', () => {
  subjectData = subjects.options[subjects.selectedIndex].text.toLowerCase();
  console.log(subjects.options[subjects.selectedIndex].text.toLowerCase());

  fetchData(subjectData);
  results.innerText = '';
});
