import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Movies = () => {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page });

    console.log('DATA ==========>', { genreIdOrCategoryName, page });

    if (!data && isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="4rem" />
            </Box>
        );
    }

    if (data?.results?.length === 0) {
        return (
            <Box display="flex" justifyContent="center">
                <Typography variant="h4">
                    No movies found!
                    <br />
                    Please search for something else
                </Typography>
            </Box>
        );
    }

    if (error) return <p>An error has occurred</p>;

    return (
        <div>
            <MovieList movies={data} />
        </div>
    );
};

export default Movies;
