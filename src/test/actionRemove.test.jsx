import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionRemove from './../components/actionRemove.jsx';

describe('ActionRemove', () => {
    let props,
        mountedActionRemove,
        muiTheme;

    beforeEach(() => {
        props = {
            onRemove: function() {}
        };
        mountedActionRemove = undefined;

        muiTheme = getMuiTheme({
            palette: {
                accent1Color: 'rgba(139, 175, 223, 1)'
            },
            selectField: {
                customWidth: {
                    width: 150
                }
            }
        });
    });

    const actionRemove = () => {
        if(!mountedActionRemove) {
            mountedActionRemove = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionRemove {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionRemove;
    }

    it('sets props correctly', () => {
        expect(actionRemove().props().onRemove).toBeA('function');
    });

    it('returns a form', () => {
        let form = actionRemove().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it('form contains a div', () => {
        let form = actionRemove().find("form").first();
        let innerDiv = form.find("div");
        expect(innerDiv.length).toBeGreaterThan(0);
    });

    it('div contains 3 children', () => {
        let form = actionRemove().find("form").first();
        let innerDiv = form.find("div").first();
        expect(innerDiv.children().length).toEqual(3);
    });
});