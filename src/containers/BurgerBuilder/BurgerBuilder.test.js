import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import React from 'react'

import { configure, shallow } from 'enzyme';                                //shallow for rendering react components
import Adapter from 'enzyme-adapter-react-16';

configure({adapter:new Adapter()})

describe('<BurgerBuilder/>',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
    })

    it('should render <BuildControls/> when receiving ingredient',()=>{
            wrapper.setProps({ings: {salad:0}});
            expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})