"use client";
import React from "react";
// import Image from 'next/image'
import Link from "next/link"
import { IconContext } from "react-icons";
import { BsDiscord, BsGithub } from "react-icons/bs";
class Footer extends React.Component {
    render() {
        return (
            <div className="relative">
                <footer className="fixed bottom-0 left-0 right-0 h-[50px] bg-[#14151a] text-white flex items-center justify-between px-4 z-[10]">
                    <h1 className="text-2xl font-[800] animate-bounce text-[var(--background-500)]">sdhhf</h1>
                    <div className="flex space-x-2">
                        <Link href="https://discord.com/users/1059614915456938084" aria-label="sdhhf discord" target="_blank" passHref>
                            <IconContext.Provider value={{ className: `w-7 h-7 text-[var(--background-500)]`}}>
                                <BsDiscord/>
                            </IconContext.Provider>
                        </Link>
                        <Link href="https://github.com/sdhhf1245" aria-label="sdhhf github" target="_blank" passHref>
                        <IconContext.Provider value={{ className: `w-7 h-7 text-[var(--background-500)]`}}>
                                <BsGithub/>
                            </IconContext.Provider>
                        </Link>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
