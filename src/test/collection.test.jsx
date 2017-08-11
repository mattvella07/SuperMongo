import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Collection from './../components/collection.jsx';

describe('Collection', () => {
    let props, 
        mountedCollection,
        muiTheme;

    beforeEach(() => {
        props = {
            db: 'testDB',
            col: 'testCollection',
            onColClick: function() {},
            onColDrop: function() {}
        };
        mountedCollection = undefined;

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

    const collection = () => {
        if(!mountedCollection) {
            mountedCollection = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <Collection {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedCollection;
    }

    it('sets props correctly', () => {
        expect(collection().props().db).toEqual('testDB');
        expect(collection().props().col).toEqual('testCollection');
        expect(collection().props().onColClick).toBeA('function');
        expect(collection().props().onColDrop).toBeA('function');
    });

    it('returns a div', () => {
        const divs = collection().find("div");
        expect(divs.length).toBeGreaterThan(0);
    });

    it('div has the class collection', () => {
        const div = collection().find("div").first();
        expect(div.hasClass('collection')).toEqual(true);
    });

    it('div has the text from the col prop', () => {
        const div = collection().find("div").first();
        expect(div.text()).toEqual(props.col);
    });

    it('div contains a SVG element', () => {
        const div = collection().find("div").first();
        const svg = div.find('svg');
        expect(svg.length).toBeGreaterThan(0);
    });

    it('SVG element has the class collectionIcon and collectionRemove', () => {
        const div = collection().find("div").first();
        const svg = div.find('svg').first();
        expect(svg.hasClass('collectionIcon')).toEqual(true);
        expect(svg.hasClass('collectionRemove')).toEqual(true);
    });

    it('on div click the class "clicked" is added to it', () => {
        const div = collection().find("div").first();
        div.simulate('click');
        expect(div.hasClass('clicked')).toEqual(true);
    });
});