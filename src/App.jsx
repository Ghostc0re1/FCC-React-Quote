import './App.css';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import XIcon from '@mui/icons-material/X';
import Tooltip from '@mui/material/Tooltip';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(null);

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => {
        setQuotes(data.quotes);
        // Set a random quote index for initial load
        setCurrentQuoteIndex(Math.floor(Math.random() * data.quotes.length));
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleNextQuote = () => {
    setCurrentQuoteIndex(Math.floor(Math.random() * quotes.length));
  };

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <Box className="main-content" id="quote-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ maxWidth: 345, margin: 'auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" id="text">
            {currentQuote ? `"${currentQuote.quote}"` : "Loading quote..."}
          </Typography>
          <Typography variant="body2" color="text.secondary" id="author">
            {currentQuote ? `- ${currentQuote.author}` : ""}
          </Typography>
        </CardContent>
        <CardActions className="card-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Tooltip title="Tweet This Quote!">
            <IconButton
              aria-label="Tweet this quote"
              component="a"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${currentQuote?.quote}" - ${currentQuote?.author}`)}`}
              id="tweet-quote"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XIcon />
            </IconButton>
            </Tooltip>
            <Button id="new-quote" size="small" onClick={handleNextQuote}>Next Quote</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default App;
