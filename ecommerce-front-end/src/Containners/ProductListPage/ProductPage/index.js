import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductPage } from '../../../actions/page.action';
import getParams from "../../../utils/getParams";
import { useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../Components/UI/Card/Index';

export default function ProductPage() {

    const product = useSelector(state=> state.product);
    const dispatch = useDispatch();
    const location = useLocation();
    const { page } = product;
 
    useEffect(() => {
        const params = getParams(location.search) 
        const payload = {
            params
        } 
        dispatch(getProductPage(payload))
    }, [])

    return (
        <div style={{ margin: '0 10px' }}>
        <h3>{page.title}</h3>
        <Carousel
            renderThumbs={() => {}}
        >
            {
                page.banners && page.banners.map((banner,index) => 
                    <a 
                        key={index}
                        style={{ display: 'block'}}
                        href={banner.navigateTo}
                    >
                        <img src={banner.img} alt="" />
                    </a>
                )
            }
        </Carousel>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '10px 0'
        }}>
            {
                page.products && page.products.map((product, index) =>
                <Card 
                    key={index}
                    style = {{
                        width: '400px',
                        height: '200px',
                        margin: '5px'
                    }}
                >
                    <img style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                    }} src={product.img} alt=""/>
                </Card>    
                )
            }
        </div>
        </div>
    )
}
