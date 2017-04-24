/*
    -A div is always rendered with a class name of databaseList
    -An h3 element is always rendered with the test "DATABASES"
    -PropType source should be a string
    -PropType onDBClick should be a func
    -If a Database is rendered it should receieve exactly 1 prop 
    -Initial state of dbNames should equal ''

*/
import React from 'react';
import { mount } from 'enzyme';
import DatabaseList from './../components/databaseList.jsx';

describe ('DatabaseList', () => {
    let props;
    let mountedDatabaseList;
    const databaseList = () => {
        if(!mountedDatabaseList) {
            mountedDatabaseList = mount(
                <DatabaseList {...props} />
            ); 
        }
    }

    beforeEach(() => {
        props = {
            dbNames: undefined
        };
        mountedDatabaseList = undefined;
    });

    it("always returns a div", () => {
        const divs = databaseList().find("div");
        const wrappingDiv = divs.first();
        expect(wrappingDiv.children()).toEqual(databaseList().children());
    });
});