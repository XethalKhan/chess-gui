import React from 'react';
import './Home.css';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

//https://www.npmjs.com/package/cm-chessboard
import {Chessboard, INPUT_EVENT_TYPE, COLOR, MOVE_INPUT_MODE} from "cm-chessboard";

import { Chess } from './chess.js';

class Home extends React.Component{

	board;
	game;

	constructor(props){
		super(props);

	}

	render(){
	    return (
			<div id="root">
				<Grid container spacing={3}>
					<Grid item xs={12} align="center">
						<div id="b" style={{width: 400, height: 400}}/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div id="test"></div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper className="paper">xs=6</Paper>
					</Grid>
					<Grid item xs={3} sm={12}>
						<Paper className="paper">xs=3</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className="paper">xs=3</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className="paper">xs=3</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className="paper">xs=3</Paper>
					</Grid>
				</Grid>
			</div>
	    );
	}

	componentDidMount(){

		this.board = 
			new Chessboard(
				document.getElementById("b"),
            	{ 
            		position: "rn2k1r1/ppp1pp1p/3p2p1/5bn1/P7/2N2B2/1PPPPP2/2BNK1RR",
            		style: {
				        showCoordinates: true, // show ranks and files
				        showBorder: false, // display a border around the board
				    },
            		responsive: true,
            		animationDuration: 300,
            		moveInputMode: MOVE_INPUT_MODE.dragMarker,
            		sprite: {
            			grid: 40, 
            			url: "./chessboard-sprite.svg"
            		}
            	}
            );

		this.board.enableMoveInput((event) => {
			switch (event.type) {
				case INPUT_EVENT_TYPE.moveStart:
					console.log(`moveStart: ${event.square}`);
					// return `true`, if input is accepted/valid, `false` aborts the interaction, the piece will not move
					return true;
				case INPUT_EVENT_TYPE.moveDone:
					console.log(`moveDone: ${event.squareFrom}-${event.squareTo}`);

					// return true, if input is accepted/valid, `false` takes the move back
					return true;
				case INPUT_EVENT_TYPE.moveCanceled:
					console.log(`moveCanceled`);
			}
		});

	}

	inputHandler(event){

		if (event.type === INPUT_EVENT_TYPE.moveDone) {

	        let move = {from: event.squareFrom, to: event.squareTo};
	        let result = chess.move(move);

	        if (result){

	            event.chessboard.disableMoveInput();

	            setTimeout(() => {

	                event.chessboard.setPosition(chess.fen());
	                const possibleMoves = chess.moves({verbose: true})
	                if (possibleMoves.length > 0) {
	                    const randomMove = possibleMoves[random(0, possibleMoves.length - 1)]
	                    chess.move({from: randomMove.from, to: randomMove.to})
	                    event.chessboard.enableMoveInput(inputHandler, COLOR.white)
	                    event.chessboard.setPosition(chess.fen())
	                }
	            })
	        } else {
	            console.warn("invalid move", move)
	        }
	        return result
	    } else {
	        return true
	    }
	}
}

export default Home;
