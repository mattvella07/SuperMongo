import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionInsert from './../components/actionInsert.jsx';

describe('ActionInsert', () => {
    let props,
        mountedActionInsert,
        muiTheme;

    beforeEach(() => {
        props = {
            onInsert: function() {}
        };
        mountedActionInsert = undefined;

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

    const actionInsert = () => {
        if(!mountedActionInsert) {
            mountedActionInsert = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionInsert {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionInsert;
    }

    it('sets props correctly', () => {
        expect(actionInsert().props().onInsert).toBeA('function');
    });

    it('returns a form', () => {
        let form = actionInsert().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it('form contains a div', () => {
        let form = actionInsert().find("form").first();
        let innerDiv = form.find("div");
        expect(innerDiv.length).toBeGreaterThan(0);
    });

    it('div contains 2 children', () => {
        let form = actionInsert().find("form").first();
        let innerDiv = form.find("div").first();
        expect(innerDiv.children().length).toEqual(2);
    });
});