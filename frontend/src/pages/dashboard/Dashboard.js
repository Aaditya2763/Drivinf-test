import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from '../../components/Slider/slider';
import ScoreCard from '../../components/scoreCard/currentScoreCard';
import NavbarBox from '../../components/Navbar/NavbarBox';
import ScoreTable from '../../components/Scoretable/ScoreTable';
// const sections = [
//   { title: 'Technology', url: '#' },
//   { title: 'Design', url: '#' },
//   { title: 'Culture', url: '#' },
//   { title: 'Business', url: '#' },
//   { title: 'Politics', url: '#' },
//   { title: 'Opinion', url: '#' },
//   { title: 'Science', url: '#' },
//   { title: 'Health', url: '#' },
//   { title: 'Style', url: '#' },
//   { title: 'Travel', url: '#' },
// ];

const mainFeaturedPost = {
  title: 'Pass Your Driving Test with Confidence!',
  description:
    "Prepare for Success on the Road Ahead, Master the Road: Your Key to Freedom Awaits!",
  image: 'https://i.pinimg.com/originals/f2/dd/56/f2dd5622406d7b9bcd7000b25411aa96.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard({loginuser}) {


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NavbarBox loginuser={loginuser}/>
      <Container maxWidth="lg">
        
        <main>
          <Slider post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <ScoreCard key={post.title} post={post} />
            ))}
          </Grid>
    
        </main>
        <ScoreTable />
      </Container>
     
    </ThemeProvider>
  );
}