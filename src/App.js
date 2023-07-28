import './App.css';
import axios from 'axios';
import { useState} from 'react';




function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function handleSearch() {
    axios.get(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&origin=*&format=json`)
    .then(response => {
     // setLoadingStatus(false);
      setSearchResults(response.data.query.search, searchTerm);
      
    }).catch(error => {
     // setLoadingStatus(false);
     console.log(error)
      console.log('Unable to load Wikipedia search results at this time.');
    });
  }

  const truncateDescription = (description, maxLines = 2) => {
    const lines = description.split('\n');
    return lines.slice(0, maxLines).join('\n');
  };

  

  return (
    <div className="App">
      <header className="App-header">
        <div className='input-container'>
      <input type="text" value={searchTerm} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
      {searchResults.map((result) => (
          <li key={result.pageid}>
            <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} target="_blank" rel="noopener noreferrer">
              <h3>{result.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: truncateDescription(result.snippet) }} />
            </a>
          </li>
        ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
