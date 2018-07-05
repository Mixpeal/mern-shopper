import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import Proptypes from "prop-types";

class ShopList extends Component {
    componentDidMount(){
        this.props.getItems();
    }
    render() {
        const { items } = this.props.item;

        return (
            <Container>
                <Button
                    color="dark"
                    className="mb-5"
                    style={{borderBottom:"2px solid red"}}
                    onClick={() => {
                        const name = prompt("enter item")
                        if(name){
                            this.setState( state => ({
                                items: [...state.items, {id: uuid(), name}]
                            }));
                        }
                    }}
                >Add Item</Button>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn mr-3"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            this.setState(state => ({
                                                items:state.items.filter(item => item.id !== id)
                                            }));
                                        }}
                                    >&times; </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShopList.propTypes = {
    getItems: Proptypes.func.isRequired,
    item: Proptypes.object.isRequired
}

const mapStateToProps = (state) =>({
    item: state.item
})

export default connect(mapStateToProps, { getItems })(ShopList);