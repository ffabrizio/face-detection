import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

import { catalogGetProducts} from '../store/actions'

const Carousel = ({ products, tags, count, current, onChange }) =>  
    <div className="products" onClick={onChange}>
        {renderProduct(products[current])}
    </div>

const renderProduct = (p) => 
    <section className="product" data-id={p.id} data-tags={p.tags}>
        <img src={p.url} alt={p.name} />
        <h2>{p.name}</h2>
    </section>

const mapStateToProps = state => {
    return { 
        products: state.app.products,
        tags: state.app.tags,
        count: state.app.count,
        current: state.app.current
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChange: () => dispatch(catalogGetProducts())
    }
}

Carousel.propTypes = {
    products: PropTypes.array,
    tags: PropTypes.string,
    count: PropTypes.number,
    current: PropTypes.number,
    onChange: PropTypes.func.isRequired

}

export default connect(mapStateToProps, mapDispatchToProps) (Carousel)

