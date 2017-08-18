import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionKeyValueComparison from './../components/actionKeyValueComparison.jsx';

describe('ActionKeyValueComparison', () => {
    let props,
        mountedActionKeyValueComparison,
        muiTheme;

    beforeEach(() => {
        props = {
            index: 0,
            keys: ['item1'],
            comparisons: [':'],
            vals: ['val1'],
            valueChange: function() {},
            removeItem: function() {},
            type: 'queryItem'
        };
        mountedActionKeyValueComparison = undefined;

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

    const actionKeyValueComparison = () => {
        if(!mountedActionKeyValueComparison) {
            mountedActionKeyValueComparison = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionKeyValueComparison {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionKeyValueComparison;
    }

    it('sets props correctly', () => {
        expect(actionKeyValueComparison().props().index).toEqual(0);
        expect(actionKeyValueComparison().props().keys).toBeA('array');
        expect(actionKeyValueComparison().props().keys[0]).toEqual('item1');
        expect(actionKeyValueComparison().props().comparisons).toBeA('array');
        expect(actionKeyValueComparison().props().comparisons[0]).toEqual(':');
        expect(actionKeyValueComparison().props().vals).toBeA('array');
        expect(actionKeyValueComparison().props().vals[0]).toEqual('val1');
        expect(actionKeyValueComparison().props().valueChange).toBeA('function');
        expect(actionKeyValueComparison().props().removeItem).toBeA('function');
        expect(actionKeyValueComparison().props().type).toEqual('queryItem');
    });

    it('returns a div', () => {
        let div = actionKeyValueComparison().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class materialUIComponents', () => {
        let div = actionKeyValueComparison().find("div").first();
        expect(div.hasClass('materialUIComponents')).toEqual(true);
    });

    it('div has 3 children', () => {
        let div = actionKeyValueComparison().find("div").first();
        expect(div.children().length).toEqual(3);
    });
});