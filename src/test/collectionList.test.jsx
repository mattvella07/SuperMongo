import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CollectionList from './../components/collectionList.jsx';

describe('CollectionList', () => {
    let props, 
        mountedCollectionList,
        muiTheme;

    beforeEach(() => {
        props = {
            db: 'testDB',
            onColClick: function() {},
            onColAddOrDrop: function() {}
        };
        mountedCollectionList = undefined;

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

    const collectionList = () => {
        if(!mountedCollectionList) {
            mountedCollectionList = mount(
                <MuiThemeProvider muiTheme={muiTheme} {...props} >
                    <CollectionList {...props} />
                </MuiThemeProvider>
            );
        }

        return mountedCollectionList;
    }

    it('sets props correctly', () => {
        expect(collectionList().props().db).toEqual('testDB');
        expect(collectionList().props().onColClick).toBeA('function');
        expect(collectionList().props().onColAddOrDrop).toBeA('function');
    });

    it('returns two divs', () => {
        const divs = collectionList().find("div");
        expect(divs.length).toEqual(2);
    });

    it('first div has the class collectionList', () => {
        const firstDiv = collectionList().find("div").first();
        expect(firstDiv.hasClass('collectionList')).toEqual(true);
    });

    it('second div has the class collectionListHeader', () => {
        const secondDiv = collectionList().find("div").last();
        expect(secondDiv.hasClass('collectionListHeader')).toEqual(true);
    });

    it('second div contains a H3 element', () => {
        const secondDiv = collectionList().find("div").last();
        const header = secondDiv.find('h3');
        expect(header.length).toBeGreaterThan(0);
    });

    it('second div contains a SVG element', () => {
        const secondDiv = collectionList().find("div").last();
        const svg = secondDiv.find('svg');
        expect(svg.length).toBeGreaterThan(0);
    });

    it('H3 element contains text Collections in databaseName', () => {
        const secondDiv = collectionList().find("div").last();
        const header = secondDiv.find('h3').first();
        expect(header.text()).toEqual("COLLECTIONS in " + props.db);
    });

    it('SVG element has the class collectionIcon and addCollection', () => {
        const secondDiv = collectionList().find("div").last();
        const svg = secondDiv.find('svg').first();
        expect(svg.hasClass('collectionIcon')).toEqual(true);
        expect(svg.hasClass('addCollection')).toEqual(true);
    });
});
