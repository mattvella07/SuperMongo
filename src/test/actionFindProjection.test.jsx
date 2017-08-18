import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ActionFindProjection from './../components/actionFindProjection.jsx';

describe('ActionFindProjection', () => {
    let props, 
        mountedActionFindProjection,
        muiTheme;

    beforeEach(() => {
        props = {
            index: 0,
            projectionVals: ['1'],
            projectionFields: ['field1'],
            valueChange: function() {},
            removeItem: function() {}
        };
        mountedActionFindProjection = undefined;

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

    const actionFindProjection = () => {
        if(!mountedActionFindProjection) {
            mountedActionFindProjection = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <ActionFindProjection {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedActionFindProjection;
    }

    it('sets props correctly', () => {
        expect(actionFindProjection().props().index).toEqual(0);
        expect(actionFindProjection().props().projectionVals).toBeA('array');
        expect(actionFindProjection().props().projectionVals[0]).toEqual('1');
        expect(actionFindProjection().props().projectionFields).toBeA('array');
        expect(actionFindProjection().props().projectionFields[0]).toEqual('field1');
        expect(actionFindProjection().props().valueChange).toBeA('function');
        expect(actionFindProjection().props().removeItem).toBeA('function');
    });

    it('returns a div', () => {
        let div = actionFindProjection().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class materialUIComponents', () => {
        let div = actionFindProjection().find("div").first();
        expect(div.hasClass('materialUIComponents')).toEqual(true);
    });

    it('div has 2 children', () => {
        let div = actionFindProjection().find("div").first();
        expect(div.children().length).toEqual(2);
    });
});