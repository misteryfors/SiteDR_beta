import React, {Component} from 'react'
import './css/Product.css'
import './css/Footer.css'
export class product extends Component{
    render() {
        return(
            <div>
                {this.props.products.map(el =>
                    {
                        <product key={el.id} product={el}/>
                    }
                )}
            </div>
        )
    }
}
export default product