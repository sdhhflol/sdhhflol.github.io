"use client";
import React from "react";
import Card from "./Card";
import { LuDisc3 } from "react-icons/lu";
import { GiMicrophone } from "react-icons/gi";

interface Timestamps {
    start: number;
    end: number;
}

interface Spotify {
    album_art_url: string;
    song: string;
    artist: string;
    album: string;
    track_id: string;
    timestamps?: Timestamps;
}

interface Activity {
    type: number;
    id: string;
    name: string;
    state?: string;
    details?: string;
    application_id?: string;
    assets?: {
        large_image?: string;
    };
    timestamps?: Timestamps;
    timestamp?: string;
}

interface LanyardState {
    ready: boolean;
    username: string | null;
    spotify: Spotify | null;
    activities: Activity[];
    timestamp?: string;
}

class Lanyard extends React.Component<{}, LanyardState> {
    static status = "...";
    static qotd = "...";
    static phone = false

    timeinterval: NodeJS.Timeout | undefined;
    fetching: NodeJS.Timeout | undefined;

    state: LanyardState = {
        ready: false,
        username: null,
        spotify: null,
        activities: [],
    };

    componentDidMount() {
        this.fetch();
        this.timeinterval = setInterval(() => this.updtime(), 1000);
        this.fetching = setInterval(() => this.fetch(), 20000);
    }

    componentWillUnmount() {
        // if (this.timeinterval) clearInterval(this.timeinterval);
        // if (this.fetching) clearInterval(this.fetching);
    }

    async fetch() {
        const res = await fetch("https://api.lanyard.rest/v1/users/1059614915456938084");
        const data = await res.json();
        const user = data.data.discord_user.username;
        console.log(data);
        const spotify = data.data?.spotify;
        const kv = data.data?.kv;
        const activities = data.data?.activities.filter((activity: Activity) => activity.type !== 2);
        Lanyard.status = data.data?.discord_status;
        Lanyard.phone = data.data?.active_on_discord_mobile;
        Lanyard.qotd = kv.qotd;

        if (spotify) {
            this.setState({
                username: user,
                ready: true,
                spotify,
            }, () => this.updtime());
        } else {
            this.setState({ username: user, ready: true });
        }

        this.setState({ activities });
    }

    maketimestamp(elapsed: number) {
        const secs = Math.floor(elapsed / 1000);
        const hours = String(Math.floor(secs / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        const seconds = String(secs % 60).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    updtime() {
        const { spotify, activities } = this.state;

        if (spotify && spotify.timestamps) {
            const elapsed = Date.now() - spotify.timestamps.start;
            const duration = spotify.timestamps.end - spotify.timestamps.start;
            const timestamp = this.maketimestamp(elapsed);
            this.setState({ timestamp });

            if (elapsed >= duration) {
                this.fetch();
            }
        }

        activities.forEach((activity) => {
            if (activity.timestamps) {
                const elapsed = Date.now() - activity.timestamps.start;
                const duration = activity.timestamps.end - activity.timestamps.start;
                const timestamp = this.maketimestamp(elapsed);
                activity.timestamp = timestamp;

                if (elapsed >= duration) {
                    this.fetch();
                }
            }
        });

        this.setState({ activities });
    }

    render() {
        if (!this.state.ready) {
            return <div className="flex flex-col items-center justify-center h-screen"><h1 className="text-[50px] font-[800]">loading...</h1></div>;
        }

        const t = document.getElementById("main");
        if (t) {
            t.style.display = "";
        }

        return (
            <React.Fragment>
                <div className="pt-5"></div>
                {this.state.spotify && (
                    <Card
                        id="spotify"
                        img={this.state.spotify?.album_art_url || ""}
                        title={this.state.spotify?.song || ""}
                        state={
                            <div className="flex items-center">
                                <GiMicrophone className="mr-1" />
                                <span>{this.state.spotify?.artist || "unknown"}</span>
                            </div>
                        }
                        details={
                            <div className="flex items-center">
                                <LuDisc3 className="mr-1" />
                                <span>{this.state.spotify?.album || "unknown"}</span>
                            </div>
                        }
                        timestamp={this.state.timestamp || ""}
                        track={"https://open.spotify.com/track/" + this.state.spotify?.track_id}
                    />
                )}

                {this.state.activities.map((activity, index) => (
                    <Card
                        key={index}
                        id={activity.id}
                        img={
                            activity.assets?.large_image?.startsWith("mp:external")
                                ? activity.assets.large_image.replace(/mp:external\/([^\/]*)\/(http[s])/g, "$2:/")
                                : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image || ""}`
                        }
                        title={activity.name || ""}
                        state={activity.state || ""}
                        details={activity.details || ""}
                        timestamp={activity.timestamp || ""}
                        track={''}
                    />
                ))}
                <div className="pb-5"></div>
            </React.Fragment>
        );
    }
}

export default Lanyard;
