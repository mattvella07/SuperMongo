import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Pagination from './../components/pagination.jsx';

describe('Pagination', () => {
    let props,
        mountedPagination,
        muiTheme;

    beforeEach(() => {
        props = {
            db: 'testDB',
            col: 'testCollection',
            findOp: 'find',
            query: '{}',
            options: '{}',
            userEnteredLimit: 1,
            onMoreClick: function() {}
        };
        mountedPagination = undefined;

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

    const pagination = () => {
        if(!mountedPagination) {
            mountedPagination = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <Pagination {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedPagination;
    }

    it('sets props correctly', () => {
        expect(pagination().props().db).toEqual('testDB');
        expect(pagination().props().col).toEqual('testCollection');
        expect(resultGet().props().findOp).toEqual('find');
        expect(pagination().props().query).toEqual('{}');
        expect(pagination().props().options).toEqual('{}');
        expect(pagination().props().userEnteredLimit).toEqual(1);
        expect(pagination().props().onMoreClick).toBeA('function');
    });

    it('returns a div', () => {
        let div = pagination().find("div");
        expect(div.length).toBeGreaterThan(0);
    });

    it('div has the class pagination', () => {
        let div = pagination().find("div").first();
        expect(div.hasClass('pagination')).toEqual(true);
    });

    it('div has 2 children', () => {
        let div = pagination().find("div").first();
        expect(div.children().length).toEqual(2);
    });
});