import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { Quiz } from './pages/quiz/quiz';
import { Score } from './pages/score/score';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: Home
    },
    {
        path: 'home',
        component: Home
    },
    {
        path : 'quiz',
        children: [
            {
                path : ':id',
                component: Quiz
            }
        ]
       
    },
    {
        path: 'about',
        component: About
    },
    {
        path: 'score',
        component: Score
    },
    {
        path: '**',
        component: NotFound
    },
    
];
