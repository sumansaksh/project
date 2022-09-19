import React from 'react';
import Carousel from 'react-material-ui-carousel'


function ProductDetails(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <div >
        <Carousel  navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
            backgroundColor: 'red',
            borderRadius: 0
        }
    }} >
            {
                product.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </div>
    )
}

function Item(props)
{
    return (
        <div className="ProductDetails">
        <Paper >
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
        </div>
    )
}

export default ProductDetails