import React from 'react';

const Card = ({ name, homeworld }) => {
	return(
		<div className='tc bg-light-blue dib br3 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<h2>{name}</h2>
				<p>{homeworld}</p>
			</div>
		</div>
	);
}

export default Card;