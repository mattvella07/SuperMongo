import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionFind from './../components/actionFind.jsx';

describe('ActionFind', () => {
    let props, 
        mountedActionFind,
        muiTheme;

    beforeEach(() => {
        props = {
            onFind: function() {}
        };
        mountedActionFind = undefined;

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

    const actionFind = () => {
        if(!mountedActionFind) {
            mountedActionFind = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionFind {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionFind;
    }

    it('sets props correctly', () => {
        expect(actionFind().props().onFind).toBeA('function');
    });

    it('returns a form', () => {
        let form = actionFind().find("form");
        expect(form.length).toBeGreaterThan(0);
    });

    it('form contains a div', () => {
        let form = actionFind().find("form").first();
        let innerDiv = form.find('div');
        expect(innerDiv.length).toBeGreaterThan(0);
    });

    it('div contains 7 children', () => {
        let form = actionFind().find("form").first();
        let innerDiv = form.find("div").first();
        expect(innerDiv.children().length).toEqual(7);
    });
});
