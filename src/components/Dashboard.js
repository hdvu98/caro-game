import React from 'react';
import {connect} from 'react-redux';
import {Avatar,Card, CardContent, CardActions,Button} from '@material-ui/core/';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import default_avatar from '../img/default_avatar.jpg';

const Dashboard =(props)=> {
    const {user} = props || {};
    const {username} = user || {username: "unknow"};
    const {avatar} = user ||{avatar: default_avatar};

    return(
        <section id="#home">
                <div className="d-flex flex-column align-items-center banner">
                    <div className="d-block my-3">
                    <Avatar alt="Remy Sharp" src={avatar} className="profile-avatar" />
                    </div>
                    <div className="game-info-heading text-center">{username}</div>
                </div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 col-sm-6">
                            <Card >
                                <CardContent>
                                   <div className="card-title">Caro Vietnam | <span className="card-title-players">1 player</span></div>
                                </CardContent>
                                <CardActions>
                                    <Button color="primary" variant="contained" size="small" href="/game-one-player"><SportsEsportsIcon/>Play now</Button>
                                </CardActions>
                            </Card>
                        </div>
                        <div className="col-12 col-sm-6">
                        <Card >
                                <CardContent>
                                    <div className="card-title">Caro  Vietnam |<spam className="card-title-players">2 player</spam> </div>
                                </CardContent>
                                <CardActions>
                                    <Button color="primary" variant="contained" size="small" href="/game-two-players"><SportsEsportsIcon/>Play now</Button>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>
        </section>
    );
}
const mapStateToProps = state =>({
    user: state.user.user
})



export default connect(mapStateToProps, null)(Dashboard);