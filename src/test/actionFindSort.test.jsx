import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionFindSort from './../components/actionFindSort.jsx';

describe('ActionFindSort', () => {
    let props, 
        mountedActionFindSort,
        muiTheme;

    beforeEach(() => {
        props = {
            index: 0,
            sortFields: ['field1'],
            sortDirections: ['asc'],
            valueChange: function() {},
            removeItem: function() {}
        };
        mountedActionFindSort = undefined;

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

    const actionFindSort = () => {
        if(!mountedActionFindSort) {
            mountedActionFindSort = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionFindSort {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionFindSort;
    }

    it('sets props correctly', () => {
        expect(actionFindSort().props().index).toEqual(0);
        expect(actionFindSort().props().sortFields).toBeA('array');
        expect(actionFindSort().props().sortFields[0]).toEqual('field1');
        expect(actionFindSort().props().sortDirections).toBeA('array');
        expect(actionFindSort().props().sortDirections[0]).toEqual('asc');
        expect(actionFindSort().props().valueChange).toBeA('function');
        expect(actionFindSort().props().removeItem).toBeA('function');
    });

    it('returns a div', () => {
        let div = actionFindSort().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class materialUIComponents', () => {
        let div = actionFindSort().find("div").first();
        expect(div.hasClass('materialUIComponents')).toEqual(true);
    });

    it('div has 2 children', () => {
        let div = actionFindSort().find("div").first();
        expect(div.children().length).toEqual(2);
    });
});