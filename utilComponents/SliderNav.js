import Slider from 'react-slick'
import React, { useEffect, useState } from 'react'
import SliderItem from './SliderItem'

function SliderNav(props) {
    const [indexVar, setIndex] = useState(0)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        setTimeout(function () {
            setIndex(1000)
            setCheck(true)
        }, 1000)
    })

    const settings = {
        centerMode: true,
        className: 'center',
        dots: true,
        infinite: true,
        slidesToScroll: 1,
        slidesToShow: 1,
        speed: 200,
        swipeToSlide: true,
        variableWidth: true,
        initialSlide: indexVar,
        // eslint-disable-next-line sort-keys
        afterChange(index) {
            props.onGenerateViewState(index)
            setIndex(index)
        }
    }

    return (
        <nav
            className={
                check
                    ? ' w-screen overflow-hidden mt-auto h-74 '
                    : ' w-screen overflow-hidden mt-auto h-74 hidden'
            }>
            <Slider {...settings}>
                <div className=" outline-none sm: p-2">
                    <div className="flex flex-col justify-center items-center w-56 h-40 bg-text rounded-2xl opacity-70 p-1 h-40 font-sans font-semibold text-3xl text-white lg:w-80 lg:ml-14 lg:h-48 ">
                        <div className="lg:text-5xl">Swipe To</div>
                        <div className="lg:text-5xl">Explore</div>
                    </div>
                </div>
                {props.SliderItems.map((obj) => (
                    <SliderItem key={obj.id} data={obj} />
                ))}
            </Slider>
        </nav>
    )
}

export default SliderNav
