import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionArea from './../components/actionArea.jsx';

describe('ActionArea', () => {
    let props, 
        mountedActionArea,
        muiTheme;

    beforeEach(() => {
        props = {
            onFind: function() {},
            onInsert: function() {},
            onRemove: function() {},
            onUpdate: function() {}
        };
        mountedActionArea = undefined;

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

    const actionArea = () => {
        if(!mountedActionArea) {
            mountedActionArea = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionArea {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionArea;
    }

    it('sets props correctly', () => {
        expect(actionArea().props().onFind).toBeA('function');
        expect(actionArea().props().onInsert).toBeA('function');
        expect(actionArea().props().onRemove).toBeA('function');
        expect(actionArea().props().onUpdate).toBeA('function');
    });

    it('returns a div', () => {
        let divs = actionArea().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it('div has the class actionArea', () => {
        let div = actionArea().find("div").first();
        expect(div.hasClass('actionArea')).toEqual(true);
    });

    it('div contains another div', () => {
        let div = actionArea().find("div").first();
        let innerDiv = div.find("div");
        expect(innerDiv.length).toBeGreaterThan(0);
    });

    it('inner div contains a label', () => {
        let div = actionArea().find("div").first();
        let innerDiv = div.find("div").first();
        let label = innerDiv.find("label");
        expect(label.length).toBeGreaterThan(0);
    });

    it('label has text Operation', () => {
        let div = actionArea().find("div").first();
        let innerDiv = div.find("div").first();
        let label = innerDiv.find("label").first();
        expect(label.text()).toEqual('Operation');
    });
});