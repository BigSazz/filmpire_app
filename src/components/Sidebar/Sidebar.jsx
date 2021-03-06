import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

// movie categories
const categories = [
    { label: 'popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ setMobileOpen }) => {
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
    const theme = useTheme();
    const classes = useStyles();
    const { data, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();

    return (
        <>
            <Link to="/" className={classes.imageLink}>
                <img className={classes.image} src={theme.palette.mode === 'light' ? blueLogo : redLogo} alt="FILMPIRE LOGO" />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories?.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to="/">
                        <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                            <ListItemIcon>
                                <img src={genreIcons[label.toLowerCase()]} alt="List Icon" className={classes.genreImage} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader>Genre</ListSubheader>
                {isFetching ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : data?.genres?.map(({ name, id }) => (
                    <Link key={name} className={classes.links} to="/">
                        <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                            <ListItemIcon>
                                <img src={genreIcons[name.toLowerCase()]} alt="List Icon" className={classes.genreImage} height={30} />
                            </ListItemIcon>
                            <ListItemText primary={name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </>
    );
};

export default Sidebar;
