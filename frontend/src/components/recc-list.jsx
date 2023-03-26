import '../style/recc-list.css';

function ReccList() {
    
    const recommendation = [];

    return (

        <div>
            <div className="AutoComplete">
                {recommendation.map((element) => (
                    <div key={element} className="ItemContainer">
                        <img
                            className="ImageContainer"
                            src="https://designwizard.com/blog/album-cover-ideas/3-Design-Wizard-Album-Cover_1650885766730.jpg"
                            alt="album"
                        />
                        <div className="SongInfo">
                            <h2 className="song-title">Song Title Goes Here</h2>
                            <hr
                                style={{
                                    background: "black",
                                    color: "black",
                                    border: "none",
                                    height: ".05rem",
                                    width: "200px"
                                }}
                            />
                            <h3 className="artist-name">Hello</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

};

export default ReccList;