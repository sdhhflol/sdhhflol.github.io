"use client";
import React from "react";
import { StaticImageData } from "next/image";

interface Properties {
    title: React.ReactNode | string;
    state: React.ReactNode | string;
    details: React.ReactNode | string;
    timestamp: string;
    track: string;
    img: string | StaticImageData;
    id: string;
}

class Card extends React.Component<Properties> {
    render() {
        const img = typeof this.props.img === 'string' ? this.props.img : this.props.img.src;

        return (
            <a href={this.props.track} target="_blank">
                <div className="m-1">
                    <div
                        id={this.props.id}
                        className="relative rounded-[12px] max-w-md w-full h-auto sm:w-[400px] sm:h-[100px] overflow-hidden flex"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${img})`, filter: 'brightness(0.3) blur(5px)' }}
                        />
                        <div className="relative flex flex-col p-4 h-full justify-center items-start z-10 w-full md:w-full">
                            <div>
                                <h2 className="text-white text-lg sm:text-2xl font-extrabold truncate w-full max-w-sm overflow-hidden whitespace-nowrap">{this.props.title}</h2>
                                <p className="text-white text-sm font-bold">{this.props.state}</p>
                                <p className="text-gray-300 text-xs sm:text-sm">{this.props.details}</p>
                            </div>
                            <p className="text-gray-400 text-sm sm:text-lg absolute right-4 top-1/2 transform -translate-y-1/2">{this.props.timestamp}</p>
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}

export default Card;
