import React,{useState} from 'react';
import './Slider.css'
import cs from '../components/image/map.jpg'


const Slider = () => {
    const arrI=[
        'tovar.jpg',
        'DaR.png',
        'map.jpg'
    ]
    const arrH=[
        'aaa',
        'bbb',
        'ccc'
    ]
    const arrP=[
        'qqq',
        'www',
        'eee'
    ]
    const [current, setCurrent] = useState(0)
    return(
        <div className="Slider-block-behind">
            <div className='Slider-Block'>
                <div className="info-about-transit">
                    <hr className='Decorate-Line'></hr>
                    <h1>{arrH[current]}</h1>
                    <p>{arrP[current]}</p>
                    <button href="/">ПОДРОБНЕЕ</button>

                </div>

                <div className="img-about-transit">
                    <img className='item item1' src={require('../components/image/'+arrI[current])} alt="" />
                </div>

                <div className="buttons-about-transit">

                    <div className="next-btn">
                        <button onClick={()=>setCurrent(current+1>arrP.length-1 ? 0 : current+1)}>СЛЕД</button>

                    </div>

                    <div className="prev-btn">

                        <button onClick={()=>setCurrent(current-1<0 ? arrP.length-1 : current-1)}>НАЗАД</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Slider }
