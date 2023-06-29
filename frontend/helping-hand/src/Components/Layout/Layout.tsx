import React, { useContext } from 'react';
// import * as styled from './'
import './layoutStyles.css';
import { DarkThemeContext } from '../../Context/DarkThemeContext';
import { Home } from '../Home/Home';


export function Layout() {
    const { darkTheme } = useContext(DarkThemeContext);

    const LayoutWrapper = styled.div<{ darkMode: boolean }>`
    background-color: ${(props: { darkTheme: any }) => (props.darkTheme ? 'dark' : 'light')};
    color: ${(props: { darkTheme: any }) => (props.darkTheme ? 'light' : 'dark')};
  `;

    return (
        <LayoutWrapper darkTheme={darkTheme}>
            <Home entries={[]} />
        </LayoutWrapper>
    );
}