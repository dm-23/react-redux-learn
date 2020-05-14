import React from "react"
import {create} from "react-test-renderer"
import ProfileState from "./ProfileState";
import ReactDOM from "react-dom";

describe("Test profile status component", () => {
    test("Test render profile component", () => {
        const comp = document.createElement("div");
        ReactDOM.render(<ProfileState status="my test status"/>, comp);
    });

    test("Test profile component has span after load", () => {
        const component = create(<ProfileState status="my test status"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.props.children).toBe("my test status");
    });

    test("Test profile component dbl clicked and create input box", () => {
        const component = create(<ProfileState status="my test status" editEnable={true}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("my test status");
    });

    test("Test profile component saveProfileStatus", () => {
        const mockCallBack = jest.fn((status) => {
            console.log(status);
        });
        const component = create(<ProfileState status="my test status" editEnable={true}
                                               updateProfileStatus={mockCallBack}/>);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("my test status");
        input.props.onBlur();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});