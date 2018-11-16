import React, { Component } from 'react';

class Like extends Component {

    render() { 
        const { liked, onToggle} = this.props;

        
        return (
            <i  style={{cursor: "pointer"}} onClick={onToggle} className={this.setClasses(liked)} aria-hidden="true" />
        );
    }

    setClasses(liked){
        let classes = "fa fa-heart";
        return liked? classes: classes +='-o'
    }
}
 
export default Like;