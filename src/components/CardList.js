import React from 'react';
import Card from './Card';
		
const CardList = ({ characters }) => {
	return (
		<div>
		{			
			characters.map(async (player, i) => {
				const response = await fetch(characters[i].homeworld)
				const data = await response.json();
						console.log(characters[i].name);
						console.log(data.name);
				return (
					<Card 
						name={characters[i].name} 
						homeworld={data.name}
					/>
				);
				})	
			})
		}
		</div>
	);
}

export default CardList;