import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionKeyValueItem from './../components/actionKeyValueItem.jsx';

describe('ActionKeyValueItem', () => {
    let props,
        mountedActionKeyValueItem,
        muiTheme;

    beforeEach(() => {
        props = {
            index: 0,
            keys: ['key1'],
            vals: ['val1'],
            textChange: function() {},
            removeItem: function() {},
            type: 'criteriaItem'
        };
        mountedActionKeyValueItem = undefined;

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

    const actionKeyValueItem = () => {
        if(!mountedActionKeyValueItem) {
            mountedActionKeyValueItem = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionKeyValueItem {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionKeyValueItem;
    }

    it('sets props correctly', () => {
        expect(actionKeyValueItem().props().index).toEqual(0);
        expect(actionKeyValueItem().props().keys).toBeA('array');
        expect(actionKeyValueItem().props().keys[0]).toEqual('key1');
        expect(actionKeyValueItem().props().vals).toBeA('array');
        expect(actionKeyValueItem().props().vals[0]).toEqual('val1');
        expect(actionKeyValueItem().props().textChange).toBeA('function');
        expect(actionKeyValueItem().props().removeItem).toBeA('function');
        expect(actionKeyValueItem().props().type).toEqual('criteriaItem');
    });

    it('returns a div', () => {
        let div = actionKeyValueItem().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class materialUIComponents', () => {
        let div = actionKeyValueItem().find("div").first();
        expect(div.hasClass('materialUIComponents')).toEqual(true);
    });

    it('div has 2 children', () => {
        let div = actionKeyValueItem().find("div").first();
        expect(div.children().length).toEqual(2);
    });
});