/*
    -A div is always rendered with a class name of databaseList
    -An h3 element is always rendered with the text "DATABASES"
    -PropType source should be a string
    -PropType onDBClick should be a func
    -If a Database is rendered it should receieve exactly 1 prop 
    -Initial state of dbNames should equal ''

*/
import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import DatabaseList from './../components/databaseList.jsx';

describe('DatabaseList', () => {
    let props;
    let mountedDatabaseList;
    const databaseList = () => {
        if(!mountedDatabaseList) {
            mountedDatabaseList = mount(
                <DatabaseList {...props} />
            ); 
        }

        return mountedDatabaseList;
    }

    beforeEach(() => {
        props = {
            source: 'http://localhost:3000/api/databases',
            onDBClick: function() {}
        };
        mountedDatabaseList = undefined;
    });

    const divs = databaseList().find("div");

    it("always returns a div", () => {
        expect(divs.length).toBeGreaterThan(0);
    });

    it("div has the class databaseList", () => {
        expect(divs.hasClass('databaseList')).toEqual(true);
    });

    it("displays an H3 element", () => {
        const header = divs.find("h3");
        expect(header.length).toBeGreaterThan(0);
    });

    it("H3 element has the text 'DATABASES'", () => {
        const header = divs.find("h3");
        expect(header.text()).toEqual('DATABASES');
    });

    /*it("database ", () => {
        const db = divs.find(".database");
        if(db.length > 0) {
            console.log('---' + db.length);
            expect(db.hasClass('database')).toEqual(true);
        } else {
            console.log('nope');
        }
    });*/
});