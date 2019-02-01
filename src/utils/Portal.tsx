import * as React from 'react';
import * as ReactDom from 'react-dom';

interface ProtalProps {
    getContainer: () => HTMLElement,
    children?: any,
}

export default class Protal extends React.Component<ProtalProps, any>{
    _container: HTMLElement

    componentDidMount(){
        this.createContainer();
    }
    componentWillMount(){
        this.removeContainer();
    }
    createContainer() {
        this._container = this.props.getContainer();
        this.forceUpdate();
    }

    removeContainer() {
        if(this._container){
            const parentNode = this._container.parentNode;
            if (parentNode) {
                parentNode.removeChild(this._container);
            }
        }
    }

    render() {
        
        if (this._container) {
            console.log(this.props.children)
            return ReactDom.createPortal(this.props.children, this._container);
        }
        return null;
    }
}

