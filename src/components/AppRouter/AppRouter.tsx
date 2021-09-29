import React from 'react'
import {useSelector} from 'react-redux'
import { AppStateType } from '../../redux/root_reducer'
import {Switch, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from './routes'


export const AppRouter = () => {

    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth)

    return (
        <div>
            <Switch>
                {
                    isAuth && authRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>)
                }
                {
                    publicRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact/>)
                }
                <Route path='*' render={() => <div style={{marginTop: '100px', display: 'flex', justifyContent: 'center', color: 'red', fontWeight: 'bold'}}>
                    404 NOT FOUND
                    </div>}
                />
            </Switch>
        </div>
    )
}