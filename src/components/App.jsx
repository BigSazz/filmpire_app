import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import useStyles from './styles';

import { Actors, Movies, MovieInformation, Profile, NavBar } from '.';

const App = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/" component={Movies} />
                    <Route
                        exact
                        path="/movie/:id"
                        component={MovieInformation}
                    />
                    <Route exact path="/actors/:id" component={Actors} />
                </Switch>
            </main>
        </div>
    );
};

export default App;
