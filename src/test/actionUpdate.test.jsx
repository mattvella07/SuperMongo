import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionUpdate from './../components/actionUpdate.jsx';

describe('ActionUpdate', () => {
    let props,
        mountedActionUpdate,
        muiTheme;

    beforeEach(() => {
        props = {
            onUpdate: function() {}
        };
        mountedActionUpdate = undefined;

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

    const actionUpdate = () => {
        if(!mountedActionUpdate) {
            mountedActionUpdate = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionUpdate {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionUpdate;
    }

    it('sets props correctly', () => {
        expect(actionUpdate().props().onUpdate).toBeA('function');
    });

    it('returns a form', () => {
        let form = actionUpdate().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it('form contains a div', () => {
        let form = actionUpdate().find("form").first();
        let innerDiv = form.find("div");
        expect(innerDiv.length).toBeGreaterThan(0);
    });

    it('div contains 6 children', () => {
        let form = actionUpdate().find("form").first();
        let innerDiv = form.find("div").first();
        expect(innerDiv.children().length).toEqual(6);
    });
});