interface CollectionFolderSVGProps {
	fillColor: string
	withUserStyle?: any
}

function FolderIconSVG(props: CollectionFolderSVGProps) {
	return (
		<>
			{props.withUserStyle ?
				<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M40 12H24L20 8H8C5.8 8 4 9.8 4 12V36C4 38.2 5.8 40 8 40H40C42.2 40 44 38.2 44 36V16C44 13.8 42.2 12 40 12Z" fill={props.fillColor} />
					<path fillRule="evenodd" clipRule="evenodd" d="M18.6593 23.8218C18.6593 25.8046 17.0367 27.3936 15.012 27.3936C12.988 27.3936 11.3647 25.8046 11.3647 23.8218C11.3647 21.839 12.988 20.25 15.012 20.25C17.0367 20.25 18.6593 21.839 18.6593 23.8218ZM9.5 31.438C9.5 29.6025 12.0391 29.1433 15.012 29.1433C18.001 29.1433 20.524 29.6183 20.524 31.4553C20.524 33.2908 17.9849 33.75 15.012 33.75C12.023 33.75 9.5 33.2749 9.5 31.438ZM20.13 23.8866C20.13 24.8963 19.8204 25.8385 19.2773 26.6211C19.2208 26.7016 19.2707 26.8101 19.369 26.8274C19.5055 26.8497 19.6457 26.8633 19.7888 26.8662C21.2125 26.9028 22.4901 26.0052 22.8431 24.6534C23.3663 22.6476 21.8311 20.8466 19.8754 20.8466C19.6633 20.8466 19.46 20.8681 19.2619 20.9077C19.2347 20.9134 19.2054 20.9263 19.1907 20.9493C19.1716 20.9788 19.1856 21.0169 19.2046 21.0421C19.7925 21.8491 20.13 22.8316 20.13 23.8866ZM22.4879 28.2767C23.4449 28.46 24.0738 28.833 24.3343 29.377C24.5552 29.8226 24.5552 30.34 24.3343 30.7856C23.9358 31.6279 22.6501 31.8988 22.1504 31.9685C22.0469 31.9829 21.964 31.8967 21.975 31.7946C22.2303 29.4604 20.1998 28.3536 19.6743 28.0992C19.6523 28.087 19.6472 28.0697 19.6494 28.0582C19.6508 28.0511 19.6604 28.0396 19.6773 28.0374C20.814 28.0158 22.0366 28.1689 22.4879 28.2767Z" fill="white" />
					<defs>
						<linearGradient id="paint0_linear_450_25396" x1="44" y1="8" x2="12.7805" y2="47.0244" gradientUnits="userSpaceOnUse">
							<stop stopColor="#6C5ECF" />
							<stop offset="1" stopColor="#503FC8" />
						</linearGradient>
					</defs>
				</svg>

				:

				<svg width="40" height="48" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M36 4H20L16 0H4C1.8 0 0 1.8 0 4V28C0 30.2 1.8 32 4 32H36C38.2 32 40 30.2 40 28V8C40 5.8 38.2 4 36 4Z" fill={props.fillColor} />
					<defs>
						<linearGradient id="paint0_linear_558_35282" x1="40" y1="0" x2="8.78049" y2="39.0244" gradientUnits="userSpaceOnUse">
							<stop stop-color="#6C5ECF" />
							<stop offset="1" stop-color="#503FC8" />
						</linearGradient>
					</defs>
				</svg>

			}
		</>
	)
}

export default FolderIconSVG;